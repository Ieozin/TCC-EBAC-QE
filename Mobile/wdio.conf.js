exports.config = {
  runner: "local",

  port: 4723,

  specs: ["./tests/**/*.js"],

  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "emulator-5554",
      "appium:platformVersion": "13.0",
      "appium:automationName": "UiAutomator2",
      "appium:app": require('path').join(process.cwd(), './Mobile/App/loja-ebac.apk'), 
      "appium:appPackage": "com.woocommerce.android",
      "appium:appActivity": "com.woocommerce.android.ui.login.LoginActivity",
      "appium:autoGrantPermissions": true, 
      "appium:noReset": true, 
      "appium:fullReset": false,
    },
  ],

  logLevel: "info",

  bail: 0,

  baseUrl: "http://localhost",

  waitforTimeout: 20000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  services: [
    [
      "appium",
      {
        args: {},
      },
    ],
  ],

  framework: "mocha",

  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 90000,
  },
};
