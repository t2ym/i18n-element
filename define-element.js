/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* define-element.js: Shortcut syntax for customElements.define */
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
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
const _parseTemplateToString = PolymerElement._parseTemplate.toString();
function isPolymerClass (proto) {
  // Notes:
  //  - PolymerElement.isPrototypeOf(proto) is insufficient since
  //    any legitimate combinations of Polymer mixins are possible and
  //    class mixins generate different object identities of their classes and methods on class generations.
  //  - TemplateStamp class mixin is a mandatory mixin for Polymer templating and thus
  //    its method _parseTemplate must be the same for any Polymer classes
  //    while object identities of the method functions are different.
  //  - For non-Polymer classes, there should be no chances of having a static method _parseTemplate
  //    with the exactly matching string representation of the function PolymerElement._parseTemplate
  return typeof proto === 'function' && typeof proto._parseTemplate === 'function' && proto._parseTemplate.toString() === _parseTemplateToString;
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

      if (!id) {
        throw new Error('Custom element name is not defined');
      }

      if (isPolymerClass(proto)) {
        let template = proto.template; // class { template }
        let baseURI = proto.importMeta ? proto.importMeta.url : document.baseURI;
        let _template = DomModule.import(id, 'template'); // <dom-module id> template
        let __template; // <template id> template
        // A guard for HTML Modules proposal with import.meta.document
        let ownerDocument = proto.importMeta && proto.importMeta.document ? proto.importMeta.document : document;

        template = template || _template;
        if (!template) {
          let current = null;
          __template = ownerDocument.querySelector('template[id=' + id + ']');
          if (!__template) {
            __template = ownerDocument.createElement('template');
            __template.setAttribute('id', id);
            console.warn('define-element.js: ' + id + ' has no template. Supplying an empty template');
          }
          template = __template;
        }

        // register dom-module from class { template } or <template id>
        // Notes:
        //  - If <template id> is found, it must be registered to the dom-module repository
        //  - If class { template } is defined, it seems Polymer itself does not register the template to the dom-module repository
        if (!_template) {
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
