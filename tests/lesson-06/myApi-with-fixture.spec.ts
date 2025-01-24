import { expect } from '@playwright/test';
import { test } from '../../src/fixture';

test('Kiểm tra có tạo được articles từ fixture', async ({ myApi }) => {
const { article1, article2 } = myApi;

expect(article1).toBeTruthy();
expect(article2).toBeTruthy();
expect(article1.title).toBe("a1");
expect(article2.title).toBe("a2");
})

