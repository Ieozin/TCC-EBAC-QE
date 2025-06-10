import { expect } from "@wdio/globals";
import homePage from "../pageobjects/home.page.js";
import browsePage from "../pageobjects/browse.page.js";
import productPage from "../pageobjects/product.page.js";

describe("TCC Mobile iOS - Catálogo de Produtos", () => {
  beforeEach(async () => {
    await homePage.search();
    await expect(browsePage.searchInput).toBeDisplayed({ timeout: 15000 });
  });

  it("[CT_MOB_CAT_01] Deve exibir produtos na lista do catálogo após uma busca genérica", async () => {
    await browsePage.searchInput.setValue("a");
    await driver.pause(3000);
    const products = await browsePage.products;
    await expect(products.length).toBeGreaterThanOrEqual(1);
  });

  it("[CT_MOB_CAT_02] Deve abrir os detalhes de um produto da lista", async () => {
    await browsePage.searchInput.setValue("Ingrid");
    await driver.pause(3000);
    const products = await browsePage.products;
    if (products.length === 0) {
      throw new Error(
        "Produto 'Ingrid' não encontrado para teste de detalhes."
      );
    }

    let productNameInList;
    const firstProduct = products[0];

    try {
      productNameInList = await firstProduct.getAttribute("name");
      if (productNameInList && productNameInList.includes(",")) {
        productNameInList = productNameInList.split(",")[0].trim();
      } else if (!productNameInList) {
        productNameInList = "Ingrid Running Jacket";
      }
    } catch (e) {
      productNameInList = "Ingrid Running Jacket";
    }

    await firstProduct.click();

    await expect(productPage.addToCartButton).toBeDisplayed({ timeout: 15000 });

    const productTitleElementOnDetailPage = await productPage.getProductTitle(
      productNameInList
    );
    await expect(productTitleElementOnDetailPage).toBeDisplayed();
  });

  it("[CT_MOB_CAT_03] Deve conseguir buscar por um produto específico com sucesso", async () => {
    const produtoParaBuscar = "Ingrid Running Jacket";
    await browsePage.searchInput.setValue("Ingrid");
    await driver.pause(3000);

    const products = await browsePage.products;
    await expect(products.length).toBeGreaterThanOrEqual(1);

    let found = false;
    for (const product of products) {
      const accessibilityIdDoProduto = await product.getAttribute("name");
      if (
        accessibilityIdDoProduto &&
        accessibilityIdDoProduto.includes(produtoParaBuscar)
      ) {
        found = true;
        break;
      }
    }
    await expect(found).toBe(
      true,
      `Produto "${produtoParaBuscar}" não encontrado nos resultados.`
    );
  });

  it("[CT_MOB_CAT_04] Deve exibir zero produtos ao buscar termo inexistente", async () => {
    const produtoInexistente = "ProdutoSuperExtraInexistente123XYZ";
    await browsePage.searchInput.setValue(produtoInexistente);
    await driver.pause(3000);

    const productsAfterSearch = await browsePage.products;
    await expect(productsAfterSearch.length).toEqual(0);
  });
});
