const request = require("supertest");

const BASE_URL_API_EBAC = "http://lojaebac.ebaconline.art.br";

const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "admin123";

async function getAuthTokenEbac() {
  try {
    const response = await request(BASE_URL_API_EBAC)
      .post("/public/authUser")
      .send({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

    if (
      response.status === 200 &&
      response.body &&
      response.body.data &&
      response.body.data.token
    ) {
      return response.body.data.token;
    }
    console.error("Falha ao obter token:", response.status, response.body);
    throw new Error(
      `Falha ao obter token: ${response.body.message || response.status}`
    );
  } catch (error) {
    console.error("Erro crítico ao obter token:", error);
    throw error;
  }
}

module.exports = { getAuthTokenEbac, BASE_URL_API_EBAC };
