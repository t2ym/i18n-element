# Changelog

## [5.0.0] 2021-9-29
### Added
- [Issue #95](https://github.com/t2ym/i18n-element/issues/95) Support lit-html@2.0.0
- Tests on Edge 93 and Safari 14

### Changed

### Removed
- Tests on IE, legacy Edge, and old Safari

### Fixed

## [4.1.6] 2020-3-30
### Added

### Changed

### Removed

### Fixed
- [Partially Fixed Issue #93](https://github.com/t2ym/i18n-element/issues/93) Make `BaseElements.I18nElement` a dynamic property

## [4.1.5] 2020-3-29
### Added

### Changed

### Removed
- Workaround for [Known Issue #92](https://github.com/t2ym/i18n-element/issues/92) in demo

### Fixed
- [Issue #92](https://github.com/t2ym/i18n-element/issues/92) Skip updating `boundElement.lang` if it has already been synchronized with `<html lang>`

## [4.1.4] 2020-3-28
### Added
- Workaround for [Known Issue #92](https://github.com/t2ym/i18n-element/issues/92) in demo

### Changed
- Update dependencies (gulp, polymerfire, etc.) and package-lock.json

### Removed

## [4.1.2] 2019-3-29
### Added
- [Issue #89](https://github.com/t2ym/i18n-element/issues/89) Automate cleanup and resume I18N features on disconnection and reconnection
  - Disconnected elements are garbage-collected if no references to them exist
  - Note: Each element must handle its own cleanup and resume tasks on disconnection and reconnection, respectively

### Changed

### Removed
- `discard-on-disconnect` boolean attribute is no longer required and has no effects

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
