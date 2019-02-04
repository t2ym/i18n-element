/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {render, svg} from 'lit-html/lit-html.js';
import {repeat} from 'lit-html/directives/repeat.js';
import {html, i18n, bind} from '../../../i18n.js';

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
</i18n-attr-repo>`;

document.head.appendChild($_documentContainer.content);
switch (syntax) {
default:
case 'element-binding':
  {
    class TextAttributeElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this)}
    <span id="attr1">${this.customTextAttr1}</span>
    <span id="attr2">${this.customTextAttr2}</span>
    <span id="attr3">${this.customTextAttr3}</span>
    <span id="attr4">${this.outOfScopeAttr}</span>
    <span>text</span>
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [
          'custom-text-attr1',
          'custom-text-attr2',
          'custom-text-attr3',
          'out-of-scope-attr',
          'i18n-target',
          'i18n-target2'
        ].forEach(attr => attributes.add(attr));
        return [...attributes];
      }

      constructor() {
        super();
        this.attachShadow({mode: 'open'});
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
      }

      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }

      _langUpdated(event) {
        this.invalidate();
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
        let updated = false;
        switch (name) {
        case 'custom-text-attr1':
          this.customTextAttr1 = newValue;
          updated = true;
          break;
        case 'custom-text-attr2':
          this.customTextAttr2 = newValue;
          updated = true;
          break;
        case 'custom-text-attr3':
          this.customTextAttr3 = newValue;
          updated = true;
          break;
        case 'i18n-target':
          this.i18nTarget = newValue;
          updated = true;
          break;
        case 'i18n-target2':
          this.i18nTarget2 = newValue;
          updated = true;
          break;
        default:
          break;
        }
        if (updated) {
          this.invalidate();
        }
      }
    }
    customElements.define(TextAttributeElement.is, TextAttributeElement);
  }
  break;
case 'name-binding':
  {
    class TextAttributeElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind('test-attribute-element', import.meta)}
    <span id="attr1">${this.customTextAttr1}</span>
    <span id="attr2">${this.customTextAttr2}</span>
    <span id="attr3">${this.customTextAttr3}</span>
    <span id="attr4">${this.outOfScopeAttr}</span>
    <span>text</span>
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [
          'custom-text-attr1',
          'custom-text-attr2',
          'custom-text-attr3',
          'out-of-scope-attr',
          'i18n-target',
          'i18n-target2'
        ].forEach(attr => attributes.add(attr));
        return [...attributes];
      }

      constructor() {
        super();
        this.attachShadow({mode: 'open'});
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
      }

      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }

      _langUpdated(event) {
        this.invalidate();
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
        let updated = false;
        switch (name) {
        case 'custom-text-attr1':
          this.customTextAttr1 = newValue;
          updated = true;
          break;
        case 'custom-text-attr2':
          this.customTextAttr2 = newValue;
          updated = true;
          break;
        case 'custom-text-attr3':
          this.customTextAttr3 = newValue;
          updated = true;
          break;
        case 'i18n-target':
          this.i18nTarget = newValue;
          updated = true;
          break;
        case 'i18n-target2':
          this.i18nTarget2 = newValue;
          updated = true;
          break;
        default:
          break;
        }
        if (updated) {
          this.invalidate();
        }
      }
    }
    customElements.define(TextAttributeElement.is, TextAttributeElement);
  }
  break;
case 'element-name-binding':
  {
    class TextAttributeElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this, 'test-attribute-element')}
    <span id="attr1">${this.customTextAttr1}</span>
    <span id="attr2">${this.customTextAttr2}</span>
    <span id="attr3">${this.customTextAttr3}</span>
    <span id="attr4">${this.outOfScopeAttr}</span>
    <span>text</span>
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [
          'custom-text-attr1',
          'custom-text-attr2',
          'custom-text-attr3',
          'out-of-scope-attr',
          'i18n-target',
          'i18n-target2'
        ].forEach(attr => attributes.add(attr));
        return [...attributes];
      }

      constructor() {
        super();
        this.attachShadow({mode: 'open'});
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
      }

      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }

      _langUpdated(event) {
        this.invalidate();
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
        let updated = false;
        switch (name) {
        case 'custom-text-attr1':
          this.customTextAttr1 = newValue;
          updated = true;
          break;
        case 'custom-text-attr2':
          this.customTextAttr2 = newValue;
          updated = true;
          break;
        case 'custom-text-attr3':
          this.customTextAttr3 = newValue;
          updated = true;
          break;
        case 'i18n-target':
          this.i18nTarget = newValue;
          updated = true;
          break;
        case 'i18n-target2':
          this.i18nTarget2 = newValue;
          updated = true;
          break;
        default:
          break;
        }
        if (updated) {
          this.invalidate();
        }
      }
    }
    customElements.define(TextAttributeElement.is, TextAttributeElement);
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
