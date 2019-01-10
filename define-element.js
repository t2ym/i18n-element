/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* define-element.js: Shortcut syntax for customElements.define */
import '@polymer/polymer/polymer-element.js';

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
      Patterns:
        a) template id {}
        b) template id {is}
        c) document.template id {is}
        d) template {is}
        e) {is}
        f) class Is {template}
        g) {is,template}
      */
      var id;
      var classId;
      var obj;
      var name = proto.hasOwnProperty('name') ? proto.name : functionName(proto);
      var current; // currentScript
      var template = null;
      var previous; // previousSibling template
      var cousin; // dom5.serialize output support

      current = null; // (!window.HTMLImports || HTMLImports.useNative) ? document.currentScript // document.currentScript is always null in ES modules
                     //                 : (document._currentScript || document.currentScript);
      // if (!current) { // document.currentScript is always null in ES modules
        // let url = '';//import.meta.url;
        let scripts = document.querySelectorAll('script[type=module]');
        /*
        scripts.forEach(script => {
          let src = new URL(script.src, location.href);
          if (url === src) {
            current = script;
          }
        });
        */
        // if (!current) {
          current = scripts[0];
        //}
      // } // document.currentScript is always null in ES modules
      var _tmpNode = current;
      var ownerDocument = current ? current.ownerDocument : document;
      var baseURI = ownerDocument.baseURI;
      if (current && current.ownerDocument && current.ownerDocument.nodeType === current.ownerDocument.DOCUMENT_NODE) {
        while (_tmpNode && _tmpNode.tagName !== 'LINK' &&
          _tmpNode.nodeType !== _tmpNode.DOCUMENT_FRAGMENT_NODE &&
          _tmpNode.nodeType !== _tmpNode.DOCUMENT_NODE) {
          _tmpNode = _tmpNode.parentNode;
        }
        if (_tmpNode &&
          (_tmpNode.nodeType === _tmpNode.DOCUMENT_FRAGMENT_NODE ||
           _tmpNode.nodeType === _tmpNode.DOCUMENT_NODE)) {
          ownerDocument = _tmpNode;
          baseURI = ownerDocument.baseURI;
        }
        else if (_tmpNode && _tmpNode.import === _tmpNode) {
          ownerDocument = _tmpNode;
          baseURI = ownerDocument.href; // link node
        }
      }

      previous = current && current.previousSibling;
      while (previous && !previous.tagName) {
        previous = previous.previousSibling;
      }
      if (previous && previous.tagName !== 'template'.toUpperCase()) {
        previous = null;
      }
      if (!previous) {
        // search for cousin template
        if (current && current.parentNode.tagName === 'body'.toUpperCase()) {
          previous = current.parentNode.previousSibling;
          while (previous && !previous.tagName) {
            previous = previous.previousSibling;
          }
          if (previous && previous.tagName.toLowerCase() === 'head') {
            for (var i = 0; i < previous.childNodes.length; i++) {
              if (previous.childNodes[i].tagName === 'template'.toUpperCase()) {
                cousin = previous.childNodes[i];
                break;
              }
            }
          }
        }
        if (cousin) {
          previous = cousin;
        }
        else {
          previous = null;
        }
      }

      if (!proto.is && (!name || name === 'class' || name === 'Define')) {
        if (previous) {
          id = previous.id;
          if (id) {
            // Pattern a)
            template = previous;
            proto.is = id;
          }
        }
      }
      else {
        if (proto.is) {
          id = proto.is;
        }
        else if (typeof proto === 'function' && name) {
          // ES6 class
          id = UncamelCase(name);
          classId = name;
        }
        var isNoIdPrevious = previous && !previous.id && id;
        if (isNoIdPrevious) {
          previous.id = id; // temporarily supply id
        }
        var rawTemplate = proto._rawTemplate || proto.template;
        if (isNoIdPrevious) {
          previous.removeAttribute('id');
        }
        if (!template && rawTemplate && !name) {
          // Pattern g)
          template = rawTemplate;
        }
        if (!rawTemplate && !template) {
          // Pattern b), c)
          template = ownerDocument.querySelector('template[id=' + id + ']') ||
                     document.querySelector('template[id=' + id + ']');
        }
        if (!rawTemplate && !template && previous && !previous.id) {
          // Pattern d)
          template = previous;
          template.id = id;
        }
        else {
          // Pattern e)
        }
      }

      if (!id) {
        throw 'Custom element name is not defined';
      }

      // register dom-module
      if (template) {
        var domModule = document.createElement('dom-module');
        var assetpath = typeof URL === 'function' && URL.name === 'URL'
          ? new URL(baseURI || document.baseURI).pathname
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
        proto.finalize();
      }

      // register Custom Element
      classId = classId || id.split('-').map(function (word) {
        return word[0].toUpperCase() + word.substr(1);
      }).join('');
      if (customElements.get(id)) {
        console.warn('Discarding duplicate definition of custom element ' + id);
      }
      else {
        customElements.define(id, proto);
        _Define[classId] = customElements.get(id);
      }
      return customElements.get(id);
    }
  });
}
