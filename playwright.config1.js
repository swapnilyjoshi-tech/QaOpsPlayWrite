// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { permission } from 'node:process';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries:1,
  timeout: 30 * 1000,
  
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        ignoreHttpError:true,
        permissions:['geolocation'],

        ...devices['iPhone 15 Pro landscape']

      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
       // viewport:{width:720,height:720},
       video:'retain-on-failure'

      }
    }


  ]

  ,
});

module.exports = config