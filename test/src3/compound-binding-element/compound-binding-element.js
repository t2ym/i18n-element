/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import 'i18n-behavior/i18n-behavior.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="compound-binding-element">
    outermost text at the beginning with compound {{param1}} and {{param2}} variables
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1 with {{param1}} and {{param2}} variables</h1>
    outermost text in the middle with {{param1}} and {{param2}} variables
    <span>simple text without id with {{param1}} and {{param2}} variables</span>
    <span>simple text without id 2 with {{param1}} and {{param2}} variables</span>
    <span id="label-1">simple text with id and {{param1}} and {{param2}} variables</span>
    <span id="label-2">simple text with id and {{param1}} and {{param2}} variables 2</span>
    <div>
      <span>simple text within div with {{param1}} and {{param2}} variables</span> 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span> 
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div> 
    </div>
    <div>
      simple text as the first element in div with {{param1}} and {{param2}} variables
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      simple text in the middle of div with {{param1}} and {{param2}} variables 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span>
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div>
      simple text at the last element in div with {{param1}} and {{param2}} variables
    </div>
    <div id="toplevel-div">
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      <span>simple text within div 2 with {{param1}} and {{param2}} variables</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div with {{param1}} and {{param2}} variables</div>
        <div>great grandchild text within div without id with {{param1}} and {{param2}} variables</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
    </div>
    <p>A paragraph with {{param1}} is converted to {{param2}}.</p>
    <p id="paragraph">A paragraph with <b>id</b>, {{param1}}, and {{param2}} is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end with {{param1}} and {{param2}} variables
  </template>`;

document.head.appendChild($_documentContainer.content);
switch (syntax) {
default:
case 'mixin':
  {
    class CompoundBindingElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return html`
    outermost text at the beginning with compound {{param1}} and {{param2}} variables
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1 with {{param1}} and {{param2}} variables</h1>
    outermost text in the middle with {{param1}} and {{param2}} variables
    <span>simple text without id with {{param1}} and {{param2}} variables</span>
    <span>simple text without id 2 with {{param1}} and {{param2}} variables</span>
    <span id="label-1">simple text with id and {{param1}} and {{param2}} variables</span>
    <span id="label-2">simple text with id and {{param1}} and {{param2}} variables 2</span>
    <div>
      <span>simple text within div with {{param1}} and {{param2}} variables</span> 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span> 
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div> 
    </div>
    <div>
      simple text as the first element in div with {{param1}} and {{param2}} variables
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      simple text in the middle of div with {{param1}} and {{param2}} variables 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span>
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div>
      simple text at the last element in div with {{param1}} and {{param2}} variables
    </div>
    <div id="toplevel-div">
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      <span>simple text within div 2 with {{param1}} and {{param2}} variables</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div with {{param1}} and {{param2}} variables</div>
        <div>great grandchild text within div without id with {{param1}} and {{param2}} variables</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
    </div>
    <p>A paragraph with {{param1}} is converted to {{param2}}.</p>
    <p id="paragraph">A paragraph with <b>id</b>, {{param1}}, and {{param2}} is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end with {{param1}} and {{param2}} variables
`;
      }

      static get is() { return 'compound-binding-element' }
      static get properties () {
        return {
          param1: {
            type: String,
            value: 'parameter 1'
          },
          param2: {
            type: String,
            value: 'parameter 2'
          }
        };
      }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          this.model = deepcopy(this.text.model);
        }
      }
    }
    customElements.define(CompoundBindingElement.is, CompoundBindingElement);
  }
  break;
case 'base-element':
  {
    class CompoundBindingElement extends BaseElements.I18nElement {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return html`
    outermost text at the beginning with compound {{param1}} and {{param2}} variables
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1 with {{param1}} and {{param2}} variables</h1>
    outermost text in the middle with {{param1}} and {{param2}} variables
    <span>simple text without id with {{param1}} and {{param2}} variables</span>
    <span>simple text without id 2 with {{param1}} and {{param2}} variables</span>
    <span id="label-1">simple text with id and {{param1}} and {{param2}} variables</span>
    <span id="label-2">simple text with id and {{param1}} and {{param2}} variables 2</span>
    <div>
      <span>simple text within div with {{param1}} and {{param2}} variables</span> 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span> 
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div> 
    </div>
    <div>
      simple text as the first element in div with {{param1}} and {{param2}} variables
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      simple text in the middle of div with {{param1}} and {{param2}} variables 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span>
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div>
      simple text at the last element in div with {{param1}} and {{param2}} variables
    </div>
    <div id="toplevel-div">
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      <span>simple text within div 2 with {{param1}} and {{param2}} variables</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div with {{param1}} and {{param2}} variables</div>
        <div>great grandchild text within div without id with {{param1}} and {{param2}} variables</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
    </div>
    <p>A paragraph with {{param1}} is converted to {{param2}}.</p>
    <p id="paragraph">A paragraph with <b>id</b>, {{param1}}, and {{param2}} is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end with {{param1}} and {{param2}} variables
`;
      }

      static get is() { return 'compound-binding-element' }
      static get properties () {
        return {
          param1: {
            type: String,
            value: 'parameter 1'
          },
          param2: {
            type: String,
            value: 'parameter 2'
          }
        }
      }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          this.model = deepcopy(this.text.model);
        }
      }
    }
    customElements.define(CompoundBindingElement.is, CompoundBindingElement);
  }
  break;
case 'thin':
  {
    Define = class CompoundBindingElement extends BaseElements.I18nElement {

      static get importMeta() {
        return import.meta;
      }

      static get properties () {
        return {
          param1: {
            type: String,
            value: 'parameter 1'
          },
          param2: {
            type: String,
            value: 'parameter 2'
          }
        }
      }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          this.model = deepcopy(this.text.model);
        }
      }
    };
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: html`
    outermost text at the beginning with compound {{param1}} and {{param2}} variables
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1 with {{param1}} and {{param2}} variables</h1>
    outermost text in the middle with {{param1}} and {{param2}} variables
    <span>simple text without id with {{param1}} and {{param2}} variables</span>
    <span>simple text without id 2 with {{param1}} and {{param2}} variables</span>
    <span id="label-1">simple text with id and {{param1}} and {{param2}} variables</span>
    <span id="label-2">simple text with id and {{param1}} and {{param2}} variables 2</span>
    <div>
      <span>simple text within div with {{param1}} and {{param2}} variables</span> 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span> 
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div> 
    </div>
    <div>
      simple text as the first element in div with {{param1}} and {{param2}} variables
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      simple text in the middle of div with {{param1}} and {{param2}} variables 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span>
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div>
      simple text at the last element in div with {{param1}} and {{param2}} variables
    </div>
    <div id="toplevel-div">
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      <span>simple text within div 2 with {{param1}} and {{param2}} variables</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div with {{param1}} and {{param2}} variables</div>
        <div>great grandchild text within div without id with {{param1}} and {{param2}} variables</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
    </div>
    <p>A paragraph with {{param1}} is converted to {{param2}}.</p>
    <p id="paragraph">A paragraph with <b>id</b>, {{param1}}, and {{param2}} is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end with {{param1}} and {{param2}} variables
`,

      is: 'compound-binding-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

      properties: {
        param1: {
          type: String,
          value: 'parameter 1'
        },
        param2: {
          type: String,
          value: 'parameter 2'
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

      _langUpdated: function (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (dom(e).rootTarget === this) {
          this.model = deepcopy(this.text.model);
        }
      }
    });
  }
  break;
}
