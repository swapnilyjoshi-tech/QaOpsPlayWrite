const { test, expect, request } = require('@playwright/test');// @ts-check
const { APIUtils } = require('../utils/APIUtils');


const Loginpayload = { userEmail: "swapnilyjoshi@gmail.com", userPassword: "Edenred2018*" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;
const fakePayLoad = { data:[], message:"No Orders" };

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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
     async   route=>{
          const response =   await page.request.fetch(route.request());
          let body = JSON.stringify('fakePayLoad') ;
          route.fulfill({
            response,
            body,

          });
        }
    );
    await orderpage.click();

    console.log(await page.locator(".mt-4").textContent()) ;
    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.pause();


    //await page.locator("tbody").waitFor();




});

