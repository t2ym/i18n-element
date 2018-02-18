import '../../../i18n-behavior.js';
import { Polymer as Polymer$0 } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<template id="complex-compound-binding-element" basepath="edge-case/" localizable-text="embedded">
    <h5 id="item-update2"><i18n-format lang="{{effectiveLang}}"><span>{{text.item-update2:text.0}}</span><span slot="1">{{text.updated}}</span></i18n-format><dom-repeat items="{{text.authors}}"><template>
        {{item.name}}
      </template></dom-repeat>{{text.item-update2:text_2}}<dom-if if="true"><template>
        <span><b>{{text.item-update2:dom-if_3:template:span:b}}</b></span>
      </template></dom-if>
      <b>{{text.item-update2:b_4}}</b>
      <dom-if if="true"><template>{{text.item-update2:dom-if_5:template:text}}</template></dom-if>{{text.item-update2:text_6}}</h5>
    <h5 id="item-update"><i18n-format lang="{{effectiveLang}}"><span>{{text.item-update:text.0}}</span><span slot="1">{{text.updated}}</span></i18n-format><dom-repeat items="{{text.authors}}"><template><!-- comment node -->
        <span>  {{item.name}}  </span>
      </template></dom-repeat>{{text.item-update:text_2}}<dom-if if="true"><template>
        <b>{{text.item-update:dom-if_3:template:b}}</b>
      </template></dom-if>
      <b>{{text.item-update:b_4}}</b>
      <dom-if if="true"><template>{{text.item-update:dom-if_5:template:text}}</template></dom-if>{{text.item-update:text_6}}<dom-if if="true"><template></template></dom-if>
      <dom-if if="true"><template> <!-- comment --></template></dom-if>
      <dom-if if="true"><template>{{text.updated}}</template></dom-if>
    </h5>
    <h5 id="item-update3"><i18n-format lang="{{effectiveLang}}"><span>{{text.item-update3:text.0}}</span><span slot="1">{{text.updated}}</span></i18n-format><dom-repeat items="{{text.authors}}"><template>
        {{item.name}}
      </template></dom-repeat>{{text.item-update3:text_2}}<dom-if if="true"><template>
        <b>{{text.item-update3:dom-if_3:template:b}}</b><b>{{text.item-update3:dom-if_3:template:b_1}}</b>
      </template></dom-if>
      <b>{{text.item-update3:b_4}}</b>
      <dom-if if="true"><template>{{text.item-update3:dom-if_5:template:text}}</template></dom-if>{{text.item-update3:text_6}}</h5>
    <h5 id="item-update4"><i18n-format lang="{{effectiveLang}}"><span>{{text.item-update4:text.0}}</span><span slot="1">{{text.updated}}</span></i18n-format><dom-repeat items="{{text.authors}}"><template><i18n-format lang="{{effectiveLang}}"><span>{{text.item-update4:dom-repeat_1:template:text.0}}</span><span slot="1">{{item.name}}</span><span slot="2">{{text.updated}}</span></i18n-format></template></dom-repeat>{{text.item-update4:text_2}}<dom-if if="true"><template>
        <b>{{text.item-update4:dom-if_3:template:b}}</b>
      </template></dom-if>
      <b>{{text.item-update4:b_4}}</b>
      <dom-if if="true"><template>{{text.item-update4:dom-if_5:template:text}}</template></dom-if>{{text.item-update4:text_6}}</h5>
    <p id="paragraph">{{text.paragraph:text}}<dom-repeat items="{{text.parameters}}"><template>
        <i>{{item}} </i>
      </template></dom-repeat>{{text.paragraph:text_2}}<code>{{text.paragraph:code_3}}</code>{{text.paragraph:text_4}}</p>
    <p id="paragraph2">{{text.paragraph2:text}}<dom-repeat items="{{text.parameters}}"><template>
        <span><i>{{item}}</i> </span>
      </template></dom-repeat>{{text.paragraph2:text_2}}<b>{{text.paragraph2:b_3}}</b>{{text.paragraph2:text_4}}<code>{{text.paragraph2:code_5}}</code>{{text.paragraph2:text_6}}<dom-if if="false"><template></template></dom-if>
      <dom-if if="false"><template>  </template></dom-if>
      <dom-if if="false"><template>{{text.updated}}</template></dom-if>
    </p>
    <template>
      <json-data id="authors">{{text.authors}}</json-data>
      <span id="updated">{{text.updated}}</span>
      <json-data id="parameters">{{text.parameters}}</json-data>
    </template>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "item-update2:text": [
    "updated: {1}, by: ",
    "{{text.updated}}"
  ],
  "item-update2:text_2": " xxx ",
  "item-update2:dom-if_3:template:span:b": "IF CONTENT",
  "item-update2:b_4": "abc",
  "item-update2:dom-if_5:template:text": "IF CONTENT 2",
  "item-update2:text_6": " hello ",
  "item-update:text": [
    "updated: {1}, by: ",
    "{{text.updated}}"
  ],
  "item-update:text_2": " xxx ",
  "item-update:dom-if_3:template:b": "IF CONTENT",
  "item-update:b_4": "abc",
  "item-update:dom-if_5:template:text": "IF CONTENT 2",
  "item-update:text_6": " hello ",
  "item-update3:text": [
    "updated: {1}, by: ",
    "{{text.updated}}"
  ],
  "item-update3:text_2": " xxx ",
  "item-update3:dom-if_3:template:b": "IF",
  "item-update3:dom-if_3:template:b_1": "CONTENT",
  "item-update3:b_4": "abc",
  "item-update3:dom-if_5:template:text": "IF CONTENT 2",
  "item-update3:text_6": " hello ",
  "item-update4:text": [
    "updated: {1}, by: ",
    "{{text.updated}}"
  ],
  "item-update4:dom-repeat_1:template:text": [
    " {1} = {2} ",
    "{{item.name}}",
    "{{text.updated}}"
  ],
  "item-update4:text_2": " xxx ",
  "item-update4:dom-if_3:template:b": "IF CONTENT",
  "item-update4:b_4": "abc",
  "item-update4:dom-if_5:template:text": "IF CONTENT 2",
  "item-update4:text_6": " hello ",
  "paragraph:text": "A paragraph with ",
  "paragraph:text_2": " is converted to ",
  "paragraph:code_3": "&lt;i18n-format&gt;",
  "paragraph:text_4": ". ",
  "paragraph2:text": "A paragraph with deep ",
  "paragraph2:text_2": " is ",
  "paragraph2:b_3": "not",
  "paragraph2:text_4": " converted to ",
  "paragraph2:code_5": "&lt;i18n-format&gt;",
  "paragraph2:text_6": ". ",
  "authors": [
    {
      "name": "Joe"
    },
    {
      "name": "Alice"
    }
  ],
  "updated": "Jan 1st, 2016",
  "parameters": [
    "parameter 1",
    "parameter 2"
  ]
}
</json-data>
</template>
</template><dom-module id="complex-compound-binding-element" legacy="">
  <template localizable-text="embedded">
    <h5 id="item-update2"><i18n-format lang="{{effectiveLang}}"><span>{{text.item-update2:text.0}}</span><span slot="1">{{text.updated}}</span></i18n-format><dom-repeat items="{{text.authors}}"><template>
        {{item.name}}
      </template></dom-repeat>{{text.item-update2:text_2}}<dom-if if="true"><template>
        <span><b>{{text.item-update2:dom-if_3:template:span:b}}</b></span>
      </template></dom-if>
      <b>{{text.item-update2:b_4}}</b>
      <dom-if if="true"><template>{{text.item-update2:dom-if_5:template:text}}</template></dom-if>{{text.item-update2:text_6}}</h5>
    <h5 id="item-update"><i18n-format lang="{{effectiveLang}}"><span>{{text.item-update:text.0}}</span><span slot="1">{{text.updated}}</span></i18n-format><dom-repeat items="{{text.authors}}"><template><!-- comment node -->
        <span>  {{item.name}}  </span>
      </template></dom-repeat>{{text.item-update:text_2}}<dom-if if="true"><template>
        <b>{{text.item-update:dom-if_3:template:b}}</b>
      </template></dom-if>
      <b>{{text.item-update:b_4}}</b>
      <dom-if if="true"><template>{{text.item-update:dom-if_5:template:text}}</template></dom-if>{{text.item-update:text_6}}<dom-if if="true"><template></template></dom-if>
      <dom-if if="true"><template> <!-- comment --></template></dom-if>
      <dom-if if="true"><template>{{text.updated}}</template></dom-if>
    </h5>
    <h5 id="item-update3"><i18n-format lang="{{effectiveLang}}"><span>{{text.item-update3:text.0}}</span><span slot="1">{{text.updated}}</span></i18n-format><dom-repeat items="{{text.authors}}"><template>
        {{item.name}}
      </template></dom-repeat>{{text.item-update3:text_2}}<dom-if if="true"><template>
        <b>{{text.item-update3:dom-if_3:template:b}}</b><b>{{text.item-update3:dom-if_3:template:b_1}}</b>
      </template></dom-if>
      <b>{{text.item-update3:b_4}}</b>
      <dom-if if="true"><template>{{text.item-update3:dom-if_5:template:text}}</template></dom-if>{{text.item-update3:text_6}}</h5>
    <h5 id="item-update4"><i18n-format lang="{{effectiveLang}}"><span>{{text.item-update4:text.0}}</span><span slot="1">{{text.updated}}</span></i18n-format><dom-repeat items="{{text.authors}}"><template><i18n-format lang="{{effectiveLang}}"><span>{{text.item-update4:dom-repeat_1:template:text.0}}</span><span slot="1">{{item.name}}</span><span slot="2">{{text.updated}}</span></i18n-format></template></dom-repeat>{{text.item-update4:text_2}}<dom-if if="true"><template>
        <b>{{text.item-update4:dom-if_3:template:b}}</b>
      </template></dom-if>
      <b>{{text.item-update4:b_4}}</b>
      <dom-if if="true"><template>{{text.item-update4:dom-if_5:template:text}}</template></dom-if>{{text.item-update4:text_6}}</h5>
    <p id="paragraph">{{text.paragraph:text}}<dom-repeat items="{{text.parameters}}"><template>
        <i>{{item}} </i>
      </template></dom-repeat>{{text.paragraph:text_2}}<code>{{text.paragraph:code_3}}</code>{{text.paragraph:text_4}}</p>
    <p id="paragraph2">{{text.paragraph2:text}}<dom-repeat items="{{text.parameters}}"><template>
        <span><i>{{item}}</i> </span>
      </template></dom-repeat>{{text.paragraph2:text_2}}<b>{{text.paragraph2:b_3}}</b>{{text.paragraph2:text_4}}<code>{{text.paragraph2:code_5}}</code>{{text.paragraph2:text_6}}<dom-if if="false"><template></template></dom-if>
      <dom-if if="false"><template>  </template></dom-if>
      <dom-if if="false"><template>{{text.updated}}</template></dom-if>
    </p>
    <template>
      <json-data id="authors">{{text.authors}}</json-data>
      <span id="updated">{{text.updated}}</span>
      <json-data id="parameters">{{text.parameters}}</json-data>
    </template>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "item-update2:text": [
    "updated: {1}, by: ",
    "{{text.updated}}"
  ],
  "item-update2:text_2": " xxx ",
  "item-update2:dom-if_3:template:span:b": "IF CONTENT",
  "item-update2:b_4": "abc",
  "item-update2:dom-if_5:template:text": "IF CONTENT 2",
  "item-update2:text_6": " hello ",
  "item-update:text": [
    "updated: {1}, by: ",
    "{{text.updated}}"
  ],
  "item-update:text_2": " xxx ",
  "item-update:dom-if_3:template:b": "IF CONTENT",
  "item-update:b_4": "abc",
  "item-update:dom-if_5:template:text": "IF CONTENT 2",
  "item-update:text_6": " hello ",
  "item-update3:text": [
    "updated: {1}, by: ",
    "{{text.updated}}"
  ],
  "item-update3:text_2": " xxx ",
  "item-update3:dom-if_3:template:b": "IF",
  "item-update3:dom-if_3:template:b_1": "CONTENT",
  "item-update3:b_4": "abc",
  "item-update3:dom-if_5:template:text": "IF CONTENT 2",
  "item-update3:text_6": " hello ",
  "item-update4:text": [
    "updated: {1}, by: ",
    "{{text.updated}}"
  ],
  "item-update4:dom-repeat_1:template:text": [
    " {1} = {2} ",
    "{{item.name}}",
    "{{text.updated}}"
  ],
  "item-update4:text_2": " xxx ",
  "item-update4:dom-if_3:template:b": "IF CONTENT",
  "item-update4:b_4": "abc",
  "item-update4:dom-if_5:template:text": "IF CONTENT 2",
  "item-update4:text_6": " hello ",
  "paragraph:text": "A paragraph with ",
  "paragraph:text_2": " is converted to ",
  "paragraph:code_3": "&lt;i18n-format&gt;",
  "paragraph:text_4": ". ",
  "paragraph2:text": "A paragraph with deep ",
  "paragraph2:text_2": " is ",
  "paragraph2:b_3": "not",
  "paragraph2:text_4": " converted to ",
  "paragraph2:code_5": "&lt;i18n-format&gt;",
  "paragraph2:text_6": ". ",
  "authors": [
    {
      "name": "Joe"
    },
    {
      "name": "Alice"
    }
  ],
  "updated": "Jan 1st, 2016",
  "parameters": [
    "parameter 1",
    "parameter 2"
  ]
}
</json-data>
</template>
</template>
</dom-module>`;

document.head.appendChild($_documentContainer);
/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
switch (syntax) {
default:
case 'mixin':
  {
    class ComplexCompoundBindingElement extends Mixins.Localizable(Polymer.LegacyElement) {
      static get is() { return 'complex-compound-binding-element' }
      static get config () {
        return {
          listeners: {
            'lang-updated': '_langUpdated'
          }          
        }
      }

      _langUpdated(e) {
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
    }
    customElements.define(ComplexCompoundBindingElement.is, ComplexCompoundBindingElement);
  }
  break;
case 'base-element':
  {
    class ComplexCompoundBindingElement extends BaseElements.I18nElement {
      static get is() { return 'complex-compound-binding-element' }
      static get config () {
        return {
          listeners: {
            'lang-updated': '_langUpdated'
          }          
        }
      }

      _langUpdated(e) {
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
    }
    customElements.define(ComplexCompoundBindingElement.is, ComplexCompoundBindingElement);
  }
  break;
case 'thin':
  {
    Define = class ComplexCompoundBindingElement extends BaseElements.I18nElement {
      static get config () {
        return {
          listeners: {
            'lang-updated': '_langUpdated'
          }          
        }
      }

      _langUpdated(e) {
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
    };
  }
  break;
case 'legacy':
  {
    Polymer$0({
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
