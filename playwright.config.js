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
  testMatch: '**/*.spec.js',
  //timeout for expect
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 3,//process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: 15,//process.env.CI ? 1 : undefined
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    browserName : 'chromium',
    headless : false,
    screenshot : 'on',  //'only-on-failure' for failed TC only and 'off' for no screenshot
    trace : 'retain-on-failure', //'retain-on-failure' for traces of only failed TC and 'on' for all TCs
  },

});

module.exports = config