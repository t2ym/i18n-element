/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {render, svg} from 'lit-html/lit-html.js';
import {html, i18n, bind} from '../../../i18n.js';
import '@polymer/iron-input/iron-input.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';

switch (syntax) {
default:
case 'element-binding':
  {
    class AdvancedBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this)}
    <span id="status">${this.tr(this.status,this.text.statusMessages)}</span>

    <span id="default">${this.or(this.value,this.text.defaultValue)}</span>

    <i18n-format id="annotated-format">
      <span>${this.tr(this.status,this.text.statusMessageFormats)}</span>
      <span>${this.parameter}</span>
      <span>string parameter</span>
    </i18n-format>

    <input is="iron-input" id="aria-attributes" title="tooltip text" aria-label="aria label text" aria-valuetext="aria value text" .bindvalue=${this.value}>

    <span>${this.tr('key',this.text.nodefault)}</span>
    <span>${this.text.defaultValue} ${this.text.defaultValue}</span>

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

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
        return [...attributes];
      }

      get status() {
        return this._status;
      }
      set status(value) {
        this._status = value;
        this.invalidate();
      }

      get value() {
        return this._value;
      }
      set value(value) {
        this._value = value;
        this.invalidate();
      }

      get parameter() {
        return this._parameter;
      }
      set parameter(value) {
        this._parameter = value;
        this.invalidate();
      }

      constructor() {
        super();
        this.status = 'ok';
        this.attachShadow({mode: 'open'});
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
      }

      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${this.is}: _updateEffectiveLang effectiveLang="${this.effectiveLang}" lang="${this.lang}"`)
      }

      invalidate() {
        if (!this.needsRender) {
          this.needsRender = true;
          Promise.resolve().then(() => {
            this.needsRender = false;
            render(this.render(), this.shadowRoot);
          });
        }
      }

      attributeChangedCallback(name, oldValue, newValue) {
        const handleOnlyBySelf = [];
        if (!handleOnlyBySelf.indexOf(name) >= 0) {
          if (typeof super.attributeChangedCallback === 'function') {
            super.attributeChangedCallback(name, oldValue, newValue);
          }
        }
        switch (name) {
        //case 'target-attribute': break;
        default:
          break;
        }
      }

      connectedCallback() {
        //console.log('advanced-binding-element: connected');
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.addEventListener('rendered', this._rendered);
        this.invalidate();
      }

      disconnectedCallback() {
        if (super.disconnectedCallback) {
          super.disconnectedCallback();
        }
        //console.log('advanced-binding-element: disconnected');
      }

      _langUpdated(e) {
        this.invalidate();
        console.log('lang-updated', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this) {
          this._checkLang();
        }
      }

      _rendered(e) {
        console.log('rendered', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang, 'e.target.lang = ' + e.target.lang);
        this._checkLang();
      }

      _checkLang() {
        var i18nFormats = this.shadowRoot.querySelectorAll('i18n-format');
        console.log('_checkLang', i18nFormats);
        var allLangUpdated = (this.lang === this.effectiveLang);
        Array.prototype.forEach.call(i18nFormats, function (el) {
          console.log('_checkLang el.lang=', el.lang, ' this.lang', this.lang);
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          }
          else {
            el.render();
          }
        }.bind(this));
        if (allLangUpdated) {
          setTimeout(() => {
            console.log(this.is + ' local-dom-ready' + ' lang=' + this.lang);
            this.fire('local-dom-ready');
          }, 500);
        }
      }
    }
    customElements.define(AdvancedBindingElement.is, AdvancedBindingElement);
  }
  break;
case 'name-binding':
  {
    class AdvancedBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind('advanced-binding-element', import.meta)}
    <span id="status">${this.tr(this.status,this.text.statusMessages)}</span>

    <span id="default">${this.or(this.value,this.text.defaultValue)}</span>

    <i18n-format id="annotated-format">
      <span>${this.tr(this.status,this.text.statusMessageFormats)}</span>
      <span>${this.parameter}</span>
      <span>string parameter</span>
    </i18n-format>

    <input is="iron-input" id="aria-attributes" title="tooltip text" aria-label="aria label text" aria-valuetext="aria value text" .bindvalue=${this.value}>

    <span>${this.tr('key',this.text.nodefault)}</span>
    <span>${this.text.defaultValue} ${this.text.defaultValue}</span>

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

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
        return [...attributes];
      }

      get status() {
        return this._status;
      }
      set status(value) {
        this._status = value;
        this.invalidate();
      }

      get value() {
        return this._value;
      }
      set value(value) {
        this._value = value;
        this.invalidate();
      }

      get parameter() {
        return this._parameter;
      }
      set parameter(value) {
        this._parameter = value;
        this.invalidate();
      }

      constructor() {
        super();
        this.status = 'ok';
        this.attachShadow({mode: 'open'});
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
      }

      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${this.is}: _updateEffectiveLang effectiveLang="${this.effectiveLang}" lang="${this.lang}"`)
      }

      invalidate() {
        if (!this.needsRender) {
          this.needsRender = true;
          Promise.resolve().then(() => {
            this.needsRender = false;
            render(this.render(), this.shadowRoot);
          });
        }
      }

      attributeChangedCallback(name, oldValue, newValue) {
        const handleOnlyBySelf = [];
        if (!handleOnlyBySelf.indexOf(name) >= 0) {
          if (typeof super.attributeChangedCallback === 'function') {
            super.attributeChangedCallback(name, oldValue, newValue);
          }
        }
        switch (name) {
        //case 'target-attribute': break;
        default:
          break;
        }
      }

      connectedCallback() {
        //console.log('advanced-binding-element: connected');
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.addEventListener('rendered', this._rendered);
        this.invalidate();
      }

      disconnectedCallback() {
        if (super.disconnectedCallback) {
          super.disconnectedCallback();
        }
        //console.log('advanced-binding-element: disconnected');
      }

      _langUpdated(e) {
        this.invalidate();
        console.log('lang-updated', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this) {
          this._checkLang();
        }
      }

      _rendered(e) {
        console.log('rendered', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang, 'e.target.lang = ' + e.target.lang);
        this._checkLang();
      }

      _checkLang() {
        var i18nFormats = this.shadowRoot.querySelectorAll('i18n-format');
        console.log('_checkLang', i18nFormats);
        var allLangUpdated = (this.lang === this.effectiveLang);
        Array.prototype.forEach.call(i18nFormats, function (el) {
          console.log('_checkLang el.lang=', el.lang, ' this.lang', this.lang);
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          }
          else {
            el.render();
          }
        }.bind(this));
        if (allLangUpdated) {
          setTimeout(() => {
            console.log(this.is + ' local-dom-ready' + ' lang=' + this.lang);
            this.fire('local-dom-ready');
          }, 500);
        }
      }
    }
    customElements.define(AdvancedBindingElement.is, AdvancedBindingElement);
  }
  break;
