/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import './i18n-element.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';

// i18n-dom-bind based on Polymer/polymer#2.0-preview src/templatizer/dom-bind.html
class I18nDomBind extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
  static get importMeta() {
    return import.meta;
  }

  static get is() { return 'i18n-dom-bind'; }

  connectedCallback() {
    this._fetchStatus = deepcopy({ // per custom element
      fetchingInstance: null,
      ajax: null,
      ajaxLang: null,
      lastLang: null,
      fallbackLanguageList: null,
      targetLang: null,
      lastResponse: {},
      rawResponses: {}
    });
    this.render();
  }

  disconnectedCallback() {
    this._removeChildren();
  }

  _insertChildren() {
    if (this._children) {
      for (var i=0; i<this._children.length; i++) {
        this.parentNode.insertBefore(this._children[i], this);
      }
    }
  }

  _removeChildren() {
    if (this._children) {
      for (var i=0; i<this._children.length; i++) {
        this.stamped.appendChild(this._children[i]);
      }
    }
  }

  render() {
    if (!this._children) {
      var template = this.querySelector('template');
      if (!template) {
        throw new Error('i18n-dom-bind requires a <template> child');
      }
      this._templateLocalizable = this._constructDefaultBundle(template);
      this._bindTemplate(template);
      this.root = this._stampTemplate(template);
      this.stamped = this.root;
      this._children = [];
      for (var n=this.root.firstChild; n; n=n.nextSibling) {
        this._children[this._children.length] = n;
      }
      /* Issue #4 is no longer reproducible
      for (var prop in this.__dataProto) {
        this[prop] = this.__dataProto[prop];
      }
      */
      if (typeof this._enableProperties === 'function') {
        this._enableProperties(this);
      }
      else if (typeof this._flushProperties === 'function') {
        /* For backward compatibility with Polymer 2.0.0-rc.8 and earlier */
        this._flushProperties(this);
      }
    }
    this._insertChildren();
    this.dispatchEvent(new CustomEvent('dom-change'));
  }
}
customElements.define(I18nDomBind.is, I18nDomBind);
