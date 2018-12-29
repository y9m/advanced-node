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
});
