/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {render, nothing} from 'lit-html/lit-html.js';
import {repeat} from 'lit-html/directives/repeat.js';
import {html, i18n, bind} from '../../../i18n.js';

switch (syntax) {
default:
case 'element-binding':
  {
    class ComplexCompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      getPath(...path) {
        let value = this;
        while (path.length > 0) {
          let prop = path.shift();
          value = value[prop];
          switch (typeof value) {
          case 'undefined':
            return '';
          case 'object':
            if (value) {
              break;
            }
            else {
              // null
              return '';
            }
          default:
            break;
          }
        }
        return value;
      }

      render() {
        return html`${bind(this)}
    <h5 id="item-update2">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`${item.name}`)}
      xxx
      ${true ? html`<span><b>${this.getPath('text', 'if-content')}</b></span>` : nothing}
      <b>abc</b>
      ${true ? html`${this.getPath('text', 'if-content2')}` : nothing}
      hello
    </h5>
    <h5 id="item-update">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`<!-- comment node -->
        <span>  ${item.name}  </span>`)}
      xxx
      ${true ? html`<b>${this.getPath('text', 'if-content')}</b>` : nothing}
      <b>abc</b>
      ${true ? this.getPath('text', 'if-content2') : nothing}
      hello
      ${true ? html`` : nothing}
      ${true ? html` <!-- comment -->` : nothing}
      ${true ? html`${this.text.updated}` : nothing}
    </h5>
    <h5 id="item-update3">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`${item.name}`)}
      xxx
      ${true ? html`<b>${this.getPath('text', 'if')}</b><b>${this.getPath('text', 'content')}</b>` : nothing}
      <b>abc</b>
      ${true ? html`${this.getPath('text', 'if-content2')}` : nothing}
      hello
    </h5>
    <h5 id="item-update4">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`${item.name} = ${this.text.updated}`)}
      xxx
      ${true ? html`<b>${this.getPath('text', 'if-content')}</b>` : nothing}
      <b>abc</b>
      ${true ? this.getPath('text', 'if-content2') : nothing}
      hello
    </h5>
    <p id="paragraph">A paragraph with 
      ${repeat(this.text.parameters || [], (item) => item, (item) => html`<i>${item} </i>`)}
      is converted to 
      <code>&lt;i18n-format&gt;</code>.
    </p>
    <p id="paragraph2">A paragraph with deep 
      ${repeat(this.text.parameters || [], (item) => item, (item) => html`<span><i>${item}</i> </span>`)}
      is <b>not</b> converted to 
      <code>&lt;i18n-format&gt;</code>.
      ${false ? html`` : nothing}
      ${false ? html` ` : nothing}
      ${false ? html`${this.text.updated}` : nothing}
    </p>
    <template>
      <json-data id="authors">[
        { "name": "Joe" }, { "name": "Alice" }
      ]</json-data>
      <span id="updated">Jan 1st, 2016</span>
      <json-data id="parameters">[
        "parameter 1", "parameter 2"
      ]</json-data>
      <span text-id="if-content">IF CONTENT</span>
      <span text-id="if-content2">IF CONTENT 2</span>
      <span text-id="if">IF</span>
      <span text-id="content">CONTENT</span>
    </template>
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
        return [...attributes];
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

      _langUpdated(e) {
        this.invalidate();
        console.log('complex-compound-binding-element: lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        window.setTimeout(function () {
          Array.prototype.forEach.call(this.shadowRoot.querySelectorAll('i18n-format'), function (node) {
            if (!node.elements) {
              console.log('elements are missing', node);
              node.ready();
            }
            node.render();
          });
          console.log(this.is + ' local-dom-ready ');
          this.fire('local-dom-ready');
        }.bind(this), 1);
      }
    }
    customElements.define(ComplexCompoundBindingElement.is, ComplexCompoundBindingElement);
  }
  break;
case 'name-binding':
  {
    class ComplexCompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      getPath(...path) {
        let value = this;
        while (path.length > 0) {
          let prop = path.shift();
          value = value[prop];
          switch (typeof value) {
          case 'undefined':
            return '';
          case 'object':
            if (value) {
              break;
            }
            else {
              // null
              return '';
            }
          default:
            break;
          }
        }
        return value;
      }

      render() {
        return html`${bind('complex-compound-binding-element', import.meta)}
    <h5 id="item-update2">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`${item.name}`)}
      xxx
      ${true ? html`<span><b>${this.getPath('text', 'if-content')}</b></span>` : nothing}
      <b>abc</b>
      ${true ? html`${this.getPath('text', 'if-content2')}` : nothing}
      hello
    </h5>
    <h5 id="item-update">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`<!-- comment node -->
        <span>  ${item.name}  </span>`)}
      xxx
      ${true ? html`<b>${this.getPath('text', 'if-content')}</b>` : nothing}
      <b>abc</b>
      ${true ? this.getPath('text', 'if-content2') : nothing}
      hello
      ${true ? html`` : nothing}
      ${true ? html` <!-- comment -->` : nothing}
      ${true ? html`${this.text.updated}` : nothing}
    </h5>
    <h5 id="item-update3">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`${item.name}`)}
      xxx
      ${true ? html`<b>${this.getPath('text', 'if')}</b><b>${this.getPath('text', 'content')}</b>` : nothing}
      <b>abc</b>
      ${true ? html`${this.getPath('text', 'if-content2')}` : nothing}
      hello
    </h5>
    <h5 id="item-update4">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`${item.name} = ${this.text.updated}`)}
      xxx
      ${true ? html`<b>${this.getPath('text', 'if-content')}</b>` : nothing}
      <b>abc</b>
      ${true ? this.getPath('text', 'if-content2') : nothing}
      hello
    </h5>
    <p id="paragraph">A paragraph with 
      ${repeat(this.text.parameters || [], (item) => item, (item) => html`<i>${item} </i>`)}
      is converted to 
      <code>&lt;i18n-format&gt;</code>.
    </p>
    <p id="paragraph2">A paragraph with deep 
      ${repeat(this.text.parameters || [], (item) => item, (item) => html`<span><i>${item}</i> </span>`)}
      is <b>not</b> converted to 
      <code>&lt;i18n-format&gt;</code>.
      ${false ? html`` : nothing}
      ${false ? html` ` : nothing}
      ${false ? html`${this.text.updated}` : nothing}
    </p>
    <template>
      <json-data id="authors">[
        { "name": "Joe" }, { "name": "Alice" }
      ]</json-data>
      <span id="updated">Jan 1st, 2016</span>
      <json-data id="parameters">[
        "parameter 1", "parameter 2"
      ]</json-data>
      <span text-id="if-content">IF CONTENT</span>
      <span text-id="if-content2">IF CONTENT 2</span>
      <span text-id="if">IF</span>
      <span text-id="content">CONTENT</span>
    </template>
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
        return [...attributes];
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

      _langUpdated(e) {
        this.invalidate();
        console.log('complex-compound-binding-element: lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        window.setTimeout(function () {
          Array.prototype.forEach.call(this.shadowRoot.querySelectorAll('i18n-format'), function (node) {
            if (!node.elements) {
              console.log('elements are missing', node);
              node.ready();
            }
            node.render();
          });
          console.log(this.is + ' local-dom-ready ');
          this.fire('local-dom-ready');
        }.bind(this), 1);
      }
    }
    customElements.define(ComplexCompoundBindingElement.is, ComplexCompoundBindingElement);
  }
  break;
