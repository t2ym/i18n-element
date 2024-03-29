/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import './test-runner.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';

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
    { select: 'div:not([id])', 'previousTextSibling.data': ' outermost text at the beginning ' },
    { select: 'h1', textContent: 'outermost header 1' },
    { select: 'h1', 'nextTextSibling.data': ' outermost text in the middle ' },
    { select: 'span:not([id])', textContent: [ 'simple text without id', 'simple text without id 2' ] },
    { select: 'span[id="label-1"]', textContent: 'simple text with id' },
    { select: 'span[id="label-2"]', textContent: 'simple text with id 2' },
    { select: 'span[id="label-2"] + div span:not([id])', textContent:  [ 'simple text within div', 'simple text within div 2' ] },
    { select: 'span[id="label-2"] + div div:not([id]) div:not([id])', textContent: [ 'great grandchild text within div' ] },
    { select: 'span[id="label-2"] + div + div', 'childNodes.0.data': ' simple text as the first element in div ' },
    { select: 'span[id="label-2"] + div + div span:not([id])', textContent:  [ 'simple text within div', 'simple text within div 2' ] },
    { select: 'span[id="label-2"] + div + div span:not([id])', 'nextTextSibling.data': ' simple text in the middle of div ' },
    { select: 'span[id="label-2"] + div + div div:not([id]) div:not([id])', textContent: 'great grandchild text within div' },
    { select: 'span[id="label-2"] + div + div div:not([id])', 'nextTextSibling.data': ' simple text at the last element in div ' },
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
    { select: '[id="paragraph"]', 'nextTextSibling.data': ' outermost text at the end ' }
  ];
  var text_simple_text_id = {
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
    'second-level-div': [
      ' {1}\n        {2} ',
      'great grandchild text within div',
      'great grandchild text within div without id'
    ],
    'div_12:ul:li': 'line item without id 1',
    'div_12:ul:li_1': 'line item without id 2',
    'div_12:ul:li_2': 'line item without id 3',
    'line-items': [
      ' {1}\n        {2}\n        {3} ',
      'line item with id 1',
      'line item with id 2',
      'line item with id 3'
    ],
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
  var localDOM_simple_text_id = [
    { select: 'div:not([text-id])', 'previousTextSibling.data': ' outermost text at the beginning ' },
    { select: 'h1', textContent: 'outermost header 1' },
    { select: 'h1', 'nextTextSibling.data': ' outermost text in the middle ' },
    { select: 'span:not([text-id])', textContent: [ 'simple text without id', 'simple text without id 2' ] },
    { select: 'span[text-id="label-1"]', textContent: 'simple text with id' },
    { select: 'span[text-id="label-2"]', textContent: 'simple text with id 2' },
    { select: 'span[text-id="label-2"] + div span:not([text-id])', textContent:  [ 'simple text within div', 'simple text within div 2' ] },
    { select: 'span[text-id="label-2"] + div div:not([text-id]) div:not([text-id])', textContent: [ 'great grandchild text within div' ] },
    { select: 'span[text-id="label-2"] + div + div', 'childNodes.0.data': ' simple text as the first element in div ' },
    { select: 'span[text-id="label-2"] + div + div span:not([text-id])', textContent:  [ 'simple text within div', 'simple text within div 2' ] },
    { select: 'span[text-id="label-2"] + div + div span:not([text-id])', 'nextTextSibling.data': ' simple text in the middle of div ' },
    { select: 'span[text-id="label-2"] + div + div div:not([text-id]) div:not([text-id])', textContent: 'great grandchild text within div' },
    { select: 'span[text-id="label-2"] + div + div div:not([text-id])', 'nextTextSibling.data': ' simple text at the last element in div ' },
    { select: '[text-id="toplevel-div"] span:not([text-id])', textContent: [ 'simple text within div', 'simple text within div 2' ] },
    { select: '[text-id="second-level-div"] i18n-format',
      'PolymerDom.children.0.textContent': ' {1}\n        {2} ' },
    { select: '[text-id="second-level-div"] i18n-format',
      'PolymerDom.children.1.tagName': 'DIV',
      'PolymerDom.children.1.textContent': 'great grandchild text within div',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: '[text-id="second-level-div"] i18n-format',
      'PolymerDom.children.2.tagName': 'DIV',
      'PolymerDom.children.2.textContent': 'great grandchild text within div without id',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: 'div ul:not([text-id]) li:not([text-id])', textContent: [ 'line item without id 1', 'line item without id 2', 'line item without id 3' ] },
    { select: '[text-id="line-items"] i18n-format',
      'PolymerDom.children.0.textContent': ' {1}\n        {2}\n        {3} ' },
    { select: '[text-id="line-items"] i18n-format',
      'PolymerDom.children.1.tagName': 'LI',
      'PolymerDom.children.1.textContent': 'line item with id 1',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: '[text-id="line-items"] i18n-format',
      'PolymerDom.children.2.tagName': 'LI',
      'PolymerDom.children.2.textContent': 'line item with id 2',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[text-id="line-items"] i18n-format',
      'PolymerDom.children.3.tagName': 'LI',
      'PolymerDom.children.3.textContent': 'line item with id 3',
      'PolymerDom.children.3.attributes.slot.value': '3' },
    { select: 'p:not([text-id]) i18n-format', 
      'PolymerDom.children.0.textContent': 'A paragraph with {1} is converted to {2}.' },
    { select: 'p:not([text-id]) i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'parameters',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: 'p:not([text-id]) i18n-format',
      'PolymerDom.children.2.tagName': 'CODE',
      'PolymerDom.children.2.textContent': '<i18n-format>',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[text-id="paragraph"] i18n-format',
      'PolymerDom.children.0.textContent': 'A paragraph with {1} is converted to {2}.' },
    { select: '[text-id="paragraph"] i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'id',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: '[text-id="paragraph"] i18n-format',
      'PolymerDom.children.2.tagName': 'CODE',
      'PolymerDom.children.2.textContent': '<i18n-format>',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[text-id="paragraph"]', 'nextTextSibling.data': ' outermost text at the end ' }
  ];
  var sender1 = {
    'name': 'Joe',
    'gender': 'male'
  };
  var recipients1 = [
    { 'name': 'Alice', 'gender': 'female' },
    { 'name': 'Bob', 'gender': 'male' },
    { 'name': 'Yoda', 'gender': 'other' }
  ];
  var recipients2 = [
    { 'name': 'Alice', 'gender': 'female' },
    { 'name': 'Bob', 'gender': 'male' }
  ];
  var recipients3 = [
    { 'name': 'Bob', 'gender': 'male' }
  ];
  var recipients4 = [];
  var text_plural_gender = {
    'model': {},
    'compound-format-text': [
      {
        '0': 'You ({3}) gave no gifts.',
        '1': {
          'male': 'You ({3}) gave him ({4}) {5}.',
          'female': 'You ({3}) gave her ({4}) {5}.',
          'other': 'You ({3}) gave them ({4}) {5}.'
        },
        'one': {
          'male': 'You ({3}) gave him ({4}) and one other person {5}.',
          'female': 'You ({3}) gave her ({4}) and one other person {5}.',
          'other': 'You ({3}) gave them ({4}) and one other person {5}.'
        },
        'other': 'You ({3}) gave them ({4}) and {1} other people gifts.'
      },
      '{{parts.1 - 1}}',
      '{{parts.2}}',
      '{{parts.3}}',
      '{{parts.4}}',
      'a gift'
    ]
  };
  var localDOM_plural_gender_1 = [
    { select: '#compound-format-text', 'root.PolymerDom.textContent': 'You () gave them () and  other people gifts.' },
    { select: '#compound-format-text', 'PolymerDom.children.1.PolymerDom.childNodes.0.data.raw': '3' },
    { select: '#compound-format-text', 'PolymerDom.children.2.PolymerDom.childNodes.0.data.raw': 'female' },
    { select: '#compound-format-text', 'PolymerDom.children.3.PolymerDom.childNodes.0.data.raw': 'Joe' },
    { select: '#compound-format-text', 'PolymerDom.children.4.PolymerDom.childNodes.0.data.raw': 'Alice' },
    { select: '#compound-format-text', 'PolymerDom.children.5.PolymerDom.childNodes.0.data': 'a gift' }
  ];
  var localDOM_plural_gender_2 = [
    { select: '#compound-format-text', 'root.PolymerDom.textContent': 'You () gave her () and one other person .' },
    { select: '#compound-format-text', 'PolymerDom.children.1.PolymerDom.childNodes.0.data.raw': '2' },
    { select: '#compound-format-text', 'PolymerDom.children.2.PolymerDom.childNodes.0.data.raw': 'female' },
    { select: '#compound-format-text', 'PolymerDom.children.3.PolymerDom.childNodes.0.data.raw': 'Joe' },
    { select: '#compound-format-text', 'PolymerDom.children.4.PolymerDom.childNodes.0.data.raw': 'Alice' },
    { select: '#compound-format-text', 'PolymerDom.children.5.PolymerDom.childNodes.0.data': 'a gift' }
  ];
  var localDOM_plural_gender_3 = [
    { select: '#compound-format-text', 'root.PolymerDom.textContent': 'You () gave him () .' },
    { select: '#compound-format-text', 'PolymerDom.children.1.PolymerDom.childNodes.0.data.raw': '1' },
    { select: '#compound-format-text', 'PolymerDom.children.2.PolymerDom.childNodes.0.data.raw': 'male' },
    { select: '#compound-format-text', 'PolymerDom.children.3.PolymerDom.childNodes.0.data.raw': 'Joe' },
    { select: '#compound-format-text', 'PolymerDom.children.4.PolymerDom.childNodes.0.data.raw': 'Bob' },
    { select: '#compound-format-text', 'PolymerDom.children.5.PolymerDom.childNodes.0.data': 'a gift' }
  ];
  var localDOM_plural_gender_4 = [
    { select: '#compound-format-text', 'root.PolymerDom.textContent': 'You () gave no gifts.' },
    { select: '#compound-format-text', 'PolymerDom.children.1.PolymerDom.childNodes.0.data.raw': '0' },
    { select: '#compound-format-text', 'PolymerDom.children.2.PolymerDom.textContent.raw': '' },
    { select: '#compound-format-text', 'PolymerDom.children.3.PolymerDom.childNodes.0.data.raw': 'Joe' },
    { select: '#compound-format-text', 'PolymerDom.children.4.PolymerDom.textContent.raw': '' },
    { select: '#compound-format-text', 'PolymerDom.children.5.PolymerDom.childNodes.0.data': 'a gift' }
  ];
  var text_simple_attribute = {
    "model": {
      "standard-input": {
        "placeholder": "standard HTML5 attribute"
      },
      "outer-div:input_2": {
        "placeholder": "standard HTML5 attribute without id"
      },
      "paper-input-element": {
        "label": "paper-input label",
        "error-message": "paper-input error message",
        "placeholder": "paper-input placeholder"
      },
      "outer-div:paper-input_4": {
        "label": "paper-input label without id",
        "error-message": "paper-input error message without id",
        "placeholder": "paper-input placeholder without id"
      },
      "custom-attr": {
        "custom-text-attr1": "custom text attribute 1",
        "custom-text-attr2": "custom text attribute 2",
        "custom-text-attr3": "custom text attribute 3"
      },
      "selective-attr": {
        "custom-text-attr4": [
          "{1} custom-text-attr4 attribute with param {2} and param {3} {4}",
          "{{parts.5}}",
          "{{parts.6}}",
          "{{parts.7}}",
          "{{parts.8}}"
        ],
        "custom-text-attr5": [
          "{1} custom-text-attr5 attribute with param {2} and param {3}",
          "{{parts.9}}",
          "{{parts.10}}",
          "{{parts.11}}"
        ],
        "i18n-target": [
          "i18n-target attribute with param {1} and param {2}",
          "{{parts.12}}",
          "{{parts.13}}"
        ],
        "i18n-target2": [
          "i18n-target2 attribute with param {1} and param {2}",
          "{{parts.14}}",
          "{{parts.15}}"
        ]
      },
      "selective-attr2": {
        "i18n-target": "i18n-target attribute 2"
      },
      "selective-attr3": {
        "i18n-target6": "i18n-target6 attribute 2"
      },
      "selective-attr4": {
        "i18n-target6": "i18n-target6 attribute 3"
      },
      "json-data-id": {
        "attr1": "this attr1 is extracted",
        "i18n-target-attr": "this attribute is also extracted"
      },
      "template_2:json-data_1": {
        "attr1": "this attr1 without id is extracted",
        "i18n-target-attr": "this attribute without id is also extracted"
      }
    },
    "ordinary-div": "text 1",
    "pie-chart-options": {
      "title": "Distribution of days in 2001H1"
    },
    "pie-chart-cols": [
      {
        "label": "Month",
        "type": "string"
      },
      {
        "label": "Days",
        "type": "number"
      }
    ],
    "pie-chart-rows": [
      [
        "Jan",
        31
      ],
      [
        "Feb",
        28
      ],
      [
        "Mar",
        31
      ],
      [
        "Apr",
        30
      ],
      [
        "May",
        31
      ],
      [
        "Jun",
        30
      ]
    ],
    "column-chart-options": {
      "title": "Inventory"
    },
    "column-chart-data": [
      [
        "Year",
        "Things",
        "Stuff"
      ],
      [
        "2004",
        1000,
        400
      ],
      [
        "2005",
        1170,
        460
      ],
      [
        "2006",
        660,
        1120
      ],
      [
        "2007",
        1030,
        540
      ]
    ]
  };
  var model_simple_attribute = {
    'standard-input': {
      'placeholder': 'standard HTML5 attribute'
    },
    'outer-div:input_2': {
      'placeholder': 'standard HTML5 attribute without id'
    },
    'paper-input-element': {
      'label': 'paper-input label',
      'error-message': 'paper-input error message',
      'placeholder': 'paper-input placeholder'
    },
    'outer-div:paper-input_4': {
      'label': 'paper-input label without id',
      'error-message': 'paper-input error message without id',
      'placeholder': 'paper-input placeholder without id'
    },
    'pie-chart': {
      'options': {
        'title': 'Distribution of days in 2001H1'
      },
      'cols': [
        {
          'label': 'Month',
          'type': 'string'
        },
        {
          'label': 'Days',
          'type': 'number'
        }
      ],
      'rows': [
        [
          'Jan',
          31
        ],
        [
          'Feb',
          28
        ],
        [
          'Mar',
          31
        ],
        [
          'Apr',
          30
        ],
        [
          'May',
          31
        ],
        [
          'Jun',
          30
        ]
      ]
    },
    'column-chart': {
      'options': {
        'title': 'Inventory'
      },
      'data': [
        [
          'Year',
          'Things',
          'Stuff'
        ],
        [
          '2004',
          1000,
          400
        ],
        [
          '2005',
          1170,
          460
        ],
        [
          '2006',
          660,
          1120
        ],
        [
          '2007',
          1030,
          540
        ]
      ]
    },
    'custom-attr': {
      'custom-text-attr1': 'custom text attribute 1',
      'custom-text-attr2': 'custom text attribute 2',
      'custom-text-attr3': 'custom text attribute 3'
    },
    'selective-attr': {
      'custom-text-attr4': [
        '{1} custom-text-attr4 attribute with param {2} and param {3} {4}',
        '{{text.ordinary-div}}',
        '{{text.ordinary-div}}',
        '[[text.ordinary-div]]',
        '{{text.ordinary-div}}'
      ],
      'custom-text-attr5': [
        '[[text.ordinary-div]]',
        ' custom-text-attr5 attribute with param ',
        "{{or('',text.ordinary-div)}}",
        ' and param ',
        '[[text.ordinary-div]]'
      ],
      'i18n-target': [
        'i18n-target attribute with param {1} and param {2}',
        '{{text.ordinary-div}}',
        '[[text.ordinary-div]]'
      ],
      'i18n-target2': [
        'i18n-target2 attribute with param ',
        "{{or('',text.ordinary-div)}}",
        ' and param ',
        '[[text.ordinary-div]]'
      ]
    },
    'selective-attr2': {
      'i18n-target': 'i18n-target attribute 2'
    },
    'selective-attr3': {
      'i18n-target6': 'i18n-target6 attribute 2'
    },
    'selective-attr4': {
      'i18n-target6': 'i18n-target6 attribute 3'
    },
    'json-data-id': {
      'attr1': 'this attr1 is extracted',
      'i18n-target-attr': 'this attribute is also extracted'
    },
    'template_2:json-data_1': {
      'attr1': 'this attr1 without id is extracted',
      'i18n-target-attr': 'this attribute without id is also extracted'
    }
  };
  var localDOM_simple_attribute = [
    { select: 'input[id="standard-input"]', 'placeholder.text': 'standard HTML5 attribute' },
    { select: 'input[id="standard-input"] + input', 'placeholder.text': 'standard HTML5 attribute without id' },
    { select: 'paper-input[id="paper-input-element"]', 'label.text': 'paper-input label', 'errorMessage.text': 'paper-input error message', 'placeholder.text': 'paper-input placeholder' },
    { select: 'paper-input[id="paper-input-element"] + paper-input', 'label.text': 'paper-input label without id', 'errorMessage.text': 'paper-input error message without id', 'placeholder.text': 'paper-input placeholder without id' },
    { select: 'google-chart[id="pie-chart"]', 'options.title.text': 'Distribution of days in 2001H1', 'cols.0.label.text': 'Month', 'cols.1.label.text': 'Days', 'rows.0.0.text': 'Jan', 'rows.1.0.text': 'Feb', 'rows.2.0.text': 'Mar', 'rows.3.0.text': 'Apr', 'rows.4.0.text': 'May', 'rows.5.0.text': 'Jun' },
    { select: 'google-chart[id="column-chart"]', 'options.title.text': 'Inventory', 'data.0.0.text': 'Year', 'data.0.1.text': 'Things', 'data.0.2.text': 'Stuff' },
    { select: 'text-attribute-element[id="custom-attr"]', 'customTextAttr1.text': 'custom text attribute 1', 'customTextAttr2.text': 'custom text attribute 2', 'customTextAttr3.text': 'custom text attribute 3' },
    { select: 'text-attribute-element[id="selective-attr"]', 'i18nTarget.raw': 'i18n-target attribute with param text 1 and param text 1', 'i18nTarget2.raw': 'i18n-target2 attribute with param text 1 and param text 1' },
    { select: 'span[id="test-json-data-1"]', 'textContent': 'this attr1 is extracted' },
    { select: 'span[id="test-json-data-2"]', 'textContent': 'this attribute is also extracted' },
    { select: 'span[id="test-json-data-3"]', 'textContent': 'this attr1 without id is extracted' },
    { select: 'span[id="test-json-data-4"]', 'textContent': 'this attribute without id is also extracted' },
  ];
  var localDOM_simple_attribute_fr = [
    { select: 'input[id="standard-input"]', 'placeholder.text': 'standard HTML5 attribute' },
    { select: 'input[id="standard-input"] + input', 'placeholder.text': 'standard HTML5 attribute without id' },
    { select: 'paper-input[id="paper-input-element"]', 'label.text': 'paper-input label', 'errorMessage.text': 'paper-input error message', 'placeholder.text': 'paper-input placeholder' },
    { select: 'paper-input[id="paper-input-element"] + paper-input', 'label.text': 'paper-input label without id', 'errorMessage.text': 'paper-input error message without id', 'placeholder.text': 'paper-input placeholder without id' },
    { select: 'google-chart[id="pie-chart"]', 'options.title.text': 'Distribution of days in 2001H1', 'cols.0.label.text': 'Month', 'cols.1.label.text': 'Days', 'rows.0.0.text': 'Jan', 'rows.1.0.text': 'Feb', 'rows.2.0.text': 'Mar', 'rows.3.0.text': 'Apr', 'rows.4.0.text': 'May', 'rows.5.0.text': 'Jun' },
    { select: 'google-chart[id="column-chart"]', 'options.title.text': 'Inventory', 'data.0.0.text': 'Year', 'data.0.1.text': 'Things', 'data.0.2.text': 'Stuff' },
    { select: 'text-attribute-element[id="custom-attr"]', 'customTextAttr1.text': 'custom text attribute 1', 'customTextAttr2.text': 'custom text attribute 2', 'customTextAttr3.text': 'custom text attribute 3' },
    { select: 'text-attribute-element[id="selective-attr"]', 'i18nTarget.raw': 'fr i18n-target attribute with param fr text 1 and param fr text 1', 'i18nTarget2.raw': 'fr i18n-target2 attribute with param fr text 1 and param fr text 1' },
    { select: 'span[id="test-json-data-1"]', 'textContent': 'this attr1 is extracted' },
    { select: 'span[id="test-json-data-2"]', 'textContent': 'this attribute is also extracted' },
    { select: 'span[id="test-json-data-3"]', 'textContent': 'this attr1 without id is extracted' },
    { select: 'span[id="test-json-data-4"]', 'textContent': 'this attribute without id is also extracted' },
  ];
  var text_fallback = {
    'model': {},
    'text': 'fr-CA  outermost text at the beginning ',
    'h1_3': 'fr-CA outermost header 1',
    'text_4': 'fr-CA  outermost text in the middle ',
    'span_5': 'fr-CA simple text without id',
    'span_6': 'fr-CA simple text without id 2',
    'label-1': 'fr-CA simple text with id',
    'label-2': 'fr-CA simple text with id 2',
    'div_9:span': 'simple text within div',
    'div_9:span_1': 'simple text within div 2',
    'div_9:div_2:div': 'great grandchild text within div',
    'div_10:text': ' simple text as the first element in div ',
    'div_10:span_1': 'fr-CA simple text within div',
    'div_10:text_2': ' simple text in the middle of div ',
    'div_10:span_3': 'simple text within div 2',
    'div_10:div_4:div': 'great grandchild text within div',
    'div_10:text_5': ' simple text at the last element in div ',
    'toplevel-div:span': 'fr-CA simple text within div',
    'toplevel-div:span_1': 'fr-CA simple text within div 2',
    'third-level-div': 'fr-CA great grandchild text within div',
    'second-level-div:div_1': 'fr-CA great grandchild text within div without id',
    'div_12:ul:li': 'fr line item without id 1',
    'div_12:ul:li_1': 'fr line item without id 2',
    'div_12:ul:li_2': 'fr line item without id 3',
    'line-items:li': 'fr line item with id 1',
    'line-items:li_1': 'fr line item with id 2',
    'line-items:li_2': 'fr line item with id 3',
    'p_13': [
      'fr-CA A paragraph with {1} is converted to {2}.',
      'fr-CA parameters',
      'fr-CA <i18n-format>'
    ],
    'paragraph': [
      'fr-CA A paragraph with {1} is converted to {2}.',
      'fr-CA id',
      'fr-CA <i18n-format>'
    ],
    'text_15': 'fr-CA  outermost text at the end '
  };
  var localDOM_fallback = [
    { select: 'div:not([id])', 'previousTextSibling.data': 'fr-CA  outermost text at the beginning ' },
    { select: 'h1', textContent: 'fr-CA outermost header 1' },
    { select: 'h1', 'nextTextSibling.data': 'fr-CA  outermost text in the middle ' },
    { select: 'span:not([id])', textContent: [ 'fr-CA simple text without id', 'fr-CA simple text without id 2' ] },
    { select: 'span[id="label-1"]', textContent: 'fr-CA simple text with id' },
    { select: 'span[id="label-2"]', textContent: 'fr-CA simple text with id 2' },
    { select: 'span[id="label-2"] + div span:not([id])', textContent:  [ 'simple text within div', 'simple text within div 2' ] },
    { select: 'span[id="label-2"] + div div:not([id]) div:not([id])', textContent: [ 'great grandchild text within div' ] },
    { select: 'span[id="label-2"] + div + div', 'childNodes.0.data': ' simple text as the first element in div ' },
    { select: 'span[id="label-2"] + div + div span:not([id])', textContent:  [ 'fr-CA simple text within div', 'simple text within div 2' ] },
    { select: 'span[id="label-2"] + div + div span:not([id])', 'nextTextSibling.data': ' simple text in the middle of div ' },
    { select: 'span[id="label-2"] + div + div div:not([id]) div:not([id])', textContent: 'great grandchild text within div' },
    { select: 'span[id="label-2"] + div + div div:not([id])', 'nextTextSibling.data': ' simple text at the last element in div ' },
    { select: '[id="toplevel-div"] span:not([id])', textContent: [ 'fr-CA simple text within div', 'fr-CA simple text within div 2' ] },
    { select: '[id="third-level-div"]', textContent: 'fr-CA great grandchild text within div' },
    { select: '[id="second-level-div"] div:not([id])', textContent: 'fr-CA great grandchild text within div without id' },
    { select: 'div ul:not([id]) li:not([id])', textContent: [ 'fr line item without id 1', 'fr line item without id 2', 'fr line item without id 3' ] },
    { select: '[id="line-items"] li:not([id])', textContent: [ 'fr line item with id 1', 'fr line item with id 2', 'fr line item with id 3' ] },
    { select: 'p:not([id]) i18n-format', 
      'PolymerDom.children.0.textContent': 'fr-CA A paragraph with {1} is converted to {2}.' },
    { select: 'p:not([id]) i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'fr-CA parameters',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: 'p:not([id]) i18n-format',
      'PolymerDom.children.2.tagName': 'CODE',
      'PolymerDom.children.2.textContent': 'fr-CA <i18n-format>',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.0.textContent': 'fr-CA A paragraph with {1} is converted to {2}.' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'fr-CA id',
      'PolymerDom.children.1.attributes.slot.value': '1' },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.2.tagName': 'CODE',
      'PolymerDom.children.2.textContent': 'fr-CA <i18n-format>',
      'PolymerDom.children.2.attributes.slot.value': '2' },
    { select: '[id="paragraph"]', 'nextTextSibling.data': 'fr-CA  outermost text at the end ' }
  ];
  var param1 = '1st compound parameter';
  var param2 = '2nd compound parameter';
  var text_compound = {
    "model": {},
    "text": [
      " outermost text at the beginning with compound {1} and {2} variables ",
      "{{parts.0}}",
      "{{parts.1}}"
    ],
    "h1_3": [
      "outermost header 1 with {1} and {2} variables",
      "{{parts.2}}",
      "{{parts.3}}"
    ],
    "text_4": [
      " outermost text in the middle with {1} and {2} variables ",
      "{{parts.4}}",
      "{{parts.5}}"
    ],
    "span_5": [
      "simple text without id with {1} and {2} variables",
      "{{parts.6}}",
      "{{parts.7}}"
    ],
    "span_6": [
      "simple text without id 2 with {1} and {2} variables",
      "{{parts.8}}",
      "{{parts.9}}"
    ],
    "label-1": [
      "simple text with id and {1} and {2} variables",
      "{{parts.10}}",
      "{{parts.11}}"
    ],
    "label-2": [
      "simple text with id and {1} and {2} variables 2",
      "{{parts.12}}",
      "{{parts.13}}"
    ],
    "div_9:span": [
      "simple text within div with {1} and {2} variables",
      "{{parts.14}}",
      "{{parts.15}}"
    ],
    "div_9:span_1": [
      "simple text within div with {1} and {2} variables 2",
      "{{parts.16}}",
      "{{parts.17}}"
    ],
    "div_9:div_2:div": [
      "great grandchild text within div with {1} and {2} variables",
      "{{parts.18}}",
      "{{parts.19}}"
    ],
    "div_10:text": [
      " simple text as the first element in div with {1} and {2} variables ",
      "{{parts.20}}",
      "{{parts.21}}"
    ],
    "div_10:span_1": [
      "simple text within div with {1} and {2} variables",
      "{{parts.22}}",
      "{{parts.23}}"
    ],
    "div_10:text_2": [
      " simple text in the middle of div with {1} and {2} variables ",
      "{{parts.24}}",
      "{{parts.25}}"
    ],
    "div_10:span_3": [
      "simple text within div with {1} and {2} variables 2",
      "{{parts.26}}",
      "{{parts.27}}"
    ],
    "div_10:div_4:div": [
      "great grandchild text within div with {1} and {2} variables",
      "{{parts.28}}",
      "{{parts.29}}"
    ],
    "div_10:text_5": [
      " simple text at the last element in div with {1} and {2} variables ",
      "{{parts.30}}",
      "{{parts.31}}"
    ],
    "toplevel-div:span": [
      "simple text within div with {1} and {2} variables",
      "{{parts.32}}",
      "{{parts.33}}"
    ],
    "toplevel-div:span_1": [
      "simple text within div 2 with {1} and {2} variables",
      "{{parts.34}}",
      "{{parts.35}}"
    ],
    "third-level-div": [
      "great grandchild text within div with {1} and {2} variables",
      "{{parts.36}}",
      "{{parts.37}}"
    ],
    "second-level-div:div_1": [
      "great grandchild text within div without id with {1} and {2} variables",
      "{{parts.38}}",
      "{{parts.39}}"
    ],
    "div_12:ul:li": [
      "line item without id 1 with {1} and {2} variables",
      "{{parts.40}}",
      "{{parts.41}}"
    ],
    "div_12:ul:li_1": [
      "line item without id 2 with {1} and {2} variables",
      "{{parts.42}}",
      "{{parts.43}}"
    ],
    "div_12:ul:li_2": [
      "line item without id 3 with {1} and {2} variables",
      "{{parts.44}}",
      "{{parts.45}}"
    ],
    "line-items:li": [
      "line item with id 1 with {1} and {2} variables",
      "{{parts.46}}",
      "{{parts.47}}"
    ],
    "line-items:li_1": [
      "line item with id 2 with {1} and {2} variables",
      "{{parts.48}}",
      "{{parts.49}}"
    ],
    "line-items:li_2": [
      "line item with id 3 with {1} and {2} variables",
      "{{parts.50}}",
      "{{parts.51}}"
    ],
    "p_13": [
      "A paragraph with {1} is converted to {2}.",
      "{{parts.52}}",
      "{{parts.53}}"
    ],
    "paragraph": [
      "A paragraph with {1}, {2}, and {3} is converted to {4}.",
      "id",
      "{{parts.54}}",
      "{{parts.55}}",
      "<i18n-format>"
    ],
    "text_15": [
      " outermost text at the end with {1} and {2} variables ",
      "{{parts.56}}",
      "{{parts.57}}"
    ]
  };
  var localDOM_compound = [
    { select: 'i18n-format', 
      'PolymerDom.children.0.textContent': [
        ' outermost text at the beginning with compound {1} and {2} variables ',
        'outermost header 1 with {1} and {2} variables',
        ' outermost text in the middle with {1} and {2} variables ',
        'simple text without id with {1} and {2} variables',
        'simple text without id 2 with {1} and {2} variables',
        'simple text with id and {1} and {2} variables',
        'simple text with id and {1} and {2} variables 2',
        'simple text within div with {1} and {2} variables',
        'simple text within div with {1} and {2} variables 2',
        'great grandchild text within div with {1} and {2} variables',
        ' simple text as the first element in div with {1} and {2} variables ',
        'simple text within div with {1} and {2} variables',
        ' simple text in the middle of div with {1} and {2} variables ',
        'simple text within div with {1} and {2} variables 2',
        'great grandchild text within div with {1} and {2} variables',
        ' simple text at the last element in div with {1} and {2} variables ',
        'simple text within div with {1} and {2} variables',
        'simple text within div 2 with {1} and {2} variables',
        'great grandchild text within div with {1} and {2} variables',
        'great grandchild text within div without id with {1} and {2} variables',
        'line item without id 1 with {1} and {2} variables',
        'line item without id 2 with {1} and {2} variables',
        'line item without id 3 with {1} and {2} variables',
        'line item with id 1 with {1} and {2} variables',
        'line item with id 2 with {1} and {2} variables',
        'line item with id 3 with {1} and {2} variables',
        'A paragraph with {1} is converted to {2}.',
        'A paragraph with {1}, {2}, and {3} is converted to {4}.',
        ' outermost text at the end with {1} and {2} variables '
      ],
      'PolymerDom.children.1.textContent.raw': [
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter',
        '1st compound parameter'
      ],
      'PolymerDom.children.2.textContent.raw': [
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '2nd compound parameter',
        '1st compound parameter',
        '2nd compound parameter'
      ]
    },
    { select: '[id="paragraph"] i18n-format',
      'PolymerDom.children.1.tagName': 'B',
      'PolymerDom.children.1.textContent': 'id',
      'PolymerDom.children.1.attributes.slot.value.raw': '1',
      'PolymerDom.children.3.tagName': 'SPAN',
      'PolymerDom.children.3.textContent.raw': '2nd compound parameter',
      'PolymerDom.children.3.attributes.slot.value.raw': '3'
    },
    { select: '[id="paragraph"] +i18n-format', 
      'PolymerDom.children.1.textContent.raw': '1st compound parameter'
    }
  ];

  var suites = [
    s('simple text default', null, { 
      fixture: 'simple-text-element-default-fixture', 
      fixtureModel: undefined, 
      assign: undefined,
      lang: lang1,
      effectiveLang: lang1,
      templateDefaultLang: lang1,
      observeHtmlLang: true,
      text: text_simple,
      //model: {},
      localDOM: localDOM_simple,
      lightDOM: undefined
    }),
    s('commented simple text default', 'simple text default', {
      fixture: 'commented-simple-text-element-default-fixture'
    }),
    s('simple text default null lang', 'simple text default', {
      assign: { lang: lang0 },
      lang: lang1,
      effectiveLang: lang1
    }),
    s('commented simple text default null lang', 'commented simple text default', { 
      assign: { lang: lang0 },
      lang: lang1,
      effectiveLang: lang1
    }),
    s(lang2 + ' simple text default', 'simple text default', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang2 + ' commented simple text default', 'commented simple text default', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s('simple text null lang', 'simple text default', {
      fixture: 'simple-text-element-fixture',
      fixtureModel: { observeHtmlLang: false, lang: lang0 }, 
      assign: { lang: lang0 },
      lang: lang1,
      effectiveLang: lang1,
      observeHtmlLang: false
    }),
    s('simple text', 'simple text null lang', {
      assign: { lang: lang1 },
      lang: lang1,
      effectiveLang: lang1
    }),
    s(lang2 + ' simple text', 'simple text', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang6 + ' simple text', 'simple text', {
      assign: { lang: lang6 },
      lang: lang6,
      effectiveLang: lang6
    }),
    s('commented simple text', 'simple text', {
      fixture: 'commented-simple-text-element-fixture'
    }),
    s('commented simple text null lang', 'commented simple text', {
      assign: { lang: lang0 },
      lang: lang1,
      effectiveLang: lang1
    }),
    s(lang2 + ' commented simple text', 'commented simple text', {
      fixtureModel: { observeHtmlLang: false, lang: lang0 }, 
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang2 + ' static commented simple text', 'commented simple text', {
      fixtureModel: { observeHtmlLang: false, lang: lang2 }, 
      assign: undefined,
      lang: lang2,
      effectiveLang: lang2
    }),
    s('simple text id', 'simple text', {
      fixture: 'simple-text-id-element-fixture',
      text: text_simple_text_id,
      localDOM: localDOM_simple_text_id
    }),
    s(lang2 + ' simple text id', 'simple text id', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s('plural gender', 'simple text default', {
      fixture: 'plural-gender-element-fixture', 
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0
      }, 
      assign: {
        lang: lang1,
        sender: sender1,
        recipients: recipients1
      },
      observeHtmlLang: false,
      event: 'local-dom-ready',
      text: text_plural_gender,
      localDOM: localDOM_plural_gender_1
    }),
    s('plural gender 2', 'plural gender', {
      assign: {
        lang: lang1,
        sender: sender1,
        recipients: recipients2
      },
      localDOM: localDOM_plural_gender_2
    }),
    s('plural gender 3', 'plural gender', {
      assign: {
        lang: lang1,
        sender: sender1,
        recipients: recipients3
      },
      localDOM: localDOM_plural_gender_3
    }),
    s('plural gender 4', 'plural gender', {
      assign: {
        lang: lang1,
        sender: sender1,
        recipients: recipients4
      },
      localDOM: localDOM_plural_gender_4
    }),
    s(lang2 + ' plural gender', 'plural gender', {
      assign: {
        lang: lang2,
        sender: sender1,
        recipients: recipients1
      },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang2 + ' plural gender 2', 'plural gender 2', {
      assign: {
        lang: lang2,
        sender: sender1,
        recipients: recipients2
      },
      lang: lang2,
      effectiveLang: lang2,
      localDOM: localDOM_plural_gender_2
    }),
    s(lang2 + ' plural gender 3', 'plural gender 3', {
      assign: {
        lang: lang2,
        sender: sender1,
        recipients: recipients3
      },
      lang: lang2,
      effectiveLang: lang2,
      localDOM: localDOM_plural_gender_3
    }),
    s(lang2 + ' plural gender 4', 'plural gender 4', {
      assign: {
        lang: lang2,
        sender: sender1,
        recipients: recipients4
      },
      lang: lang2,
      effectiveLang: lang2,
      localDOM: localDOM_plural_gender_4
    }),
    s('simple attribute', 'simple text default', {
      fixture: 'simple-attribute-element-fixture', 
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0
      }, 
      assign: { lang: lang1 },
      observeHtmlLang: false,
      text: text_simple_attribute,
      //model: model_simple_attribute,
      localDOM: localDOM_simple_attribute
    }),
    s(lang2 + ' simple attribute', 'simple attribute', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2,
      localDOM: localDOM_simple_attribute_fr
    }),
    s(lang4 + ' simple text default with fallback to ' + lang2, 'simple text default', {
      timeout: 60000,
      assign: { lang: lang4 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang4 + ' simple text with fallback to ' + lang2, 'simple text', {
      timeout: 60000,
      assign: { lang: lang4 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang5 + ' simple text with fallback to default', 'simple text', {
      timeout: 60000,
      assign: { lang: lang5 },
      lang: lang1,
      effectiveLang: lang1
    }),
    s(lang3 + ' simple text with fallback to default', 'simple text', {
      timeout: 60000,
      assign: { lang: lang3 },
      lang: lang1,
      effectiveLang: lang1
    }),
    s(lang4 + ' fallback text', 'simple text', {
      timeout: 60000,
      fixture: 'fallback-text-element-fixture', 
      assign: { lang: lang4 },
      lang: lang4,
      effectiveLang: lang4,
      rawText: true,
      text: text_fallback,
      localDOM: localDOM_fallback
    }),
    s('compound binding', 'simple text', {
      fixture: 'compound-binding-element-fixture',
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0,
        param1: param1,
        param2: param2
      },
      text: text_compound,
      localDOM: localDOM_compound
    }),
    s(lang2 + ' compound binding', 'compound binding', {
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0,
        param1: param1,
        param2: param2
      },
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    /*
    s('simple attribute dom bind', 'simple attribute', {
      fixture: 'simple-attribute-dom-bind', 
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0
      }, 
      assign: { lang: lang1 },
      event: 'local-dom-ready',
      text: text_simple_attribute,
      model: model_simple_attribute,
      localDOM: localDOM_simple_attribute
    }),
    s(lang2 + ' simple attribute dom bind', 'simple attribute dom bind', {
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0
      },
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2,
      localDOM: localDOM_simple_attribute_fr
    }),
    s('compound binding dom bind', 'compound binding', {
      fixture: 'compound-binding-dom-bind'
    }),
    s(lang2 + ' compound binding dom bind', 'compound binding dom bind', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s(lang2 + ' default observeHtmlLang simple text dom bind', 'simple text', {
      fixture: 'simple-text-dom-bind',
      fixtureModel: {
        'html.lang': lang5
      },
      assign: { 'html.lang': lang2 },
      lang: lang2,
      effectiveLang: lang2,
      text: text_simple,
      model: undefined,
      localDOM: localDOM_simple,
      observeHtmlLang: true
    }),
    s('simple text dom bind', 'simple text', {
      fixture: 'simple-text-dom-bind',
      fixtureModel: {
        observeHtmlLang: false,
        lang: lang0
      },
      text: text_simple,
      localDOM: localDOM_simple
    }),
    s(lang2 + ' simple text dom bind', 'simple text dom bind', {
      assign: { lang: lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s('html.lang simple text dom bind', 'simple text dom bind', {
      fixtureModel: {
        observeHtmlLang: true,
        lang: lang0,
        'html.lang': lang0
      },
      assign: { 'html.lang': lang1 },
      observeHtmlLang: true
    }),
    s(lang2 + ' html.lang simple text dom bind', 'html.lang simple text dom bind', {
      assign: { 'html.lang': lang2 },
      lang: lang2,
      effectiveLang: lang2
    }),
    s('observeHtmlLang default simple text', 'simple text null lang', {
      fixtureModel: {
        observeHtmlLang: true
      },
      assign: { 'html.lang': lang1 },
      lang: lang1,
      effectiveLang: lang1,
      observeHtmlLang: true
    })
    */
  ];

  window.dispatchEvent(new CustomEvent('suites-loaded'));
  suitesRunner(suites, 100);

});
