/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import 'i18n-behavior/i18n-behavior.js';

import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<template id="template-default-lang-element" lang="fr" basepath="template-default-lang/" localizable-text="embedded">{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span id="label-1">{{text.label-1}}</span>
    <span id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div id="second-level-div">
        <div id="third-level-div">{{text.third-level-div}}</div>
        <div>{{text.second-level-div:div_1}}</div>
      </div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul id="line-items">
        <li>{{text.line-items:li}}</li>
        <li>{{text.line-items:li_1}}</li>
        <li>{{text.line-items:li_2}}</li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " fr outermost text at the beginning ",
  "h1_3": "fr outermost header 1",
  "text_4": " fr outermost text in the middle ",
  "span_5": "fr simple text without id",
  "span_6": "fr simple text without id 2",
  "label-1": "fr simple text with id",
  "label-2": "fr simple text with id 2",
  "div_9:span": "fr simple text within div",
  "div_9:span_1": "fr simple text within div 2",
  "div_9:div_2:div": "fr great grandchild text within div",
  "div_10:text": " fr simple text as the first element in div ",
  "div_10:span_1": "fr simple text within div",
  "div_10:text_2": " fr simple text in the middle of div ",
  "div_10:span_3": "fr simple text within div 2",
  "div_10:div_4:div": "fr great grandchild text within div",
  "div_10:text_5": " fr simple text at the last element in div ",
  "toplevel-div:span": "fr simple text within div",
  "toplevel-div:span_1": "fr simple text within div 2",
  "third-level-div": "fr great grandchild text within div",
  "second-level-div:div_1": "fr great grandchild text within div without id",
  "div_12:ul:li": "fr line item without id 1",
  "div_12:ul:li_1": "fr line item without id 2",
  "div_12:ul:li_2": "fr line item without id 3",
  "line-items:li": "fr line item with id 1",
  "line-items:li_1": "fr line item with id 2",
  "line-items:li_2": "fr line item with id 3",
  "p_13": [
    "fr A paragraph with {1} is converted to {2}.",
    "fr parameters",
    "fr &lt;i18n-format&gt;"
  ],
  "paragraph": [
    "fr A paragraph with {1} is converted to {2}.",
    "fr id",
    "fr &lt;i18n-format&gt;"
  ],
  "text_15": " fr outermost text at the end "
}
</json-data>
</template>
</template><dom-module id="template-default-lang-element" legacy="">
  <template lang="fr" localizable-text="embedded">{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span id="label-1">{{text.label-1}}</span>
    <span id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div id="second-level-div">
        <div id="third-level-div">{{text.third-level-div}}</div>
        <div>{{text.second-level-div:div_1}}</div>
      </div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul id="line-items">
        <li>{{text.line-items:li}}</li>
        <li>{{text.line-items:li_1}}</li>
        <li>{{text.line-items:li_2}}</li>
      </ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b slot="1">{{text.p_13.1}}</b><code slot="2">{{text.p_13.2}}</code></i18n-format></p>
    <p id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b slot="1">{{text.paragraph.1}}</b><code slot="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " fr outermost text at the beginning ",
  "h1_3": "fr outermost header 1",
  "text_4": " fr outermost text in the middle ",
  "span_5": "fr simple text without id",
  "span_6": "fr simple text without id 2",
  "label-1": "fr simple text with id",
  "label-2": "fr simple text with id 2",
  "div_9:span": "fr simple text within div",
  "div_9:span_1": "fr simple text within div 2",
  "div_9:div_2:div": "fr great grandchild text within div",
  "div_10:text": " fr simple text as the first element in div ",
  "div_10:span_1": "fr simple text within div",
  "div_10:text_2": " fr simple text in the middle of div ",
  "div_10:span_3": "fr simple text within div 2",
  "div_10:div_4:div": "fr great grandchild text within div",
  "div_10:text_5": " fr simple text at the last element in div ",
  "toplevel-div:span": "fr simple text within div",
  "toplevel-div:span_1": "fr simple text within div 2",
  "third-level-div": "fr great grandchild text within div",
  "second-level-div:div_1": "fr great grandchild text within div without id",
  "div_12:ul:li": "fr line item without id 1",
  "div_12:ul:li_1": "fr line item without id 2",
  "div_12:ul:li_2": "fr line item without id 3",
  "line-items:li": "fr line item with id 1",
  "line-items:li_1": "fr line item with id 2",
  "line-items:li_2": "fr line item with id 3",
  "p_13": [
    "fr A paragraph with {1} is converted to {2}.",
    "fr parameters",
    "fr &lt;i18n-format&gt;"
  ],
  "paragraph": [
    "fr A paragraph with {1} is converted to {2}.",
    "fr id",
    "fr &lt;i18n-format&gt;"
  ],
  "text_15": " fr outermost text at the end "
}
</json-data>
</template>
</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
switch (syntax) {
default:
case 'mixin':
  {
    class TemplateDefaultLangElement extends Mixins.Logger(Mixins.Localizable(LegacyElementMixin(HTMLElement))) {
      static get importMeta() {
        return import.meta;
      }

      static get is() { return 'template-default-lang-element'; }

      connectedCallback () {
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
      }

      _langUpdated(e) {
        if (e.composedPath()[0] === this && this.text) {
          this.model = deepcopy(this.text.model);
        }
      }
    }
    customElements.define(TemplateDefaultLangElement.is, TemplateDefaultLangElement);
  }
  break;
case 'base-element':
  {
    class TemplateDefaultLangElement extends BaseElements.I18nElement {
      static get importMeta() {
        return import.meta;
      }

      static get is() { return 'template-default-lang-element'; }

      connectedCallback () {
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
      }

      _langUpdated(e) {
        if (e.composedPath()[0] === this && this.text) {
          this.model = deepcopy(this.text.model);
        }
      }
    }
    customElements.define(TemplateDefaultLangElement.is, TemplateDefaultLangElement);
  }
  break;
case 'thin':
  {
    Define = class TemplateDefaultLangElement extends BaseElements.I18nElement {
      connectedCallback () {
        super.connectedCallback();
        this.addEventListener('lang-updated', this._langUpdated.bind(this));
      }

      _langUpdated(e) {
        if (e.composedPath()[0] === this && this.text) {
          this.model = deepcopy(this.text.model);
        }
      }
    }
  }
  break;
case 'legacy':
  {
    Polymer({
      importMeta: import.meta,
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
