/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import './item-element.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="multiple-element">
  <template localizable-text="embedded">
    <div id="base">
      <template id="items" is="dom-repeat" items="{{getArray(count)}}">
        <span>
          <item-element lang="{{effectiveLang}}" observe-html-lang="{{observeHtmlLang}}"></item-element>
        </span>
      </template>
    </div>
    <div id="save"></div>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {}
}
</json-data>
</template>
</template>
  
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
  importMeta: import.meta,
  is: 'multiple-element',

  behaviors: [
    BehaviorsStore.I18nBehavior
  ],

  properties: {
    count: {
      type: Number,
      value: 100
    }
  },

  listeners: {
    'lang-updated': 'langUpdated',
    'dom-change': 'domChanged'
  },

  getArray: function (count) {
    var a = [];
    for (var i = 0; i < count; i++) {
      a.push(i);
    }
    return a;
  },

  domChanged: function (e) {
    var nodes = dom(this.root).querySelectorAll('item-element');
    if (this.lang === 'en' && this.effectiveLang === '') {
      this.effectiveLang = 'en';
    }
    //console.log('multiple-element: dom-change count = ' + nodes.length + ' lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
    if (nodes.length === this.count &&
        (this.lang === this.effectiveLang ||
         (this.effectiveLang === '' && this.lang ==='en'))) {
      Array.prototype.forEach.call(nodes, function (node) {
        this.$.save.appendChild(node);
      }.bind(this));
      //console.log('multiple-element: local-dom-ready');
      this.fire('local-dom-ready');
    }
  },

  langUpdated: function (e) {
    var target = dom(e).rootTarget;
    var lang = target.lang === '' ? 'en' : target.lang;
    this.itemLang = this.itemLang || {};
    if (target.tagName.toLowerCase() === 'item-element') {
      //console.log('item-element: lang-updated lang = ' + target.lang);
      this.itemLang[lang] = this.itemLang[lang] || 0;
      this.itemLang[lang]++;
    }
    //console.log('multiple-element: ' + target.is + ' ' + 
    //            'lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang +
    //            ' itemLang[' + this.lang + '] = ' + this.itemLang[this.lang]);
    if (this.itemLang[this.lang] === this.count) {
      //console.log('count reached for ' + this.lang);
      this.$.items.render();
    }
    return false;
  }
});
