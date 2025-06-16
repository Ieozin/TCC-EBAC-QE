import { config as generalMobileConf } from "./general.mobile.conf.js";
import dotenv from "dotenv"; // Mudança aqui
import path from "path"; // Mudança aqui
dotenv.config({ path: path.resolve(process.cwd(), "Mobile", ".env") });

const app_id_from_env = process.env.BROWSERSTACK_APP_ID;
const user_from_env = process.env.BROWSERSTACK_USERNAME;
const key_from_env = process.env.BROWSERSTACK_ACCESS_KEY;

console.log("CARREGADO - BROWSERSTACK_APP_ID:", app_id_from_env);
console.log("CARREGADO - BROWSERSTACK_USERNAME:", user_from_env);

const buildNameFixed = `TCC_iOS_Catálogo_Build_${new Date().getTime()}`;
const sessionNameFixed = `Teste_Catálogo_iOS_${new Date().getTime()}`;
const projectNameFixed = "TCC EBAC Mobile iOS";

export const config = {
  user: user_from_env,
  key: key_from_env,
  hostname: "hub.browserstack.com",
  services: [
    [
      "browserstack",
      {
        browserstackLocal: false,
        buildIdentifier: buildNameFixed,
      },
    ],
  ],
  capabilities: [
    {
      platformName: "iOS",
      "appium:platformVersion": "16",
      "appium:deviceName": "iPhone 14 Pro Max",
      "appium:app": app_id_from_env,
      "appium:automationName": "XCUITest",
      "appium:bundleId": "br.com.lojaebac",
      "appium:noReset": true,
      "appium:autoAcceptAlerts": true,

      "bstack:options": {
        projectName: projectNameFixed,
        buildName: buildNameFixed,
        sessionName: sessionNameFixed,

        realMobile: "true",

        debug: true,
        networkLogs: true,
        idleTimeout: 300,
      },
    },
  ],
  ...generalMobileConf,
  specs: ["../test/specs/tccCatalog.ios.test.js"],
};
