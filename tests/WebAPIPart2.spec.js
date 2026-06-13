const {test, expect} = require('@playwright/test');// @ts-check
let webContext;
    

test.beforeAll(async({browser})=>{
    const context  = await browser.newContext();
     const page = await context.newPage();
    const email = "swapnilyjoshi@gmail.com";
const userName  = page.locator("input#userEmail");
const passWord  = page.locator("input#userPassword");
const SignIn  = page.locator("#login");
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await userName.fill(email);
await passWord.fill("Edenred2018*");
await SignIn.click();
await page.waitForLoadState('networkidle');
await context.storageState({path:'state.json'});

webContext  = await browser.newContext({storageState:'state.json'});

})

test('Browser context  playwrite test',async ()=>
{
const page  = await webContext.newPage();
await page.goto("https://rahulshettyacademy.com/client");

const cartbody  = page.locator(".card-body b");
const products  = page.locator(".card-body");

const productName  = 'ZARA COAT 3';
  const routerlink = page.locator("[routerlink*='cart']"); // ✅ fixed
    const orderpage = page.locator("button[routerlink*='myorders']"); // ✅ fixed

  //await page.waitForLoadState('networkidle');
  await cartbody.first().waitFor();
  console.log(await cartbody.allTextContents());
const count  = await products.count();

for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }

await routerlink.click();

await page.locator("div li").first().waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
await expect(bool).toBeTruthy();

await page.locator("text=Checkout").click();


await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
  const optiondropdown  =page.locator(".ta-results");
   await optiondropdown.waitFor();
     const optionscount = await optiondropdown.locator("button").count();


  for(let i=0;i<optionscount;i++)
{
const text  = await optiondropdown.locator("button").nth(i).textContent();
 
if (text === " India")
{
  await optiondropdown.locator("button").nth(i).click();

  break;
}
}


await expect(page.locator(".user__name [type='text']").first()).toHaveText("swapnilyjoshi@gmail.com");

await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 console.log(orderid)
await orderpage.click();

await page.locator("tbody").waitFor();

const rows = await page.locator("tbody tr");

for (let i=0;i<await rows.count();i++)
{
const rowOrderid = await rows.nth(i).locator("th").textContent(); 

if(orderid.includes(rowOrderid))
{
 await rows.nth(i).locator("button").first().click();
 break;
}
}

const orderidDetails = await page.locator(".col-text").textContent();
expect(orderid.includes(orderidDetails)).toBeTruthy();

//await page.pause();

});

test('Test case 2',async ()=>
{
const page  = await webContext.newPage();
await page.goto("https://rahulshettyacademy.com/client");
console.log("this is test case 2");

});