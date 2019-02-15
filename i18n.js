/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

import {html as litHtml, render, svg} from 'lit-html/lit-html.js';
import { _I18nBehavior, I18nControllerBehavior } from 'i18n-behavior/i18n-behavior.js';

// Polyfill IE 11
if (!Object.getOwnPropertyDescriptor(DocumentFragment.prototype, 'children')) {
  Object.defineProperty(DocumentFragment.prototype, 'children', {
    enumerable: true,
    configurable: true,
    get: function () {
      var childNodes = this.childNodes;
      var children = Array.prototype.filter.call(childNodes, function (node) { return node.nodeType === node.ELEMENT_NODE; });
      return children;
    }
  });
}
if (!Object.getOwnPropertyDescriptor(Element.prototype, 'children')) {
  Object.defineProperty(SVGElement.prototype, 'children', {
    enumerable: true,
    configurable: true,
    get: function () {
      var childNodes = this.childNodes;
      var children = Array.prototype.filter.call(childNodes, function (node) { return node.nodeType === node.ELEMENT_NODE; });
      return children;
    }
  });
}

const isEdge = navigator.userAgent.indexOf(' Edge/') >= 0;
const isIE11 = !(function F(){}).name;
const isSafari9 = navigator.userAgent.match(/ Version[/]9[.][0-9]*[.][0-9]* Safari[/]/);
const isAttributeChangedPolyfillRequired = isEdge || isIE11 || isSafari9;

const nameCache = new Map(); // for UncamelCase()
const UncamelCase = function UncamelCase (name) {
  let tagName = nameCache.get(name);
  if (!tagName) {
    tagName = name
      // insert a hyphen between lower & upper
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      // space before last upper in a sequence followed by lower
      .replace(/\b([A-Z]+)([A-Z])([a-z0-9])/, '$1 $2$3')
      // replace spaces with hyphens
      .replace(/ /g, '-')
      // lowercase
      .toLowerCase();
    nameCache.set(name, tagName);
  }
  return tagName;
}

const mixinMethods = (mixin, methods, base) => {
  class MixinClass extends base {
  }
  methods.forEach((method) => {
    Object.defineProperty(MixinClass.prototype, method, Object.getOwnPropertyDescriptor(mixin, method));
  });
  return MixinClass;
}

const i18nMethods = ((mixin, excludes) => {
  let result = [];
  for (let method in mixin) {
    if (excludes.indexOf(method) >= 0) {
      continue;
    }
    else /* if (excludes.indexOf('!' + method) >= 0) */ {
      result.push(method);
      continue;
    }
    /* istanbul ignore next: proper _I18nBehavior should always be handed as mixin */
    throw new Error(`i18nMethods: Unexpected method ${method} in mixin ${JSON.stringify(Object.getOwnPropertyNames(mixin))}`);
  }
  return result;
})(_I18nBehavior, [
  // delarative Polymer properties
  'hostAttributes',
  'properties',
  'listeners',
  // Polymer lifecycle callbacks
  'bedoreRegister',
  'registered',
  'created',
  'ready',
  'attached',
  'detached',
  // i18n-dom-bind callback
  '_onDomChange',
  // overridden methods
  '_updateEffectiveLang',
  '_handleHtmlLangChange',
  // superseded by attributeChangedCallback
  '_handleLangAttributeChange',
  // MutationObserver for <html lang> is NOT disconnected even if this.observeHtmlLang is false
  '_observeHtmlLangChanged',

  // mixin methods (not excluded)
  // text object getter
  '!_getBundle',
  // fallback language analyzer
  '!_enumerateFallbackLanguages',
  // locale resources fetcher
  '!_langChanged',
  '!_fetchLanguage',
  '!_fetchBundle',
  // XHR handlers
  '!_handleResponse',
  '!_handleError',
  // collaborative 'lang-updated' event handling among instances of the same custom element
  '!_forwardLangEvent',
  // collaborative 'bundle-fetched' event handling among all instances waiting for bundle.*.json being fetched
  '!_handleBundleFetched',
  // locale resources JSON constructor with fallback capability
  '!_constructBundle',
  // internal utility method for locale resources JSON
  '!_deepMap',
  // template preprocessor methods
  '!_constructDefaultBundle',
  '!_traverseAttributes',
  '!_traverseTemplateTree',
  '!_isCompoundAnnotatedText',
  '!_hasAnnotatedText',
  '!_compoundAnnotationToSpan',
  '!_setBundleValue',
  '!_generateMessageId',
  // utility methods for templates
  '!or',
  '!tr',
  '!i18nFormat',
]);
//console.log('methods', JSON.stringify(methods, null, 2));

