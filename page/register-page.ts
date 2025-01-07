import { Page } from '@playwright/test';
import { MaterialBasePage } from './material-page';

export class RegisterPage extends MaterialBasePage {
    xpathUserName = "//input[@id='username']";
    xpathEmail = "//input[@id='email']";
    xpathGenderMale = "//input[@id='male']";
    xpathGenderFemale = "//input[@id='female']";
    getXpathOptionHobbies(hobby: 'reading' | 'traveling' | 'cooking') {
        return `//input[@id='${hobby}']`;
    }
    xpathSelectInterest = "//select[@id='interests']";
    xpathSelectCountry = "//select[@id='country']";
    xpathDateOfBirth = "//input[@id='dob']";
    xpathProfilePicture = "//input[@id='profile']";
    xpathBiography = "//textarea[@id='bio']";
    xpathNewsletter = "//input[@id='newsletter']";
    xpathBtnRegister = "//button[contains(text(), 'Register')]";

    constructor(page: Page) {
        super(page);
    }

    async goToRegisterPage() {
        await this.openMaterialPage();
        await this.gotoPage('Register Page');
    }

    async fillUsername(username: string) {
        await this.page.locator(this.xpathUserName).fill(username);
    }

    async fillEmail(email: string) {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async checkGender(gender: 'Male' | 'Female') {
        if (gender == 'Male') {
            await this.page.locator(this.xpathGenderMale).check();
        }

        if (gender == 'Female') {
            await this.page.locator(this.xpathGenderFemale).check();
        }
    }

    async checkHobbies(hobby: 'reading' | 'traveling' | 'cooking') {
        await this.page.locator(this.getXpathOptionHobbies(hobby)).check();
    }

    async selectInterest(interestValue: 'technology' | 'science' | 'art' | 'music' | 'sports') {
        await this.page.selectOption(this.xpathSelectInterest, interestValue);
    }

    async selectCountry(countryValue: 'united states' | 'canada' | 'united kingdom' | 'australia') {
        await this.page.selectOption(this.xpathSelectCountry, countryValue);
    }

    async fillDateOfBirth(date: string) {
        await this.page.locator(this.xpathDateOfBirth).fill(date);
    }

    async chooseFile(filePath: string) {
        await this.page.locator(this.xpathProfilePicture).setInputFiles(filePath);
    }

    async fillBiography(biography: string) {
        await this.page.locator(this.xpathBiography).fill(biography);
    }

    async checkNewsletter() {
        await this.page.locator(this.xpathNewsletter).check();
    }

    async clickRegister() {
        await this.page.locator(this.xpathBtnRegister).click();
    }

    async fillFormRegister(information: {
        username: string;
        email: string;
        gender: 'Male' | 'Female';
        hobby: 'reading' | 'traveling' | 'cooking';
        interestValue: 'technology' | 'science' | 'art' | 'music' | 'sports';
        countryValue: 'united states' | 'canada' | 'united kingdom' | 'australia';
        date: string;
        filePath: string;
        biography: string;
    }) {
        await this.fillUsername(information.username);
        await this.fillEmail(information.email);
        await this.checkGender(information.gender);
        await this.checkHobbies(information.hobby);
        await this.selectInterest(information.interestValue);
        await this.selectCountry(information.countryValue);
        await this.fillDateOfBirth(information.date);
        await this.chooseFile(information.filePath);
        await this.fillBiography(information.biography);
        await this.clickRegister();
    }

    async getInfoNewestInTable() {
        const numberOfRow = await this.page.locator('//tbody/tr').count();
        const actualUsername = await this.page.locator(`//tbody/tr[${numberOfRow}]/td[2]`).textContent();
        let userInfor = {
            username: actualUsername,
            email: await this.page.locator(`//tbody/tr[${numberOfRow}]/td[3]`).textContent(),
            information: await this.page.locator(`//tbody/tr[${numberOfRow}]/td[4]`).textContent(),
        };

        return userInfor;
    }
}
