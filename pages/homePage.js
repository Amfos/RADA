import puppeteer from "puppeteer";

export default class HomePage {
  searchHomeButton = "input.search_button";

  constructor(page) {
    this.page = page;
  }

  async goToHomePage(url) {
    await this.page.goto(url, {
      waitUntil: "load",
      timeout: 5000,
    });
  }
  async goToSearchPage() {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(this.searchHomeButton),
    ]);
  }
}
