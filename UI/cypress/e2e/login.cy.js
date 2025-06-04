/// <reference types="cypress" />
import LoginPage from "../support/pageObjects/LoginPage";
import { faker } from "@faker-js/faker";

const loginPage = new LoginPage();

describe("[US-0002] Funcionalidade: Login na Plataforma (TCC)", () => {
  let perfilData;

  before(() => {
    cy.fixture("perfil").then((data) => {
      perfilData = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it("CT_US0002_01: Deve fazer login com sucesso usando credenciais válidas do TCC", () => {
    loginPage.fillEmailLogin(perfilData.usuario);
    loginPage.fillPasswordLogin(perfilData.senha);
    loginPage.clickLogin();

    const nomeExibicaoEsperado =
      perfilData.nomeExibicao || perfilData.usuario.split("@")[0];
    loginPage.getWelcomeMessage(nomeExibicaoEsperado);
  });

  it("CT_US0002_02: Deve exibir mensagem de erro ao inserir senha inválida", () => {
    loginPage.fillEmailLogin(perfilData.usuario);
    loginPage.fillPasswordLogin(faker.internet.password(10));
    loginPage.clickLogin();

    loginPage
      .getDirectErrorMessageElement()
      .should(
        "contain.text",
        `Erro: A senha fornecida para o e-mail ${perfilData.usuario} está incorreta.`
      )
      .and("contain.text", "Perdeu a senha?");
  });

  it("CT_US0002_03: Deve exibir mensagem de erro ao inserir e-mail de usuário inexistente", () => {
    const emailInexistente = faker.internet.email();
    loginPage.fillEmailLogin(emailInexistente);
    loginPage.fillPasswordLogin("qualquerSenha");
    loginPage.clickLogin();

    loginPage
      .getDirectErrorMessageElement()
      .should("contain.text", "Endereço de e-mail desconhecido.");
  });

  it("CT_US0002_03.extra: Deve exibir mensagem de erro ao inserir NOME de usuário inválido", () => {
    const nomeUsuarioInvalido = "usuario" + faker.string.alphanumeric(10);
    loginPage.fillEmailLogin(nomeUsuarioInvalido);
    loginPage.fillPasswordLogin("qualquerSenha");
    loginPage.clickLogin();

    loginPage
      .getGenericErrorMessageElement()
      .should(
        "contain.text",
        `Erro: O usuário ${nomeUsuarioInvalido} não está registrado neste site.`
      );
  });

  it.skip("CT_US0002_04: [PULADO] Deve bloquear conta após múltiplas tentativas falhas", () => {
    cy.log(
      "TESTE PULADO: Funcionalidade de bloqueio de conta não implementada/observada na loja EBAC Shop."
    );
  });
});
