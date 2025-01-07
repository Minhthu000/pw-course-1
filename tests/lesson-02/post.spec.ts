// import { expect, test } from '@playwright/test';
// import { LoginPage } from '../../page/login-page';
// import { TagPage } from '../../page/tag-page';

// test.describe('POST-Post', async () => {
//     const xpathUserName = '//input[@id="user_login"]';
//     const xpathPassWord = '//input[@id="user_pass"]';
//     const xpathBtnSubmit = '//input[@id="wp-submit"]';
//     const xpathMenuPost = "//div[text()='Posts']";
//     const xpathMenuTags = "//a[text()='Tags']";
//     const xpathBtnAddNewTag = "//input[@id='submit']";
//     const xpathInputName = "//input[@id='tag-name']";
//     const xpathInputSlug = "//input[@id='tag-slug']";
//     const xpathMenuCategories = "//a[text()='Categories']";
//     const xpathInputNameCategory = "//input[@id='tag-name']";
//     const xpathInputSlugCategory = "//*[@id='tag-slug']";
//     const xpathBtnAddNewCategory = "//*[@id='submit']";
//     const xpathSelectParent = "//select[@id='parent']";
//     const xpathNoticeErrorInTags = "//div[@class='notice notice-error')]//p";
//     const xpathNoticeSuccessInTags = "//div[contains(@class,'notice-success')]//p";

//     test.beforeEach(async ({ page }) => {
//         const username = '1107-thu';
//         const password = 'HV%MhRjgyljzRDnxZCB(^Wl&';

//         await test.step('Go to menu Tags', async () => {
//             const loginPage = new LoginPage(page);
//             const tagPage = new TagPage(page);
//             await loginPage.navigateToLoginPage();
//             await loginPage.login(username, password);
//             await page.waitForLoadState('domcontentloaded');
//             await tagPage.navigateToTagPage();
//         });

//         page.on('dialog', async (dialog) => {
//             await dialog.accept();
//         });
//     });

//     test.afterEach(async ({ page }) => {
//         // await page.locator(`//tbody//a[text()='${name}']`).hover();
//         // await page.locator(`//a[@aria-label='Delete “${name}”']`).click();
//         // await expect(page.locator(`//tbody//a[text()='${name}']`)).not.toBeVisible();
//         // await expect(page.locator(`//tbody//a[text()='${slug}']`)).not.toBeVisible();
//         // await page.locator(`//tbody//a[text()='${name2}']`).hover();
//         // await page.locator(`//a[@aria-label='Delete “${name2}”']`).click();
//         // await expect(page.locator(`//tbody//a[text()='${name2}']`)).not.toBeVisible();
//         // await expect(page.locator(`//tbody//a[text()='${slug2}']`)).not.toBeVisible();
//     });

//     test('@POST_TAG_001: Tag - add tag failed', async ({ page }) => {
//         await test.step("Click button 'Add New Tag'", async () => {
//             await TagPage.clickBtnAddNewTag();

//             await expect(page.locator("//p[text()='A name is required for this term.']")).toBeVisible();
//         });

//         await test.step('Điền thông tin tag: name = "lesson tag", click button "Add New Tag"', async () => {
//             await TagPage.fillTagName('lesson tag');
//             await TagPage.clickBtnAddNewTag();
//             await page.waitForLoadState('load');

//             const msgError = await page.locator(xpathNoticeErrorInTags).textContent();
//             expect(msgError).toBe('A term with the name provided already exists in this taxonomy.');
//         });
//     });

//     // test.describe('POST-Post2', async () => {
//     //     const name = 'tag Thu';
//     //     const slug = 'tag-thu';
//     //     const name2 = 'tag Thu 02';
//     //     const slug2 = 'tag-thu-02';

//     //     test.beforeEach(async ({ page }) => {
//     //         await authenticate(page);
//     //         await page.locator(xpathMenuTags).click();

//     //         page.on('dialog', async (dialog) => {
//     //             await dialog.accept();
//     //         });
//     //     });

//     //     test.afterEach(async ({ page }) => {
//     //         await page.locator(`//tbody//a[text()='${name}']`).hover();
//     //         await page.locator(`//a[@aria-label='Delete “${name}”']`).click();
//     //         await expect(page.locator(`//tbody//a[text()='${name}']`)).not.toBeVisible();
//     //         await expect(page.locator(`//tbody//a[text()='${slug}']`)).not.toBeVisible();

//     //         await page.locator(`//tbody//a[text()='${name2}']`).hover();
//     //         await page.locator(`//a[@aria-label='Delete “${name2}”']`).click();
//     //         await expect(page.locator(`//tbody//a[text()='${name2}']`)).not.toBeVisible();
//     //         await expect(page.locator(`//tbody//a[text()='${slug2}']`)).not.toBeVisible();
//     //     });

