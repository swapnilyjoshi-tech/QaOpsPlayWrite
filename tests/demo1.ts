import { expect, type Locator, type Page } from '@playwright/test';

let message1:string ="hello";
message1 = "bye";
console.log(message1);
let age1 : number =1;
console.log(age1);

let isInactive:boolean  = true;

let numberArray:number[] = [1,2,3];
let data: any = "this is could be any thing";
data = 45;


function tsadd(a:number,b:number):number
{
return a+b;
}

console.log(tsadd(2,3));


let user1:{name:string,age:string,location:string} ={name: "bob",age:"34",location:"hyderabad"};
user1.location = "hyderabad";


class CartPage
{
    page: Page;
    cartProducts:Locator;
    productsText:Locator;
    cart:Locator;
    orders:Locator;
    checkout:Locator;
    
constructor(page:any)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}
}