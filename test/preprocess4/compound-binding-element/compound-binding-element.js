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
switch (syntax) {
default:
case 'element-binding': {
    class CompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '<i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><div><div></div></div><!-- nested empty div -->\n    <span id="whitespace"> &nbsp; </span>\n    <h1><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></h1><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <span id="label-1"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <span id="label-2"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <div>\n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span> \n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span> \n      <div><div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div></div> \n    </div>\n    <div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n      <div><div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div></div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div>\n    <div id="toplevel-div">\n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n      <div id="second-level-div">\n        <div id="third-level-div"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div>\n        <div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div>\n      </div>\n    </div>\n    <div>\n      <ul>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n      </ul>\n      <ul id="line-items">\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n      </ul>\n    </div>\n    <p><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></p>\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><span slot="2">',
          '</span><span slot="3">',
          '</span><code slot="4">',
          '</code></i18n-format></p><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format>'
        ], ...bind(this, (_bind, text, model, effectiveLang) => [
          _bind,
          effectiveLang,
          text['text']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['h1_3']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['text_4']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['span_5']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['span_6']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['label-1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['label-2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_9:span']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_9:span_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_9:div_2:div']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:text']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:span_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:text_2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:span_3']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:div_4:div']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:text_5']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['toplevel-div:span']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['toplevel-div:span_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['third-level-div']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['second-level-div:div_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_12:ul:li']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_12:ul:li_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_12:ul:li_2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['line-items:li']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['line-items:li_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['line-items:li_2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['p_13']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['paragraph']['0'],
          text['paragraph']['1'],
          this.param1,
          this.param2,
          text['paragraph']['4'],
          effectiveLang,
          text['text_15']['0'],
          this.param1,
          this.param2
        ], {
          'meta': {},
          'model': {},
          'text': [
            ' outermost text at the beginning with compound {1} and {2} variables ',
            '{{parts.0}}',
            '{{parts.1}}'
          ],
          'h1_3': [
            'outermost header 1 with {1} and {2} variables',
            '{{parts.2}}',
            '{{parts.3}}'
          ],
          'text_4': [
            ' outermost text in the middle with {1} and {2} variables ',
            '{{parts.4}}',
            '{{parts.5}}'
          ],
          'span_5': [
            'simple text without id with {1} and {2} variables',
            '{{parts.6}}',
            '{{parts.7}}'
          ],
          'span_6': [
            'simple text without id 2 with {1} and {2} variables',
            '{{parts.8}}',
            '{{parts.9}}'
          ],
          'label-1': [
            'simple text with id and {1} and {2} variables',
            '{{parts.10}}',
            '{{parts.11}}'
          ],
          'label-2': [
            'simple text with id and {1} and {2} variables 2',
            '{{parts.12}}',
            '{{parts.13}}'
          ],
          'div_9:span': [
            'simple text within div with {1} and {2} variables',
            '{{parts.14}}',
            '{{parts.15}}'
          ],
          'div_9:span_1': [
            'simple text within div with {1} and {2} variables 2',
            '{{parts.16}}',
            '{{parts.17}}'
          ],
          'div_9:div_2:div': [
            'great grandchild text within div with {1} and {2} variables',
            '{{parts.18}}',
            '{{parts.19}}'
          ],
          'div_10:text': [
            ' simple text as the first element in div with {1} and {2} variables ',
            '{{parts.20}}',
            '{{parts.21}}'
          ],
          'div_10:span_1': [
            'simple text within div with {1} and {2} variables',
            '{{parts.22}}',
            '{{parts.23}}'
          ],
          'div_10:text_2': [
            ' simple text in the middle of div with {1} and {2} variables ',
            '{{parts.24}}',
            '{{parts.25}}'
          ],
          'div_10:span_3': [
            'simple text within div with {1} and {2} variables 2',
            '{{parts.26}}',
            '{{parts.27}}'
          ],
          'div_10:div_4:div': [
            'great grandchild text within div with {1} and {2} variables',
            '{{parts.28}}',
            '{{parts.29}}'
          ],
          'div_10:text_5': [
            ' simple text at the last element in div with {1} and {2} variables ',
            '{{parts.30}}',
            '{{parts.31}}'
          ],
          'toplevel-div:span': [
            'simple text within div with {1} and {2} variables',
            '{{parts.32}}',
            '{{parts.33}}'
          ],
          'toplevel-div:span_1': [
            'simple text within div 2 with {1} and {2} variables',
            '{{parts.34}}',
            '{{parts.35}}'
          ],
          'third-level-div': [
            'great grandchild text within div with {1} and {2} variables',
            '{{parts.36}}',
            '{{parts.37}}'
          ],
          'second-level-div:div_1': [
            'great grandchild text within div without id with {1} and {2} variables',
            '{{parts.38}}',
            '{{parts.39}}'
          ],
          'div_12:ul:li': [
            'line item without id 1 with {1} and {2} variables',
            '{{parts.40}}',
            '{{parts.41}}'
          ],
          'div_12:ul:li_1': [
            'line item without id 2 with {1} and {2} variables',
            '{{parts.42}}',
            '{{parts.43}}'
          ],
          'div_12:ul:li_2': [
            'line item without id 3 with {1} and {2} variables',
            '{{parts.44}}',
            '{{parts.45}}'
          ],
          'line-items:li': [
            'line item with id 1 with {1} and {2} variables',
            '{{parts.46}}',
            '{{parts.47}}'
          ],
          'line-items:li_1': [
            'line item with id 2 with {1} and {2} variables',
            '{{parts.48}}',
            '{{parts.49}}'
          ],
          'line-items:li_2': [
            'line item with id 3 with {1} and {2} variables',
            '{{parts.50}}',
            '{{parts.51}}'
          ],
          'p_13': [
            'A paragraph with {1} is converted to {2}.',
            '{{parts.52}}',
            '{{parts.53}}'
          ],
          'paragraph': [
            'A paragraph with {1}, {2}, and {3} is converted to {4}.',
            'id',
            '{{parts.54}}',
            '{{parts.55}}',
            '<i18n-format>'
          ],
          'text_15': [
            ' outermost text at the end with {1} and {2} variables ',
            '{{parts.56}}',
            '{{parts.57}}'
          ]
        }));
      }
      static get observedAttributes() {
        let attributesSet = new Set();
        let attributes = [];
        [].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr));
        return attributes;
      }
      get param1() {
        return this._param1;
      }
      set param1(value) {
        this._param1 = value;
        this.invalidate();
      }
      get param2() {
        return this._param2;
      }
      set param2(value) {
        this._param2 = value;
        this.invalidate();
      }
      constructor() {
        super();
        this.param1 = 'parameter 1';
        this.param2 = 'parameter 2';
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
    customElements.define(CompoundBindingElement.is, CompoundBindingElement);
  }
  break;
