// TCC-EBAC-QE/API/tests/categorias.test.js
const request = require("supertest");
const { expect } = require("chai");
const { getAuthTokenEbac, BASE_URL_API_EBAC } = require("../utils/auth");
const { faker } = require("@faker-js/faker");

describe("API - Testes de Categorias (EBAC)", () => {
  let token;
  let categoryId;

  before(async () => {
    token = await getAuthTokenEbac();
  });

  it("[US-API_CAT_01] Deve criar uma categoria com sucesso", async () => {
    const categoryName = `Categoria ${faker.commerce.department()} ${faker.string.alphanumeric(
      5
    )}`;
    const categoryData = {
      name: categoryName,
      photo: faker.image.urlPicsumPhotos(),
    };

    const response = await request(BASE_URL_API_EBAC)
      .post("/api/addCategory")
      .set("Authorization", `${token}`)
      .send(categoryData);

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal("category added");
    expect(response.body.data).to.be.an("object");
    expect(response.body.data).to.have.property("_id");
    expect(response.body.data.name).to.equal(categoryData.name);

    categoryId = response.body.data._id;
  });

  it("[US-API_CAT_02] Deve editar uma categoria existente com sucesso", async () => {
    expect(categoryId, "ID da categoria é necessário para editar").to.exist;
    const updatedCategoryName = `Categoria Editada ${faker.commerce.department()} ${faker.string.alphanumeric(
      5
    )}`;
    const updatedCategoryData = {
      name: updatedCategoryName,
      photo: faker.image.urlPicsumPhotos(),
    };

    const response = await request(BASE_URL_API_EBAC)
      .put(`/api/editCategory/${categoryId}`)
      .set("Authorization", `${token}`)
      .send(updatedCategoryData);

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal("category updated");
  });

  it("[US-API_CAT_03] Deve excluir uma categoria existente com sucesso", async () => {
    expect(categoryId, "ID da categoria é necessário para excluir").to.exist;
    const response = await request(BASE_URL_API_EBAC)
      .delete(`/api/deleteCategory/${categoryId}`)
      .set("Authorization", `${token}`);

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal("category deleted");
  });
});
