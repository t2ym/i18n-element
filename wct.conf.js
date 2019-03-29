module.exports = {
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
      "disabled": false,
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
          "platform":     "OS X 10.13",
          "version":      "11.1"
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
        "**/i18n-core.js",
        "**/i18n.js",
        "**/wc-putty/polyfill.js",
        "**/i18n-behavior/i18n-controller-core.js",
        "**/i18n-behavior/i18n-controller.js",
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
