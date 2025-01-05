import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class TagPage extends BasePage {
    static fillTagName(arg0: string) {
        throw new Error('Method not implemented.');
    }
    static clickBtnAddNewTag() {
        throw new Error('Method not implemented.');
    }
    //thuộc tính
    xpathInputTagName = '#input_tag';
    xpathInputSlug = '#slug';
    xpathBtnAddNewTag = '#add_new_tag';

    //hàm khởi tạo
    constructor(page: Page) {
        super(page);
    }

    //method
    async navigateToTagPage() {
        await this.navigate('https://pw-practice-dev.playwrightvn.com/wp-admin/edit-tags.php?taxonomy=post_tag');
    }

    async fillTagName(tagName: string) {
        await this.page.locator(this.xpathInputTagName).fill(tagName);
    }

    async fillSlug(slug: string) {
        await this.page.locator(this.xpathInputSlug).fill(slug);
    }

    async clickBtnAddNewTag() {
        await this.page.locator(this.xpathBtnAddNewTag).click();
    }

    async addNewTag(tagName: string, slug: string) {
        await this.fillTagName(tagName);
        await this.fillSlug(slug);
        await this.clickBtnAddNewTag();
    }
}
