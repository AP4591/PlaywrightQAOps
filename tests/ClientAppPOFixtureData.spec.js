const {test, expect} = require('@playwright/test')
const {customTest} = require('../utils/testbase_fixtureTD')
const {POManager} = require('../pageobjects/POManager')
const dataSet = JSON.parse(JSON.stringify(require('../utils/ClientAppPO_TD.json')))  //JSON->string->dataSet js object

test(`Client Page product filter and selection ${dataSet[0].productName}`, async ({page}) => {
  
    const poManager = new POManager(page)

    const loginpage = poManager.getLoginPage()
    await loginpage.landOnLogin()
    console.log(await page.title())
    await expect(page).toHaveTitle("Let's Shop")
    await expect(page.locator("h3")).toContainText("We Make Your Shopping Simple")
    await loginpage.validLogin(dataSet[0].username, dataSet[0].password)
    //Checking and selecting the exact product from list of products on page
    //await page.waitForLoadState('networkidle')
    const dashboardPage = poManager.getDashboardPage()
    await dashboardPage.searchProductAddCart(dataSet[0].productName)
    //Going to cart and selecting the exact product from list of product to checkout
    await dashboardPage.navigateToCart()
    const cartPage = poManager.getCartPage()
    await cartPage.verifyProductIsDisplayed(dataSet[0].productName)
    await cartPage.checkOut()
    //auto suggestion dropdown solution:
    const ordersReviewPage = poManager.getOrdersReviewPage()
    await ordersReviewPage.searchCountryAndSelect(dataSet[0].countryCode, dataSet[0].countryName)
    await ordersReviewPage.verifyEmailId(dataSet[0].username)
    await ordersReviewPage.addCoupon(dataSet[0].couponCode)
    const orderID = await ordersReviewPage.submitAndGetOrderID()
    console.log(orderID)
    //select Order ID from a table and view it
    const orderHistoryPage = poManager.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(orderID)
    const orderIdDetails = await orderHistoryPage.getOrderId()
    console.log(orderIdDetails)
    expect(orderID.includes(orderIdDetails)).toBeTruthy()

});

customTest(`Client Page product filter and selection`, async ({page, testDataForOrder}) => {   //Using fixture for data from testbase_fixtureTD.js file
  
    const poManager = new POManager(page)

    const loginpage = poManager.getLoginPage()
    await loginpage.landOnLogin()
    console.log(await page.title())
    await expect(page).toHaveTitle("Let's Shop")
    await expect(page.locator("h3")).toContainText("We Make Your Shopping Simple")
    await loginpage.validLogin(testDataForOrder.username, testDataForOrder.password)
    //Checking and selecting the exact product from list of products on page
    //await page.waitForLoadState('networkidle')
    const dashboardPage = poManager.getDashboardPage()
    await dashboardPage.searchProductAddCart(testDataForOrder.productName)
    //Going to cart and selecting the exact product from list of product to checkout
    await dashboardPage.navigateToCart()
    const cartPage = poManager.getCartPage()
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName)
    await cartPage.checkOut()
    //auto suggestion dropdown solution:
    const ordersReviewPage = poManager.getOrdersReviewPage()
    await ordersReviewPage.searchCountryAndSelect(testDataForOrder.countryCode, testDataForOrder.countryName)
    await ordersReviewPage.verifyEmailId(testDataForOrder.username)
    await ordersReviewPage.addCoupon(testDataForOrder.couponCode)
    const orderID = await ordersReviewPage.submitAndGetOrderID()
    console.log(orderID)
    //select Order ID from a table and view it
    const orderHistoryPage = poManager.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(orderID)
    const orderIdDetails = await orderHistoryPage.getOrderId()
    console.log(orderIdDetails)
    expect(orderID.includes(orderIdDetails)).toBeTruthy()

})