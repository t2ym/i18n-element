[![Bower](https://img.shields.io/bower/v/i18n-element.svg)](https://customelements.io/t2ym/i18n-element/)
[![npm](https://img.shields.io/npm/v/i18n-element.svg)](https://www.npmjs.com/package/i18n-element)

# i18n-element

I18N Base Element for Polymer 2.x (work in progress)

## Proof of Concept Demo on GitHub Pages

### [Raw PoC Demo](https://t2ym.github.io/i18n-element/components/i18n-element/demo/poc/index.html) for ES6-ready browsers
### [PoC Demo with Polyfill/Vulcanize/Babel/Uglify](https://t2ym.github.io/i18n-element/components/i18n-element/demo/pocmin/) for Safari 8+, IE 11, and ES6-ready browsers

[Demo Source index.html](https://github.com/t2ym/i18n-element/blob/master/demo/poc/index.html)

### Notes

- This is just a proof-of-concept demo and not applicable to general purposes yet
- Bower dependencies with their branch names have no tags, i.e., no versions, and have to be updated in sync with the branches frequently. 
- Raw PoC demo supported browsers: Chrome 54+ (native), Firefox 49, Edge 14, Safari 10
- The modules are dependent upon modules from [`i18n-behavior`](https://github.com/t2ym/i18n-behavior)
- Some Polymer 1.x modules (`iron-ajax`, `iron-localstorage`) are running as Polymer 2.x modules without compatibility tests
- Internal function `MixinBehavior` is borrowed from [`polymer#2.0-preview src/legacy/class.html`](https://github.com/Polymer/polymer/blob/2.0-preview/src/legacy/class.html)
- Some i18n-behavior modules (`i18n-behavior`, `i18n-preference`, `i18n-attr-repo`) are slightly converted for Polymer 2.x
- Support ShadowDOM V1 `slot` with [`i18n-format`](https://github.com/t2ym/i18n-format/tree/2.0-develop) and [`i18n-number`](https://github.com/t2ym/i18n-number/tree/2.0-develop) in their `2.0-develop` branches
- `Mixins.Logger` is just for logging debug information and can be omitted
- Polyfill for IE11: [`es6-shim`](https://github.com/paulmillr/es6-shim), [`get-own-property-symbols`](https://github.com/es-shims/get-own-property-symbols), vulcanize app and polymer, and babel es2015 in addition to webcomponents-lite.js
- [`demo/gulpfile.js`](https://github.com/t2ym/i18n-element/blob/master/demo/gulpfile.js) to build PoC Demo with Polyfill/Vulcanize/Babel
- [`Pre-Transpiled Polymer 2.0-preview`](https://github.com/Polymer/polymer/commit/fb70b870656442f3766a8d055f27ab541dc0c978) has not been supported yet
- Missing `webcomponents-lite.min.js` in [`v1` branch](https://github.com/webcomponents/webcomponentsjs/tree/v1) is generated in the gulp tasks
- [`custom-elements/src/native-shim.js`](https://github.com/webcomponents/custom-elements/blob/master/src/native-shim.js) to support native Custom Elements v1 with ES5 from Babel


## [Tests](https://t2ym.github.io/i18n-element/components/i18n-element/test/index2.html) on GitHub Pages

### Test Suites

| Test Suites (`*-test.html`) | Description                 |
|:----------------------------|:----------------------------|
| basic                       | Basic functionalities       |
| edge-case                   | Edge cases                  |
| multiple-case               | Multiple element cases      |
| template-default-lang       | `templateDefaultLang` tests |
| preference                  | `i18n-preference` tests     |
| no-persist                  | `i18n-preference` tests     |

### Test on Build Phases

| Build Phases      | UI Strings | L10N JSON            | HTML                    | JavaScript                   |
|:------------------|:-----------|:---------------------|:------------------------|:-----------------------------|
| src2              | Hard-coded | Modular              | Modular                 | HTML Embedded                |
| preprocess2       | Extracted  | Modular              | Modular                 | HTML Embedded                |
| minify2-min       | Extracted  | Bundled and Minified | Vulcanized and Minified | Transpiled and Minified      |

### Notes

- 4 syntax variants (`Mixins.Localizable`, `BaseElements.I18nElement`, `Define = class`, `Polymer({ is, behaviors })`) are tested
- 2 test suites for `complex-compound-binding-element` are skipped due to a remaining design issue originating from the modified syntax for Polymer 2.x
- Tests on IE11 with Polyfill/Vulcanize/Babel/Uglify
- [test-fixture](https://github.com/t2ym/test-fixture/tree/ce-v1-babel) is transpiled to ES5 by Babel
- [`custom-elements/src/native-shim.js`](https://github.com/webcomponents/custom-elements/blob/master/src/native-shim.js) to support native Custom Elements v1 with ES5 from Babel

## Install

```shell
bower install i18n-element
```

## Import

```html
<link rel="import" href="bower_components/i18n-element/i18n-element.html">
```

## Syntax

### `Mixins.Localizable` [Class Expressions Mixin](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/)

- Currently Most Stable Syntax
- Extend Polymer.LegacyElement for now
- Empty `static get config() { return { behaviors: [], observers: [] }; }` may do harm

[Demo Source](https://github.com/t2ym/i18n-element/blob/master/demo/poc/elements/localizable-element.html)

```html
<dom-module id="localizable-element">
  <template>
    <span id="label1">Localizable UI label 1</span><br>
    <span id="label2">Localizable UI label 2</span><br>
    <span id="label3">Localizable UI label 3</span>
  </template>
</dom-module>
<script>
class LocalizableElement extends Mixins.Localizable(Polymer.LegacyElement) {
  static get is() { return 'localizable-element'; }
}
customElements.define(LocalizableElement.is, LocalizableElement);
</script>
```

### `BaseElements.I18nElement` I18N Base Element Class

- Equivalent to `Mixins.Localizable(Polymer.LegacyElement)`

[Demo Source](https://github.com/t2ym/i18n-element/blob/master/demo/poc/elements/i18n-subclass-element.html)

```html
<dom-module id="i18n-subclass-element">
  <template>
    <span id="label1">Subclass UI label 1</span><br>
    <span id="label2">Subclass UI label 2</span><br>
    <span id="label3">Subclass UI label 3</span>
  </template>
</dom-module>
<script>
class I18nSubclassElement extends BaseElements.I18nElement {
  static get is() { return 'i18n-subclass-element'; }
}
customElements.define(I18nSubclassElement.is, I18nSubclassElement);
</script>
```

### `Define = class` Thin Definition Syntax derived from [Thin Polymer](https://github.com/t2ym/thin-polymer) for Polymer 1.x

Additional Import:
```html
<link rel="import" href="bower_components/i18n-element/define-element.html">
```

- `is` static property is generated by un-camel-casing class name
- `<template id="element-name">` is used instead of `<dom-module id="element-name">`
- `customElements.define(ElementClass.is, ElementClass)` is called
- Element class is registered as `Define.ElementClass`
- Applicable to both Class Expressions Mixin and I18N Base Element Class
- Applicable to non-I18N element classes as well

[Demo Source](https://github.com/t2ym/i18n-element/blob/master/demo/poc/elements/i18n-thin-element.html)

```html
<template id="i18n-thin-element">
  <span id="label1">Thin UI label 1</span><br>
  <span id="label2">Thin UI label 2</span><br>
  <span id="label3">Thin UI label 3</span>
</template>
<script>
Define = class I18nThinElement extends BaseElements.I18nElement {
}
</script>
```

### `Polymer({ is, behaviors })` Legacy Syntax for Polymer 1.x Compatibility

Import:
```html
<!-- DO NOT IMPORT i18n-element.html -->
<link rel="import" href="bower_components/i18n-element/i18n-behavior.html">
```

- Polymer 1.x Compatible Legacy Syntax
- Import `i18n-behavior.html`, and not `i18n-element.html`
- [`gulp-i18n-preprocess`](https://github.com/t2ym/gulp-i18n-preprocess) 1.2.1 or later is required for vulcanized applications

[Demo Source](https://github.com/t2ym/i18n-element/blob/master/demo/poc/elements/i18n-legacy-element.html)

```html
<dom-module id="i18n-legacy-element">
  <template>
    <span id="label1">Legacy UI label 1</span><br>
    <span id="label2">Legacy UI label 2</span><br>
    <span id="label3">Legacy UI label 3</span>
  </template>
</dom-module>
<script>
Polymer({
  is: 'i18n-legacy-element',
  behaviors: [ BehaviorsStore.I18nBehavior ]
});
</script>
```

### I18N-ready Bound Element `i18n-dom-bind`

Additional Import:
```html
<link rel="import" href="bower_components/i18n-element/i18n-dom-bind.html">
```

- Based on `dom-bind` Element
- `i18n-dom-bind` element must have `id` attribute

[Demo Source](https://github.com/t2ym/i18n-element/blob/master/demo/poc/index.html)

```html
<i18n-dom-bind id="el5">
  <template>
    <span id="label1">Bound UI label 1</span><br>
    <span id="label2">Bound UI label 2</span><br>
    <span id="label3">Bound UI label 3</span>
  </template>
</i18n-dom-bind>
```

## Use Native Shadow DOM v1 on Safari 10 for PoC Demo

Comment out `shadydom.min.js` and `shadycss.min.js` dependencies in `webcomponents-lite.js` to use native Shadow DOM v1

`bower_components/webcomponentsjs/webcomponents-lite.js`:
```javascript
  // construct full dependency list
  var modules = [
    'URL/URL.js',
    'WeakMap/WeakMap.js',
    'Template/Template.js',
    'HTMLImports/HTMLImports.js',
    'WebComponents/pre-polyfill.js',
    '../../custom-elements/custom-elements.min.js',
    //'../../shadydom/shadydom.min.js',
    //'../../shadycss/shadycss.min.js',
    'WebComponents/post-polyfill.js',
    // these scripts are loaded here due to polyfill timing issues
    'WebComponents/dom.js',
    'WebComponents/unresolved.js'
  ];
```

## Targeted Features follow
## == Original README of [`i18n-behavior`](https://github.com/t2ym/i18n-behavior) inapplicable to `i18n-element` for now

[API Docs](https://t2ym.github.io/i18n-behavior/components/i18n-behavior/), [Demo](https://t2ym.github.io/i18n-behavior/components/i18n-behavior/demo/), and [Test](https://t2ym.github.io/i18n-behavior/components/i18n-behavior/test/) on GitHub Pages (https://t2ym.github.io/i18n-behavior)

<img src="https://raw.githubusercontent.com/wiki/t2ym/i18n-behavior/i18n-behavior.gif" width="768px">

## Stable Release 1.1.0

- XLIFF import/export support with [xliff-conv](https://github.com/t2ym/xliff-conv) converter
- Experimental [Polymer CLI pre-release 0.11.1](https://www.polymer-project.org/1.0/docs/tools/polymer-cli) support with [I18N task integration](https://github.com/t2ym/gulp-i18n-preprocess#integrate-with-polymer-cli-project-templates-highly-experimental), based on a private API
- [Selective I18N-target attribute](https://github.com/t2ym/i18n-behavior/issues/42) support via [`<i18n-attr-repo>` element](https://github.com/t2ym/i18n-behavior/issues/40)
- [Compound bindings](https://github.com/t2ym/i18n-behavior/issues/46) support for I18N-target attributes

## Stable Release 1.0.0

- Instant I18N by one line addition of `I18nBehavior`
- Minimal or no overhead for development: Run-time automatic extraction of hard-coded UI text strings from HTML templates
- Optimal for production: Build-time automatic extraction and bundling of hard-coded UI text strings from HTML templates by [`gulp-i18n-preprocess`](https://github.com/t2ym/gulp-i18n-preprocess) preprocessor
- Modular (per element) JSON support for storing and fetching localized UI text strings
- Bundled (per app) JSON support for storing and fetching localized UI text strings
- Automatic application of [`<i18n-format>`](https://github.com/t2ym/i18n-format) with [Unicode CLDR plural rules](http://cldr.unicode.org/index/cldr-spec/plural-rules) and Gender support
- [Polymer 1.2.0](https://www.polymer-project.org/1.0/docs/release-notes.html#release-120httpsgithubcompolymerpolymertreev120-2015-10-22)'s [Compound Bindings](https://www.polymer-project.org/1.0/docs/devguide/data-binding.html#compound-bindings) support with [`<i18n-format>`](https://github.com/t2ym/i18n-format)
- `i18n-dom-bind` template instead of `dom-bind` for instant I18N of bound templates
- Dynamic on-demand fetching of localized UI text strings from JSON under `locales` directories
- Real-time observation of `<html lang>` attribute value for UI text localization
- Robust fallback of missing UI text strings to parent locales and finally to the default locale (e.g. "fr-CA" -> "fr" -> "en") with practical [BCP47](https://tools.ietf.org/html/bcp47) support
- `this.text` dynamic object shared among the same custom element to access localized strings
- `this.model` object deepcopied from `this.text.model` object per instance to access localized attribute strings
- [`i18n-attr-repo`](https://t2ym.github.io/i18n-behavior/components/i18n-behavior/#i18n-attr-repo) to maintain repository of I18N target attributes
- [`gulp-i18n-leverage`](https://github.com/t2ym/gulp-i18n-leverage) filter to merge changes in the default language in HTML templates into localized JSON resources.
- [`gulp-i18n-leverage`](https://github.com/t2ym/gulp-i18n-leverage) filter to put meta infomation, that is, L10N "TO DO" list, for the merged changes in JSON resources
- Option to define I18N target strings manually by `<json-data>` elements

## Conceptual Workflow

<img src="https://raw.githubusercontent.com/wiki/t2ym/i18n-behavior/PolymerI18nFlow.gif" width="768px">

## Browser Compatibility

Polyfilled by [`webcomponents-lite.min.js`](https://github.com/webcomponents/webcomponentsjs)

| DOM       | Chrome* | Firefox* | Edge 13+  | IE 10+ | Safari 7+ | Chrome Android* | Mobile Safari* | Opera* |
|:----------|:-------:|:--------:|:---------:|:------:|:---------:|:---------------:|:--------------:|:------:|
| Shady     | ✔       | ✔       | ✔         | ✔     | ✔         | ✔              | ✔              | ✔     |
| Shadow    | ✔       | -        | -         | -      | -         | ✔              | -              | ✔     |

 `*` latest versions

## Install

```
    bower install --save i18n-behavior
```

[Quick Tour](#quick-tour) with [polymer-starter-kit-i18n](https://github.com/t2ym/polymer-starter-kit-i18n)

## Import

```html
    <link rel="import" href="/path/to/bower_components/i18n-behavior/i18n-behavior.html">
```

## Usage

### Run-time Automatic I18N (for development)

Apply `BehaviorsStore.I18nBehavior` for run-time automatic I18N.

#### Source Code:

```html
    <dom-module id="custom-element">
      <template>
        <span id="label">UI text label</span> <!-- no need to touch UI text strings -->
      </template>
      <script>
        Polymer({
          is: 'custom-element',
          behaviors: [
            BehaviorsStore.I18nBehavior // Add this line for I18N
          ]
        });
      </script>
    </dom-module>
```

#### I18N-ready preprocessed DOM at element registration: 

Hard-coded UI text strings are automatically extracted and replaced with annotations bound to `text` object.

`lang` attribute specifies the current locale. By default, `<html lang>` attribute is observed and
mirrored to those for I18N-ready element instances.

```html
    <html lang="en"><!-- html lang attribute is observed and mirrored -->
      ...
      <custom-element lang="en">
        <span id="label">{{text.label}}</span><!-- UI texts are bound to text object -->
      </custom-element>
      ...
    </html>
```

If the containing element of the target text has `id` attribute, the string id is named with the `id` value.
If not, the string id is automatically generated. It is recommended to put meaningful `id` to each string 
for robustness. When attaching `id` attribute is too much for the containing element, `text-id` attribute can be used instead.

```html
    <span text-id="label">{{text.label}}</span>
```

#### `text` dynamic property:

`this.text` dynamic object property represents an object with UI text strings for the current locale.

```javascript
    this.text = {
      "label": "UI Text Label"
    }
```

`this.text` dynamic object is SHARED among all the instances of the same custom element.

#### `model` dynamic property:

`this.model` is deepcopied from `this.text.model` per instance to store I18N target attribute values.
UI text strings in I18N target attributes are automatically extracted and replaced with annotations
according to the shared repository (`i18n-attr-repo`) of I18N target attributes per elements 
(like `placeholder` attribute of `input` element).

On `lang-updated` event, `this.text.model` is updated but `this.model` is NOT automatically updated
and needs explicit update like this.

```javascript
    listeners: {
      'lang-updated': '_langUpdated'
    },

    _langUpdated: function (event) {
      if (Polymer.dom(event).rootTarget === this) {
        this.model = deepcopy(this.text.model);
      }
    }
```

#### `<json-data>` for manual text definitions

Optionally, any JSON data can be manually added to I18N target strings via `<json-data>` element.
This option is effective for manual extraction of hard-coded UI text strings in JavaScript literals.

```html
  <dom-module id="my-element">
    <template>
      ... <!-- ordinary template for rendering -->
      <template><!-- containing template element to avoid rendering -->
        <json-data id="items">[
          "Responsive Web App boilerplate",
          "Iron Elements and Paper Elements",
          "End-to-end Build Tooling (including Vulcanize)",
          "Unit testing with Web Component Tester",
          "Routing with Page.js",
          "Offline support with the Platinum Service Worker Elements"
        ]</json-data>
        <json-data id="sender">{ "name": "Sam", "gender": "male" }</json-data>
      </template>
    </template>
    <script>
    ...
    this.text.items[0] === 'Responsive Web App boilerplate'
    this.text.sender.name === 'Sam'
    ...
    </script>
  </dom-module>
```

#### Localized text strings fetched from JSON:

While default text strings are extracted from the hard-coded strings in HTML template,
localized text strings are asynchronously fetched from JSON files under `locales` directory at the server.

```
    /bundle.json
    /locales/bundle.ja.json
            /bundle.fr.json
            /bundle.zh-Hans.json
    
    /elements/my-list/my-list.json
                     /locales/my-list.ja.json
                             /my-list.zh-Hans.json
    
             /google-chart-demo/google-chart-demo.json
                               /locales/google-chart-demo.ja.json
                                       /google-chart-demo.fr.json
```

### Build-time Automatic I18N (for production)

[`gulp-i18n-preprocess`](https://github.com/t2ym/gulp-i18n-preprocess) filter performs build-time automatic I18N and embeds UI texts as JSON.

I18N-ready Source Code preprocessed by [`gulp-i18n-preprocess`](https://github.com/t2ym/gulp-i18n-preprocess):

```html
    <dom-module id="custom-element">
      <template localizable-text="embedded">
        <span id="label">{{text.label}}</span>
        <template id="localizable-text">
          <json-data>{
            "label": "UI Text Label"
          }</json-data>
        </template>
      </template>
    </dom-module>
```

Default text values are immediately extracted from the embedded JSON 
without overheads of run-time traversal into the whole template.

## Changelogs

#### Stable Release 1.1.0

##### Modules

| Module        | Packager | Version | Description |
|:--------------|:---------|:--------|:------------|
| [i18n-behavior](https://github.com/t2ym/i18n-behavior) | bower | [1.1.0](https://github.com/t2ym/i18n-behavior/releases/tag/1.1.0) | Run-time I18N handler |
| [i18n-format](https://github.com/t2ym/i18n-format) | bower | [1.0.0](https://github.com/t2ym/i18n-format/releases/tag/1.0.0) | I18N text formatter |
| [i18n-number](https://github.com/t2ym/i18n-number) | bower | [1.0.1](https://github.com/t2ym/i18n-number/releases/tag/1.0.1) | I18N number formatter |
| [gulp-i18n-preprocess](https://github.com/t2ym/gulp-i18n-preprocess) | npm | [1.1.0](https://github.com/t2ym/gulp-i18n-preprocess/releases/tag/1.1.0) | Build-time I18N preprocessor |
| [gulp-i18n-leverage](https://github.com/t2ym/gulp-i18n-leverage) | npm | [1.0.13](https://github.com/t2ym/gulp-i18n-leverage/releases/tag/1.0.13) | L10N JSON updater |
| [gulp-i18n-add-locales](https://github.com/t2ym/gulp-i18n-add-locales) | npm | [0.1.0](https://github.com/t2ym/gulp-i18n-add-locales/releases/tag/0.1.0) | L10N JSON placeholder generator |
| [xliff-conv](https://github.com/t2ym/xliff-conv) | npm/bower | [1.0.1](https://github.com/t2ym/xliff-conv/releases/tag/1.0.1) | XLIFF/JSON converter |

##### Highlights

  * [Shown above](#stable-release-110)

#### Stable Release 1.0.0

##### Modules

| Module        | Packager | Version | Description |
|:--------------|:---------|:--------|:------------|
| [i18n-behavior](https://github.com/t2ym/i18n-behavior) | bower | [1.0.0](https://github.com/t2ym/i18n-behavior/releases/tag/1.0.0) | Run-time I18N handler |
| [i18n-format](https://github.com/t2ym/i18n-format) | bower | [1.0.0](https://github.com/t2ym/i18n-format/releases/tag/1.0.0) | I18N text formatter |
| [i18n-number](https://github.com/t2ym/i18n-number) | bower | [1.0.0](https://github.com/t2ym/i18n-number/releases/tag/1.0.0) | I18N number formatter |
| [gulp-i18n-preprocess](https://github.com/t2ym/gulp-i18n-preprocess) | npm | [1.0.0](https://github.com/t2ym/gulp-i18n-preprocess/releases/tag/1.0.0) | Build-time I18N preprocessor |
| [gulp-i18n-leverage](https://github.com/t2ym/gulp-i18n-leverage) | npm | [1.0.0](https://github.com/t2ym/gulp-i18n-leverage/releases/tag/1.0.0) | L10N JSON updater |
| [gulp-i18n-add-locales](https://github.com/t2ym/gulp-i18n-add-locales) | npm | [0.1.0](https://github.com/t2ym/gulp-i18n-add-locales/releases/tag/0.1.0) | L10N JSON placeholder generator |

##### Highlights

  * [Shown above](#stable-release-100)

##### Known Limitation

  * On Safari 7, `lang` property cannot be bound as `{{lang}}` or `{{f(lang)}}` due to the root cause of [Issue #36](https://github.com/t2ym/i18n-behavior/issues/36). The property `effectiveLang` can be safely used instead.

#### Pre-Release 0.0.1 - 0.0.60

  * Implement core features
  * Bug fixes
  * Comprehensive test suites
  * Basic demos

## Quick Tour

### Quick deployment of [`polymer-starter-kit-i18n`](https://github.com/t2ym/polymer-starter-kit-i18n)

```
    npm install -g polymer-cli
    npm install -g generator-polymer-init-i18n-starter-kit
    mkdir i18n-starter-kit
    cd i18n-starter-kit
    polymer init i18n-starter-kit
    # Add Locales
    npm run build locales -- --targets="de es fr ja zh-Hans"
    # Build
    npm run build
    # Translate XLIFF ./xliff/bundle.*.xlf
    # Build and Merge Translation
    npm run build
    # App with Run-time I18N on http://localhost:8080
    polymer serve
    # App with Build-time I18N on http://localhost:8080
    polymer serve build/bundled
```

### Change language

##### 1. Press F12 to open debugger console on the browser

##### 2. Navigate to the elements or DOM tab in the debugger

##### 3. Change `lang` attribute of `html` element from "en" to other locales such as "ja"

```html
    <html lang="ja">
```

### Update UI strings

##### 1. Change any UI strings in the following HTMLs

```
    polymer-starter-kit-i18n/src/*.html
```

##### 2. Merge changes into JSON files

```
    cd polymer-starter-kit-i18n
    npm run build
```

##### 3. Check diffs

```
    git diff
```

## Testing

### Test Suites

| Test Suites (`*-test.html`) | Description                 |
|:----------------------------|:----------------------------|
| basic                       | Basic functionalities       |
| edge-case                   | Edge cases                  |
| multiple-case               | Multiple element cases      |
| template-default-lang       | `templateDefaultLang` tests |
| preference                  | `i18n-preference` tests     |
| no-persist                  | `i18n-preference` tests     |

### Test on Build Phases

| Build Phases      | UI Strings | L10N JSON            | HTML                    | JavaScript                   |
|:------------------|:-----------|:---------------------|:------------------------|:-----------------------------|
| src(-lite)        | Hard-coded | Modular              | Modular                 | HTML Embedded                |
| preprocess(-lite) | Extracted  | Modular              | Modular                 | HTML Embedded                |
| vulcanize(-lite)  | Extracted  | Bundled              | Vulcanized              | HTML Embedded and Vulcanized |
| minify(-lite)     | Extracted  | Bundled and Minified | Vulcanized and Minified | Concatenated and Obfuscated  |

### Notes on Test Suites
  
- lite means polyfilled by `webcomponents-lite.min.js`
- Both Shady DOM and Shadow DOM are tested on Chrome browser.

### Online Test

Available at https://t2ym.github.io/i18n-behavior/components/i18n-behavior/test/

### Rebuild Test Suites

Rebuild [preprocessed](https://github.com/t2ym/gulp-i18n-preprocess), [vulcanized](https://github.com/Polymer/vulcanize), and minified test suites by the following commmand.

```sh
    gulp pretest
```

### Local/Remote Browsers Test

These `test:*` tasks perform the `pretest` task as a dependency.

```sh
    gulp test:local  # local browsers; Chrome and Firefox are preset in wct.conf.json
    gulp test:remote # remote browsers on Sauce Labs; Edge, IE10/11, Safari 7/8/9 are preset in wct.conf.json
```

## Contributing

- Issue Reports, Feature Requests, and Pull Requests

## License

[BSD-2-Clause](https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md)
