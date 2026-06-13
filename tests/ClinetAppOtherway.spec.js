const {test, expect} = require('@playwright/test');// @ts-check


test('Browser context  playwrite test',async ({page})=>
{
const email = "swapnilyjoshi@gmail.com";
const userName  = page.getByPlaceholder("email@example.com");
const passWord  = page.getByPlaceholder("enter your passsword");
const SignIn  = page.getByRole('button',{name:'Login'});
const cartbody  = page.locator(".card-body b");
const products  = page.locator(".card-body");
const productName  = 'ZARA COAT 3';
  const routerlink = page.getByRole('button',{name:'Cart'}); // ✅ fixed
  
    const orderpage = page.locator("button[routerlink*='myorders']"); // ✅ fixed




await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await userName.fill(email);
await passWord.fill("Edenred2018*");
await SignIn.click();
  //await page.waitForLoadState('networkidle');
  await cartbody.first().waitFor();
  console.log(await cartbody.allTextContents());



await products.filter({hasText:productName})
.getByRole("button",{name:'Add To Cart'}).click();

/*
  const count  = await products.count();

for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
*/
await page.getByRole('listitem').locator(routerlink).click();
 
await page.locator("div li").first().waitFor();

await expect(page.getByText(productName)).toBeVisible();
/*const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
await expect(bool).toBeTruthy();*/

await page.getByRole('button',{name:"Checkout"}).click();
//await page.locator("text=Checkout").click();


await page.getByPlaceholder("Select Country").pressSequentially("ind");
await page.getByRole('button',{name:"India"}).nth(1).click();

/* const optiondropdown  =page.locator(".ta-results");
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
*/

await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.getByText("PlACE ORDER").click();
//await page.locator(".action__submit").click();

//await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();


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

await page.pause();

});

