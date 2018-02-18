import '../../../i18n-behavior.js';
import { Polymer as Polymer$0 } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<template id="plural-gender-element" basepath="plural-gender-element/" localizable-text="embedded">
    <p>
      <i18n-format id="compound-format-text" on-rendered="_rendered" lang="{{effectiveLang}}">
        <json-data>{{serialize(text.compound-format-text.0)}}</json-data>
        <i18n-number offset="1" slot="1" lang="{{effectiveLang}}">{{recipients.length}}</i18n-number>
        <span slot="2">{{recipients.0.gender}}</span>
        <span slot="3">{{sender.name}}</span>
        <span slot="4">{{recipients.0.name}}</span>
        <span slot="5">{{text.compound-format-text.5}}</span>
      </i18n-format>
    </p>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
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
    "{{sender.name}}",
    "{{recipients.0.name}}",
    "a gift"
  ]
}
</json-data>
</template>
</template><dom-module id="plural-gender-element" legacy="">
  <template localizable-text="embedded">
    <p>
      <i18n-format id="compound-format-text" on-rendered="_rendered" lang="{{effectiveLang}}">
        <json-data>{{serialize(text.compound-format-text.0)}}</json-data>
        <i18n-number offset="1" slot="1" lang="{{effectiveLang}}">{{recipients.length}}</i18n-number>
        <span slot="2">{{recipients.0.gender}}</span>
        <span slot="3">{{sender.name}}</span>
        <span slot="4">{{recipients.0.name}}</span>
        <span slot="5">{{text.compound-format-text.5}}</span>
      </i18n-format>
    </p>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
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
    "{{sender.name}}",
    "{{recipients.0.name}}",
    "a gift"
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
    class PluralGenderElement extends Mixins.Localizable(Polymer.LegacyElement) {
      static get is() { return 'plural-gender-element' }
      static get config () {
        return {
          properties: {
            sender: {
              type: Object
            },
            recipients: {
              type: Array
            }
          },
          listeners: {
            'lang-updated': '_langUpdated'
          }          
        }
      }

      _langUpdated(e) {
        console.log('plural-gender-element lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this) {
          this.model = deepcopy(this.text.model);
        }
        if (this.renderedEffectiveLang === this.effectiveLang ||
            (this.renderedEffectiveLang === '' && this.effectiveLang === 'en')) {
          this.fire('local-dom-ready');
        }
      }

      _rendered() {
        console.log('plural-gender-element rendered lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.lang === this.effectiveLang) {
          this.fire('local-dom-ready');
        }
        else {
          this.renderedEffectiveLang = this.effectiveLang;
        }
      }
    }
    customElements.define(PluralGenderElement.is, PluralGenderElement);
  }
  break;
case 'base-element':
  {
    class PluralGenderElement extends BaseElements.I18nElement {
      static get is() { return 'plural-gender-element' }
      static get config () {
        return {
          properties: {
            sender: {
              type: Object
            },
            recipients: {
              type: Array
            }
          },
          listeners: {
            'lang-updated': '_langUpdated'
          }          
        }
      }

      _langUpdated(e) {
        console.log('plural-gender-element lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this) {
          this.model = deepcopy(this.text.model);
        }
        if (this.renderedEffectiveLang === this.effectiveLang ||
            (this.renderedEffectiveLang === '' && this.effectiveLang === 'en')) {
          this.fire('local-dom-ready');
        }
      }

      _rendered() {
        console.log('plural-gender-element rendered lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.lang === this.effectiveLang) {
          this.fire('local-dom-ready');
        }
        else {
          this.renderedEffectiveLang = this.effectiveLang;
        }
      }
    }
    customElements.define(PluralGenderElement.is, PluralGenderElement);
  }
  break;
case 'thin':
  {
    Define = class PluralGenderElement extends BaseElements.I18nElement {
      static get config () {
        return {
          properties: {
            sender: {
              type: Object
            },
            recipients: {
              type: Array
            }
          },
          listeners: {
            'lang-updated': '_langUpdated'
          }          
        }
      }

      _langUpdated(e) {
        console.log('plural-gender-element lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this) {
          this.model = deepcopy(this.text.model);
        }
        if (this.renderedEffectiveLang === this.effectiveLang ||
            (this.renderedEffectiveLang === '' && this.effectiveLang === 'en')) {
          this.fire('local-dom-ready');
        }
      }

      _rendered() {
        console.log('plural-gender-element rendered lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.lang === this.effectiveLang) {
          this.fire('local-dom-ready');
        }
        else {
          this.renderedEffectiveLang = this.effectiveLang;
        }
      }
    };
  }
  break;
case 'legacy':
  {
    Polymer$0({
      is: 'plural-gender-element',

      behaviors: [
        BehaviorsStore.I18nBehavior
      ],

      properties: {
        sender: {
          type: Object
        },
        recipients: {
          type: Array
        }
      },

      listeners: {
        'lang-updated': '_langUpdated'
      },

      _langUpdated: function (e) {
        console.log('plural-gender-element lang-updated lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (e.composedPath()[0] === this) {
          this.model = deepcopy(this.text.model);
        }
        if (this.renderedEffectiveLang === this.effectiveLang ||
            (this.renderedEffectiveLang === '' && this.effectiveLang === 'en')) {
          this.fire('local-dom-ready');
        }
      },

      _rendered: function () {
        console.log('plural-gender-element rendered lang = ' + this.lang + ' effectiveLang = ' + this.effectiveLang);
        if (this.lang === this.effectiveLang) {
          this.fire('local-dom-ready');
        }
        else {
          this.renderedEffectiveLang = this.effectiveLang;
        }
      }
    });
  }
  break;
}
