// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  //timeout for expect
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  //fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1, //process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers:10, //process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

projects : [
  {
    name: 'safari',
    use : {
      /* Base URL to use in actions like `await page.goto('/')`. */
      // baseURL: 'http://localhost:3000',

      browserName : 'webkit',
      headless : false,
      screenshot : 'only-on-failure',  //'only-on-failure' for failed TC only and 'off' for no screenshot
      trace : 'retain-on-failure', //'retain-on-failure' for traces of only failed TC and 'on' for all TCs
      ...devices['iPhone 11'], //to check on device directly. Uses dimensions by default
    },

  },
  {
    name : 'chrome',
    use : {
      /* Base URL to use in actions like `await page.goto('/')`. */
      // baseURL: 'http://localhost:3000',

      browserName : 'chromium',
      headless : false,
      screenshot : 'on',  //'only-on-failure' for failed TC only and 'off' for no screenshot
      trace : 'retain-on-failure', //'retain-on-failure' for traces of only failed TC, 'on' for all TCs and 'on-first-retry'
      //viewport : {width:320, height:320},  //handy for testing on mobile dimensions
      //...devices['Pixel 7']
      ignoreHttpsErrors :  true, //to handle ssl certification errors
      permissions : ['geolocation'], //to handle pop ups for location sharing
      video : 'retain-on-failure', //'on', 'off', 'retain-on-failure', 'on-first-retry' are options available
    },
  }
  
]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  

});

module.exports = config