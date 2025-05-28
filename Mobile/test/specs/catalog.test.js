const HomeScreen = require("../pageobjects/HomePage");
const LoginScreen = require("../pageobjects/LoginPage");
const MyStoreScreen = require("../pageobjects/MyStorePage");
const CatalogPage = require("../pageobjects/CatalogPage");
const credentials = require("../fixtures/credentials.json");
const { expect } = require("chai");

describe("Mobile App - Funcionalidade do Catálogo de Produtos", () => {
  before(async () => {
    await LoginScreen.setStoreAddress(credentials.storeUrl);
    await LoginScreen.tapContinue();
    await LoginScreen.tapContinueWithStoreCredentials();
    await LoginScreen.enterCredentials(
      credentials.username,
      credentials.password
    );

    const isLogoVisible = await MyStoreScreen.myStoreLogoIsDisplayed();
    expect(isLogoVisible, "Login falhou, logo da loja não visível").to.be.true;
  });

  it("[US-Catálogo_CT_MOB_01] Deve navegar para o catálogo e exibir a lista de produtos", async () => {
    await MyStoreScreen.navigateToProducts();

    const isListVisible = await CatalogPage.isProductListDisplayed();
    expect(isListVisible, "A lista de produtos deveria estar visível").to.be
      .true;

    const products = await CatalogPage.getProductItems();
    expect(
      products.length,
      "Deveria haver produtos na lista"
    ).to.be.greaterThan(0);
  });

  it("[US-Catálogo_CT_MOB_02] Deve ser capaz de abrir os detalhes de um produto do catálogo", async () => {
    const firstProductTitleTextBeforeClick =
      await CatalogPage.getFirstProductTitleText();
    expect(firstProductTitleTextBeforeClick).to.be.a("string").and.not.be.empty;

    await CatalogPage.clickFirstProduct();

    await driver.pause(2000);
  });
});
