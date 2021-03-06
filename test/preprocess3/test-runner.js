/*!
 * @license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
 * Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
 */
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { templatize } from '@polymer/polymer/lib/utils/templatize.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';

window.deepcopy = deepcopy;

if (!Number.isNaN) {
  // polyfill Number.isNaN for IE11
  Number.isNaN = function (value) {
    return typeof value === 'number' && isNaN(value);
  };
}

// Inheritance of test parameters
window.p = Object.setPrototypeOf || function (target, base) { 
  var obj = Object.create(base);
  for (var p in target) {
    obj[p] = target[p];
  }
  return obj;
};
window.g = Object.getPrototypeOf;
window._name = 'suite';
window.suiteMap = { null: {} };
window.s = function (name, baseName, extension) {
  if (suiteMap[name]) {
    throw new Error('duplicate suite name ' + name);
  }
  if (!suiteMap[baseName]) {
    throw new Error('inexistent base suite name ' + baseName);
  }
  extension[_name] = name;
  extension = p(extension, suiteMap[baseName]);
  suiteMap[name] = extension;
  return extension;
};

// Utility functions

window.updateProperty = function updateProperty (element, properties) {
  for (var name in properties) {
    var path = name.split(/[.]/);
    if (path.length === 1) {
      element[name] = properties[name];
    }
    else {
      var cursor = element;
      var p = path.shift();
      while (p) {
        if (path.length < 1) {
          cursor[p] = properties[name];
          element.notifyPath(name, properties[name], true);
          break;
        }
        else if (p === 'PolymerDom') {
          cursor = dom(cursor);
        }
        else if (p === 'html') {
          cursor = document.querySelector('html');
        }
        else {
          cursor = cursor[p];
        }
        p = path.shift();
      }
    }
  }
}

window.getProperty = function getProperty (target, name) {
  var path = name.split(/[.]/);
  if (path.length === 1) {
    switch (name) {
    case 'textContent':
      return Array.prototype.map.call(target.childNodes, function (n) { return n.nodeType === n.TEXT_NODE ? n.textContent : ''; }).join('');
    default:
      return target[name];
      break;
    }
  }
  else {
    var cursor = target;
    var p = path.shift();
    while (p) {
      //console.log(p, cursor);
      if (path.length < 1) {
        if (p === 'raw' ||
            p === 'text') {
          return cursor;
        }
        else if (p === 'trim') {
          return cursor.trim();
        }
        if (p === 'data') {
          cursor = cursor[p];
          cursor = cursor.replace(/^[\s]{1,}/g, ' ').replace(/[\s]{1,}$/g, ' ');
          return cursor;
        }
        else {
          return cursor[p];
        }
      }
      else if (p === 'PolymerDom') {
        cursor = dom(cursor);
      }
      else if (p === 'previousTextSibling') {
        do {
          cursor = cursor.previousSibling;
        } while (cursor.nodeType === cursor.COMMENT_NODE ||
                 (cursor.nodeType === cursor.TEXT_NODE && cursor.data.match(/^[\s]*$/)));
      }
      else if (p === 'nextTextSibling') {
        do {
          cursor = cursor.nextSibling;
        } while (cursor.nodeType === cursor.COMMENT_NODE ||
                 (cursor.nodeType === cursor.TEXT_NODE && cursor.data.match(/^[\s]*$/)));
      }
      else if (p === 'effectiveChildNodes') {
        cursor = cursor.getEffectiveChildNodes();
      }
      else if (p === 'nonWS') {
        cursor = Array.prototype.filter.call(cursor, function (item) {
          return (item.nodeType !== item.TEXT_NODE &&
                  item.nodeType !== item.COMMENT_NODE) ||
                 (item.nodeType === item.TEXT_NODE &&
                  !item.data.match(/^[\s]*$/));
        });
      }
      else {
        cursor = cursor[p];
      }
      p = path.shift();
    }
  }
}

