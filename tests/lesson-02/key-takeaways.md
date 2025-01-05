# **Lesson 2: Playwright basic syntax, hooks & Assertion**

## 1. Playwright basic syntax:

-   Đầu tiên, phải import mudule test từ thư viện playwright

-> Cú pháp:
import { test } from '@playwright/test';

-   Test: Để khai báo 1 test

-> Cú pháp:
test('<tên text>', async ({ page }) => {
//Code của test
});

-   Step: Đơn vị nhỏ hơn test, để khai báo từng cái step của test case

-> Cú pháp:
await test.step('Tên step', async () => {
//Code
});

\*\* Lưu ý: Step nên map 1-1 với file testcase để dễ maintain.

-   Basic actions:

    **Navigate:**

    await page. goto("https://pw-practice.playwrightvn.com/");

    **Click:**

    -   Single click

    await page.locator("//button").click();

    -   Double click

    await page.locator("//button").dblclick();

    -   Click chuột phải

    page. locator("//button").click({
    button: 'right'
    });

    -   Click chuột kèm bấm phím khác

    page.locator("").click({
    modifiers: ['Shift']
    });

    **Input:**

    -   Fill

    page.locator("//input").fill("Automaiton");

    -   pressSequentially (Giống việc gõ từng chữ vào ô input)

    page.locator("//input").pressSequential("Automation", {
    delay: 100
    });

    **Radio/checkbox:**

    -   Để kiểm tra xem giá trị hiện tại có đang là check hay không:

    const isChecked =
    page.locator("//input").isChecked();

    -   Check/uncheck

    page.locator("//input").check();
    page.locator("//input").setChecked(false);

## 2. Describe

-   Test suite là tập hợp test cases

-   Ex: test.describe('<tên suite>', async () => {​
    test('test1', async ({ page }) => {​
    // code ...​
    });​
    ​
    test('test 2', async ({ page }) => {​
    // code ...​
    });​
    })

## 3. Hooks

### 3.1 Các loại hooks

-   beforeAll
-   beforeEach
-   afterAll
-   afterEach

### 3.2 Thứ tự chạy

-   beforeAll: chạy trước bất kì test nào trong suite, chạy duy nhất 1 lần, không chạy lại cho từng test
-   beforeEach: chạy trước mỗi test case trong suite
-   afterEach: chạy sau mỗi test case trong suite
-   afterAll: chạy 1 lần duy nhất sau khi tất cả các test trong suite đã chạy xong, không chạy lại cho từng test

## 4. Assertion & web first assertion

### 4.1 Assertion

-   Không tự động chờ đợi trạng thái của element hoặc trang web (nếu muốn đợi phải thêm waitForSelector)

-   Ý nghĩa

expect().toBe(); -> Kiểm tra giá trị đúng bằng

expect().toEqual(); -> Kiểm tra hai giá trị bằng nhau (so sánh sâu cho object/array)

expect().toContain(); -> Kiểm tra một phần tử có trong array hoặc chuỗi

expect().toBeTruthy(); -> Kiểm tra giá trị có "truthy" (không null, không false, không undefined)

expect().toBeFalsy(); -> Kiểm tra giá trị có "falsy" (null, undefined, 0, hoặc false)

expect().toBeGreaterThan(); -> Kiểm tra giá trị lớn hơn

expect().toBeLessThan(); -> Kiểm tra giá trị nhỏ hơn

### 4.2 Web first assertion

-   Tự động chờ đợi đến khi trạng thái được mong đợi xuất hiện
-   Không cần sử dụng waitFor() thủ công

-   Ý nghĩa

await expect(elem).toBeAttached(); -> Kiểm tra phần tử đã được gắn vào DOM

await expect(elem).toBeChecked(); -> Kiểm tra phần tử đã được check. Thường dùng cho checkbox, radio button.

await expect(elem).toBeEditable(); -> Kiểm tra phần tử có thể sửa được. Thường dùng cho ô input

await expect(elem).toBeEmpty(); -> Kiểm tra phần tử rỗng. Thường dùng cho các phần tử warning, error.

await expect(elem).toBeEnabled(); -> Kiểm tra phần tử có được enable hay không. Thường dùng cho button hoặc input

await expect(elem).toBeFocused(); -> Kiểm tra phần tử có được focus hay không. Thường dùng cho input

await expect(elem).toBeHidden(); -> Kiểm tra phần tử có bị ẩn khỏi trang web hay không.
Thường dùng cho các text thông báo

await expect(elem).toBeInViewport(); -> Kiểm tra phần tử có nằm trong viewport hay không.

await expect(elem).toBeVisible(); -> Kiểm tra phần tử có visible (hiển thị) hay không

await expect(elem).toContainText("abc"); -> Kiểm tra phần tử có chứa text hay không

await expect(elem).toHaveAttribute("href"); -> Kiểm tra phần tử có thuộc tính hay không

await expect(elem).toHaveClass("class-name"); -> Kiểm tra phần tử có class hay không

await expect(elem).toHaveId("id"); -> Kiểm tra phần tử có id hay không

await expect(elem).toHaveText(''); -> Kiểm tra phần tử có text hay không

await expect(elem).toHaveValue(''); -> Kiểm tra input có chứa giá trị hay không

await expect(elem).toHaveValues([]) -> Kiểm tra select có select các option hay không
