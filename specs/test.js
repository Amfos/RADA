import "jest-extended";
import puppeteer from "puppeteer";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import ResultPage from "../pages/resultPage.js";
import axios from "axios";

describe("Result status", () => {
  let page;
  let homePage;
  let searchPage;
  let resultPage;
  let browser;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1280,
        height: 960,
      },
    });
    page = await browser.newPage();
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    resultPage = new ResultPage(page);
  });

  afterEach(async () => {
    await browser.close();
  });

  test("Rada name check", async () => {
    const president = "Президент";
    const nameRadaCheck = "Верховна Рада України";
    const url = "https://www.rada.gov.ua/";

    await homePage.goToHomePage(url);
    await homePage.goToSearchPage();
    await searchPage.inputTextIntoSearchField(president);
    await searchPage.clickOnSectionButton();
    await searchPage.clickOnDropDownMenu();
    await searchPage.clickOnRadioButton();
    await searchPage.clickOnSearch();
    console.log(`Search result :`, await resultPage.getNumberOfResult());
    expect(await resultPage.getTextFromHeader()).toBe(nameRadaCheck);
    expect(await resultPage.getInputtedText()).toContain(president);
    console.log(
      `Number of video labels :`,
      await resultPage.checkNumberOfVideos()
    );
  });

  test("Check all images for status 200", async () => {
    const url = "https://www.rada.gov.ua/";

    await homePage.goToHomePage(url);
    console.log(
      await homePage.getAllImagesStatus(),
      `Images don't have response 200`
    );
  });
});
