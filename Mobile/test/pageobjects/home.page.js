import { $ } from "@wdio/globals";

class HomePage {
  /**
   * @param {string} tabName
   */
  async openTab(tabName) {
    const tabSelector = $(`~${tabName}`);

    console.log(`Aguardando a aba '${tabName}' aparecer...`);
    await tabSelector.waitForDisplayed({ timeout: 20000 });

    console.log(`Aba '${tabName}' visível. Clicando...`);
    await tabSelector.click();
  }
}

export default new HomePage();
