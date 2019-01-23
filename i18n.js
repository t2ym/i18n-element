/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

import {html as litHtml, render, svg} from 'lit-html/lit-html.js';
import 'i18n-behavior/i18n-behavior.js';

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
if (!Object.getOwnPropertyDescriptor(SVGElement.prototype, 'children')) {
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
    else {
      result.push(method);
    }
  }
  return result;
})(BehaviorsStore._I18nBehavior, [
  // TODO: There should be more unnecessary methods to exclude
  'properties', 'listeners', 'bedoreRegister', 'registered', 'created', 'ready', 'attached', 'detached', '_onDomChange', '_updateEffectiveLang'
]);
//console.log('methods', JSON.stringify(methods, null, 2));

const MinimalLegacyElementMixin = {
  fire: customElements.get('i18n-format').prototype.fire // from Polymer legacy element
};
const legacyMethods = Object.keys(MinimalLegacyElementMixin);

const Mixin = Object.assign({}, MinimalLegacyElementMixin, BehaviorsStore._I18nBehavior);

const methods = legacyMethods.concat(i18nMethods);

// Note: The bound (pseudo-)element-name in ${bind()} is used as the key to the cached strings and parts
const templateCache = new Map();

const boundElements = new Map();

// Minimal PoC I18N mixin for lit-html
export const i18n = (base) => class I18nBaseElement extends mixinMethods(Mixin, methods, base) {

  static get is() {
    return UncamelCase(this.name || /* name is undefined in IE11 */ this.toString().replace(/^function ([^ \(]*)((.*|[\n]*)*)$/, '$1'));
  }

  static get observedAttributes() {
    let attributes = new Set(super.observedAttributes);
    ['lang'].forEach(attr => attributes.add(attr));
    return [...attributes];
  }

  static get isI18n() {
    return true;
  }

  constructor() {
    super();
    this.is = this.constructor.is;
    this.importMeta = this.constructor.importMeta;
    this.templateDefaultLang = 'en';
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
    if (isEdge || isIE11) {
      this._polyfillAttributeChangedCallback();
    }
    this._startMutationObserver();
  }

  resolveUrl(url, base = this.constructor.importMeta.url) {
    return new URL(url, base).href;
  }

  notifyPath() {
    // TODO: Any actions required?
    // this.invalidate(); // ??
  }

  _updateEffectiveLang(event) {
    this.effectiveLang = this.lang = this.lang || this.templateDefaultLang || BehaviorsStore.I18nControllerBehavior.properties.defaultLang.value || 'en';
  }

  get text() {
    return this._getBundle(this.lang);
  }

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
      return boundElement._getBundle(this.lang);
    }
  }

  _setText(name, bundle, templateLang) {
    BehaviorsStore.I18nControllerBehavior.properties.masterBundles.value[''][name] = bundle;
    if (templateLang) {
      BehaviorsStore.I18nControllerBehavior.properties.masterBundles.value[templateLang] =
        BehaviorsStore.I18nControllerBehavior.properties.masterBundles.value[templateLang] || {};
      BehaviorsStore.I18nControllerBehavior.properties.masterBundles.value[templateLang][name] = bundle;
    }
  }

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

  _startMutationObserver() {
    this._htmlLangObserver = this._htmlLangObserver || 
      new MutationObserver(this._handleHtmlLangChange.bind(this));
    this._htmlLangObserver.observe(this._html = BehaviorsStore.I18nControllerBehavior.properties.html.value, { attributes: true });
    if (this.lang !== this._html.lang && this._html.lang) {
      setTimeout(() => this.lang = this._html.lang, 0);
    }
  }

  _handleHtmlLangChange(mutations) {
    mutations.forEach(function(mutation) {
      switch (mutation.type) {
      case 'attributes':
        if (mutation.attributeName === 'lang') {
          this.lang = this._html.lang;
        }
        break;
      default:
        break;
      }
    }, this);
  }

  _polyfillAttributeChangedCallback() {
    this._selfObserver = this._selfObserver || 
      new MutationObserver(this._handleSelfAttributeChange.bind(this));
    this._selfObserver.observe(this, { attributes: true, attributeOldValue: true, attributeFilter: this.constructor.observedAttributes });
  }

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

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'lang') {
      // super.attributeChangedCallbck() is not called
      if (this.is !== 'observer-element' && oldValue !== newValue) {
        if (BehaviorsStore.I18nControllerBehavior.properties.masterBundles.value[''][this.constructor.is]) {
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
 * @param strings Array of strings in the template literal. [0] must be '' if I18N is required
 * @param parts Array of parts in the tempalte literal. [0] must be an instance of ElementBinding or NameBinding if I18N is required
 * @return TemplateResult generated by lit-html
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
    BehaviorsStore._I18nBehavior._constructDefaultBundle(template, name);
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

class ObserverElement extends i18n(HTMLElement) {
  static get importMeta() {
    return import.meta;
  }
}
customElements.define(ObserverElement.is, ObserverElement);
export const observer = document.createElement(ObserverElement.is);

class BindingBase {
  toString() {
    return '';
  }
}
class ElementBinding extends BindingBase {
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
class NameBinding extends BindingBase {
  constructor(name, meta) {
    super();
    this.name = name || null;
    this.meta = meta || null;
    this.element = observer.getBoundElement(name, meta);
  }
}
class ElementNameBinding extends BindingBase {
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
 * @param target (Tag name of) target element instance
 * @param meta import.meta for the module. Optional if target is an element. Mandatory if target is a name
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
    if (!BehaviorsStore.I18nControllerBehavior.properties.masterBundles.value[''][binding.name]) {
      let templateLang = binding.element.templateDefaultLang || BehaviorsStore.I18nControllerBehavior.properties.defaultLang.value || 'en';
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
