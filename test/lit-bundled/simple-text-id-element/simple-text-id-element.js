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
$_documentContainer.innerHTML = `<template id="simple-text-id-element">
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span text-id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span text-id="label-1">simple text with id</span>
    <span text-id="label-2">simple text with id 2</span>
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
    <div text-id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div text-id="second-level-div">
        <div text-id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul text-id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p text-id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
  </template>`;
switch (syntax) {
default:
case 'element-binding': {
    class SimpleTextIdElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '',
          '<div><div></div></div><!-- nested empty div -->\n    <span text-id="whitespace"> &nbsp; </span>\n    <h1>',
          '</h1>',
          '<span>',
          '</span>\n    <span>',
          '</span>\n    <span text-id="label-1">',
          '</span>\n    <span text-id="label-2">',
          '</span>\n    <div>\n      <span>',
          '</span> \n      <span>',
          '</span> \n      <div><div>',
          '</div></div> \n    </div>\n    <div>',
          '<span>',
          '</span>',
          '<span>',
          '</span>\n      <div><div>',
          '</div></div>',
          '</div>\n    <div text-id="toplevel-div">\n      <span>',
          '</span>\n      <span>',
          '</span>\n      <div text-id="second-level-div"><i18n-format lang="',
          '"><span>',
          '</span><div text-id="third-level-div" slot="1">',
          '</div><div slot="2">',
          '</div></i18n-format></div>\n    </div>\n    <div>\n      <ul>\n        <li>',
          '</li>\n        <li>',
          '</li>\n        <li>',
          '</li>\n      </ul>\n      <ul text-id="line-items"><i18n-format lang="',
          '"><span>',
          '</span><li slot="1">',
          '</li><li slot="2">',
          '</li><li slot="3">',
          '</li></i18n-format></ul>\n    </div>\n    <p><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>\n    <p text-id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>',
          ''
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
          effectiveLang,
          text['second-level-div']['0'],
          text['second-level-div']['1'],
          text['second-level-div']['2'],
          text['div_12:ul:li'],
          text['div_12:ul:li_1'],
          text['div_12:ul:li_2'],
          effectiveLang,
          text['line-items']['0'],
          text['line-items']['1'],
          text['line-items']['2'],
          text['line-items']['3'],
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
          'second-level-div': [
            ' {1}\n        {2} ',
            'great grandchild text within div',
            'great grandchild text within div without id'
          ],
          'div_12:ul:li': 'line item without id 1',
          'div_12:ul:li_1': 'line item without id 2',
          'div_12:ul:li_2': 'line item without id 3',
          'line-items': [
            ' {1}\n        {2}\n        {3} ',
            'line item with id 1',
            'line item with id 2',
            'line item with id 3'
          ],
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
        let attributesSet = new Set();
        let attributes = [];
        [].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr));
        return attributes;
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
    customElements.define(SimpleTextIdElement.is, SimpleTextIdElement);
  }
  break;
case 'name-binding': {
    class SimpleTextIdElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '',
          '<div><div></div></div><!-- nested empty div -->\n    <span text-id="whitespace"> &nbsp; </span>\n    <h1>',
          '</h1>',
          '<span>',
          '</span>\n    <span>',
          '</span>\n    <span text-id="label-1">',
          '</span>\n    <span text-id="label-2">',
          '</span>\n    <div>\n      <span>',
          '</span> \n      <span>',
          '</span> \n      <div><div>',
          '</div></div> \n    </div>\n    <div>',
          '<span>',
          '</span>',
          '<span>',
          '</span>\n      <div><div>',
          '</div></div>',
          '</div>\n    <div text-id="toplevel-div">\n      <span>',
          '</span>\n      <span>',
          '</span>\n      <div text-id="second-level-div"><i18n-format lang="',
          '"><span>',
          '</span><div text-id="third-level-div" slot="1">',
          '</div><div slot="2">',
          '</div></i18n-format></div>\n    </div>\n    <div>\n      <ul>\n        <li>',
          '</li>\n        <li>',
          '</li>\n        <li>',
          '</li>\n      </ul>\n      <ul text-id="line-items"><i18n-format lang="',
          '"><span>',
          '</span><li slot="1">',
          '</li><li slot="2">',
          '</li><li slot="3">',
          '</li></i18n-format></ul>\n    </div>\n    <p><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>\n    <p text-id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>',
          ''
        ], ...bind('simple-text-id-element', import.meta, (_bind, text, model, effectiveLang) => [
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
          effectiveLang,
          text['second-level-div']['0'],
          text['second-level-div']['1'],
          text['second-level-div']['2'],
          text['div_12:ul:li'],
          text['div_12:ul:li_1'],
          text['div_12:ul:li_2'],
          effectiveLang,
          text['line-items']['0'],
          text['line-items']['1'],
          text['line-items']['2'],
          text['line-items']['3'],
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
          'second-level-div': [
            ' {1}\n        {2} ',
            'great grandchild text within div',
            'great grandchild text within div without id'
          ],
          'div_12:ul:li': 'line item without id 1',
          'div_12:ul:li_1': 'line item without id 2',
          'div_12:ul:li_2': 'line item without id 3',
          'line-items': [
            ' {1}\n        {2}\n        {3} ',
            'line item with id 1',
            'line item with id 2',
            'line item with id 3'
          ],
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
        let attributesSet = new Set();
        let attributes = [];
        [].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr));
        return attributes;
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
    customElements.define(SimpleTextIdElement.is, SimpleTextIdElement);
  }
  break;
