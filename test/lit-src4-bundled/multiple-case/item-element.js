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
    class ItemElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this)}
    <span id="label">A</span>
`;
      }

      constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.addEventListener('lang-updated', this._langUpdated); // invalidate on this 'lang-updated'
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

    }
    customElements.define(ItemElement.is, ItemElement);
  }
  break;
case 'name-binding':
  {
    class ItemElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind('item-element', import.meta)}
    <span id="label">A</span>
`;
      }

      constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.addEventListener('lang-updated', this._langUpdated); // invalidate on this 'lang-updated'
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

    }
    customElements.define(ItemElement.is, ItemElement);
  }
  break;
case 'element-name-binding':
  {
    class ItemElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this, 'item-element')}
    <span id="label">A</span>
`;
      }

      constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.addEventListener('lang-updated', this._langUpdated); // invalidate on this 'lang-updated'
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

    }
    customElements.define(ItemElement.is, ItemElement);
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: html`
    <span id="label">A</span>
`,

      is: 'item-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ]
    });
  }
  break;
}
