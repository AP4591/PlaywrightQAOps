const {test, expect} = require('@playwright/test')

test("Swag Labs UI", async ({page}) => {

    let totalInventoryPrice
    const inventory = page.locator(".inventory_item")
    const cartItem = page.locator(".cart_item")
    await page.goto("https://www.saucedemo.com/")
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()
    expect(await page.title()).toContain("Swag Labs")
    // const inventoryList = await page.locator(".inventory_list").allTextContents()
    // console.log(inventoryList)
    const inventoryCount = await inventory.count()
    console.log(inventoryCount)
    for(let i=0; i<inventoryCount; ++i)
    {
        await inventory.nth(i).locator(".btn_inventory").click()
    }
    await page.locator(".shopping_cart_link").click()
    expect(await cartItem.count()).toEqual(inventoryCount)
    await page.locator("#checkout").click()
    await expect(page.locator("span:has-text('Checkout: Your Information')")).toContainText("Your Information")
    await page.getByPlaceholder("First Name").fill("Aryan")
    await page.getByPlaceholder("Last Name").fill("Khan")
    await page.getByPlaceholder("Zip/Postal Code").fill("500084")
    await page.getByRole("button", {name : "continue"}).click()
    await expect(page.locator(".title")).toContainText("Overview")
    // await page.locator(".cart_list").waitFor()
    expect(await cartItem.count()).toEqual(inventoryCount)
    const inventoryPrice = await page.locator(".inventory_item_price").allTextContents()
    console.log(inventoryPrice)
    // Convert to numbers (removing the '$') and sum them up
    const calculatedItemTotal = inventoryPrice.reduce((sum, price) => 
    {
        // .replace('$', '') removes the currency symbol
        // parseFloat() converts the remaining "29.99" into a real number
        return sum + parseFloat(price.replace('$', ''));
    }, 0); // The '0' is the starting value for 'sum'
    
    // 2. Get the displayed total from the summary element
    // Text is "Total: $140.34"
    const summaryTotal = await page.locator('.summary_total_label').innerText();

    // 3. Extract just the number from the summary string
    // This regex or Regular Expression (/[^0-9.]/g) removes everything except numbers and the decimal point
    const displayedTotal = parseFloat(summaryTotal.replace(/[^0-9.]/g, ''));
    console.log(displayedTotal)
    const summaryTax = await page.locator('.summary_tax_label').innerText();
    const displayedTax = parseFloat(summaryTax.replace(/[^0-9.]/g, ''))
    console.log(displayedTax)
    const calculatedTotal = calculatedItemTotal + displayedTax

    // 4. Compare the values
    // Use toBeCloseTo for currency to avoid minor floating-point rounding issues
    expect(calculatedTotal).toBeCloseTo(displayedTotal, 2);
    await page.getByRole("button", {name : "finish"}).click()
    const CheckoutComplete = page.locator(".complete-header").textContent()
    expect(await CheckoutComplete).toContain("Thank you for your order!")
    await page.locator("#back-to-products").click()
    await page.locator("#react-burger-menu-btn").click()
    await page.getByRole("link", { name: 'Logout' }).click()
    expect(await page.locator(".login_logo").textContent()).toContain("Swag Labs")
})