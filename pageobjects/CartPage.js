const {expect} = require('@playwright/test')

class CartPage
{
    constructor(page)
    {
        this.page = page
        this.cartProducts = this.page.locator("div li").first()
        this.checkout = this.page.locator("text=Checkout")
        
    }

    async verifyProductIsDisplayed(productName)
    {
        await this.cartProducts.waitFor() //wait if the function which we are using in next step is not eligible
        const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible() //locator based upon text with tag //way of writing variable is has-text
        console.log(bool)
        expect(bool).toBeTruthy()

    }

    async checkOut()
    {
  
        await this.checkout.click()

    }
     

}

module.exports = {CartPage}