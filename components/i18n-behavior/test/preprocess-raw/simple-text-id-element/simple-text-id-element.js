import '../../../i18n-behavior.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '../../../../@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="simple-text-id-element">
  <template localizable-text="embedded">{{text.text}}<div><div></div></div><!-- nested empty div -->
    <span text-id="whitespace"> &nbsp; </span>
    <h1>{{text.h1_3}}</h1>{{text.text_4}}<span>{{text.span_5}}</span>
    <span>{{text.span_6}}</span>
    <span text-id="label-1">{{text.label-1}}</span>
    <span text-id="label-2">{{text.label-2}}</span>
    <div>
      <span>{{text.div_9:span}}</span> 
      <span>{{text.div_9:span_1}}</span> 
      <div><div>{{text.div_9:div_2:div}}</div></div> 
    </div>
    <div>{{text.div_10:text}}<span>{{text.div_10:span_1}}</span>{{text.div_10:text_2}}<span>{{text.div_10:span_3}}</span>
      <div><div>{{text.div_10:div_4:div}}</div></div>{{text.div_10:text_5}}</div>
    <div text-id="toplevel-div">
      <span>{{text.toplevel-div:span}}</span>
      <span>{{text.toplevel-div:span_1}}</span>
      <div text-id="second-level-div"><i18n-format lang="{{effectiveLang}}"><span>{{text.second-level-div.0}}</span><div text-id="third-level-div" param="1">{{text.second-level-div.1}}</div><div param="2">{{text.second-level-div.2}}</div></i18n-format></div>
    </div>
    <div>
      <ul>
        <li>{{text.div_12:ul:li}}</li>
        <li>{{text.div_12:ul:li_1}}</li>
        <li>{{text.div_12:ul:li_2}}</li>
      </ul>
      <ul text-id="line-items"><i18n-format lang="{{effectiveLang}}"><span>{{text.line-items.0}}</span><li param="1">{{text.line-items.1}}</li><li param="2">{{text.line-items.2}}</li><li param="3">{{text.line-items.3}}</li></i18n-format></ul>
    </div>
    <p><i18n-format lang="{{effectiveLang}}"><span>{{text.p_13.0}}</span><b param="1">{{text.p_13.1}}</b><code param="2">{{text.p_13.2}}</code></i18n-format></p>
    <p text-id="paragraph"><i18n-format lang="{{effectiveLang}}"><span>{{text.paragraph.0}}</span><b param="1">{{text.paragraph.1}}</b><code param="2">{{text.paragraph.2}}</code></i18n-format></p>{{text.text_15}}<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "text": " outermost text at the beginning ",
  "h1_3": "outermost header 1",
  "text_4": " outermost text in the middle ",
  "span_5": "simple text without id",
  "span_6": "simple text without id 2",
  "label-1": "simple text with id",
  "label-2": "simple text with id 2",
  "div_9:span": "simple text within div",
  "div_9:span_1": "simple text within div 2",
  "div_9:div_2:div": "great grandchild text within div",
  "div_10:text": " simple text as the first element in div ",
  "div_10:span_1": "simple text within div",
  "div_10:text_2": " simple text in the middle of div ",
  "div_10:span_3": "simple text within div 2",
  "div_10:div_4:div": "great grandchild text within div",
  "div_10:text_5": " simple text at the last element in div ",
  "toplevel-div:span": "simple text within div",
  "toplevel-div:span_1": "simple text within div 2",
  "second-level-div": [
    " {1}\\n        {2} ",
    "great grandchild text within div",
    "great grandchild text within div without id"
  ],
  "div_12:ul:li": "line item without id 1",
  "div_12:ul:li_1": "line item without id 2",
  "div_12:ul:li_2": "line item without id 3",
  "line-items": [
    " {1}\\n        {2}\\n        {3} ",
    "line item with id 1",
    "line item with id 2",
    "line item with id 3"
  ],
  "p_13": [
    "A paragraph with {1} is converted to {2}.",
    "parameters",
    "&lt;i18n-format&gt;"
  ],
  "paragraph": [
    "A paragraph with {1} is converted to {2}.",
    "id",
    "&lt;i18n-format&gt;"
  ],
  "text_15": " outermost text at the end "
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
Polymer({
  is: 'simple-text-id-element',

  behaviors: [
    BehaviorsStore.I18nBehavior
  ],

  properties: {
  },

  observers: [
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
    if (dom(e).rootTarget === this) {
      this.model = deepcopy(this.text.model);
    }
  }
});
