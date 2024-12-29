import { expect, test } from '@playwright/test';

const username = '1107-thu';
const password = 'HV%MhRjgyljzRDnxZCB(^Wl&';
const baseUrl = 'https://pw-practice-dev.playwrightvn.com/wp-admin';

const xpathUserName = '//input[@id="user_login"]';
const xpathPassWord = '//input[@id="user_pass"]';
const xpathBtnSubmit = '//input[@id="wp-submit"]';
const xpathMenuPost = "//div[text()='Posts']";
const xpathMenuTags = "//a[text()='Tags']";
const xpathBtnAddNewTag = "//input[@id='submit']";
const xpathInputName = "//input[@id='tag-name']";
const xpathInputSlug = "//input[@id='tag-slug']";
const xpathMenuCategories = "//a[text()='Categories']";
const xpathInputNameCategory = "//*[@id='tag-name']";
const xpathInputSlugCategory = "//*[@id='tag-slug']";
const xpathBtnAddNewCategory = "//*[@id='submit']";

const authenticate = async (page) => {
    await page.goto(baseUrl);
    await page.locator(xpathUserName).fill(username);
    await page.locator(xpathPassWord).fill(password);
    await page.locator(xpathBtnSubmit).click();
    await page.locator(xpathMenuPost).click();
};

test.describe('POST-Post1', async () => {
    test.beforeEach(async ({ page }) => {
        await authenticate(page);
        await page.locator(xpathMenuTags).click();
    });

    test('@POST_TAG_001: Tag - add tag failed', async ({ page }) => {
        await test.step("Click button 'Add New Tag'", async () => {
            await page.locator(xpathBtnAddNewTag).click();
            await expect(page.locator("//p[text()='A name is required for this term.']")).toBeVisible();
        });

        await test.step('Fill tag info and try adding again', async () => {
            await page.locator(xpathInputName).fill('lesson tag');
            await page.locator(xpathBtnAddNewTag).click();
            await expect(
                page.locator("//p[text()='A term with the name provided already exists in this taxonomy.']"),
            ).toBeVisible();
        });
    });
});

test.describe('POST-Post2', async () => {
    const name = 'tag Thu';
    const slug = 'tag-thu';
    const name2 = 'tag Thu 02';
    const slug2 = 'tag-thu-02';

    test.beforeEach(async ({ page }) => {
        await authenticate(page);
        await page.locator(xpathMenuTags).click();

        page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
    });

    test.afterEach(async ({ page }) => {
        await page.locator(`//tbody//a[text()='${name}']`).hover();
        await page.locator(`//a[@aria-label='Delete “${name}”']`).click();
        await expect(page.locator(`//tbody//a[text()='${name}']`)).not.toBeVisible();
        await expect(page.locator(`//tbody//a[text()='${slug}']`)).not.toBeVisible();

        await page.locator(`//tbody//a[text()='${name2}']`).hover();
        await page.locator(`//a[@aria-label='Delete “${name2}”']`).click();
        await expect(page.locator(`//tbody//a[text()='${name2}']`)).not.toBeVisible();
        await expect(page.locator(`//tbody//a[text()='${slug2}']`)).not.toBeVisible();
    });

    test('POST_TAG_002: Tag - add tag success', async ({ page }) => {
        await test.step('Fill tag info and add tag', async () => {
            await page.locator(xpathInputName).fill(name);
            await page.locator(xpathBtnAddNewTag).click();
            await expect(page.locator("//p[text()='Tag added.']")).toBeVisible();
            await expect(page.locator(`//tbody//a[text()='${name}']`)).toBeVisible();
            await expect(page.locator(`//td[text()='${slug}']`)).toBeVisible();
        });

        await test.step('Fill another tag info and add tag', async () => {
            await page.locator(xpathInputName).fill(name2);
            await page.locator(xpathInputSlug).fill(slug2);
            await page.locator(xpathBtnAddNewTag).click();
            await expect(page.locator("//p[text()='Tag added.']")).toBeVisible();
            await expect(page.locator(`//tbody//a[text()='${name2}']`)).toBeVisible();
            await expect(page.locator(`//td[text()='${slug2}']`)).toBeVisible();
        });
    });
});

test.describe('POST-Post3', async () => {
    const name3 = 'tag Thu 03';
    const slug3 = 'Đây là tag đặc biệt @100 $200';
    const resultSlug3 = 'day-la-tag-dac-biet-100-200-5';

    test.beforeEach(async ({ page }) => {
        await authenticate(page);
        await page.locator(xpathMenuTags).click();

        page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
    });

    test.afterEach(async ({ page }) => {
        await page.locator(`//tbody//a[text()='${name3}']`).hover();
        await page.locator(`//a[@aria-label='Delete “${name3}”']`).click();
        await expect(page.locator(`//tbody//a[text()='${name3}']`)).not.toBeVisible();
        await expect(page.locator(`//tbody//a[text()='${resultSlug3}']`)).not.toBeVisible();
    });

    test('@POST_TAG_003: Tag - slug auto remove special characters', async ({ page }) => {
        await test.step('Fill tag with special characters and add tag', async () => {
            await page.locator(xpathInputName).fill(name3);
            await page.locator(xpathInputSlug).fill(slug3);
            await page.locator(xpathBtnAddNewTag).click();

            await expect(page.locator("//p[text()='Tag added.']")).toBeVisible();
            await expect(page.locator(`//tbody//a[text()='${name3}']`)).toBeVisible();
            await expect(page.locator(`//td[text()='${resultSlug3}']`)).toBeVisible();
        });
    });
});

test.describe('POST-Post4', async () => {
    const categoryName03 = 'category Thu 03';
    const categorySlug03 = 'Đây là category đặc biệt @100 $200';
    const resultCategorySlug03 = 'day-la-tag-dac-biet-100-200';
    const categoryName04 = 'category Thu 04';
    const parent = '1107 class';

    test.beforeEach(async ({ page }) => {
        await authenticate(page);
        await page.locator(xpathMenuCategories).click();

        page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
    });

    test.afterEach(async ({ page }) => {
        await page.locator(`//tbody//a[text()='${categoryName03}']`).hover();
        await page.locator(`//a[@aria-label='Delete “${categoryName03}”']`).click();
        await expect(page.locator(`//tbody//a[text()='${categoryName03}']`)).not.toBeVisible();
        await expect(page.locator(`//td[text()='${resultCategorySlug03}']`)).not.toBeVisible();

        // await page.locator(`//tbody//a[text()='${categoryName04}']`).hover();
        // await page.locator(`//a[@aria-label='Delete “${categoryName04}”']`).click();
        // await expect(page.locator(`//tbody//a[text()='${categoryName04}']`)).not.toBeVisible();
        // await expect(page.locator(`//td[text()='${resultCategorySlug03}']`)).not.toBeVisible();
    });

    test('@POST_CATEGORY_001: Category - create category success', async ({ page }) => {
        await test.step('Fill category info and add category', async () => {
            await page.locator(xpathInputNameCategory).fill(categoryName03);
            await page.locator(xpathInputSlugCategory).fill(categorySlug03);
            await page.locator(xpathBtnAddNewCategory).click();

            await expect(page.locator("//p[text()='Category added.']")).toBeVisible();
            await expect(page.locator(`//tbody//a[text()='${categoryName03}']`)).toBeVisible();
            // await expect(page.locator(`//td[text()='${resultCategorySlug03}']`)).toBeVisible();
        });
    });
});
