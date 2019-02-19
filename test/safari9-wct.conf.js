module.exports = {
  "plugins": {
    "local": {
      "disabled": true,
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
        "**/polyfill.js",
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
