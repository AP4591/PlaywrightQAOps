const {expect} = require('@playwright/test')

class OrderHistoryPage
{
    constructor(page)
    {
        this.page = page
        this.orderHistory = page.locator("button[routerlink*='myorders']")
        this.ordersTable = page.locator("tbody")
        this.rows = page.locator("tbody tr")
        this.orderIdDetails =page.locator(".col-text")

        this.dropdown = page.locator(".ta-results")
        this.emailId = page.locator(".user__name [type='text']").first()
        this.fillCouponCode = page.locator("[name='coupon']")
        this.submitCouponCode = page.locator("[type='submit']")
        this.appliedCoupon = page.locator("p:has-text('* Coupon Applied')")
        this.submit = page.locator(".action__submit")
        this.orderConfirmationText = page.locator(".hero-primary")
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")
        
    }

    async searchOrderAndSelect(orderID)
    {
        await this.orderHistory.click()
        await this.ordersTable.waitFor()
        const itemsRows = await this.rows
        for(let i = 0; i < await itemsRows.count(); ++i)//use count directly in for loop
        {
            const rowOrderId = await itemsRows.nth(i).locator("th").textContent()
            if(orderID.includes(rowOrderId))
            {
                await itemsRows.nth(i).locator("button").first().click()
                break
            }
            
        }

    }

    async getOrderId()
    {
  
        return await this.orderIdDetails.textContent()

    }

}

module.exports = {OrderHistoryPage}