import { test, expect, request } from '@playwright/test';

const uniqueId = Date.now(); 
const username = `User${uniqueId}`;
const email = `user${uniqueId}@gmail.com`;
const password = '123456';
let token: string;
let articleSlug: string;
let commentId02: string;
let commentId05: string;

test('Đăng ký tài khoản với thông tin mới', async ({ request }) => {
  const url = 'https://conduit-api.bondaracademy.com/api/users';
  // Tạo username và email duy nhất

  // Gửi yêu cầu POST để đăng ký tài khoản
  const response = await request.post(url, {
    data: {
      user: {
        username,
        email,
        password,
      },
    },
  });

  const actualStatus = response.status();
  expect(actualStatus).toBe(201);

});

test('Test 2: Đăng nhập và tạo bài viết mới', async ({ request }) => {
  const urlLogin = "https://conduit-api.bondaracademy.com/api/users/login";
  const urlArticle = "https://conduit-api.bondaracademy.com/api/articles/";
  // Đăng nhập vào tài khoản đã tạo
  const loginResponse = await request.post( urlLogin, {
    data: {
      user: {
        email,
        password,
      },
    },
  });

  expect(loginResponse.status()).toBe(200);
  const loginBody = await loginResponse.json();
  token = loginBody.user.token;

  // Tạo bài viết mới
  const articleResponse = await request.post(urlArticle, {
    headers: { Authorization: `Token ${token}` },
    data: {
      article: {
        title: 'API in Playwright',
        description: 'How to use Playwright to create article',
        body: 'This is',
        tagList: ['Playwright Viet Nam', 'pw', 'pw-1107'],
      },
    },
  });

  expect(articleResponse.status()).toBe(201);
  const articleBody = await articleResponse.json();
  articleSlug = articleBody.article.slug;
  expect(articleSlug).toBeTruthy();
});

test('Thêm 5 bình luận vào bài viết', async ({ request }) => {
  const urlComment = `https://conduit-api.bondaracademy.com/api/articles/${articleSlug}/comments`;

  const comments = [
    'Comment 01',
    'Comment 02',
    'Comment 03',
    'Comment 04',
    'Comment 05',
  ];

  for (const comment of comments) {
    const commentResponse = await request.post(urlComment, {
      headers: { Authorization: `Token ${token}` },
      data: {
        comment: {
          body: comment,
        },
      },
    });

    // Kiểm tra trạng thái phản hồi
    expect(commentResponse.status()).toBe(200);

    const commentBody = await commentResponse.json();
    console.log(`Added comment:`, commentBody);
    if (comment === 'Comment 02') {
      commentId02 = commentBody.comment.id;
    }
    if (comment === 'Comment 05') {
      commentId05 = commentBody.comment.id;
    }
    expect(commentBody.comment.body).toBe(comment);
  }
});

test('Xóa “Comment 02” và “Comment 05”', async ({ request }) => {
  const urlDeleteComment = (commentId: string) => `https://conduit-api.bondaracademy.com/api/articles/${articleSlug}/comments/${commentId}`;

  // Xóa bình luận "Comment 02"
  const deleteResponse02 = await request.delete(urlDeleteComment(commentId02), {
    headers: { Authorization: `Token ${token}` },
  });

  expect(deleteResponse02.status()).toBe(200); // Kiểm tra xóa thành công

  // Xóa bình luận "Comment 05"
  const deleteResponse05 = await request.delete(urlDeleteComment(commentId05), {
    headers: { Authorization: `Token ${token}` },
  });
  expect(deleteResponse05.status()).toBe(200);
  
  });

  test('Xóa bài viết đã tạo', async ({ request }) => {
    const urlDeleteArticle = `https://conduit-api.bondaracademy.com/api/articles/${articleSlug}`;
  
    // Xóa bài viết
    const deleteArticleResponse = await request.delete(urlDeleteArticle, {
      headers: { Authorization: `Token ${token}` },
    });
  
    expect(deleteArticleResponse.status()).toBe(204);
  })




