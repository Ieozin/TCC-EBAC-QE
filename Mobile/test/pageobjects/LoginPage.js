const { $ } = require("@wdio/globals");

class LoginScreen {
  get #storeAddressInput() {
    return $("android.widget.EditText");
  }

  get #continueButton() {
    return $("id:bottom_button");
  }

  get #continueWithStoreCredentialsButton() {
    return $("id:login_site_creds");
  }

  get #usernameInput() {
    return $('android=new UiSelector().text("Username")');
  }

  get #passwordInput() {
    return $('android=new UiSelector().text("Password")');
  }

  get #loginOrContinueAfterCredentialsButton() {
    return $("id:bottom_button");
  }

  get #twoFactorPasswordButton() {
    return $("id:login_enter_password");
  }

  async setStoreAddress(url) {
    await (await this.#storeAddressInput).setValue(url);
  }

  async tapContinue() {
    await (await this.#continueButton).click();
  }

  async tapContinueWithStoreCredentials() {
    await (await this.#continueWithStoreCredentialsButton).click();
  }

  async enterCredentials(username, password) {
    await (await this.#usernameInput).setValue(username);
    await (await this.#passwordInput).setValue(password);
    await (await this.#loginOrContinueAfterCredentialsButton).click();
  }

  async goToTwoFactorAuthScreen() {
    await (await this.#twoFactorPasswordButton).click();
  }

  async enterTwoFactorPassword(password) {
    await (await this.#passwordInput).setValue(password);
    await (await this.#loginOrContinueAfterCredentialsButton).click();
  }
}

module.exports = new LoginScreen();
