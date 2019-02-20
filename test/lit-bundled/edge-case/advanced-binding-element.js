/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {
  render,
  svg
} from 'lit-html/lit-html.js';
import {
  html,
  i18n,
  bind
} from '../../../i18n.js';
import '@polymer/iron-input/iron-input.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';
switch (syntax) {
default:
case 'element-binding': {
    class AdvancedBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n    <span id="status">',
          '</span>\n\n    <span id="default">',
          '</span>\n\n    <i18n-format id="annotated-format" lang="',
          '">\n      <span>',
          '</span>\n      <span slot="1">',
          '</span>\n      <span slot="2">',
          '</span>\n    </i18n-format>\n\n    <input is="iron-input" id="aria-attributes" title="',
          '" aria-label="',
          '" aria-valuetext="',
          '" .bindvalue="',
          '">\n\n    <span>',
          '</span>\n    <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n\n    <template>\n      <json-data text-id="statusMessages">',
          '</json-data>\n      <span text-id="defaultValue">',
          '</span>\n      <json-data text-id="statusMessageFormats">',
          '</json-data>\n      <json-data text-id="nodefault">',
          '</json-data>\n    </template>\n'
        ], ...bind(this, (_bind, text, model, effectiveLang) => [
          _bind,
          this.tr(this.status, this.text.statusMessages),
          this.or(this.value, this.text.defaultValue),
          effectiveLang,
          this.tr(this.status, this.text.statusMessageFormats),
          this.parameter,
          text['annotated-format']['2'],
          model['aria-attributes']['title'],
          model['aria-attributes']['aria-label'],
          model['aria-attributes']['aria-valuetext'],
          this.value,
          this.tr('key', this.text.nodefault),
          effectiveLang,
          text['span_5']['0'],
          this.text.defaultValue,
          this.text.defaultValue,
          text['statusMessages'],
          text['defaultValue'],
          text['statusMessageFormats'],
          text['nodefault']
        ], {
          'meta': {},
          'model': {
            'aria-attributes': {
              'title': 'tooltip text',
              'aria-label': 'aria label text',
              'aria-valuetext': 'aria value text'
            }
          },
          'annotated-format': [
            '{{parts.2}}',
            '{{parts.3}}',
            'string parameter'
          ],
          'span_5': [
            '{1} {2}',
            '{{parts.6}}',
            '{{parts.7}}'
          ],
          'statusMessages': {
            'ok': 'healthy status',
            'busy': 'busy status',
            'error': 'error status',
            'default': 'unknown status'
          },
          'defaultValue': 'default value',
          'statusMessageFormats': {
            'ok': 'healthy status',
            'busy': 'busy status with {2}',
            'error': 'error status with {1} and {2}',
            'default': 'unknown status'
          },
          'nodefault': { 'ok': 'ok status' }
        }));
      }
      static get observedAttributes() {
        let attributesSet = new Set();
        let attributes = [];
        [].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr));
        return attributes;
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
        this.attachShadow({ mode: 'open' });
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis);
      }
      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${ this.is }: _updateEffectiveLang effectiveLang="${ this.effectiveLang }" lang="${ this.lang }"`);
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
        default:
          break;
        }
      }
      connectedCallback() {
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
        var allLangUpdated = this.lang === this.effectiveLang;
        Array.prototype.forEach.call(i18nFormats, function (el) {
          console.log('_checkLang el.lang=', el.lang, ' this.lang', this.lang);
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          } else {
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
case 'name-binding': {
    class AdvancedBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n    <span id="status">',
          '</span>\n\n    <span id="default">',
          '</span>\n\n    <i18n-format id="annotated-format" lang="',
          '">\n      <span>',
          '</span>\n      <span slot="1">',
          '</span>\n      <span slot="2">',
          '</span>\n    </i18n-format>\n\n    <input is="iron-input" id="aria-attributes" title="',
          '" aria-label="',
          '" aria-valuetext="',
          '" .bindvalue="',
          '">\n\n    <span>',
          '</span>\n    <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n\n    <template>\n      <json-data text-id="statusMessages">',
          '</json-data>\n      <span text-id="defaultValue">',
          '</span>\n      <json-data text-id="statusMessageFormats">',
          '</json-data>\n      <json-data text-id="nodefault">',
          '</json-data>\n    </template>\n'
        ], ...bind('advanced-binding-element', import.meta, (_bind, text, model, effectiveLang) => [
          _bind,
          this.tr(this.status, this.text.statusMessages),
          this.or(this.value, this.text.defaultValue),
          effectiveLang,
          this.tr(this.status, this.text.statusMessageFormats),
          this.parameter,
          text['annotated-format']['2'],
          model['aria-attributes']['title'],
          model['aria-attributes']['aria-label'],
          model['aria-attributes']['aria-valuetext'],
          this.value,
          this.tr('key', this.text.nodefault),
          effectiveLang,
          text['span_5']['0'],
          this.text.defaultValue,
          this.text.defaultValue,
          text['statusMessages'],
          text['defaultValue'],
          text['statusMessageFormats'],
          text['nodefault']
        ], {
          'meta': {},
          'model': {
            'aria-attributes': {
              'title': 'tooltip text',
              'aria-label': 'aria label text',
              'aria-valuetext': 'aria value text'
            }
          },
          'annotated-format': [
            '{{parts.2}}',
            '{{parts.3}}',
            'string parameter'
          ],
          'span_5': [
            '{1} {2}',
            '{{parts.6}}',
            '{{parts.7}}'
          ],
          'statusMessages': {
            'ok': 'healthy status',
            'busy': 'busy status',
            'error': 'error status',
            'default': 'unknown status'
          },
          'defaultValue': 'default value',
          'statusMessageFormats': {
            'ok': 'healthy status',
            'busy': 'busy status with {2}',
            'error': 'error status with {1} and {2}',
            'default': 'unknown status'
          },
          'nodefault': { 'ok': 'ok status' }
        }));
      }
      static get observedAttributes() {
        let attributesSet = new Set();
        let attributes = [];
        [].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr));
        return attributes;
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
        this.attachShadow({ mode: 'open' });
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis);
      }
      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${ this.is }: _updateEffectiveLang effectiveLang="${ this.effectiveLang }" lang="${ this.lang }"`);
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
        default:
          break;
        }
      }
      connectedCallback() {
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
        var allLangUpdated = this.lang === this.effectiveLang;
        Array.prototype.forEach.call(i18nFormats, function (el) {
          console.log('_checkLang el.lang=', el.lang, ' this.lang', this.lang);
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          } else {
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
case 'element-name-binding': {
    class AdvancedBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n    <span id="status">',
          '</span>\n\n    <span id="default">',
          '</span>\n\n    <i18n-format id="annotated-format" lang="',
          '">\n      <span>',
          '</span>\n      <span slot="1">',
          '</span>\n      <span slot="2">',
          '</span>\n    </i18n-format>\n\n    <input is="iron-input" id="aria-attributes" title="',
          '" aria-label="',
          '" aria-valuetext="',
          '" .bindvalue="',
          '">\n\n    <span>',
          '</span>\n    <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n\n    <template>\n      <json-data text-id="statusMessages">',
          '</json-data>\n      <span text-id="defaultValue">',
          '</span>\n      <json-data text-id="statusMessageFormats">',
          '</json-data>\n      <json-data text-id="nodefault">',
          '</json-data>\n    </template>\n'
        ], ...bind(this, 'advanced-binding-element', (_bind, text, model, effectiveLang) => [
          _bind,
          this.tr(this.status, this.text.statusMessages),
          this.or(this.value, this.text.defaultValue),
          effectiveLang,
          this.tr(this.status, this.text.statusMessageFormats),
          this.parameter,
          text['annotated-format']['2'],
          model['aria-attributes']['title'],
          model['aria-attributes']['aria-label'],
          model['aria-attributes']['aria-valuetext'],
          this.value,
          this.tr('key', this.text.nodefault),
          effectiveLang,
          text['span_5']['0'],
          this.text.defaultValue,
          this.text.defaultValue,
          text['statusMessages'],
          text['defaultValue'],
          text['statusMessageFormats'],
          text['nodefault']
        ], {
          'meta': {},
          'model': {
            'aria-attributes': {
              'title': 'tooltip text',
              'aria-label': 'aria label text',
              'aria-valuetext': 'aria value text'
            }
          },
          'annotated-format': [
            '{{parts.2}}',
            '{{parts.3}}',
            'string parameter'
          ],
          'span_5': [
            '{1} {2}',
            '{{parts.6}}',
            '{{parts.7}}'
          ],
          'statusMessages': {
            'ok': 'healthy status',
            'busy': 'busy status',
            'error': 'error status',
            'default': 'unknown status'
          },
          'defaultValue': 'default value',
          'statusMessageFormats': {
            'ok': 'healthy status',
            'busy': 'busy status with {2}',
            'error': 'error status with {1} and {2}',
            'default': 'unknown status'
          },
          'nodefault': { 'ok': 'ok status' }
        }));
      }
      static get observedAttributes() {
        let attributesSet = new Set();
        let attributes = [];
        [].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr));
        return attributes;
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
        this.attachShadow({ mode: 'open' });
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis);
      }
      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${ this.is }: _updateEffectiveLang effectiveLang="${ this.effectiveLang }" lang="${ this.lang }"`);
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
        default:
          break;
        }
      }
      connectedCallback() {
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
        var allLangUpdated = this.lang === this.effectiveLang;
        Array.prototype.forEach.call(i18nFormats, function (el) {
          console.log('_checkLang el.lang=', el.lang, ' this.lang', this.lang);
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          } else {
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
case 'legacy': {
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
      behaviors: [BehaviorsStore.I18nBehavior],
      properties: {
        status: {
          type: String,
          value: 'ok'
        },
        value: { type: String },
        parameter: { type: String }
      },
      observers: [],
      listeners: {
        'lang-updated': '_langUpdated',
        'rendered': '_rendered'
      },
      ready: function () {
      },
      attached: function () {
      },
      detached: function () {
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
        var allLangUpdated = this.lang === this.effectiveLang;
        Array.prototype.forEach.call(i18nFormats, function (el) {
          if (el.lang !== this.lang) {
            allLangUpdated = false;
          } else {
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
