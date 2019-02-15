/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { render } from 'lit-html/lit-html.js';
import {
  html,
  i18n,
  bind
} from '../../../i18n.js';
switch (syntax) {
default:
case 'element-binding': {
    class TemplateDefaultLangElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '',
          '<div><div></div></div><!-- nested empty div -->\n    <span id="whitespace"> &nbsp; </span>\n    <h1>',
          '</h1>',
          '<span>',
          '</span>\n    <span>',
          '</span>\n    <span id="label-1">',
          '</span>\n    <span id="label-2">',
          '</span>\n    <div>\n      <span>',
          '</span> \n      <span>',
          '</span> \n      <div><div>',
          '</div></div> \n    </div>\n    <div>',
          '<span>',
          '</span>',
          '<span>',
          '</span>\n      <div><div>',
          '</div></div>',
          '</div>\n    <div id="toplevel-div">\n      <span>',
          '</span>\n      <span>',
          '</span>\n      <div id="second-level-div">\n        <div id="third-level-div">',
          '</div>\n        <div>',
          '</div>\n      </div>\n    </div>\n    <div>\n      <ul>\n        <li>',
          '</li>\n        <li>',
          '</li>\n        <li>',
          '</li>\n      </ul>\n      <ul id="line-items">\n        <li>',
          '</li>\n        <li>',
          '</li>\n        <li>',
          '</li>\n      </ul>\n    </div>\n    <p><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>',
          ''
        ], ...bind(this, (_bind, text, model, effectiveLang) => [
          _bind,
          text['text'],
          text['h1_3'],
          text['text_4'],
          text['span_5'],
          text['span_6'],
          text['label-1'],
          text['label-2'],
          text['div_9:span'],
          text['div_9:span_1'],
          text['div_9:div_2:div'],
          text['div_10:text'],
          text['div_10:span_1'],
          text['div_10:text_2'],
          text['div_10:span_3'],
          text['div_10:div_4:div'],
          text['div_10:text_5'],
          text['toplevel-div:span'],
          text['toplevel-div:span_1'],
          text['third-level-div'],
          text['second-level-div:div_1'],
          text['div_12:ul:li'],
          text['div_12:ul:li_1'],
          text['div_12:ul:li_2'],
          text['line-items:li'],
          text['line-items:li_1'],
          text['line-items:li_2'],
          effectiveLang,
          text['p_13']['0'],
          text['p_13']['1'],
          text['p_13']['2'],
          effectiveLang,
          text['paragraph']['0'],
          text['paragraph']['1'],
          text['paragraph']['2'],
          text['text_15']
        ], {
          'meta': {},
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
        }));
      }
      constructor() {
        super();
        this.templateDefaultLang = 'fr';
        this.attachShadow({ mode: 'open' });
        this.addEventListener('lang-updated', this._langUpdated);
      }
      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }
      _langUpdated(event) {
        this.invalidate();
      }
      invalidate() {
        if (!this.needsRender) {
          this.needsRender = true;
          Promise.resolve().then(() => {
            this.needsRender = false;
            render(this.render(), this.shadowRoot);
          });
        }
      }
    }
    customElements.define(TemplateDefaultLangElement.is, TemplateDefaultLangElement);
  }
  break;
case 'name-binding': {
    class TemplateDefaultLangElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '',
          '<div><div></div></div><!-- nested empty div -->\n    <span id="whitespace"> &nbsp; </span>\n    <h1>',
          '</h1>',
          '<span>',
          '</span>\n    <span>',
          '</span>\n    <span id="label-1">',
          '</span>\n    <span id="label-2">',
          '</span>\n    <div>\n      <span>',
          '</span> \n      <span>',
          '</span> \n      <div><div>',
          '</div></div> \n    </div>\n    <div>',
          '<span>',
          '</span>',
          '<span>',
          '</span>\n      <div><div>',
          '</div></div>',
          '</div>\n    <div id="toplevel-div">\n      <span>',
          '</span>\n      <span>',
          '</span>\n      <div id="second-level-div">\n        <div id="third-level-div">',
          '</div>\n        <div>',
          '</div>\n      </div>\n    </div>\n    <div>\n      <ul>\n        <li>',
          '</li>\n        <li>',
          '</li>\n        <li>',
          '</li>\n      </ul>\n      <ul id="line-items">\n        <li>',
          '</li>\n        <li>',
          '</li>\n        <li>',
          '</li>\n      </ul>\n    </div>\n    <p><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>',
          ''
        ], ...bind('template-default-lang-element', import.meta, (_bind, text, model, effectiveLang) => [
          _bind,
          text['text'],
          text['h1_3'],
          text['text_4'],
          text['span_5'],
          text['span_6'],
          text['label-1'],
          text['label-2'],
          text['div_9:span'],
          text['div_9:span_1'],
          text['div_9:div_2:div'],
          text['div_10:text'],
          text['div_10:span_1'],
          text['div_10:text_2'],
          text['div_10:span_3'],
          text['div_10:div_4:div'],
          text['div_10:text_5'],
          text['toplevel-div:span'],
          text['toplevel-div:span_1'],
          text['third-level-div'],
          text['second-level-div:div_1'],
          text['div_12:ul:li'],
          text['div_12:ul:li_1'],
          text['div_12:ul:li_2'],
          text['line-items:li'],
          text['line-items:li_1'],
          text['line-items:li_2'],
          effectiveLang,
          text['p_13']['0'],
          text['p_13']['1'],
          text['p_13']['2'],
          effectiveLang,
          text['paragraph']['0'],
          text['paragraph']['1'],
          text['paragraph']['2'],
          text['text_15']
        ], {
          'meta': {},
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
        }));
      }
      constructor() {
        super();
        this.templateDefaultLang = 'fr';
        this.attachShadow({ mode: 'open' });
        this.addEventListener('lang-updated', this._langUpdated);
      }
      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }
      _langUpdated(event) {
        this.invalidate();
      }
      invalidate() {
        if (!this.needsRender) {
          this.needsRender = true;
          Promise.resolve().then(() => {
            this.needsRender = false;
            render(this.render(), this.shadowRoot);
          });
        }
      }
    }
    customElements.define(TemplateDefaultLangElement.is, TemplateDefaultLangElement);
  }
  break;
