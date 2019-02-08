[![Build Status](https://travis-ci.org/t2ym/i18n-element.svg?branch=master)](https://travis-ci.org/t2ym/i18n-element)
[![Coverage Status](https://coveralls.io/repos/github/t2ym/i18n-element/badge.svg?branch=master)](https://coveralls.io/github/t2ym/i18n-element?branch=master)
[![npm](https://img.shields.io/npm/v/i18n-element.svg)](https://www.npmjs.com/package/i18n-element)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/t2ym/i18n-element)

# i18n-element

I18N Base Element for [`lit-html`](https://lit-html.polymer-project.org/) and [Polymer](https://polymer-library.polymer-project.org/) with [`i18n-behavior`](https://github.com/t2ym/i18n-behavior) as I18N engine

- `i18n-element` inserts **I18N layer** into UI definitions in HTML templates transparently
- `i18n-element` comes with the full-featured automation [tools](#Tools)

## Extendable and composable HTML template literals based on `lit-html`

```javascript
import { html, i18n, bind } from 'i18n-element/i18n.js';

class MyI18nElement extends i18n(HTMLElement) {
  ... // a few boilerplate mandatory methods are omitted here
  render() {
    return html`${bind(this, 'my-i18n-element')}
      <span>localizable message with ${this.property}</span>`;
  }
  ...
}

class ExtendedElement extends MyI18nElement {
  render() {
    return html`${bind(this, 'extended-element')}
      <div>extended message with ${this.property}</div>
      ${super.render()}`;
  }
}

class CompositeElement extends i18n(HTMLElement) {
  render() {
    return html`${bind(this /* bound to 'composite-element' */)}
      <div>composite element with ${getMessage()}</div>
      <extended-element></extended-element>`;
  }
}

const binding = bind('get-message', import.meta); // bound to a pseudo-element name

const getMessage = () => html`${'get-message', binding}<span>get message</span>`;
```

- Each HTML template literal is bound to its (pseudo-)element name
- Fetch JSON for locale resources at `locales/{element-name}.{locale}.json`

## Install

```sh
npm install i18n-element
```

## Import

- `lit-html` elements

```javascript
import { html, i18n, bind } from 'i18n-element/i18n.js';
```

- Polymer elements
```javascript
import { Localizable } from 'i18n-element/i18n-element.js';
```

## Quick Tour

[I18N-ready `pwa-starter-kit`](https://github.com/t2ym/pwa-starter-kit)

```sh
    npm install -g polymer-cli
    git clone https://github.com/t2ym/pwa-starter-kit
    cd pwa-starter-kit
    npm ci
    # Add Locales
    gulp locales --targets="de es fr ja zh-Hans"
    # I18N Process
    gulp
    # Translate XLIFF ./xliff/bundle.*.xlf
    # Merge Translation
    gulp
    # Dev build on http://localhost:8080
    polymer serve
    # Static build
    polymer build
    # Static build on http://localhost:8080
    cd build/{esm-unbundled|esm-bundled|es6-bundled|es5-bundled}
    python -m SimpleHTTPServer -p 8080
```

## Syntax

### I18N for `lit-html` elements

[Demo Source](https://github.com/t2ym/i18n-element/blob/master/demo/clock/clock.js)

```javascript
import { html, i18n, bind } from 'i18n-element/i18n.js';

class AwesomeElement extends i18n(HTMLElement) {
  static get importMeta() { return import.meta; }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.addEventListener('lang-updated', _langUpdated.bind(this));
  }
  _langUpdated(event) { this.invalidate(); }
  render() {
    return html`${bind(this, 'awesome-element')}
      <div>localizable message from ${this.is}</div>`;
  }
  invalidate() {
    render(this.render(), this.shadowRoot);
  }
}
customElements.define('awesome-element', AwesomeElement);
```

- I18N process automation for [`i18n-element/demo/`](https://github.com/t2ym/i18n-element/blob/master/demo/)

```sh
    # npm run demo === cd demo; gulp
    # Add locales
    npm run demo -- locales --targets="de es fr ja zh-Hans"
    # I18N process
    npm run demo
```

### `Localizable` mixin for Polymer elements

[Demo Source](https://github.com/t2ym/i18n-element/blob/master/demo/poc/elements/localizable-element.js)

```javascript
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

import { Localizable } from 'i18n-element/i18n-element.js';

class LocalizableElement extends Localizable(LegacyElementMixin(HTMLElement)) {
  static importMeta() { return import.meta; }
  static get template() {
    return html`<span id="label1">Localizable UI label 1</span>`;
  }
  static get is() { return 'localizable-element'; }
}
customElements.define(LocalizableElement.is, LocalizableElement);
```

### `Define = class` Thin Definition Syntax

```javascript
import 'i18n-element/define-element.js';

Define = class ThinElement extends Localizable(LegacyElementMixin(HTMLElement)) {
  static importMeta() { return import.meta; }
  static get template() {
    return html`<span id="label1">Localizable UI label 1</span>`;
  }
  // static get is() can be omitted
}
// customElements.define() can be omitted
```

### I18N-ready Bound Element `i18n-dom-bind` based on Polymer `dom-bind`

```javascript
import 'i18n-element/i18n-dom-bind.js';
```

- Based on Polymer `dom-bind` Element
- `i18n-dom-bind` element must have `id` attribute

[Demo Source](https://github.com/t2ym/i18n-element/blob/master/demo/poc/index.html)

```html
<i18n-dom-bind id="el5">
  <template>
    <span id="label1">Bound UI label 1</span>
  </template>
</i18n-dom-bind>
```

## Tools

Full-featured automation tools are available

| Module        | NPM version | Description |
|:--------------|:------------|:------------|
| [gulp-i18n-preprocess](https://github.com/t2ym/gulp-i18n-preprocess) | [![npm](https://img.shields.io/npm/v/gulp-i18n-preprocess.svg)](https://www.npmjs.com/package/gulp-i18n-preprocess) | Build-time I18N preprocessor |
| [gulp-i18n-leverage](https://github.com/t2ym/gulp-i18n-leverage) | [![npm](https://img.shields.io/npm/v/gulp-i18n-leverage.svg)](https://www.npmjs.com/package/gulp-i18n-leverage) | L10N JSON updater |
| [gulp-i18n-add-locales](https://github.com/t2ym/gulp-i18n-add-locales) | [![npm](https://img.shields.io/npm/v/gulp-i18n-add-locales.svg)](https://www.npmjs.com/package/gulp-i18n-add-locales) |  L10N JSON placeholder generator |
| [xliff-conv](https://github.com/t2ym/xliff-conv) | [![npm](https://img.shields.io/npm/v/xliff-conv.svg)](https://www.npmjs.com/package/xliff-conv) | XLIFF/JSON converter |
| [live-localizer](https://github.com/t2ym/live-localizer) | [![npm](https://img.shields.io/npm/v/live-localizer.svg)](https://www.npmjs.com/package/live-localizer) | L10N widget with Firebase storage |
| [i18n-element](https://github.com/t2ym/i18n-element) | [![npm](https://img.shields.io/npm/v/i18n-element.svg)](https://www.npmjs.com/package/i18n-element) | I18N base element class |
| [i18n-behavior](https://github.com/t2ym/i18n-behavior) | [![npm](https://img.shields.io/npm/v/i18n-behavior.svg)](https://www.npmjs.com/package/i18n-behavior) | Run-time I18N handler |
| [i18n-format](https://github.com/t2ym/i18n-format) | [![npm](https://img.shields.io/npm/v/i18n-format.svg)](https://www.npmjs.com/package/i18n-format) | I18N text formatter |
| [i18n-number](https://github.com/t2ym/i18n-number) | [![npm](https://img.shields.io/npm/v/i18n-number.svg)](https://www.npmjs.com/package/i18n-number) | I18N number formatter |

They are fully integrated in these samples:

- [I18N-ready `pwa-starter-kit`](https://github.com/t2ym/pwa-starter-kit) with [`pwa-starter-kit/gulpfile.js`](https://github.com/t2ym/pwa-starter-kit/blob/master/gulpfile.js)
- [`i18n-element` demo](https://github.com/t2ym/i18n-element) with [`i18n-element/demo/gulpfile.js`](https://github.com/t2ym/i18n-element/blob/master/demo/gulpfile.js)
- [Live Localizer demo](https://github.com/t2ym/live-localizer) with [`live-localizer/demo/gulpfile.js`](https://github.com/t2ym/live-localizer/blob/master/demo/gulpfile.js)

## Compatible Versions

| i18n-behavior  | i18n-element   | Polymer | lit-html |
|:---------------|:---------------|:--------|:---------|
| 3.x            | 3.x            | 3.x     | 1.x      |
| 2.x            | 2.x            | 1.x-2.x | -        |
| 1.x            | -              | 1.x     | -        |

## Browser Compatibility

- Polyfilled by `@webcomponents/webcomponentsjs/webcomponents-{bundle|loader}.js`

| Browser   | Chrome  | Firefox  | Edge 13+  | IE 11  | Safari 9+ | Chrome Android  | Mobile Safari  | Opera  |
|:----------|:-------:|:--------:|:---------:|:------:|:---------:|:---------------:|:--------------:|:------:|
| Supported | ✔       | ✔        | ✔         | ✔      | ✔         | ✔               | ✔              | ✔      |

## License

[BSD-2-Clause](https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md)
