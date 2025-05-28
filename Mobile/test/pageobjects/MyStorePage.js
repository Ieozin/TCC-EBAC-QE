const { $ } = require("@wdio/globals");

class MyStoreScreen {
  get #myStoreLogoAccessibilityId() {
    return $("~My store");
  }

  get #myStoreNameToolbar() {
    return $("id:toolbar_subtitle");
  }

  get #productsMenuItem() {
    return $("REPLACE_WITH_ACTUAL_PRODUCTS_MENU_SELECTOR");
  }

  async getStoreName() {
    return (await this.#myStoreNameToolbar).getText();
  }

  async myStoreLogoIsDisplayed() {
    await (
      await this.#myStoreLogoAccessibilityId
    ).waitForExist({ timeout: 15000 });
    return (await this.#myStoreLogoAccessibilityId).isDisplayed();
  }

  async navigateToProducts() {
    await (await this.#productsMenuItem).click();
  }
}

module.exports = new MyStoreScreen();
