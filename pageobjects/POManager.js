const {loginPage} = require('../pageobjects/loginPage')
const {DashboardPage} = require('../pageobjects/DashboardPage')
const {CartPage} = require('../pageobjects/CartPage')
const {OrdersReviewPage} = require('../pageobjects/OrdersReviewPage')
const {OrderHistoryPage} = require('../pageobjects/OrderHistoryPage')


class POManager
{
    constructor(page)
    {
        this.page = page
        this.loginpage = new loginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.CartPage = new CartPage(this.page)
        this.OrderReviewPage = new OrdersReviewPage(this.page)
        this.OrderHistoryPage = new OrderHistoryPage(this.page)
    }

    getLoginPage()
    {
        return this.loginpage

    }

    getDashboardPage()
    {
        return this.dashboardPage
    }
    
    getCartPage()
    {
        return this.CartPage
    }

    getOrdersReviewPage()
    {
        return this.OrderReviewPage
    }

    getOrderHistoryPage()
    {
        return this.OrderHistoryPage
    }
}

module.exports = {POManager}