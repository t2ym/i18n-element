/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {render} from 'lit-html/lit-html.js';
import {html, i18n, bind} from '../../../i18n.js';

switch (syntax) {
default:
case 'element-binding':
  {
    class EmptyElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this)}`;
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

      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${this.is}: _updateEffectiveLang effectiveLang="${this.effectiveLang}" lang="${this.lang}"`)
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
        //case 'target-attribute': break;
        default:
          break;
        }
      }
    }
    customElements.define(EmptyElement.is, EmptyElement);
  }
  break;
case 'name-binding':
  {
    class EmptyElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind('empty-element', import.meta)}`;
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

      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${this.is}: _updateEffectiveLang effectiveLang="${this.effectiveLang}" lang="${this.lang}"`)
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
        //case 'target-attribute': break;
        default:
          break;
        }
      }
    }
    customElements.define(EmptyElement.is, EmptyElement);
  }
  break;
case 'element-name-binding':
  {
    class EmptyElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this, 'empty-element')}`;
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

      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${this.is}: _updateEffectiveLang effectiveLang="${this.effectiveLang}" lang="${this.lang}"`)
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
        //case 'target-attribute': break;
        default:
          break;
        }
      }
    }
    customElements.define(EmptyElement.is, EmptyElement);
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: html`

`,

      is: 'empty-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ]
    });
  }
  break;
}
