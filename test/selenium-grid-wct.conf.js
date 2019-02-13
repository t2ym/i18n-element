module.exports = {
  "webserver": {
    "hostname": "selenium-hub"
  },
  "activeBrowsers": [
    {
      "url": 'http://selenium-hub:4444/wd/hub',
      "browserName": "internet explorer",
      "version": "11",
    },
    {
      "url": 'http://selenium-hub:4444/wd/hub',
      "browserName": "safari",
      "version": "12",
    },
  ],
  "plugins": {
    "local": {
      "browsers": [
        "chrome",
        "firefox"
      ],
      "browserOptions": {
        "chrome": [
          "headless",
          "disable-gpu"
        ],
        "firefox": [
          "--headless"
        ]
      }
    },
    "sauce": {
      "disabled": true,
      "browsers": [
        {
          "browserName":  "microsoftedge",
          "platform":     "Windows 10",
          "version":      "17"
        },
        {
          "browserName":  "internet explorer",
          "platform":     "Windows 8.1",
          "version":      "11"
        },
        {
          "browserName":  "safari",
          "platform":     "OS X 10.13",
          "version":      "12"
        },
        {
          "browserName":  "safari",
          "platform":     "OS X 10.11",
          "version":      "9"
        }
      ]
    },
    "istanbul": {
      "dir": process.env.COVERAGE_DIR || "test/coverage-report",
      "reporters": ["text-summary", "lcov"],
      "include": [
        "**/i18n-element.js",
        "**/i18n-dom-bind.js",
        "**/define-element.js",
        "**/define-element-base.js",
        "**/i18n.js",
        "**/i18n-behavior/i18n-behavior.js",
        "**/i18n-behavior/i18n-attr-repo.js",
        "**/i18n-behavior/i18n-preference.js"
      ],
      "exclude": [
        "/test/**/*"
      ]
    }
  }
};
