import puppeteer from "puppeteer";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import ResultPage from "../pages/resultPage.js";

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
    jest.setTimeout(20000);
  });

  // afterEach(async () => {
  //   await browser.close(), 10000;
  // });

  test("Rada name check", async () => {
    const president = "Президент";
    const nameRadaCheck = "Верховна Рада України";
    const url = "https://www.rada.gov.ua/";

    await homePage.goToHomePage(url);
    await homePage.goToSearchPage();
    await searchPage.typePresidentName(president);
    await searchPage.clickOnSectionButton();
    await searchPage.clickOnDropDownMenu();
    await searchPage.clickRadioButton();
    await searchPage.clickOnSearch();
    await resultPage.numberOfResults();
    expect(await resultPage.headerRadaCheck(nameRadaCheck)).toBe(nameRadaCheck);
    await resultPage.checkInputValue(president);
    await resultPage.checkAmountOfVideoNews();
    // await browser.close();
  }, 20000);

  // test("adds 1 + 2 to equal 3", async () => {
  //   expect(1 + 2).toBe(3);
  // });
});
