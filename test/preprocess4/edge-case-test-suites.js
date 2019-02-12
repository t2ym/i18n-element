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
  var lang7 = 'zh-yue-Hans-CN';
  var lang8 = 'zh-CN';
  var lang9 = 'zh-TW';
  var lang10 = 'zh-Hans-CN-x-Linux';
  var text_complex_compound_binding = {
    'model': {},
    "item-update2": [
      "updated: {1}, by: {2} xxx {3} {4} {5} hello ",
      "{{parts.0}}",
      "{{parts.1}}",
      "{{parts.2}}",
      "abc",
      "{{parts.3}}"
    ],
    "item-update": [
      "updated: {1}, by: {2} xxx {3} {4} {5} hello {6} {7} {8} ",
      "{{parts.4}}",
      "{{parts.5}}",
      "{{parts.6}}",
      "abc",
      "{{parts.7}}",
      "{{parts.8}}",
      "{{parts.9}}",
      "{{parts.10}}"
    ],
    "item-update3": [
      "updated: {1}, by: {2} xxx {3} {4} {5} hello ",
      "{{parts.11}}",
      "{{parts.12}}",
      "{{parts.13}}",
      "abc",
      "{{parts.14}}"
    ],
    "item-update4": [
      "updated: {1}, by: {2} xxx {3} {4} {5} hello ",
      "{{parts.15}}",
      "{{parts.16}}",
      "{{parts.17}}",
      "abc",
      "{{parts.18}}"
    ],
    "paragraph": [
      "A paragraph with {1} is converted to {2}. ",
      "{{parts.19}}",
      "<i18n-format>"
    ],
    "paragraph2": [
      "A paragraph with deep {1} is {2} converted to {3}. {4} {5} {6} ",
      "{{parts.20}}",
      "not",
      "<i18n-format>",
      "{{parts.21}}",
      "{{parts.22}}",
      "{{parts.23}}"
    ],
    'authors': [
      {
        'name': 'Joe'
      },
      {
        'name': 'Alice'
      }
    ],
    'updated': 'Jan 1st, 2016',
    'parameters': [
      'parameter 1',
      'parameter 2'
    ],
    'if-content': 'IF CONTENT',
    'if-content2': 'IF CONTENT 2',
    'if': 'IF',
    'content': 'CONTENT',
  };
  var localDOM_complex_compound_binding = [
    { select: '[id="item-update"] i18n-format',
      'childNodes.nonWS.0.textContent': text_complex_compound_binding['item-update'][0],
      'shadowRoot.childNodes.nonWS.0.data': 'updated: ',
      'shadowRoot.childNodes.nonWS.1.assignedNodes.0.textContent': text_complex_compound_binding.updated,
      'shadowRoot.childNodes.nonWS.2.data.raw': ', by: ',
      'shadowRoot.childNodes.nonWS.4.data.raw': ' xxx ',
      'shadowRoot.childNodes.nonWS.8.data.raw': ' hello ',
    },
    { select: '[id="item-update"] i18n-format',
      'childNodes.nonWS.2.children.0.textContent.trim': text_complex_compound_binding.authors[0].name,
      'childNodes.nonWS.2.children.1.textContent.trim': text_complex_compound_binding.authors[1].name,
      'childNodes.nonWS.3.tagName': 'SPAN',
      'childNodes.nonWS.3.children.0.tagName': 'B',
      'childNodes.nonWS.3.children.0.textContent': text_complex_compound_binding['if-content'],
      'childNodes.nonWS.4.tagName': 'B',
      'childNodes.nonWS.4.textContent': text_complex_compound_binding['item-update'][4],
      'childNodes.nonWS.5.textContent.trim': text_complex_compound_binding['if-content2'],
      'childNodes.nonWS.6.tagName': 'SPAN',
      'childNodes.nonWS.6.textContent.raw': '',
      'childNodes.nonWS.7.tagName': 'SPAN',
      'childNodes.nonWS.7.textContent.raw': ' ',
      'childNodes.nonWS.8.textContent.trim': text_complex_compound_binding.updated,
    },
    { select: '[id="item-update2"] i18n-format',
      'childNodes.nonWS.0.textContent': text_complex_compound_binding['item-update2'][0],
      'shadowRoot.childNodes.nonWS.1.assignedNodes.0.textContent': text_complex_compound_binding.updated,
      'shadowRoot.childNodes.nonWS.2.nodeValue.raw': ', by: '
    },
    { select: '[id="item-update2"] i18n-format',
      'childNodes.nonWS.2.childNodes.nonWS.0.data.trim': text_complex_compound_binding.authors[0].name,
      'childNodes.nonWS.2.childNodes.nonWS.1.data.trim': text_complex_compound_binding.authors[1].name,
      'childNodes.nonWS.3.tagName': 'SPAN',
      'childNodes.nonWS.3.children.0.children.0.textContent.trim': text_complex_compound_binding['if-content'],
      'childNodes.nonWS.4.tagName': 'B',
      'childNodes.nonWS.4.textContent': text_complex_compound_binding['item-update2'][4],
      'childNodes.nonWS.5.childNodes.nonWS.0.textContent.trim': text_complex_compound_binding['if-content2'],
    },
    { select: '[id="item-update3"] i18n-format',
      'childNodes.nonWS.2.childNodes.nonWS.0.data.trim': text_complex_compound_binding.authors[0].name,
      'childNodes.nonWS.2.childNodes.nonWS.1.data.trim': text_complex_compound_binding.authors[1].name,
      'childNodes.nonWS.3.tagName': 'SPAN',
      'childNodes.nonWS.3.children.0.tagName': 'B',
      'childNodes.nonWS.3.children.0.textContent.trim': text_complex_compound_binding['if'],
      'childNodes.nonWS.3.children.1.tagName': 'B',
      'childNodes.nonWS.3.children.1.textContent.trim': text_complex_compound_binding['content'],
      'childNodes.nonWS.4.textContent.trim': text_complex_compound_binding['item-update3'][4],
      'childNodes.nonWS.5.tagName': 'SPAN',
      'childNodes.nonWS.5.textContent': text_complex_compound_binding['if-content2'],
    },
    { select: '[id="item-update4"] i18n-format',
      'childNodes.0.childNodes.nonWS.0.textContent': text_complex_compound_binding['item-update4'][0],
      'shadowRoot.childNodes.nonWS.1.assignedNodes.0.textContent': text_complex_compound_binding.updated,
      'shadowRoot.childNodes.nonWS.2.nodeValue.raw': ', by: '
    },
    { select: '[id="item-update4"] i18n-format',
      'childNodes.nonWS.2.childNodes.nonWS.0.data.trim': text_complex_compound_binding.authors[0].name,
      'childNodes.nonWS.2.childNodes.nonWS.1.data.raw': ' = ',
      'childNodes.nonWS.2.childNodes.nonWS.2.data.trim': text_complex_compound_binding.updated,
      'childNodes.nonWS.2.childNodes.nonWS.3.data.trim': text_complex_compound_binding.authors[1].name,
      'childNodes.nonWS.2.childNodes.nonWS.4.data.raw': ' = ',
      'childNodes.nonWS.2.childNodes.nonWS.5.data.trim': text_complex_compound_binding.updated,
      'childNodes.nonWS.3.tagName': 'SPAN',
      'childNodes.nonWS.3.children.0.tagName': 'B',
      'childNodes.nonWS.3.children.0.textContent.trim': text_complex_compound_binding['if-content'],
      'childNodes.nonWS.4.textContent.trim': text_complex_compound_binding['item-update4'][4],
      'childNodes.nonWS.5.tagName': 'SPAN',
      'childNodes.nonWS.5.textContent': text_complex_compound_binding['if-content2'],
    },
    { select: '[id="paragraph"] i18n-format',
      'childNodes.nonWS.0.childNodes.nonWS.0.data': text_complex_compound_binding['paragraph'][0],
      'childNodes.nonWS.1.children.0.tagName': 'I',
      'childNodes.nonWS.1.children.0.textContent.trim': text_complex_compound_binding.parameters[0],
      'childNodes.nonWS.1.children.1.tagName': 'I',
      'childNodes.nonWS.1.children.1.textContent.trim': text_complex_compound_binding.parameters[1],
    },
    { select: '[id="paragraph"] i18n-format',
      'childNodes.nonWS.2.tagName': 'CODE',
      'childNodes.nonWS.2.textContent': text_complex_compound_binding['paragraph'][2],
    },
    { select: '[id="paragraph2"] i18n-format',
      'childNodes.nonWS.0.childNodes.nonWS.0.data': text_complex_compound_binding['paragraph2'][0],
      'childNodes.nonWS.1.tagName': 'SPAN',
      'childNodes.nonWS.1.children.0.tagName': 'SPAN',
      'childNodes.nonWS.1.children.0.children.0.tagName': 'I',
      'childNodes.nonWS.1.children.0.children.0.textContent.trim': text_complex_compound_binding.parameters[0],
      'childNodes.nonWS.1.children.1.children.0.tagName': 'I',
      'childNodes.nonWS.1.children.1.children.0.textContent.trim': text_complex_compound_binding.parameters[1],
      'childNodes.nonWS.2.tagName': 'B',
      'childNodes.nonWS.2.textContent.trim': text_complex_compound_binding['paragraph2'][2],
    },
    { select: '[id="paragraph2"] i18n-format',
      'shadowRoot.childNodes.nonWS.2.data.raw': ' is ',
      'shadowRoot.childNodes.nonWS.3.assignedNodes.0.tagName': 'B',
      'shadowRoot.childNodes.nonWS.3.assignedNodes.0.textContent.trim': text_complex_compound_binding['paragraph2'][2],
      'shadowRoot.childNodes.nonWS.4.data.raw': ' converted to ',
      'shadowRoot.childNodes.nonWS.5.assignedNodes.0.tagName': 'CODE',
      'shadowRoot.childNodes.nonWS.5.assignedNodes.0.textContent.trim': text_complex_compound_binding['paragraph2'][3],
      'shadowRoot.childNodes.nonWS.6.data.raw': '. ',
    },
  ];
  var text_advanced_binding = {
    "model": {
      "aria-attributes": {
        "title": "tooltip text",
        "aria-label": "aria label text",
        "aria-valuetext": "aria value text"
      }
    },
    "annotated-format": [
      "{{parts.2}}",
      "{{parts.3}}",
      "string parameter"
    ],
    "span_5": [
      "{1} {2}",
      "{{parts.6}}",
      "{{parts.7}}"
    ],
    "statusMessages": {
      "ok": "healthy status",
      "busy": "busy status",
      "error": "error status",
      "default": "unknown status"
    },
    "defaultValue": "default value",
    "statusMessageFormats": {
      "ok": "healthy status",
      "busy": "busy status with {2}",
      "error": "error status with {1} and {2}",
      "default": "unknown status"
    },
    "nodefault": {
      "ok": "ok status"
    }
  };
  var localDOM_advanced_binding_1 = [
    { select: '[id="status"]', textContent: 'healthy status' },
    { select: '[id="default"]', 'textContent.raw': 'initial value' },
    { select: '[id="annotated-format"]',
      'shadowRoot.textContent': 'healthy status' },
    { select: '[id="aria-attributes"]',
      'attributes.title.value.text': 'tooltip text',
      'attributes.aria-label.value.text': 'aria label text',
      'attributes.aria-valuetext.value.text': 'aria value text',
      'bindvalue.raw': 'initial value' }
  ];
  var localDOM_advanced_binding_2 = [
    { select: '[id="status"]', textContent: 'busy status' },
    { select: '[id="default"]', textContent: 'default value' },
    { select: '[id="annotated-format"]',
      'shadowRoot.childNodes.nonWS.0.textContent': 'busy status with ',
      'shadowRoot.childNodes.nonWS.1.assignedNodes.0.textContent': 'string parameter' },
    { select: '[id="aria-attributes"]',
      'attributes.title.value.text': 'tooltip text',
      'attributes.aria-label.value.text': 'aria label text',
      'attributes.aria-valuetext.value.text': 'aria value text',
      'bindvalue.raw': '' }
  ];
  var localDOM_advanced_binding_3 = [
    { select: '[id="status"]', textContent: 'error status' },
    { select: '[id="default"]', textContent: 'default value' },
    { select: '[id="annotated-format"]',
      'shadowRoot.childNodes.nonWS.0.textContent': 'error status with ',
      'shadowRoot.childNodes.nonWS.1.assignedNodes.0.textContent.raw': 'parameter text',
      'shadowRoot.childNodes.nonWS.2.textContent.raw': ' and ',
      'shadowRoot.childNodes.nonWS.3.assignedNodes.0.textContent': 'string parameter' },
    { select: '[id="aria-attributes"]',
      'attributes.title.value.text': 'tooltip text',
      'attributes.aria-label.value.text': 'aria label text',
      'attributes.aria-valuetext.value.text': 'aria value text',
      'bindvalue.raw': null }
  ];
  var localDOM_advanced_binding_4 = [
    { select: '[id="status"]', textContent: 'unknown status' },
    { select: '[id="default"]', textContent: 'default value' },
    { select: '[id="annotated-format"]',
      'shadowRoot.childNodes.nonWS.0.textContent': 'unknown status' },
    { select: '[id="aria-attributes"]',
      'attributes.title.value.text': 'tooltip text',
      'attributes.aria-label.value.text': 'aria label text',
      'attributes.aria-valuetext.value.text': 'aria value text',
      'bindValue.raw': undefined }
  ];

  var suites = [
    s('empty element', null, {
      fixture: 'empty-element-fixture', 
      fixtureModel: undefined,
      assign: undefined,
      lang: lang1,
      effectiveLang: lang1,
      templateDefaultLang: lang1,
      observeHtmlLang: true,
      //text: { model: {} },
      //model: {},
      localDOM: undefined,
      lightDOM: undefined
    }),
    s(lang2 + ' empty element', 'empty element', {
      fixture: 'bound-empty-element-fixture',
      fixtureModel: { observeHtmlLang: false, lang: lang1 },
      assign: { lang: lang2 },
      event: 'lang-updated',
      lang: lang2,
      effectiveLang: lang2,
      observeHtmlLang: false
    }),
    s('no template element', 'empty element', {
      fixture: 'no-template-element-fixture'
    }),
    s('complex compound binding element', 'empty element', {
      setup: true,
      fixture: 'complex-compound-binding-element-fixture',
      fixtureModel: { observeHtmlLang: false, lang: lang0 },
      assign: { lang: lang1 },
      event: 'local-dom-ready',
      lang: lang1,
      effectiveLang: lang1,
      observeHtmlLang: false,
      text: text_complex_compound_binding,
      localDOM: localDOM_complex_compound_binding
    }),
    s(lang2 + ' complex compound binding element', 'complex compound binding element', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s('advanced binding element', 'empty element', {
      setup: true,
      fixture: 'advanced-binding-element-fixture',
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0,
        status: 'ok',
        value: 'initial value',
        parameter: 'parameter text'
      },
      assign: { lang: lang1 },
      event: 'local-dom-ready',
      lang: lang1,
      effectiveLang: lang1,
      observeHtmlLang: false,
      text: text_advanced_binding,
      //model: text_advanced_binding.model,
      localDOM: localDOM_advanced_binding_1
    }),
    s('advanced binding element 2', 'advanced binding element', {
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0,
        status: 'busy',
        value: '',
        parameter: 'parameter text'
      },
      localDOM: localDOM_advanced_binding_2
    }),
    s('advanced binding element 3', 'advanced binding element', {
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0,
        status: 'error',
        value: null,
        parameter: 'parameter text'
      },
      localDOM: localDOM_advanced_binding_3
    }),
    s('advanced binding element 4', 'advanced binding element', {
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0,
        status: null,
        value: undefined,
        parameter: 'parameter text'
      },
      localDOM: localDOM_advanced_binding_4
    }),
    s(lang2 + ' advanced binding element', 'advanced binding element', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang2 + ' advanced binding element 2', 'advanced binding element 2', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang2 + ' advanced binding element 3', 'advanced binding element 3', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang2 + ' advanced binding element 4', 'advanced binding element 4', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang7 + ' fallback', 'advanced binding element 4', {
      timeout: 60000,
      assign: { lang: lang7 },
      lang: lang1,
      effectiveLang: lang1
    }),
    s(lang8 + ' fallback', lang7 + ' fallback', {
      assign: { lang: lang8 }
    }),
    s(lang9 + ' fallback', lang7 + ' fallback', {
      assign: { lang: lang9 }
    }),
    s(lang10 + ' fallback', lang7 + ' fallback', {
      assign: { lang: lang10 }
    }),
  ];

  suitesRunner(suites);

});
