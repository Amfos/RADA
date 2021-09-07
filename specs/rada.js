import puppeteer from "puppeteer";
import HomePage from "../pages/homePage.js";
import SearchPage from "../pages/searchPage.js";
import ResultPage from "../pages/ResultPage.js";
import DefaultValues from "../defaultValues.js";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 960,
    },
  });
  const page = await browser.newPage();
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const resultPage = new ResultPage(page);
  const defaultValues = new DefaultValues(page);

  await homePage.goToHomePage(defaultValues.url);
  await homePage.goToSearchPage();
  await searchPage.typePresidentName();
  await searchPage.clickOnSectionButton();
  await searchPage.clickOnDropDownMenu();
  await searchPage.clickRadioButton();
  await searchPage.clickOnSearch();
  await resultPage.numberOfResults();
  await resultPage.headerRadaCheck();
  await resultPage.checkInputValue();
  await resultPage.checkAmountOfVideoNews();
})();
