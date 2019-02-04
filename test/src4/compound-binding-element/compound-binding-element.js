/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {render, svg} from 'lit-html/lit-html.js';
import {repeat} from 'lit-html/directives/repeat.js';
import {html, i18n, bind} from '../../../i18n.js';

import deepcopy from 'deepcopy/dist/deepcopy.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="compound-binding-element">
    outermost text at the beginning with compound {{param1}} and {{param2}} variables
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1 with {{param1}} and {{param2}} variables</h1>
    outermost text in the middle with {{param1}} and {{param2}} variables
    <span>simple text without id with {{param1}} and {{param2}} variables</span>
    <span>simple text without id 2 with {{param1}} and {{param2}} variables</span>
    <span id="label-1">simple text with id and {{param1}} and {{param2}} variables</span>
    <span id="label-2">simple text with id and {{param1}} and {{param2}} variables 2</span>
    <div>
      <span>simple text within div with {{param1}} and {{param2}} variables</span> 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span> 
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div> 
    </div>
    <div>
      simple text as the first element in div with {{param1}} and {{param2}} variables
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      simple text in the middle of div with {{param1}} and {{param2}} variables 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span>
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div>
      simple text at the last element in div with {{param1}} and {{param2}} variables
    </div>
    <div id="toplevel-div">
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      <span>simple text within div 2 with {{param1}} and {{param2}} variables</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div with {{param1}} and {{param2}} variables</div>
        <div>great grandchild text within div without id with {{param1}} and {{param2}} variables</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
    </div>
    <p>A paragraph with {{param1}} is converted to {{param2}}.</p>
    <p id="paragraph">A paragraph with <b>id</b>, {{param1}}, and {{param2}} is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end with {{param1}} and {{param2}} variables
  </template>`;

//document.head.appendChild($_documentContainer.content);
switch (syntax) {
default:
case 'element-binding':
  {
    class CompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this)}
    outermost text at the beginning with compound ${this.param1} and ${this.param2} variables
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1 with ${this.param1} and ${this.param2} variables</h1>
    outermost text in the middle with ${this.param1} and ${this.param2} variables
    <span>simple text without id with ${this.param1} and ${this.param2} variables</span>
    <span>simple text without id 2 with ${this.param1} and ${this.param2} variables</span>
    <span id="label-1">simple text with id and ${this.param1} and ${this.param2} variables</span>
    <span id="label-2">simple text with id and ${this.param1} and ${this.param2} variables 2</span>
    <div>
      <span>simple text within div with ${this.param1} and ${this.param2} variables</span> 
      <span>simple text within div with ${this.param1} and ${this.param2} variables 2</span> 
      <div><div>great grandchild text within div with ${this.param1} and ${this.param2} variables</div></div> 
    </div>
    <div>
      simple text as the first element in div with ${this.param1} and ${this.param2} variables
      <span>simple text within div with ${this.param1} and ${this.param2} variables</span>
      simple text in the middle of div with ${this.param1} and ${this.param2} variables 
      <span>simple text within div with ${this.param1} and ${this.param2} variables 2</span>
      <div><div>great grandchild text within div with ${this.param1} and ${this.param2} variables</div></div>
      simple text at the last element in div with ${this.param1} and ${this.param2} variables
    </div>
    <div id="toplevel-div">
      <span>simple text within div with ${this.param1} and ${this.param2} variables</span>
      <span>simple text within div 2 with ${this.param1} and ${this.param2} variables</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div with ${this.param1} and ${this.param2} variables</div>
        <div>great grandchild text within div without id with ${this.param1} and ${this.param2} variables</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1 with ${this.param1} and ${this.param2} variables</li>
        <li>line item without id 2 with ${this.param1} and ${this.param2} variables</li>
        <li>line item without id 3 with ${this.param1} and ${this.param2} variables</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1 with ${this.param1} and ${this.param2} variables</li>
        <li>line item with id 2 with ${this.param1} and ${this.param2} variables</li>
        <li>line item with id 3 with ${this.param1} and ${this.param2} variables</li>
      </ul>
    </div>
    <p>A paragraph with ${this.param1} is converted to ${this.param2}.</p>
    <p id="paragraph">A paragraph with <b>id</b>, ${this.param1}, and ${this.param2} is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end with ${this.param1} and ${this.param2} variables
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
        return [...attributes];
      }

      get param1() {
        return this._param1;
      }
      set param1(value) {
        this._param1 = value;
        this.invalidate();
      }
      get param2() {
        return this._param2;
      }
      set param2(value) {
        this._param2 = value;
        this.invalidate();
      }

      constructor() {
        super();
        this.param1 = 'parameter 1';
        this.param2 = 'parameter 2';
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
    customElements.define(CompoundBindingElement.is, CompoundBindingElement);
  }
  break;
case 'name-binding':
  {
    class CompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind('compound-binding-element', import.meta)}
    outermost text at the beginning with compound ${this.param1} and ${this.param2} variables
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1 with ${this.param1} and ${this.param2} variables</h1>
    outermost text in the middle with ${this.param1} and ${this.param2} variables
    <span>simple text without id with ${this.param1} and ${this.param2} variables</span>
    <span>simple text without id 2 with ${this.param1} and ${this.param2} variables</span>
    <span id="label-1">simple text with id and ${this.param1} and ${this.param2} variables</span>
    <span id="label-2">simple text with id and ${this.param1} and ${this.param2} variables 2</span>
    <div>
      <span>simple text within div with ${this.param1} and ${this.param2} variables</span> 
      <span>simple text within div with ${this.param1} and ${this.param2} variables 2</span> 
      <div><div>great grandchild text within div with ${this.param1} and ${this.param2} variables</div></div> 
    </div>
    <div>
      simple text as the first element in div with ${this.param1} and ${this.param2} variables
      <span>simple text within div with ${this.param1} and ${this.param2} variables</span>
      simple text in the middle of div with ${this.param1} and ${this.param2} variables 
      <span>simple text within div with ${this.param1} and ${this.param2} variables 2</span>
      <div><div>great grandchild text within div with ${this.param1} and ${this.param2} variables</div></div>
      simple text at the last element in div with ${this.param1} and ${this.param2} variables
    </div>
    <div id="toplevel-div">
      <span>simple text within div with ${this.param1} and ${this.param2} variables</span>
      <span>simple text within div 2 with ${this.param1} and ${this.param2} variables</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div with ${this.param1} and ${this.param2} variables</div>
        <div>great grandchild text within div without id with ${this.param1} and ${this.param2} variables</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1 with ${this.param1} and ${this.param2} variables</li>
        <li>line item without id 2 with ${this.param1} and ${this.param2} variables</li>
        <li>line item without id 3 with ${this.param1} and ${this.param2} variables</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1 with ${this.param1} and ${this.param2} variables</li>
        <li>line item with id 2 with ${this.param1} and ${this.param2} variables</li>
        <li>line item with id 3 with ${this.param1} and ${this.param2} variables</li>
      </ul>
    </div>
    <p>A paragraph with ${this.param1} is converted to ${this.param2}.</p>
    <p id="paragraph">A paragraph with <b>id</b>, ${this.param1}, and ${this.param2} is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end with ${this.param1} and ${this.param2} variables
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
        return [...attributes];
      }

      get param1() {
        return this._param1;
      }
      set param1(value) {
        this._param1 = value;
        this.invalidate();
      }
      get param2() {
        return this._param2;
      }
      set param2(value) {
        this._param2 = value;
        this.invalidate();
      }

      constructor() {
        super();
        this.param1 = 'parameter 1';
        this.param2 = 'parameter 2';
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
    customElements.define(CompoundBindingElement.is, CompoundBindingElement);
  }
  break;
case 'element-name-binding':
  {
    class CompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      render() {
        return html`${bind(this, 'compound-binding-element')}
    outermost text at the beginning with compound ${this.param1} and ${this.param2} variables
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1 with ${this.param1} and ${this.param2} variables</h1>
    outermost text in the middle with ${this.param1} and ${this.param2} variables
    <span>simple text without id with ${this.param1} and ${this.param2} variables</span>
    <span>simple text without id 2 with ${this.param1} and ${this.param2} variables</span>
    <span id="label-1">simple text with id and ${this.param1} and ${this.param2} variables</span>
    <span id="label-2">simple text with id and ${this.param1} and ${this.param2} variables 2</span>
    <div>
      <span>simple text within div with ${this.param1} and ${this.param2} variables</span> 
      <span>simple text within div with ${this.param1} and ${this.param2} variables 2</span> 
      <div><div>great grandchild text within div with ${this.param1} and ${this.param2} variables</div></div> 
    </div>
    <div>
      simple text as the first element in div with ${this.param1} and ${this.param2} variables
      <span>simple text within div with ${this.param1} and ${this.param2} variables</span>
      simple text in the middle of div with ${this.param1} and ${this.param2} variables 
      <span>simple text within div with ${this.param1} and ${this.param2} variables 2</span>
      <div><div>great grandchild text within div with ${this.param1} and ${this.param2} variables</div></div>
      simple text at the last element in div with ${this.param1} and ${this.param2} variables
    </div>
    <div id="toplevel-div">
      <span>simple text within div with ${this.param1} and ${this.param2} variables</span>
      <span>simple text within div 2 with ${this.param1} and ${this.param2} variables</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div with ${this.param1} and ${this.param2} variables</div>
        <div>great grandchild text within div without id with ${this.param1} and ${this.param2} variables</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1 with ${this.param1} and ${this.param2} variables</li>
        <li>line item without id 2 with ${this.param1} and ${this.param2} variables</li>
        <li>line item without id 3 with ${this.param1} and ${this.param2} variables</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1 with ${this.param1} and ${this.param2} variables</li>
        <li>line item with id 2 with ${this.param1} and ${this.param2} variables</li>
        <li>line item with id 3 with ${this.param1} and ${this.param2} variables</li>
      </ul>
    </div>
    <p>A paragraph with ${this.param1} is converted to ${this.param2}.</p>
    <p id="paragraph">A paragraph with <b>id</b>, ${this.param1}, and ${this.param2} is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end with ${this.param1} and ${this.param2} variables
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
        return [...attributes];
      }

      get param1() {
        return this._param1;
      }
      set param1(value) {
        this._param1 = value;
        this.invalidate();
      }
      get param2() {
        return this._param2;
      }
      set param2(value) {
        this._param2 = value;
        this.invalidate();
      }

      constructor() {
        super();
        this.param1 = 'parameter 1';
        this.param2 = 'parameter 2';
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
    customElements.define(CompoundBindingElement.is, CompoundBindingElement);
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: html`
    outermost text at the beginning with compound {{param1}} and {{param2}} variables
    <div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>outermost header 1 with {{param1}} and {{param2}} variables</h1>
    outermost text in the middle with {{param1}} and {{param2}} variables
    <span>simple text without id with {{param1}} and {{param2}} variables</span>
    <span>simple text without id 2 with {{param1}} and {{param2}} variables</span>
    <span id="label-1">simple text with id and {{param1}} and {{param2}} variables</span>
    <span id="label-2">simple text with id and {{param1}} and {{param2}} variables 2</span>
    <div>
      <span>simple text within div with {{param1}} and {{param2}} variables</span> 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span> 
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div> 
    </div>
    <div>
      simple text as the first element in div with {{param1}} and {{param2}} variables
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      simple text in the middle of div with {{param1}} and {{param2}} variables 
      <span>simple text within div with {{param1}} and {{param2}} variables 2</span>
      <div><div>great grandchild text within div with {{param1}} and {{param2}} variables</div></div>
      simple text at the last element in div with {{param1}} and {{param2}} variables
    </div>
    <div id="toplevel-div">
      <span>simple text within div with {{param1}} and {{param2}} variables</span>
      <span>simple text within div 2 with {{param1}} and {{param2}} variables</span>
      <div id="second-level-div">
        <div id="third-level-div">great grandchild text within div with {{param1}} and {{param2}} variables</div>
        <div>great grandchild text within div without id with {{param1}} and {{param2}} variables</div>
      </div>
    </div>
    <div>
      <ul>
        <li>line item without id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item without id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
      <ul id="line-items">
        <li>line item with id 1 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 2 with {{param1}} and {{param2}} variables</li>
        <li>line item with id 3 with {{param1}} and {{param2}} variables</li>
      </ul>
    </div>
    <p>A paragraph with {{param1}} is converted to {{param2}}.</p>
    <p id="paragraph">A paragraph with <b>id</b>, {{param1}}, and {{param2}} is converted to <code>&lt;i18n-format&gt;</code>.</p>
    outermost text at the end with {{param1}} and {{param2}} variables
`,

      is: 'compound-binding-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

      properties: {
        param1: {
          type: String,
          value: 'parameter 1'
        },
        param2: {
          type: String,
          value: 'parameter 2'
        }
      },

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