case 'name-binding': {
    class CompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '<i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><div><div></div></div><!-- nested empty div -->\n    <span id="whitespace"> &nbsp; </span>\n    <h1><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></h1><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <span id="label-1"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <span id="label-2"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <div>\n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span> \n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span> \n      <div><div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div></div> \n    </div>\n    <div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n      <div><div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div></div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div>\n    <div id="toplevel-div">\n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n      <div id="second-level-div">\n        <div id="third-level-div"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div>\n        <div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div>\n      </div>\n    </div>\n    <div>\n      <ul>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n      </ul>\n      <ul id="line-items">\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n      </ul>\n    </div>\n    <p><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></p>\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><span slot="2">',
          '</span><span slot="3">',
          '</span><code slot="4">',
          '</code></i18n-format></p><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format>'
        ], ...bind('compound-binding-element', import.meta, (_bind, text, model, effectiveLang) => [
          _bind,
          effectiveLang,
          text['text']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['h1_3']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['text_4']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['span_5']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['span_6']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['label-1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['label-2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_9:span']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_9:span_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_9:div_2:div']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:text']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:span_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:text_2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:span_3']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:div_4:div']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:text_5']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['toplevel-div:span']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['toplevel-div:span_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['third-level-div']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['second-level-div:div_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_12:ul:li']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_12:ul:li_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_12:ul:li_2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['line-items:li']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['line-items:li_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['line-items:li_2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['p_13']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['paragraph']['0'],
          text['paragraph']['1'],
          this.param1,
          this.param2,
          text['paragraph']['4'],
          effectiveLang,
          text['text_15']['0'],
          this.param1,
          this.param2
        ], {
          'meta': {},
          'model': {},
          'text': [
            ' outermost text at the beginning with compound {1} and {2} variables ',
            '{{parts.0}}',
            '{{parts.1}}'
          ],
          'h1_3': [
            'outermost header 1 with {1} and {2} variables',
            '{{parts.2}}',
            '{{parts.3}}'
          ],
          'text_4': [
            ' outermost text in the middle with {1} and {2} variables ',
            '{{parts.4}}',
            '{{parts.5}}'
          ],
          'span_5': [
            'simple text without id with {1} and {2} variables',
            '{{parts.6}}',
            '{{parts.7}}'
          ],
          'span_6': [
            'simple text without id 2 with {1} and {2} variables',
            '{{parts.8}}',
            '{{parts.9}}'
          ],
          'label-1': [
            'simple text with id and {1} and {2} variables',
            '{{parts.10}}',
            '{{parts.11}}'
          ],
          'label-2': [
            'simple text with id and {1} and {2} variables 2',
            '{{parts.12}}',
            '{{parts.13}}'
          ],
          'div_9:span': [
            'simple text within div with {1} and {2} variables',
            '{{parts.14}}',
            '{{parts.15}}'
          ],
          'div_9:span_1': [
            'simple text within div with {1} and {2} variables 2',
            '{{parts.16}}',
            '{{parts.17}}'
          ],
          'div_9:div_2:div': [
            'great grandchild text within div with {1} and {2} variables',
            '{{parts.18}}',
            '{{parts.19}}'
          ],
          'div_10:text': [
            ' simple text as the first element in div with {1} and {2} variables ',
            '{{parts.20}}',
            '{{parts.21}}'
          ],
          'div_10:span_1': [
            'simple text within div with {1} and {2} variables',
            '{{parts.22}}',
            '{{parts.23}}'
          ],
          'div_10:text_2': [
            ' simple text in the middle of div with {1} and {2} variables ',
            '{{parts.24}}',
            '{{parts.25}}'
          ],
          'div_10:span_3': [
            'simple text within div with {1} and {2} variables 2',
            '{{parts.26}}',
            '{{parts.27}}'
          ],
          'div_10:div_4:div': [
            'great grandchild text within div with {1} and {2} variables',
            '{{parts.28}}',
            '{{parts.29}}'
          ],
          'div_10:text_5': [
            ' simple text at the last element in div with {1} and {2} variables ',
            '{{parts.30}}',
            '{{parts.31}}'
          ],
          'toplevel-div:span': [
            'simple text within div with {1} and {2} variables',
            '{{parts.32}}',
            '{{parts.33}}'
          ],
          'toplevel-div:span_1': [
            'simple text within div 2 with {1} and {2} variables',
            '{{parts.34}}',
            '{{parts.35}}'
          ],
          'third-level-div': [
            'great grandchild text within div with {1} and {2} variables',
            '{{parts.36}}',
            '{{parts.37}}'
          ],
          'second-level-div:div_1': [
            'great grandchild text within div without id with {1} and {2} variables',
            '{{parts.38}}',
            '{{parts.39}}'
          ],
          'div_12:ul:li': [
            'line item without id 1 with {1} and {2} variables',
            '{{parts.40}}',
            '{{parts.41}}'
          ],
          'div_12:ul:li_1': [
            'line item without id 2 with {1} and {2} variables',
            '{{parts.42}}',
            '{{parts.43}}'
          ],
          'div_12:ul:li_2': [
            'line item without id 3 with {1} and {2} variables',
            '{{parts.44}}',
            '{{parts.45}}'
          ],
          'line-items:li': [
            'line item with id 1 with {1} and {2} variables',
            '{{parts.46}}',
            '{{parts.47}}'
          ],
          'line-items:li_1': [
            'line item with id 2 with {1} and {2} variables',
            '{{parts.48}}',
            '{{parts.49}}'
          ],
          'line-items:li_2': [
            'line item with id 3 with {1} and {2} variables',
            '{{parts.50}}',
            '{{parts.51}}'
          ],
          'p_13': [
            'A paragraph with {1} is converted to {2}.',
            '{{parts.52}}',
            '{{parts.53}}'
          ],
          'paragraph': [
            'A paragraph with {1}, {2}, and {3} is converted to {4}.',
            'id',
            '{{parts.54}}',
            '{{parts.55}}',
            '<i18n-format>'
          ],
          'text_15': [
            ' outermost text at the end with {1} and {2} variables ',
            '{{parts.56}}',
            '{{parts.57}}'
          ]
        }));
      }
      static get observedAttributes() {
        let attributesSet = new Set();
        let attributes = [];
        [].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr));
        return attributes;
      }
      get param1() {
        return this._param1;
      }
      set param1(value) {
        this._param1 = value;
        this.invalidate();
      }
      get param2() {
        return this._param2;
      }
      set param2(value) {
        this._param2 = value;
        this.invalidate();
      }
      constructor() {
        super();
        this.param1 = 'parameter 1';
        this.param2 = 'parameter 2';
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
    customElements.define(CompoundBindingElement.is, CompoundBindingElement);
  }
  break;
