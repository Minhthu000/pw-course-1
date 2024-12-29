import { expect, test } from '@playwright/test';

let validAccount = {
    username: '1107-thu',
    password: 'HV%MhRjgyljzRDnxZCB(^Wl&',
};

let invalidAccount = {
    username: 'abc',
    password: '123',
};

const loginPageURL = 'https://pw-practice-dev.playwrightvn.com/wp-admin';
const loginErrorMessage = 'is not registered on this site';

let xpathUserName = '//input[@id="user_login"]';
let xpathPassword = '//input[@id="user_pass"]';
let xpathBtnSubmit = '//input[@id="wp-submit"]';
let xpathLoginError = '//div[@id="login_error"]';

test.describe('AUTH-Authentication', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(loginPageURL);
    });

    test('@AUTH_001: Login fail', async ({ page }) => {
        await test.step('Nhập vào thông tin username, password bị sai', async () => {
            await page.locator(xpathUserName).fill(invalidAccount.username);
            await page.locator(xpathPassword).fill(invalidAccount.password);

            //Kiểm tra giá trị của username password đã nhập
            const actualUsername = await page.locator(xpathUserName).inputValue();
            const actualPassword = await page.locator(xpathPassword).inputValue();

            expect(actualUsername).toBe(invalidAccount.username);
            expect(actualPassword).toBe(invalidAccount.password);
        });

        await test.step('Click button login', async () => {
            //click button
            await page.locator(xpathBtnSubmit).click();
            await expect(page.locator(xpathLoginError)).toContainText(loginErrorMessage);
        });
    });

    test('@AUTH_002: Login success', async ({ page }) => {
        await test.step('Nhập vào thông tin username, password đúng', async () => {
            await page.locator(xpathUserName).fill(validAccount.username);
            await page.locator(xpathPassword).fill(validAccount.password);

            //Kiểm tra giá trị của username password đã nhập
            const actualUsername = await page.locator(xpathUserName).inputValue();
            const actualPassword = await page.locator(xpathPassword).inputValue();
            expect(actualUsername).toBe(validAccount.username);
            expect(actualPassword).toBe(validAccount.password);
        });

        await test.step('Click button login', async () => {
            //click button
            await page.locator(xpathBtnSubmit).click();
            const adminURL = page.url();
            expect(adminURL).toContain('/wp-admin');

            const headingDashboard = page.locator("//h1[text()='Dashboard']");
            const headingAtAGlance = page.locator("//h2[text()='At a Glance']");
            const headingActivity = page.locator("//h2[text()='Activity']");

            await expect(headingDashboard).toBeVisible();
            await expect(headingAtAGlance).toBeVisible();
            await expect(headingActivity).toBeVisible();
        });
    });
});
