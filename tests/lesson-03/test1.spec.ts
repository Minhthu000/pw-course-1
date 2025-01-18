import { expect, test } from '@playwright/test';
import { RegisterPage } from '../../page/register-page';

let date = '2025-07-01';
let username = 'Kim Xuyen';
let email = 'kimxuyen@gmail.com';
let description = 'Nice to meet you!';

test('Exercise 1: Register Page', async ({ page }) => {
    let registerPage = new RegisterPage(page);

    await test.step('Truy cập trang Register', async () => {
        await registerPage.goToRegisterPage();
    });
    await test.step('Nhập đầy đủ thông tin, click button register', async () => {
        await registerPage.fillUsername(username);
        await registerPage.fillEmail(email);
        await registerPage.checkGender('Female');
        await registerPage.checkHobbies('cooking');
        await registerPage.selectInterest('music');
        await registerPage.selectCountry('canada');
        await registerPage.fillDateOfBirth(date);
        await registerPage.chooseFile('data-test/image.png');
        await registerPage.fillBiography(description);
        await registerPage.checkNewsletter();

        await registerPage.clickRegister();
    });

    await test.step('Kiểm nội dung đã đăng kí ở bảng là đúng', async () => {
        const userInfor = await registerPage.getInfoNewestInTable();
        const actualUsername = userInfor.username;
        const actualEmail = userInfor.email;
        const actualInformation = userInfor.information;

        //verify username
        expect(actualUsername).toBe(username);

        //verify email
        expect(actualEmail).toBe(email);

        //verify information
        expect(actualInformation).toContain('female');
        expect(actualInformation).toContain('cooking');
        expect(actualInformation).toContain('canada');
        expect(actualInformation).toContain(date);
        expect(actualInformation).toContain(description);
        expect(actualInformation).toContain('Yes');
    });
});
