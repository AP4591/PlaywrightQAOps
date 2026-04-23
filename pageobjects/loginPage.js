class loginPage
{

    constructor(page)
    {
        this.page =page
        this.signInbutton = this.page.locator("#login")
        this.userName = this.page.locator("input[type='email']")
        this.password = this.page.locator("#userPassword")
    }

    async landOnLogin()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
        
    }

    async validLogin(username, password)
    {
        await this.userName.fill(username)
        await this.password.fill(password)
        await this.signInbutton.click()
        await this.page.locator(".card-body b").last().waitFor()
    }

}

module.exports = {loginPage}