const {test, expect} = require('@playwright/test')

test("Client Page App using getBy way", async ({page}) => {

    const email = "aniket.pathak4@gmail.com"
    const productName = "ZARA COAT 3"
    const products = page.locator(".card-body")
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log(await page.title())
    console.log(await page.locator("h3").textContent())
    await expect(page.locator("h3")).toContainText("We Make Your Shopping Simple")
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill("Learning@123")
    await page.getByRole("button", {name: "Login"}).click()
    //Checking and selecting the exact product from list of products on page
    //await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").last().waitFor()
    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: " Add To Cart"}).click()
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click()
    await page.locator("div li").first().waitFor()//wait if the function which we are using in next step is not eligible for auto wait
    await expect(page.getByText("ZARA COAT 3")).toBeVisible()
    await page.getByRole("button", {name: "Checkout"}).click()
    await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:150})
    await page.getByRole("button", {name: "India"}).nth(1).click()
    await page.getByText("Place Order").click()
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible()


   
    // const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    // console.log(orderID)
    // await page.locator("button[routerlink*='myorders']").click()
    // //select Order ID from a table and view it
    // await page.locator("tbody").waitFor()
    // const itemsRows = await page.locator("tbody tr")
    // for(let i = 0; i < await itemsRows.count(); ++i)//use count directly in for loop
    // {
    //     const rowOrderId = await itemsRows.nth(i).locator("th").textContent()
    //     if(orderID.includes(rowOrderId))
    //     {
    //         await itemsRows.nth(i).locator("button").first().click()
    //         break
    //     }
            
    // }
    // const orderIdDetails = await page.locator(".col-text").textContent()
    // expect(orderID.includes(orderIdDetails)).toBeTruthy()




    //await page.pause()


})