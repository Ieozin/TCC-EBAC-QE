const { $, $$ } = require("@wdio/globals");

class CatalogPage {
  get productListRecyclerView() {
    return $(
      'android=new UiSelector().resourceIdMatches(".*id/products_list.*|.*id/product_recycler_view.*")'
    );
  }

  get productItems() {
    return $$(
      'android=new UiSelector().resourceIdMatches(".*id/product_cell.*|.*id/list_item_product.*")'
    );
  }

  async isProductListDisplayed() {
    await (
      await this.productListRecyclerView
    ).waitForDisplayed({ timeout: 15000 });
    return (await this.productListRecyclerView).isDisplayed();
  }

  async getProductItems() {
    return this.productItems;
  }

  async getFirstProductTitleText() {
    const items = await this.productItems;
    if (items.length > 0) {
      const titleElement = await items[0].$(
        'android=new UiSelector().resourceIdMatches(".*id/product_name.*|.*id/title_text_view.*")'
      );
      return titleElement.getText();
    }
    return null;
  }

  async clickFirstProduct() {
    const items = await this.productItems;
    if (items.length > 0) {
      await items[0].click();
    } else {
      throw new Error("Nenhum produto encontrado na lista para clicar.");
    }
  }
}

module.exports = new CatalogPage();