case 'element-name-binding':
  {
    class AdvancedBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this, 'advanced-binding-element')}
    <span id="status">${this.tr(this.status,this.text.statusMessages)}</span>

    <span id="default">${this.or(this.value,this.text.defaultValue)}</span>

    <i18n-format id="annotated-format">
      <span>${this.tr(this.status,this.text.statusMessageFormats)}</span>
      <span>${this.parameter}</span>
      <span>string parameter</span>
    </i18n-format>

    <input is="iron-input" id="aria-attributes" title="tooltip text" aria-label="aria label text" aria-valuetext="aria value text" .bindvalue=${this.value}>

    <span>${this.tr('key',this.text.nodefault)}</span>
    <span>${this.text.defaultValue} ${this.text.defaultValue}</span>

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

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
        return [...attributes];
      }

      get status() {
        return this._status;
      }
      set status(value) {
        this._status = value;
        this.invalidate();
      }

      get value() {
        return this._value;
      }
      set value(value) {
        this._value = value;
        this.invalidate();
      }

      get parameter() {
        return this._parameter;
      }
      set parameter(value) {
        this._parameter = value;
        this.invalidate();
      }

      constructor() {
        super();
        this.status = 'ok';
        this.attachShadow({mode: 'open'});
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
      }

      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${this.is}: _updateEffectiveLang effectiveLang="${this.effectiveLang}" lang="${this.lang}"`)
      }

      invalidate() {
        if (!this.needsRender) {
          this.needsRender = true;
          Promise.resolve().then(() => {
            this.needsRender = false;
            render(this.render(), this.shadowRoot);
          });
        }
      }

      attributeChangedCallback(name, oldValue, newValue) {
        const handleOnlyBySelf = [];
        if (!handleOnlyBySelf.indexOf(name) >= 0) {
          if (typeof super.attributeChangedCallback === 'function') {
            super.attributeChangedCallback(name, oldValue, newValue);
          }
        }
        switch (name) {
        //case 'target-attribute': break;
        default:
          break;
        }
      }

      connectedCallback() {
        //console.log('advanced-binding-element: connected');
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.addEventListener('rendered', this._rendered);
        this.invalidate();
      }

      disconnectedCallback() {
        if (super.disconnectedCallback) {
          super.disconnectedCallback();
        }
        //console.log('advanced-binding-element: disconnected');
      }

      _langUpdated(e) {
        this.invalidate();
        console.log('lang-updated', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this) {
          this._checkLang();
        }
      }

      _rendered(e) {
        console.log('rendered', e.composedPath()[0], e.target, e.detail, 'lang = ' + this.lang, 'effectiveLang = ' + this.effectiveLang, 'e.target.lang = ' + e.target.lang);
        this._checkLang();
      }

      _checkLang() {
        var i18nFormats = this.shadowRoot.querySelectorAll('i18n-format');
        console.log('_checkLang', i18nFormats);
        var allLangUpdated = (this.lang === this.effectiveLang);
        Array.prototype.forEach.call(i18nFormats, function (el) {
          console.log('_checkLang el.lang=', el.lang, ' this.lang', this.lang);
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          }
          else {
            el.render();
          }
        }.bind(this));
        if (allLangUpdated) {
          setTimeout(() => {
            console.log(this.is + ' local-dom-ready' + ' lang=' + this.lang);
            this.fire('local-dom-ready');
          }, 500);
        }
      }
    }
    customElements.define(AdvancedBindingElement.is, AdvancedBindingElement);
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

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
