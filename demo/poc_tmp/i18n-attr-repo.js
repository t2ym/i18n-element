/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { DomModule } from '@polymer/polymer/lib/elements/dom-module.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="i18n-attr-repo">
    <template id="standard">
      <!-- Standard HTML5 -->
      <input placeholder="" value="type=button|submit">
      <any-elements title="" aria-label="\$" aria-valuetext="\$"></any-elements>

      <!-- Standard Polymer Elements -->
      <paper-input label="" error-message="" placeholder=""></paper-input>
      <paper-textarea label="" error-message="" placeholder=""></paper-textarea>
      <paper-dropdown-menu label=""></paper-dropdown-menu>
      <paper-toast text=""></paper-toast>
      <paper-badge label=""></paper-badge>
      <google-chart options="" cols="" rows="" data=""></google-chart>
      <google-signin label-signin="" label-signout="" label-additional=""></google-signin>
      <platinum-push-messaging title="" message=""></platinum-push-messaging>

      <!-- Specific to i18n-behavior -->
      <json-data any-attributes=""></json-data>
    </template>
</template>`;

// shared data
var sharedData = {};

// imperative synchronous registration of the template for Polymer 2.x
var template = $_documentContainer.content.querySelector('template#i18n-attr-repo');
var domModule = document.createElement('dom-module');
domModule.appendChild(template);
domModule.register('i18n-attr-repo');
window.BehaviorsStore = window.BehaviorsStore || {};
// Polymer function for iron-component-page documentation
var Polymer = function (proto) {
  BehaviorsStore._I18nAttrRepo = proto;
  BehaviorsStore._I18nAttrRepo._created();
  return Polymer$0(proto);
};
/*
`<i18n-attr-repo>` maintains a list of attributes targeted for UI localization.  
It judges whether a specific attribute of an element requires localization or not. 

    var attrRepository = 
      document.createElement('i18n-attr-repo');

    attrRepository.registerLocalizableAttributes(
      'custom-element',
      Polymer.DomModule.import('custom-element', 'template')
    );
    attrRepository.isLocalizableAttribute(inputElement, 'placeholder');

### Interactions with `BehaviorsStore.I18nBehavior`

The element is not meant for DOM attachment. The object is
a singleton object dedicated for `BehaviorsStore.I18nBehavior`.
`I18nBehavior` interacts with the localizable attributes repository in these 3 ways.

### 1) Construct the repository for the standard elements from its own static template at the object creation.

```
    // i18n-behavior.html
    var attrRepository = 
      document.createElement('i18n-attr-repo');
```

Pre-defined I18N-target attributes in the static template of `i18n-attr-repo`:

```
    <dom-module id="i18n-attr-repo">
      <template>
        <template id="standard">
          <input placeholder>
          <any-elements title aria-label="$" aria-valuetext="$"></any-elements>

          <paper-input label error-message placeholder></paper-input>
          <paper-textarea label error-message placeholder></paper-textarea>
          <paper-dropdown-menu label></paper-dropdown-menu>
          <paper-toast text></paper-toast>
          <google-chart options cols rows data></google-chart>
          <google-signin label-signin label-signout label-additional></google-signin>
          <platinum-push-messaging title message></platinum-push-messaging>

          <json-data any-attributes></json-data>
        </template>
      </template>
    </dom-module>
```

This static list is also referenced by [`gulp-i18n-preprocess`](https://github.com/t2ym/gulp-i18n-preprocess) filter for
build-time automatic I18N of hard-coded string attributes.

### 2) Register I18N-target attributes of custom elements from a template with id="custom" in its light DOM.

I18N-target attributes for custom elements without I18nBehavior can be registered to the respository by this method. 

Example I18N-target attributes in a static template in the light DOM of `i18n-attr-repo`:

```
    <i18n-attr-repo>
      <template id="custom">
        <shop-md-decorator error-message="$"></shop-md-decorator>
        <input value="type=submit|button">
        <my-element i18n-target-attr="attr=value,boolean-attr,!boolean-attr"></my-element>
        <my-element i18n-target-attr="attr1=value1,attr2=value2,type-name"></my-element>
        <my-element i18n-target-attr="boolean-attr="></my-element>
        <my-element i18n-target-attr="type-name2"></my-element>
      </template>
    </i18n-attr-repo>
