const { test, expect } = require('@playwright/test');



//test.use({ browserName: 'webkit'});
test('Web Browser Context', async ({ browser }) => {

   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   await page.locator("#username").fill("rahulshetty");
   await page.locator("[type='password']").fill("learning");
   await page.locator("#signInBtn").click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   await page.locator("#username").fill("");
   await page.locator("#username").fill("rahulshettyacademy");
   await page.locator("#signInBtn").click();

});


test('Page Playwright Test', async ({ page }) => {
   await page.goto("https://google.com");
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");
});

test.skip('Client Page Test', async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/client/auth/login");
   console.log(await page.locator("h3").textContent());
   await expect(page.locator("h3")).toContainText("We Make Your Shopping Simple");
   await page.locator(".text-reset").click();
   await page.locator("#firstName").fill("Aniket");
   await page.locator("#lastName").fill("Pathak4");
   await page.locator("#userEmail").fill("aniket.pathak4@gmail.com");
   await page.locator("#userMobile").fill("9789878985");
   await page.locator("#userPassword").fill("Learning@123");
   await page.locator("#confirmPassword").fill("Learning@123");
   await page.locator("input[type='checkbox']").check();
   await page.locator("#login").click();
   // await page.pause();
   console.log(await page.locator(".headcolor").textContent());
   await expect(await page.locator(".headcolor")).toContainText("Successfully");
   await page.locator(".btn-primary").click();
   await page.locator("#userEmail").fill("aniket.pathak1@gmail.com");
   await page.locator("#userPassword").fill("Learning@123");
   await page.locator("#login").click();
   console.log(await page.locator(".card-body b").first().textContent());

});

test('UI Controls',async({page}) =>{

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator("#username");
   const userPassword = page.locator("#password");
   const signIn = page.locator("#signInBtn");
   const documentLink = page.locator("[href*='documents-request']");
   const dropDown = page.locator("select.form-control");
   await userName.fill("rahulshettyacademy ");
   await userPassword.fill("Learning@830$3mK2");
   await dropDown.selectOption("consult");
   await expect(dropDown).toHaveValue("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();
   console.log(await page.locator("#terms").last().isChecked())
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentLink).toHaveAttribute("class","blinkingText");
   await signIn.click();
   //await page.locator("#okayBtn").click();
   //await page.pause();

});

test('Child windows handling',async({browser}) =>
{
   
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator("#username");
   const documentLink = page.locator("[href*='documents-request']");

   const [newPage] = await Promise.all(
      [
         context.waitForEvent('page'),
         documentLink.click(),
      ]
   )
   
   const text = await newPage.locator(".red").textContent();
   console.log(text);
   await expect(newPage.locator(".red")).toContainText("Please email us");
   const arrayText = text.split("@");
   const domain = arrayText[1].split(" ")[0]
   //console.log(domain);
   await page.locator("#username").fill(domain);
   console.log(await page.locator("#username").inputValue());//inputValue() is used to get the value from a field which was inputted during the script run.
   

});













