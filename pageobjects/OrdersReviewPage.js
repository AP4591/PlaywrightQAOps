const {expect} = require('@playwright/test')

class OrdersReviewPage
{
    constructor(page)
    {
        this.page = page
        this.country = this.page.locator("[placeholder*='Country']")
        this.dropdown = page.locator(".ta-results")
        this.emailId = page.locator(".user__name [type='text']").first()
        this.fillCouponCode = page.locator("[name='coupon']")
        this.submitCouponCode = page.locator("[type='submit']")
        this.appliedCoupon = page.locator("p:has-text('* Coupon Applied')")
        this.submit = page.locator(".action__submit")
        this.orderConfirmationText = page.locator(".hero-primary")
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")
        
    }

    async searchCountryAndSelect(countryCode, countryName)
    {
        await this.country.pressSequentially(countryCode, {delay:150}) //delay is used to give 150 milliseconds delay before each key press
        await this.dropdown.waitFor()
        const optionsCount = await this.dropdown.locator("button").count()
        for(let i = 0; i < optionsCount; ++i)
        {
            const text = await this.dropdown.locator("button").nth(i).textContent()
            if(text.trim() === countryName)
            {
                await this.dropdown.locator("button").nth(i).click()
                break;
            }
        }

    }

    async verifyEmailId(username)
    {
  
        await expect(this.emailId).toHaveText(username)

    }

    async addCoupon(couponCode)
    {
        await this.fillCouponCode.fill(couponCode)
        await this.submitCouponCode.click()
        await this.appliedCoupon.waitFor()
        await expect(this.appliedCoupon).toContainText("* Coupon Applied")
    }

    async submitAndGetOrderID()
    {
        await this.submit.click()
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ")
        return await this.orderId.textContent()
    }
     

}

module.exports = {OrdersReviewPage}