```

This list is also referenced by [`gulp-i18n-preprocess`](https://github.com/t2ym/gulp-i18n-preprocess) filter for
build-time automatic I18N of hard-coded string attributes.

Note: Type name feature is currently ineffective and reserved for further expansion of the attribute I18N features.

### 3) Register localizable attributes of the newly registered elements from the `text-attr` attribute of the element's template.

```
    // i18n-behavior.html, scanning custom-element template
    var id = 'custom-element';
    attrRepository.registerLocalizableAttributes(
      id, 
      Polymer.DomModule.import(id, 'template')
    );
```
```
    // custom-element.html
    <dom-module id="custom-element">
      <template text-attr="localizable-attr1 localizable-attr2">
        <span>{{localizableAttr1}}</span>
        <span>{{localizableAttr2}}</span>
      </template>
      <script>
        Polymer({
          is: 'custom-element',
          behaviors: [ BehaviorsStore.I18nBehavior ],
          properties: {
            localizableAttr1: {
              type: String
            },
            localizableAttr2: {
              type: String
            }
          }
        });
      </ script>
    </dom-module>
```

`text-attr` attributes are also traversed for build-time automatic I18N of 
hard-coded UI string attributes by [`gulp-i18n-preprocess`](https://github.com/t2ym/gulp-i18n-preprocess) filter.

### 4) Judge localizability of attributes for the local DOM elements of the newly registered element.

```
    // i18n-behavior.html, scanning custom-element-user template
    var element; // target element
    var attr;
    if (attrRepository.isLocalizableAttribute(element, attr.name)) {
      // make localizalbe-attr1 localizable
    }
```
```
    // custom-element-user.html
    <dom-module id="custom-element-user">
      <template>
        <custom-element id="custom"
                        localizable-attr1="UI Text Label 1"
                        localizable-attr2="UI Text Label 2">
        </custom-element>
      </template>
      <script>
        Polymer({
          is: 'custom-element-user',
          behaviors: [ BehaviorsStore.I18nBehavior ]
        });
      </ script>
    </dom-module>
```
```
    // template for custom-element-user after localization binding
    <template>
      <custom-element id="custom"
                      localizable-attr1="{{model.custom.localizable-attr1}}"
                      localizable-attr2="{{model.custom.localizable-attr2}}">
      </custom-element>
    </template>
```
```
    // extracted localizable texts in custom-element-user element
    this.model = {
      "custom": {
        "localizable-attr1": "UI Text Label 1",
        "localizable-attr2": "UI Text Label 2"
      }
    }