case 'element-name-binding': {
    class CompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '<i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><div><div></div></div><!-- nested empty div -->\n    <span id="whitespace"> &nbsp; </span>\n    <h1><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></h1><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <span id="label-1"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <span id="label-2"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n    <div>\n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span> \n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span> \n      <div><div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div></div> \n    </div>\n    <div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format><span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n      <div><div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div></div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div>\n    <div id="toplevel-div">\n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n      <span><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></span>\n      <div id="second-level-div">\n        <div id="third-level-div"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div>\n        <div><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></div>\n      </div>\n    </div>\n    <div>\n      <ul>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n      </ul>\n      <ul id="line-items">\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n        <li><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></li>\n      </ul>\n    </div>\n    <p><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format></p>\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><span slot="2">',
          '</span><span slot="3">',
          '</span><code slot="4">',
          '</code></i18n-format></p><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span></i18n-format>'
        ], ...bind(this, 'compound-binding-element', (_bind, text, model, effectiveLang) => [
          _bind,
          effectiveLang,
          text['text']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['h1_3']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['text_4']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['span_5']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['span_6']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['label-1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['label-2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_9:span']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_9:span_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_9:div_2:div']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:text']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:span_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:text_2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:span_3']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:div_4:div']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_10:text_5']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['toplevel-div:span']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['toplevel-div:span_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['third-level-div']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['second-level-div:div_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_12:ul:li']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_12:ul:li_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['div_12:ul:li_2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['line-items:li']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['line-items:li_1']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['line-items:li_2']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['p_13']['0'],
          this.param1,
          this.param2,
          effectiveLang,
          text['paragraph']['0'],
          text['paragraph']['1'],
          this.param1,
          this.param2,
          text['paragraph']['4'],
          effectiveLang,
          text['text_15']['0'],
          this.param1,
          this.param2
        ], {
          'meta': {},
          'model': {},
          'text': [
            ' outermost text at the beginning with compound {1} and {2} variables ',
            '{{parts.0}}',
            '{{parts.1}}'
          ],
          'h1_3': [
            'outermost header 1 with {1} and {2} variables',
            '{{parts.2}}',
            '{{parts.3}}'
          ],
          'text_4': [
            ' outermost text in the middle with {1} and {2} variables ',
            '{{parts.4}}',
            '{{parts.5}}'
          ],
          'span_5': [
            'simple text without id with {1} and {2} variables',
            '{{parts.6}}',
            '{{parts.7}}'
          ],
          'span_6': [
            'simple text without id 2 with {1} and {2} variables',
            '{{parts.8}}',
            '{{parts.9}}'
          ],
          'label-1': [
            'simple text with id and {1} and {2} variables',
            '{{parts.10}}',
            '{{parts.11}}'
          ],
          'label-2': [
            'simple text with id and {1} and {2} variables 2',
            '{{parts.12}}',
            '{{parts.13}}'
          ],
          'div_9:span': [
            'simple text within div with {1} and {2} variables',
            '{{parts.14}}',
            '{{parts.15}}'
          ],
          'div_9:span_1': [
            'simple text within div with {1} and {2} variables 2',
            '{{parts.16}}',
            '{{parts.17}}'
          ],
          'div_9:div_2:div': [
            'great grandchild text within div with {1} and {2} variables',
            '{{parts.18}}',
            '{{parts.19}}'
          ],
          'div_10:text': [
            ' simple text as the first element in div with {1} and {2} variables ',
            '{{parts.20}}',
            '{{parts.21}}'
          ],
          'div_10:span_1': [
            'simple text within div with {1} and {2} variables',
            '{{parts.22}}',
            '{{parts.23}}'
          ],
          'div_10:text_2': [
            ' simple text in the middle of div with {1} and {2} variables ',
            '{{parts.24}}',
            '{{parts.25}}'
          ],
          'div_10:span_3': [
            'simple text within div with {1} and {2} variables 2',
            '{{parts.26}}',
            '{{parts.27}}'
          ],
          'div_10:div_4:div': [
            'great grandchild text within div with {1} and {2} variables',
            '{{parts.28}}',
            '{{parts.29}}'
          ],
          'div_10:text_5': [
            ' simple text at the last element in div with {1} and {2} variables ',
            '{{parts.30}}',
            '{{parts.31}}'
          ],
          'toplevel-div:span': [
            'simple text within div with {1} and {2} variables',
            '{{parts.32}}',
            '{{parts.33}}'
          ],
          'toplevel-div:span_1': [
            'simple text within div 2 with {1} and {2} variables',
            '{{parts.34}}',
            '{{parts.35}}'
          ],
          'third-level-div': [
            'great grandchild text within div with {1} and {2} variables',
            '{{parts.36}}',
            '{{parts.37}}'
          ],
          'second-level-div:div_1': [
            'great grandchild text within div without id with {1} and {2} variables',
            '{{parts.38}}',
            '{{parts.39}}'
          ],
          'div_12:ul:li': [
            'line item without id 1 with {1} and {2} variables',
            '{{parts.40}}',
            '{{parts.41}}'
          ],
          'div_12:ul:li_1': [
            'line item without id 2 with {1} and {2} variables',
            '{{parts.42}}',
            '{{parts.43}}'
          ],
          'div_12:ul:li_2': [
            'line item without id 3 with {1} and {2} variables',
            '{{parts.44}}',
            '{{parts.45}}'
          ],
          'line-items:li': [
            'line item with id 1 with {1} and {2} variables',
            '{{parts.46}}',
            '{{parts.47}}'
          ],
          'line-items:li_1': [
            'line item with id 2 with {1} and {2} variables',
            '{{parts.48}}',
            '{{parts.49}}'
          ],
          'line-items:li_2': [
            'line item with id 3 with {1} and {2} variables',
            '{{parts.50}}',
            '{{parts.51}}'
          ],
          'p_13': [
            'A paragraph with {1} is converted to {2}.',
            '{{parts.52}}',
            '{{parts.53}}'
          ],
          'paragraph': [
            'A paragraph with {1}, {2}, and {3} is converted to {4}.',
            'id',
            '{{parts.54}}',
            '{{parts.55}}',
            '<i18n-format>'
          ],
          'text_15': [
            ' outermost text at the end with {1} and {2} variables ',
            '{{parts.56}}',
            '{{parts.57}}'
          ]
        }));
      }
      static get observedAttributes() {
        let attributesSet = new Set();
        let attributes = [];
        [].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr));
        return attributes;
      }
      get param1() {
        return this._param1;
      }
      set param1(value) {
        this._param1 = value;
        this.invalidate();
      }
      get param2() {
        return this._param2;
      }
      set param2(value) {
        this._param2 = value;
        this.invalidate();
      }
      constructor() {
        super();
        this.param1 = 'parameter 1';
        this.param2 = 'parameter 2';
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
    customElements.define(CompoundBindingElement.is, CompoundBindingElement);
  }
  break;
case 'legacy': {
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
      behaviors: [BehaviorsStore.I18nBehavior],
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
