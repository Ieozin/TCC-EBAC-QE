class ProdutosPage {
  visitUrl() {
    cy.visit("produtos/");
  }

  buscarProdutoNaBarra(nomeProduto) {
    cy.get(
      "#searchform > .search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .form-control"
    )
      .first()
      .type(nomeProduto); // Seletor da barra de busca principal
    cy.get(
      "#searchform > .search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group > .button-search"
    )
      .first()
      .click();
  }

  buscarProdutoNaPaginaDeProdutos(nomeProduto) {
    cy.get('input[name="s"]').eq(1).type(nomeProduto);
    cy.get('button[type="submit"]').eq(1).click();
  }

  abrirDetalhesProdutoPelaLista(nomeProduto) {
    cy.get(".product-block").contains(nomeProduto).click({ force: true });
  }

  visitarPaginaProdutoDireto(nomeProduto) {
    const urlFormatada = nomeProduto.toLowerCase().replace(/ /g, "-");
    cy.visit(`product/${urlFormatada}/`);
  }

  addProdutoCarrinho(tamanho, cor, quantidade) {
    if (tamanho) cy.get(`.button-variable-item-${tamanho}`).click();
    if (cor) cy.get(`.button-variable-item-${cor}`).click();
    cy.get(".input-text.qty").clear().type(quantidade);
    cy.get(".single_add_to_cart_button").click();
  }

  verificarMensagemSucessoAddCarrinho(nomeProduto) {
    cy.get(".woocommerce-message").should(
      "contain.text",
      `“${nomeProduto}” foi adicionado no seu carrinho.`
    );
  }
}
export default new ProdutosPage();
