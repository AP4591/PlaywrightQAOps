const { Given, When, Then } = require('@cucumber/cucumber')
const {POManager} = require('../../pageobjects/POManager')
const {expect} = require('@playwright/test')
const playwright = require('@playwright/test')

Given('a login to Ecommerce application with {string} and {string}', {timeout : 100*1000}, async function (username, password) {   //By default the timeout is 5 sec and if any method needs more time and fails use timeout
           
        this.username = username
        // const browser = await playwright.chromium.launch({headless : false})
        // const context = await browser.newContext();
        // const page = await context.newPage();
        this.poManager = new POManager(this.page)
        const loginpage = this.poManager.getLoginPage()
        await loginpage.landOnLogin()
        console.log(await this.page.title())
        await expect(this.page).toHaveTitle("Let's Shop")
        await expect(this.page.locator("h3")).toContainText("We Make Your Shopping Simple")
        await loginpage.validLogin(username, password)
        
});

When('Add {string} to Cart', async function (productName) {
           
        this.dashboardPage = this.poManager.getDashboardPage()
        await this.dashboardPage.searchProductAddCart(productName)
        await this.dashboardPage.navigateToCart()
        
});

Then('verify {string} is displayed in the Cart', async function (productName) {
           
        const cartPage = this.poManager.getCartPage()
        await cartPage.verifyProductIsDisplayed(productName)
        await cartPage.checkOut()
        
});

When('Enter valid details {string}, {string} and Place the Order with coupon code {string}', async function (countryCode, countryName, couponCode) {
           
        const ordersReviewPage = this.poManager.getOrdersReviewPage()
        await ordersReviewPage.searchCountryAndSelect(countryCode, countryName)
        await ordersReviewPage.verifyEmailId(this.username)
        await ordersReviewPage.addCoupon(couponCode)
        this.orderID = await ordersReviewPage.submitAndGetOrderID()
        console.log(this.orderID)
        
});

Then('Verify order in present in the OrderHistory', async function () {
           
        const orderHistoryPage = this.poManager.getOrderHistoryPage()
        await orderHistoryPage.searchOrderAndSelect(this.orderID)
        const orderIdDetails = await orderHistoryPage.getOrderId()
        console.log(orderIdDetails)
        expect(this.orderID.includes(orderIdDetails)).toBeTruthy()
});

Given('a login to Ecommerce2 application with {string} and {string}', {timeout : 100*1000}, async function (username, password) {   //By default the timeout is 5 sec and if any method needs more time and fails use timeout
           
        console.log('Username:', username);
        console.log('Password:', password);    
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await this.page.title());
        await this.page.locator("#username").fill(username);
        await this.page.locator("[type='password']").fill(password);
        await this.page.locator("#signInBtn").click();
        
});

Then('Verify Error message is displayed', async function () {

        console.log(await this.page.locator("[style*='block']").textContent());
        await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
