/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {
  html,
  bind
} from '../../../i18n.js';
export const binding = bind('get-message', import.meta);
let mutatingMessage = '';
setInterval(() => {
  mutatingMessage = Date.now();
  binding.element.fire('lang-updated');
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
