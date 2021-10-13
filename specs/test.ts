import 'jest-extended';
import puppeteer from 'puppeteer';
import { HomePage, SearchPage, ResultPage, GeneralMethods } from '../pages/index';
import puppeteerConfig from '../puppeteer.config.json';

describe('Result status', () => {
  let page: puppeteer.Page;
  let browser: puppeteer.Browser;

  let homePage: HomePage;
  let searchPage: SearchPage;
  let resultPage: ResultPage;
  let generalMethods: GeneralMethods;

  beforeEach(async () => {
    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();

    generalMethods = new GeneralMethods();
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    resultPage = new ResultPage(page);
  });

  afterEach(async () => {
    // await browser.close();
  });

  test('Rada name check', async () => {
    const president = 'Президент';
    const nameRadaCheck = 'Верховна Рада України';
    const url = 'https://www.rada.gov.ua';

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
    console.log(`Number of video labels :`, await resultPage.getNumberOfVideoLabels());
  });

  test('Check all images for status 200', async () => {
    const url = 'https://www.rada.gov.ua';

    await homePage.goToHomePage(url);
    console.log(await homePage.getAllImagesStatus(), `Images don't have response 200`);
  });

  test.only('Check all FooterLinks for status 200', async () => {
    const url = 'https://www.rada.gov.ua';

    await homePage.goToHomePage(url);
    console.log(await homePage.getAllLinksStatus(), `Links don't have response 200`);
  });

  test('Сheck TodayDate between input field and picker', async () => {
    const url = 'https://www.rada.gov.ua';
    const president = 'Президент';

    await homePage.goToHomePage(url);
    await homePage.goToSearchPage();
    await searchPage.inputTextIntoSearchField(president);
    await searchPage.clickOnSectionButton();
    await searchPage.clickOnDropDownMenu();
    await searchPage.clickOnRadioButton();
    await searchPage.clickOnCalendar();
    await searchPage.pickerToday();
    await searchPage.clickOnSearch();
    expect(await resultPage.getDateFromDateField()).toEqual(await generalMethods.getTodayDate());
  });
});
