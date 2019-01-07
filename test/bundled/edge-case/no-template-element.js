/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import 'i18n-behavior/i18n-behavior.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
switch (syntax) {
default:
case 'mixin':
  {
    class NoTemplateElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
      static get importMeta() {
        return import.meta;
      }

      static get is() { return 'no-template-element' }
    }
    customElements.define(NoTemplateElement.is, NoTemplateElement);
  }
  break;
case 'base-element':
  {
    class NoTemplateElement extends BaseElements.I18nElement {
      static get importMeta() {
        return import.meta;
      }

      static get is() { return 'no-template-element' }
    }
    customElements.define(NoTemplateElement.is, NoTemplateElement);
  }
  break;
case 'thin':
  {
    Define = class NoTemplateElement extends BaseElements.I18nElement {

      static get importMeta() {
        return import.meta;
      }

    }
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
