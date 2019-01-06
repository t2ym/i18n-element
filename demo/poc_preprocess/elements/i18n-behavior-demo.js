/**
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/*
<link rel="import" href="../../iron-flex-layout/iron-flex-layout.html">
<link rel="import" href="../../paper-input/paper-input.html">
<link rel="import" href="../../paper-button/paper-button.html">
<link rel="import" href="../../paper-dropdown-menu/paper-dropdown-menu.html">
<link rel="import" href="../../paper-menu/paper-menu.html">
<link rel="import" href="../../paper-item/paper-item.html">
<link rel="import" href="../../paper-styles/demo-pages.html">
*/
import '../../../i18n-element.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';

class I18nBehaviorDemo extends Mixins.Localizable(LegacyElementMixin(HTMLElement)) {
  static get importMeta() {
    return import.meta;
  }

  static get template() {
    return ((t) => { t.setAttribute("localizable-text", "embedded"); return t; })(html`
    <style>
    h2 {
      font-size: 14px;
    }
    .text {
      font-size: 12px;
    }
    .code {
      font-size: 12px;
      font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
    }
    </style>

    <h2>{{text.h2_1}}</h2>
    <span id="simple" class="text">{{text.simple}}</span>

    <h2>{{text.h2_3}}</h2>
    <input id="simple-input" placeholder="{{model.simple-input.placeholder}}">

    <h2>{{text.h2_5}}</h2>
    <p id="example-sentence" class="text"><i18n-format lang="{{effectiveLang}}"><span>{{text.example-sentence.0}}</span><i slot="1">{{text.example-sentence.1}}</i><b slot="2">{{text.example-sentence.2}}</b><a class="code" href="https://github.com/t2ym/i18n-format" slot="3">{{text.example-sentence.3}}</a></i18n-format></p>

    <h2>{{text.h2_7}}</h2>
    <p>
      <i18n-format id="compound-format-text" class="text" lang="{{effectiveLang}}">
        <json-data>{{serialize(text.compound-format-text.0)}}</json-data>
        <i18n-number offset="1" slot="1" lang="{{effectiveLang}}">{{recipients.length}}</i18n-number>
        <span slot="2">{{recipients.0.gender}}</span>
        <span slot="3">{{model.data.sender.name}}</span>
        <span slot="4">{{recipients.0.name}}</span>
        <span slot="5">{{text.compound-format-text.5}}</span>
      </i18n-format>
    </p>

    <h2>{{text.h2_9}}</h2>
    <pre class="code"><i18n-format lang="{{effectiveLang}}"><span>{{text.pre_10.0}}</span><span slot="1">{{effectiveLang}}</span><span slot="2">{{langName}}</span></i18n-format></pre>
    <pre class="code"><i18n-format lang="{{effectiveLang}}"><span>{{text.pre_11.0}}</span><span slot="1">{{stringifiedUser}}</span></i18n-format></pre>
    <pre class="code"><i18n-format lang="{{effectiveLang}}"><span>{{text.pre_12.0}}</span><span slot="1">{{stringifiedRecipients}}</span></i18n-format></pre>

    <template>
      <!-- manually define model data -->
      <json-data id="data" sender="{{model.data.sender}}" recipients="{{model.data.recipients}}"></json-data>
      <!-- define UI data -->
      <json-data id="langNames">{{text.langNames}}</json-data>
    </template>
<template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {
    "simple-input": {
      "placeholder": "Placeholder String"
    },
    "data": {
      "sender": {
        "name": "Joe",
        "gender": "male"
      },
      "recipients": [
        {
          "name": "Alice",
          "gender": "female"
        },
        {
          "name": "Bob",
          "gender": "male"
        },
        {
          "name": "Yoda",
          "gender": "other"
        }
      ]
    }
  },
  "h2_1": "Simple String",
  "simple": "UI Text String",
  "h2_3": "Simple Attribute",
  "h2_5": "Automatic Format",
  "example-sentence": [
    "This {1} with {2} is automatically converted to {3} to translate it as a whole with any parameter order.",
    "example sentence",
    "some parameters or embedded tags",
    "&lt;i18n-format&gt;"
  ],
  "h2_7": "Compound Format with &lt;i18n-format&gt;",
  "compound-format-text": [
    {
      "0": "You ({3}) gave no gifts.",
      "1": {
        "male": "You ({3}) gave him ({4}) {5}.",
        "female": "You ({3}) gave her ({4}) {5}.",
        "other": "You ({3}) gave them ({4}) {5}."
      },
      "one": {
        "male": "You ({3}) gave him ({4}) and one other person {5}.",
        "female": "You ({3}) gave her ({4}) and one other person {5}.",
        "other": "You ({3}) gave them ({4}) and one other person {5}."
      },
      "other": "You ({3}) gave them ({4}) and {1} other people gifts."
    },
    "{{recipients.length - 1}}",
    "{{recipients.0.gender}}",
    "{{model.data.sender.name}}",
    "{{recipients.0.name}}",
    "a gift"
  ],
  "h2_9": "Parameters",
  "pre_10": [
    "lang = {1} ({2})",
    "{{effectiveLang}}",
    "{{langName}}"
  ],
  "pre_11": [
    "sender = {1}",
    "{{stringifiedUser}}"
  ],
  "pre_12": [
    "recipients = {1}",
    "{{stringifiedRecipients}}"
  ],
  "langNames": {
    "en": "English",
    "ja": "Japanese",
    "fr": "French"
  }
}
</json-data>
</template>
`);
  }