case 'element-name-binding': {
    class TemplateDefaultLangElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }
      render() {
        return html([
          '<!-- localizable -->',
          '',
          '<div><div></div></div><!-- nested empty div -->\n    <span id="whitespace"> &nbsp; </span>\n    <h1>',
          '</h1>',
          '<span>',
          '</span>\n    <span>',
          '</span>\n    <span id="label-1">',
          '</span>\n    <span id="label-2">',
          '</span>\n    <div>\n      <span>',
          '</span> \n      <span>',
          '</span> \n      <div><div>',
          '</div></div> \n    </div>\n    <div>',
          '<span>',
          '</span>',
          '<span>',
          '</span>\n      <div><div>',
          '</div></div>',
          '</div>\n    <div id="toplevel-div">\n      <span>',
          '</span>\n      <span>',
          '</span>\n      <div id="second-level-div">\n        <div id="third-level-div">',
          '</div>\n        <div>',
          '</div>\n      </div>\n    </div>\n    <div>\n      <ul>\n        <li>',
          '</li>\n        <li>',
          '</li>\n        <li>',
          '</li>\n      </ul>\n      <ul id="line-items">\n        <li>',
          '</li>\n        <li>',
          '</li>\n        <li>',
          '</li>\n      </ul>\n    </div>\n    <p><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>\n    <p id="paragraph"><i18n-format lang="',
          '"><span>',
          '</span><b slot="1">',
          '</b><code slot="2">',
          '</code></i18n-format></p>',
          ''
        ], ...bind(this, 'template-default-lang-element', (_bind, text, model, effectiveLang) => [
          _bind,
          text['text'],
          text['h1_3'],
          text['text_4'],
          text['span_5'],
          text['span_6'],
          text['label-1'],
          text['label-2'],
          text['div_9:span'],
          text['div_9:span_1'],
          text['div_9:div_2:div'],
          text['div_10:text'],
          text['div_10:span_1'],
          text['div_10:text_2'],
          text['div_10:span_3'],
          text['div_10:div_4:div'],
          text['div_10:text_5'],
          text['toplevel-div:span'],
          text['toplevel-div:span_1'],
          text['third-level-div'],
          text['second-level-div:div_1'],
          text['div_12:ul:li'],
          text['div_12:ul:li_1'],
          text['div_12:ul:li_2'],
          text['line-items:li'],
          text['line-items:li_1'],
          text['line-items:li_2'],
          effectiveLang,
          text['p_13']['0'],
          text['p_13']['1'],
          text['p_13']['2'],
          effectiveLang,
          text['paragraph']['0'],
          text['paragraph']['1'],
          text['paragraph']['2'],
          text['text_15']
        ], {
          'meta': {},
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
        }));
      }
      constructor() {
        super();
        this.templateDefaultLang = 'fr';
        this.attachShadow({ mode: 'open' });
        this.addEventListener('lang-updated', this._langUpdated);
      }
      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }
      _langUpdated(event) {
        this.invalidate();
      }
      invalidate() {
        if (!this.needsRender) {
          this.needsRender = true;
          Promise.resolve().then(() => {
            this.needsRender = false;
            render(this.render(), this.shadowRoot);
          });
        }
      }
    }
    customElements.define(TemplateDefaultLangElement.is, TemplateDefaultLangElement);
  }
  break;
case 'legacy': {
    Polymer({
      importMeta: import.meta,
      _template: (t => {
        t.setAttribute('lang', 'fr');
        return t;
      })(html`
    fr outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>fr outermost header 1</h1>
    fr outermost text in the middle 
    <span>fr simple text without id</span>
    <span>fr simple text without id 2</span>
    <span id="label-1">fr simple text with id</span>
    <span id="label-2">fr simple text with id 2</span>
    <div>
      <span>fr simple text within div</span> 
      <span>fr simple text within div 2</span> 
      <div><div>fr great grandchild text within div</div></div> 
    </div>
    <div>
      fr simple text as the first element in div 
      <span>fr simple text within div</span>
      fr simple text in the middle of div 
      <span>fr simple text within div 2</span>
      <div><div>fr great grandchild text within div</div></div>
      fr simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>fr simple text within div</span>
      <span>fr simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">fr great grandchild text within div</div>
        <div>fr great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>fr line item without id 1</li>
        <li>fr line item without id 2</li>
        <li>fr line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>fr line item with id 1</li>
        <li>fr line item with id 2</li>
        <li>fr line item with id 3</li>
      </ul>
    </div>
    <p>fr A paragraph with <b>fr parameters</b> is converted to <code>fr &lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">fr A paragraph with <b>fr id</b> is converted to <code>fr &lt;i18n-format&gt;</code>.</p>
    fr outermost text at the end 
`),
      is: 'template-default-lang-element',
      behaviors: [BehaviorsStore.I18nBehavior],
      listeners: { 'lang-updated': '_langUpdated' },
      ready: function () {
      },
      attached: function () {
      },
      _langUpdated: function (e) {
        if (dom(e).rootTarget === this && this.text) {
          this.model = deepcopy(this.text.model);
        }
      }
    });
  }
  break;
}
