import { $, $$ } from "@wdio/globals";

class BrowsePage {
  get searchInput() {
    return $(`~searchInput`);
  }

  get products() {
    return $$(`~productDetails`);
  }

  async getFirstProductElement() {
    const productList = await this.products;
    if (productList.length > 0) {
      return productList[0];
    }
    throw new Error("Nenhum produto encontrado na lista.");
  }
}

export default new BrowsePage();
