/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {render} from 'lit-html/lit-html.js';
import {repeat} from 'lit-html/directives/repeat.js';
import {html, i18n, bind} from '../../../i18n.js';
import './item-element.js';

switch (syntax) {
default:
case 'element-binding':
  {
    class MultipleElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this)}
          <div id="base">
            ${repeat(this.getArray(this.count), item => item, item =>
              html`<span>
                <item-element lang=${this.lang}></item-element>
              </span>`)}
          </div>
          <div id="save"></div>`;
      }

      constructor() {
        super();
        this.count = 100;
        this.attachShadow({mode: 'open'});
        this.addEventListener('lang-updated', this.langUpdated); // invalidate on this 'lang-updated'
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

      getArray(count) {
        var a = [];
        for (var i = 0; i < count; i++) {
          a.push(i);
        }
        return a;
      }

      langUpdated(e) {
        this.invalidate();
        var target = e.composedPath()[0];
        var lang = target.lang === '' ? 'en' : target.lang;
        this.itemLang = this.itemLang || {};
        if (target.tagName.toLowerCase() === 'item-element') {
          //console.log('item-element: lang-updated lang = ' + target.lang);
          this.itemLang[lang] = this.itemLang[lang] || 0;
          this.itemLang[lang]++;
        }
        /*
        console.log('multiple-element: ' + target.is + ' ' + 
                    'lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang +
                    ' itemLang[' + this.lang + '] = ' + this.itemLang[this.lang]);*/
        if (this.itemLang[this.lang] === this.count) {
          //console.log('count reached for ' + this.lang);
          //this.$.items.render();
          setTimeout(() => this.fire('local-dom-ready'), 100);
        }
        return false;
      }
    }
    customElements.define(MultipleElement.is, MultipleElement);
  }
  break;
case 'name-binding':
  {
    class MultipleElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind('multiple-element', import.meta)}
          <div id="base">
            ${repeat(this.getArray(this.count), item => item, item =>
              html`<span>
                <item-element lang=${this.lang}></item-element>
              </span>`)}
          </div>
          <div id="save"></div>`;
      }

      constructor() {
        super();
        this.count = 100;
        this.attachShadow({mode: 'open'});
        this.addEventListener('lang-updated', this.langUpdated); // invalidate on this 'lang-updated'
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

      getArray(count) {
        var a = [];
        for (var i = 0; i < count; i++) {
          a.push(i);
        }
        return a;
      }

      langUpdated(e) {
        this.invalidate();
        var target = e.composedPath()[0];
        var lang = target.lang === '' ? 'en' : target.lang;
        this.itemLang = this.itemLang || {};
        if (target.tagName.toLowerCase() === 'item-element') {
          //console.log('item-element: lang-updated lang = ' + target.lang);
          this.itemLang[lang] = this.itemLang[lang] || 0;
          this.itemLang[lang]++;
        }
        /*
        console.log('multiple-element: ' + target.is + ' ' + 
                    'lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang +
                    ' itemLang[' + this.lang + '] = ' + this.itemLang[this.lang]);*/
        if (this.itemLang[this.lang] === this.count) {
          //console.log('count reached for ' + this.lang);
          //this.$.items.render();
          setTimeout(() => this.fire('local-dom-ready'), 100);
        }
        return false;
      }
    }
    customElements.define(MultipleElement.is, MultipleElement);
  }
  break;
case 'element-name-binding':
  {
    class MultipleElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this, 'multiple-element')}
          <div id="base">
            ${repeat(this.getArray(this.count), item => item, item =>
              html`<span>
                <item-element lang=${this.lang}></item-element>
              </span>`)}
          </div>
          <div id="save"></div>`;
      }

      constructor() {
        super();
        this.count = 100;
        this.attachShadow({mode: 'open'});
        this.addEventListener('lang-updated', this.langUpdated); // invalidate on this 'lang-updated'
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

      getArray(count) {
        var a = [];
        for (var i = 0; i < count; i++) {
          a.push(i);
        }
        return a;
      }

      langUpdated(e) {
        this.invalidate();
        var target = e.composedPath()[0];
        var lang = target.lang === '' ? 'en' : target.lang;
        this.itemLang = this.itemLang || {};
        if (target.tagName.toLowerCase() === 'item-element') {
          //console.log('item-element: lang-updated lang = ' + target.lang);
          this.itemLang[lang] = this.itemLang[lang] || 0;
          this.itemLang[lang]++;
        }
        /*
        console.log('multiple-element: ' + target.is + ' ' + 
                    'lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang +
                    ' itemLang[' + this.lang + '] = ' + this.itemLang[this.lang]);*/
        if (this.itemLang[this.lang] === this.count) {
          //console.log('count reached for ' + this.lang);
          //this.$.items.render();
          setTimeout(() => this.fire('local-dom-ready'), 100);
        }
        return false;
      }
    }
    customElements.define(MultipleElement.is, MultipleElement);
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: html`
    <div id="base">
      <dom-repeat id="items" items="{{getArray(count)}}" on-dom-change="domChanged"><template>
        <span>
          <item-element lang="{{effectiveLang}}" observe-html-lang="{{observeHtmlLang}}"></item-element>
        </span>
      </template></dom-repeat>
    </div>
    <div id="save"></div>
`,

      is: 'multiple-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

      properties: {
        count: {
          type: Number,
          value: 100
        }
      },

      listeners: {
        'lang-updated': 'langUpdated'
      },

      getArray: function (count) {
        var a = [];
        for (var i = 0; i < count; i++) {
          a.push(i);
        }
        return a;
      },

      domChanged: function (e) {
        var nodes = dom(this.root).querySelectorAll('item-element');
        if (this.lang === 'en' && this.effectiveLang === '') {
          this.effectiveLang = 'en';
        }
        //console.log('multiple-element: dom-change count = ' + nodes.length + ' lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (nodes.length === this.count &&
            (this.lang === this.effectiveLang ||
             (this.effectiveLang === '' && this.lang ==='en'))) {
          Array.prototype.forEach.call(nodes, function (node) {
            this.$.save.appendChild(node);
          }.bind(this));
          //console.log('multiple-element: local-dom-ready');
          this.async(function () { this.fire('local-dom-ready'); }, 500);
        }
      },

      langUpdated: function (e) {
        var target = dom(e).rootTarget;
        var lang = target.lang === '' ? 'en' : target.lang;
        this.itemLang = this.itemLang || {};
        if (target.tagName.toLowerCase() === 'item-element') {
          //console.log('item-element: lang-updated lang = ' + target.lang);
          this.itemLang[lang] = this.itemLang[lang] || 0;
          this.itemLang[lang]++;
        }
        //console.log('multiple-element: ' + target.is + ' ' + 
        //            'lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang +
        //            ' itemLang[' + this.lang + '] = ' + this.itemLang[this.lang]);
        if (this.itemLang[this.lang] === this.count) {
          //console.log('count reached for ' + this.lang);
          this.$.items.render();
        }
        return false;
      }
    });
  }
  break;
}
