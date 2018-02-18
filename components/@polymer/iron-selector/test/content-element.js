import '../iron-selector.js';
import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';
import { html } from '../../polymer/polymer.js';

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
    <iron-selector id="selector" selected="{{selected}}" selectable="[[selectable]]" attr-for-selected="id">
      <slot></slot>
    </iron-selector>
`,

  is: 'test-content-element',

  properties: {

    selectable: String,

    selected: {
      type: String,
      notify: true
    }

  },

  get selector() {
    return this.$.selector;
  }
});
