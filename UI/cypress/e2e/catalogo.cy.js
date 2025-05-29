import ProdutosPage from "../support/pageObjects/ProdutosPage";

const produtosPage = new ProdutosPage();

describe("Funcionalidade: Catálogo de Produtos", () => {
  beforeEach(() => {
    produtosPage.visitarPaginaProdutos();
  });

  it("[CT_CATALOGO_01] Deve visualizar lista de produtos", () => {
    produtosPage.verificarListaDeProdutosVisivel();
  });

  it("[CT_CATALOGO_02] Deve buscar por um produto existente", () => {
    const nomeProduto = "Abominable Hoodie";
    produtosPage.buscarProduto(nomeProduto);
    produtosPage.verificarProdutoNaListagem(nomeProduto);
  });

  it("[CT_CATALOGO_03] Deve exibir mensagem para produto inexistente", () => {
    produtosPage.buscarProduto("ProdutoQueNaoExiste123");
    produtosPage.verificarMensagemProdutoNaoEncontrado();
  });

  it("[CT_CATALOGO_04] Deve acessar detalhes de um produto", () => {
    const nomeProduto = "Astronaut Star Projector";
    produtosPage.clicarNoProdutoDaLista(nomeProduto);

    cy.url().should("include", "/product/astronaut-star-projector/");
    cy.get(".product_title").should("contain.text", nomeProduto);
  });
});
