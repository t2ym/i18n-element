import '../../../../i18n-behavior/i18n-behavior.js';
import '../../../../@polymer/iron-input/iron-input.js';
import { html } from '../../../../@polymer/polymer/polymer.js';
import { LegacyElementMixin } from '../../../../@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '../../../../@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<template id="advanced-binding-element">
    <span id="status">{{tr(status,text.statusMessages)}}</span>

    <span id="default">{{or(value,text.defaultValue)}}</span>

    <i18n-format id="annotated-format">
      <span>{{tr(status,text.statusMessageFormats)}}</span>
      <span>{{parameter}}</span>
      <span>string parameter</span>
    </i18n-format>

    <input is="iron-input" id="aria-attributes" title="tooltip text" aria-label="aria label text" aria-valuetext="aria value text" bind-value="{{value}}">

    <span>{{tr('key',text.nodefault)}}</span>
    <span>{{text.defaultValue}} {{text.defaultValue}}</span>

    <template>
      <json-data text-id="statusMessages">{
        "ok": "healthy status",
        "busy": "busy status",
        "error": "error status",
        "default": "unknown status"
      }</json-data>
      <span text-id="defaultValue">default value</span>
      <json-data text-id="statusMessageFormats">{
        "ok": "healthy status",
        "busy": "busy status with {2}",
        "error": "error status with {1} and {2}",
        "default": "unknown status"
      }</json-data>
      <json-data text-id="nodefault">{
        "ok": "ok status"
      }</json-data>
    </template>
  </template>`;

document.head.appendChild($_documentContainer);
/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
switch (syntax) {
default:
case 'mixin':
  {
    class AdvancedBindingElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
      static get importPath() {
        return import.meta.url;
      }

      static get template() {
        return html`
    <span id="status">{{tr(status,text.statusMessages)}}</span>

    <span id="default">{{or(value,text.defaultValue)}}</span>

    <i18n-format id="annotated-format">
      <span>{{tr(status,text.statusMessageFormats)}}</span>
      <span>{{parameter}}</span>
      <span>string parameter</span>
    </i18n-format>

    <input is="iron-input" id="aria-attributes" title="tooltip text" aria-label="aria label text" aria-valuetext="aria value text" bind-value="{{value}}">

    <span>{{tr('key',text.nodefault)}}</span>
    <span>{{text.defaultValue}} {{text.defaultValue}}</span>

    <template>
      <json-data text-id="statusMessages">{
        "ok": "healthy status",
        "busy": "busy status",
        "error": "error status",
        "default": "unknown status"
      }</json-data>
      <span text-id="defaultValue">default value</span>
      <json-data text-id="statusMessageFormats">{
        "ok": "healthy status",
        "busy": "busy status with {2}",
        "error": "error status with {1} and {2}",
        "default": "unknown status"
      }</json-data>
      <json-data text-id="nodefault">{
        "ok": "ok status"
      }</json-data>
    </template>
`;
      }

      static get is() { return 'advanced-binding-element' }
      static get properties () {
        return {
          status: {
            type: String,
            value: 'ok'
          },
          value: {
            type: String
          },
          parameter: {
            type: String
          }
        }
      }

      connectedCallback() {
        //console.log('advanced-binding-element: connected');
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
        this.addEventListener('rendered', this._rendered.bind(this));
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        //console.log('advanced-binding-element: disconnected');
      }

      _langUpdated(e) {
        console.log('lang-updated', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this /*&&
            this.effectiveLang === this.lang*/) {
          this.model = deepcopy(this.text.model);
          this._checkLang();
        }
      }

      _rendered(e) {
        console.log('rendered', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang, 'e.target.lang = ' + e.target.lang);
        this._checkLang();
      }

      _checkLang() {
        var i18nFormats = this.root.querySelectorAll('i18n-format');
        var allLangUpdated = (this.lang === this.effectiveLang);
        Array.prototype.forEach.call(i18nFormats, function (el) {
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          }
          else {
            el.render();
          }
        }.bind(this));
        if (allLangUpdated) {
          console.log(this.is + ' local-dom-ready');
          this.fire('local-dom-ready');
        }          
      }
    }
    customElements.define(AdvancedBindingElement.is, AdvancedBindingElement);
  }
  break;
case 'base-element':
  {
    class AdvancedBindingElement extends BaseElements.I18nElement {
      static get importPath() {
        return import.meta.url;
      }

      static get template() {
        return html`
    <span id="status">{{tr(status,text.statusMessages)}}</span>

    <span id="default">{{or(value,text.defaultValue)}}</span>

    <i18n-format id="annotated-format">
      <span>{{tr(status,text.statusMessageFormats)}}</span>
      <span>{{parameter}}</span>
      <span>string parameter</span>
    </i18n-format>

    <input is="iron-input" id="aria-attributes" title="tooltip text" aria-label="aria label text" aria-valuetext="aria value text" bind-value="{{value}}">

    <span>{{tr('key',text.nodefault)}}</span>
    <span>{{text.defaultValue}} {{text.defaultValue}}</span>

    <template>
      <json-data text-id="statusMessages">{
        "ok": "healthy status",
        "busy": "busy status",
        "error": "error status",
        "default": "unknown status"
      }</json-data>
      <span text-id="defaultValue">default value</span>
      <json-data text-id="statusMessageFormats">{
        "ok": "healthy status",
        "busy": "busy status with {2}",
        "error": "error status with {1} and {2}",
        "default": "unknown status"
      }</json-data>
      <json-data text-id="nodefault">{
        "ok": "ok status"
      }</json-data>
    </template>
