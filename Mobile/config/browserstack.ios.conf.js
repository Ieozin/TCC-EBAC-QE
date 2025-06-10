import { config as generalMobileConf } from "./general.mobile.conf.js";
import "dotenv/config";

export const config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: "hub.browserstack.com",
  services: [
    [
      "browserstack",
      {
        browserstackLocal: false,

        buildIdentifier: `TCC_EBAC_iOS_Catalogo_ManualRun_${new Date().getTime()}`,
      },
    ],
  ],
  capabilities: [
    {
      "bstack:options": {
        deviceName: "iPhone 14 Pro Max",
        platformVersion: "16",
        platformName: "iOS",
        app: process.env.BROWSERSTACK_APP_ID,

        projectName: "TCC EBAC Mobile iOS",

        buildName: `TCC iOS Catálogo - Local Manual Run`,
        sessionName: "Teste Catálogo de Produtos iOS TCC",

        debug: true,
        networkLogs: true,
        idleTimeout: 300,
      },
      "appium:automationName": "XCUITest",
      "appium:app": process.env.BROWSERSTACK_APP_ID,
    },
  ],
  ...generalMobileConf,
  specs: ["../test/specs/tccCatalog.ios.test.js"],
};
