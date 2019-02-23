/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

import {html, bind, i18n} from '../../../i18n.js';

export const binding = bind('get-message', import.meta); // the name must be unique among the app

let mutatingMessage = '';
setInterval(() => {
  mutatingMessage = Date.now();
  binding.element.fire('lang-updated', null); // Any events other than 'lang-updated' will do as long as the user (lit-clock) can detect them
}, 500);
const getMutatingMessage = () => {
  return mutatingMessage;
};

export const getMessage = () => {
  return html`${'get-message',binding}<div>message</div><div>${getMutatingMessage()}</div><div>${getMessage2()}</div>`;
}

export const getMessage2 = () => {
  return html`${bind('get-message2', import.meta)}<div>message 2</div>`;
}

binding.element.resolveUrl('');

bind('', null, () => [], {});

class DummyElement extends i18n(class DummyMixinElement extends HTMLElement {
  static get observedAttributes() { return ['attr']; }
  attributeChangedCallback(name, oldValue, newValue) {} }) {}
customElements.define(DummyElement.is, DummyElement);
document.createElement(DummyElement.is).setAttribute('attr', 'value');

try {
  html(['', 'hello'], bind('invalid-template'), 1, 2, 3);
}
catch (e) {
  console.log(e);
}

try {
  html`${bind('invalid-message', import.meta)}<div>hello{{parts.1:invalid}}</div>`;
}
catch (e) {
  console.log(e);
}

/* broken bindings */
customElements.define('broken-element', class extends HTMLElement {
  static get isI18n() {
    return this._isI18n = !this._isI18n;
  }
});
bind(document.createElement('broken-element'));
bind(document.createElement('broken-element'), 'broken-element') + '';
bind('invalid-binding', 1);
