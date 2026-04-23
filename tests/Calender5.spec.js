const {test, expect} = require('@playwright/test')

test("Calender validations", async ({page}) =>{

    const monthNumber = "6"
    const date = "15"
    const year = "2027"
    const expectedList = [monthNumber, date, year]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click()
    await page.locator(`abbr:has-text("${date}")`).click(); //If a variable is used inside the has-text locator
    const inputs = await page.locator (".react-date-picker__inputGroup input")
    for(let i=1; i<expectedList.length + 1; i++)
    {
        const value = await inputs.nth(i).inputValue()
        expect(value).toEqual(expectedList[i-1])
    }

    //calender validation



})