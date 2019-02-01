/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { Logger, I18nElement } from '../../../i18n-element.js';
import '../../../define-element.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="i18n-thin-element" basepath="elements/" localizable-text="embedded">
  <span id="label1">{{text.label1}}</span><br>
  <span id="label2">{{text.label2}}</span><br>
  <span id="label3">{{text.label3}}</span>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "label1": "Thin UI label 1",
  "label2": "Thin UI label 2",
  "label3": "Thin UI label 3"
}
</json-data>
</template>
</template>`;

document.head.appendChild($_documentContainer.content);
Define = class I18nThinElement extends Logger(I18nElement) {
  static get importMeta() {
    return import.meta;
  }
}
