import '../../../i18n-behavior.js';
import { Polymer as Polymer$0 } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
switch (syntax) {
default:
case 'mixin':
  {
    class NoTemplateElement extends Mixins.Localizable(Polymer.LegacyElement) {
      static get is() { return 'no-template-element' }
    }
    customElements.define(NoTemplateElement.is, NoTemplateElement);
  }
  break;
case 'base-element':
  {
    class NoTemplateElement extends BaseElements.I18nElement {
      static get is() { return 'no-template-element' }
    }
    customElements.define(NoTemplateElement.is, NoTemplateElement);
  }
  break;
case 'thin':
  {
    Define = class NoTemplateElement extends BaseElements.I18nElement {
    }
  }
  break;
case 'legacy':
  {
    Polymer$0({
      is: 'no-template-element',
      behaviors: [
        BehaviorsStore.I18nBehavior
      ]
    });
  }
  break;
}
