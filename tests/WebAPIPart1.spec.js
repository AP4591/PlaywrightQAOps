const {test, expect, request} = require('@playwright/test')

const LoginPayLoad = {userEmail:"aniket.pathak4@gmail.com",userPassword:"Learning@123"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let token
let orderId
test.beforeAll(async () => 
{
    //Login API
    const apiContext = await request.newContext()
    //To capture the response from Network
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: LoginPayLoad
        }
    )
    await expect(loginResponse.ok()).toBeTruthy() //ok() is used to assert if the status is 200,201,etc which is success
    const loginResponseJson = await loginResponse.json() //stores the json value of response in loginResponseJson
    token = loginResponseJson.token  //token is one of the key in json whose value is captued in token
    console.log(token)

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
        {
            data: orderPayload,
            headers: 
            {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }

        }
    )
    const orderResponseJson = await orderResponse.json()
    console.log(orderResponseJson)
    orderId = orderResponseJson.orders[0]
    console.log(orderId)


});

// test.beforeEach( () => {

// });


test("Client Page Login using API and placing order", async ({page}) => {

    await page.addInitScript(value => {          // Adds a script which would be evaluated in one of the following scenarios
        window.localStorage.setItem('token', value)  //For session storage on application tab use sessionStorage.setItem

    }, token )

    // const email = "aniket.pathak4@gmail.com"
    // const productName = "ZARA COAT 3"
    // const products = page.locator(".card-body")
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    // console.log(await page.title())
    // console.log(await page.locator("h3").textContent())
    // await expect(page.locator("h3")).toContainText("We Make Your Shopping Simple")
    // await page.locator("input[type='email']").fill(email)
    // await page.locator("#userPassword").fill("Learning@123")
    // await page.locator("#login").click()
    //Checking and selecting the exact product from list of products on page
    //await page.waitForLoadState('networkidle')
    //await page.locator(".card-body b").last().waitFor()
    // const titles = await page.locator(".card-body b").allTextContents()
    // console.log(titles)
    // const count = await products.count()
    // console.log(count)
    // for(let i=0; i < count; ++i)
    // {
    //     if(await products.nth(i).locator("b").textContent() === productName)
    //     {
    //         await products.nth(i).locator("text= Add To Cart").click() //locator based upon text
    //         break;
    //     }
    // }
    // //Going to cart and selecting the exact product from list of product to checkout
    // await page.locator("[routerlink*='cart']").click()
    // await page.locator("div li").first().waitFor() //wait if the function which we are using in next step is not eligible for auto wait
    // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible() //locator based upon text with tag
    // console.log(bool)
    // expect(bool).toBeTruthy()
    // await page.locator("text=Checkout").click()
    // //auto suggestion dropdown solution:
    // await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:150}) //delay is used to give 150 milliseconds delay before each key press
    // const dropdown = page.locator(".ta-results")
    // await dropdown.waitFor()
    // const optionsCount = await dropdown.locator("button").count()
    // for(let i = 0; i < optionsCount; ++i)
    // {
    //     const text = await dropdown.locator("button").nth(i).textContent()
    //     if(text === " India")
    //     {
    //         await dropdown.locator("button").nth(i).click()
    //         break;
    //     }
    // }
    // await expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
    // await page.locator("[name='coupon']").fill("rahulshettyacademy")
    // await page.locator("[type='submit']").click()
    // await page.locator("p:has-text('* Coupon Applied')").waitFor()
    // await expect(page.locator("p:has-text('* Coupon Applied')")).toContainText("* Coupon Applied")
    // await page.locator(".action__submit").click()
    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    // const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    // console.log(orderID)
    await page.locator("button[routerlink*='myorders']").click()
    //select Order ID from a table and view it
    await page.locator("tbody").waitFor()
    const itemsRows = await page.locator("tbody tr")
    for(let i = 0; i < await itemsRows.count(); ++i)//use count directly in for loop
    {
        const rowOrderId = await itemsRows.nth(i).locator("th").textContent()
        if(orderId.includes(rowOrderId))
        {
            await itemsRows.nth(i).locator("button").first().click()
            break
        }
            
    }
    const orderIdDetails = await page.locator(".col-text").textContent()
    //await page.pause()
    expect(orderId.includes(orderIdDetails)).toBeTruthy()




    //await page.pause()


})