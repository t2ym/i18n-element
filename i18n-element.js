/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import '@polymer/polymer/polymer-legacy.js';

import { _I18nBehavior } from 'i18n-behavior/i18n-behavior.js';
import { DomModule } from '@polymer/polymer/lib/elements/dom-module.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
// Globally expose base elements and mixins
window.BaseElements = window.BaseElements || {};
window.Mixins = window.Mixins || {};

/**
 * @namespace BaseElements
 */
export const BaseElements = window.BaseElements;

/**
 * @namespace Mixins
 */
export const Mixins = window.Mixins;

/**
 * Localizable mixin
 * @summary Localizable mixin
 * @polymer
 * @mixinFunction
 * @memberof Mixins
 */
export const Localizable = function (base) {

  return class Localizable extends mixinBehaviors([_I18nBehavior], base) {
    constructor () {
      super();
    }
    get _template() {
      return this._cachedTemplate;
    }
    set _template(template) {
      if (template) {
        Localizable._renameTemplate(this.constructor);
      }
      this._cachedTemplate = template;
    }
    static _renameTemplate(target) {
      let desc = Object.getOwnPropertyDescriptor(target, 'template');
      if (desc) {
        Object.defineProperty(target, '_rawTemplate', desc);
        delete target.template;
      }
    }
    static get _rawTemplate() {
      let id = this.is;
      let name = this.name ||
        (typeof this === 'function' ?
                this.toString().replace(/^[\S\s]*?function\s*/, "").replace(/[\s\(\/][\S\s]+$/, "") :
                undefined);
      if (!id && name && name !== 'Localizable' && name != 'class' && !name.match(/^_class/)) {
        id = this.is = this._uncamelCase(name);
      }
      // TODO: template fetching should be flexible to detect super.template
      let template = DomModule.import(id, 'template');
      if (id && !template) {
        let current = null; // (!window.HTMLImports || HTMLImports.useNative) ? document.currentScript // document.currentScript is always null in ES modules
                            //                : document._currentScript || document.currentScript;
        // let _tmpNode = current; // unused variable
        let ownerDocument = /* current ? current.ownerDocument : */ document; // document.currentScript is always null in ES modules
        let baseURI = this.importMeta ? this.importMeta.url : ownerDocument.baseURI;
        /* document.currentScript is always null in ES modules
        if (current && current.ownerDocument && current.ownerDocument.nodeType === current.ownerDocument.DOCUMENT_NODE) {
          while (_tmpNode && _tmpNode.tagName !== 'LINK' &&
            _tmpNode.nodeType !== _tmpNode.DOCUMENT_FRAGMENT_NODE &&
            _tmpNode.nodeType !== _tmpNode.DOCUMENT_NODE) {
            _tmpNode = _tmpNode.parentNode;
          }
          if (_tmpNode &&
            (_tmpNode.nodeType === _tmpNode.DOCUMENT_FRAGMENT_NODE ||
             _tmpNode.nodeType === _tmpNode.DOCUMENT_NODE)) {
            ownerDocument = _tmpNode;
            baseURI = ownerDocument.baseURI;
          }
          else if (_tmpNode && _tmpNode.import === _tmpNode) {
            ownerDocument = _tmpNode;
            baseURI = ownerDocument.href; // link node
          }
        }
        */
        template = ownerDocument.querySelector('template[id=' + id + ']') ||
                   document.querySelector('template[id=' + id + ']');
        if (!template && id !== 'i18n-dom-bind') {
          template = document.createElement('template');
          template.setAttribute('id', id);
          console.warn('Localizable._rawTemplate: ' + id + ' has no template. Supplying an empty template');
        }
        if (template) {
          let domModule = document.createElement('dom-module');
          let assetpath = typeof URL === 'function' && URL.name === 'URL'
            ? new URL(baseURI || document.baseURI).pathname
            : (uri => { let a = document.createElement('a'); a.href = uri; return ('/' + a.pathname).replace(/^\/\//, '/'); })(baseURI);
          domModule.appendChild(template);
          domModule.setAttribute('assetpath', 
                                  template.hasAttribute('basepath') ?
                                    template.getAttribute('basepath') :
                                    template.hasAttribute('assetpath') ? 
                                      template.getAttribute('assetpath') : 
                                      assetpath);
          domModule.register(id);
          this._template = template;
        }
      }
      return template;
    }
    static get template() {
      return this._i18nPreprocess(this._rawTemplate);
    }
    static _uncamelCase(name) {
      return name
        // insert a hyphen between lower & upper
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z0-9])/, '$1 $2$3')
        // replace spaces with hyphens
        .replace(/ /g, '-')
        // lowercase
        .toLowerCase();
    }
    static get _templateLocalizable () {
      return this.hasOwnProperty('__templateLocalizable');
    }
    static set _templateLocalizable (value) {
      this.__templateLocalizable = value;
    }
    static _i18nPreprocess(template) {
      if (this.is && template && !this._templateLocalizable) {
        // Fix #56. [Polymer 2.4] Override this.prototype.__proto__.__proto__.__proto__.templateDefaultLang getter/setter
        Object.defineProperty(this.prototype, 'templateDefaultLang', {
          configurable: false,
          enumerable: true,
          value: 'en',
          writable: true,
        });
        this._templateLocalizable = this.prototype._constructDefaultBundle(template);
      }
      return template;
    }
    get is () {
      return this.constructor.is;
    }
    connectedCallback() {
      super.connectedCallback();
    }
  };
};
Mixins.Localizable = Localizable;

/**
 * Logger mixin
 * @summary Logger mixin
 * @polymer
 * @mixinFunction
 * @memberof Mixins
 */
export const Logger = (base) => class extends base {
  connectedCallback() {
    super.connectedCallback();
    console.log('<' + Object.getPrototypeOf(this).constructor.is + '>: ' +
      'id = ' + this.id + ', ' +
      'this.text = ' + JSON.stringify(this.text, null, 2));
    console.log('Preprocessed template = \n', Object.getPrototypeOf(this).constructor.template);
  }
};
Mixins.Logger = Logger;

// I18N Base Element
/**
 * @customElement
 * @polymer
 * @extends HTMLElement
 * @appliesMixin Localizable
 * @memberof BaseElements
 */
export const I18nElement = Mixins.Localizable(LegacyElementMixin(HTMLElement));
Object.defineProperty(BaseElements, 'I18nElement', {
  get: function() {
    return Mixins.Localizable(LegacyElementMixin(HTMLElement));
  },
  enumerable: true,
  configurable: false,
});