window.deepMap = function deepMap (target, source, map) {
  var value;
  for (var prop in source) {
    value = source[prop];
    switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
      if (typeof target === 'object') {
        target[prop] = map(value, prop);
      }
      break;
    case 'object':
      if (typeof target === 'object') {
        if (Array.isArray(value)) {
          target[prop] = target[prop] || [];
          deepMap(target[prop], value, map);
        }
        else {
          target[prop] = target[prop] || {};
          deepMap(target[prop], value, map);
        }
      }
      break;
    case 'function':
    case 'symbol':
    case 'undefined':
      if (typeof target === 'object') {
        target[prop] = value;
      }
      break;
    default:
      if (typeof target === 'object') {
        target[prop] = value;
      }
      break;
    }
  }
  return target;
}

window.translate = function translate (lang, path, text) {
  var result;
  switch (lang) {
  case '':
  case 'en':
  case null:
  case undefined:
    result = text;
    break;
  default:
    if (!path || path.match(/(textContent|[.]data|[.]text|[.]trim)$/)) {
      result = {};
      deepMap(result, { text: text }, function (value, prop) {
        if (typeof value === 'string' &&
            !value.match(/^({{[^{}]*}}|\[\[[^\[\]]*\]\])$/) &&
            !value.match(/^[0-9]{1,}$/) &&
            prop !== 'type') {
          if (path && path.match(/[.]trim$/)) {
            return minifyText((lang + ' ' + value).trim());
          }
          else {
            if (value.match(/^ /)) {
              return minifyText(' ' + lang + ' ' + value);
            }
            else {
              return minifyText(lang + ' ' + value);
            }
          }
        }
        return minifyText(value);
      });
      result = result.text;
    }
    else {
      result = text;
    }
  }
  //console.log('translate (' + lang + ', ' + path + ', ' + JSON.stringify(text, null, 2) + ') = ' + JSON.stringify(result, null, 2));
  return result;
}

window.minifyText = function minifyText (text) {
  if (text && typeof text === 'string') {
    text = text.replace(/[\s]{1,}/g, ' ');
  }
  return text;
}

window.isFakeServer = typeof window === 'object' &&
  typeof window.location.href === 'string' &&
  window.location.href.indexOf('xhr=fake') > 0 &&
  typeof window.fakeServerContents === 'object';

window.isSuppressingSuiteParams = typeof window === 'object' &&
  typeof window.location.href === 'string' &&
  window.location.href.indexOf('suppress=true') > 0;

window.syntax = 'mixin';
(function () {
  var href = typeof window === 'object' && typeof window.location.href === 'string'
    ? window.location.href : ''
  if (href) {
    [ 'mixin', 'base-element', 'thin', 'legacy', 'modified-legacy' ].forEach(function (_syntax) {
      if (href.indexOf('syntax=' + _syntax) > 0) {
        syntax = _syntax;
      }
    });
  }
})();

window.setupFakeServer = function setupFakeServer (e) {
  e = window;
  if (isFakeServer && !e.server) {
    e.server = sinon.fakeServer.create();
    e.server.autoRespond = true;
    //e.server.autoRespondAfter = 100;
    e.server.respondImmediately = true;
    e.server.respondWith(/\/test\/[-\w]+(\/.*[.]json)$/, function (xhr, urlPath) {
      if (fakeServerContents.hasOwnProperty(urlPath)) {
        //console.log('fake-server: 200 ' + urlPath);
        xhr.respond(200, { 'Content-Type': 'application/json' }, fakeServerContents[urlPath])
      }
      else {
        //console.log('fake-server: 404 ' + urlPath);
        xhr.respond(404, {}, '');
      }
    });
  }
}
setupFakeServer(window);

window.teardownFakeServer = function teardownFakeServer (e) {
  if (isFakeServer) {
    //e.server.restore();
  }
}

