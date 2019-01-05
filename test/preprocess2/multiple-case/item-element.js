/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import 'i18n-behavior/i18n-behavior.js';

import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="item-element" basepath="multiple-case/" localizable-text="embedded">
    <span id="label">{{text.label}}</span>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "label": "A"
}
</json-data>
</template>
</template><dom-module id="item-element" legacy="">
  <template localizable-text="embedded">
    <span id="label">{{text.label}}</span>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "label": "A"
}
</json-data>
</template>
</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
switch (syntax) {
default:
case 'mixin':
  {
    class ItemElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
      static get importMeta() {
        return import.meta;
      }

      static get is() { return 'item-element' }
    }
    customElements.define(ItemElement.is, ItemElement);
  }
  break;
case 'base-element':
  {
    class ItemElement extends BaseElements.I18nElement {
      static get importMeta() {
        return import.meta;
      }

      static get is() { return 'item-element' }
    }
    customElements.define(ItemElement.is, ItemElement);
  }
  break;
case 'thin':
  {
    Define = class ItemElement extends BaseElements.I18nElement {
    }
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,
      is: 'item-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ]
    });
  }
  break;
}
