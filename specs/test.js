import puppeteer from "puppeteer";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import ResultPage from "../pages/ResultPage.js";

describe("Result status", () => {
  async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1280,
        height: 960,
      },
    });

    test("Browser closes", async () => {
      const page = await browser.newPage();
      const homePage = new HomePage(page);
      const searchPage = new SearchPage(page);
      const resultPage = new ResultPage(page);

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
      await resultPage.headerRadaCheck(nameRadaCheck);
      expect(await resultPage.checkInputValue(president)).toEqual(president);
      await resultPage.checkAmountOfVideoNews();
      await browser.close();
    });
  };
});
