const HomeScreen = require("../pageobjects/HomePage");
const LoginScreen = require("../pageobjects/LoginPage");
const MyStoreScreen = require("../pageobjects/MyStorePage");
const credentials = require("../fixtures/credentials.json");
const { expect } = require("chai");

describe("Acesso ao Painel da Loja Mobile", () => {
  it("Deve fazer login com credenciais válidas", async () => {
    await LoginScreen.setStoreAddress(credentials.storeUrl);
    await LoginScreen.tapContinue();

    await LoginScreen.tapContinueWithStoreCredentials();

    await LoginScreen.enterCredentials(
      credentials.username,
      credentials.password
    );

    const isLogoVisible = await MyStoreScreen.myStoreLogoIsDisplayed();
    expect(isLogoVisible, "O logo da loja não está visível após o login").to.be
      .true;

    const storeName = await MyStoreScreen.getStoreName();
    expect(storeName, "Nome da loja incorreto").to.equal("EBAC - Shop"); // Verifique o nome real
  });
});
