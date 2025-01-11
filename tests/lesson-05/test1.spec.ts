import { conduitAccount } from '../../data-test/account';
import { SignUpPage } from './../../page/sign-up-page';
import { test, expect } from '@playwright/test';

test.describe('Test 1', () => {
    test('Test 1: Đăng kí tài khoản', async ({ page }) => {
        const signUpPage = new SignUpPage(page);

        //Đi đến trang đăng kí
        await signUpPage.goto();

        //Đăng kí tài khoản
        await signUpPage.fillFormSignUp(conduitAccount);

        const loggedInUserName = await signUpPage.getLoggedInUserName();
        expect(loggedInUserName?.trim()).toBe(conduitAccount.username);
    });
});
