const puppeteer = require('puppeteer');
const userFactory = require('../factories/userFactory');
const sessionFactory = require('../factories/sessionFactory');

class Page {
  constructor(page) {
    this.page = page;
  }

  static async build() {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    const customPage = new Page(page);

    return new Proxy(customPage, {
      get: function(target, property) {
        return customPage[property] || browser[property] || page[property];
      }
    });
  }

  async login() {
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);

    await this.page.setCookie({ name: 'session', value: session });
    await this.page.setCookie({ name: 'session.sig', value: sig });
    await this.page.goto('localhost:3000/blogs');
    await this.page.waitFor('a[href="/auth/logout"]');
  }

  getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }
}

module.exports = Page;
