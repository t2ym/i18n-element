/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* define-element-plain.js: Shortcut syntax for customElements.define without Polymer dependency */
import { defineDefineProperty } from './define-element-base.js';

/*
  Define = class Is {}
  Define = class { is }
*/
defineDefineProperty();
