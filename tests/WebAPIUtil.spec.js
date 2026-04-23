const {test, expect, request} = require('@playwright/test')

const {APIUtils} = require('../utils/APIUtils')

const LoginPayLoad = {userEmail:"aniket.pathak4@gmail.com",userPassword:"Learning@123"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let response

test.beforeAll(async () => 
{
    //Login API
    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext, LoginPayLoad)
    response = await apiUtils.createOrder(orderPayload)

});

test("Client Page Login using API and placing order", async ({page}) => {

    await page.addInitScript(value => {          // Adds a script which would be evaluated in one of the following scenarios
        window.localStorage.setItem('token', value)  //For session storage on application tab use sessionStorage.setItem

    }, response.token )

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.locator("button[routerlink*='myorders']").click()
    //select Order ID from a table and view it
    await page.locator("tbody").waitFor()
    const itemsRows = await page.locator("tbody tr")
    for(let i = 0; i < await itemsRows.count(); ++i)//use count directly in for loop
    {
        const rowOrderId = await itemsRows.nth(i).locator("th").textContent()
        if(response.orderId.includes(rowOrderId))
        {
            await itemsRows.nth(i).locator("button").first().click()
            break
        }
            
    }
    const orderIdDetails = await page.locator(".col-text").textContent()
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy()

})