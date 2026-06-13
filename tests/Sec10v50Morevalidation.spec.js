const {test, expect} = require('@playwright/test');
//test.describe.configure({mode:'parallel'});
test.describe.configure({mode:'serial'});

test("@Web pop up valiadtion",async({page})=>
{
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//  await page.goto("https://www.google.com/");
//  await page.goBack();
//  await page.goForward();

 await expect (page.locator("#displayed-text")).toBeVisible();
 await page.locator("#hide-textbox").click();
  await expect (page.locator("#displayed-text")).toBeHidden();
  page.on('dialog',dialog=>dialog.accept());
await page.locator("#confirmbtn").click();


await page.locator("#mousehover").hover();

const framepage  = page.frameLocator("#courses-iframe");
framepage.locator("li a[href='lifetime-access']:visible").click();

const textcheck = await framepage.locator(".text h2").textContent();
console.log(textcheck.split(" ")[1]);



})

test('@Web Screenshot & visual validation',async({page})=>{
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

 await expect (page.locator("#displayed-text")).toBeVisible();

 await page.locator('#displayed-text').screenshot({path:'Partialscreenshot.png'});
 await page.locator("#hide-textbox").click();
 await page.screenshot({path:'screenshot.png'});
  await expect (page.locator("#displayed-text")).toBeHidden();

})


/*test('visual ui testing',async({page})=>{
 await page.goto("https://www.google.com/");
 
  await page.getByRole('img', { name: /Google/ }).waitFor(); 
  // Optionally disable animations for consistency
  await page.addStyleTag({ content: "* { transition: none !important; animation: none !important; }" });
 expect(await page.screenshot()).toMatchSnapshot('landingpage.png');
})*/