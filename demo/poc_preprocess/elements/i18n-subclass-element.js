/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import '@polymer/polymer/polymer-element.js';

import '../../../i18n-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
    <span id="label1">{{text.label1}}</span><br>
    <span id="label2">{{text.label2}}</span><br>
    <span id="label3">{{text.label3}}</span><br>
    <span><i18n-format lang="{{effectiveLang}}"><span>{{text.span_6.0}}</span><b slot="1">{{text.span_6.1}}</b><i slot="2">{{text.span_6.2}}</i></i18n-format></span><br>
    <input placeholder="{{model.input_8.placeholder}}" i18n-attr$="{{model.input_8.i18n-attr}}">
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {
    "input_8": {
      "placeholder": "localizable attribute",
      "i18n-attr": "i18n attr"
    }
  },
  "label1": "Subclass UI label 1",
  "label2": "Subclass UI label 2",
  "label3": "Subclass UI label 3",
  "span_6": [
    "complex {1} sentences {2}",
    "parameterized",
    "abc"
  ]
}
</json-data>
</template>
`;

document.head.appendChild($_documentContainer.content);
class I18nSubclassElement extends Mixins.Logger(BaseElements.I18nElement) {
  static get importMeta() {
    return import.meta;
  }

  static get template() {
    return html`
    <span id="label1">Subclass UI label 1</span><br>
    <span id="label2">Subclass UI label 2</span><br>
    <span id="label3">Subclass UI label 3</span><br>
    <span>complex <b>parameterized</b> sentences <i>abc</i></span><br>
    <input placeholder="localizable attribute" i18n-attr="i18n attr">
`;
  }

  static get is() { return 'i18n-subclass-element'; }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('lang-updated', this._langUpdated.bind(this));
  }
  _langUpdated() {
    this.model = deepcopy(this.text.model);
  }
}
customElements.define(I18nSubclassElement.is, I18nSubclassElement);
