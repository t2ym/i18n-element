/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {render} from 'lit-html/lit-html.js';
import {html, i18n, bind} from '../../../i18n.js';

switch (syntax) {
default:
case 'element-binding':
  {
    class TemplateDefaultLangElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this)}
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
`;
      }

      constructor() {
        super();
        this.templateDefaultLang = 'fr';
        this.attachShadow({mode: 'open'});
        this.addEventListener('lang-updated', this._langUpdated); // invalidate on this 'lang-updated'
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
case 'name-binding':
  {
    class TemplateDefaultLangElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind('template-default-lang-element', import.meta)}
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
`;
      }

      constructor() {
        super();
        this.templateDefaultLang = 'fr';
        this.attachShadow({mode: 'open'});
        this.addEventListener('lang-updated', this._langUpdated); // invalidate on this 'lang-updated'
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
case 'element-name-binding':
  {
    class TemplateDefaultLangElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this, 'template-default-lang-element')}
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
`;
      }

      constructor() {
        super();
        this.templateDefaultLang = 'fr';
        this.attachShadow({mode: 'open'});
        this.addEventListener('lang-updated', this._langUpdated); // invalidate on this 'lang-updated'
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
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: ((t) => { t.setAttribute("lang", "fr"); return t; })(html`
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

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

      listeners: {
        'lang-updated': '_langUpdated'
      },

      ready: function () {
        //this.observeHtmlLang = false;
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
