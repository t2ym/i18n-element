/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {
  render,
  svg
} from 'lit-html/lit-html.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
  html,
  i18n,
  bind
} from '../../../i18n.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<template id="commented-simple-text-element"><!-- comment -->
    outermost text at the beginning <!-- comment -->
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; <!-- comment --></span><!-- comment -->
    <h1>outermost header 1<!-- comment --></h1><!-- comment -->
    outermost text in the middle <!-- comment -->
    <span>simple text without id<!-- comment --></span><!-- comment -->
    <span>simple text without id 2<!-- comment --></span><!-- comment -->
    <span id="label-1">simple text with id<!-- comment --></span><!-- comment -->
    <span id="label-2">simple text with id 2<!-- comment --></span><!-- comment -->
    <div>
      <span><!-- comment -->simple text within div<!-- comment --></span> <!-- comment -->
      <span><!-- comment -->simple text within div 2<!-- comment --></span> <!-- comment -->
      <div><div>great grandchild text within div</div><!-- comment --></div> <!-- comment -->
    </div>
    <!-- comment -->
    <div>
      simple text as the first element in div <!-- comment -->
      <span>simple text within div<!-- comment --></span><!-- comment -->
      simple text in the middle of div <!-- comment -->
      <span>simple text within div 2</span><!-- comment -->
      <div><div>great grandchild text within div</div><!-- comment --></div><!-- comment -->
      simple text at the last element in div
    </div><!-- comment -->
    <div id="toplevel-div"><!-- comment -->
      <span>simple text within div</span><!-- comment -->
      <span>simple text within div 2</span><!-- comment -->
      <div id="second-level-div"><!-- comment -->
        <div id="third-level-div">great grandchild text within div<!-- comment --></div>
        <div>great grandchild text within div without id</div><!-- comment -->
      </div>
    </div>
    <div>
      <ul><!-- comment -->
        <li>line item without id 1</li><!-- comment -->
        <li>line item without id 2</li><!-- comment -->
        <li>line item without id 3</li><!-- comment -->
      </ul><!-- comment -->
      <ul id="line-items"><!-- comment -->
        <li>line item with id 1<!-- comment --></li>
        <li>line item with id 2<!-- comment --></li>
        <li>line item with id 3<!-- comment --></li>
      </ul><!-- comment -->
    </div><!-- comment -->
    <p><!-- comment -->A paragraph with <!-- comment --><b>parameters</b><!-- comment --> is converted to <!-- comment --><code>&lt;i18n-format&gt;</code><!-- comment -->.<!-- comment --></p><!-- comment -->
    <p id="paragraph"><!-- comment -->A paragraph with <!-- comment --><b>id</b><!-- comment --> is converted to <!-- comment --><code>&lt;i18n-format&gt;</code><!-- comment -->.<!-- comment --></p>
    outermost text at the end <!-- comment -->
  </template>`;
switch (syntax) {
default:
case 'element-binding': {
    class CommentedSimpleTextElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n<!-- comment -->',
          '<!-- comment -->\n    <div><div></div></div><!-- nested empty div -->\n    <span id="whitespace"> &nbsp; <!-- comment --></span><!-- comment -->\n    <h1>',
          '<!-- comment --></h1><!-- comment -->',
          '<!-- comment -->\n    <span>',
          '<!-- comment --></span><!-- comment -->\n    <span>',
          '<!-- comment --></span><!-- comment -->\n    <span id="label-1">',
          '<!-- comment --></span><!-- comment -->\n    <span id="label-2">',
          '<!-- comment --></span><!-- comment -->\n    <div>\n      <span><!-- comment -->',
          '<!-- comment --></span> <!-- comment -->\n      <span><!-- comment -->',
          '<!-- comment --></span> <!-- comment -->\n      <div><div>',
          '</div><!-- comment --></div> <!-- comment -->\n    </div>\n    <!-- comment -->\n    <div>',
          '<!-- comment -->\n      <span>',
          '<!-- comment --></span><!-- comment -->',
          '<!-- comment -->\n      <span>',
          '</span><!-- comment -->\n      <div><div>',
          '</div><!-- comment --></div><!-- comment -->',
          '</div><!-- comment -->\n    <div id="toplevel-div"><!-- comment -->\n      <span>',
          '</span><!-- comment -->\n      <span>',
          '</span><!-- comment -->\n      <div id="second-level-div"><!-- comment -->\n        <div id="third-level-div">',
          '<!-- comment --></div>\n        <div>',
          '</div><!-- comment -->\n      </div>\n    </div>\n    <div>\n      <ul><!-- comment -->\n        <li>',
          '</li><!-- comment -->\n        <li>',
          '</li><!-- comment -->\n        <li>',
          '</li><!-- comment -->\n      </ul><!-- comment -->\n      <ul id="line-items"><!-- comment -->\n        <li>',
          '<!-- comment --></li>\n        <li>',
          '<!-- comment --></li>\n        <li>',
          '<!-- comment --></li>\n      </ul><!-- comment -->\n    </div><!-- comment -->\n    <p><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p><!-- comment -->\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>',
          '<!-- comment -->\n'
        ], ...bind(this, (_bind, text, model, effectiveLang) => [
          _bind,
          text['text'],
          text['h1_3'],
          text['text_4'],
          text['span_5'],
          text['span_6'],
          text['label-1'],
          text['label-2'],
          text['div_9:span'],
          text['div_9:span_1'],
          text['div_9:div_2:div'],
          text['div_10:text'],
          text['div_10:span_1'],
          text['div_10:text_2'],
          text['div_10:span_3'],
          text['div_10:div_4:div'],
          text['div_10:text_5'],
          text['toplevel-div:span'],
          text['toplevel-div:span_1'],
          text['third-level-div'],
          text['second-level-div:div_1'],
          text['div_12:ul:li'],
          text['div_12:ul:li_1'],
          text['div_12:ul:li_2'],
          text['line-items:li'],
          text['line-items:li_1'],
          text['line-items:li_2'],
          effectiveLang,
          text['p_13']['0'],
          text['p_13']['1'],
          text['p_13']['2'],
          effectiveLang,
          text['paragraph']['0'],
          text['paragraph']['1'],
          text['paragraph']['2'],
          text['text_15']
        ], {
          'meta': {},
          'model': {},
          'text': ' outermost text at the beginning ',
          'h1_3': 'outermost header 1',
          'text_4': ' outermost text in the middle ',
          'span_5': 'simple text without id',
          'span_6': 'simple text without id 2',
          'label-1': 'simple text with id',
          'label-2': 'simple text with id 2',
          'div_9:span': 'simple text within div',
          'div_9:span_1': 'simple text within div 2',
          'div_9:div_2:div': 'great grandchild text within div',
          'div_10:text': ' simple text as the first element in div ',
          'div_10:span_1': 'simple text within div',
          'div_10:text_2': ' simple text in the middle of div ',
          'div_10:span_3': 'simple text within div 2',
          'div_10:div_4:div': 'great grandchild text within div',
          'div_10:text_5': ' simple text at the last element in div ',
          'toplevel-div:span': 'simple text within div',
          'toplevel-div:span_1': 'simple text within div 2',
          'third-level-div': 'great grandchild text within div',
          'second-level-div:div_1': 'great grandchild text within div without id',
          'div_12:ul:li': 'line item without id 1',
          'div_12:ul:li_1': 'line item without id 2',
          'div_12:ul:li_2': 'line item without id 3',
          'line-items:li': 'line item with id 1',
          'line-items:li_1': 'line item with id 2',
          'line-items:li_2': 'line item with id 3',
          'p_13': [
            'A paragraph with {1} is converted to {2}.',
            'parameters',
            '<i18n-format>'
          ],
          'paragraph': [
            'A paragraph with {1} is converted to {2}.',
            'id',
            '<i18n-format>'
          ],
          'text_15': ' outermost text at the end '
        }));
      }
      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [].forEach(attr => attributes.add(attr));
        return [...attributes];
      }
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis);
      }
      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }
      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${ this.is }: _updateEffectiveLang effectiveLang="${ this.effectiveLang }" lang="${ this.lang }" stack=${ new Error().stack }`);
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
        switch (name) {
        default:
          break;
        }
      }
    }
    customElements.define(CommentedSimpleTextElement.is, CommentedSimpleTextElement);
  }
  break;
