const {test, expect} = require('@playwright/test')

test.describe.configure({mode:'parallel'}) //helps in running all the TC parallelly. By default it is sequentially
//test.describe.configure({mode:'serial'}) //used when TCs are interdependent on each other.
test("Hidden element, Dialogue box and Popup Validation", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("https://google.com")
    // await page.goBack()  //Use to go back on browser page
    // await page.goForward()  //Use to go to next page on browser page
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    //Handle dialogue box
    page.on("dialogue", dialogue => dialogue.accept()) //dialogue.dismiss() to eject the dialogue box
    await page.locator("#confirmbtn").click()
    //Handle Hover
    await page.locator("#mousehover").hover()
    //await page.locator("a:has-text('Top')").click()
    await page.locator("a:has-text('Reload')").click()
    //Handle child frame
    const framesPage = page.frameLocator("#courses-iframe")
    await framesPage.locator("li a[href*='lifetime-access']:visible").click() //for visible/not visible elements on a page
    const textCheck = await framesPage.locator(".text h2").textContent()
    console.log(textCheck.split(" ")[1])


});

test("Screenshot", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("div.right-align").nth(1).screenshot({path: 'partialScreenshot.png'}) //for element screenshot
    await page.locator("#hide-textbox").click()
    await page.screenshot({path: 'Screenshot.png'}) //for complete page screenshot
    await expect(page.locator("#displayed-text")).toBeHidden()

})

test.skip("Visual comparison", async ({page})=>{

    await page.goto("https://www.google.com/")
    expect(await page.screenshot()).toMatchSnapshot('landing.png')  //for screenshot to screenshot comparison

})