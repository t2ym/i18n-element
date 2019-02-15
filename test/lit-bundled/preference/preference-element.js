/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {
  render,
  svg
} from 'lit-html/lit-html.js';
import {
  html,
  i18n,
  bind
} from '../../../i18n.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';
switch (syntax) {
default:
case 'element-binding': {
    class PreferenceElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n    <span id="oldLang"></span>\n'
        ], ...bind(this, (_bind, text, model, effectiveLang) => [_bind], {
          'meta': {},
          'model': {}
        }));
      }
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.addEventListener('lang-updated', this._langUpdated);
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
            if (window.ShadyDOM) {
              ShadyDOM.flush();
            }
          });
        }
      }
      _langUpdated(e) {
        console.log(this.is, 'lang-updated', e.detail);
        this.invalidate();
        if (!this.done && e.composedPath()[0] === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          let intervalId = setInterval(() => {
            let span = this.shadowRoot.querySelector('span');
            if (span) {
              if (!e.detail.lastLang || e.detail.lastLang === 'en' || e.detail.lastLang === 'en-US') {
                if (e.detail.oldLang && e.detail.oldLang !== 'undefined' && !span.lang) {
                  span.lang = e.detail.oldLang;
                }
                console.log('oldLang=' + span.lang);
                if (span.lang) {
                  this.done = true;
                  this.fire('local-dom-ready');
                  clearInterval(intervalId);
                }
              }
            }
          }, 10);
        }
      }
    }
    customElements.define(PreferenceElement.is, PreferenceElement);
  }
  break;
case 'name-binding': {
    class PreferenceElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n    <span id="oldLang"></span>\n'
        ], ...bind('preference-element', import.meta, (_bind, text, model, effectiveLang) => [_bind], {
          'meta': {},
          'model': {}
        }));
      }
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.addEventListener('lang-updated', this._langUpdated);
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
            if (window.ShadyDOM) {
              ShadyDOM.flush();
            }
          });
        }
      }
      _langUpdated(e) {
        console.log(this.is, 'lang-updated', e.detail);
        this.invalidate();
        if (!this.done && e.composedPath()[0] === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          let intervalId = setInterval(() => {
            let span = this.shadowRoot.querySelector('span');
            if (span) {
              if (!e.detail.lastLang || e.detail.lastLang === 'en' || e.detail.lastLang === 'en-US') {
                if (e.detail.oldLang && e.detail.oldLang !== 'undefined' && !span.lang) {
                  span.lang = e.detail.oldLang;
                }
                console.log('oldLang=' + span.lang);
                if (span.lang) {
                  this.done = true;
                  this.fire('local-dom-ready');
                  clearInterval(intervalId);
                }
              }
            }
          }, 10);
        }
      }
    }
    customElements.define(PreferenceElement.is, PreferenceElement);
  }
  break;
case 'element-name-binding': {
    class PreferenceElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '\n    <span id="oldLang"></span>\n'
        ], ...bind(this, 'preference-element', (_bind, text, model, effectiveLang) => [_bind], {
          'meta': {},
          'model': {}
        }));
      }
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.addEventListener('lang-updated', this._langUpdated);
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
            if (window.ShadyDOM) {
              ShadyDOM.flush();
            }
          });
        }
      }
      _langUpdated(e) {
        console.log(this.is, 'lang-updated', e.detail);
        this.invalidate();
        if (!this.done && e.composedPath()[0] === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          let intervalId = setInterval(() => {
            let span = this.shadowRoot.querySelector('span');
            if (span) {
              if (!e.detail.lastLang || e.detail.lastLang === 'en' || e.detail.lastLang === 'en-US') {
                if (e.detail.oldLang && e.detail.oldLang !== 'undefined' && !span.lang) {
                  span.lang = e.detail.oldLang;
                }
                console.log('oldLang=' + span.lang);
                if (span.lang) {
                  this.done = true;
                  this.fire('local-dom-ready');
                  clearInterval(intervalId);
                }
              }
            }
          }, 10);
        }
      }
    }
    customElements.define(PreferenceElement.is, PreferenceElement);
  }
  break;
case 'legacy': {
    Polymer({
      importMeta: import.meta,
      _template: html`
    <span id="oldLang"></span>
`,
      is: 'preference-element',
      behaviors: [BehaviorsStore.I18nBehavior],
      listeners: { 'lang-updated': '_langUpdated' },
      _langUpdated: function (e) {
        if (dom(e).rootTarget === this) {
          console.log(e.detail);
          console.log('navigator.language = ' + navigator.language);
          if (!e.detail.lastLang || e.detail.lastLang === 'en') {
            this.$.oldLang.lang = e.detail.oldLang;
            this.fire('local-dom-ready');
          }
        }
      }
    });
  }
  break;
}
