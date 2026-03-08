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

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      return config;
    },
  },

  env: {
    STANDARD_USER: 'standard_user',
    PASSWORD: 'secret_sauce',
  },

  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'reports/junit/results-[hash].xml',
    toConsole: true,
  },
});
