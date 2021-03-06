/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import 'i18n-behavior/i18n-behavior.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="empty-element">
  </template>`;

document.head.appendChild($_documentContainer.content);
switch (syntax) {
default:
case 'mixin':
  {
    class EmptyElement extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return ((t) => { t.setAttribute("localizable-text", "embedded"); return t; })(html`

<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {}
}
</json-data>
</template>
`);
      }

      static get is() { return 'empty-element' }
    }
    customElements.define(EmptyElement.is, EmptyElement);
  }
  break;
case 'base-element':
  {
    class EmptyElement extends BaseElements.I18nElement {
      static get importMeta() {
        return import.meta;
      }

      static get template() {
        return ((t) => { t.setAttribute("localizable-text", "embedded"); return t; })(html`

<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {}
}
</json-data>
</template>
`);
      }

      static get is() { return 'empty-element' }
    }
    customElements.define(EmptyElement.is, EmptyElement);
  }
  break;
case 'thin':
  {
    Define = class EmptyElement extends BaseElements.I18nElement {

      static get importMeta() {
        return import.meta;
      }

    }
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: ((t) => { t.setAttribute("localizable-text", "embedded"); return t; })(html`

<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {}
}
</json-data>
</template>
`),

      is: 'empty-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ]
    });
  }
  break;
}
