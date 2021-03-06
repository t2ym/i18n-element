/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import 'i18n-behavior/i18n-behavior.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<i18n-attr-repo>
  <template id="custom">
    <text-attribute-element custom-text-attr1=""></text-attribute-element>
    <text-attribute-element custom-text-attr2=""></text-attribute-element>
    <text-attribute-element custom-text-attr3=""></text-attribute-element>
    <text-attribute-element custom-text-attr4="$"></text-attribute-element>
    <text-attribute-element custom-text-attr5="$"></text-attribute-element>
    <text-attribute-element i18n-target=""></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr,!boolean-attr2,string-attr=abc|def,empty-attr=,type1"></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr,boolean-attr2,string-attr=aaa,type2"></text-attribute-element>
    <text-attribute-element i18n-target="string-attr=aaa,string-attr2=bbb,type3"></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr=,type4"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr,!boolean-attr2,string-attr=abc|def,empty-attr=,type1"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr,boolean-attr2,,string-attr=aaa,,type2"></text-attribute-element>
    <text-attribute-element i18n-target2="string-attr=aaa,string-attr2=bbb,type3"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr=,type4"></text-attribute-element>
    <text-attribute-element i18n-target2="type5"></text-attribute-element>
    <text-attribute-element i18n-target3="string-attr=aaa,type1"></text-attribute-element>
    <text-attribute-element i18n-target3=""></text-attribute-element>
    <text-attribute-element i18n-target4=""></text-attribute-element>
    <text-attribute-element i18n-target4="string-attr=aaa,type1"></text-attribute-element>
    <text-attribute-element i18n-target5=""></text-attribute-element>
    <text-attribute-element i18n-target5="type1"></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr=,type4"></text-attribute-element>
    <text-attribute-element i18n-target="string-attr=aaa,string-attr2=bbb,type3"></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr,,boolean-attr2,,string-attr=aaa"></text-attribute-element>
    <text-attribute-element i18n-target="boolean-attr,!boolean-attr2,string-attr=abc|def,empty-attr=,type1"></text-attribute-element>
    <text-attribute-element i18n-target=""></text-attribute-element>
    <text-attribute-element i18n-target2="type5"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr="></text-attribute-element>
    <text-attribute-element i18n-target2="string-attr=aaa,string-attr2=bbb,type3"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr,!boolean-attr2,,string-attr=abc|def,,empty-attr=,type1"></text-attribute-element>
    <text-attribute-element i18n-target2="boolean-attr,,boolean-attr2,,string-attr=aaa,type2"></text-attribute-element>
    <text-attribute-element i18n-target3="string-attr=aaa,type1"></text-attribute-element>
    <text-attribute-element i18n-target3=""></text-attribute-element>
    <text-attribute-element i18n-target4=""></text-attribute-element>
    <text-attribute-element i18n-target4="string-attr=aaa,type1"></text-attribute-element>
    <text-attribute-element i18n-target5=""></text-attribute-element>
    <text-attribute-element i18n-target5="type1"></text-attribute-element>
    <text-attribute-element i18n-target6="type5"></text-attribute-element>
    <text-attribute-element i18n-target6="boolean-attr="></text-attribute-element>
    <text-attribute-element i18n-target6="boolean-attr,boolean-attr2,type1"></text-attribute-element>
    <text-attribute-element i18n-target6="boolean-attr,boolean-attr2,string-attr=aaa,type2"></text-attribute-element>
    <text-attribute-element i18n-target7="string-attr=aaa,type1"></text-attribute-element>
    <text-attribute-element i18n-target7="invalid!attr=aaa,typeX"></text-attribute-element>
  </template>
</i18n-attr-repo>
<template id="text-attribute-element" text-attr="custom-text-attr1 custom-text-attr3">
  <span id="attr1">{{customTextAttr1}}</span>
  <span id="attr2">{{customTextAttr2}}</span>
  <span id="attr3">{{customTextAttr3}}</span>
  <span id="attr4">{{outOfScopeAttr}}</span>
  <span>text</span>
