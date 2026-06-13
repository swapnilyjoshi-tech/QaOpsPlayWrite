const { test, expect, request } = require('@playwright/test');// @ts-check
//const { text } = require('node:stream/consumers');

test('Security test request intercept',async({page})=>
{
   // const context  = await browser.newContext();
     //const page = await context.newPage();
    const email = "swapnilyjoshi@gmail.com";
const userName  = page.locator("input#userEmail");
const passWord  = page.locator("input#userPassword");
const SignIn  = page.locator("#login");
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await userName.fill(email);
await passWord.fill("Edenred2018*");
await SignIn.click();
await page.waitForLoadState('networkidle');
await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a29458017e3e78bace79aa'}) 
    )
    await page.locator("button:has-text('View')").first().click();

    await page.pause();
})


