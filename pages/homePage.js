import puppeteer, { errors, keyDefinitions } from "puppeteer";
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
    const testArr = [
      "https://www.rada.gov.ua/img/print-logo.png",
      "https://www.rada.gov.ua/2uploads/logos/c5d0c708ca35a9c80$$$8f8280017002df3.jpeg",
      "https://www.rada.gov.ua/upl2oads/logos/a0afe676c52ef4$$1cb6bde15742f2a6a2.jpeg",
    ];
    const arrWithCorruptedImages = [];
    const allImages = await this.page.$$eval(this.imgs, (allImages) =>
      allImages.map((image) => image.src)
    );
    const result = await Promise.all(
      allImages.map(async (image) => {
        try {
          const total = await axios.get(image, {
            validateStatus: (status) => status <= 200,
          });
        } catch (e) {
          arrWithCorruptedImages.push(image);
        }
      })
    );
    return arrWithCorruptedImages;
  }
}
