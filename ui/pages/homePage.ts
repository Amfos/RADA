import puppeteer from 'puppeteer';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

export class HomePage {
  page: puppeteer.Page;
  searchHomeButton = 'input.search_button';
  imgs = `img`;
  href = `a[href*='://']`;

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
      await axios.get(image).catch(function (error) {
        if (error.status) {
          arrWithCorruptedImages.push(image + ` - ${error.response.status}`);
        }
      });
    }
    return arrWithCorruptedImages;
  }

  async getAllLinksStatus() {
    const arrWithCorruptedLinks: string[] = [];

    const links = await this.page.$$eval(this.href, (allLinks) => allLinks.map((el: any) => el.getAttribute('href')));
    // console.log(links);

    for (const el of links) {
      await axios.get(el).catch(function (error) {
        if (error.response) {
          arrWithCorruptedLinks.push(el + ` - ${error.response.status}`);
        }
      });
    }
    return arrWithCorruptedLinks;
  }
}
