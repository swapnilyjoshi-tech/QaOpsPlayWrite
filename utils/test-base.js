const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
    testDataforOrder: {
    username: "swapnilyjoshi@gmail.com",
    password:"Edenred2018*",
    productname: "ZARA COAT 3"
}
}
)