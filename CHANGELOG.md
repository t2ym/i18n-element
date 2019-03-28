# Changelog

## [4.1.0] 2019-3-28
### Added
- `discard-on-disconnect` boolean attribute to perform cleanup on disconnection
  - Cleanup targets: `boundElements`, `lang-updated` event listeners, `MutationObserver` for `<html lang>` attribute
- `_i18nElementConnected` boolean property to store connection status of the element
- `demo/clock/shadow-repeat.js`: (experimental)
  - Element repeater in Shadow DOM to avoid disconnection in selective drawing

### Changed

### Removed

### Fixed
- [Issue #85](https://github.com/t2ym/i18n-element/issues/85) [super.render()] lang attribute flips to en with re-rendered elements

## [4.0.2] 2019-3-27
### Added

### Changed
- `boundElements` `Map` object stores `{ boundElement: boundElement, elements: elementsMapObject }` with the key `name`
  - `elementsMapObject` `Map` objects store maps from `this` element to `boundElementForThis` element

### Removed

## [4.0.1] 2019-3-27
### Added
- `static get observeHtmlLang()` can be overridden to set `this.observeHtmlLang` at `super()` constructor

### Changed
- `this._fetchStatus` object is maintained per instance when `this.observeHtmlLang` is `false`

### Removed
- Support of `this.observeHtmlLang = false` after `super()` call in `constructor()`

## [4.0.0] 2019-3-20
### Added
- `i18n-core.js` for preprocessed sources
- `demo/gulpfile.js` to convert `import {} from "i18n-element/i18n.js"` to `import {} from "i18n-element/i18n-core.js"`
  - Use the flag `const useI18nCoreJs = true;` to enable the conversion
- Depending on `wc-putty/polyfill.js`

### Changed
- Depending on `i18n-behavior@^4.0.0`
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
