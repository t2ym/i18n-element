/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import 'i18n-behavior/i18n-behavior.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="preference-element">
    <span id="oldLang"></span>
  </template>`;

document.head.appendChild($_documentContainer.content);
switch (syntax) {
default:
case 'mixin':
  {
    class PreferenceElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return ((t) => { t.setAttribute("localizable-text", "embedded"); return t; })(html`
    <span id="oldLang"></span>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {}
}
</json-data>
</template>
`);
      }

      static get is() { return 'preference-element' }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          if (!e.detail.lastLang || e.detail.lastLang === 'en' || e.detail.lastLang === 'en-US') {
            if (e.detail.oldLang) {
              this.$.oldLang.lang = e.detail.oldLang;
            }
            this.fire('local-dom-ready');
          }
        }
      }
    }
    customElements.define(PreferenceElement.is, PreferenceElement);
  }
  break;
case 'base-element':
  {
    class PreferenceElement extends BaseElements.I18nElement {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return ((t) => { t.setAttribute("localizable-text", "embedded"); return t; })(html`
    <span id="oldLang"></span>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {}
}
</json-data>
</template>
`);
      }

      static get is() { return 'preference-element' }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          if (!e.detail.lastLang || e.detail.lastLang === 'en') {
            if (e.detail.oldLang) {
              this.$.oldLang.lang = e.detail.oldLang;
            }
            this.fire('local-dom-ready');
          }
        }
      }
    }
    customElements.define(PreferenceElement.is, PreferenceElement);
  }
  break;
case 'thin':
  {
    Define = class PreferenceElement extends BaseElements.I18nElement {

      static get importMeta() {
        return import.meta;
      }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          if (!e.detail.lastLang || e.detail.lastLang === 'en') {
            if (e.detail.oldLang) {
              this.$.oldLang.lang = e.detail.oldLang;
            }
            this.fire('local-dom-ready');
          }
        }
      }
    };
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: ((t) => { t.setAttribute("localizable-text", "embedded"); return t; })(html`
    <span id="oldLang"></span>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {}
}
</json-data>
</template>
`),

      is: 'preference-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

      listeners: {
        'lang-updated': '_langUpdated'
      },

      _langUpdated: function (e) {
        if (dom(e).rootTarget === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          if (!e.detail.lastLang || e.detail.lastLang === 'en') {
            if (e.detail.oldLang) {
              this.$.oldLang.lang = e.detail.oldLang;
            }
            this.fire('local-dom-ready');
          }
        }
      }
    });
  }
  break;
}