case 'element-name-binding':
  {
    class ComplexCompoundBindingElement extends i18n(HTMLElement) {
      static get importMeta() {
        return import.meta;
      }

      getPath(...path) {
        let value = this;
        while (path.length > 0) {
          let prop = path.shift();
          value = value[prop];
          switch (typeof value) {
          case 'undefined':
            return '';
          case 'object':
            if (value) {
              break;
            }
            else {
              // null
              return '';
            }
          default:
            break;
          }
        }
        return value;
      }

      render() {
        return html`${bind(this, 'complex-compound-binding-element')}
    <h5 id="item-update2">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`${item.name}`)}
      xxx
      ${true ? html`<span><b>${this.getPath('text', 'if-content')}</b></span>` : nothing}
      <b>abc</b>
      ${true ? html`${this.getPath('text', 'if-content2')}` : nothing}
      hello
    </h5>
    <h5 id="item-update">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`<!-- comment node -->
        <span>  ${item.name}  </span>`)}
      xxx
      ${true ? html`<b>${this.getPath('text', 'if-content')}</b>` : nothing}
      <b>abc</b>
      ${true ? this.getPath('text', 'if-content2') : nothing}
      hello
      ${true ? html`` : nothing}
      ${true ? html` <!-- comment -->` : nothing}
      ${true ? html`${this.text.updated}` : nothing}
    </h5>
    <h5 id="item-update3">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`${item.name}`)}
      xxx
      ${true ? html`<b>${this.getPath('text', 'if')}</b><b>${this.getPath('text', 'content')}</b>` : nothing}
      <b>abc</b>
      ${true ? html`${this.getPath('text', 'if-content2')}` : nothing}
      hello
    </h5>
    <h5 id="item-update4">updated: ${this.text.updated}, by: 
      ${repeat(this.text.authors || [], (item) => item, (item) => html`${item.name} = ${this.text.updated}`)}
      xxx
      ${true ? html`<b>${this.getPath('text', 'if-content')}</b>` : nothing}
      <b>abc</b>
      ${true ? this.getPath('text', 'if-content2') : nothing}
      hello
    </h5>
    <p id="paragraph">A paragraph with 
      ${repeat(this.text.parameters || [], (item) => item, (item) => html`<i>${item} </i>`)}
      is converted to 
      <code>&lt;i18n-format&gt;</code>.
    </p>
    <p id="paragraph2">A paragraph with deep 
      ${repeat(this.text.parameters || [], (item) => item, (item) => html`<span><i>${item}</i> </span>`)}
      is <b>not</b> converted to 
      <code>&lt;i18n-format&gt;</code>.
      ${false ? html`` : nothing}
      ${false ? html` ` : nothing}
      ${false ? html`${this.text.updated}` : nothing}
    </p>
    <template>
      <json-data id="authors">[
        { "name": "Joe" }, { "name": "Alice" }
      ]</json-data>
      <span id="updated">Jan 1st, 2016</span>
      <json-data id="parameters">[
        "parameter 1", "parameter 2"
      ]</json-data>
      <span text-id="if-content">IF CONTENT</span>
      <span text-id="if-content2">IF CONTENT 2</span>
      <span text-id="if">IF</span>
      <span text-id="content">CONTENT</span>
    </template>
`;
      }

      static get observedAttributes() {
        let attributes = new Set(super.observedAttributes);
        [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
        return [...attributes];
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

      _langUpdated(e) {
        this.invalidate();
        console.log('complex-compound-binding-element: lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        window.setTimeout(function () {
          Array.prototype.forEach.call(this.shadowRoot.querySelectorAll('i18n-format'), function (node) {
            if (!node.elements) {
              console.log('elements are missing', node);
              node.ready();
            }
            node.render();
          });
          console.log(this.is + ' local-dom-ready ');
          this.fire('local-dom-ready');
        }.bind(this), 1);
      }
    }
    customElements.define(ComplexCompoundBindingElement.is, ComplexCompoundBindingElement);
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,

      _template: html`
    <h5 id="item-update2">updated: {{text.updated}}, by: 
      <dom-repeat items="{{text.authors}}"><template>
        {{item.name}}
      </template></dom-repeat>
      xxx
      <dom-if if="true"><template>
        <span><b>IF CONTENT</b></span>
      </template></dom-if>
      <b>abc</b>
      <dom-if if="true"><template>IF CONTENT 2</template></dom-if>
      hello
    </h5>
    <h5 id="item-update">updated: {{text.updated}}, by: 
      <dom-repeat items="{{text.authors}}"><template><!-- comment node -->
        <span>  {{item.name}}  </span>
      </template></dom-repeat>
      xxx
      <dom-if if="true"><template>
        <b>IF CONTENT</b>
      </template></dom-if>
      <b>abc</b>
      <dom-if if="true"><template>IF CONTENT 2</template></dom-if>
      hello
      <dom-if if="true"><template></template></dom-if>
      <dom-if if="true"><template> <!-- comment --></template></dom-if>
      <dom-if if="true"><template>{{text.updated}}</template></dom-if>
    </h5>
    <h5 id="item-update3">updated: {{text.updated}}, by: 
      <dom-repeat items="{{text.authors}}"><template>
        {{item.name}}
      </template></dom-repeat>
      xxx
      <dom-if if="true"><template>
        <b>IF</b><b>CONTENT</b>
      </template></dom-if>
      <b>abc</b>
      <dom-if if="true"><template>IF CONTENT 2</template></dom-if>
      hello
    </h5>
    <h5 id="item-update4">updated: {{text.updated}}, by: 
      <dom-repeat items="{{text.authors}}"><template>
        {{item.name}} = {{text.updated}}
      </template></dom-repeat>
      xxx
      <dom-if if="true"><template>
        <b>IF CONTENT</b>
      </template></dom-if>
      <b>abc</b>
      <dom-if if="true"><template>IF CONTENT 2</template></dom-if>
      hello
    </h5>
    <p id="paragraph">A paragraph with 
      <dom-repeat items="{{text.parameters}}"><template>
        <i>{{item}} </i>
      </template></dom-repeat>
      is converted to 
      <code>&lt;i18n-format&gt;</code>.
    </p>
    <p id="paragraph2">A paragraph with deep 
      <dom-repeat items="{{text.parameters}}"><template>
        <span><i>{{item}}</i> </span>
      </template></dom-repeat>
      is <b>not</b> converted to 
      <code>&lt;i18n-format&gt;</code>.
      <dom-if if="false"><template></template></dom-if>
      <dom-if if="false"><template>  </template></dom-if>
      <dom-if if="false"><template>{{text.updated}}</template></dom-if>
    </p>
    <template>
      <json-data id="authors">[
        { "name": "Joe" }, { "name": "Alice" }
      ]</json-data>
      <span id="updated">Jan 1st, 2016</span>
      <json-data id="parameters">[
        "parameter 1", "parameter 2"
      ]</json-data>
    </template>
`,

      is: 'complex-compound-binding-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

      listeners: {
        'lang-updated': '_langUpdated'
      },

      _langUpdated: function (e) {
        console.log('complex-compound-binding-element: lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        window.setTimeout(function () {
          Array.prototype.forEach.call(this.root.querySelectorAll('i18n-format'), function (node) {
            if (!node.elements) {
              console.log('elements are missing', node);
              node.ready();
            }
            node.render();
          });
          console.log(this.is + ' local-dom-ready ');
          this.fire('local-dom-ready');
        }.bind(this), 1);
      }
    });
  }
  break;
}