  static get is() { return 'i18n-behavior-demo'; }
  static get properties() {
    return {
      recipientsLength: {
        type: Number,
        value: 2
      },
      recipientsIndex: {
        type: Number,
        value: 0
      },
      langIndex: {
        type: Number,
        value: 0
      },
      langList: {
        type: Array,
        value: function () {
          return [ 'en', 'fr', 'ja' ];
        }
      },
      recipients: {
        type: Array
      },
      markdown: {
        type: String,
        notify: true,
        value: '',
        observer: '_markdownChanged'
      }
    }
  }
  static get observers() {
    return [
      '_update(effectiveLang,recipientsLength,recipientsIndex,text.model.data.recipients)'
    ]
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('lang-updated', this._langUpdated.bind(this));
    this.observeHtmlLang = false;
    this._updateParameters();
  }

  _langUpdated() {
    this.model = deepcopy(this.text.model);
  }

  _update(lang, recipientsLength, recipientsIndex, rawRecipients) {
    this.recipients = this._getRecipients(rawRecipients, recipientsLength, recipientsIndex);
    this.markdown = this._getMarkDown();
    this.langName = this._getLangName(this.effectiveLang,this.text.langNames);
    this.stringifiedUser = this._getStringifiedUser(this.text.model.data.sender);
    this.stringifiedRecipients = this._getStringifiedRecipients(this.recipients);
    this.serializedText = JSON.stringify(this.text, null, 2);
  }

  _markdownChanged(markdown) {
    this.fire('markdown-changed', { markdown: markdown });
  }

  _getStringifiedRecipients(recipients) {
    var result;
    if (!recipients || recipients.length === 0) {
      result = '[]\n\n\n\n\n';
    }
    else {
      result = '[ \n' + 
        recipients.map(function (item) {
          return '  ' + this._getStringifiedUser(item);
        }.bind(this)).join(',\n') + '\n]';
      result += '\n\n\n\n'.substr(recipients.length);
    }
    return result;
  }

  _getStringifiedUser(user) {
    return user ? JSON.stringify(user, null, 0).replace(/{/g, '{ ').replace(/:/g, ': ').replace(/,/g, ', ').replace(/}/g, ' }') : '';
  }

