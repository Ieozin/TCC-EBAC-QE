import { expect } from "@wdio/globals";
import homePage from "../pageobjects/home.page.js";
import browsePage from "../pageobjects/browse.page.js";
import productPage from "../pageobjects/product.page.js";

describe("TCC Mobile iOS - Catálogo de Produtos", () => {
  it("[CT_MOB_CAT_01] Deve exibir produtos na lista do catálogo após uma busca genérica", async () => {
    await homePage.openTab("Search");

    await browsePage.searchInput.waitForDisplayed({ timeout: 15000 });
    await browsePage.searchInput.setValue("a");
    await driver.pause(3000);

    const products = await browsePage.products;
    await expect(products.length).toBeGreaterThanOrEqual(1);
  });

  it("[CT_MOB_CAT_02] Deve abrir os detalhes de um produto da lista", async () => {
    const produtoDeExemplo = "Ingrid Running Jacket";

    await homePage.openTab("Search");

    await browsePage.searchInput.waitForDisplayed({ timeout: 15000 });
    await browsePage.searchInput.setValue("Ingrid");
    await driver.pause(3000);

    const productElementToClick = await browsePage.getFirstProductElement();
    await productElementToClick.click();

    await productPage.addToCartButton.waitForDisplayed({ timeout: 15000 });
    const titleElementOnDetailPage = await productPage.getProductTitle(
      produtoDeExemplo
    );
    await expect(titleElementOnDetailPage).toBeDisplayed();
  });

  it("[CT_MOB_CAT_03] Deve conseguir buscar por um produto específico com sucesso", async () => {
    await homePage.openTab("Search");

    await browsePage.searchInput.waitForDisplayed({ timeout: 15000 });
    await browsePage.searchInput.setValue("Ingrid");
    await driver.pause(3000);

    const products = await browsePage.products;
    await expect(products.length).toBeGreaterThanOrEqual(1);
  });

  it("[CT_MOB_CAT_04] Deve exibir zero produtos ao buscar termo inexistente", async () => {
    const produtoInexistente = "ProdutoSuperFantasticoQueNaoExiste123";

    await homePage.openTab("Search");

    await browsePage.searchInput.waitForDisplayed({ timeout: 15000 });
    await browsePage.searchInput.setValue(produtoInexistente);
    await driver.pause(3000);

    const productsAfterSearch = await browsePage.products;
    await expect(productsAfterSearch.length).toEqual(0);
  });
});
