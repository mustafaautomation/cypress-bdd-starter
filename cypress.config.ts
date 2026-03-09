import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    screenshotsFolder: 'reports/screenshots',
    videosFolder: 'reports/videos',
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 2, openMode: 0 },
    defaultCommandTimeout: 8000,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      return config;
    },
  },

  env: {
    // SauceDemo's public credentials (displayed on login page)
    STANDARD_USER: process.env.CYPRESS_STANDARD_USER || 'standard_user',
    PASSWORD: process.env.CYPRESS_PASSWORD || 'secret_sauce',
  },

  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochaFile: 'reports/junit/results-[hash].xml',
    toConsole: true,
  },
});
