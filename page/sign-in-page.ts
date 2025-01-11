import { PageBase } from './page-base';

export class SignInPage extends PageBase {
    url = 'https://conduit.bondaracademy.com/login';
    
    xpathEmail = "//input[@placeholder='Email']";
    xpathPassword = "//input[@placeholder='Password']";
    xpathBtnSignIn = "//button[@type='submit']";
    userPicLocator = '.nav-item .nav-link .user-pic';

    async fillEmail(email: string) {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async fillPassword(password: string) {
        await this.page.locator(this.xpathPassword).fill(password);
    }

    async clickSignIn() {
        await this.page.locator(this.xpathBtnSignIn).click();
    }

    async fillFormSignIn(information: { email: string; password: string }) {
        await this.fillEmail(information.email);
        await this.fillPassword(information.password);
        await this.clickSignIn();
    }

    async getLoggedInUserName() {
        const userLogged = await this.page.locator(this.userPicLocator).locator('../..');
        return await userLogged.textContent();
    }
}
