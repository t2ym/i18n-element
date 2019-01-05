/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import '@polymer/polymer/polymer-element.js';

import '../../../i18n-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<i18n-attr-repo>
  <template id="custom">
    <input i18n-attr="$">
  </template>
</i18n-attr-repo>`;

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
