/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {
  html,
  bind,
  i18n
} from '../../../i18n-core.js';
export const binding = bind('get-message', import.meta);
let mutatingMessage = '';
setInterval(() => {
  mutatingMessage = Date.now();
  binding.element.fire('lang-updated', null);
}, 500);
const getMutatingMessage = () => {
  return mutatingMessage;
};
export const getMessage = () => {
  return html([
    '<!-- localizable -->',
    '<div>',
    '</div><div>',
    '</div><div>',
    '</div>'
  ], ...bind(('get-message', binding), (_bind, text, model, effectiveLang) => [
    _bind,
    text['div'],
    getMutatingMessage(),
    getMessage2()
  ], {
    'meta': {},
    'model': {},
    'div': 'message'
  }));
};
export const getMessage2 = () => {
  return html([
    '<!-- localizable -->',
    '<div>',
    '</div>'
  ], ...bind('get-message2', import.meta, (_bind, text, model, effectiveLang) => [
    _bind,
    text['div']
  ], {
    'meta': {},
    'model': {},
    'div': 'message 2'
  }));
};
binding.element.resolveUrl('');
bind('', null, () => [], {});
class DummyElement extends i18n(class DummyMixinElement extends HTMLElement {
  static get observedAttributes() {
    return ['attr'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
  }
}) {
}
customElements.define(DummyElement.is, DummyElement);
document.createElement(DummyElement.is).setAttribute('attr', 'value');
try {
  html([
    '',
    'hello'
  ], bind('invalid-template'), 1, 2, 3);
} catch (e) {
  console.log(e);
}
try {
} catch (e) {
  console.log(e);
}
customElements.define('broken-element', class extends HTMLElement {
  static get isI18n() {
    return this._isI18n = !this._isI18n;
  }
});
bind(document.createElement('broken-element'));
bind(document.createElement('broken-element'), 'broken-element') + '';
bind('invalid-binding', 1);
