

class LoginPage {

    constructor(page) {
        this.page=page;
        this.SignIn = page.locator("#login");
        this.userName = page.locator("input#userEmail");
        this.passWord = page.locator("input#userPassword");
  

    }

 async goTo()
    {
        
          await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(username,pass) {
        await this.userName.fill(username);
        await this.passWord.fill(pass);
        await this.SignIn.click();
        await this.page.waitForLoadState('networkidle');

    }
}

module.exports = {LoginPage};