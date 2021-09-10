import puppeteer from "puppeteer";
import axios from "axios";

export default class HomePage {
  searchHomeButton = "input.search_button";
  imgs = `img`;

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
  async getAllImagesStatus() {
    const allImages = await this.page.$$eval(this.imgs, (allImages) =>
      allImages.map((image) => image.src)
    );
    allImages.forEach((element) => {
      axios
        .get(element)
        .then((response) =>
          console.log(`${element} has status ${response.status}`)
        );
    });
  }
}
