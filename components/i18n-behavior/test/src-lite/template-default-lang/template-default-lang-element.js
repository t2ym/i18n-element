import '../../../i18n-behavior.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '../../../../@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="template-default-lang-element">
  <template lang="fr">
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
  </template>
  
</dom-module>`;

document.head.appendChild($_documentContainer);
/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
Polymer({
  is: 'template-default-lang-element',

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
