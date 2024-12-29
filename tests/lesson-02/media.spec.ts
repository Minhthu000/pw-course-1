import { expect, test } from '@playwright/test';

let xpathUserName = '//input[@id="user_login"]';
let xpathPassWord = '//input[@id="user_pass"]';
let xpathBtnSubmit = '//input[@id="wp-submit"]';
let xpathMenuMedia = "//div[text()='Media']";
let xpathMenuLibrary = "//a[text()='Library']";
let xpathBtnAddNewMediaFile =
    "//a[@class='page-title-action aria-button-if-js']";
// "//input[@id='html5_1ig83tm3262k1p1u183g1tb7bc93']"
let xpathBtnSelectFiles = "//input[@type='file']";

const evaluateClickByXpath = async (page, xpath) => {
    await page.evaluate((xpath) => {
        // find locator by xPath
        const element: any = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
        ).singleNodeValue;

        // click on locator
        element?.click();
    }, xpath);
};

test.describe('MEDIA-Media', async () => {
    const fileName = 'thu.txt';
    const filePath = 'D:\\pw-course\\data-test\\thu.txt';

    test.beforeEach(async ({ page }) => {
        const username = '1107-thu';
        const password = 'HV%MhRjgyljzRDnxZCB(^Wl&';

        await test.step('Go to Media Library', async () => {
            await page.goto(
                'https://pw-practice-dev.playwrightvn.com/wp-admin',
            );
            await page.locator(xpathUserName).fill(username);
            await page.locator(xpathPassWord).fill(password);
            await page.locator(xpathBtnSubmit).click();
            await page.locator(xpathMenuMedia).click();
            await page.locator(xpathMenuLibrary).click();
        });

        page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
    });

    test.afterEach(async ({ page }) => {
        await evaluateClickByXpath(page, `//div[text()='${fileName}']`);
        await page
            .locator("//button[@class='button-link delete-attachment']")
            .click();
        await expect(
            page.locator(`//div[text()='${fileName}']`),
        ).not.toBeVisible();
    });

    test('@MEDIA_FILES_001: Media - upload file success', async ({ page }) => {
        await test.step('Upload file to media library', async () => {
            await page.locator(xpathBtnAddNewMediaFile).click();
            await page.setInputFiles(xpathBtnSelectFiles, filePath);

            await expect(
                page.locator(`//div[text()='${fileName}']`),
            ).toBeVisible();
        });
    });
});
