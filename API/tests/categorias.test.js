const request = require("supertest");
const { expect } = require("chai");
const { getAuthToken, BASE_URL_API_EXEMPLO } = require("../utils/authHelper");
const { faker } = require("@faker-js/faker"); // Para dados dinâmicos se precisar

describe("API Exemplo - Testes de Categorias", () => {
  let token;
  let categoryId;

  before(async () => {
    token = await getAuthToken();
  });

  it("Deve criar uma categoria com sucesso", async () => {
    const categoryName = `Categoria Supertest ${faker.commerce.department()}`;
    const categoryData = {
      name: categoryName,
      photo: faker.image.urlPlaceholder(),
    };

    const response = await request(BASE_URL_API_EXEMPLO)
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

  it("Deve editar uma categoria existente com sucesso", async () => {
    expect(categoryId, "ID da categoria é necessário").to.exist;
    const updatedCategoryName = `Editada ${faker.commerce.department()}`;
    const response = await request(BASE_URL_API_EXEMPLO)
      .put(`/api/editCategory/${categoryId}`)
      .set("Authorization", `${token}`)
      .send({ name: updatedCategoryName, photo: faker.image.urlPlaceholder() });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal("category updated");
  });

  it("Deve excluir uma categoria existente com sucesso", async () => {
    expect(categoryId, "ID da categoria é necessário").to.exist;
    const response = await request(BASE_URL_API_EXEMPLO)
      .delete(`/api/deleteCategory/${categoryId}`)
      .set("Authorization", `${token}`);

    expect(response.status).to.equal(200);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal("category deleted");
  });
});
