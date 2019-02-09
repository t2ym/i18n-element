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
      assign: undefined,
      lang: isNavigatorLanguageEn ? lang1 : lang0,
      effectiveLang: isNavigatorLanguageEn ? lang1 : lang0,
      templateDefaultLang: lang1,
      observeHtmlLang: true,
      event: 'local-dom-ready',
      text: { model: {} },
      model: {},
      localDOM: [
        (function F(){}).name && !navigator.userAgent.match(/Version[/].* Safari[/]/) && !navigator.userAgent.match(/Edge[/]/) ? { select: 'span#oldLang', 'lang.raw': navigatorLanguage } : { select: 'span#oldLang' }
      ],
      lightDOM: undefined
    })
  ];

  suitesRunner(suites);

  if (location.href.indexOf('syntax=thin') >= 0) {
    suite('thin syntax extra test', function () {
      test('Define non-I18N custom elements', function (done) {
        var domModule = document.createElement('dom-module').constructor;
        ['is-less-class', 'is-class', 'inner-template', 'empty-template', 'inner-is', 'vanilla-element'].forEach(function (id) {
          assert.isOk(customElements.get(id), 'custom element with name ' + id + ' is defined');
        });
        done();
      });
      test('Define non-I18N dom-modules', function (done) {
        var domModule = document.createElement('dom-module').constructor;
        ['is-less-class', 'is-class', 'inner-template', 'empty-template', 'inner-is', '!vanilla-element'].forEach(function (id) {
          if (id[0] === '!') {
            assert.isNotOk(domModule.import(id.substring(1)), 'dom-module for ' + id.substring(1) + ' is not defined');
          }
          else {
            assert.isOk(domModule.import(id), 'dom-module for ' + id + ' is defined');
          }
        });
        done();
      });
      test('Elements have text contents in Shadow DOM', function (done) {
        var fixture = document.querySelector('div#thin-element-fixture');
        fixture.classList.add('running-test');
        [
          ['is-less-class', 'abc'],
          ['is-class', 'abc'],
          ['inner-template', 'inner text'],
          ['empty-template', ''],
          ['inner-is', 'inner text'],
          ['vanilla-element', 'vanilla element'],
          ['span#error-message', 'Custom element name is not defined']
        ].forEach(function ([id, innerText]) {
            var el = fixture.querySelector(id);
            if (id.indexOf('span#') === 0) {
              assert.isOk(el.textContent === innerText, id + ' has textContent ' + innerText);
            }
            else {
              assert.isOk(el, 'element ' + id + ' exists');
              assert.isOk(el instanceof customElements.get(id), 'element ' + id + ' is instanciated');
              assert.isOk(el.shadowRoot && el.shadowRoot.textContent === innerText, 'element ' + id + ' has textContent ' + innerText);
            }
          }
        );
        fixture.classList.remove('running-test');
        done();
      });
    });
  }

});
