class ProdutosPage {
  visitarUrl() {
    cy.visit("produtos");
  }

  buscarProduto(nomeProduto) {
    cy.get('[name="s"]').eq(1).clear().type(nomeProduto);
    cy.get(".button-search").eq(1).click();
    cy.get("body", { timeout: 10000 }).should("be.visible");
  }

  _selecionarOpcaoVariavel(nomeOpcao) {
    const seletorLiOpcao = ".button-variable-item-" + nomeOpcao;
    cy.get(seletorLiOpcao, { timeout: 12000 })
      .should("be.visible")
      .scrollIntoView()
      .click();
    cy.wait(4000);
  }

  selecionarTamanho(tamanho) {
    this._selecionarOpcaoVariavel(tamanho);
  }

  selecionarCor(cor) {
    this._selecionarOpcaoVariavel(cor);
  }

  definirQuantidade(quantidade) {
    cy.get('input[name="quantity"]', { timeout: 7000 })
      .clear()
      .type(quantidade);
  }

  clicarBotaoComprar() {
    cy.get(".single_add_to_cart_button", { timeout: 7000 })
      .should("be.visible")
      .click({ force: true });
  }

  verificarListaDeProdutosVisivel() {
    cy.get(".product-block", { timeout: 7000 })
      .should("exist")
      .and("be.visible");
  }

  verificarTituloProduto(nomeProduto) {
    cy.get(".product_title", { timeout: 10000 }).should(
      "contain.text",
      nomeProduto
    );
  }

  verificarMensagemProdutoNaoEncontrado(nomeBusca) {
    cy.get(".page-title", { timeout: 7000 }).should(
      "contain.text",
      `Resultados da pesquisa por: “${nomeBusca}”`
    );
    cy.get(".woocommerce-info", { timeout: 7000 })
      .should("be.visible")
      .and("contain.text", "Nenhum produto foi encontrado para a sua seleção.");
  }

  verificarMensagemSucessoAdicionar(nomeProduto) {
    cy.get(".woocommerce-message", { timeout: 20000 }).should("be.visible");
    cy.get(".woocommerce-message").should("contain.text", `“${nomeProduto}”`);
    cy.get(".woocommerce-message > .button.wc-forward", {
      timeout: 7000,
    }).should("be.visible");
  }

  clicarVerCarrinhoEVerificarProduto(nomeProduto, tamanho, cor) {
    cy.get(".woocommerce-message > .button.wc-forward", { timeout: 7000 })
      .should("be.visible")
      .click();
    cy.url().should("include", "/carrinho/");
    this.verificarProdutoNoCarrinhoComVariaçoes(nomeProduto, tamanho, cor);
  }

  visitarPaginaCarrinho() {
    cy.visit("/carrinho/");
  }

  verificarProdutoNoCarrinhoComVariaçoes(
    nomeProduto,
    tamanhoEsperado,
    corEsperada
  ) {
    let textoCompletoEsperado = nomeProduto;
    if (tamanhoEsperado && corEsperada) {
      textoCompletoEsperado = `${nomeProduto} - ${tamanhoEsperado}, ${corEsperada}`;
    } else if (tamanhoEsperado) {
      textoCompletoEsperado = `${nomeProduto} - ${tamanhoEsperado}`;
    } else if (corEsperada) {
      textoCompletoEsperado = `${nomeProduto} - ${corEsperada}`;
    }
    cy.get("td.product-name > a", { timeout: 7000 })
      .contains(textoCompletoEsperado, { matchCase: false })
      .should("be.visible");
  }

  verificarStatusForaDeEstoque() {
    cy.get("p.stock.out-of-stock", { timeout: 7000 })
      .should("be.visible")
      .and("contain.text", "Fora de estoque");
  }

  verificarBotaoComprarEstaDesabilitado() {
    cy.get(".single_add_to_cart_button").should("have.class", "disabled");
  }
}

export default new ProdutosPage();