case 'element-name-binding': {
    class SimpleTextIdElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '',
          '<div><div></div></div><!-- nested empty div -->\n    <span text-id="whitespace"> &nbsp; </span>\n    <h1>',
          '</h1>',
          '<span>',
          '</span>\n    <span>',
          '</span>\n    <span text-id="label-1">',
          '</span>\n    <span text-id="label-2">',
          '</span>\n    <div>\n      <span>',
          '</span> \n      <span>',
          '</span> \n      <div><div>',
          '</div></div> \n    </div>\n    <div>',
          '<span>',
          '</span>',
          '<span>',
          '</span>\n      <div><div>',
          '</div></div>',
          '</div>\n    <div text-id="toplevel-div">\n      <span>',
          '</span>\n      <span>',
          '</span>\n      <div text-id="second-level-div"><i18n-format lang="',
          '"><span>',
          '</span><div text-id="third-level-div" slot="1">',
          '</div><div slot="2">',
          '</div></i18n-format></div>\n    </div>\n    <div>\n      <ul>\n        <li>',
          '</li>\n        <li>',
          '</li>\n        <li>',
          '</li>\n      </ul>\n      <ul text-id="line-items"><i18n-format lang="',
          '"><span>',
          '</span><li slot="1">',
          '</li><li slot="2">',
          '</li><li slot="3">',
          '</li></i18n-format></ul>\n    </div>\n    <p><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>\n    <p text-id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>',
          ''
        ], ...bind(this, 'simple-text-id-element', (_bind, text, model, effectiveLang) => [
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
          effectiveLang,
          text['second-level-div']['0'],
          text['second-level-div']['1'],
          text['second-level-div']['2'],
          text['div_12:ul:li'],
          text['div_12:ul:li_1'],
          text['div_12:ul:li_2'],
          effectiveLang,
          text['line-items']['0'],
          text['line-items']['1'],
          text['line-items']['2'],
          text['line-items']['3'],
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
          'second-level-div': [
            ' {1}\n        {2} ',
            'great grandchild text within div',
            'great grandchild text within div without id'
          ],
          'div_12:ul:li': 'line item without id 1',
          'div_12:ul:li_1': 'line item without id 2',
          'div_12:ul:li_2': 'line item without id 3',
          'line-items': [
            ' {1}\n        {2}\n        {3} ',
            'line item with id 1',
            'line item with id 2',
            'line item with id 3'
          ],
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
        let attributesSet = new Set();
        let attributes = [];
        [].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr));
        return attributes;
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
    customElements.define(SimpleTextIdElement.is, SimpleTextIdElement);
  }
  break;
case 'legacy': {
    Polymer({
      importMeta: import.meta,
      _template: html`
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span text-id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span text-id="label-1">simple text with id</span>
    <span text-id="label-2">simple text with id 2</span>
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
    <div text-id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div text-id="second-level-div">
        <div text-id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul text-id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p text-id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
`,
      is: 'simple-text-id-element',
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
