const { $ } = require("@wdio/globals");

class HomeScreen {
  get #enterStoreAddressButton() {
    return $("id:button_login_store");
  }

  async goToLoginOrStoreAddress() {
    await (await this.#enterStoreAddressButton).click();
  }
}

module.exports = new HomeScreen();
