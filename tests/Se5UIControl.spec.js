const {test, expect} = require('@playwright/test');// @ts-check




test('UI control',async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName  = page.locator("input#username");
const SignIn  = page.locator("#signInBtn");
const cardTitle  = page.locator('.card-title a');
const dropdown = page.locator('select.form-control');
const radio  = page.locator(".radiotextsty");
const accept  = page.locator("#okayBtn");
const checkbox = page.locator("#terms");
const documentlink =page.locator("a[href*='documents-request']");
await dropdown.selectOption("consult");
await radio.last().click();
await accept.click();

console.log(await radio.last().isChecked());
await expect(radio.last()).toBeChecked();

await checkbox.click();
await expect(checkbox).toBeChecked();
await checkbox.uncheck();
await expect(await checkbox.isChecked()).toBeFalsy();
expect(documentlink).toHaveAttribute("class","blinkingText");
await page.pause();
});


test('Child window handle',async ({browser})=>
{
  const context  = await browser.newContext();
  const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentlink =page.locator("a[href*='documents-request']");
const userName  = page.locator("input#username");

const [newPage]= await Promise.all([
context.waitForEvent('page'),
documentlink.click(),
]
)
const text  = await newPage.locator(".red").textContent();
const arrayText = text.split("@");
const domain  = arrayText[1].split(" ")[0];
console.log(domain)
await page.bringToFront();

    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
   await page.pause();


//await page.locator("input#username").fill(domain);
//await userName.fill("domain");
//

//console.log(await userName.textContent());
//await page.pause();


});


