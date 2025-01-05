import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LibraryPage extends BasePage {
    [x: string]: any;
    //thuộc tính
    xpathAddNewMediaFile = '#add_new_media_file';
    xpathSelectFiles = '#select_files';

    //hàm khởi tạo
    constructor(page: Page) {
        super(page);
    }

    //method
    async navigateToLibraryPage() {
        await this.navigateTo('url_library_page');
    }

    async clickBtnAddNewMediaFile() {
        await this.page.locator(this.xpathBtnAddNewMediaFile).click();
    }

    async selectFiles() {
        await this.page.locator(this.xpathSelectFiles).click();
    }
}
