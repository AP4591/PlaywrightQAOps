const {test, expect} = require('@playwright/test')
const {POManager} = require('../pageobjects/POManager')
const dataSet = JSON.parse(JSON.stringify(require('../utils/ClientAppPO_TD.json')))  //JSON->string->dataSet js object

for(const data of dataSet)  //For Test Data Parameterization. Using more than 1 data set from json file in Utils
{
    test(`Client Page product filter and selection ${data.productName}`, async ({page}) => {
  
        const poManager = new POManager(page)

        const loginpage = poManager.getLoginPage()
        await loginpage.landOnLogin()
        console.log(await page.title())
        await expect(page).toHaveTitle("Let's Shop")
        await expect(page.locator("h3")).toContainText("We Make Your Shopping Simple")
        await loginpage.validLogin(data.username, data.password)
        //Checking and selecting the exact product from list of products on page
        //await page.waitForLoadState('networkidle')
        const dashboardPage = poManager.getDashboardPage()
        await dashboardPage.searchProductAddCart(data.productName)
        //Going to cart and selecting the exact product from list of product to checkout
        await dashboardPage.navigateToCart()
        const cartPage = poManager.getCartPage()
        await cartPage.verifyProductIsDisplayed(data.productName)
        await cartPage.checkOut()
        //auto suggestion dropdown solution:
        const ordersReviewPage = poManager.getOrdersReviewPage()
        await ordersReviewPage.searchCountryAndSelect(data.countryCode, data.countryName)
        await ordersReviewPage.verifyEmailId(data.username)
        await ordersReviewPage.addCoupon(data.couponCode)
        const orderID = await ordersReviewPage.submitAndGetOrderID()
        console.log(orderID)
        //select Order ID from a table and view it
        const orderHistoryPage = poManager.getOrderHistoryPage()
        await orderHistoryPage.searchOrderAndSelect(orderID)
        const orderIdDetails = await orderHistoryPage.getOrderId()
        console.log(orderIdDetails)
        expect(orderID.includes(orderIdDetails)).toBeTruthy()

    })
}