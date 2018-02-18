import '../../../../i18n-behavior/i18n-behavior.js';
import { LegacyElementMixin } from '../../../../@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '../../../../@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<template id="preference-element" basepath="preference/" localizable-text="embedded">
    <span id="oldLang"></span>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {}
}
</json-data>
</template>
</template><dom-module id="preference-element" legacy="">
  <template localizable-text="embedded">
    <span id="oldLang"></span>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {}
}
</json-data>
</template>
</template>
</dom-module>`;

document.head.appendChild($_documentContainer);
/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
switch (syntax) {
default:
case 'mixin':
  {
    class PreferenceElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
      static get is() { return 'preference-element' }

      connectedCallback () {
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          if (!e.detail.lastLang || e.detail.lastLang === 'en') {
            this.$.oldLang.lang = e.detail.oldLang;
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
      static get is() { return 'preference-element' }

      connectedCallback () {
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          if (!e.detail.lastLang || e.detail.lastLang === 'en') {
            this.$.oldLang.lang = e.detail.oldLang;
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
      connectedCallback () {
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          if (!e.detail.lastLang || e.detail.lastLang === 'en') {
            this.$.oldLang.lang = e.detail.oldLang;
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
            this.$.oldLang.lang = e.detail.oldLang;
            this.fire('local-dom-ready');
          }
        }
      }
    });
  }
  break;
}
