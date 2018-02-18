import { html } from '../../../../@polymer/polymer/polymer.js';
import '../../../../i18n-behavior/i18n-behavior.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
Polymer({
  __template: html`
    <span id="label1">Legacy UI label 1</span><br>
    <span id="label2">Legacy UI label 2</span><br>
    <span id="label3">Legacy UI label 3</span>
`,

  get _template() {
    if (this instanceof HTMLElement && !this.constructor._templateLocalizable) {
      try {
        //console.log('import.meta', import.meta);
        //this.constructor.prototype._baseUrl = import.meta.url;
      }
      catch (e) {

      }
      this.constructor._templateLocalizable = BehaviorsStore._I18nBehavior._constructDefaultBundle(this.__template, this.is);
    }
    return this.__template;
  },

  set _template(t) {
    this.__template = t;
  },

  is: 'i18n-legacy-element',

  behaviors: [
    BehaviorsStore.I18nBehavior
  ]
});
