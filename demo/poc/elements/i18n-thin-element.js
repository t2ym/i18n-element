/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import '@polymer/polymer/polymer-element.js';

import '../../../i18n-element.js';
import '../../../define-element.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="i18n-thin-element">
  <span id="label1">Thin UI label 1</span><br>
  <span id="label2">Thin UI label 2</span><br>
  <span id="label3">Thin UI label 3</span>
</template>`;

document.head.appendChild($_documentContainer.content);
Define = class I18nThinElement extends Mixins.Logger(BaseElements.I18nElement) {
  static get importMeta() {
    return import.meta;
  }
}
