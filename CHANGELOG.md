# Changelog

## [Unreleased]
### Added
- `i18n-core.js` for preprocessed sources
- `demo/gulpfile.js` to convert `import {} from "i18n-element/i18n.js"` to `import {} from "i18n-element/i18n-core.js"`
  - Use the flag `const useI18nCoreJs = true;` to enable the conversion
- Use `wc-putty/polyfill.js`

### Changed
- Depend on `i18n-behavior@4.0.0-pre.13`
  - Import `i18n-behavior/i18n-controller.js`, which is independent of Polymer library
  - Import `i18n-behavior/i18n-controller-core.js` for preprocessed sources

### Removed
- Mandatory dependency on Polymer library
  - Polymer elements npm packages must depend on Polymer library by themselves to import `i18n-element.js`
- Safari 9 support
- polyfill.js

## [3.0.0] 2019-2-24
### Added
- Support `lit-html` I18N
- Polymer 3.x in ES modules

### Changed

### Removed
- Polymer 1.x/2.x support in HTML Imports
- Bower support

## [2.0.0]
### Added
- Polymer 2.x Class syntax
- `i18n-dom-bind`
- `Define = class` thin syntax
