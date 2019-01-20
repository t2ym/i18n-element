/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* define-element.js: Shortcut syntax for customElements.define */
import '@polymer/polymer/polymer-element.js';
import { DomModule } from '@polymer/polymer/lib/elements/dom-module.js';

function UncamelCase (name) {
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
function functionName (func) {
  return typeof func === 'function' ? 
          func.toString().replace(/^[\S\s]*?function\s*/, "").replace(/[\s\(\/][\S\s]+$/, "") :
          undefined;
}
var _Define = function (id) {
  return customElements.get(id);
};
if (!window.Define) {
  Object.defineProperty(window, 'Define', {
    get: function () {
      return _Define;
    },
    set: function (proto) {
      /*
        document.template id; Define = class Is {}
        document.template id; Define = class { is }
        Define Is { template }
        Define { is, template }
      */
      let name = proto.hasOwnProperty('name') ? proto.name : functionName(proto);
      if (name === 'Define' || name === 'class') {
        name = '';
      }
      let id = name ? UncamelCase(name) : proto.is;
      let template = proto.template;
      let baseURI = proto.importMeta ? proto.importMeta.url : document.baseURI;
      let _template = DomModule.import(id, 'template');

      template = template || _template;
      if (id && !template) {
        let current = null;
        template = document.querySelector('template[id=' + id + ']');
        if (!template) {
          template = document.createElement('template');
          template.setAttribute('id', id);
          console.warn('define-element.js: ' + id + ' has no template. Supplying an empty template');
        }
      }

      if (!id) {
        throw 'Custom element name is not defined';
      }

      // register dom-module
      if (template && !_template) {
        let domModule = document.createElement('dom-module');
        let assetpath = typeof URL === 'function' && URL.name === 'URL'
          ? new URL(baseURI).pathname
          : (uri => { let a = document.createElement('a'); a.href = uri; return ('/' + a.pathname).replace(/^\/\//, '/'); })(baseURI);
        domModule.appendChild(template);
        domModule.setAttribute('assetpath', 
                                template.hasAttribute('basepath') ?
                                  template.getAttribute('basepath') :
                                  template.hasAttribute('assetpath') ? 
                                    template.getAttribute('assetpath') : 
                                    assetpath);
        domModule.register(id);
        proto._template = template;
      }

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