`;
      }

      static get is() { return 'advanced-binding-element' }
      static get properties () {
        return {
          status: {
            type: String,
            value: 'ok'
          },
          value: {
            type: String
          },
          parameter: {
            type: String
          }
        }
      }

      connectedCallback() {
        //console.log('advanced-binding-element: connected');
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
        this.addEventListener('rendered', this._rendered.bind(this));
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        //console.log('advanced-binding-element: disconnected');
      }

      _langUpdated(e) {
        console.log('lang-updated', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this /*&&
            this.effectiveLang === this.lang*/) {
          this.model = deepcopy(this.text.model);
          this._checkLang();
        }
      }

      _rendered(e) {
        console.log('rendered', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang, 'e.target.lang = ' + e.target.lang);
        this._checkLang();
      }

      _checkLang() {
        var i18nFormats = this.root.querySelectorAll('i18n-format');
        var allLangUpdated = (this.lang === this.effectiveLang);
        Array.prototype.forEach.call(i18nFormats, function (el) {
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          }
          else {
            el.render();
          }
        }.bind(this));
        if (allLangUpdated) {
          this.fire('local-dom-ready');
        }          
      }
    }
    customElements.define(AdvancedBindingElement.is, AdvancedBindingElement);
  }
  break;
case 'thin':
  {
    Define = class AdvancedBindingElement extends BaseElements.I18nElement {
      static get importPath() {
        return import.meta.url;
      }

      static get properties () {
        return {
          status: {
            type: String,
            value: 'ok'
          },
          value: {
            type: String
          },
          parameter: {
            type: String
          }
        }
      }

      connectedCallback() {
        //console.log('advanced-binding-element: connected');
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
        this.addEventListener('rendered', this._rendered.bind(this));
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        //console.log('advanced-binding-element: disconnected');
      }

      _langUpdated(e) {
        console.log('lang-updated', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this /*&&
            this.effectiveLang === this.lang*/) {
          this.model = deepcopy(this.text.model);
          this._checkLang();
        }
      }

      _rendered(e) {
        console.log('rendered', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang, 'e.target.lang = ' + e.target.lang);
        this._checkLang();
      }

      _checkLang() {
        var i18nFormats = this.root.querySelectorAll('i18n-format');
        var allLangUpdated = (this.lang === this.effectiveLang);
        Array.prototype.forEach.call(i18nFormats, function (el) {
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          }
          else {
            el.render();
          }
        }.bind(this));
        if (allLangUpdated) {
          this.fire('local-dom-ready');
        }          
      }
    }
  }
  break;
case 'legacy':
  {
    Polymer({
      importPath: import.meta.url,

      _template: html`
    <span id="status">{{tr(status,text.statusMessages)}}</span>

    <span id="default">{{or(value,text.defaultValue)}}</span>

    <i18n-format id="annotated-format">
      <span>{{tr(status,text.statusMessageFormats)}}</span>
      <span>{{parameter}}</span>
      <span>string parameter</span>
    </i18n-format>

    <input is="iron-input" id="aria-attributes" title="tooltip text" aria-label="aria label text" aria-valuetext="aria value text" bind-value="{{value}}">

    <span>{{tr('key',text.nodefault)}}</span>
    <span>{{text.defaultValue}} {{text.defaultValue}}</span>

    <template>
      <json-data text-id="statusMessages">{
        "ok": "healthy status",
        "busy": "busy status",
        "error": "error status",
        "default": "unknown status"
      }</json-data>
      <span text-id="defaultValue">default value</span>
      <json-data text-id="statusMessageFormats">{
        "ok": "healthy status",
        "busy": "busy status with {2}",
        "error": "error status with {1} and {2}",
        "default": "unknown status"
      }</json-data>
      <json-data text-id="nodefault">{
        "ok": "ok status"
      }</json-data>
    </template>
`,

      is: 'advanced-binding-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

      properties: {
        status: {
          type: String,
          value: 'ok'
        },
        value: {
          type: String
        },
        parameter: {
          type: String
        }
      },

      observers: [
      ],

      listeners: {
        'lang-updated': '_langUpdated',
        'rendered': '_rendered'
      },

      ready: function () {
        //this.observeHtmlLang = false;
      },

      attached: function () {
        //console.log('advanced-binding-element: attached');
      },

      detached: function () {
        //console.log('advanced-binding-element: detached');
      },

      _langUpdated: function (e) {
        console.log('lang-updated', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang);
        if (dom(e).rootTarget === this) {
          this.model = deepcopy(this.text.model);
          this._checkLang();
        }
      },

      _rendered: function (e) {
        console.log('rendered', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang, 'e.target.lang = ' + e.target.lang);
        this._checkLang();
      },

      _checkLang: function () {
        var i18nFormats = this.root.querySelectorAll('i18n-format');
        var allLangUpdated = (this.lang === this.effectiveLang);
        Array.prototype.forEach.call(i18nFormats, function (el) {
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          }
          else {
            el.render();
          }
        }.bind(this));
        if (allLangUpdated) {
          this.fire('local-dom-ready');
        }          
      }
    });
  }
  break;
}
