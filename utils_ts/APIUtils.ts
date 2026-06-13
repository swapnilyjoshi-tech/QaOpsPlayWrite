//import Module = require("node:module");

class APIUtils {

    constructor(apiContext,Loginpayload) {
        this.apiContext = apiContext;
        this.Loginpayload=Loginpayload;
    }


    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.Loginpayload })
        const loginResponsejson = await loginResponse.json();
        const token = await loginResponsejson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload) {

        let response ={};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'authorization': response.token,
                    'content-type': 'application/json'
                },
            })
        const orderresponsejson = await orderResponse.json();
        console.log(orderresponsejson);
        const orderId = orderresponsejson.orders[0];
        response.orderId = orderId;

        return response;
    }

}



module.exports = {APIUtils};