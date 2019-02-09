/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {render, svg} from 'lit-html/lit-html.js';
import {repeat} from 'lit-html/directives/repeat.js';
import {html, i18n, bind} from '../../../i18n.js';

import deepcopy from 'deepcopy/dist/deepcopy.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="plural-gender-element">
    <p>
      <i18n-format id="compound-format-text" on-rendered="_rendered">
        <json-data>{
          "0": "You ({3}) gave no gifts.",
          "1": {
            "male": "You ({3}) gave him ({4}) {5}.",
            "female": "You ({3}) gave her ({4}) {5}.",
            "other": "You ({3}) gave them ({4}) {5}."
          },
          "one": {
            "male": "You ({3}) gave him ({4}) and one other person {5}.",
            "female": "You ({3}) gave her ({4}) and one other person {5}.",
            "other": "You ({3}) gave them ({4}) and one other person {5}."
          },
          "other": "You ({3}) gave them ({4}) and {1} other people gifts."
        }</json-data>
        <i18n-number offset="1">{{recipients.length}}</i18n-number>
        <span>{{recipients.0.gender}}</span>
        <span>{{sender.name}}</span>
        <span>{{recipients.0.name}}</span>
        <span>a gift</span>
      </i18n-format>
    </p>
  </template>`;

//document.head.appendChild($_documentContainer.content);
switch (syntax) {
default:
case 'element-binding':
  {
    class PluralGenderElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        const recipientsLength = this.recipients ? this.recipients.length : 0;
        const recipients0Gender = recipientsLength ? this.recipients[0].gender : '';
        const recipients0Name = recipientsLength ? this.recipients[0].name : '';
        const senderName = this.sender ? this.sender.name : '';
        return html`${bind(this)}
    <p>
      <i18n-format id="compound-format-text" @rendered=${this._rendered.bind(this)}>
        <json-data>{
          "0": "You ({3}) gave no gifts.",
          "1": {
            "male": "You ({3}) gave him ({4}) {5}.",
            "female": "You ({3}) gave her ({4}) {5}.",
            "other": "You ({3}) gave them ({4}) {5}."
          },
          "one": {
            "male": "You ({3}) gave him ({4}) and one other person {5}.",
            "female": "You ({3}) gave her ({4}) and one other person {5}.",
            "other": "You ({3}) gave them ({4}) and one other person {5}."
          },
          "other": "You ({3}) gave them ({4}) and {1} other people gifts."
        }</json-data>
        <i18n-number offset="1">${recipientsLength}</i18n-number>
        <span>${recipients0Gender}</span>
        <span>${senderName}</span>
        <span>${recipients0Name}</span>
        <span>a gift</span>
      </i18n-format>
    </p>
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
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
        //case 'target-attribute': break;
        default:
          break;
        }
      }

      get sender() {
        return this._sender;
      }
      set sender(value) {
        this._sender = value;
        this.invalidate();
      }
      get recipients() {
        return this._recipients;
      }
      set recipients(value) {
        this._recipients = value;
        this.invalidate();
      }

      _langUpdated(e) {
        console.log('plural-gender-element lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.renderedEffectiveLang === this.effectiveLang ||
            (!this.renderedEffectiveLang && this.effectiveLang === 'en')) {
          this.fire('local-dom-ready');
        }
        else {
          this.invalidate();
        }
      }

      _rendered() {
        console.log('plural-gender-element rendered lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.lang === this.effectiveLang) {
          this.fire('local-dom-ready');
        }
        else {
          this.renderedEffectiveLang = this.effectiveLang;
          setTimeout(() => {
            this.fire('local-dom-ready');
          }, 5000);
        }
      }
    }
    customElements.define(PluralGenderElement.is, PluralGenderElement);
  }
  break;
