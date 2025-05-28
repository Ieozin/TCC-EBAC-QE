/// <reference types="cypress" />
import LoginPage from "../support/pageObjects/LoginPage";
import { faker } from "@faker-js/faker";
const perfil = require("../fixtures/perfil.json");

const loginPage = new LoginPage();

describe("[US-0002] Funcionalidade: Login na Plataforma", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("CT_UI_002_01: Deve fazer login com sucesso usando credenciais válidas (massa de dados)", () => {
    cy.login(perfil.usuario, perfil.senha);
    loginPage.getWelcomeMessage(perfil.usuario.split("@")[0]);
  });

  it("CT_UI_002_02: Deve exibir mensagem de erro ao inserir senha inválida", () => {
    loginPage.fillEmailLogin(perfil.usuario);
    loginPage.fillPasswordLogin(faker.internet.password());
    loginPage.clickLogin();
    loginPage
      .getErrorMessage()
      .should(
        "contain.text",
        `Erro: A senha fornecida para o e-mail ${perfil.usuario} está incorreta.`
      );
  });

  it("CT_UI_002_03: Deve exibir mensagem de erro ao inserir usuário inválido", () => {
    loginPage.fillEmailLogin(faker.internet.email());
    loginPage.fillPasswordLogin(perfil.senha);
    loginPage.clickLogin();
    loginPage
      .getErrorMessage()
      .should("contain.text", "Erro: Nome de usuário desconhecido.");
  });
});
