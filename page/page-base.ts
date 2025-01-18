import { Page } from '@playwright/test';

export class PageBase {
    page: Page;
    url?: string;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        if (!this.url) {
            throw new Error('Không có link của page');
        }

        await this.page.goto(this.url);
    }
}
