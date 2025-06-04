import LoginPage from "./pageObjects/LoginPage";
import ProdutosPage from "./pageObjects/ProdutosPage";
const loginPage = new LoginPage();

Cypress.Commands.add("login", (usuario, senha) => {
  cy.visit("minha-conta/");
  cy.get("#username").clear().type(usuario);
  cy.get("#password").clear().type(senha, { log: false });
  cy.get(".woocommerce-form > .button").click();
});

Cypress.Commands.add("preCadastro", (email, senha, nome, sobrenome) => {
  cy.visit("minha-conta/");
  cy.get("#reg_email").type(email);
  cy.get("#reg_password").type(senha, { log: false });
  cy.get('input[name="register"]').click();

  cy.get(".woocommerce-MyAccount-navigation-link--edit-account > a").click();
  cy.get("#account_first_name").type(nome);
  cy.get("#account_last_name").type(sobrenome);
  cy.get('button[name="save_account_details"]').click();
});

Cypress.Commands.add(
  "adicionarProdutoAoCarrinho",
  (nomeProduto, tamanho, cor, quantidade) => {
    const produtosPage = new ProdutosPage();
    produtosPage.visitUrl();
    produtosPage.buscarProdutoNaPaginaDeProdutos(nomeProduto);
    produtosPage.visitarPaginaProdutoDireto(nomeProduto);
    produtosPage.addProdutoCarrinho(tamanho, cor, quantidade);
    produtosPage.verificarMensagemSucessoAddCarrinho(nomeProduto);
  }
);