case 'name-binding': {
    class CommentedSimpleTextElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n<!-- comment -->',
          '<!-- comment -->\n    <div><div></div></div><!-- nested empty div -->\n    <span id="whitespace"> &nbsp; <!-- comment --></span><!-- comment -->\n    <h1>',
          '<!-- comment --></h1><!-- comment -->',
          '<!-- comment -->\n    <span>',
          '<!-- comment --></span><!-- comment -->\n    <span>',
          '<!-- comment --></span><!-- comment -->\n    <span id="label-1">',
          '<!-- comment --></span><!-- comment -->\n    <span id="label-2">',
          '<!-- comment --></span><!-- comment -->\n    <div>\n      <span><!-- comment -->',
          '<!-- comment --></span> <!-- comment -->\n      <span><!-- comment -->',
          '<!-- comment --></span> <!-- comment -->\n      <div><div>',
          '</div><!-- comment --></div> <!-- comment -->\n    </div>\n    <!-- comment -->\n    <div>',
          '<!-- comment -->\n      <span>',
          '<!-- comment --></span><!-- comment -->',
          '<!-- comment -->\n      <span>',
          '</span><!-- comment -->\n      <div><div>',
          '</div><!-- comment --></div><!-- comment -->',
          '</div><!-- comment -->\n    <div id="toplevel-div"><!-- comment -->\n      <span>',
          '</span><!-- comment -->\n      <span>',
          '</span><!-- comment -->\n      <div id="second-level-div"><!-- comment -->\n        <div id="third-level-div">',
          '<!-- comment --></div>\n        <div>',
          '</div><!-- comment -->\n      </div>\n    </div>\n    <div>\n      <ul><!-- comment -->\n        <li>',
          '</li><!-- comment -->\n        <li>',
          '</li><!-- comment -->\n        <li>',
          '</li><!-- comment -->\n      </ul><!-- comment -->\n      <ul id="line-items"><!-- comment -->\n        <li>',
          '<!-- comment --></li>\n        <li>',
          '<!-- comment --></li>\n        <li>',
          '<!-- comment --></li>\n      </ul><!-- comment -->\n    </div><!-- comment -->\n    <p><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p><!-- comment -->\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>',
          '<!-- comment -->\n'
        ], ...bind('commented-simple-text-element', import.meta, (_bind, text, model, effectiveLang) => [
          _bind,
          text['text'],
          text['h1_3'],
          text['text_4'],
          text['span_5'],
          text['span_6'],
          text['label-1'],
          text['label-2'],
          text['div_9:span'],
          text['div_9:span_1'],
          text['div_9:div_2:div'],
          text['div_10:text'],
          text['div_10:span_1'],
          text['div_10:text_2'],
          text['div_10:span_3'],
          text['div_10:div_4:div'],
          text['div_10:text_5'],
          text['toplevel-div:span'],
          text['toplevel-div:span_1'],
          text['third-level-div'],
          text['second-level-div:div_1'],
          text['div_12:ul:li'],
          text['div_12:ul:li_1'],
          text['div_12:ul:li_2'],
          text['line-items:li'],
          text['line-items:li_1'],
          text['line-items:li_2'],
          effectiveLang,
          text['p_13']['0'],
          text['p_13']['1'],
          text['p_13']['2'],
          effectiveLang,
          text['paragraph']['0'],
          text['paragraph']['1'],
          text['paragraph']['2'],
          text['text_15']
        ], {
          'meta': {},
          'model': {},
          'text': ' outermost text at the beginning ',
          'h1_3': 'outermost header 1',
          'text_4': ' outermost text in the middle ',
          'span_5': 'simple text without id',
          'span_6': 'simple text without id 2',
          'label-1': 'simple text with id',
          'label-2': 'simple text with id 2',
          'div_9:span': 'simple text within div',
          'div_9:span_1': 'simple text within div 2',
          'div_9:div_2:div': 'great grandchild text within div',
          'div_10:text': ' simple text as the first element in div ',
          'div_10:span_1': 'simple text within div',
          'div_10:text_2': ' simple text in the middle of div ',
          'div_10:span_3': 'simple text within div 2',
          'div_10:div_4:div': 'great grandchild text within div',
          'div_10:text_5': ' simple text at the last element in div ',
          'toplevel-div:span': 'simple text within div',
          'toplevel-div:span_1': 'simple text within div 2',
          'third-level-div': 'great grandchild text within div',
          'second-level-div:div_1': 'great grandchild text within div without id',
          'div_12:ul:li': 'line item without id 1',
          'div_12:ul:li_1': 'line item without id 2',
          'div_12:ul:li_2': 'line item without id 3',
          'line-items:li': 'line item with id 1',
          'line-items:li_1': 'line item with id 2',
          'line-items:li_2': 'line item with id 3',
          'p_13': [
            'A paragraph with {1} is converted to {2}.',
            'parameters',
            '<i18n-format>'
          ],
          'paragraph': [
            'A paragraph with {1} is converted to {2}.',
            'id',
            '<i18n-format>'
          ],
          'text_15': ' outermost text at the end '
        }));
      }
      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [].forEach(attr => attributes.add(attr));
        return [...attributes];
      }
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis);
      }
      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }
      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${ this.is }: _updateEffectiveLang effectiveLang="${ this.effectiveLang }" lang="${ this.lang }" stack=${ new Error().stack }`);
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
        switch (name) {
        default:
          break;
        }
      }
    }
    customElements.define(CommentedSimpleTextElement.is, CommentedSimpleTextElement);
  }
  break;
case 'element-name-binding': {
    class CommentedSimpleTextElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n<!-- comment -->',
          '<!-- comment -->\n    <div><div></div></div><!-- nested empty div -->\n    <span id="whitespace"> &nbsp; <!-- comment --></span><!-- comment -->\n    <h1>',
          '<!-- comment --></h1><!-- comment -->',
          '<!-- comment -->\n    <span>',
          '<!-- comment --></span><!-- comment -->\n    <span>',
          '<!-- comment --></span><!-- comment -->\n    <span id="label-1">',
          '<!-- comment --></span><!-- comment -->\n    <span id="label-2">',
          '<!-- comment --></span><!-- comment -->\n    <div>\n      <span><!-- comment -->',
          '<!-- comment --></span> <!-- comment -->\n      <span><!-- comment -->',
          '<!-- comment --></span> <!-- comment -->\n      <div><div>',
          '</div><!-- comment --></div> <!-- comment -->\n    </div>\n    <!-- comment -->\n    <div>',
          '<!-- comment -->\n      <span>',
          '<!-- comment --></span><!-- comment -->',
          '<!-- comment -->\n      <span>',
          '</span><!-- comment -->\n      <div><div>',
          '</div><!-- comment --></div><!-- comment -->',
          '</div><!-- comment -->\n    <div id="toplevel-div"><!-- comment -->\n      <span>',
          '</span><!-- comment -->\n      <span>',
          '</span><!-- comment -->\n      <div id="second-level-div"><!-- comment -->\n        <div id="third-level-div">',
          '<!-- comment --></div>\n        <div>',
          '</div><!-- comment -->\n      </div>\n    </div>\n    <div>\n      <ul><!-- comment -->\n        <li>',
          '</li><!-- comment -->\n        <li>',
          '</li><!-- comment -->\n        <li>',
          '</li><!-- comment -->\n      </ul><!-- comment -->\n      <ul id="line-items"><!-- comment -->\n        <li>',
          '<!-- comment --></li>\n        <li>',
          '<!-- comment --></li>\n        <li>',
          '<!-- comment --></li>\n      </ul><!-- comment -->\n    </div><!-- comment -->\n    <p><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p><!-- comment -->\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>',
          '<!-- comment -->\n'
        ], ...bind(this, 'commented-simple-text-element', (_bind, text, model, effectiveLang) => [
          _bind,
          text['text'],
          text['h1_3'],
          text['text_4'],
          text['span_5'],
          text['span_6'],
          text['label-1'],
          text['label-2'],
          text['div_9:span'],
          text['div_9:span_1'],
          text['div_9:div_2:div'],
          text['div_10:text'],
          text['div_10:span_1'],
          text['div_10:text_2'],
          text['div_10:span_3'],
          text['div_10:div_4:div'],
          text['div_10:text_5'],
          text['toplevel-div:span'],
          text['toplevel-div:span_1'],
          text['third-level-div'],
          text['second-level-div:div_1'],
          text['div_12:ul:li'],
          text['div_12:ul:li_1'],
          text['div_12:ul:li_2'],
          text['line-items:li'],
          text['line-items:li_1'],
          text['line-items:li_2'],
          effectiveLang,
          text['p_13']['0'],
          text['p_13']['1'],
          text['p_13']['2'],
          effectiveLang,
          text['paragraph']['0'],
          text['paragraph']['1'],
          text['paragraph']['2'],
          text['text_15']
        ], {
          'meta': {},
          'model': {},
          'text': ' outermost text at the beginning ',
          'h1_3': 'outermost header 1',
          'text_4': ' outermost text in the middle ',
          'span_5': 'simple text without id',
          'span_6': 'simple text without id 2',
          'label-1': 'simple text with id',
          'label-2': 'simple text with id 2',
          'div_9:span': 'simple text within div',
          'div_9:span_1': 'simple text within div 2',
          'div_9:div_2:div': 'great grandchild text within div',
          'div_10:text': ' simple text as the first element in div ',
          'div_10:span_1': 'simple text within div',
          'div_10:text_2': ' simple text in the middle of div ',
          'div_10:span_3': 'simple text within div 2',
          'div_10:div_4:div': 'great grandchild text within div',
          'div_10:text_5': ' simple text at the last element in div ',
          'toplevel-div:span': 'simple text within div',
          'toplevel-div:span_1': 'simple text within div 2',
          'third-level-div': 'great grandchild text within div',
          'second-level-div:div_1': 'great grandchild text within div without id',
          'div_12:ul:li': 'line item without id 1',
          'div_12:ul:li_1': 'line item without id 2',
          'div_12:ul:li_2': 'line item without id 3',
          'line-items:li': 'line item with id 1',
          'line-items:li_1': 'line item with id 2',
          'line-items:li_2': 'line item with id 3',
          'p_13': [
            'A paragraph with {1} is converted to {2}.',
            'parameters',
            '<i18n-format>'
          ],
          'paragraph': [
            'A paragraph with {1} is converted to {2}.',
            'id',
            '<i18n-format>'
          ],
          'text_15': ' outermost text at the end '
        }));
      }
      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [].forEach(attr => attributes.add(attr));
        return [...attributes];
      }
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis);
      }
      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }
      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${ this.is }: _updateEffectiveLang effectiveLang="${ this.effectiveLang }" lang="${ this.lang }" stack=${ new Error().stack }`);
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
        switch (name) {
        default:
          break;
        }
      }
    }
    customElements.define(CommentedSimpleTextElement.is, CommentedSimpleTextElement);
  }
  break;
