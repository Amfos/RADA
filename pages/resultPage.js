import puppeteer from "puppeteer";

export default class ResultPage {
  totalResult =
    "//div[@class='search-heading' and contains(text(),'Результати запиту')]";
  h1Rada = "//*[@id='header']//h1";
  videoLabels = "//ol[@class='search-result']";

  constructor(page) {
    this.page = page;
  }

  async numberOfResults() {
    const totalResult = await this.page.waitForXPath(this.totalResult);
    let value = await this.page.evaluate((el) => el.textContent, totalResult);
    console.log(
      `Total number is = ${parseInt(value.replaceAll(/[^0-9]/g, ""))}`
    );
  }
  async headerRadaCheck(nameRadaCheck) {
    const h1Rada = await this.page.waitForXPath(this.h1Rada);
    let value = await this.page.evaluate((el) => el.textContent, h1Rada);
    console.log(`H1 is "${value}" and status - ${value === nameRadaCheck}`);
  }
  async checkInputValue(president) {
    const totalResult = await this.page.waitForXPath(this.totalResult);
    let value = await this.page.evaluate((el) => el.textContent, totalResult);
    console.log(`Input value ${president} is ${value.includes(president)}`);
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
