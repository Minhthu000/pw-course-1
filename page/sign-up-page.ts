import { PageBase } from './page-base';

export class SignUpPage extends PageBase {
    url = 'https://conduit.bondaracademy.com/register';

    xpathUserName = "//input[@placeholder='Username']";
    xpathEmail = "//input[@placeholder='Email']";
    xpathPassword = "//input[@placeholder='Password']";
    xpathBtnSignIn = "//button[@type='submit']";
    userPicLocator = '.nav-item .nav-link .user-pic';

    async openSignUpPage() {
        await this.page.goto('https://conduit.bondaracademy.com/register');
    }

    async fillUserName(username: string) {
        await this.page.locator(this.xpathUserName).fill(username);
    }

    async fillEmail(email: string) {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async fillPassword(password: string) {
        await this.page.locator(this.xpathPassword).fill(password);
    }

    async clickSignIn() {
        await this.page.locator(this.xpathBtnSignIn).click();
    }

    async fillFormSignUp(information: { username: string; email: string; password: string }) {
        await this.fillUserName(information.username);
        await this.fillEmail(information.email);
        await this.fillPassword(information.password);
        await this.clickSignIn();
    }

    async getLoggedInUserName() {
        const userLogged = await this.page.locator(this.userPicLocator).locator('../..');
        return await userLogged.textContent();
    }
}
