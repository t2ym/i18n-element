/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  importMeta: import.meta,

  _template: html`
    <span id="label">A</span>
`,

  is: 'item-element',
  behaviors: [ BehaviorsStore.I18nBehavior ]
});
