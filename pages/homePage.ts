import puppeteer, { ElementHandle } from 'puppeteer';
import axios from 'axios';

export class HomePage {
  page: puppeteer.Page;
  searchHomeButton = 'input.search_button';
  imgs = `img`;
  // footer = `//div[@id='footer']//*/@href`;
  footer = `a[href*='://']`;

  constructor(page: puppeteer.Page) {
    this.page = page;
  }

  async goToHomePage(url: string) {
    await this.page.goto(url, {
      waitUntil: 'load',
      timeout: 5000,
    });
  }

  async goToSearchPage() {
    await Promise.all([this.page.waitForNavigation(), this.page.click(this.searchHomeButton)]);
  }

  async getAllImagesStatus() {
    const arrWithCorruptedImages: string[] = [];

    const allImages: any = await this.page.$$eval(this.imgs, (allImages) =>
      allImages.map((image: any) => {
        const link: string[] = image.getAttribute('src');
        return `https://www.rada.gov.ua${link.indexOf('/') == 0 ? '' : '/'}${link}`;
      })
    );

    for (const image of allImages) {
      try {
        const resp = await axios.get(image, {
          validateStatus: (status) => status === 200,
        });
      } catch (e) {
        arrWithCorruptedImages.push(`${image}`);
      }
    }
    return arrWithCorruptedImages;
  }

  async getAllLinksStatus() {
    const arrWithCorruptedLinks: string[] = [];

    const links = await this.page.$$eval(this.footer, (allLinks) => allLinks.map((el: any) => el.getAttribute('href')));
    for (const link of links) {
      try {
        const resp = await axios.get(link, { validateStatus: (status) => status === 200 });
      } catch (e) {
        arrWithCorruptedLinks.push(link);
      }
    }
    return arrWithCorruptedLinks;
  }
}
