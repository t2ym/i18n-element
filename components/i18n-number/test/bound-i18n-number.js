import '../../@polymer/polymer/polymer.js';
import '../../@polymer/iron-selector/iron-selector.js';
import { Polymer as Polymer$0 } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
/**
@license https://github.com/t2ym/i18n-number/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
Polymer$0({
  _template: Polymer.html`
    <span id="placeholder">
      <i18n-number id="num">{{number}}</i18n-number>
      <i18n-number id="num2">{{number2}}</i18n-number>
      <i18n-number id="empty"></i18n-number>
      <i18n-number id="currency" options="{{options}}">123456.789</i18n-number>
      <iron-selector id="currencySelector" attr-for-selected="value" selected="{{options.currency}}">
        <div name="USD" iron-selected="">USD</div>
        <div name="JPY">JPY</div>
      </iron-selector>
    </span>
`,

  is: 'bound-i18n-number',

  properties: {
    number: {
      type: String,
      value: '',
      notify: true
    },
    number2: {
      type: String,
      value: '12.34',
      notify: true
    },
    options: {
      type: Object,
      value: function () {
        return { 'style': 'currency', 'currency': 'USD' };
      },
      notify: true
    }
  }
});
