/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { I18nBehavior } from 'i18n-behavior/i18n-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  importMeta: import.meta,

  _template: ((t) => { t.setAttribute("localizable-text", "embedded"); return t; })(html`
    <span id="label1">{{text.label1}}</span><br>
    <span id="label2">{{text.label2}}</span><br>
    <span id="label3">{{text.label3}}</span>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "label1": "Legacy UI label 1",
  "label2": "Legacy UI label 2",
  "label3": "Legacy UI label 3"
}
</json-data>
</template>
`),

  is: 'i18n-legacy-element',

  behaviors: [
    I18nBehavior
  ]
});
