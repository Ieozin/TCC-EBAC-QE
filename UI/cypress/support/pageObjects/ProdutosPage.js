class ProdutosPage {
  visitarPaginaProdutos() {
    cy.visit("/produtos/");
  }

  verificarListaDeProdutosVisivel() {
    cy.get(".products").should("be.visible");
  }

  buscarProduto(nomeProduto) {
    cy.get("input.search-field").first().type(nomeProduto);
    cy.get('button[type="submit"].search-submit').first().click();
  }

  verificarProdutoNaListagem(nomeProduto) {
    cy.get(".products").contains(nomeProduto).should("be.visible");
  }

  verificarMensagemProdutoNaoEncontrado() {
    cy.contains("Nenhum produto foi encontrado").should("be.visible");
  }

  clicarNoProdutoDaLista(nomeProduto) {
    cy.get(".products").contains(nomeProduto).click();
  }

  selecionarCor(cor) {
    cy.get(`.button-variable-item-${cor.toLowerCase()}`).click();
  }

  selecionarTamanho(tamanho) {
    cy.get(`.button-variable-item-${tamanho}`).click();
  }

  clicarBotaoComprar() {
    cy.get(".single_add_to_cart_button").click();
  }

  verificarMensagemSucessoAdicionar(nomeProduto) {
    cy.get(".woocommerce-message").should(
      "contain",
      `“${nomeProduto}” foi adicionado no seu carrinho.`
    );
  }

  verificarContadorCarrinho(quantidadeEsperada) {}

  verificarAlertaVariacaoObrigatoria(tipoVariacao) {}
}
export default ProdutosPage;
