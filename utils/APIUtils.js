class APIUtils
{

    constructor(apiContext, LoginPayLoad)
    {
        this.apiContext = apiContext
        this.LoginPayLoad = LoginPayLoad
    }
    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
                {
                    data: this.LoginPayLoad
                }
            )
            const loginResponseJson = await loginResponse.json() //stores the json value of response in loginResponseJson
            const token = loginResponseJson.token  //token is one of the key in json whose value is captued in token
            console.log(token)
            return token
    }

    async createOrder(orderPayload)
    {
        let response = {}
        response.token = await this.getToken()
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
                {
                    data: orderPayload,
                    headers: 
                    {
                        'Authorization' : response.token,
                        'Content-Type' : 'application/json'
                    }
        
                }
            )
            const orderResponseJson = await orderResponse.json()
            console.log(orderResponseJson)
            const orderId = orderResponseJson.orders[0]
            console.log(orderId)
            response.orderId = orderId
            console.log({response})
            return response
    }
}

module.exports = {APIUtils}