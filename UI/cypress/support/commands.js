import LoginPage from "./pageObjects/LoginPage";
const loginPage = new LoginPage();

Cypress.Commands.add("login", (usuario, senha) => {
  loginPage.visit();
  loginPage.fillEmailLogin(usuario);
  loginPage.fillPasswordLogin(senha);
  loginPage.clickLogin();
});

Cypress.Commands.add("preCadastro", (email, senha, nome, sobrenome) => {
  loginPage.visit();
  loginPage.fillEmailRegister(email);
  loginPage.fillPasswordRegister(senha);
  loginPage.clickRegister();

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
