import { NewArticlePage } from './../../page/new-article-page';
import { test, expect, Page, Locator } from '@playwright/test';
import { conduitAccount } from '../../data-test/account';
import { SignInPage } from './../../page/sign-in-page';
import { text } from 'stream/consumers';

test.describe('Test case', () => {
    const comments = ['Comment 01', 'Comment 02', 'Comment 03', 'Comment 04', 'Comment 05'];
    const commentsToDelete = ['Comment 02', 'Comment 05'];

    test('Test 2', async ({ page }) => {
        await test.step('Đăng nhập vào tài khoản đã tạo ở test 1', async () => {
            const signInPage = new SignInPage(page);
            await signInPage.goto();
            await signInPage.fillFormSignIn(conduitAccount);
        });

        await test.step('Tạo mới article', async () => {
            const newArticlePage = new NewArticlePage(page);

            const title = 'API in Playwright 7' + Date.now();
            const about = 'How to use Playwright to create article' + Date.now();
            const content = 'This is the content of the article';
            const enterTags = '';

            await newArticlePage.createArticle(title, about, content, enterTags);

            await page.waitForSelector('h1');
            const displayedTitle = await page.locator('h1').innerText();

            expect(displayedTitle).toBe(title);
        });

        await test.step('Thêm mới 5 comment vào bài viết', async () => {
            const newArticlePage = new NewArticlePage(page);

            for (const comment of comments) {
                await page.locator(newArticlePage.xpathComment).fill(comment);
                await page.locator(newArticlePage.xpathBtnPostComment).click();

                await expect(page.locator(`//p[@class="card-text" and contains(text(),"${comment}")]`)).toBeVisible();
            }
        });

        await test.step(' Xoá “Comment 02”, “Comment 05” đã tạo', async () => {
            // for in
            // for i < n
            // foreach
            // map
            // ......
            // duyệt mảng comment cần xóa: comment 02, comment 05
            for (const comment of commentsToDelete) {
                const cardByText = await page.getByText(comment, { exact: true }); // card-text
                const iconDelete = await cardByText
                    .locator('..') // card-block
                    .locator('..') // card-card
                    .locator('.ion-trash-a'); //ion-trash-a
                await iconDelete.click();
            }
        });
    });
});
