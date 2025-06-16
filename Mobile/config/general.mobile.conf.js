export const config = {
  maxInstances: 1,
  logLevel: "info",
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: false,
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 180000,
  },

  beforeEach: async function () {
    console.log("INFO: Garantindo que o app esteja no estado inicial...");

    await driver.execute("mobile: terminateApp", {
      bundleId: "br.com.lojaebac",
    });

    await driver.execute("mobile: launchApp", {
      bundleId: "br.com.lojaebac",
    });
    console.log("INFO: App reiniciado. Teste pronto para começar.");
  },

  afterEach: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (!passed) {
      try {
        await driver.takeScreenshot();
        console.log("INFO: Screenshot tirada após falha no teste.");
      } catch (e) {
        console.error("ERRO: Falha ao tirar screenshot após teste: ", e);
      }
    }
    console.log(
      `INFO: Teste mobile finalizado: ${test.title} - Status: ${
        passed ? "PASSOU" : "FALHOU"
      }`
    );
  },
};
