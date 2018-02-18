import '../../../../@polymer/iron-input/iron-input.js';
import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '../../../../@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="advanced-binding-element">
  <template localizable-text="embedded">
    <span id="status">{{tr(status,text.statusMessages)}}</span>

    <span id="default">{{or(value,text.defaultValue)}}</span>

    <i18n-format id="annotated-format" lang="{{effectiveLang}}">
      <span>{{tr(status,text.statusMessageFormats)}}</span>
      <span param="1">{{parameter}}</span>
      <span param="2">{{text.annotated-format.2}}</span>
    </i18n-format>

    <input is="iron-input" id="aria-attributes" title="{{model.aria-attributes.title}}" aria-label\$="{{model.aria-attributes.aria-label}}" aria-valuetext\$="{{model.aria-attributes.aria-valuetext}}" bind-value="{{value}}">

    <span>{{tr('key',text.nodefault)}}</span>
    <span><i18n-format lang="{{effectiveLang}}"><span>{{text.span_5.0}}</span><span param="1">{{text.defaultValue}}</span><span param="2">{{text.defaultValue}}</span></i18n-format></span>

    <template>
      <json-data text-id="statusMessages">{{text.statusMessages}}</json-data>
      <span text-id="defaultValue">{{text.defaultValue}}</span>
      <json-data text-id="statusMessageFormats">{{text.statusMessageFormats}}</json-data>
      <json-data text-id="nodefault">{{text.nodefault}}</json-data>
    </template>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {
    "aria-attributes": {
      "title": "tooltip text",
      "aria-label": "aria label text",
      "aria-valuetext": "aria value text"
    }
  },
  "annotated-format": [
    "{{tr(status,text.statusMessageFormats)}}",
    "{{parameter}}",
    "string parameter"
  ],
  "span_5": [
    "{1} {2}",
    "{{text.defaultValue}}",
    "{{text.defaultValue}}"
  ],
  "statusMessages": {
    "ok": "healthy status",
    "busy": "busy status",
    "error": "error status",
    "default": "unknown status"
  },
  "defaultValue": "default value",
  "statusMessageFormats": {
    "ok": "healthy status",
    "busy": "busy status with {2}",
    "error": "error status with {1} and {2}",
    "default": "unknown status"
  },
  "nodefault": {
    "ok": "ok status"
  }
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
  is: 'advanced-binding-element',

  behaviors: [
    BehaviorsStore.I18nBehavior
  ],

  properties: {
    status: {
      type: String,
      value: 'ok'
    },
    value: {
      type: String
    },
    parameter: {
      type: String
    }
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
    //console.log('advanced-binding-element: attached');
    this._isAttached = true;
    if (this._langReady) {
      //console.log('advanced-binding-element: local-dom-ready');
      this.fire('local-dom-ready');
    }
  },

  detached: function () {
    //console.log('advanced-binding-element: detached');
    this._isAttached = false;
  },

  _langUpdated: function (e) {
    //console.log('advanced-binding-element: lang-updated lang = ' + this.lang +
    //            ' effectiveLang = ' + this.effectiveLang +
    //            ' attached = ' + this._isAttached);
    if (dom(e).rootTarget === this &&
        this.effectiveLang === this.lang) {
      this.model = deepcopy(this.text.model);
      if (this._isAttached) {
        //console.log('advanced-binding-element: local-dom-ready');
        this.fire('local-dom-ready');
      }
      else {
        this._langReady = true;
      }
    }
  }
});
