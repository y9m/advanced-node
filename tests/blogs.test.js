const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
  await page.waitFor('a.brand-logo');
});

afterEach(async () => {
  await page.close();
});

describe('When logged in', () => {
  beforeEach(async () => {
    await page.login();
    await page.click('a.btn-floating');
  });

  test('Can see blog creation form', async () => {
    const label = await page.getContentsOf('form label');

    expect(label).toEqual('Blog Title');
  });

  describe('Using valid inputs', () => {
    beforeEach(async () => {
      await page.type('.title input', 'My Title');
      await page.type('.content input', 'My Content');
      await page.click('form button');
    });

    test('Submitting takes user to confirmation screen', async () => {
      const text = await page.getContentsOf('h5');

      expect(text).toEqual('Please confirm your entries');
    });
  });

  describe('Using invalid inputs', () => {
    beforeEach(async () => {
      await page.click('form button');
    });

    test('The form shows an error message', async () => {
      const titleError = await page.getContentsOf('.title .red-text');
      const contentError = await page.getContentsOf('.content .red-text');

      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    });
  });
});