// Note: The bound (pseudo-)element-name in ${bind()} is used as the key to the cached strings and parts
const templateCache = new Map();

const boundElements = new Map();

/**
 * I18N mixin for lit-html
 *
 * Properties:
 *  static get importMeta() { return import.meta; } // Extended class must have this property
 *  text - {Object} the current locale resources object; read-only
 *  is - {string} default value: this.constructor.is; Element name
 *  templateDefaultLang - {string} default value: 'en'; locale for the template
 *  effectiveLang - {string} set as this.lang value when locale resources are updated
 *  observeHtmlLang - {boolean} default value: true; set to false in constructor if html.lang changes must not be reflected to the element
 *  _fetchStatus - {Object} internally used object to store status of fetching locale resources; the object is shared among all the instances of a custom element
 *
 * @polymer
 * @mixinFunction
 * @param {HTMLElement} base Base class to support I18N
 * @summary I18N mixin for lit-html
 */
export const i18n = (base) => class I18nBaseElement extends mixinMethods(_I18nBehavior, i18nMethods, base) {

  /**
   * Fired when its locale resources are updated
   *
   * @event lang-updated
   * @param {lang} this.lang
   * @param {lastLang} Last this.lang value
   */

  /**
   * is property by generating the custom element name from its own class name by un-camel-casing
   * @type {!string} element name
   */
  static get is() {
    return UncamelCase(this.name || /* name is undefined in IE11 */ this.toString().replace(/^function ([^ \(]*)((.*|[\n]*)*)$/, '$1'));
  }

  /**
   * observedAttributes property for custom elements v1 API, adding lang property to that of the super class
   * @type {Array} list of observed attributes
   */
  static get observedAttributes() {
    let attributes = new Set(super.observedAttributes);
    ['lang'].forEach(attr => attributes.add(attr));
    return [...attributes];
  }

  /**
   * isI18n property to return true if this mixin is provided
   * @type {boolean} true to show that this mixin is provided
   */
  static get isI18n() {
    return true;
  }

  /**
   * constructor
   */
  constructor() {
    super();
    this.is = this.constructor.is;
    this.importMeta = this.constructor.importMeta;
    this.templateDefaultLang = 'en';
    this.observeHtmlLang = true;
    if (!this.__proto__._fetchStatus) {
      this.__proto__._fetchStatus = { // per custom element
        fetchingInstance: null,
        ajax: null,
        ajaxLang: null,
        lastLang: null,
        fallbackLanguageList: null,
        targetLang: null,
        lastResponse: {},
        rawResponses: {}
      };
    }
    this.addEventListener('lang-updated', this._updateEffectiveLang.bind(this));
    if (isAttributeChangedPolyfillRequired) {
      this._polyfillAttributeChangedCallback();
    }
    this._startMutationObserver();
  }

  /**
   * Resolves URL relative to the base URL of the element class, emulating resolveUrl() in Polymer library
   * @param {string} url URL to resolve
   * @param {string} base Base URL for resolution; default value: this.constructor.importMeta.url
   * @return {string} resolved URL
   */
  resolveUrl(url, base = this.constructor.importMeta.url) {
    return new URL(url, base).href;
  }

  /**
   * Callback to notify updates on the locale resources; Does nothing as a dummy function for notifyPath() in Polymer library
   * Optionally overrides this method to catch the updates of the locale resources since it is called just before each 'lang-updated' event is dispatched
   * @param {string} path 'text'; this.text is updated
   * @param {Object} value this.text object
   */
  notifyPath(path, value) {
    // this.invalidate()
  }

  /**
   * Emulates fire() of Polymer library
   * @param {string} type Event type
   * @param {Object} detail Event.detail object
   * @param {Object} options Event options
   */
  fire(type, detail = {}, options = {}) {
    const { bubbles = true, cancelable = false, composed = true, node = this } = options;
    const event = new Event(type, { bubbles, cancelable, composed });
    event.detail = detail === null ? {} : detail;
    node.dispatchEvent(event);
    return event;
  }

  /**
   * Updates this.effectiveLang
   * Event listener of 'lang-updated' event
   * @param {Event} event 'lang-updated' event
   */
  _updateEffectiveLang(event) {
    this.effectiveLang = this.lang = this.lang || this.templateDefaultLang || I18nControllerBehavior.properties.defaultLang.value || 'en';
  }

  /**
   * Read-only locale resources object of this element
   * Note: The object can be for the fallback value before the locale resourced are loaded from JSON
   * @type {Object} Locale resources object of the current locale
   */
  get text() {
    return this._getBundle(this.lang);
  }

  /**
   * Gets the locale resources of the specified element name
   * @param {string} name (Pseudo-)Custom element name
   * @param {Object} meta import.meta object of the target element
   * @return {Object} Locale resources of the target element
   */
  getText(name, meta) {
    this._preprocessed = true;
    if (name === this.is) {
      return this._getBundle(this.lang);
    }
    else {
      // bound element
      let boundElement = this.getBoundElement(name, meta);
      if (boundElement.lang !== this.lang) {
        boundElement.lang = this.lang;
      }
      if (boundElement.templateDefaultLang !== this.templateDefaultLang) {
        boundElement.templateDefaultLang = this.templateDefaultLang;
      }
      return boundElement._getBundle(this.lang);
    }
  }

  /**
   * Internally sets the default locale resources for the specified (pseudo-)element name
   * @param {string} name (Pseudo-)element name
   * @param {Object} bundle Locale resources object
   * @param {string} templateLang Locale of the locale resources object
   */
  _setText(name, bundle, templateLang) {
    I18nControllerBehavior.properties.masterBundles.value[''][name] = bundle;
    if (templateLang) {
      I18nControllerBehavior.properties.masterBundles.value[templateLang] =
        I18nControllerBehavior.properties.masterBundles.value[templateLang] || {};
      I18nControllerBehavior.properties.masterBundles.value[templateLang][name] = bundle;
    }
  }

  /**
   * Obtains bound (pseudo-)element of the specified name
   * @param {string} name (Pseudo-)element name
   * @param {Object} meta import.meta object for the (pseudo-)element
   * @return {HTMLElement} Bound element
   */
  getBoundElement(name, meta) {
    let boundElement = boundElements.get(name);
    if (!boundElement) {
      class BoundElementClass extends i18n(HTMLElement) {
        static get is() {
          return name;
        }
        static get importMeta() {
          return meta;
        }
        constructor() {
          super();
          this.importMeta = meta;
          Object.defineProperty(this.constructor.prototype, '_fetchStatus', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: { // per bound element
              fetchingInstance: null,
              ajax: null,
              ajaxLang: null,
              lastLang: null,
              fallbackLanguageList: null,
              targetLang: null,
              lastResponse: {},
              rawResponses: {}
            }
          });
        }
      }
      customElements.define('html-binding-namespace-' + name, BoundElementClass);
      boundElement = document.createElement('html-binding-namespace-' + name);
      boundElements.set(name, boundElement);
    }
    return boundElement;    
  }

  /**
   * Internally starts mutation observer for lang property of html tag of the document at constructor
   */
  _startMutationObserver() {
    this._htmlLangObserver = this._htmlLangObserver || 
      new MutationObserver(this._handleHtmlLangChange.bind(this));
    this._htmlLangObserver.observe(this._html = I18nControllerBehavior.properties.html.value, { attributes: true });
    if (this.observeHtmlLang && this.lang !== this._html.lang && this._html.lang) {
      let htmlLang = this._html.lang;
      let originalLang = this.lang;
      setTimeout(() => {
        this._updateEffectiveLang();
        if (this.observeHtmlLang && (this.lang === originalLang || (this.lang === this.templateDefaultLang && originalLang === ''))) {
          this.lang = htmlLang;
        }
      }, 0);
    }
    else {
      setTimeout(() => {
        if (!this.lang) {
          this._updateEffectiveLang();
        }
      }, 0);
    }
  }

  /**
   * Handle mutations of lang property of html tag via MutationObserver
   * @param {Array} mutations Array of mutations
   */
  _handleHtmlLangChange(mutations) {
    mutations.forEach(function(mutation) {
      switch (mutation.type) {
      case 'attributes':
        if (this.observeHtmlLang && mutation.attributeName === 'lang') {
          this.lang = this._html.lang;
        }
        break;
      default:
        break;
      }
    }, this);
  }

  /**
   * Setup polyfill for attributeChangedCallback() of custom elements v1 for unsupported browsers
   */
  _polyfillAttributeChangedCallback() {
    this._selfObserver = this._selfObserver || 
      new MutationObserver(this._handleSelfAttributeChange.bind(this));
    this._selfObserver.observe(this, { attributes: true, attributeOldValue: true, attributeFilter: this.constructor.observedAttributes });
  }

  /**
   * Polyfills calls to attributeChangedCallback()
   * @param {Array} mutations Array of mutations of observedAttributes
   */
  _handleSelfAttributeChange(mutations) {
    mutations.forEach(function(mutation) {
      switch (mutation.type) {
      case 'attributes':
        this.attributeChangedCallback(mutation.attributeName, mutation.oldValue, this.getAttribute(mutation.attributeName));
        break;
      default:
        break;
      }
    }, this);
  }

  /**
   * attributeChangedCallback of custom elements v1 to catch lang attribute changes
   * It calls super.attributeChangedCallback() for attriutes other than lang
   * @param {string} name Name of attribute
   * @param {string} oldValue Old value of the attribute
   * @param {string} newValue New value of the attribute
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'lang') {
      // super.attributeChangedCallbck() is not called
      if (oldValue !== newValue) {
        if (I18nControllerBehavior.properties.masterBundles.value[''][this.constructor.is]) {
          this._langChanged(newValue, oldValue);
        }
        else {
          this._tasks = this._tasks || [];
          this._tasks.push(['_langChanged', [newValue, oldValue]]);
        }
      }
    }
    else {
      if (typeof super.attributeChangedCallback === 'function') {
        super.attributeChangedCallback(name, oldValue, newValue);
      }
    }
  }

  /**
   * Internally processes queued tasks in this._tasks, which contains _langChanged calls to self, queued at attributeChangedCallback
   */
  _processTasks() {
    if (this._tasks) {
      let task;
      while (task = this._tasks.shift()) {
        this[task[0]].apply(this, task[1]);
      }
    }
  }
}

