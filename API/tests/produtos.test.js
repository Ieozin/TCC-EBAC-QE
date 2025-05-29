// L:\Repositorio\TCC-EBAC-QE\API\tests\produtos.test.js
const request = require("supertest");
const { expect } = require("chai");
const { getAuthToken, BASE_URL_API_EXEMPLO } = require("../utils/authHelper");
const { faker } = require("@faker-js/faker");

describe("API Exemplo - Testes de Produtos", () => {
  let token;
  let productId;
  const categoryIdForProduct = "6543a21b1c9d440001abc124";

  before(async () => {
    token = await getAuthToken();
  });

  it("Deve criar um produto com sucesso", async () => {
    const productName = `Produto Supertest ${faker.commerce.productName()}`;
    const productData = {
      name: productName,
      price: parseFloat(faker.commerce.price()),
      quantity: faker.number.int({ min: 10, max: 100 }),
      categories: [categoryIdForProduct],
      description: faker.commerce.productDescription(),
      photos: [faker.image.url()],
      popular: faker.datatype.boolean(),
      visible: true,
    };

    const response = await request(BASE_URL_API_EXEMPLO)
      .post("/api/addProduct")
      .set("Authorization", `${token}`)
      .send(productData);

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal("product added");
    expect(response.body.data).to.have.property("_id");
    expect(response.body.data.name).to.equal(productName);
    productId = response.body.data._id;
  });

  it("Deve editar um produto existente com sucesso", async () => {
    expect(productId, "ID do produto é necessário").to.exist;
    const updatedProductName = `Editado ${faker.commerce.productName()}`;
    const updatedPrice = parseFloat(faker.commerce.price());

    const response = await request(BASE_URL_API_EXEMPLO)
      .put(`/api/editProduct/${productId}`)
      .set("Authorization", `${token}`)
      .send({ name: updatedProductName, price: updatedPrice });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal("product updated");
  });

  it("Deve deletar um produto existente com sucesso", async () => {
    expect(productId, "ID do produto é necessário").to.exist;
    const response = await request(BASE_URL_API_EXEMPLO)
      .delete(`/api/deleteProduct/${productId}`)
      .set("Authorization", `${token}`);

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal("product deleted");
  });
});
