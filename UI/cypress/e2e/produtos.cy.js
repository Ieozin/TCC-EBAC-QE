/// <reference types="cypress" />
import produtosPage from "../support/pageObjects/ProdutosPage";

describe("[US-0001] Funcionalidade: Adicionar item ao carrinho (TCC)", () => {
  beforeEach(() => {
    produtosPage.visitarUrl();
  });

  it("CT_US0001_01: Deve adicionar produto 'Abominable Hoodie' S/Red com sucesso", () => {
    const nomeProduto = "Abominable Hoodie";
    const tamanho = "S"; 
    const cor = "Red";   
    const quantidade = 1;

    produtosPage.buscarProduto(nomeProduto);
    produtosPage.verificarTituloProduto(nomeProduto);

    produtosPage.selecionarTamanho(tamanho);
    produtosPage.selecionarCor(cor); 

    cy.get(".single_add_to_cart_button", { timeout: 10000 }) 
        .should("be.visible")
        .and("not.have.class", "disabled")
        .and("not.have.class", "wc-variation-selection-needed");

    produtosPage.definirQuantidade(quantidade);
    produtosPage.clicarBotaoComprar(); 

    produtosPage.verificarMensagemSucessoAdicionar(nomeProduto);
    produtosPage.clicarVerCarrinhoEVerificarProduto(nomeProduto, tamanho, cor);
  });

  it("CT_US0001_02: Deve exibir mensagem ao tentar adicionar 'Aero Daily Fitness Tee' sem selecionar variação", () => {
    const nomeProduto = "Aero Daily Fitness Tee"; 
    produtosPage.buscarProduto(nomeProduto);
    produtosPage.verificarTituloProduto(nomeProduto);
    produtosPage.clicarBotaoComprar(); 
    produtosPage.verificarMensagemEscolhaOpcaoProduto();
  });

  it("CT_US0001_03: Deve adicionar múltiplas unidades de 'Aether Gym Pant' ao carrinho", () => {
    const nomeProduto = "Aether Gym Pant";
    const tamanho = "32"; 
    const cor = "Blue";   
    const quantidade = 3;

    produtosPage.buscarProduto(nomeProduto);
    produtosPage.verificarTituloProduto(nomeProduto);

    produtosPage.selecionarTamanho(tamanho);
    produtosPage.selecionarCor(cor);

    cy.get(".single_add_to_cart_button", { timeout: 10000 })
        .should("be.visible")
        .and("not.have.class", "disabled")
        .and("not.have.class", "wc-variation-selection-needed");

    produtosPage.definirQuantidade(quantidade);
    produtosPage.clicarBotaoComprar();

    produtosPage.verificarMensagemSucessoAdicionar(nomeProduto);
    
    produtosPage.visitarPaginaCarrinho(); 
    produtosPage.verificarProdutoNoCarrinhoComVariaçoes(nomeProduto, tamanho, cor);
    cy.get(
      `.cart_item:contains("${nomeProduto}") .quantity input[type="number"]`
    ).should("have.value", quantidade.toString());
  });

  it("CT_US0001_04: Deve impedir adicionar 'Abominable Hoodie' fora de estoque (XS/Blue)", () => {
    const nomeProduto = "Abominable Hoodie";
    const tamanhoForaDeEstoque = "XS"; 
    const corForaDeEstoque = "Blue";  

    produtosPage.buscarProduto(nomeProduto);
    produtosPage.verificarTituloProduto(nomeProduto);

    produtosPage.selecionarTamanho(tamanhoForaDeEstoque);
    produtosPage.selecionarCor(corForaDeEstoque);
    
    produtosPage.verificarBotaoComprarEstaDesabilitado(); 
    produtosPage.verificarStatusForaDeEstoque(); 
  });
});