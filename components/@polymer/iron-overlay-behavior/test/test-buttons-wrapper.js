import { html } from '../../polymer/polymer.js';
import './test-buttons.js';
import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        border: 1px solid gray;
        padding: 10px;
      }
    </style>

    <select id="select">
      <option>1</option>
    </select>
    <test-buttons id="wrapped">
      <slot></slot>
    </test-buttons>
    <div tabindex="0" id="focusableDiv">Focusable div</div>
`,

  is: 'test-buttons-wrapper'
});
