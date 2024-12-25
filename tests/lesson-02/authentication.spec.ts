import { expect, test } from '@playwright/test';

let validAccount = {
    username: "1107-thu",
    password: "HV%MhRjgyljzRDnxZCB(^Wl&"
};

let invalidAccount = {
    username: "abc",
    password: "123"
};

const loginPageURL = "https://pw-practice-dev.playwrightvn.com/wp-admin";
const loginErrorMessage = "is not registered on this site";

test.describe("AUTH-Authentication", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(loginPageURL)
    });


    test("@AUTH_001: Log fail", async ({ page }) => {
        await test.step("Nhập vào thông tin username, password bị sai", async () => {
            //Nhập username, password 
            await page.locator('//input[@id="user_login"]').fill(invalidAccount.username);
            await page.locator('//input[@id="user_pass"]').fill(invalidAccount.password);

            //Kiểm tra giá trị của username password đã nhập
            const actualUsername = await page.locator('//input[@id="user_login"]').inputValue();
            const actualPassword = await page.locator('//input[@id="user_pass"]').inputValue();
            expect(actualUsername).toBe(invalidAccount.username);
            expect(actualPassword).toBe(invalidAccount.password);
        });

        await test.step("Click button login", async () => {
            //click button
            await page.locator('//input[@id="wp-submit"]').click();
            await expect(page.locator('//div[@id="login_error"]')).toContainText(loginErrorMessage);
        });

    });
    test("@AUTH_002: Login success", async ({ page }) => {
        await test.step("Nhập vào thông tin username, password đúng", async () => {
            await page.locator('//input[@id="user_login"]').fill(validAccount.username);
            await page.locator('//input[@id="user_pass"]').fill(validAccount.password);

            //Kiểm tra giá trị của username password đã nhập
            const actualUsername = await page.locator('//input[@id="user_login"]').inputValue();
            const actualPassword = await page.locator('//input[@id="user_pass"]').inputValue();
            expect(actualUsername).toBe(validAccount.username);
            expect(actualPassword).toBe(validAccount.password);
        });

        await test.step("Click button login", async () => {
            //click button
            await page.locator('//input[@id="wp-submit"]').click();
            const adminURL = page.url();
            expect(adminURL).toContain('/wp-admin');
        });
    });
});