window.setupFixture = function setupFixture (params, fixtureModel) {
  var fixtureName = params.fixture;
  var e = document.querySelector('#' + fixtureName);
  var runningTest = document.querySelectorAll('.running-test');
  var title = document.querySelector('#test-name');
  var currentPath = window.location.pathname.split('/');
  if (!e) {
    throw new Error('Fixture element with id = ' + fixtureName + ' not found');
  }
  if (title) {
    title.textContent =
      (currentPath.length >= 2 ? currentPath[currentPath.length - 2] : '') +
      (currentPath.length >= 1 ? '/' + currentPath[currentPath.length - 1].replace(/-test[.]html$/, '') + '/': '') +
      params.suite;
  }
  //console.log('setupFixture: suite = ' + params.suite);
  if (e.is === 'i18n-dom-bind') {
    e.parentElement.classList.add('running-test');
    Array.prototype.forEach.call(runningTest, function (node) {
      if (node !== e.parentElement) {
        node.classList.remove('running-test');
      }
    });
    return new Promise(function (resolve, reject) {
      e.addEventListener('dom-change', function setupFixtureDomChange (ev) {
        if (dom(ev).rootTarget === e) {
          //console.log('setupFixture dom-change');
          e.removeEventListener('dom-change', setupFixtureDomChange);
          try {
            if (fixtureModel &&
                typeof fixtureModel.lang === 'string' &&
                fixtureModel.lang !== 'en') {
              //console.log('setupFixture: waiting for lang-updated');
              e.addEventListener('lang-updated', function setupFixtureLangDomChange (event) {
                //console.log('setupFixtureLangDomChange');
                if (event.target === e &&
                    e.effectiveLang === fixtureModel.lang) {
                  //console.log('setupFixtureLangDomChange lang = ' + event.detail.lang + ' effectiveLang = ' + e.effectiveLang);
                  e.removeEventListener('lang-updated', setupFixtureLangDomChange);
                  e.render();
                  resolve(e);
                }
              });
              for (var p in fixtureModel) {
                e[p] = fixtureModel[p];
              }
              e.params = params;
            }
            else {
              for (var p in fixtureModel) {
                e[p] = fixtureModel[p];
              }
              e.params = params;
              //console.log('setupFixture: resolving');
              e.render();
              resolve(e);
            }
          }
          catch (ex) {
            reject(ex);
          }
        }
      });
      if (e._children) {
        e.render();
      }
    });
  }
  else {
    e.classList.add('running-test');
    Array.prototype.forEach.call(runningTest, function (node) {
      if (node !== e) {
        node.classList.remove('running-test');
      }
    });
    setupFakeServer(e);
    return new Promise(function (resolve, reject) {
      //console.log('setupFixture: name = ' + fixtureName + ' model = ' + JSON.stringify(fixtureModel, null, 2));
      if (!window.FixtureWrapper) {
        window.FixtureWrapper = class FixtureWrapper extends PolymerElement { };
        customElements.define('fixture-wrapper', FixtureWrapper);
      }

      if (fixtureModel) {
        var f = document.querySelector('test-fixture[id=' + fixtureName + ']');
        var t = f.querySelector('template[is=dom-template]');
        if (t) {
          var instanceProps = {};
          var p;
          for (p in fixtureModel) {
            instanceProps[p] = true;
          }
          var self = new FixtureWrapper();
          t.__templatizeOwner = undefined;
          t._ctor = templatize(t, self, {
            instanceProps: instanceProps,
            forwardHostProp: function(prop, value) {
              if (self._instance) {
                self._instance.forwardHostProp(prop, value);
              }
            }
          });
          t.stamp = function (model) {
            var _instance = new this._ctor(model);
            return _instance.root;
          }.bind(t);
        }
      }
      var element = fixture(fixtureName, fixtureModel);
      //console.log('setupFixture: name = ' + fixtureName +
      //            ' element.lang = ' + element.lang +
      //            ' getAttribute("lang") = ' + element.getAttribute('lang') +
      //            ' element._lang = ' + element._lang);
      if (element) {
        if (fixtureModel &&
            typeof fixtureModel.lang === 'string' &&
            fixtureModel.lang !== 'en' &&
            fixtureModel.lang !== element.effectiveLang && element.effectiveLang !== 'en') {
          //console.log('setupFixture: waiting for lang-updated');
          element.addEventListener('lang-updated', function setupFixtureLangUpdated (event) {
            //console.log('setupFixtureLangUpdated');
            if (event.target === element &&
                element.effectiveLang === fixtureModel.lang) {
              //console.log('setupFixtureLangUpdated lang = ' + event.detail.lang + ' effectiveLang = ' + element.effectiveLang);
              element.removeEventListener('lang-updated', setupFixtureLangUpdated);
              resolve(element);
            }
          });
        }
        else {
          //console.log('setupFixture: element ready without lang-updated');
          setTimeout(function () {
            if (params.lang === '' || params.lang === 'en') {
              element.fire('lang-updated');
            }
          }, params.wait ? params.wait + 500 : 500);
          resolve(element);
        }
      }
      else {
        reject(new Error('setupFixture returns null for ' +
                          fixtureName + ' ' + JSON.stringify(fixtureModel,null,2)));
      }
    });
  }
}

