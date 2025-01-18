import { Page } from '@playwright/test';
import { url } from 'inspector';
import { PageBase } from './page-base';

export class NewArticlePage extends PageBase {
    xpathNewArticle = "//a[@href='/editor']";
    xpathInputArticleTitle = "//input[@placeholder='Article Title']";
    xpathInputWhatsThisArticleAbout = "//input[@formcontrolname='description']";
    xpathInputWriteYourArticle = "//textarea[@formcontrolname='body']";
    xpathInputEnterTags = "//input[@placeholder='Enter tags']";
    xpathBtnPublishArticle = "//button[contains(text(),'Publish Article')]";
    xpathComment = "//textarea[@placeholder='Write a comment...']";
    xpathBtnPostComment = "//button[contains(text(),'Post Comment')]";

    constructor(page: Page) {
        super(page);
    }

    async createArticle(title: string, about: string, content: string, tags: string) {
        await this.page.locator(this.xpathNewArticle).click();
        await this.page.waitForURL('**/editor');

        await this.page.locator(this.xpathInputArticleTitle).fill(title);
        await this.page.locator(this.xpathInputWhatsThisArticleAbout).fill(about);
        await this.page.locator(this.xpathInputWriteYourArticle).fill(content);
        await this.page.locator(this.xpathInputEnterTags).fill(tags);

        await this.page.locator(this.xpathBtnPublishArticle).click();

        await this.page.waitForURL('**/article/**');
        const articleTitle = await this.page.locator('h1').innerText();
        if (articleTitle !== title) {
            throw new Error('Bài viết không được tạo thành công!');
        }
    }
}
