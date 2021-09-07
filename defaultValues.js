import puppeteer from "puppeteer";

export default class DefaulValues {
  president = "Президент";
  h1Rada = "Верховна Рада України";
  url = "https://www.rada.gov.ua/";

  constructor(page) {
    this.page = page;
  }
}
