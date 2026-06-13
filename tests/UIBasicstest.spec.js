const {test, expect} = require('@playwright/test');// @ts-check


test.only('Browser context  playwrite test',async ({browser})=>
{
const context  = await browser.newContext();
const page  = await context.newPage();
page.route('**/*.{jpg,png,jpeg}', route=> route.abort());
const userName  = page.locator("input#username");
const SignIn  = page.locator("#signInBtn");
const cardTitle  = page.locator('.card-title a');
page.on('**/*.css',route=>route.abort());//this will block all css
page.on('**/*.{jpg,png,jpeg}',route=>route.abort());//this will block all image 

page.on('request',request=> console.log(request.url()));
page.on('response',response=> console.log(response.url(),response.status()));


await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
await userName.fill("rahulshettyacademy");
await page.locator("input#password").fill("Learning@830$3mK2");
await page.locator("#signInBtn").click();
console.log(await page.locator("[Style*='block']").textContent());
await expect(page.locator("[Style*='block']"))
.toContainText('Incorrect');

await userName.fill("");
await userName.fill("rahulshettyacademy");
await SignIn.click();

//console.log( await cardTitle.first().textContent());
//console.log( await cardTitle.nth(1).textContent());
console.log(await cardTitle.allTextContents());



//await page.pause(10);



});


test('page playwrite test',async ({page})=>
{

await page.goto("https://www.google.com/");

//const title = await page.title();
console.log(await page.title());
await expect(page).toHaveTitle("Google");

});