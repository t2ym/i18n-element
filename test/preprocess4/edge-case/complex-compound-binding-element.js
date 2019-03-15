/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {
  render,
  nothing
} from 'lit-html/lit-html.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
  html,
  i18n,
  bind
} from '../../../i18n-core.js';
switch (syntax) {
default:
case 'element-binding': {
    class ComplexCompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      getPath(...path) {
        let value = this;
        while (path.length > 0) {
          let prop = path.shift();
          value = value[prop];
          switch (typeof value) {
          case 'undefined':
            return '';
          case 'object':
            if (value) {
              break;
            } else {
              return '';
            }
          default:
            break;
          }
        }
        return value;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n    <h5 id="item-update2"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span></i18n-format></h5>\n    <h5 id="item-update"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span><span slot="6">',
          '</span><span slot="7">',
          '</span><span slot="8">',
          '</span></i18n-format></h5>\n    <h5 id="item-update3"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span></i18n-format></h5>\n    <h5 id="item-update4"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span></i18n-format></h5>\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><code slot="2">',
          '</code></i18n-format></p>\n    <p id="paragraph2"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><b slot="2">',
          '</b><code slot="3">',
          '</code><span slot="4">',
          '</span><span slot="5">',
          '</span><span slot="6">',
          '</span></i18n-format></p>\n    <template>\n      <json-data id="authors">',
          '</json-data>\n      <span id="updated">',
          '</span>\n      <json-data id="parameters">',
          '</json-data>\n      <span text-id="if-content">',
          '</span>\n      <span text-id="if-content2">',
          '</span>\n      <span text-id="if">',
          '</span>\n      <span text-id="content">',
          '</span>\n    </template>\n'
        ], ...bind(this, (_bind, text, model, effectiveLang) => [
          _bind,
          effectiveLang,
          text['item-update2']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`${ item.name }`),
          true ? html`<span><b>${ this.getPath('text', 'if-content') }</b></span>` : nothing,
          text['item-update2']['4'],
          true ? html`${ this.getPath('text', 'if-content2') }` : nothing,
          effectiveLang,
          text['item-update']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`<!-- comment node -->
        <span>  ${ item.name }  </span>`),
          true ? html`<b>${ this.getPath('text', 'if-content') }</b>` : nothing,
          text['item-update']['4'],
          true ? this.getPath('text', 'if-content2') : nothing,
          true ? html`` : nothing,
          true ? html` <!-- comment -->` : nothing,
          true ? html`${ this.text.updated }` : nothing,
          effectiveLang,
          text['item-update3']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`${ item.name }`),
          true ? html`<b>${ this.getPath('text', 'if') }</b><b>${ this.getPath('text', 'content') }</b>` : nothing,
          text['item-update3']['4'],
          true ? html`${ this.getPath('text', 'if-content2') }` : nothing,
          effectiveLang,
          text['item-update4']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`${ item.name } = ${ this.text.updated }`),
          true ? html`<b>${ this.getPath('text', 'if-content') }</b>` : nothing,
          text['item-update4']['4'],
          true ? this.getPath('text', 'if-content2') : nothing,
          effectiveLang,
          text['paragraph']['0'],
          repeat(this.text.parameters || [], item => item, item => html`<i>${ item } </i>`),
          text['paragraph']['2'],
          effectiveLang,
          text['paragraph2']['0'],
          repeat(this.text.parameters || [], item => item, item => html`<span><i>${ item }</i> </span>`),
          text['paragraph2']['2'],
          text['paragraph2']['3'],
          false ? html`` : nothing,
          false ? html` ` : nothing,
          false ? html`${ this.text.updated }` : nothing,
          text['authors'],
          text['updated'],
          text['parameters'],
          text['if-content'],
          text['if-content2'],
          text['if'],
          text['content']
        ], {
          'meta': {},
          'model': {},
          'item-update2': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello ',
            '{{parts.0}}',
            '{{parts.1}}',
            '{{parts.2}}',
            'abc',
            '{{parts.3}}'
          ],
          'item-update': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello\n      {6}\n      {7}\n      {8} ',
            '{{parts.4}}',
            '{{parts.5}}',
            '{{parts.6}}',
            'abc',
            '{{parts.7}}',
            '{{parts.8}}',
            '{{parts.9}}',
            '{{parts.10}}'
          ],
          'item-update3': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello ',
            '{{parts.11}}',
            '{{parts.12}}',
            '{{parts.13}}',
            'abc',
            '{{parts.14}}'
          ],
          'item-update4': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello ',
            '{{parts.15}}',
            '{{parts.16}}',
            '{{parts.17}}',
            'abc',
            '{{parts.18}}'
          ],
          'paragraph': [
            'A paragraph with \n      {1}\n      is converted to \n      {2}. ',
            '{{parts.19}}',
            '<i18n-format>'
          ],
          'paragraph2': [
            'A paragraph with deep \n      {1}\n      is {2} converted to \n      {3}.\n      {4}\n      {5}\n      {6} ',
            '{{parts.20}}',
            'not',
            '<i18n-format>',
            '{{parts.21}}',
            '{{parts.22}}',
            '{{parts.23}}'
          ],
          'authors': [
            { 'name': 'Joe' },
            { 'name': 'Alice' }
          ],
          'updated': 'Jan 1st, 2016',
          'parameters': [
            'parameter 1',
            'parameter 2'
          ],
          'if-content': 'IF CONTENT',
          'if-content2': 'IF CONTENT 2',
          'if': 'IF',
          'content': 'CONTENT'
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
      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${ this.is }: _updateEffectiveLang effectiveLang="${ this.effectiveLang }" lang="${ this.lang }"`);
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
      _langUpdated(e) {
        this.invalidate();
        console.log('complex-compound-binding-element: lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        window.setTimeout(function () {
          Array.prototype.forEach.call(this.shadowRoot.querySelectorAll('i18n-format'), function (node) {
            if (!node.elements) {
              console.log('elements are missing', node);
              node.ready();
            }
            node.render();
          });
          console.log(this.is + ' local-dom-ready ');
          this.fire('local-dom-ready');
        }.bind(this), 1);
      }
    }
    customElements.define(ComplexCompoundBindingElement.is, ComplexCompoundBindingElement);
  }
  break;
case 'name-binding': {
    class ComplexCompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      getPath(...path) {
        let value = this;
        while (path.length > 0) {
          let prop = path.shift();
          value = value[prop];
          switch (typeof value) {
          case 'undefined':
            return '';
          case 'object':
            if (value) {
              break;
            } else {
              return '';
            }
          default:
            break;
          }
        }
        return value;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n    <h5 id="item-update2"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span></i18n-format></h5>\n    <h5 id="item-update"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span><span slot="6">',
          '</span><span slot="7">',
          '</span><span slot="8">',
          '</span></i18n-format></h5>\n    <h5 id="item-update3"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span></i18n-format></h5>\n    <h5 id="item-update4"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span></i18n-format></h5>\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><code slot="2">',
          '</code></i18n-format></p>\n    <p id="paragraph2"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><b slot="2">',
          '</b><code slot="3">',
          '</code><span slot="4">',
          '</span><span slot="5">',
          '</span><span slot="6">',
          '</span></i18n-format></p>\n    <template>\n      <json-data id="authors">',
          '</json-data>\n      <span id="updated">',
          '</span>\n      <json-data id="parameters">',
          '</json-data>\n      <span text-id="if-content">',
          '</span>\n      <span text-id="if-content2">',
          '</span>\n      <span text-id="if">',
          '</span>\n      <span text-id="content">',
          '</span>\n    </template>\n'
        ], ...bind('complex-compound-binding-element', import.meta, (_bind, text, model, effectiveLang) => [
          _bind,
          effectiveLang,
          text['item-update2']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`${ item.name }`),
          true ? html`<span><b>${ this.getPath('text', 'if-content') }</b></span>` : nothing,
          text['item-update2']['4'],
          true ? html`${ this.getPath('text', 'if-content2') }` : nothing,
          effectiveLang,
          text['item-update']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`<!-- comment node -->
        <span>  ${ item.name }  </span>`),
          true ? html`<b>${ this.getPath('text', 'if-content') }</b>` : nothing,
          text['item-update']['4'],
          true ? this.getPath('text', 'if-content2') : nothing,
          true ? html`` : nothing,
          true ? html` <!-- comment -->` : nothing,
          true ? html`${ this.text.updated }` : nothing,
          effectiveLang,
          text['item-update3']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`${ item.name }`),
          true ? html`<b>${ this.getPath('text', 'if') }</b><b>${ this.getPath('text', 'content') }</b>` : nothing,
          text['item-update3']['4'],
          true ? html`${ this.getPath('text', 'if-content2') }` : nothing,
          effectiveLang,
          text['item-update4']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`${ item.name } = ${ this.text.updated }`),
          true ? html`<b>${ this.getPath('text', 'if-content') }</b>` : nothing,
          text['item-update4']['4'],
          true ? this.getPath('text', 'if-content2') : nothing,
          effectiveLang,
          text['paragraph']['0'],
          repeat(this.text.parameters || [], item => item, item => html`<i>${ item } </i>`),
          text['paragraph']['2'],
          effectiveLang,
          text['paragraph2']['0'],
          repeat(this.text.parameters || [], item => item, item => html`<span><i>${ item }</i> </span>`),
          text['paragraph2']['2'],
          text['paragraph2']['3'],
          false ? html`` : nothing,
          false ? html` ` : nothing,
          false ? html`${ this.text.updated }` : nothing,
          text['authors'],
          text['updated'],
          text['parameters'],
          text['if-content'],
          text['if-content2'],
          text['if'],
          text['content']
        ], {
          'meta': {},
          'model': {},
          'item-update2': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello ',
            '{{parts.0}}',
            '{{parts.1}}',
            '{{parts.2}}',
            'abc',
            '{{parts.3}}'
          ],
          'item-update': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello\n      {6}\n      {7}\n      {8} ',
            '{{parts.4}}',
            '{{parts.5}}',
            '{{parts.6}}',
            'abc',
            '{{parts.7}}',
            '{{parts.8}}',
            '{{parts.9}}',
            '{{parts.10}}'
          ],
          'item-update3': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello ',
            '{{parts.11}}',
            '{{parts.12}}',
            '{{parts.13}}',
            'abc',
            '{{parts.14}}'
          ],
          'item-update4': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello ',
            '{{parts.15}}',
            '{{parts.16}}',
            '{{parts.17}}',
            'abc',
            '{{parts.18}}'
          ],
          'paragraph': [
            'A paragraph with \n      {1}\n      is converted to \n      {2}. ',
            '{{parts.19}}',
            '<i18n-format>'
          ],
          'paragraph2': [
            'A paragraph with deep \n      {1}\n      is {2} converted to \n      {3}.\n      {4}\n      {5}\n      {6} ',
            '{{parts.20}}',
            'not',
            '<i18n-format>',
            '{{parts.21}}',
            '{{parts.22}}',
            '{{parts.23}}'
          ],
          'authors': [
            { 'name': 'Joe' },
            { 'name': 'Alice' }
          ],
          'updated': 'Jan 1st, 2016',
          'parameters': [
            'parameter 1',
            'parameter 2'
          ],
          'if-content': 'IF CONTENT',
          'if-content2': 'IF CONTENT 2',
          'if': 'IF',
          'content': 'CONTENT'
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
      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${ this.is }: _updateEffectiveLang effectiveLang="${ this.effectiveLang }" lang="${ this.lang }"`);
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
      _langUpdated(e) {
        this.invalidate();
        console.log('complex-compound-binding-element: lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        window.setTimeout(function () {
          Array.prototype.forEach.call(this.shadowRoot.querySelectorAll('i18n-format'), function (node) {
            if (!node.elements) {
              console.log('elements are missing', node);
              node.ready();
            }
            node.render();
          });
          console.log(this.is + ' local-dom-ready ');
          this.fire('local-dom-ready');
        }.bind(this), 1);
      }
    }
    customElements.define(ComplexCompoundBindingElement.is, ComplexCompoundBindingElement);
  }
  break;
