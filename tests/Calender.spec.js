const {test, expect} = require('@playwright/test');// @ts-check

test("Calender validation",async({page})=>
{

    const monthnumber  = "6";
    const date  = "15";
    const year  = "2027";
     const exppectedList =[monthnumber,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
       

//await page.waitForLoadState('networkidle');
    
    await page.locator(".react-date-picker__inputGroup").click();

    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByRole('button',{name:year}).click();
    await page.locator(".react-calendar__tile").nth(Number(monthnumber-1)).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    /*const input  =  page.locator(".react-date-picker__inputGroup input");
for (let i=0;i<exppectedList.length;i++)
{
    const value  = await input.nth(i).inputValue();
    expect(value).toEqual(exppectedList[i]);
}*/
    const expectedList = [monthnumber,date,year];

const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }




    
    await page.pause();

})

//comment 
//comment2