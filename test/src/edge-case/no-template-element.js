/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
  importMeta: import.meta,
  is: 'no-template-element',

  behaviors: [
    BehaviorsStore.I18nBehavior
  ]
});