window.restoreFixture = function restoreFixture (fixtureName) {
  var e = document.querySelector('#' + fixtureName);
  if (!e) {
    throw new Error('Fixture element with id = ' + fixtureName + ' not found');
  }
  if (e.is === 'i18n-dom-bind') {
    if (e._intervalId) {
      clearInterval(e._intervalId);
    }
    Array.prototype.forEach.call(document.querySelectorAll('i18n-dom-bind'),
      function (node) {
        node.observeHtmlLang = true;
      }
    );
  }
  else {
    teardownFakeServer(e);
    e.restore();
  }
}

window.getLocalDomRoot = function getLocalDomRoot (e) {
  if (e.is === 'i18n-dom-bind') {
    return e.parentElement;
  }
  else if (e) {
    return e.root;
  }
  else {
    return null;
  }
}

window.suitesRunner = function suitesRunner (suites, _wait) {

  suites.forEach(function (params) {

    suite(params.suite, function () {
      var el;
      var p;
      var n;
      var i, j;
      var expected;
      var results;
      var node;
      var rawValue = params.rawValue;
      var fixtureElement;
      var noProperties;
      var lang = params.assign && params.assign.lang ? params.assign.lang : 'en';
      var event = params.event ? params.event : 'lang-updated';
      var defTimeout = 300000;
      var timeout = params.timeout ? (params.timeout < defTimeout ? defTimeout : params.timeout) : defTimeout;
      this.timeout(timeout);

      (params.setup ? setup : suiteSetup)(function () {
        return (_wait ? new Promise((resolve) => { setTimeout(() => { resolve(); }, _wait); }) : Promise.resolve()).then(() => setupFixture(params, params.fixtureModel))
          .then(function (element) {
            el = element;
            //console.log('setup: element.lang = ' + element.lang);
            return new Promise(function (resolve, reject) {
              //console.log(params.suite, 'waiting for ' + event);
              if (params &&
                  (params.event ||
                  params.assign && (params.assign.lang || params.assign['html.lang']))) {
                el.addEventListener(event, function fixtureSetup (e) {
                  if (el === dom(e).rootTarget &&
                      el.lang === params.lang &&
                      el.effectiveLang === params.effectiveLang) {
                    el.removeEventListener(event, fixtureSetup);
                    //console.log('setup: updateProperty resolving on ' + event);
                    resolve(el);
                  }
                  else {
                    console.log(params.suite + ' skipping uninteresting event ' + event +
                      ' "' + el.lang + '" "' + params.lang + '" "' + el.effectiveLang + '" "' + params.effectiveLang + '"');
                  }
                });
                //console.log('setup: updateProperty ' + JSON.stringify(params.assign, null, 2));
                updateProperty(el, params.assign);
              }
              else {
                //console.log('setup: updateProperty ' + JSON.stringify(params.assign, null, 2));
                //console.log('setup: updateProperty resolving without ' + event);
                updateProperty(el, params.assign);
                resolve(el);
              }
            });
          }, function (error) {
            throw new Error(error);
          })
          .then((result) => {
            if (_wait) {
              return new Promise((resolve) => { setTimeout(() => resolve(result), _wait); });
            }
            else {
              return result;
            }
          });
      });

      test('{lang, effectiveLang, templateDefaultLang, observeHtmlLang' +
            (params.text ? ', text' : '') +
            (params.model ? ', model' : '') +
            (params.localDOM ? ', local DOM' : '') +
            '} properties are set as {' + 
            (isSuppressingSuiteParams ? '' :
            [ params.lang, params.effectiveLang, params.templateDefaultLang, params.observeHtmlLang].join(', ') +
            (params.text ? ', ' + JSON.stringify(params.text, null, 2) : '') +
            (params.model ? ', ' + JSON.stringify(params.model, null, 2) : '') +
            (!params.setup && params.localDOM ? ', ' + JSON.stringify(params.localDOM, null, 2) : '')) +
            '}' +
            (params.assign && params.assign.lang ? ' for ' + params.assign.lang : ''), function () {
        assert.isString(el.lang, 'lang property is a string');
        assert.equal(el.lang, params.lang, 'lang property is set');
        assert.isString(el.effectiveLang, 'effectiveLang property is a string');
        assert.equal(el.effectiveLang, params.effectiveLang, 'effectiveLang property is set');
        assert.isString(el.templateDefaultLang, 'templateDefaultLang property is a string');
        assert.equal(el.templateDefaultLang, params.templateDefaultLang, 'templateDefaultLang property is set');
        assert.isBoolean(el.observeHtmlLang, 'observeHtmlLang property is a Boolean');
        assert.equal(el.observeHtmlLang, params.observeHtmlLang, 'observeHtmlLang property is set');
        if (params.text) {
          var actual;
          expected = deepMap(deepcopy(params.text), params.text, minifyText);
          actual = deepMap(deepcopy(el.text), el.text, minifyText);
          noProperties = true;
          assert.isObject(el.text, 'text property is an object');
          //console.log(JSON.stringify(e.detail, null, 2));
          //console.log(JSON.stringify(el.text, null, 2));
          for (p in expected) {
            if (p === 'meta') {
              continue;
            }
            noProperties = false;
            assert.deepEqual(actual[p],
              params.rawText ? expected[p] : translate(params.effectiveLang, null, expected[p]),
              'text.' + p + ' property is set for ' + params.effectiveLang);
          }
          if (noProperties) {
            assert.deepEqual(deepMap(deepcopy(el.text), el.text, minifyText),
              expected,
              'text property is set');
          }
        }
        if (params.model) {
          noProperties = true;
          assert.isObject(el.model, 'model property is an object');
          for (p in expected) {
            noProperties = false;
            //console.log('model.' + p + ' = ' + JSON.stringify(el.model[p]));
            //console.log('expected model.' + p + ' = ' + JSON.stringify(translate(el.effectiveLang, null, params.model[p])));
            assert.deepEqual(minifyText(el.model[p]),
              params.rawText ? params.model[p] : translate(params.effectiveLang, null, params.model[p]),
              'model.' + p + ' property is set for ' + params.effectiveLang);
          }
          if (noProperties) {
            assert.deepEqual(el.model, params.model, 'model property is set');
          }
        }
        if (!params.setup && params.localDOM) {
          params.localDOM.forEach(function (childPath) {
            var completeStatus;
            var nodes = dom(getLocalDomRoot(el)).querySelectorAll(childPath.select);
            assert.ok(nodes.length > 0, childPath.select + ' is defined');
            for (var p in childPath) {
              if (p === 'select') {
                continue;
              }
              //console.log(p + ' is set as ' + childPath[p]);
              if (Array.isArray(childPath[p])) {
                //console.log(nodes);
                Array.prototype.forEach.call(childPath[p], function (path, i, a) {
                  assert.equal(minifyText(getProperty(nodes[i], p)),
                    minifyText(params.rawText ? path : translate(params.effectiveLang, p, path)),
                    p + ' is set as ' + minifyText(params.rawText ? path : translate(params.effectiveLang, p, path)));
                });
              }
              else {
                //console.log(nodes[0]);
                assert.equal(minifyText(getProperty(nodes[0], p)),
                  minifyText(params.rawText ? childPath[p] : translate(params.effectiveLang, p, childPath[p])),
                  p + ' is set as ' + translate(params.rawText ? childPath[p] : params.effectiveLang, p, childPath[p]));
              }
            }
            //console.log(childPath);
          });
        }
      });

/*
      if (params.text) {
        test('text' + ' property is set as ' + JSON.stringify(params.text,null,2) + 
          (params.assign && params.assign.lang ? ' for ' + params.assign.lang : ''), function () {
          expected = deepMap(deepcopy(params.text), params.text, minifyText);
          noProperties = true;
          assert.isObject(el.text, 'text property is an object');
          //console.log(JSON.stringify(e.detail, null, 2));
          //console.log(JSON.stringify(el.text, null, 2));
          for (p in expected) {
            noProperties = false;
            assert.deepEqual(deepMap(deepcopy(el.text[p]), el.text[p], minifyText),
              params.rawText ? expected[p] : translate(params.effectiveLang, null, expected[p]),
              'text.' + p + ' property is set for ' + params.effectiveLang);
          }
          if (noProperties) {
            assert.deepEqual(deepMap(deepcopy(el.text), el.text, minifyText),
              expected,
              'text property is set');
          }
        });
      }

      if (params.model) {
        test('model' + ' property is set as ' + JSON.stringify(params.model,null,2) + 
          (params.assign && params.assign.lang ? ' for ' + params.assign.lang : ''), function () {
          noProperties = true;
          assert.isObject(el.model, 'model property is an object');
          for (p in params.model) {
            noProperties = false;
            //console.log('model.' + p + ' = ' + JSON.stringify(el.model[p]));
            //console.log('expected model.' + p + ' = ' + JSON.stringify(translate(el.effectiveLang, null, params.model[p])));
            assert.deepEqual(el.model[p],
              params.rawText ? params.model[p] : translate(params.effectiveLang, null, params.model[p]),
              'model.' + p + ' property is set for ' + params.effectiveLang);
          }
          if (noProperties) {
            assert.deepEqual(el.model, params.model, 'model property is set');
          }
        });
      }
*/

      if (params.setup && params.localDOM) {
        test('local DOM ' + (isSuppressingSuiteParams ? '{}' : JSON.stringify(params.localDOM, null, 2)) + ' is set' + 
              (params.assign && params.assign.lang ? ' for ' + params.assign.lang : ''), function () {
          params.localDOM.forEach(function (childPath) {
            var completeStatus;
            var nodes = dom(getLocalDomRoot(el)).querySelectorAll(childPath.select);
            assert.ok(nodes.length > 0, childPath.select + ' is defined');
            for (var p in childPath) {
              if (p === 'select') {
                continue;
              }
              //console.log(p + ' is set as ' + childPath[p]);
              if (Array.isArray(childPath[p])) {
                //console.log(nodes);
                Array.prototype.forEach.call(childPath[p], function (path, i, a) {
                  assert.equal(minifyText(getProperty(nodes[i], p)),
                    minifyText(params.rawText ? path : translate(params.effectiveLang, p, path)),
                    p + ' is set as ' + minifyText(params.rawText ? path : translate(params.effectiveLang, p, path)));
                });
              }
              else {
                //console.log(nodes[0]);
                assert.equal(minifyText(getProperty(nodes[0], p)),
                  minifyText(params.rawText ? childPath[p] : translate(params.effectiveLang, p, childPath[p])),
                  p + ' is set as ' + translate(params.rawText ? childPath[p] : params.effectiveLang, p, childPath[p]));
              }
            }
            //console.log(childPath);
          });
        });
      }

      if (params.lightDOM) {
        test('light DOM ' + (isSuppressingSuiteParams ? '{}' : JSON.stringify(params.lightDOM, null, 2)) + ' is set' + 
              (params.assign && params.assign.lang ? ' for ' + params.assign.lang : ''), function () {
          params.lightDOM.forEach(function (childPath) {
            var completeStatus;
            var nodes = dom(el).querySelectorAll(childPath.select);
            assert.ok(nodes.length > 0, childPath.select + ' is defined');
            for (var p in childPath) {
              if (p === 'select') {
                continue;
              }
              //console.log(p + ' is set as ' + childPath[p]);
              if (Array.isArray(childPath[p])) {
                //console.log(nodes);
                Array.prototype.forEach.call(childPath[p], function (path, i, a) {
                  assert.equal(getProperty(nodes[i], p), translate(params.effectiveLang, p, path), p + ' is set as ' + translate(params.effectiveLang, p, path));
                });
              }
              else {
                //console.log(nodes[0]);
                assert.equal(getProperty(nodes[0], p), translate(params.effectiveLang, p, childPath[p]), p + ' is set as ' + translate(params.effectiveLang, p, childPath[p]));
              }
            }
            //console.log(childPath);
          });
        });
      }

      (params.setup ? teardown : suiteTeardown)(function () {
        restoreFixture(params.fixture);
      });
    });
  });
}
