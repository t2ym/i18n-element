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

$_documentContainer.innerHTML = `<template id="null-template-default-lang-element" lang="">
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
    class NullTemplateDefaultLangElement extends Mixins.Logger(Mixins.Localizable(LegacyElementMixin(HTMLElement))) {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return ((t) => { t.setAttribute("lang", ""); return t; })(html`
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
`);
      }

      static get is() { return 'null-template-default-lang-element'; }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated(e) {
        if (e.composedPath()[0] === this && this.text) {
          this.model = deepcopy(this.text.model);
        }
      }
    }
    customElements.define(NullTemplateDefaultLangElement.is, NullTemplateDefaultLangElement);
  }
  break;
case 'base-element':
  {
    class NullTemplateDefaultLangElement extends BaseElements.I18nElement {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return ((t) => { t.setAttribute("lang", ""); return t; })(html`
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
`);
      }

      static get is() { return 'null-template-default-lang-element'; }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated(e) {
        if (e.composedPath()[0] === this && this.text) {
          this.model = deepcopy(this.text.model);
        }
      }
    }
    customElements.define(NullTemplateDefaultLangElement.is, NullTemplateDefaultLangElement);
  }
  break;
case 'thin':
  {
    Define = class NullTemplateDefaultLangElement extends BaseElements.I18nElement {

      static get importMeta() {
        return import.meta;
      }

      ready() {
        this.addEventListener('lang-updated', this._langUpdated);
        super.ready();
      }

      _langUpdated(e) {
        if (e.composedPath()[0] === this && this.text) {
          this.model = deepcopy(this.text.model);
        }
      }
    }
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: ((t) => { t.setAttribute("lang", ""); return t; })(html`
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
`),

      is: 'null-template-default-lang-element',

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
        if (dom(e).rootTarget === this && this.text) {
          this.model = deepcopy(this.text.model);
        }
      }
    });
  }
  break;
}
