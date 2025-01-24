import { test as base } from "@playwright/test";

const xpathUserName = '//input[@id="user_login"]';
const xpathPassWord = '//input[@id="user_pass"]';
const xpathBtnSubmit = '//input[@id="wp-submit"]';
const xpathMenuTags = "//a[text()='Tags']";
const xpathBtnAddNewTag = "//input[@id='submit']";
const xpathInputName = "//input[@id='tag-name']";
const xpathInputSlug = "//input[@id='tag-slug']";

const myTag = base.extend<{
  createTag: (tagName: string, slugName?: string) => Promise<void>;
}>({

  page: async ({ page }, use) => {
    const username = "1107-thu";
    const password = "HV%MhRjgyljzRDnxZCB(^Wl&";

    await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
    await page.fill(xpathUserName, username);
    await page.fill(xpathPassWord, password);
    await page.click(xpathBtnSubmit);
    await page.waitForLoadState("domcontentloaded");

    await page.locator(xpathMenuTags).click();


    const createNewTags = ["t1", "t2"];
    for (const tag of createNewTags) {
      await page.fill(xpathInputName, tag);
      await page.click(xpathBtnAddNewTag);
      await page.waitForSelector(`//tbody//a[contains(text(),"${tag}")]`);
    }

    await use(page);

    for (const tag of createNewTags) {
      const tagLocator = `//tbody//a[contains(text(),"${tag}")]`;
      if (await page.locator(tagLocator).isVisible()) {
        await page.locator(tagLocator).hover();
        await page.click(`//a[@aria-label='Delete "${tag}"']`);
        await page.waitForLoadState("load");
      }
    }
  },

  createTag: async ({ page }, use) => {
    await use(async (tagName: string, slugName?: string) => {
      await page.fill(xpathInputName, tagName);
      if (slugName) {
        await page.fill(xpathInputSlug, slugName);
      }
      await page.click(xpathBtnAddNewTag);
      await page.waitForSelector(`//tbody//a[contains(text(),'${tagName}')]`);
    });
  },
});

export { myTag };
