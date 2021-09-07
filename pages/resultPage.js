import puppeteer from "puppeteer";
import DefaultValues from "../defaultValues.js";

export default class ResultPage {
  totalResult =
    "//div[@class='search-heading' and contains(text(),'Результати запиту')]";
  h1Rada = "//*[@id='header']//h1";
  videoLabels = "//ol[@class='search-result']";
  videoTest = "//li[@class=meeting_search_result']";

  constructor(page) {
    this.page = page;
    this.defaultValues = new DefaultValues(page);
  }

  async numberOfResults() {
    const totalResult = await this.page.waitForXPath(this.totalResult);
    let value = await this.page.evaluate((el) => el.textContent, totalResult);
    console.log(
      `Total number is = ${parseInt(value.replaceAll(/[^0-9]/g, ""))}`
    );
  }
  async headerRadaCheck() {
    const h1Rada = await this.page.waitForXPath(this.h1Rada);
    let value = await this.page.evaluate((el) => el.textContent, h1Rada);
    console.log(
      `H1 is "${value}" and status - ${value === this.defaultValues.rada}`
    );
  }
  async checkInputValue() {
    const totalResult = await this.page.waitForXPath(this.totalResult);
    let value = await this.page.evaluate((el) => el.textContent, totalResult);
    console.log(
      `Input value ${this.defaultValues.president} is ${value.includes(
        this.defaultValues.president
      )}`
    );
  }
  async checkAmountOfVideoNews() {
    const videoLabels = await this.page.waitForXPath(this.videoLabels);
    let videos = await this.page.evaluate(
      (el) => el.getElementsByClassName("btn-video"),
      videoLabels
    );
    const countedVideoNews = Object.keys(videos).length;
    console.log(`News with video stream = ${countedVideoNews}`);
  }
}
