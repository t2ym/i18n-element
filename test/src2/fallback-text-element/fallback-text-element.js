/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import 'i18n-behavior/i18n-behavior.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="fallback-text-element">
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span id="label-1">simple text with id</span>
    <span id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
  </template>`;

document.head.appendChild($_documentContainer.content);
switch (syntax) {
default:
case 'mixin':
  {
    class FallbackTextElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return html`
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span id="label-1">simple text with id</span>
    <span id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
`;
      }

      static get is() { return 'fallback-text-element' }

      connectedCallback () {
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          this.model = deepcopy(this.text.model);
        }
      }
    }
    customElements.define(FallbackTextElement.is, FallbackTextElement);
  }
  break;
case 'base-element':
  {
    class FallbackTextElement extends BaseElements.I18nElement {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return html`
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span id="label-1">simple text with id</span>
    <span id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
`;
      }

      static get is() { return 'fallback-text-element' }

      connectedCallback () {
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
      }

      _langUpdated (e) {
        console.log(this.is, 'lang-updated', e.detail);
        if (e.composedPath()[0] === this) {
          this.model = deepcopy(this.text.model);
        }
      }
    }
    customElements.define(FallbackTextElement.is, FallbackTextElement);
  }
  break;
case 'thin':
  {
    Define = class FallbackTextElement extends BaseElements.I18nElement {
      connectedCallback () {
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
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
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span id="label-1">simple text with id</span>
    <span id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
`,

      is: 'fallback-text-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

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