case 'element-name-binding': {
    class ComplexCompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      getPath(...path) {
        let value = this;
        while (path.length > 0) {
          let prop = path.shift();
          value = value[prop];
          switch (typeof value) {
          case 'undefined':
            return '';
          case 'object':
            if (value) {
              break;
            } else {
              return '';
            }
          default:
            break;
          }
        }
        return value;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n    <h5 id="item-update2"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span></i18n-format></h5>\n    <h5 id="item-update"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span><span slot="6">',
          '</span><span slot="7">',
          '</span><span slot="8">',
          '</span></i18n-format></h5>\n    <h5 id="item-update3"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span></i18n-format></h5>\n    <h5 id="item-update4"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><span slot="2">',
          '</span><span slot="3">',
          '</span><b slot="4">',
          '</b><span slot="5">',
          '</span></i18n-format></h5>\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><code slot="2">',
          '</code></i18n-format></p>\n    <p id="paragraph2"><i18n-format lang="',
          '"><span>',
          '</span><span slot="1">',
          '</span><b slot="2">',
          '</b><code slot="3">',
          '</code><span slot="4">',
          '</span><span slot="5">',
          '</span><span slot="6">',
          '</span></i18n-format></p>\n    <template>\n      <json-data id="authors">',
          '</json-data>\n      <span id="updated">',
          '</span>\n      <json-data id="parameters">',
          '</json-data>\n      <span text-id="if-content">',
          '</span>\n      <span text-id="if-content2">',
          '</span>\n      <span text-id="if">',
          '</span>\n      <span text-id="content">',
          '</span>\n    </template>\n'
        ], ...bind(this, 'complex-compound-binding-element', (_bind, text, model, effectiveLang) => [
          _bind,
          effectiveLang,
          text['item-update2']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`${ item.name }`),
          true ? html`<span><b>${ this.getPath('text', 'if-content') }</b></span>` : nothing,
          text['item-update2']['4'],
          true ? html`${ this.getPath('text', 'if-content2') }` : nothing,
          effectiveLang,
          text['item-update']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`<!-- comment node -->
        <span>  ${ item.name }  </span>`),
          true ? html`<b>${ this.getPath('text', 'if-content') }</b>` : nothing,
          text['item-update']['4'],
          true ? this.getPath('text', 'if-content2') : nothing,
          true ? html`` : nothing,
          true ? html` <!-- comment -->` : nothing,
          true ? html`${ this.text.updated }` : nothing,
          effectiveLang,
          text['item-update3']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`${ item.name }`),
          true ? html`<b>${ this.getPath('text', 'if') }</b><b>${ this.getPath('text', 'content') }</b>` : nothing,
          text['item-update3']['4'],
          true ? html`${ this.getPath('text', 'if-content2') }` : nothing,
          effectiveLang,
          text['item-update4']['0'],
          this.text.updated,
          repeat(this.text.authors || [], item => item, item => html`${ item.name } = ${ this.text.updated }`),
          true ? html`<b>${ this.getPath('text', 'if-content') }</b>` : nothing,
          text['item-update4']['4'],
          true ? this.getPath('text', 'if-content2') : nothing,
          effectiveLang,
          text['paragraph']['0'],
          repeat(this.text.parameters || [], item => item, item => html`<i>${ item } </i>`),
          text['paragraph']['2'],
          effectiveLang,
          text['paragraph2']['0'],
          repeat(this.text.parameters || [], item => item, item => html`<span><i>${ item }</i> </span>`),
          text['paragraph2']['2'],
          text['paragraph2']['3'],
          false ? html`` : nothing,
          false ? html` ` : nothing,
          false ? html`${ this.text.updated }` : nothing,
          text['authors'],
          text['updated'],
          text['parameters'],
          text['if-content'],
          text['if-content2'],
          text['if'],
          text['content']
        ], {
          'meta': {},
          'model': {},
          'item-update2': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello ',
            '{{parts.0}}',
            '{{parts.1}}',
            '{{parts.2}}',
            'abc',
            '{{parts.3}}'
          ],
          'item-update': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello\n      {6}\n      {7}\n      {8} ',
            '{{parts.4}}',
            '{{parts.5}}',
            '{{parts.6}}',
            'abc',
            '{{parts.7}}',
            '{{parts.8}}',
            '{{parts.9}}',
            '{{parts.10}}'
          ],
          'item-update3': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello ',
            '{{parts.11}}',
            '{{parts.12}}',
            '{{parts.13}}',
            'abc',
            '{{parts.14}}'
          ],
          'item-update4': [
            'updated: {1}, by: \n      {2}\n      xxx\n      {3}\n      {4}\n      {5}\n      hello ',
            '{{parts.15}}',
            '{{parts.16}}',
            '{{parts.17}}',
            'abc',
            '{{parts.18}}'
          ],
          'paragraph': [
            'A paragraph with \n      {1}\n      is converted to \n      {2}. ',
            '{{parts.19}}',
            '<i18n-format>'
          ],
          'paragraph2': [
            'A paragraph with deep \n      {1}\n      is {2} converted to \n      {3}.\n      {4}\n      {5}\n      {6} ',
            '{{parts.20}}',
            'not',
            '<i18n-format>',
            '{{parts.21}}',
            '{{parts.22}}',
            '{{parts.23}}'
          ],
          'authors': [
            { 'name': 'Joe' },
            { 'name': 'Alice' }
          ],
          'updated': 'Jan 1st, 2016',
          'parameters': [
            'parameter 1',
            'parameter 2'
          ],
          'if-content': 'IF CONTENT',
          'if-content2': 'IF CONTENT 2',
          'if': 'IF',
          'content': 'CONTENT'
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
      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${ this.is }: _updateEffectiveLang effectiveLang="${ this.effectiveLang }" lang="${ this.lang }"`);
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
      _langUpdated(e) {
        this.invalidate();
        console.log('complex-compound-binding-element: lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        window.setTimeout(function () {
          Array.prototype.forEach.call(this.shadowRoot.querySelectorAll('i18n-format'), function (node) {
            if (!node.elements) {
              console.log('elements are missing', node);
              node.ready();
            }
            node.render();
          });
          console.log(this.is + ' local-dom-ready ');
          this.fire('local-dom-ready');
        }.bind(this), 1);
      }
    }
    customElements.define(ComplexCompoundBindingElement.is, ComplexCompoundBindingElement);
  }
  break;
case 'legacy': {
    Polymer({
      importMeta: import.meta,
      _template: html`
    <h5 id="item-update2">updated: {{text.updated}}, by: 
      <dom-repeat items="{{text.authors}}"><template>
        {{item.name}}
      </template></dom-repeat>
      xxx
      <dom-if if="true"><template>
        <span><b>IF CONTENT</b></span>
      </template></dom-if>
      <b>abc</b>
      <dom-if if="true"><template>IF CONTENT 2</template></dom-if>
      hello
    </h5>
    <h5 id="item-update">updated: {{text.updated}}, by: 
      <dom-repeat items="{{text.authors}}"><template><!-- comment node -->
        <span>  {{item.name}}  </span>
      </template></dom-repeat>
      xxx
      <dom-if if="true"><template>
        <b>IF CONTENT</b>
      </template></dom-if>
      <b>abc</b>
      <dom-if if="true"><template>IF CONTENT 2</template></dom-if>
      hello
      <dom-if if="true"><template></template></dom-if>
      <dom-if if="true"><template> <!-- comment --></template></dom-if>
      <dom-if if="true"><template>{{text.updated}}</template></dom-if>
    </h5>
    <h5 id="item-update3">updated: {{text.updated}}, by: 
      <dom-repeat items="{{text.authors}}"><template>
        {{item.name}}
      </template></dom-repeat>
      xxx
      <dom-if if="true"><template>
        <b>IF</b><b>CONTENT</b>
      </template></dom-if>
      <b>abc</b>
      <dom-if if="true"><template>IF CONTENT 2</template></dom-if>
      hello
    </h5>
    <h5 id="item-update4">updated: {{text.updated}}, by: 
      <dom-repeat items="{{text.authors}}"><template>
        {{item.name}} = {{text.updated}}
      </template></dom-repeat>
      xxx
      <dom-if if="true"><template>
        <b>IF CONTENT</b>
      </template></dom-if>
      <b>abc</b>
      <dom-if if="true"><template>IF CONTENT 2</template></dom-if>
      hello
    </h5>
    <p id="paragraph">A paragraph with 
      <dom-repeat items="{{text.parameters}}"><template>
        <i>{{item}} </i>
      </template></dom-repeat>
      is converted to 
      <code>&lt;i18n-format&gt;</code>.
    </p>
    <p id="paragraph2">A paragraph with deep 
      <dom-repeat items="{{text.parameters}}"><template>
        <span><i>{{item}}</i> </span>
      </template></dom-repeat>
      is <b>not</b> converted to 
      <code>&lt;i18n-format&gt;</code>.
      <dom-if if="false"><template></template></dom-if>
      <dom-if if="false"><template>  </template></dom-if>
      <dom-if if="false"><template>{{text.updated}}</template></dom-if>
    </p>
    <template>
      <json-data id="authors">[
        { "name": "Joe" }, { "name": "Alice" }
      ]</json-data>
      <span id="updated">Jan 1st, 2016</span>
      <json-data id="parameters">[
        "parameter 1", "parameter 2"
      ]</json-data>
    </template>
`,
      is: 'complex-compound-binding-element',
      behaviors: [BehaviorsStore.I18nBehavior],
      listeners: { 'lang-updated': '_langUpdated' },
      _langUpdated: function (e) {
        console.log('complex-compound-binding-element: lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        window.setTimeout(function () {
          Array.prototype.forEach.call(this.root.querySelectorAll('i18n-format'), function (node) {
            if (!node.elements) {
              console.log('elements are missing', node);
              node.ready();
            }
            node.render();
          });
          console.log(this.is + ' local-dom-ready ');
          this.fire('local-dom-ready');
        }.bind(this), 1);
      }
    });
  }
  break;
}
