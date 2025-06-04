const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: "http://lojaebac.ebaconline.art.br/",
    setupNodeEvents(on, config) {},
    specPattern: "cypress/e2e/**/*.cy.js",
  },
});
