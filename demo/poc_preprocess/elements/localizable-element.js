/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import '@polymer/polymer/polymer-element.js';

import '../../../i18n-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
class LocalizableElement extends Mixins.Logger(Mixins.Localizable(LegacyElementMixin(HTMLElement))) {
  static get importMeta() {
    return import.meta;
  }

  static get template() {
    return ((t) => { t.setAttribute("localizable-text", "embedded"); return t; })(html`
    <span id="label1">{{text.label1}}</span><br>
    <span id="label2">{{text.label2}}</span><br>
    <span id="label3">{{text.label3}}</span>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "label1": "Localizable UI label 1",
  "label2": "Localizable UI label 2",
  "label3": "Localizable UI label 3"
}
</json-data>
</template>
`);
  }

  static get is() { return 'localizable-element'; }
}
customElements.define(LocalizableElement.is, LocalizableElement);
