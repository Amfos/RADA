import puppeteer from 'puppeteer';

export class SearchPage {
  page: puppeteer.Page;

  inputNameField = "input[name='search'].form-control";
  sectionButton = 'button[data-id="exampleTheme"]';
  dropDownItem = "//*[@class='dropdown-menu show']//span[text()='Новини']";
  radioCheckBoxButton = "//label[@for='date_type1']";
  searchButton = "//form[@id='sendForm']//a[@class='btn btn-yellow sendcomm']";

  constructor(page: puppeteer.Page) {
    this.page = page;
  }

  async inputTextIntoSearchField(president: string) {
    await this.page.type(this.inputNameField, president);
  }
  async clickOnSectionButton() {
    await this.page.click(this.sectionButton);
  }

  async clickOnDropDownMenu() {
    await this.page.waitForXPath(this.dropDownItem, {
      visible: true,
      timeout: 5000,
    });
    const dropDownItem = await this.page.waitForXPath(this.dropDownItem);
    await dropDownItem!.click();
  }
  async clickOnRadioButton() {
    const radioCheckBoxButton = await this.page.waitForXPath(
      this.radioCheckBoxButton
    );
    await radioCheckBoxButton!.click();
  }

  async clickOnSearch() {
    const searchButton = await this.page.waitForXPath(this.searchButton);
    await searchButton!.click();
  }
}
