import puppeteer, { ElementHandle } from "puppeteer";

export default class ResultPage {
  totalResult = `//div[@class='search-heading' and contains(text(),'Результати запиту')]`;
  h1Rada = `//*[@id='header']//h1`;
  videoLabel = `//ol[@class='search-result']//span[@class='btn-video']`;

  constructor(page) {
    this.page = page;
  }

  async getNumberOfResult() {
    const totalResult = await this.page.waitForXPath(this.totalResult);
    const value = await this.page.evaluate((el) => el.innerText, totalResult);
    const res = value.replace(/[^0-9]/g, "");
    return res;
  }

  async getTextFromHeader() {
    const h1Rada = await this.page.waitForXPath(this.h1Rada);
    let value = await this.page.evaluate((el) => el.textContent, h1Rada);
    return value;
  }
  async getInputtedText() {
    const totalResult = await this.page.waitForXPath(this.totalResult);
    let value = await this.page.evaluate((el) => el.textContent, totalResult);
    return value;
  }

  async getNumberOfVideoLabels() {
    const videoLabelss = await this.page.$x(this.videoLabel);
    return videoLabelss.length;
  }
}
