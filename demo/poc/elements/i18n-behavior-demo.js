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
    return html`
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

    <h2>Simple String</h2>
    <span id="simple" class="text">UI Text String</span>

    <h2>Simple Attribute</h2>
    <input id="simple-input" placeholder="Placeholder String">

    <h2>Automatic Format</h2>
    <p id="example-sentence" class="text">This <i>example sentence</i> with <b>some parameters or embedded tags</b> is automatically converted to <a class="code" href="https://github.com/t2ym/i18n-format">&lt;i18n-format&gt;</a> to translate it as a whole with any parameter order.</p>

    <h2>Compound Format with &lt;i18n-format&gt;</h2>
    <p>
      <i18n-format id="compound-format-text" class="text">
        <json-data>{
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
        }</json-data>
        <i18n-number offset="1">{{recipients.length}}</i18n-number>
        <span>{{recipients.0.gender}}</span>
        <span>{{model.data.sender.name}}</span>
        <span>{{recipients.0.name}}</span>
        <span>a gift</span>
      </i18n-format>
    </p>

    <h2>Parameters</h2>
    <pre class="code">lang = {{effectiveLang}} ({{langName}})</pre>
    <pre class="code">sender = {{stringifiedUser}}</pre>
    <pre class="code">recipients = {{stringifiedRecipients}}</pre>

    <template>
      <!-- manually define model data -->
      <json-data id="data" sender="{ &quot;name&quot;: &quot;Joe&quot;, &quot;gender&quot;: &quot;male&quot; }" recipients="[
          { &quot;name&quot;: &quot;Alice&quot;, &quot;gender&quot;: &quot;female&quot; },
          { &quot;name&quot;: &quot;Bob&quot;, &quot;gender&quot;: &quot;male&quot; },
          { &quot;name&quot;: &quot;Yoda&quot;, &quot;gender&quot;: &quot;other&quot; }
        ]"></json-data>
      <!-- define UI data -->
      <json-data id="langNames">{
        "en": "English",
        "ja": "Japanese",
        "fr": "French"
      }</json-data>
    </template>
`;
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
