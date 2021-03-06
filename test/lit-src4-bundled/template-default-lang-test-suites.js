/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import './test-runner.js';
suite('I18nElement with ' + 
  (' in ' + syntax + ' syntax'), 
  function () {

  var lang0 = '';
  var lang1 = 'en';
  var lang2 = 'fr';
  var lang3 = 'ja';
  var lang4 = 'fr-CA';
  var lang5 = 'zh-Hans-CN';
  var lang6 = 'ru';
  var text_template_default_lang = {
    'model': {},
    'text': ' outermost text at the beginning ',
    'h1_3': 'outermost header 1',
    'text_4': ' outermost text in the middle ',
    'span_5': 'simple text without id',
    'span_6': 'simple text without id 2',
    'label-1': 'simple text with id',
    'label-2': 'simple text with id 2',
    'div_9:span': 'simple text within div',
    'div_9:span_1': 'simple text within div 2',
    'div_9:div_2:div': 'great grandchild text within div',
    'div_10:text': ' simple text as the first element in div ',
    'div_10:span_1': 'simple text within div',
    'div_10:text_2': ' simple text in the middle of div ',
    'div_10:span_3': 'simple text within div 2',
    'div_10:div_4:div': 'great grandchild text within div',
    'div_10:text_5': ' simple text at the last element in div ',
    'toplevel-div:span': 'simple text within div',
    'toplevel-div:span_1': 'simple text within div 2',
    'third-level-div': 'great grandchild text within div',
    'second-level-div:div_1': 'great grandchild text within div without id',
    'div_12:ul:li': 'line item without id 1',
    'div_12:ul:li_1': 'line item without id 2',
    'div_12:ul:li_2': 'line item without id 3',
    'line-items:li': 'line item with id 1',
    'line-items:li_1': 'line item with id 2',
    'line-items:li_2': 'line item with id 3',
    'p_13': [
      'A paragraph with {1} is converted to {2}.',
      'parameters',
      '<i18n-format>'
    ],
    'paragraph': [
      'A paragraph with {1} is converted to {2}.',
      'id',
      '<i18n-format>'
    ],
    'text_15': ' outermost text at the end '
  };
  var text_template_default_lang_fr = {
    'model': {},
    'text': ' fr outermost text at the beginning ',
    'h1_3': 'fr outermost header 1',
    'text_4': ' fr outermost text in the middle ',
    'span_5': 'fr simple text without id',
    'span_6': 'fr simple text without id 2',
    'label-1': 'fr simple text with id',
    'label-2': 'fr simple text with id 2',
    'div_9:span': 'fr simple text within div',
    'div_9:span_1': 'fr simple text within div 2',
    'div_9:div_2:div': 'fr great grandchild text within div',
    'div_10:text': ' fr simple text as the first element in div ',
    'div_10:span_1': 'fr simple text within div',
    'div_10:text_2': ' fr simple text in the middle of div ',
    'div_10:span_3': 'fr simple text within div 2',
    'div_10:div_4:div': 'fr great grandchild text within div',
    'div_10:text_5': ' fr simple text at the last element in div ',
    'toplevel-div:span': 'fr simple text within div',
    'toplevel-div:span_1': 'fr simple text within div 2',
    'third-level-div': 'fr great grandchild text within div',
    'second-level-div:div_1': 'fr great grandchild text within div without id',
    'div_12:ul:li': 'fr line item without id 1',
    'div_12:ul:li_1': 'fr line item without id 2',
    'div_12:ul:li_2': 'fr line item without id 3',
    'line-items:li': 'fr line item with id 1',
    'line-items:li_1': 'fr line item with id 2',
    'line-items:li_2': 'fr line item with id 3',
    'p_13': [
      'fr A paragraph with {1} is converted to {2}.',
      'fr parameters',
      'fr <i18n-format>'
    ],
    'paragraph': [
      'fr A paragraph with {1} is converted to {2}.',
      'fr id',
      'fr <i18n-format>'
    ],
    'text_15': ' fr outermost text at the end '
  };
  var localDOM_template_default_lang = [
    { select: 'div:not([id])', 'previousTextSibling.data.trim': ' outermost text at the beginning ' },
    { select: 'h1', textContent: 'outermost header 1' },
    { select: 'h1', 'nextTextSibling.data.trim': ' outermost text in the middle ' },
    { select: 'span:not([id])', textContent: [ 'simple text without id', 'simple text without id 2' ] },
    { select: 'span[id="label-1"]', textContent: 'simple text with id' },
    { select: 'span[id="label-2"]', textContent: 'simple text with id 2' },
    { select: 'span[id="label-2"] + div span:not([id])', textContent:  [ 'simple text within div', 'simple text within div 2' ] },
    { select: 'span[id="label-2"] + div div:not([id]) div:not([id])', textContent: [ 'great grandchild text within div' ] },
    { select: 'span[id="label-2"] + div + div', 'childNodes.0.data.trim': ' simple text as the first element in div ' },
    { select: 'span[id="label-2"] + div + div span:not([id])', textContent:  [ 'simple text within div', 'simple text within div 2' ] },
    { select: 'span[id="label-2"] + div + div span:not([id])', 'nextTextSibling.data.trim': ' simple text in the middle of div ' },
    { select: 'span[id="label-2"] + div + div div:not([id]) div:not([id])', textContent: 'great grandchild text within div' },
    { select: 'span[id="label-2"] + div + div div:not([id])', 'nextTextSibling.data.trim': ' simple text at the last element in div ' },
    { select: '[id="toplevel-div"] span:not([id])', textContent: [ 'simple text within div', 'simple text within div 2' ] },
    { select: '[id="third-level-div"]', textContent: 'great grandchild text within div' },
    { select: '[id="second-level-div"] div:not([id])', textContent: 'great grandchild text within div without id' },
    { select: 'div ul:not([id]) li:not([id])', textContent: [ 'line item without id 1', 'line item without id 2', 'line item without id 3' ] },
    { select: '[id="line-items"] li:not([id])', textContent: [ 'line item with id 1', 'line item with id 2', 'line item with id 3' ] },
    { select: 'p:not([id]) i18n-format', 
      'PolymerDom.children.0.textContent': 'A paragraph with {1} is converted to {2}.' },
    { select: 'p:not([id]) i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'parameters',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: 'p:not([id]) i18n-format',
      'PolymerDom.children.2.tagName': 'CODE',
      'PolymerDom.children.2.textContent': '<i18n-format>',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.0.textContent': 'A paragraph with {1} is converted to {2}.' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'id',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.2.tagName': 'CODE',
      'PolymerDom.children.2.textContent': '<i18n-format>',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[id="paragraph"]', 'nextTextSibling.data.trim': ' outermost text at the end ' }
  ];
  var localDOM_template_default_lang_fr = [
    { select: 'div:not([id])', 'previousTextSibling.data.trim': 'fr outermost text at the beginning' },
    { select: 'h1', textContent: 'fr outermost header 1' },
    { select: 'h1', 'nextTextSibling.data.trim': 'fr outermost text in the middle' },
    { select: 'span:not([id])', textContent: [ 'fr simple text without id', 'fr simple text without id 2' ] },
    { select: 'span[id="label-1"]', textContent: 'fr simple text with id' },
    { select: 'span[id="label-2"]', textContent: 'fr simple text with id 2' },
    { select: 'span[id="label-2"] + div span:not([id])', textContent:  [ 'fr simple text within div', 'fr simple text within div 2' ] },
    { select: 'span[id="label-2"] + div div:not([id]) div:not([id])', textContent: [ 'fr great grandchild text within div' ] },
    { select: 'span[id="label-2"] + div + div', 'childNodes.0.data.trim': 'fr simple text as the first element in div' },
    { select: 'span[id="label-2"] + div + div span:not([id])', textContent:  [ 'fr simple text within div', 'fr simple text within div 2' ] },
    { select: 'span[id="label-2"] + div + div span:not([id])', 'nextTextSibling.data.trim': 'fr simple text in the middle of div' },
    { select: 'span[id="label-2"] + div + div div:not([id]) div:not([id])', textContent: 'fr great grandchild text within div' },
    { select: 'span[id="label-2"] + div + div div:not([id])', 'nextTextSibling.data.trim': 'fr simple text at the last element in div' },
    { select: '[id="toplevel-div"] span:not([id])', textContent: [ 'fr simple text within div', 'fr simple text within div 2' ] },
    { select: '[id="third-level-div"]', textContent: 'fr great grandchild text within div' },
    { select: '[id="second-level-div"] div:not([id])', textContent: 'fr great grandchild text within div without id' },
    { select: 'div ul:not([id]) li:not([id])', textContent: [ 'fr line item without id 1', 'fr line item without id 2', 'fr line item without id 3' ] },
    { select: '[id="line-items"] li:not([id])', textContent: [ 'fr line item with id 1', 'fr line item with id 2', 'fr line item with id 3' ] },
    { select: 'p:not([id]) i18n-format', 
      'PolymerDom.children.0.textContent': 'fr A paragraph with {1} is converted to {2}.' },
    { select: 'p:not([id]) i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'fr parameters',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: 'p:not([id]) i18n-format',
      'PolymerDom.children.2.tagName': 'CODE',
      'PolymerDom.children.2.textContent': 'fr <i18n-format>',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.0.textContent': 'fr A paragraph with {1} is converted to {2}.' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'fr id',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.2.tagName': 'CODE',
      'PolymerDom.children.2.textContent': 'fr <i18n-format>',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[id="paragraph"]', 'nextTextSibling.data.trim': 'fr outermost text at the end' }
  ];
  var text_simple = {
    'model': {},
    'text': ' outermost text at the beginning ',
    'h1_3': 'outermost header 1',
    'text_4': ' outermost text in the middle ',
    'span_5': 'simple text without id',
    'span_6': 'simple text without id 2',
    'label-1': 'simple text with id',
    'label-2': 'simple text with id 2',
    'div_9:span': 'simple text within div',
    'div_9:span_1': 'simple text within div 2',
    'div_9:div_2:div': 'great grandchild text within div',
    'div_10:text': ' simple text as the first element in div ',
    'div_10:span_1': 'simple text within div',
    'div_10:text_2': ' simple text in the middle of div ',
    'div_10:span_3': 'simple text within div 2',
    'div_10:div_4:div': 'great grandchild text within div',
    'div_10:text_5': ' simple text at the last element in div ',
    'toplevel-div:span': 'simple text within div',
    'toplevel-div:span_1': 'simple text within div 2',
    'third-level-div': 'great grandchild text within div',
    'second-level-div:div_1': 'great grandchild text within div without id',
    'div_12:ul:li': 'line item without id 1',
    'div_12:ul:li_1': 'line item without id 2',
    'div_12:ul:li_2': 'line item without id 3',
    'line-items:li': 'line item with id 1',
    'line-items:li_1': 'line item with id 2',
    'line-items:li_2': 'line item with id 3',
    'p_13': [
      'A paragraph with {1} is converted to {2}.',
      'parameters',
      '<i18n-format>'
    ],
    'paragraph': [
      'A paragraph with {1} is converted to {2}.',
      'id',
      '<i18n-format>'
    ],
    'text_15': ' outermost text at the end '
  };
  var localDOM_simple = [
    { select: 'div:not([id])', 'previousTextSibling.data.trim': 'outermost text at the beginning' },
    { select: 'h1', textContent: 'outermost header 1' },
    { select: 'h1', 'nextTextSibling.data.trim': 'outermost text in the middle' },
    { select: 'span:not([id])', textContent: [ 'simple text without id', 'simple text without id 2' ] },
    { select: 'span[id="label-1"]', textContent: 'simple text with id' },
    { select: 'span[id="label-2"]', textContent: 'simple text with id 2' },
    { select: 'span[id="label-2"] + div span:not([id])', textContent:  [ 'simple text within div', 'simple text within div 2' ] },
    { select: 'span[id="label-2"] + div div:not([id]) div:not([id])', textContent: [ 'great grandchild text within div' ] },
    { select: 'span[id="label-2"] + div + div', 'childNodes.0.data.trim': 'simple text as the first element in div' },
    { select: 'span[id="label-2"] + div + div span:not([id])', textContent:  [ 'simple text within div', 'simple text within div 2' ] },
    { select: 'span[id="label-2"] + div + div span:not([id])', 'nextTextSibling.data.trim': 'simple text in the middle of div' },
    { select: 'span[id="label-2"] + div + div div:not([id]) div:not([id])', textContent: 'great grandchild text within div' },
    { select: 'span[id="label-2"] + div + div div:not([id])', 'nextTextSibling.data.trim': 'simple text at the last element in div' },
    { select: '[id="toplevel-div"] span:not([id])', textContent: [ 'simple text within div', 'simple text within div 2' ] },
    { select: '[id="third-level-div"]', textContent: 'great grandchild text within div' },
    { select: '[id="second-level-div"] div:not([id])', textContent: 'great grandchild text within div without id' },
    { select: 'div ul:not([id]) li:not([id])', textContent: [ 'line item without id 1', 'line item without id 2', 'line item without id 3' ] },
    { select: '[id="line-items"] li:not([id])', textContent: [ 'line item with id 1', 'line item with id 2', 'line item with id 3' ] },
    { select: 'p:not([id]) i18n-format', 
      'PolymerDom.children.0.textContent': 'A paragraph with {1} is converted to {2}.' },
    { select: 'p:not([id]) i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'parameters',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: 'p:not([id]) i18n-format',
      'PolymerDom.children.2.tagName': 'CODE',
      'PolymerDom.children.2.textContent': '<i18n-format>',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.0.textContent': 'A paragraph with {1} is converted to {2}.' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'id',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.2.tagName': 'CODE',
      'PolymerDom.children.2.textContent': '<i18n-format>',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[id="paragraph"]', 'nextTextSibling.data.trim': 'outermost text at the end' }
  ];

  var suites = [
    s('template default lang element', null, { 
      fixture: 'template-default-lang-element-fixture', 
      fixtureModel: undefined, 
      assign: undefined,
      lang: lang2,
      effectiveLang: lang2,
      templateDefaultLang: lang2,
      observeHtmlLang: true,
      text: text_template_default_lang,
      //model: {},
      localDOM: localDOM_template_default_lang,
      lightDOM: undefined
    }),
    s(lang6 + ' template default lang element', 'template default lang element', { 
      timeout: 60000,
      assign: { lang: lang6 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang5 + ' template default lang element', 'template default lang element', { 
      timeout: 60000,
      assign: { lang: lang5 },
      lang: lang5,
      effectiveLang: lang5,
      text: text_template_default_lang,
      localDOM: localDOM_template_default_lang
    }),
    s('null template default lang element', null, { 
      fixture: 'null-template-default-lang-element-fixture', 
      fixtureModel: undefined, 
      assign: undefined,
      lang: lang1,
      effectiveLang: lang1,
      templateDefaultLang: lang0,
      observeHtmlLang: true,
      text: text_simple,
      //model: {},
      localDOM: localDOM_simple,
      lightDOM: undefined
    }),
    s(lang6 + ' null template default lang element', 'null template default lang element', { 
      timeout: 60000,
      assign: { lang: lang6 },
      lang: lang1,
      effectiveLang: lang1
    }),
    s(lang5 + ' null template default lang element', 'null template default lang element', { 
      timeout: 60000,
      assign: { lang: lang5 },
      lang: lang5,
      effectiveLang: lang5
    }),
    s(lang3 + ' null template default lang element', 'null template default lang element', { 
      timeout: 60000,
      assign: { lang: lang3 },
      lang: lang1,
      effectiveLang: lang1
    }),
  ];

  suitesRunner(suites);

});
