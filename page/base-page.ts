import { Page } from '@playwright/test';

export class BasePage {
    // thuộc tính
    xpathDashboard = '#dashboard';
    page: Page;

    //hàm khởi tạo
    constructor(page: Page) {
        this.page = page;
    }

    //method
    async navigate(url: string) {
        await this.page.goto(url);
    }
}
