import { Page, test as base } from "@playwright/test";

const baseUrl = "https://conduit-api.bondaracademy.com/api";
const urlArticle = `${baseUrl}/articles/`;

const test = base.extend({
    myApi: async ({ request }, use) => {
        const email = "kimxuyen@gmail.com";
        const password = "123456";

    const loginResponse = await request.post(`${baseUrl}/users/login`, {
            data: {
                user: {
                    email, 
                    password,
                }
            }
        })

        console.log("Login response status: ", loginResponse.status());
        console.log("Login response body: ", await loginResponse.text());

        const { user } = await loginResponse.json();
        const token = user.token;

        const headers = { Authorization: `Token ${token}` };

        const article1Response = await request.post(urlArticle, {
            headers,
            data: {
              article: {
                title: 'a1',
                description: 'How to use Playwright to create article 1',
                body: 'This is 1',
                tagList: ['Playwright Viet Nam 1', 'pw', 'pw-1107'],
              },
            },
          });
        const article1 = (await article1Response.json()).article;

        const article2Response = await request.post(urlArticle, {
            headers,
            data: {
                article: {
                    title: 'a2',
                    description: 'How to use Playwright to create article 2',
                    body: 'This is 2',
                    tagList: ['Playwright Viet Nam 2', 'pw', 'pw-1107'],

                }
            }
        })
        const article2 = (await article2Response.json()).article;

        await use({ token, article1, article2})

        await request.delete(`${baseUrl}/articles/${article1.slug}`, { headers });
        await request.delete(`${baseUrl}/articles/${article2.slug}`, { headers });
    }
    })

export { test };


