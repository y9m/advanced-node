const puppeteer = require('puppeteer');

test('Can launch a new broweser', async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
});
