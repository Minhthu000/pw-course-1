import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
    static login(username: string, password: string) {
        throw new Error('Method not implemented.');
    }
    // thuộc tính
    xpathUserName = '#user_name';
    xpathPassword = '#password';
    xpathBtnSubmit = '#login';

    //hàm khởi tạo
    constructor(page: Page) {
        super(page);
    }

    //method
    async navigateToLoginPage() {
        await this.navigate('url_login_page');
    }

    async fillUsername(username: string) {
        await this.page.locator(this.xpathUserName).fill(username);
    }

    async fillPassword(password: string) {
        await this.page.locator(this.xpathPassword).fill(password);
    }

    async clickBtnLogin() {
        await this.page.locator(this.xpathBtnSubmit).click();
    }

    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickBtnLogin();
    }
}
