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

# \*\*Lesson 3: Class extends & Page Object Model

## 1. Class: extends

-   Sử dụng extends để kế thừa (giúp tái sử dụng các thuộc tính của phần tử cha)

-   Hàm tạo (constructor) là hàm sẽ chạy khi bạn khởi tạo một object.

-   Ex: class A extends class B {​
    constructor() {​
    super()​
    }​
    }​
    => class A là class con, class B là class cha​
    super = gọi tới hàm tạo của class cha​

**Export**

-   Từ khoá export giúp chúng ta có thể xuất 1 biến, 1 hằng số ở 1 file và nhập (import) dùng ở file khác.

-   Ví dụ:
    Tại file login-page.ts
    export class LoginPage {
    // Some code...
    }
    Tại file test.spec.ts
    import { LoginPage } from './page/login-page';
    // Some code...

**Lưu ý:**

-   Cấu trúc thư mục:
    ├── test.spec.ts
    ├── page
    │ ├── login-page.ts
-   from './page/login-page'; là đường dẫn để đi tới login-page cần import. Do login-page này nằm trong thư mục page nên cần định nghĩa vào trong import.
-   Ta có thể viết from './page/login-page.ts'; hoặc bỏ đuôi .ts trong phần import: from './page/login-page';, vì Javascript sẽ tự động thêm đuôi .ts khi tìm kiếm
-   Để import file nằm ở thư mục bên ngoài, ta dùng .. để đi ra folder cha của folder hiện tại.
    VD: ‘../../login-page.ts'

## 2. POM

-   POM = Page Object Model

-   POM giúp code tổ chức gọn gàng hơn, dễ bảo trì hơn

-   POM gồm 2 thành phần chính:

    -   Các thuộc tính (property): đại diện cho các phần tử trên trang.
    -   Các phương thức (method): đại diện cho các hành động trên trang.

-   Hàm tạo của POM thường có thuộc tính page. Ta sẽ dùng page này để tương tác với trang web.

-   Thuộc tính page này nếu đã xuất hiện trong POM cha rồi thì bạn không cần định nghĩa ở POM con nữa.
