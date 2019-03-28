/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

import { html as litHtml } from 'lit-html/lit-html.js';
import { I18nControllerCoreMixin, I18nControllerBehavior, bundles } from 'i18n-behavior/i18n-controller-core.js';
import { polyfill } from 'wc-putty/polyfill.js';

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

const mixinMethods = (mixin, base) => {
  // Mixin directly into base.prototype object to omit extra prototype chaining
  Object.assign(base.prototype, mixin);
  return base;
}

const boundElements = new Map();

/* default bundles */
const defaultBundles = bundles[''];

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
 *  _i18nElementConnected - {boolean} set as true on connectedCallback and false on disconnectedCallback, undefined before connection
 *
 * Attributes:
 *  discard-on-disconnect - boolean attribute to discard the element on disconnection if exists
 *    - this removes lang-updated event listeners bound to this element for boundElement
 *    - disconnectedCallback() must call super.disconnectedCallback() and clean up resources for the element instance
 *
 * @polymer
 * @mixinFunction
 * @param {HTMLElement} base Base class to support I18N
 * @summary I18N mixin for lit-html
 */
export const i18n = (base) => mixinMethods(I18nControllerCoreMixin, class I18nBaseElement extends polyfill(base) {

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
   * static observeHtmlLang property to set the default value for this.observeHtmlLang
   *
   * Note:
   * - Override this static property to set observeHtmlLang to false
   */
  static get observeHtmlLang() {
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
    this.observeHtmlLang = Boolean(this.constructor.observeHtmlLang);
    if (!this.constructor.prototype.hasOwnProperty('_fetchStatus')) {
      Object.defineProperty(this.constructor.prototype, '_fetchStatus', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: { // per custom element
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
    if (!this.observeHtmlLang) {
      Object.defineProperty(this, '_fetchStatus', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: { // per instance if observeHtmlLang === false
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
    this._updateEffectiveLangBindThis = this._updateEffectiveLang.bind(this);
    this.addEventListener('lang-updated', this._updateEffectiveLangBindThis);
    this._startMutationObserver();
  }

  /**
   * custom elements connectedCallback()
   *
   * Tasks:
   * - Call super.connectedCallback() if exists
   * - Set this._i18nElementConnected as true
   */
  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this._i18nElementConnected = true;
  }

  /**
   * custom elements disconnectedCallback()
   *
   * Tasks:
   * - Call super.disconnectedCallback() if exists
   * - Set this._i18nElementConnected as false
   * - Remove lang-updated event listener
   * - Remove lang-updated event listeners for boundElement
   * - Stop MutationObserver
   */
  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    this._i18nElementConnected = false;
    if (this.hasAttribute('discard-on-disconnect')) {
      this.removeEventListener('lang-updated', this._updateEffectiveLangBindThis);
      this._removeBoundLangUpdatedListeners();
      this._stopMutationObserver();
    }
  }

  /**
   * Registers lang-updated event lister for boundElement to clean up on disconnection
   *
   * @param {I18nBaseElement} boundElement bound element to register
   * @param {function} listener lang-updated event listener to register
   */
  _registerBoundLangUpdatedListener(boundElement, listener) {
    if (!this._boundLangUpdatedListeners) {
      this._boundLangUpdatedListeners = new Set();
    }
    this._boundLangUpdatedListeners.add({ boundElement, listener });
  }

  /**
   * Removes lang-updated listeners for boundElement
   */
  _removeBoundLangUpdatedListeners() {
    if (this._boundLangUpdatedListeners) {
      for (let { boundElement, listener } of this._boundLangUpdatedListeners) {
        boundElement.removeEventListener('lang-updated', listener);
        let _bound = boundElements.get(boundElement.constructor.is);
        if (_bound && _bound.elements) {
          if (_bound.elements.has(this)) {
            _bound.elements.delete(this);
            //console.log(`${this.is}._removeBoundLangUpdatedListeners: removing from boundElements.get(${boundElement.constructor.is}).elements elements.size = ${_bound.elements.size}`);
          }
        }
        //console.log(`${this.is}._removeBoundLangUpdatedListeners: removing lang-updated listener`, listener, ' from ', boundElement.constructor.is);
      }
      this._boundLangUpdatedListeners = null;
    }
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
    this.effectiveLang = this.lang || this.templateDefaultLang || I18nControllerBehavior.properties.defaultLang.value || 'en';
    if (this.lang !== this.effectiveLang) {
      this.lang = this.effectiveLang;
    }
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
    defaultBundles[name] = bundle;
    if (templateLang) {
      if (!bundles.hasOwnProperty(templateLang)) {
        bundles[templateLang] = {};
      }
      bundles[templateLang][name] = bundle;
    }
  }

  /**
   * Obtains bound (pseudo-)element of the specified name
   * @param {string} name (Pseudo-)element name
   * @param {Object} meta import.meta object for the (pseudo-)element
   * @return {HTMLElement} Bound element
   */
  getBoundElement(name, meta) {
    let { boundElement, elements } = boundElements.get(name) || { boundElement: null, elements: new Map() };
    let listener;
    /*
      Data structures of boundElements
        boundElements.get(name) -> { boundElement: boundElement, elements: elements }
        if this.observeHtmlLang === true
          elements -> { this: boundElement, ... } // all values are the same boundElement object
        if this.observeHtmlLang === false
          elements -> { this: boundElementForThis, ... } // dedicated bound element for each `this`
        if this.observeHtmlLang === undefined // NameBinding
          elements -> { } // empty
    */
    if (!boundElement) {
      let elementClass = customElements.get(name);
      let observeHtmlLang = elementClass ? elementClass.observeHtmlLang : true;
      class BoundElementClass extends i18n(HTMLElement) {
        static get is() {
          return name;
        }
        static get importMeta() {
          return meta;
        }
        static get observeHtmlLang() {
          return observeHtmlLang;
        }
        constructor() {
          super();
          this.importMeta = meta;
        }
        langUpdated(event) { // not called for this
          //console.log(`${name}.langUpdated.bind(${this.is}) connected=${this._i18nElementConnected}, ${event.target.is} ${event.target.lang}: ${JSON.stringify(event.detail)}`, this);
          if (this._i18nElementConnected) {
            this.notifyPath('text', this.text);
            if (observeHtmlLang || this.lang !== event.target.lang) {
              this.fire('lang-updated', event.detail);
            }
          }
        }
      }
      customElements.define('html-binding-namespace-' + name, BoundElementClass);
      boundElement = document.createElement('html-binding-namespace-' + name);
      boundElements.set(name, { boundElement, elements });
    }
    if (this.observeHtmlLang === false) {
      boundElement = elements.get(this);
      if (!boundElement) {
        boundElement = document.createElement('html-binding-namespace-' + name);
        listener = boundElement.langUpdated.bind(this);
        boundElement.addEventListener('lang-updated', listener);
        this._registerBoundLangUpdatedListener(boundElement, listener);
        elements.set(this, boundElement);
      }
    }
    else if (this !== ObserverElement.prototype) {
      if (!elements.has(this) && (this.hasAttribute('discard-on-disconnect') ? this._i18nElementConnected : true)) {
        listener = boundElement.langUpdated.bind(this);
        boundElement.addEventListener('lang-updated', listener);
        this._registerBoundLangUpdatedListener(boundElement, listener);
        elements.set(this, boundElement);
        if (this.lang !== boundElement.lang) {
          this.lang = boundElement.lang;
        }
        //console.log(`boundElement(${boundElement.is}).addEventListener('lang-updated', boundElement.langUpdated.bind(${this.is})) connected=${this._i18nElementConnected} elements.size=${elements.size}`);
      }
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
   * Disconnects mutation observer
   */
  _stopMutationObserver() {
    if (this._htmlLangObserver) {
      this._htmlLangObserver.disconnect();
      this._htmlLangObserver = null;
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
          let lang = this._html.lang;
          if (this.lang !== lang) {
            this.lang = lang;
          }
        }
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
      // super.attributeChangedCallback() is not called
      //console.log(`${this.is}#${this.number}.attributeChangedCallback("${name}", "${oldValue}"(${typeof oldValue}), "${newValue}"(${typeof newValue}))`);
      if (oldValue !== newValue) {
        if (defaultBundles[this.constructor.is]) {
          this._langChanged(newValue, oldValue);
        }
        else {
          this._tasks = this._tasks || [];
          this._tasks.push(['_langChanged', [newValue, oldValue]]);
        }
      }
    }
    else {
      if (super.attributeChangedCallback) {
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
      this._tasks = null;
    }
  }
});

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
  let element;
  if (strings.length !== parts.length + 1) {
    throw new Error(`html: strings.length (= ${strings.length}) !== parts.length (= ${parts.length}) + 1`);
  }
  if (strings.length > 0 && strings[0] === '' && parts[0] instanceof BindingBase) {
    throw new Error('html: Fatal Error. Encountering a non-preprocessed template literal. i18n-core.js must be used only for preprocessed template literals.');
  }
  else if (strings.length > 0 && strings[0] === '<!-- localizable -->' && parts[0] instanceof BindingBase) {
    //name = parts[0].name;
    //meta = parts[0].meta;
    element = parts[0].element;
    if (element._tasks) {
      element._processTasks();
    }
    //console.log('html: rendering preprocessed HTML template for ' + parts[0].name);
    strings.shift();
    parts.shift();
    return litHtml(strings, ...parts); // preprocessed HTML template
  }
  else {
    return litHtml(strings, ...parts); // no I18N
  }
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
  if (typeof arguments[1] === 'function' && typeof arguments[2] === 'object' && target instanceof BindingBase) {
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
  else if (typeof arguments[1] === 'string' && typeof arguments[2] === 'function' && typeof arguments[3] === 'object' && target instanceof HTMLElement && target.constructor.isI18n) {
    // bind(this, 'name', (_bind, text, model, effectiveLang) => [], {})
    binding = new ElementNameBinding(target, arguments[1]);
    partsGenerator = arguments[2];
    localizableText = arguments[3];
  }
  else if (typeof arguments[1] === 'function' && typeof arguments[2] === 'object' && target instanceof HTMLElement && target.constructor.isI18n) {
    // bind(this, (_bind, text, model, effectiveLang) => [], {})
    binding = new ElementBinding(target);
    partsGenerator = arguments[1];
    localizableText = arguments[2];
  }
  if (binding) {
    // Preprocessed
    if (!defaultBundles.hasOwnProperty(binding.name)) {
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
