import { expect, test } from '@playwright/test';

const validAccount = {
    username: "1107-thu",
    password: "HV%MhRjgyljzRDnxZCB(^Wl&"
};

const loginPageURL = "https://pw-practice-dev.playwrightvn.com/wp-admin";
const adminURL = "https://pw-practice-dev.playwrightvn.com/wp-admin/";

test.describe("POST-Post", async () => {

    test.beforeAll(async ({ page }) => {
        await page.goto(loginPageURL);
        await page.locator('//input[@id="user_login"]').fill(validAccount.username);
        await page.locator('//input[@id="user_pass"]').fill(validAccount.password);
        await page.locator('//input[@id="wp-submit"]').click();
        console.log("Current URT after login:", page.url());
        expect(page.url()).toContain(adminURL);

        // const postLocator = page.locator('//div[text() = "Posts"]');
        // await postLocator.waitFor({ state: 'visible', timeout: 6000 });
        // await postLocator.click();


    });

    // test.beforeEach(async ({ page }) => {
    //     const tagButton = page.locator('//a[text() = "Tags"]');
    //     await tagButton.waitFor({ state: 'visible', timeout: 6000 });
    //     await tagButton.click();

    // });

    test("@POST_TAG_001: Tag - add tag failed", async ({ page }) => {
        // await page.click('//a[text() = "Tags"]');

    });

});


