
import {test as baseTest} from '@playwright/test';
interface testDataforOrder {
    username: string;
    password: string;
    productname: string;
};


export const customTest = baseTest.extend<{testDataforOrder:testDataforOrder}>(
{
    testDataforOrder: {
    username: "swapnilyjoshi@gmail.com",
    password:"Edenred2018*",
    productname: "ZARA COAT 3"
}
}
)