/**
 * Preprocess a template literal and hand it to lit-html
 * Each template literal must have its unique (pseudo-)element name to identify itself
 * The preprocessed template for each template is cached with the (pseudo-)element name as its key
 *
 * Example:
 *
 * ```js
 *   return html`${bind(this)}...`;
 * ```
 *
 * Example:
 *
 * ```js
 * const meta = import.meta;
 * function getMessage() {
 *   const name = 'get-message';
 *   return html`${bind(name,meta)}...`;
 * }
 * ```
 *
 * @param {Array<string>} strings Array of strings in the template literal. [0] must be '' if I18N is required
 * @param {Array<any>} parts Array of parts in the tempalte literal. [0] must be an instance of ElementBinding or NameBinding if I18N is required
 * @return {TemplateResult} generated by lit-html
 */
export const html = (strings, ...parts) => {
  let name, meta, element;
  let preprocessedStrings = [];
  let preprocessedParts = [];
  let preprocessedPartsGenerator;
  if (strings.length !== parts.length + 1) {
    throw new Error(`html: strings.length (= ${strings.length}) !== parts.length (= ${parts.length}) + 1`);
  }
  let offset = 0;
  if (strings.length > 0 && strings[0] === '' && parts[0] instanceof BindingBase) {
    name = parts[0].name;
    meta = parts[0].meta;
    element = parts[0].element;
    offset++;
  }
  else if (strings.length > 0 && strings[0] === '<!-- localizable -->' && parts[0] instanceof BindingBase) {
    //name = parts[0].name;
    //meta = parts[0].meta;
    //element = parts[0].element;
    //console.log('html: rendering preprocessed HTML template for ' + parts[0].name);
    strings.shift();
    parts.shift();
    return litHtml(strings, ...parts); // preprocessed HTML template
  }
  else {
    return litHtml(strings, ...parts); // no I18N
  }
  let cachedTemplate = templateCache.get(name);
  if (cachedTemplate) {
    preprocessedStrings = cachedTemplate.preprocessedStrings;
    preprocessedPartsGenerator = cachedTemplate.preprocessedPartsGenerator;
  }
  else {
    let originalHtml = '';
    let preprocessedHtml;
    let preprocessedPartsExpressions = [];
    let i;
    for (i = 0; i + offset < parts.length; i++) {
      let string = strings[i + offset];
      let match = string.match(/([.?@])[^ =]*=$/);
      if (match) {
        switch (match[1]) {
        case '.':
          originalHtml += string.replace(/[.]([^ =]*)=$/, '$1=');
          originalHtml += `{{parts.${i}:property}}`;
          break;
        case '?':
          originalHtml += string.replace(/[?]([^ =]*)=$/, '$1=');
          originalHtml += `{{parts.${i}:boolean}}`;
          break;
        case '@':
          originalHtml += string.replace(/[@]([^ =]*)=$/, '$1=');
          originalHtml += `{{parts.${i}:event}}`;
          break;
        default:
          // Unreachable code
          originalHtml += string;
          originalHtml += `{{parts.${i}}}`;
          break;
        }
      }
      else {
        originalHtml += string;
        originalHtml += `{{parts.${i}}}`;
      }
    }
    originalHtml += strings[i + offset];
    //console.log('original html: ', originalHtml);
    let template = document.createElement('template');
    let _originalHtml = originalHtml;
    if (isEdge) {
      // Note for Edge: transform attributes are temporarily substituted for x-transform-x since Edge unexpectedly modifies transform attributes in SVG
      while (originalHtml.indexOf('transform=') >= 0) {
        originalHtml = originalHtml.replace('transform=', 'x-transform-x=');
      }
    }
    template.innerHTML = originalHtml;
    if (element.templateDefaultLang) {
      template.setAttribute('lang', element.templateDefaultLang);
    }
    element.constructor.prototype._constructDefaultBundle(template, name);
    preprocessedHtml = template.innerHTML;
    if (isEdge) {
      // Note for Edge: Substituted transform attributes are reverted to original transform attributes since Edge unexpectedly modifies transform attributes in SVG
      while (preprocessedHtml.indexOf('x-transform-x=') >= 0) {
        preprocessedHtml = preprocessedHtml.replace('x-transform-x=', 'transform=');
      }
    }
    //console.log('preprocessed html: ', preprocessedHtml);
    element._processTasks();
    let index;
    let partIndex = 0;
    while ((index = preprocessedHtml.indexOf('{{')) >= 0) {
      let preprocessedString;
      if (index > 3 && preprocessedHtml.substring(index - 3, index) === '$="') {
        // convert Polymer template syntax
        preprocessedString = preprocessedHtml.substring(0, index - 3) + '="';
      }
      else {
        preprocessedString = preprocessedHtml.substring(0, index);
      }
      preprocessedHtml = preprocessedHtml.substring(index);
      index = preprocessedHtml.indexOf('}}');
      if (index < 0) {
        throw new Error('html: no matching }} for {{');
      }
      let part = preprocessedHtml.substring(0, index + 2);
      preprocessedHtml = preprocessedHtml.substring(index + 2);
      let partMatch = part.match(/^{{parts[.]([0-9]*)(:[a-z]*)?}}$/);
      if (partMatch && partMatch[2]) {
        switch (partMatch[2]) {
        case ':property':
          preprocessedString = preprocessedString.replace(/([^ =]*)=(["]?)$/, '.$1=$2');
          break;
        case ':boolean':
          preprocessedString = preprocessedString.replace(/([^ =]*)=(["]?)$/, '?$1=$2');
          break;
        case ':event':
          preprocessedString = preprocessedString.replace(/([^ =]*)=(["]?)$/, '@$1=$2');
          break;
        default:
          // Unreacheable code
          break;
        }
      }
      preprocessedStrings.push(preprocessedString);
      if (partMatch) {
        // Note: IE 11 does not keep the order of attributes
        preprocessedPartsExpressions.push(`parts[${parseInt(partMatch[1]) + offset}]`);
        partIndex++;
      }
      else {
        let isJSON = false;
        let isI18nFormat = false;
        part = part.substring(2, part.length - 2);
        if (part.indexOf('serialize(') === 0) {
          isJSON = true;
          part = part.substring(10, part.length - 1); // serialize(text...)
        }
        else if (part.indexOf('i18nFormat(') === 0) {
          isI18nFormat = true;
          part = part.substring(11, part.length - 1); // i18nFormat(param.0,parts.X,parts.Y,...)
        }
        let params = isI18nFormat ? part.split(/,/) : [part];
        let valueExpression;
        let valueExpressions = [];
        while (part = params.shift()) {
          let partPath = part.split(/[.]/);
          valueExpression = 'text';
          let tmpPart = partPath.shift();
          if (tmpPart === 'parts') {
            valueExpression = `parts[${parseInt(partPath[0]) + offset}]`;
          }
          else {
            if (tmpPart === 'model') {
              valueExpression = 'model';
            }
            else if (tmpPart === 'effectiveLang') {
              valueExpression = 'effectiveLang';
            }
            while (partPath.length) {
              tmpPart = partPath.shift();
              valueExpression += `['${tmpPart}']`;
            }
            if (isJSON) {
              valueExpression = `JSON.stringify(${valueExpression}, null, 2)`;
            }
          }
          valueExpressions.push(valueExpression);
        }
        if (isI18nFormat) {
          valueExpression = `element.i18nFormat(${valueExpressions.join(',')})`;
        }
        preprocessedPartsExpressions.push(valueExpression);
      }
    }
    preprocessedStrings.push(preprocessedHtml);
    preprocessedPartsGenerator = new Function('element', 'parts', 'text', 'model', 'effectiveLang', `return [${preprocessedPartsExpressions.join(',')}]`);
    //console.log('preprocessedPartsGenerator', preprocessedPartsGenerator.toString());
    templateCache.set(name, {
      preprocessedStrings: preprocessedStrings,
      preprocessedPartsGenerator: preprocessedPartsGenerator
    });
  }
  let text = element.getText(name, meta);
  preprocessedParts = preprocessedPartsGenerator(element, parts, text, text.model, element.effectiveLang || element.lang);
  //console.log('preprocessed: strings ', preprocessedStrings, 'parts ', JSON.stringify(preprocessedParts, null, 2));
  return litHtml(preprocessedStrings, ...preprocessedParts);
}

/**
 * A dummy `<observer-element>` class to call a method getBoundElement without instantiating any elements
 * @customElement
 * @polymer
 * @appliesMixin i18n
 */
class ObserverElement extends i18n(HTMLElement) {}

/**
 * Base class to bind templates to (pseudo-)elements
 */
class BindingBase {
  /*
   * Returns an empty string
   * @return {string} '' An empty string to represent a binding object
   */
  toString() {
    return '';
  }
}

/**
 * Binding to an element
 */
class ElementBinding extends BindingBase {
  /**
   * Constructs ElementBinding object
   *  Properties:
   *   this.name: element.constructor.is
   *   this.meta: element.constructor.importMeta
   *   this.element: element
   *
   * @param {HTMLElement} element 'this' element to bind
   */
  constructor(element) {
    super();
    if (element instanceof HTMLElement && element.constructor.isI18n) {
      this.name = element.constructor.is;
      this.meta = element.constructor.importMeta;
      this.element = element;
    }
    else {
      this.name = null;
      this.meta = null;
      this.element = null;
    }
  }
}

/**
 * Binding to a (pseudo-)element name
 */
class NameBinding extends BindingBase {
  /**
   * Constructs NameBinding object
   *  Properties:
   *   this.name: name
   *   this.meta: meta
   *   this.element: (pseudo-)element instance, which is generated by getBoundElement() and cached
   *
   * @param {string} name (Pseudo-)element name
   * @param {Object} meta import.meta Object of the (pseudo-)element
   */
  constructor(name, meta) {
    super();
    this.name = name || null;
    this.meta = meta || null;
    this.element = ObserverElement.prototype.getBoundElement(name, meta);
  }
}

/**
 * Binding to a (pseudo-)element with a name
 */
class ElementNameBinding extends BindingBase {
  /**
   * Constructs NameBinding object
   *  Properties:
   *   this.name: name
   *   this.meta: element.constructor.importMeta
   *   this.element: element
   *
   * @param {HTMLElement} element 'this' element to bind
   * @param {string} name (Pseudo-)element name
   */
  constructor(element, name) {
    super();
    if (element instanceof HTMLElement && element.constructor.isI18n && name) {
      this.name = name;
      this.meta = element.constructor.importMeta;
      this.element = element;
    }
    else {
      this.name = null;
      this.meta = null;
      this.element = null;
    }
  }
}

/**
 * Bind a prefixed I18N template to a specified ID or an element
 *
 * Example: Bound to this (the element is not extendable)
 *
 * ```js
 * class MyElement extends i18n(HTMLElement) {
 *   static get importMeta() { return import.meta; }
 *   render() {
 *     return html`${bind(this)}...`;
 *   } 
 * }
 * ```
 *
 * Example: Bound to a name
 *
 * ```js
 * const binding = bind('get-message', import.meta)
 * function getMessage() {
 *   return html`${binding}...`;
 * }
 * ```
 *
 * Example: Bound to this with a name (the element is extendable)
 *
 * ```js
 * class MyElement extends i18n(HTMLElement) {
 *   static get importMeta() { return import.meta; }
 *   render() {
 *     return html`${bind(this, 'my-element')}...`;
 *   }
 * }
 * class MyExtendedElement extends MyElement {
 *   static get importMeta() { return import.meta; }
 *   render() {
 *     return html`${bind(this, 'my-extended-element')}...${super.render()}`;
 *   }
 * }
 * ```
 *
 * @param {HTMLElement|string} target (Tag name of) target element instance
 * @param {Object} meta import.meta for the module. Optional if target is an element. Mandatory if target is a name
 */
export const bind = function (target, meta) {
  let partsGenerator;
  let localizableText;
  let binding;
  if (target instanceof BindingBase && typeof arguments[1] === 'function' && typeof arguments[2] === 'object') {
    // bind(('name', binding), (_bind, text, model, effectiveLang) => [], {})
    binding = target;
    partsGenerator = arguments[1];
    localizableText = arguments[2];
  }
  else if (typeof target === 'string' && typeof meta === 'object' && typeof arguments[2] === 'function' && typeof arguments[3] === 'object') {
    // bind('name', import.meta, (_bind, text, model, effectiveLang) => [], {})
    binding = new NameBinding(target, meta);
    partsGenerator = arguments[2];
    localizableText = arguments[3];
  }
  else if (target instanceof HTMLElement && target.constructor.isI18n && typeof arguments[1] === 'string' && typeof arguments[2] === 'function' && typeof arguments[3] === 'object') {
    // bind(this, 'name', (_bind, text, model, effectiveLang) => [], {})
    binding = new ElementNameBinding(target, arguments[1]);
    partsGenerator = arguments[2];
    localizableText = arguments[3];
  }
  else if (target instanceof HTMLElement && target.constructor.isI18n && typeof arguments[1] === 'function' && typeof arguments[2] === 'object') {
    // bind(this, (_bind, text, model, effectiveLang) => [], {})
    binding = new ElementBinding(target);
    partsGenerator = arguments[1];
    localizableText = arguments[2];
  }
  if (binding) {
    // Preprocessed
    if (!I18nControllerBehavior.properties.masterBundles.value[''][binding.name]) {
      let templateLang = binding.element.templateDefaultLang || I18nControllerBehavior.properties.defaultLang.value || 'en';
      binding.element._setText(binding.name, localizableText, templateLang);
    }
    let text = binding.element.getText(binding.name, binding.meta);
    if (!binding.element.effectiveLang) {
      text = localizableText; // fallback at the initial rendering
    }
    return partsGenerator(binding, text, text.model, binding.element.effectiveLang || binding.element.lang);
  }
  else {
    // Not preprocessed
    if (target instanceof HTMLElement && target.constructor.isI18n) {
      if (!meta) {
        return new ElementBinding(target); // meta is unused
      }
      else {
        return new ElementNameBinding(target, meta);
      }
    }
    if (typeof target === 'string' && meta && typeof meta === 'object') {
      return new NameBinding(target, meta);
    }
    return new BindingBase();
  }
}
