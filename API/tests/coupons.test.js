const request = require("supertest");
const { expect } = require("chai");
const { faker } = require("@faker-js/faker");

const BASE_URL_WOOCOMMERCE_API =
  "http://lojaebac.ebaconline.art.br/wp-json/wc/v3";
const AUTH_TOKEN_WOOCOMMERCE = "Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy";

describe("[US-0003] API de Cupons - WooCommerce", () => {
  let cupomIdCriado;
  let codigoCupomEnviado;

  it("CT_API_003_01: Deve cadastrar um novo cupom com sucesso (POST /coupons)", async () => {
    codigoCupomEnviado = `tcc${faker.string.alphanumeric(7)}`.toLowerCase();
    const novoCupomData = {
      code: codigoCupomEnviado,
      amount: "25.50",
      discount_type: "fixed_cart",
      description: `Cupom de teste TCC - ${codigoCupomEnviado}`,
    };

    const response = await request(BASE_URL_WOOCOMMERCE_API)
      .post("/coupons")
      .set("Authorization", AUTH_TOKEN_WOOCOMMERCE)
      .send(novoCupomData);

    expect(
      response.status,
      `Falha ao criar cupom: ${JSON.stringify(response.body)}`
    ).to.equal(201);
    expect(response.body.code).to.equal(novoCupomData.code);
    expect(response.body.amount).to.equal(novoCupomData.amount);
    expect(response.body.id).to.be.a("number");
    cupomIdCriado = response.body.id;

    expect(response.body).to.include.all.keys(
      "id",
      "code",
      "amount",
      "discount_type",
      "description",
      "date_created"
    );
  });

  it("CT_API_003_02: Não deve cadastrar cupom com código duplicado (POST /coupons)", async () => {
    expect(
      codigoCupomEnviado,
      "Código do cupom criado anteriormente é necessário"
    ).to.exist;
    const cupomDuplicadoData = {
      code: codigoCupomEnviado,
      amount: "10.00",
      discount_type: "percent",
      description: "Tentativa de cupom duplicado TCC",
    };

    const response = await request(BASE_URL_WOOCOMMERCE_API)
      .post("/coupons")
      .set("Authorization", AUTH_TOKEN_WOOCOMMERCE)
      .send(cupomDuplicadoData);

    expect(response.status).to.equal(400);
    expect(response.body.code).to.equal(
      "woocommerce_rest_coupon_code_already_exists"
    );
  });

  it("CT_API_003_03: Deve listar todos os cupons (GET /coupons)", async () => {
    const response = await request(BASE_URL_WOOCOMMERCE_API)
      .get("/coupons")
      .set("Authorization", AUTH_TOKEN_WOOCOMMERCE);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    if (response.body.length > 0) {
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("code");
    }
  });

  it("CT_API_003_04: Deve listar um cupom específico pelo ID (GET /coupons/:id)", async () => {
    expect(cupomIdCriado, "ID do cupom criado no primeiro teste é necessário")
      .to.exist;
    const response = await request(BASE_URL_WOOCOMMERCE_API)
      .get(`/coupons/${cupomIdCriado}`)
      .set("Authorization", AUTH_TOKEN_WOOCOMMERCE);

    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal(cupomIdCriado);
    expect(response.body.code).to.equal(codigoCupomEnviado);
  });

  it("CT_API_003_05: Deve retornar erro 404 ao tentar listar cupom com ID inexistente (GET /coupons/:id)", async () => {
    const idInexistente = 99999999;
    const response = await request(BASE_URL_WOOCOMMERCE_API)
      .get(`/coupons/${idInexistente}`)
      .set("Authorization", AUTH_TOKEN_WOOCOMMERCE);

    expect(response.status).to.equal(404);
    expect(response.body.code).to.equal(
      "woocommerce_rest_shop_coupon_invalid_id"
    );
  });

  after(async () => {
    if (cupomIdCriado) {
      console.log(
        `API Cleanup: Tentando deletar cupom de teste ID: ${cupomIdCriado}`
      );
      const response = await request(BASE_URL_WOOCOMMERCE_API)
        .delete(`/coupons/${cupomIdCriado}?force=true`)
        .set("Authorization", AUTH_TOKEN_WOOCOMMERCE);

      console.log(
        `API Cleanup: Resposta da deleção do cupom ${cupomIdCriado} - Status: ${response.status}`
      );
      expect(response.status).to.be.oneOf([200, 202, 404]);
    }
  });
});
