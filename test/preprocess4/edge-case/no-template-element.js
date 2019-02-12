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
    class NoTemplateElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
    }
    customElements.define(NoTemplateElement.is, NoTemplateElement);
  }
  break;
case 'name-binding':
  {
    class NoTemplateElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
    }
    customElements.define(NoTemplateElement.is, NoTemplateElement);
  }
  break;
case 'element-name-binding':
  {
    class NoTemplateElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
    }
    customElements.define(NoTemplateElement.is, NoTemplateElement);
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,
      is: 'no-template-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ]
    });
  }
  break;
}
