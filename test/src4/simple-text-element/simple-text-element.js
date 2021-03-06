/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {render, svg} from 'lit-html/lit-html.js';
import {html, i18n, bind} from '../../../i18n.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';

switch (syntax) {
default:
case 'element-binding':
  {
    class SimpleTextElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this)}
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span id="label-1">simple text with id</span>
    <span id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
`;
      }

      static get observedAttributes() {
        let attributesSet = new Set();
        let attributes = [];
        [/* list of additional observedAttributes */].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr)); // forEach is supported by IE 11
        return attributes;
      }

      constructor() {
        super();
        this.attachShadow({mode: 'open'});
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
      }

      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }

      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${this.is}: _updateEffectiveLang effectiveLang="${this.effectiveLang}" lang="${this.lang}"`)
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

      attributeChangedCallback(name, oldValue, newValue) {
        const handleOnlyBySelf = [];
        if (!handleOnlyBySelf.indexOf(name) >= 0) {
          if (typeof super.attributeChangedCallback === 'function') {
            super.attributeChangedCallback(name, oldValue, newValue);
          }
        }
        switch (name) {
        //case 'target-attribute': break;
        default:
          break;
        }
      }
    }
    customElements.define(SimpleTextElement.is, SimpleTextElement);
  }
  break;
case 'name-binding':
  {
    class SimpleTextElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind('simple-text-element', import.meta)}
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span id="label-1">simple text with id</span>
    <span id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
`;
      }

      static get observedAttributes() {
        let attributesSet = new Set();
        let attributes = [];
        [/* list of additional observedAttributes */].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr)); // forEach is supported by IE 11
        return attributes;
      }

      constructor() {
        super();
        this.attachShadow({mode: 'open'});
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
      }

      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }

      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${this.is}: _updateEffectiveLang effectiveLang="${this.effectiveLang}" lang="${this.lang}"`)
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

      attributeChangedCallback(name, oldValue, newValue) {
        const handleOnlyBySelf = [];
        if (!handleOnlyBySelf.indexOf(name) >= 0) {
          if (typeof super.attributeChangedCallback === 'function') {
            super.attributeChangedCallback(name, oldValue, newValue);
          }
        }
        switch (name) {
        //case 'target-attribute': break;
        default:
          break;
        }
      }
    }
    customElements.define(SimpleTextElement.is, SimpleTextElement);
  }
  break;
case 'element-name-binding':
  {
    class SimpleTextElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this, 'simple-text-element')}
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span id="label-1">simple text with id</span>
    <span id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
`;
      }

      static get observedAttributes() {
        let attributesSet = new Set();
        let attributes = [];
        [/* list of additional observedAttributes */].concat(super.observedAttributes).forEach(attr => attributesSet.add(attr));
        attributesSet.forEach(attr => attributes.push(attr)); // forEach is supported by IE 11
        return attributes;
      }

      constructor() {
        super();
        this.attachShadow({mode: 'open'});
        let _langUpdatedBindThis = this._langUpdated.bind(this);
        this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
      }

      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }
        this.invalidate();
      }

      _updateEffectiveLang(event) {
        super._updateEffectiveLang(event);
        console.log(`${this.is}: _updateEffectiveLang effectiveLang="${this.effectiveLang}" lang="${this.lang}"`)
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

      attributeChangedCallback(name, oldValue, newValue) {
        const handleOnlyBySelf = [];
        if (!handleOnlyBySelf.indexOf(name) >= 0) {
          if (typeof super.attributeChangedCallback === 'function') {
            super.attributeChangedCallback(name, oldValue, newValue);
          }
        }
        switch (name) {
        //case 'target-attribute': break;
        default:
          break;
        }
      }
    }
    customElements.define(SimpleTextElement.is, SimpleTextElement);
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: html`
    outermost text at the beginning 
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1</h1>
    outermost text in the middle 
    <span>simple text without id</span>
    <span>simple text without id 2</span>
    <span id="label-1">simple text with id</span>
    <span id="label-2">simple text with id 2</span>
    <div>
      <span>simple text within div</span> 
      <span>simple text within div 2</span> 
      <div><div>great grandchild text within div</div></div> 
    </div>
    <div>
      simple text as the first element in div 
      <span>simple text within div</span>
      simple text in the middle of div 
      <span>simple text within div 2</span>
      <div><div>great grandchild text within div</div></div>
      simple text at the last element in div
    </div>
    <div id="toplevel-div">
      <span>simple text within div</span>
      <span>simple text within div 2</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div</div>
        <div>great grandchild text within div without id</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1</li>
        <li>line item without id 2</li>
        <li>line item without id 3</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1</li>
        <li>line item with id 2</li>
        <li>line item with id 3</li>
      </ul>
    </div>
    <p>A paragraph with <b>parameters</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    <p id="paragraph">A paragraph with <b>id</b> is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end 
`,

      is: 'simple-text-element',

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
        console.log(this.is, 'lang-updated', e.detail);
        if (dom(e).rootTarget === this) {
          this.model = deepcopy(this.text.model);
        }
      }
    });
  }
  break;
}
