import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CategoriesPage extends BasePage {
    //thuộc tính
    xpathInputCategoryName = '#input_category';
    xpathInputSlug = '#input_slug';
    xpathBtnAddNewCategory = '#add_new_category';
    navigateTo: any;

    //hàm khởi tạo
    constructor(page: Page) {
        super(page);
    }

    //method
    async navigateToCategoriesPage() {
        await this.navigateTo('url_categories_page');
    }

    async fillCategoryName(categoryName: string) {
        await this.page.locator(this.xpathInputCategoryName).fill(categoryName);
    }

    async fillSlug(slug: string) {
        await this.page.locator(this.xpathInputSlug).fill(slug);
    }

    async clickBtnAddNewCategory() {
        await this.page.locator(this.xpathBtnAddNewCategory).click();
    }

    async addNewCategory(categoryName: string, slug: string) {
        await this.fillCategoryName(categoryName);
        await this.fillSlug(slug);
        await this.clickBtnAddNewCategory();
    }
}
