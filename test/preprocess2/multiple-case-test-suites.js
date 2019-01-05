/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
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
  var count1 = 100;

  var localDOM_multiple_element = [
    { select: 'div item-element', '$.label.textContent': 'A' }
  ];

  var suites = [
    s('multiple element', null, {
      fixture: 'multiple-element-fixture', 
      fixtureModel: { observeHtmlLang: false, lang: lang0, count: count1 },
      assign: { lang: lang1 },
      lang: lang1,
      effectiveLang: lang1,
      templateDefaultLang: lang1,
      observeHtmlLang: false,
      event: 'local-dom-ready',
      text: { model: {} },
      model: {},
      localDOM: localDOM_multiple_element,
      lightDOM: undefined
    }),
    s(lang2 + ' multiple element', 'multiple element', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    })
  ];

  HTMLImports.whenReady(function () {
    suitesRunner(suites);    
  });

});