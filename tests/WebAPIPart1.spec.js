const { test, expect, request } = require('@playwright/test');// @ts-check
const { APIUtils } = require('../utils/APIUtils');


const Loginpayload = { userEmail: "swapnilyjoshi@gmail.com", userPassword: "Edenred2018*" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, Loginpayload);
    response = await apiUtils.createOrder(orderPayload);


});

test('Place the order', async ({ page }) => {

    const orderpage = page.locator("button[routerlink*='myorders']"); // ✅ fixed

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await orderpage.click();

    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderid = await rows.nth(i).locator("th").textContent();

        if (response.orderId.includes(rowOrderid)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderidDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderidDetails)).toBeTruthy();



});

