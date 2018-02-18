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
  var localDOM_simple_define = [
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
    { select: '[id="paragraph"]', 'nextTextSibling.data': ' outermost text at the end ' }
  ];

  var suites = [
    s('simple define element default', null, { 
      fixture: 'simple-define-element-default-fixture', 
      fixtureModel: undefined, 
      assign: undefined,
      lang: lang0,
      localDOM: localDOM_simple_define,
      lightDOM: undefined
    }),
    s('no template id define element default', 'simple define element default', { 
      fixture: 'no-template-id-define-element-default-fixture'
    }),
    s('no class name define element default', 'simple define element default', { 
      fixture: 'no-class-name-define-element-default-fixture'
    }),
    s('no class name but is define element default', 'simple define element default', { 
      fixture: 'no-class-name-but-is-define-element-default-fixture'
    }),
    s('i18n no template id define element default', 'simple define element default', { 
      fixture: 'i18n-no-template-id-define-element-default-fixture',
      lang: lang1
    }),
    s('i18n no class name define element default', 'simple define element default', { 
      fixture: 'i18n-no-class-name-define-element-default-fixture',
      lang: lang1
    }),
    s('i18n no class name but is define element default', 'simple define element default', { 
      fixture: 'i18n-no-class-name-but-is-define-element-default-fixture',
      lang: lang1
    })
  ];

  suitesRunner(suites);

  suite('Define(id)', function () {
    test('get Define(id)', function (done) {
      assert.isOk(Define('simple-define-element') && Define('simple-define-element') === customElements.get('simple-define-element'), 'get class for Define');
      done();
    });
  });
});