//     test('POST_TAG_002: Tag - add tag success', async ({ page }) => {
//         let arrayTagName = [
//             {
//                 tagName: 'tag Thu',
//                 slugName: '',
//             },
//             {
//                 tagName: 'tag Thu 02',
//                 slugName: 'tag-thu-02',
//             },
//             {
//                 tagName: 'tag Thu 03',
//                 slugName: 'Đây là tag đặc biệt @100 $200',
//             },
//         ];

//         await test.step('Go to Tags page', async () => {
//             await page.click(xpathMenuTags);
//         });

//         for (let i = 0; i < arrayTagName.length; i++) {
//             await test.step('Fill tag name and add new tag', async () => {
//                 await page.fill(xpathInputName, arrayTagName[i].tagName);
//                 await page.fill(xpathInputSlug, arrayTagName[i].slugName);

//                 await page.click(xpathBtnAddNewTag);
//                 await page.waitForLoadState('load');
//                 await page.waitForSelector('//xpath');

//                 const msgSuccess = await page.locator(xpathNoticeSuccessInTags).textContent();
//                 expect(msgSuccess).toBe('Tag added.');

//                 const isTagNameDisplay = await page
//                     .locator(`//tbody//a[contains(text(),'${arrayTagName[i].tagName}']`)
//                     .isVisible();
//                 expect(isTagNameDisplay).toBeTruthy();

//                 if (arrayTagName[i].slugName !== '') {
//                     const isSlugNameDisplay = await page
//                         .locator(`//tbody//td[contains(text(),'${arrayTagName[i].slugName}']`)
//                         .isVisible();
//                     expect(isSlugNameDisplay).toBeTruthy();
//                 }
//             });

//             await test.step('Clear data test', async () => {
//                 await page.locator(`//tbody//a[contains(text(),'${arrayTagName[i].tagName}']`).hover();
//                 await page.locator(`//a[@aria-label='Delete “${arrayTagName[i].tagName}”']`).click();

//                 await page.reload();
//                 const isTagNameDisplay = await page
//                     .locator(`//tbody//a[contains(text(),'${arrayTagName[i].tagName}']`)
//                     .isVisible();
//                 expect(isTagNameDisplay).toBeFalsy();
//             });
//         }
//     });
//     test('@POST_CATEGORY_001: Category - create category success', async ({ page }) => {
//         let arrCategories = [
//             {
//                 categoryName: 'category Thu 03',
//                 categorySlug: 'Đây là category đặc biệt @100 $200',
//                 expectSlug: 'day-la-category-dac-biet-100-200',
//                 parentCategory: '',
//             },
//             {
//                 categoryName: 'category Thu 04',
//                 categorySlug: '',
//                 expectSlug: '',
//                 parentCategory: '1107 class',
//             },
//         ];
//         await test.step('Go to Category page', async () => {
//             await page.click(xpathMenuCategories);
//         });

//         for (let i = 0; i < arrCategories.length; i++) {
//             await test.step('Fill category name and add new category', async () => {
//                 await page.fill(xpathInputNameCategory, arrCategories[i].categoryName);
//                 if (arrCategories[i].categorySlug !== '') {
//                     await page.fill(xpathInputSlugCategory, arrCategories[i].categorySlug);
//                 }

//                 if (arrCategories[i].parentCategory !== '') {
//                     await page.selectOption(xpathSelectParent, { label: arrCategories[i].parentCategory });
//                 }

//                 await page.click(xpathBtnAddNewCategory);
//                 await page.waitForLoadState('load');

//                 const msgSuccess = await page.locator(xpathNoticeSuccessInTags).textContent();
//                 expect(msgSuccess).toBe('Category added.');

//                 const isCategoryNameDisplay = await page
//                     .locator(`//tbody//a[contains(text(),'${arrCategories[i].categoryName}']`)
//                     .isVisible();
//                 expect(isCategoryNameDisplay).toBeTruthy();

//                 if (arrCategories[i].categorySlug !== '') {
//                     const isCategorySlugDisplay = await page
//                         .locator(`//tbody//td[contains(text(),'${arrCategories[i].expectSlug}']`)
//                         .isVisible();
//                     expect(isCategorySlugDisplay).toBeTruthy();
//                 }
//             });

//             await test.step('Clear data test', async () => {
//                 await page.locator(`//tbody//a[contains(text(),'${arrCategories[i].categoryName}']`).hover();
//                 await page.locator(`//a[@aria-label='Delete “${arrCategories[i].categoryName}”']`).click();

//                 await page.reload();
//                 const isCategoryNameDisplay = await page
//                     .locator(`//tbody//a[contains(text(),'${arrCategories[i].categoryName}']`)
//                     .isVisible();
//                 expect(isCategoryNameDisplay).toBeFalsy();
//             });
//         }
//     });
// });
