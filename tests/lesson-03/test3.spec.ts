import { expect, test } from '@playwright/test';
import { TodoPage } from '../../page/todo-page';

test('Add to do list', async ({ page }) => {
    let todoPage = new TodoPage(page);

    await test.step('Đi đến trang To do Page', async () => {
        await todoPage.goToTodoPage();
    });

    await test.step('Thêm mới 100 todo item có nội dung "Todo <i>"', async () => {
        for (let i = 1; i <= 100; i++) {
            await todoPage.addNewTask(`Todo ${i}`);
        }
    });

    await test.step('Xóa các todo có số lẻ', async () => {
        todoPage.page.on('dialog', async (dialog) => {
            await dialog.accept();
        });

        for (let i = 1; i <= 100; i++) {
            if (i % 2 != 0) {
                const content = `Todo ${i}`;
                await todoPage.deleteTask(content);
            }
        }
    });

    await test.step('Kiểm tra todo có số thứ tự 90 nằm trong viewport', async () => {
        const xpathTodo90 = todoPage.getLocatorTask('Todo 90');
        await expect(xpathTodo90).toBeInViewport({ timeout: 10000 });
    });

    await test.step('Kiểm tra todo có số thứ tự 21 bị ẩn "không nằm trong DOM"', async () => {
        const xpathTodo21 = todoPage.getLocatorTask('Todo 21');
        await expect(xpathTodo21).not.toBeAttached();
    });
});
