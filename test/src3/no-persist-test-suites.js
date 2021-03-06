/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import './test-runner.js';
suite('I18nElement with ' + 
  (window.location.href.indexOf('?dom=Shadow') >= 0 ? 'Shadow DOM' : 'Shady DOM') +
  (' in ' + syntax + ' syntax'), 
  function () {

  var lang0 = '';
  var lang1 = 'en';
  var lang2 = 'fr';
  var lang3 = 'ja';
  var lang4 = 'fr-CA';
  var lang5 = 'zh-Hans-CN';
  var lang6 = 'ru';
  var lang7 = 'zh-yue-Hans-CN';
  var lang8 = 'zh-CN';
  var lang9 = 'zh-TW';
  var lang10 = 'zh-Hans-CN-x-Linux';
  var navigatorLanguage = navigator.language || navigator.browserLanguage;
  var isNavigatorLanguageEn = navigatorLanguage.match(/^en/);

  var suites = [
    s('preference', null, {
      fixture: 'preference-element-fixture', 
      fixtureModel: undefined,
      wait: 5000,
      assign: undefined,
      lang: isNavigatorLanguageEn ? lang1 : lang0,
      effectiveLang: isNavigatorLanguageEn ? lang1 : lang0,
      templateDefaultLang: lang1,
      observeHtmlLang: true,
      event: 'local-dom-ready',
      text: { model: {} },
      model: {},
      localDOM: [
        { select: 'span#oldLang', 'lang.raw': navigatorLanguage }
      ],
      lightDOM: undefined
    })
  ];

  suitesRunner(suites, 500);

  suite('change persist', function () {
    test('persist true', function (done) {
      var p = document.querySelector('i18n-preference');
      p.persist = true;
      assert.equal(p.persist, true, 'persist is true');
      setTimeout(() => {
        assert.equal(localStorage.getItem('i18n-behavior-preference'), JSON.stringify(navigatorLanguage), 'localStorage is set as ' + navigatorLanguage);
        done();
      }, 100);
    });

    test('change html lang', function (done) {
      var p = document.querySelector('i18n-preference');
      var html = document.querySelector('html');
      html.setAttribute('lang', lang3);
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        assert.equal(localStorage.getItem('i18n-behavior-preference'), JSON.stringify(lang3), 'localStorage is set as ' + lang3);
        done();
      }, 100);
    });

    test('persist false', function (done) {
      var p = document.querySelector('i18n-preference');
      p.persist = false;
      localStorage.setItem('i18n-behavior-preference', JSON.stringify(lang4));
      var html = document.querySelector('html');
      html.setAttribute('lang', lang2);
      assert.equal(p.persist, false, 'persist is false');
      setTimeout(() => {
        assert.equal(localStorage.getItem('i18n-behavior-preference'), null, 'localStorage is set as null');
        done();
      }, 100);
    });
  });

  suite('disconnect preference', function () {
    var defaultLang = BehaviorsStore.I18nControllerBehavior.properties.defaultLang.value;
    var p;
    test('disconnect', function (done) {
      p = document.querySelector('i18n-preference');
      p.parentNode.removeChild(p);
      setTimeout(() => {
        assert.equal(p.persist, false, 'persist is false');
        done();
      }, 100);
    });

    test('reconnect', function (done) {
      var html = document.querySelector('html');
      html.setAttribute('lang', defaultLang);
      html.setAttribute('preferred', '');
      localStorage.setItem('i18n-behavior-preference', JSON.stringify(lang4));
      p.persist = true;
      document.body.appendChild(p);
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        assert.equal(p.value, defaultLang, 'value is ' + defaultLang);
        assert.equal(html.lang, defaultLang, 'html.lang is ' + defaultLang);
        done();
      }, 100);
    });

    test('change localStorage (preferred)', function (done) {
      var html = document.querySelector('html');
      var changeLocalStorageUrl = new URL(`change-local-storage.html?key=i18n-behavior-preference&value=${lang5}&origin=${encodeURIComponent(location.href)}`, location.href);
      var iframe = document.createElement('iframe');
      iframe.src = changeLocalStorageUrl.href;
      iframe.onload = () => {
        window.addEventListener('message', function onMessage(event) {
          window.removeEventListener('message', onMessage);
          assert.equal(event.data, 'setItem', 'postMessage data is setItem');
          setTimeout(() => {
            assert.equal(p.persist, true, 'persist is true');
            assert.equal(p.value, defaultLang, 'value is ' + defaultLang);
            assert.equal(html.lang, defaultLang, 'html.lang is ' + defaultLang);
            iframe.parentNode.removeChild(iframe);
            done();
          }, 100);
        });
      }
      document.body.appendChild(iframe);
    });

    test('disconnect again', function (done) {
      p = document.querySelector('i18n-preference');
      p.parentNode.removeChild(p);
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        done();
      }, 100);
    });

    test('reconnect again', function (done) {
      var html = document.querySelector('html');
      html.setAttribute('lang', lang3);
      localStorage.removeItem('i18n-behavior-preference');
      document.body.appendChild(p);
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        assert.equal(p.value, lang3, 'value is ' + lang3);
        assert.equal(html.lang, lang3, 'html.lang is ' + lang3);
        done();
      }, 100);
    });

    test('disconnect and discard', function (done) {
      p = document.querySelector('i18n-preference');
      p.parentNode.removeChild(p);
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        done();
      }, 100);
    });

    test('connect a new instance', function (done) {
      var html = document.querySelector('html');
      html.setAttribute('lang', lang1);
      localStorage.removeItem('i18n-behavior-preference');
      p = document.createElement('i18n-preference');
      p.persist = true;
      document.body.appendChild(p);
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        assert.equal(p.value, lang1, 'localStorage is set as ' + lang1);
        done();
      }, 100);
    });

    test('disconnect and discard', function (done) {
      p = document.querySelector('i18n-preference');
      p.parentNode.removeChild(p);
      localStorage.removeItem('i18n-behavior-preference');
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        done();
      }, 100);
    });

    test('connect another new instance', function (done) {
      var html = document.querySelector('html');
      html.setAttribute('lang', lang5);
      html.removeAttribute('preferred');
      localStorage.removeItem('i18n-behavior-preference');
      p = document.createElement('i18n-preference');
      p.persist = true;
      document.body.appendChild(p);
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        assert.equal(p.value, navigatorLanguage, 'localStorage is set as ' + navigatorLanguage);
        assert.equal(html.lang, navigatorLanguage, 'html.lang is set as ' + navigatorLanguage);
        done();
      }, 100);
    });

    test('change html lang', function (done) {
      var html = document.querySelector('html');
      html.setAttribute('lang', lang5);
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        assert.equal(p.value, lang5, 'localStorage is set as ' + lang5);
        assert.equal(html.lang, lang5, 'html.lang is set as ' + lang5);
        done();
      }, 100);
    });

    test('change localStorage', function (done) {
      var html = document.querySelector('html');
      var changeLocalStorageUrl = new URL(`change-local-storage.html?key=i18n-behavior-preference&value=${lang6}&origin=${encodeURIComponent(location.href)}`, location.href);
      var iframe = document.createElement('iframe');
      iframe.src = changeLocalStorageUrl.href;
      iframe.onload = () => {
        window.addEventListener('message', function onMessage(event) {
          window.removeEventListener('message', onMessage);
          assert.equal(event.data, 'setItem', 'postMessage data is setItem');
          setTimeout(() => {
            assert.equal(p.persist, true, 'persist is true');
            assert.equal(p.value, lang6, 'value is ' + lang6);
            assert.equal(html.lang, lang6, 'html.lang is ' + lang6);
            iframe.parentNode.removeChild(iframe);
            done();
          }, 100);
        });
      }
      document.body.appendChild(iframe);
    });

    test('disconnect and discard', function (done) {
      p = document.querySelector('i18n-preference');
      p.parentNode.removeChild(p);
      localStorage.removeItem('i18n-behavior-preference');
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        done();
      }, 100);
    });

    test('connect yet another new instance', function (done) {
      var html = document.querySelector('html');
      html.setAttribute('lang', lang5);
      html.setAttribute('preferred', '');
      p = document.createElement('i18n-preference');
      p.persist = true;
      document.body.appendChild(p);
      setTimeout(() => {
        assert.equal(p.persist, true, 'persist is true');
        assert.equal(p.value, defaultLang, 'localStorage is set as ' + defaultLang);
        assert.equal(html.lang, defaultLang, 'html.lang is set as ' + defaultLang);
        done();
      }, 100);
    });

    test('disconnect and discard', function (done) {
      p = document.querySelector('i18n-preference');
      p.parentNode.removeChild(p);
      localStorage.removeItem('i18n-behavior-preference');
      setTimeout(() => {
        done();
      }, 100);
    });

  });

});
