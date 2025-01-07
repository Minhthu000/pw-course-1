// import { log } from 'console';
// import { LoginPage } from './../../page/login-page';
// import { expect, Page, test } from '@playwright/test';
// import { LibraryPage } from '../../page/library-page';

// test.describe('MEDIA-Media', async () => {
//     let xpathUserName = '//input[@id="user_login"]';
//     let xpathPassWord = '//input[@id="user_pass"]';
//     let xpathBtnSubmit = '//input[@id="wp-submit"]';
//     let xpathMenuMedia = "//div[text()='Media']";
//     let xpathMenuLibrary = "//a[text()='Library']";
//     let xpathBtnAddNewMediaFile = "//a[@class='page-title-action aria-button-if-js']";
//     let xpathBtnSelectFiles = "//input[@type='file']";
//     const fileName = 'thu.txt';
//     const filePath = 'D:\\pw-course\\data-test\\thu.txt';
//     const username = '1107-thu';
//     const password = 'HV%MhRjgyljzRDnxZCB(^Wl&';

//     test.beforeEach(async ({ page }) => {
//         await test.step('Go to Media Library', async () => {
//             await LoginPage.login(username, password);
//             await page.waitForLoadState('load');
            
            

//             await page.locator(xpathMenuMedia).click();
//             await page.locator(xpathMenuLibrary).click();
//         });

//         page.on('dialog', async (dialog) => {
//             await dialog.accept();
//         });
//     });

//     test.afterEach(async ({ page }) => {
//         await evaluateClickByXpath(page, `//div[text()='${fileName}']`);
//         await page.locator("//button[@class='button-link delete-attachment']").click();
//         await expect(page.locator(`//div[text()='${fileName}']`)).not.toBeVisible();
//     });

//     test('@MEDIA_FILES_001: Media - upload file success', async ({ page }) => {
//         await test.step('Upload file to media library', async () => {
//             await page.locator(xpathBtnAddNewMediaFile).click();
//             await page.setInputFiles(xpathBtnSelectFiles, filePath);

//             await expect(page.locator(`//div[text()='${fileName}']`)).toBeVisible();
//         });
//     });
// });
// function evaluateClickByXpath(page: Page, arg1: string) {
//     throw new Error('Function not implemented.');
// }