</template>`;

document.head.appendChild($_documentContainer.content);
switch (syntax) {
default:
case 'mixin':
  {
    class TextAttributeElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return html`
    <span id="attr1">{{customTextAttr1}}</span>
    <span id="attr2">{{customTextAttr2}}</span>
    <span id="attr3">{{customTextAttr3}}</span>
    <span id="attr4">{{outOfScopeAttr}}</span>
    <span>text</span>
`;
      }

      static get is() { return 'text-attribute-element'; }

      static get properties () {
        return {
          customTextAttr1: {
            type: String,
            reflectToAttribute: true
          },
          customTextAttr2: {
            type: String,
            reflectToAttribute: true
          },
          customTextAttr3: {
            type: String,
            reflectToAttribute: true
          },
          outOfScopeAttr: {
            type: String,
            reflectToAttribute: true
          },
          i18nTarget: {
            type: String
          },
          i18nTarget2: {
            type: String
          }
        };
      }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated () {
        this.model = deepcopy(this.text.model);
      }
    }
    customElements.define(TextAttributeElement.is, TextAttributeElement);
  }
  break;
case 'base-element':
  {
    class TextAttributeElement extends BaseElements.I18nElement {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return html`
    <span id="attr1">{{customTextAttr1}}</span>
    <span id="attr2">{{customTextAttr2}}</span>
    <span id="attr3">{{customTextAttr3}}</span>
    <span id="attr4">{{outOfScopeAttr}}</span>
    <span>text</span>
`;
      }

      static get is() { return 'text-attribute-element'; }

      static get properties () {
        return {
          customTextAttr1: {
            type: String,
            reflectToAttribute: true
          },
          customTextAttr2: {
            type: String,
            reflectToAttribute: true
          },
          customTextAttr3: {
            type: String,
            reflectToAttribute: true
          },
          outOfScopeAttr: {
            type: String,
            reflectToAttribute: true
          },
          i18nTarget: {
            type: String
          },
          i18nTarget2: {
            type: String
          }
        };
      }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated () {
        this.model = deepcopy(this.text.model);
      }
    }
    customElements.define(TextAttributeElement.is, TextAttributeElement);
  }
  break;
case 'thin':
  {
    Define = class TextAttributeElement extends BaseElements.I18nElement {

      static get importMeta() {
        return import.meta;
      }

      static get properties () {
        return {
          customTextAttr1: {
            type: String,
            reflectToAttribute: true
          },
          customTextAttr2: {
            type: String,
            reflectToAttribute: true
          },
          customTextAttr3: {
            type: String,
            reflectToAttribute: true
          },
          outOfScopeAttr: {
            type: String,
            reflectToAttribute: true
          },
          i18nTarget: {
            type: String
          },
          i18nTarget2: {
            type: String
          }
        };
      }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated () {
        this.model = deepcopy(this.text.model);
      }
    };
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: html`
    <span id="attr1">{{customTextAttr1}}</span>
    <span id="attr2">{{customTextAttr2}}</span>
    <span id="attr3">{{customTextAttr3}}</span>
    <span id="attr4">{{outOfScopeAttr}}</span>
    <span>text</span>
`,

      is: 'text-attribute-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

      properties: {
        customTextAttr1: {
          type: String,
          reflectToAttribute: true
        },
        customTextAttr2: {
          type: String,
          reflectToAttribute: true
        },
        customTextAttr3: {
          type: String,
          reflectToAttribute: true
        },
        outOfScopeAttr: {
          type: String,
          reflectToAttribute: true
        },
        i18nTarget: {
          type: String
        },
        i18nTarget2: {
          type: String
        }
      },

      listeners: {
        'lang-updated': '_langUpdated'
      },

      ready: function () {
        //this.observeHtmlLang = false;
      },

      attached: function () {
      },

      _langUpdated: function () {
        this.model = deepcopy(this.text.model);
      }
    });
  }
  break;
}
