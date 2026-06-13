import { test, expect, Locator, Page } from '@playwright/test';


export class LoginPage {
    SignIn: Locator;
    userName: Locator;
    passWord: Locator;
        page: Page;




    constructor(page:Page) {
        this.page=page;
        this.SignIn = page.locator("#login");
        this.userName = page.locator("input#userEmail");
        this.passWord = page.locator("input#userPassword");
  

    }

 async goTo()
    {
        
          await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(username:string,pass:string) {
        await this.userName.fill(username);
        await this.passWord.fill(pass);
        await this.SignIn.click();
        await this.page.waitForLoadState('networkidle');

    }
}

module.exports = {LoginPage};