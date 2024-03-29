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
      lang: isNavigatorLanguageEn ? lang1 : lang1,
      effectiveLang: isNavigatorLanguageEn ? lang1 : lang1,
      templateDefaultLang: lang1,
      observeHtmlLang: true,
      event: 'local-dom-ready',
      text: { model: {} },
      //model: {},
      localDOM: [
        //{ select: 'span', 'lang.raw': navigatorLanguage }
      ],
      lightDOM: undefined
    })
  ];

  suitesRunner(suites, 500);

});
