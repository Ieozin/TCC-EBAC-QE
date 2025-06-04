/// <reference types="cypress" />
import produtosPage from "../support/pageObjects/ProdutosPage";

describe("Funcionalidade: Catálogo de Produtos (TCC)", () => {
  beforeEach(() => {
    produtosPage.visitarUrl(); 
  });

  it("[CT_CATALOGO_01] Deve visualizar lista de produtos ao acessar a página de produtos", () => {
    produtosPage.verificarListaDeProdutosVisivel(); 
  });

  it("[CT_CATALOGO_02] Deve buscar por um produto existente e ir para sua página", () => {
    const nomeProduto = "Abominable Hoodie";
    produtosPage.buscarProduto(nomeProduto);
    produtosPage.verificarTituloProduto(nomeProduto);
  });

  it("[CT_CATALOGO_03] Deve exibir mensagem para produto inexistente após busca", () => {
    const nomeBusca = "cocoseco";
    produtosPage.buscarProduto(nomeBusca);
    produtosPage.verificarMensagemProdutoNaoEncontrado(nomeBusca); 
  });

  it("[CT_CATALOGO_04] Deve acessar detalhes de um produto (descrição)", () => {
    const nomeProduto = "Ingrid Running Jacket";
    const textoDescricaoEsperado = "The Ingrid Running Jacket combines sleek design";

    produtosPage.buscarProduto(nomeProduto);
    produtosPage.verificarTituloProduto(nomeProduto);

    cy.get("#tab-description > p", { timeout: 7000 }).should(
      "contain.text",
      textoDescricaoEsperado
    );
  });
});