const request = require("supertest");
const BASE_URL_API_EXEMPLO = "http://lojaebac.ebaconline.art.br";
const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "admin123";

async function getAuthToken() {
  try {
    const response = await request(BASE_URL_API_EXEMPLO)
      .post("/public/authUser")
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    if (
      response.status === 200 &&
      response.body.data &&
      response.body.data.token
    ) {
      return response.body.data.token;
    }
    throw new Error(
      `Falha ao obter token da API de Exemplo: ${
        response.status
      } - ${JSON.stringify(response.body)}`
    );
  } catch (error) {
    console.error("Erro crítico ao obter token:", error);
    throw error;
  }
}
module.exports = { getAuthToken, BASE_URL_API_EXEMPLO };
