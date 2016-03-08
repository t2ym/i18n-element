/*!
 * @license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
 * Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
 */

if (!Number.isNaN) {
  // polyfill Number.isNaN for IE11
  Number.isNaN = function (value) {
    return typeof value === 'number' && isNaN(value);
  };
}

// Inheritance of test parameters
var p = Object.setPrototypeOf || function (target, base) { 
  var obj = Object.create(base);
  for (var p in target) {
    obj[p] = target[p];
  }
  return obj;
};
var g = Object.getPrototypeOf;
var _name = 'suite';
var suiteMap = { null: {} };
var s = function (name, baseName, extension) {
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

function updateProperty (element, properties) {
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
          cursor = Polymer.dom(cursor);
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

function getProperty (target, name) {
  var path = name.split(/[.]/);
  if (path.length === 1) {
    return target[name];
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
        cursor = Polymer.dom(cursor);
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

function deepMap (target, source, map) {
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
}

function translate (lang, path, text) {
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
          return path && path.match(/[.]trim$/) ? (lang + ' ' + value).trim() : lang + ' ' + value;
        }
        return value;
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

function minifyText (text) {
  if (text && typeof text === 'string') {
    text = text.replace(/[\s]{1,}/g, ' ');
  }
  return text;
}

function setupFixture (params, fixtureModel) {
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
  if (e.is === 'i18n-dom-bind') {
    e.parentElement.classList.add('running-test');
    Array.prototype.forEach.call(runningTest, function (node) {
      if (node !== e.parentElement) {
        node.classList.remove('running-test');
      }
    });
    for (var p in fixtureModel) {
      e[p] = fixtureModel[p];
    }
    e.params = params;
    e.render();
    return e;
  }
  else {
    e.classList.add('running-test');
    Array.prototype.forEach.call(runningTest, function (node) {
      if (node !== e) {
        node.classList.remove('running-test');
      }
    });
    return fixture(fixtureName, fixtureModel);
  }
}

function restoreFixture (fixtureName) {
  var e = document.querySelector('#' + fixtureName);
  if (!e) {
    throw new Error('Fixture element with id = ' + fixtureName + ' not found');
  }
  if (e.is === 'i18n-dom-bind') {
    if (e._intervalId) {
      clearInterval(e._intervalId);
    }
    Array.prototype.forEach.call(document.querySelectorAll('[is="i18n-dom-bind"]'),
      function (node) {
        node.observeHtmlLang = true;
      }
    );
  }
  else {
    e.restore();
  }
}

function getLocalDomRoot (e) {
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

function suitesRunner (suites) {

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

      (params.setup ? setup : suiteSetup)(function () {
        el = setupFixture(params, params.fixtureModel);
        return new Promise(function (resolve, reject) {
          if (params &&
              (params.event || 
              params.assign && (params.assign.lang || params.assign['html.lang']))) {
            el.addEventListener(event, function fixtureSetup (e) {
              if (el === Polymer.dom(e).rootTarget &&
                  el.lang === params.lang &&
                  el.effectiveLang === params.effectiveLang) {
                el.removeEventListener(event, fixtureSetup);
                resolve(el);
              }
              else {
                console.log(params.suite + ' skipping uninteresting event ' + event + 
                  ' "' + el.lang + '" "' + params.lang + '" "' + el.effectiveLang + '" "' + params.effectiveLang + '"');
              }
            });
            updateProperty(el, params.assign);
          }
          else {
            updateProperty(el, params.assign);
            resolve(el);
          }
        });
      });

      test('{lang, effectiveLang, templateDefaultLang, observeHtmlLang' +
            (params.text ? ', text' : '') +
            (params.model ? ', model' : '') +
            (params.localDOM ? ', local DOM' : '') +
            '} properties are set as {' + 
            [ params.lang, params.effectiveLang, params.templateDefaultLang, params.observeHtmlLang].join(', ') +
            (params.text ? ', ' + JSON.stringify(params.text, null, 2) : '') +
            (params.model ? ', ' + JSON.stringify(params.model, null, 2) : '') +
            (!params.setup && params.localDOM ? ', ' + JSON.stringify(params.localDOM, null, 2) : '') +
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
        }
        if (params.model) {
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
        }
        if (!params.setup && params.localDOM) {
          params.localDOM.forEach(function (childPath) {
            var completeStatus;
            var nodes = Polymer.dom(getLocalDomRoot(el)).querySelectorAll(childPath.select);
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
        test('local DOM ' + JSON.stringify(params.localDOM, null, 2) + ' is set' + 
              (params.assign && params.assign.lang ? ' for ' + params.assign.lang : ''), function () {
          params.localDOM.forEach(function (childPath) {
            var completeStatus;
            var nodes = Polymer.dom(getLocalDomRoot(el)).querySelectorAll(childPath.select);
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
        test('light DOM ' + JSON.stringify(params.lightDOM, null, 2) + ' is set' + 
              (params.assign && params.assign.lang ? ' for ' + params.assign.lang : ''), function () {
          params.lightDOM.forEach(function (childPath) {
            var completeStatus;
            var nodes = Polymer.dom(el).querySelectorAll(childPath.select);
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