```

Since dependent elements should be registered prior to a custom element being registered,
the repository can always maintain the complete list of localizable attributes for registered custom elements.

- - -

### Note

The described processes above are for debug builds with runtime localization traversal of templates
by `I18nBehavior`.

For production builds, the build system can perform the same processes at build time so that 
`I18nBehavior` at clients can skip runtime traversal of templates.

- - -

### TODO

Handle and judge JSON object attributes.

@group I18nBehavior
@element i18n-attr-repo
@hero hero.svg
@demo demo/index.html
*/
Polymer({
  importMeta: import.meta,
  is: 'i18n-attr-repo',

  created: function () {
    this.data = sharedData;

    var customAttributes = this.querySelector('template#custom');
    // traverse custom attributes repository
    if (customAttributes && !this.hasAttribute('processed')) {
      this._traverseTemplateTree(customAttributes._content || customAttributes.content);
      this.setAttribute('processed', '');
    }

    this._created();
  },

  _created: function () {
    this.data = sharedData;

    if (this.data.__ready__) {
      return; // traverse standard attributes only once
    }
    this.data.__ready__ = true;
    var standardTemplate;
    if (!this.$) {
      var t = DomModule.import(this.is, 'template');
      standardTemplate = (t._content || t.content).querySelector('template#standard');
    }
    else {
      standardTemplate = this.$.standard;
    }
    this._traverseTemplateTree(standardTemplate._content || standardTemplate.content);
  },

  /**
   * Judge if a specific attribute of an element requires localization.
   *
   * @param {HTMLElement} element Target element.
   * @param {string} attr Target attribute name.
   * @return {string or boolean} true - property, '$' - attribute, false - not targeted, 'type-name' - type name
   */
  isLocalizableAttribute: function (element, attr) {
    var tagName = element.tagName.toLowerCase();
    if (!this.data) {
      this._created();
      this.data = sharedData;
    }
    attr = attr.replace(/\$$/, '');
    if (this.data['any-elements'] &&
        this.data['any-elements'][attr]) {
      return this.data['any-elements'][attr];
    }
    else if (this.data[tagName]) {
      return this.data[tagName]['any-attributes'] ||
             this._getType(element, this.data[tagName][attr]);
    }
    else {
      return false;
    }
  },

  /**
   * Get the type name or '$' for a specific attribute of an element from the attributes repository
   *
   * @param {HTMLElement} element Target element.
   * @param {object} value this.data[tagName][attr]
   * @return {string or boolean} true - property, '$' - attribute, false - not targeted, 'type-name' - type name
   */
  _getType: function (element, value) {
    var selector;
    var result;
    if (typeof value === 'object') {
      for (selector in value) {
        if (selector) {
          if (this._matchAttribute(element, selector)) {
            result = this._getType(element, value[selector]);
            if (result) {
              return result;
            }
          }
        }
      }
      if (value['']) {
        if (this._matchAttribute(element, '')) {
          result = this._getType(element, value['']);
          if (result) {
            return result;
          }
        }
      }
      return false;
    }
    else {
      return value;
    }
  },

  /**
   * Get the type name or '$' for a specific attribute of an element from the attributes repository
   *
   * Format for selectors:
   *  - `attr=value` - Value of `attr` matches Regex `^value$`
   *  - `!boolean-attr` - Boolean attribute does not exist
   *  - `boolean-attr` - Boolean attribute exists with empty value
   *  - empty string `''` - Always matches
   *
   * @param {HTMLElement} element Target element.
   * @param {string} selector Matching condition for target attribute.
   * @return {boolean} true - matching, false - not matching
   */
  _matchAttribute: function (element, selector) {
    var value;
    var match;
    // default ''
    if (selector === '') {
      return true;
    }
    // attr=value Regex ^value$
    match = selector.match(/^([^!=]*)=(.*)$/);
    if (match) {
      if (element.hasAttribute(match[1])) {
        value = element.getAttribute(match[1]);
        return !!value.match(new RegExp('^' + match[2] + '$'));
      }
      else {
        return false;
      }
    }
    // !boolean-attr
    match = selector.match(/^!([^!=]*)$/);
    if (match) {
      return !element.hasAttribute(match[1]);
    }
    // boolean-attr or empty-attr
    match = selector.match(/^([^!=]*)$/);
    if (match) {
      if (element.hasAttribute(match[1])) {
        value = element.getAttribute(match[1]);
        return !value;
      }
      else {
        return false;
      }
    }
    // no matching
    return false;
  },

  /**
   * Comparator for attribute selectors
   *
   * @param {string} s1 selector 1
   * @param {string} s2 selector 2
   * @return {number} comparison result as -1, 0, or 1
   */
  _compareSelectors: function (s1, s2) {
    var name1 = s1.replace(/^!/, '').replace(/=.*$/, '').toLowerCase();
    var name2 = s2.replace(/^!/, '').replace(/=.*$/, '').toLowerCase();
    return name1.localeCompare(name2);
  },

  /**
   * Add a new localizable attribute of an element to the repository.
   *
   * Format for selector values for defining I18N-target attributes:
   *   - `attr1=value1,attr2=value2,boolean-attr,!boolean-attr` - Attribute value matching condition for property
   *   - `attr1=value1,attr2=value2,$` - Attribute value matching condition for attribute
   *   - `boolean-attr=` - Boolean attribute condition
   *   - `attr1=value1,type` - Attribute value condition with type name (type is currently ineffective)
   *
   * @param {string} element Target element name.
   * @param {string} attr Target attribute name.
   * @param {?*} value Selector value
   */
  setLocalizableAttribute: function (element, attr, value) {
    this.data[element] = this.data[element] || {};
    var cursor = this.data[element];
    var prev = attr;
    var type = true;
    var selectors = [];

    if (typeof value === 'string' && value) {
      selectors = value.split(',');
      if (selectors[selectors.length - 1].match(/^[^!=][^=]*$/)) {
        type = selectors.pop();
      }
      selectors = selectors.map(function (selector) {
        return selector.replace(/=$/, '');
      });
      selectors.sort(this._compareSelectors);
      while (selectors[0] === '') {
        selectors.shift();
      }
    }

    selectors.forEach(function (selector, index) {
      if (typeof cursor[prev] !== 'object') {
        cursor[prev] = cursor[prev] ? { '': cursor[prev] } : {};
      }
      cursor[prev][selector] = cursor[prev][selector] || {};
      cursor = cursor[prev];
      prev = selector;
    });

    if (typeof cursor[prev] === 'object' &&
        cursor[prev] &&
        Object.keys(cursor[prev]).length) {
      cursor = cursor[prev];
      prev = '';
    }
    cursor[prev] = type;
  },

  /**
   * Pick up localizable attributes description for a custom element 
   * from `text-attr` attribute and register them to the repository.
   * The `text-attr` attribute is used in the template of a custom
   * element to declare localizable attributes of its own element.
   *
   * Format:
   *
   *  Type 1: `<template text-attr="localizable-attr1 attr2">`
   *
   *  Type 2: `<template text-attr localizable-attr1 attr2="value2">`
   *
   * @param {string} element Target element name.
   * @param {HTMLTemplateElement} template Template of the element.
   */
  registerLocalizableAttributes: function (element, template) {
    if (!this.data) {
      this._created();
      this.data = sharedData;
    }
    if (!element) {
      element = template.getAttribute('id');
    }
    if (element) {
      var attrs = (template.getAttribute('text-attr') || '').split(' ');
      var textAttr = false;
      attrs.forEach(function (attr) {
        if (attr) {
          this.setLocalizableAttribute(element, attr, true);
        }
      }, this);
      Array.prototype.forEach.call(template.attributes, function (attr) {
        switch (attr.name) {
        case 'id':
        case 'lang':
        case 'localizable-text':
        case 'assetpath':
          break;
        case 'text-attr':
          textAttr = true;
          break;
        default:
          if (textAttr) {
            this.setLocalizableAttribute(element, attr.name, attr.value);
          }
          break;
        }
      }.bind(this));
    }
  },

  /**
   * Traverse the template of `i18n-attr-repo` in the ready() callback
   * and construct the localizable attributes repository object. The method calls itself
   * recursively for traversal.
   *
   * @param {HTMLElement} node The target HTML node for traversing.
   */
  _traverseTemplateTree: function (node) {
    var name;
    if (node.nodeType === node.ELEMENT_NODE) {
      name = node.nodeName.toLowerCase();
      Array.prototype.forEach.call(node.attributes, function (attribute) {
        this.data[name] = this.data[name] || {};
        this.setLocalizableAttribute(name, attribute.name, attribute.value);
      }, this);
    }
    if (node.childNodes.length > 0) {
      for (var i = 0; i < node.childNodes.length; i++) {
        this._traverseTemplateTree(node.childNodes[i]);
      }
    }
  }
});