case 'name-binding':
  {
    class PluralGenderElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        const recipientsLength = this.recipients ? this.recipients.length : 0;
        const recipients0Gender = recipientsLength ? this.recipients[0].gender : '';
        const recipients0Name = recipientsLength ? this.recipients[0].name : '';
        const senderName = this.sender ? this.sender.name : '';
        return html`${bind('plural-gender-element', import.meta)}
    <p>
      <i18n-format id="compound-format-text" @rendered=${this._rendered.bind(this)}>
        <json-data>{
          "0": "You ({3}) gave no gifts.",
          "1": {
            "male": "You ({3}) gave him ({4}) {5}.",
            "female": "You ({3}) gave her ({4}) {5}.",
            "other": "You ({3}) gave them ({4}) {5}."
          },
          "one": {
            "male": "You ({3}) gave him ({4}) and one other person {5}.",
            "female": "You ({3}) gave her ({4}) and one other person {5}.",
            "other": "You ({3}) gave them ({4}) and one other person {5}."
          },
          "other": "You ({3}) gave them ({4}) and {1} other people gifts."
        }</json-data>
        <i18n-number offset="1">${recipientsLength}</i18n-number>
        <span>${recipients0Gender}</span>
        <span>${senderName}</span>
        <span>${recipients0Name}</span>
        <span>a gift</span>
      </i18n-format>
    </p>
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
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
        //case 'target-attribute': break;
        default:
          break;
        }
      }

      get sender() {
        return this._sender;
      }
      set sender(value) {
        this._sender = value;
        this.invalidate();
      }
      get recipients() {
        return this._recipients;
      }
      set recipients(value) {
        this._recipients = value;
        this.invalidate();
      }

      _langUpdated(e) {
        console.log('plural-gender-element lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.renderedEffectiveLang === this.effectiveLang ||
            (!this.renderedEffectiveLang && this.effectiveLang === 'en')) {
          this.fire('local-dom-ready');
        }
        else {
          this.invalidate();
        }
      }

      _rendered() {
        console.log('plural-gender-element rendered lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.lang === this.effectiveLang) {
          this.fire('local-dom-ready');
        }
        else {
          this.renderedEffectiveLang = this.effectiveLang;
          setTimeout(() => {
            this.fire('local-dom-ready');
          }, 5000);
        }
      }
    }
    customElements.define(PluralGenderElement.is, PluralGenderElement);
  }
  break;
case 'element-name-binding':
  {
    class PluralGenderElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        const recipientsLength = this.recipients ? this.recipients.length : 0;
        const recipients0Gender = recipientsLength ? this.recipients[0].gender : '';
        const recipients0Name = recipientsLength ? this.recipients[0].name : '';
        const senderName = this.sender ? this.sender.name : '';
        return html`${bind(this, 'plural-gender-element')}
    <p>
      <i18n-format id="compound-format-text" @rendered=${this._rendered.bind(this)}>
        <json-data>{
          "0": "You ({3}) gave no gifts.",
          "1": {
            "male": "You ({3}) gave him ({4}) {5}.",
            "female": "You ({3}) gave her ({4}) {5}.",
            "other": "You ({3}) gave them ({4}) {5}."
          },
          "one": {
            "male": "You ({3}) gave him ({4}) and one other person {5}.",
            "female": "You ({3}) gave her ({4}) and one other person {5}.",
            "other": "You ({3}) gave them ({4}) and one other person {5}."
          },
          "other": "You ({3}) gave them ({4}) and {1} other people gifts."
        }</json-data>
        <i18n-number offset="1">${recipientsLength}</i18n-number>
        <span>${recipients0Gender}</span>
        <span>${senderName}</span>
        <span>${recipients0Name}</span>
        <span>a gift</span>
      </i18n-format>
    </p>
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
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
        //case 'target-attribute': break;
        default:
          break;
        }
      }

      get sender() {
        return this._sender;
      }
      set sender(value) {
        this._sender = value;
        this.invalidate();
      }
      get recipients() {
        return this._recipients;
      }
      set recipients(value) {
        this._recipients = value;
        this.invalidate();
      }

      _langUpdated(e) {
        console.log('plural-gender-element lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.renderedEffectiveLang === this.effectiveLang ||
            (!this.renderedEffectiveLang && this.effectiveLang === 'en')) {
          this.fire('local-dom-ready');
        }
        else {
          this.invalidate();
        }
      }

      _rendered() {
        console.log('plural-gender-element rendered lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.lang === this.effectiveLang) {
          this.fire('local-dom-ready');
        }
        else {
          this.renderedEffectiveLang = this.effectiveLang;
          setTimeout(() => {
            this.fire('local-dom-ready');
          }, 5000);
        }
      }
    }
    customElements.define(PluralGenderElement.is, PluralGenderElement);
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: html`
    <p>
      <i18n-format id="compound-format-text" on-rendered="_rendered">
        <json-data>{
          "0": "You ({3}) gave no gifts.",
          "1": {
            "male": "You ({3}) gave him ({4}) {5}.",
            "female": "You ({3}) gave her ({4}) {5}.",
            "other": "You ({3}) gave them ({4}) {5}."
          },
          "one": {
            "male": "You ({3}) gave him ({4}) and one other person {5}.",
            "female": "You ({3}) gave her ({4}) and one other person {5}.",
            "other": "You ({3}) gave them ({4}) and one other person {5}."
          },
          "other": "You ({3}) gave them ({4}) and {1} other people gifts."
        }</json-data>
        <i18n-number offset="1">{{recipients.length}}</i18n-number>
        <span>{{recipients.0.gender}}</span>
        <span>{{sender.name}}</span>
        <span>{{recipients.0.name}}</span>
        <span>a gift</span>
      </i18n-format>
    </p>
`,

      is: 'plural-gender-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

      properties: {
        sender: {
          type: Object
        },
        recipients: {
          type: Array
        }
      },

      listeners: {
        'lang-updated': '_langUpdated'
      },

      _langUpdated: function (e) {
        console.log('plural-gender-element lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this) {
          this.model = deepcopy(this.text.model);
        }
        if (this.renderedEffectiveLang === this.effectiveLang ||
            (this.renderedEffectiveLang === '' && this.effectiveLang === 'en')) {
          this.fire('local-dom-ready');
        }
      },

      _rendered: function () {
        console.log('plural-gender-element rendered lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.lang === this.effectiveLang) {
          this.fire('local-dom-ready');
        }
        else {
          this.renderedEffectiveLang = this.effectiveLang;
        }
      }
    });
  }
  break;
}
