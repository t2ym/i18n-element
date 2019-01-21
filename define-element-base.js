/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* define-element-base.js: Base framwork of shortcut syntax for customElements.define */

export function UncamelCase (name) {
  return name
    // insert a hyphen between lower & upper
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    // space before last upper in a sequence followed by lower
    .replace(/\b([A-Z]+)([A-Z])([a-z0-9])/, '$1 $2$3')
    // replace spaces with hyphens
    .replace(/ /g, '-')
    // lowercase
    .toLowerCase();
}

export function functionName (func) {
  return typeof func === 'function'
    ? func.toString().replace(/^[\S\s]*?function\s*/, "").replace(/[\s\(\/][\S\s]+$/, "")
    : undefined;
}

export function getDefine (id) {
  return customElements.get(id);
}

export function getId (proto) {
  let name = proto.hasOwnProperty('name') ? proto.name : functionName(proto);
  if (name === 'Define' || name === 'class') {
    name = '';
  }
  return name ? UncamelCase(name) : proto.is;
}

export function defineDefineProperty (_plugins = [], _Define = getDefine, _getId = getId) {
  let descriptor;
  if (!window.Define) {
    Object.defineProperty(window, 'Define', descriptor = {
      configurable: false,
      enumerable: false,
      get: function () {
        return _Define;
      },
      set: function (proto) {
        let id = _getId(proto);
        if (!id) {
          throw new Error('Custom element name is not defined');
        }

        _plugins.forEach(plugin => plugin(proto, id));

        // register Custom Element
        if (customElements.get(id)) {
          console.warn('Discarding duplicate definition of custom element ' + id);
        }
        else {
          customElements.define(id, proto);
          _Define[id] = customElements.get(id);
        }
        return customElements.get(id);
      }
    });
  }
  return descriptor;
}