case 'legacy': {
    Polymer({
      importMeta: import.meta,
      _template: html`
<!-- comment -->
    outermost text at the beginning <!-- comment -->
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; <!-- comment --></span><!-- comment -->
    <h1>outermost header 1<!-- comment --></h1><!-- comment -->
    outermost text in the middle <!-- comment -->
    <span>simple text without id<!-- comment --></span><!-- comment -->
    <span>simple text without id 2<!-- comment --></span><!-- comment -->
    <span id="label-1">simple text with id<!-- comment --></span><!-- comment -->
    <span id="label-2">simple text with id 2<!-- comment --></span><!-- comment -->
    <div>
      <span><!-- comment -->simple text within div<!-- comment --></span> <!-- comment -->
      <span><!-- comment -->simple text within div 2<!-- comment --></span> <!-- comment -->
      <div><div>great grandchild text within div</div><!-- comment --></div> <!-- comment -->
    </div>
    <!-- comment -->
    <div>
      simple text as the first element in div <!-- comment -->
      <span>simple text within div<!-- comment --></span><!-- comment -->
      simple text in the middle of div <!-- comment -->
      <span>simple text within div 2</span><!-- comment -->
      <div><div>great grandchild text within div</div><!-- comment --></div><!-- comment -->
      simple text at the last element in div
    </div><!-- comment -->
    <div id="toplevel-div"><!-- comment -->
      <span>simple text within div</span><!-- comment -->
      <span>simple text within div 2</span><!-- comment -->
      <div id="second-level-div"><!-- comment -->
        <div id="third-level-div">great grandchild text within div<!-- comment --></div>
        <div>great grandchild text within div without id</div><!-- comment -->
      </div>
    </div>
    <div>
      <ul><!-- comment -->
        <li>line item without id 1</li><!-- comment -->
        <li>line item without id 2</li><!-- comment -->
        <li>line item without id 3</li><!-- comment -->
      </ul><!-- comment -->
      <ul id="line-items"><!-- comment -->
        <li>line item with id 1<!-- comment --></li>
        <li>line item with id 2<!-- comment --></li>
        <li>line item with id 3<!-- comment --></li>
      </ul><!-- comment -->
    </div><!-- comment -->
    <p><!-- comment -->A paragraph with <!-- comment --><b>parameters</b><!-- comment --> is converted to <!-- comment --><code>&lt;i18n-format&gt;</code><!-- comment -->.<!-- comment --></p><!-- comment -->
    <p id="paragraph"><!-- comment -->A paragraph with <!-- comment --><b>id</b><!-- comment --> is converted to <!-- comment --><code>&lt;i18n-format&gt;</code><!-- comment -->.<!-- comment --></p>
    outermost text at the end <!-- comment -->
`,
      is: 'commented-simple-text-element',
      behaviors: [BehaviorsStore.I18nBehavior],
      listeners: { 'lang-updated': '_langUpdated' },
      ready: function () {
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
