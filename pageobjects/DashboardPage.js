class DashboardPage
{
    constructor(page)
    {
        this.page = page
        this.products = this.page.locator(".card-body")
        this.productsText = this.page.locator(".card-body b")
        this.cart = this.page.locator("[routerlink*='cart']")
        this.pro

    }

    async searchProductAddCart(productName)
    {
        const titles = await this.productsText.allTextContents()
        console.log(titles)
        const count = await this.products.count()
        console.log(count)
        for(let i=0; i < count; ++i)
        {
            if(await this.products.nth(i).locator("b").textContent() === productName)
            {
                await this.products.nth(i).locator("text= Add To Cart").click() //locator based upon text
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.cart.click()
    }

}

module.exports = {DashboardPage}