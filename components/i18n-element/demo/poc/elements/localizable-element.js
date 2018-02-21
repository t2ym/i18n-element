import '../../../../@polymer/polymer/polymer-element.js';
import '../../../i18n-element.js';
import { html } from '../../../../@polymer/polymer/polymer.js';
import { LegacyElementMixin } from '../../../../@polymer/polymer/lib/legacy/legacy-element-mixin.js';
/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
class LocalizableElement extends Mixins.Logger(Mixins.Localizable(LegacyElementMixin(HTMLElement))) {
  static get importPath() {
    return import.meta.url;
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
