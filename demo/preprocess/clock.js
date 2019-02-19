/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import {
  render,
  svg
} from 'lit-html/lit-html.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
  html,
  i18n,
  bind
} from '../../i18n.js';
import {
  getMessage,
  binding as messageBinding
} from './message.js';
const i18nAttrRepoContainer = document.createElement('template');
i18nAttrRepoContainer.innerHTML = `<i18n-attr-repo>
  <template id="custom">
    <div i18n-target-attr="$"></div>
    <div i18n-target-attr2="$"></div>
  </template>
</i18n-attr-repo>`;
document.head.appendChild(i18nAttrRepoContainer.content);
export class LitClock extends i18n(HTMLElement) {
  static get importMeta() {
    return import.meta;
  }
  static get observedAttributes() {
    let attributes = new Set(super.observedAttributes);
    [].forEach(attr => attributesSet.add(attr));
    return [...attributes];
  }
  get date() {
    return this._date;
  }
  set date(v) {
    this._date = v;
    this.invalidate();
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.date = new Date();
    setInterval(() => {
      this.date = new Date();
    }, 1000);
    let _langUpdatedBindThis = this._langUpdated.bind(this);
    this.addEventListener('lang-updated', _langUpdatedBindThis);
    messageBinding.element.addEventListener('lang-updated', _langUpdatedBindThis);
  }
  _langUpdated(event) {
    this.invalidate();
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n      <style>\n        :host {\n          display: block;\n        }\n        .square {\n          position: relative;\n          width: 100%;\n          height: 0;\n          padding-bottom: 100%;\n        }\n        \n        svg {\n          position: absolute;\n          width: 100%;\n          height: 100%;\n        }\n        \n        .clock-face {\n          stroke: #333;\n          fill: white;\n        }\n        \n        .minor {\n          stroke: #999;\n          stroke-width: 0.5;\n        }\n        \n        .major {\n          stroke: #333;\n          stroke-width: 1;\n        }\n        \n        .hour {\n          stroke: #333;\n        }\n        \n        .minute {\n          stroke: #666;\n        }\n        \n        .second, .second-counterweight {\n          stroke: rgb(180,0,0);\n        }\n        \n        .second-counterweight {\n          stroke-width: 3;\n        }\n      </style>\n      <div id="target" @click="',
      '" .property="',
      '" attr="',
      '" ?enabled-boolean-attr="',
      '" ?disabled-boolean-attr="',
      '" i18n-target-attr="',
      '" i18n-target-attr2="',
      '"><i18n-format lang="',
      '"><span>',
      '</span><span slot="1">',
      '</span><span slot="2">',
      '</span></i18n-format></div>\n      <div>',
      '</div>\n      <div class="square"> <!-- so the SVG keeps its aspect ratio -->\n        \n        <svg viewBox="0 0 100 100">\n          \n          <!-- first create a group and move it to 50,50 so\n              all co-ords are relative to the center -->\n          <g transform="translate(50,50)">\n            <circle class="clock-face" r="48"></circle>\n            <g>',
      '</g><!-- g tag to avoid i18n-format conversion -->\n            <g>',
      '</g><!-- g tag to avoid i18n-format conversion -->\n\n            <!-- hour hand -->\n            <line class="hour" y1="2" y2="-20" transform="rotate(',
      ')"></line>\n    \n            <!-- minute hand -->\n            <line class="minute" y1="4" y2="-30" transform="rotate(',
      ')"></line>\n    \n            <!-- second hand -->\n            <g transform="rotate(',
      ')">\n              <line class="second" y1="10" y2="-38"></line>\n              <line class="second-counterweight" y1="10" y2="2"></line>\n            </g>\n          </g>\n        </svg>\n      </div>\n    '
    ], ...bind(this, 'lit-clock', (_bind, text, model, effectiveLang) => [
      _bind,
      event => {
        let div = event.composedPath().filter(el => el.id === 'target')[0];
        alert('div.outerHTML = ' + div.outerHTML + ' div.property = ' + div.property + ' div.getAttribute("attr") = ' + div.getAttribute('attr') + ' div.getAttribute("i18n-target-attr") = ' + div.getAttribute('i18n-target-attr'));
      },
      'property value',
      'attr value',
      true,
      false,
      model['target']['i18n-target-attr'],
      _bind.element.i18nFormat(model['target']['i18n-target-attr2']['0'], 'param1', 'param2'),
      effectiveLang,
      text['target']['0'],
      this.date.getHours(),
      this.date.getMinutes(),
      getMessage(),
      minuteTicks,
      hourTicks,
      30 * this.date.getHours() + this.date.getMinutes() / 2,
      6 * this.date.getMinutes() + this.date.getSeconds() / 10,
      6 * this.date.getSeconds()
    ], {
      'meta': {},
      'model': {
        'target': {
          'i18n-target-attr': 'I18N target attribute value',
          'i18n-target-attr2': [
            'I18N target with {1} and {2}',
            '{{parts.5}}',
            '{{parts.6}}'
          ]
        }
      },
      'target': [
        'Time: {1}:{2}',
        '{{parts.7}}',
        '{{parts.8}}'
      ]
    }));
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
    default:
      break;
    }
  }
}
customElements.define('lit-clock', LitClock);
const minuteTicks = (() => {
  const lines = [];
  for (let i = 0; i < 60; i++) {
    lines.push(svg`
      <line 
        class='minor'
        y1='42'
        y2='45'
        transform='rotate(${ 360 * i / 60 })'/>
    `);
  }
  return lines;
})();
const hourTicks = (() => {
  const lines = [];
  for (let i = 0; i < 12; i++) {
    lines.push(svg`
      <line 
        class='major'
        y1='32'
        y2='45'
        transform='rotate(${ 360 * i / 12 })'/>
    `);
  }
  return lines;
})();
class WorldClock extends LitClock {
  static get importMeta() {
    return import.meta;
  }
  get date() {
    this.__date.setTime(this._date.getTime() + this._date.getTimezoneOffset() * 60 * 1000 + this.timezone * 60 * 1000);
    return this.__date;
  }
  set date(v) {
    this._date = v;
    this.invalidate();
  }
  constructor() {
    super();
    this.__date = new Date();
    this.timezone = -this._date.getTimezoneOffset();
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n      <style>\n        :host {\n          display: block;\n          width: 100%;\n          max-width: 350px;\n          padding: 2px;\n        }\n      </style>\n      <div><i18n-format lang="',
      '"><span>',
      '</span><span slot="1">',
      '</span><button @click="',
      '" slot="2">',
      '</button><button @click="',
      '" slot="3">',
      '</button></i18n-format></div>\n      ',
      '\n    '
    ], ...bind(this, 'world-clock', (_bind, text, model, effectiveLang) => [
      _bind,
      effectiveLang,
      text['div_1']['0'],
      (this.timezone < 0 ? '' : '+') + this.timezone / 60,
      () => this.timezone -= 60,
      text['div_1']['2'],
      () => this.timezone += 60,
      text['div_1']['3'],
      super.render()
    ], {
      'meta': {},
      'model': {},
      'div_1': [
        ' Timezone: GMT{1}\n        {2}\n        {3} ',
        '{{parts.0}}',
        '-1h',
        '+1h'
      ]
    }));
  }
}
customElements.define('world-clock', WorldClock);
class WorldClockContainer extends i18n(HTMLElement) {
  static get importMeta() {
    return import.meta;
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.timezones = [
      0,
      -new Date().getTimezoneOffset()
    ];
    let _langUpdatedBindThis = this._langUpdated.bind(this);
    this.addEventListener('lang-updated', _langUpdatedBindThis);
  }
  _langUpdated(event) {
    if (this.lang) {
      this.invalidate();
    }
  }
  connectedCallback() {
    this.connected = true;
    this.invalidate();
  }
  render() {
    return html([
      '<!-- localizable -->',
      '\n      <style>\n        :host {\n          display: block;\n          width: 100%;\n        }\n        world-clock {\n          display: flow;\n          max-width: 300px;\n        }\n      </style>\n      <div>',
      '</div>\n      ',
      '\n      <i18n-format id="compound-format-text" class="text" lang="',
      '">\n        <json-data>',
      '</json-data>\n        <i18n-number offset="1" slot="1" lang="',
      '">',
      '</i18n-number>\n        <span slot="2">',
      '</span>\n      </i18n-format>\n    '
    ], ...bind(this, (_bind, text, model, effectiveLang) => [
      _bind,
      text['div_1'],
      repeat(this.timezones, item => item, (item, index) => html`<world-clock .timezone=${ item }></world-clock>`),
      effectiveLang,
      JSON.stringify(text['compound-format-text']['0']),
      effectiveLang,
      this.timezones.length,
      'GMT' + (this.timezones[0] < 0 ? '' : '+') + this.timezones[0] / 60
    ], {
      'meta': {},
      'model': {},
      'div_1': 'World Clocks',
      'compound-format-text': [
        {
          '0': 'No timezones',
          '1': 'Only 1 timezone for {2} is shown.',
          'one': '{1} timezone other than {2} is shown.',
          'other': '{1} timezones other than {2} are shown.'
        },
        '{{parts.1 - 1}}',
        '{{parts.2}}'
      ]
    }));
  }
  invalidate() {
    if (!this.needsRender && this.connected) {
      this.needsRender = true;
      Promise.resolve().then(() => {
        this.needsRender = false;
        render(this.render(), this.shadowRoot);
      });
    }
  }
}
customElements.define('world-clock-container', WorldClockContainer);
