/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { I18nBehavior } from 'i18n-behavior/i18n-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  importMeta: import.meta,

  _template: html`
    <span id="label1">Legacy UI label 1</span><br>
    <span id="label2">Legacy UI label 2</span><br>
    <span id="label3">Legacy UI label 3</span>
`,

  is: 'i18n-legacy-element',

  behaviors: [
    I18nBehavior
  ]
});
