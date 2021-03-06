/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { Logger, Localizable } from '../../../i18n-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
class LocalizableElement extends Logger(Localizable(LegacyElementMixin(HTMLElement))) {
  static get importMeta() {
    return import.meta;
  }

  static get template() {
    return html`
    <span id="label1">Localizable UI label 1</span><br>
    <span id="label2">Localizable UI label 2</span><br>
    <span id="label3">Localizable UI label 3</span>
`;
  }

  static get is() { return 'localizable-element'; }
}
customElements.define(LocalizableElement.is, LocalizableElement);