  _getMarkDown() {
    var markdown =
      '<dom-module id="i18n-behavior-demo">\n' +
      '  <template>\n' +
      '    <h2>Simple String</h2>\n' +
      '    <span id="simple">UI Text String</span>\n' +
      '\n' +
      '    <h2>Simple Attribute</h2>\n' +
      '    <input id="simple-input" placeholder="Placeholder String">\n' +
      '\n' +
      '    <h2>Automatic Format</h2>\n' +
      '    <p id="example-sentence">This <i>example sentence</i> with \n' +
      '      <b>some parameters or embedded tags</b> is automatically converted to \n' +
      '      <a class="code" href="https://github.com/t2ym/i18n-format">&lt;i18n-format&gt;</a>\n' +
      '      to translate it as a whole with any parameter order.\n' +
      '    </p>\n' +
      '\n' +
      '    <h2>Compound Format with &lt;i18n-format&gt;</h2>\n' +
      '    <p>\n' +
      '      <i18n-format id="compound-format-text">\n' +
      '        <json-data>{\n' +
      '          "0": "You ({3}) gave no gifts.",\n' +
      '          "1": {\n' +
      '            "male": "You ({3}) gave him ({4}) {5}.",\n' +
      '            "female": "You ({3}) gave her ({4}) {5}.",\n' +
      '            "other": "You ({3}) gave them ({4}) {5}."\n' +
      '          },\n' +
      '          "one": {\n' +
      '            "male": "You ({3}) gave him ({4}) and one other person {5}.",\n' +
      '            "female": "You ({3}) gave her ({4}) and one other person {5}.",\n' +
      '            "other": "You ({3}) gave them ({4}) and one other person {5}."\n' +
      '          },\n' +
      '          "other": "You ({3}) gave them ({4}) and {1} other people gifts."\n' +
      '        }</json-data>\n' +
      '        <i18n-number offset="1">{{recipients.length}}</i18n-number>\n' +
      '        <span>{{recipients.0.gender}}</span>\n' +
      '        <span>{{model.data.sender.name}}</span>\n' +
      '        <span>{{recipients.0.name}}</span>\n' +
      '        <span>a gift</span>\n' +
      '      </i18n-format>\n' +
      '    </p>\n' +
      '    <h2>Parameters</h2>\n' +
      '    <pre>lang = {{effectiveLang}} ({{_getLangName(effectiveLang,text.langNames)}})</pre>\n' +
      '    <pre>sender = {{_getStringifiedUser(model.data.sender)}}</pre>\n' +
      '    <pre>recipients = {{_getStringifiedRecipients(recipients)}}</pre>\n' +
      '\n' +
      '    <template>\n' +
      '      <json-data id="data"\n' +
      '        sender=\'{ "name": "Joe", "gender": "male" }\'\n' +
      '        recipients=\'[\n' +
      '          { "name": "Alice", "gender": "female" },\n' +
      '          { "name": "Bob", "gender": "male" },\n' +
      '          { "name": "Yoda", "gender": "other" }\n' +
      '        ]\'\n' +
      '      ></json-data>\n' +
      '      <json-data id="langNames">{\n' +
      '        "en": "English",\n' +
      '        "ja": "Japanese",\n' +
      '        "fr": "French"\n' +
      '      }</json-data>\n' +
      '    </template>\n' +
      '  </template>\n' +
      '  <script>\n' +
      '  Polymer({\n' +
      '    is: \'i18n-behavior-demo\',\n' +
      '    behaviors: [ \n' +
      '      BehaviorsStore.I18nBehavior\n' +
      '    ],\n' +
      '    listeners: {\n' +
      '      \'lang-updated\': \'_langUpdated\'\n' +
      '    },\n' +
      '    _langUpdated: function () {\n' +
      '      this.model = deepcopy(this.text.model);\n' +
      '    }\n' +
      '  });\n' +
      '  <' + '/script>\n' +
      '</dom-module>\n';
    return '```html\n\n' + 
            markdown +
            '```\n' +
            '\n```\n' +
            'text = ' + this._jsonStringify(this.text) +
            '\n\n```';
  }

  _getRecipients(rawRecipients, recipientsLength, recipientsIndex) {
    var recipients = [];
    if (0 <= recipientsLength && recipientsLength <= 3) {
      for (var i = 0; i < recipientsLength; i++) {
        recipients[i] = rawRecipients[(i + recipientsIndex) % rawRecipients.length];
      }
    }

    return recipients;
  }

  _jsonStringify(obj) {
    return obj ? JSON.stringify(obj,null,2) : '';
  }

  _getLangName(lang, langNames) {
    return langNames[lang];
  }

  _updateParameters() {
    if (this.model &&
        this.model.data &&
        this.model.data.recipients) {
      this.recipientsIndex = this.recipientsLength === 0 ? 0 : (this.recipientsIndex + 1) % this.model.data.recipients.length;
      if (this.recipientsIndex === 0) {
        this.recipientsLength = (this.recipientsLength + 1) % (this.model.data.recipients.length + 1);
        if (this.recipientsLength === 0) {
          this.langIndex = (this.langIndex + 1) % this.langList.length;
          this.lang = this.langList[this.langIndex];
        }
      }
    }
    this.async(this._updateParameters, 1000);
  }
}
customElements.define(I18nBehaviorDemo.is, I18nBehaviorDemo);
