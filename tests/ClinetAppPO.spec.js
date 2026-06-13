const { test, expect } = require('@playwright/test');// 
const{customtest} = require('../utils/test-base');
const { POmanager } = require('../PageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));

for(const data of dataset){
test(`Client app login ${data.productname}`, async ({ page }) => {
  const email = "swapnilyjoshi@gmail.com";
  const pass = "Edenred2018*";
     const productName = 'ZARA COAT 3';

  const poManager = new POmanager(page);
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();
  const cartPage = poManager.getCartPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
const ordersHistoryPage = poManager.getOrdersHistoryPage();



  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);
  await dashboardPage.searchProductAddCart(data.productname);
  await dashboardPage.navigateToCart();
  await cartPage.VerifyProductIsDisplayed(data.productname);
  await cartPage.Checkout();
await ordersReviewPage.searchCountryAndSelect("ind","India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});

}



customtest.only(`Client app login `, async ({ page,testDataforOrder }) => {
  const email = "swapnilyjoshi@gmail.com";
  const pass = "Edenred2018*";
     const productName = 'ZARA COAT 3';

  const poManager = new POmanager(page);
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();
  const cartPage = poManager.getCartPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
const ordersHistoryPage = poManager.getOrdersHistoryPage();



  await loginPage.goTo();
  await loginPage.validLogin(testDataforOrder.username, testDataforOrder.password);
  await dashboardPage.searchProductAddCart(testDataforOrder.productname);
  await dashboardPage.navigateToCart();
  await cartPage.VerifyProductIsDisplayed(testDataforOrder.productname);
  await cartPage.Checkout();
});