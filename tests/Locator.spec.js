const {test, expect} = require('@playwright/test');// @ts-check


test('Playwrite special locators',async ({page})=>
{
const userName  = page.locator("input#username");
const SignIn  = page.locator("#signInBtn");
const cardTitle  = page.locator('.card-title a');
await page.goto("https://rahulshettyacademy.com/angularpractice/");

await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Female");

await page.getByPlaceholder("Password").fill("abcd");
await page.getByRole("button",{name:'Submit'}).click();

await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

await page.getByRole("link",{name:'Shop'}).click();

await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

await page.pause();
  




});


