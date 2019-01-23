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


import {render, svg} from 'lit-html/lit-html.js';
import {repeat} from 'lit-html/directives/repeat.js';
import {html, i18n, bind} from '../../i18n.js';
import {getMessage, binding as messageBinding} from './message.js';

const i18nAttrRepoContainer = document.createElement('template');
i18nAttrRepoContainer.innerHTML = `<i18n-attr-repo>
  <template id="custom">
    <div i18n-target-attr="$"></div>
    <div i18n-target-attr2="$"></div>
  </template>
</i18n-attr-repo>`;
document.head.appendChild(i18nAttrRepoContainer.content);

/** 
 * Adapted from the Ractive.js clock example: http://www.ractivejs.org/examples/clock/
 */
export class LitClock extends i18n(HTMLElement) {

  static get importMeta() {
    return import.meta;
  }

  static get observedAttributes() {
    let attributes = new Set(super.observedAttributes);
    [/* list of additional observedAttributes */].forEach(attr => attributes.add(attr));
    return [...attributes];
  }

  get date() { return this._date; }
  set date(v) { this._date = v; this.invalidate(); }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.date = new Date();
    setInterval(() => {
      this.date = new Date();
    }, 1000);
    let _langUpdatedBindThis = this._langUpdated.bind(this);
    this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
    messageBinding.element.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on getMessage()'s 'lang-updated'
  }

  _langUpdated(event) {
    // TODO: It should be more efficient to skip successive 'lang-updated' events from different bindings in a short period and invalidate on the last one.
    this.invalidate();
  }

  render() {
    return html`${bind(this, 'lit-clock')}
      <style>
        :host {
          display: block;
        }
        .square {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 100%;
        }
        
        svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .clock-face {
          stroke: #333;
          fill: white;
        }
        
        .minor {
          stroke: #999;
          stroke-width: 0.5;
        }
        
        .major {
          stroke: #333;
          stroke-width: 1;
        }
        
        .hour {
          stroke: #333;
        }
        
        .minute {
          stroke: #666;
        }
        
        .second, .second-counterweight {
          stroke: rgb(180,0,0);
        }
        
        .second-counterweight {
          stroke-width: 3;
        }
      </style>
      <div id='target'
        @click=${(event) => {
          let div = event.composedPath().filter(el => el.id === 'target')[0];
          alert('div.outerHTML = ' + div.outerHTML +
            ' div.property = ' + div.property +
            ' div.getAttribute("attr") = ' + div.getAttribute('attr') +
            ' div.getAttribute("i18n-target-attr") = ' + div.getAttribute('i18n-target-attr'))
        }}
        .property=${'property value'}
        attr=${'attr value'}
        ?enabled-boolean-attr=${true}
        ?disabled-boolean-attr=${false}
        i18n-target-attr="I18N target attribute value"
        i18n-target-attr2="I18N target with ${'param1'} and ${'param2'}">Time: ${this.date.getHours()}:${this.date.getMinutes()}</div>
      <div>${getMessage()}</div>
      <div class='square'> <!-- so the SVG keeps its aspect ratio -->
        
        <svg viewBox='0 0 100 100'>
          
          <!-- first create a group and move it to 50,50 so
              all co-ords are relative to the center -->
          <g transform='translate(50,50)'>
            <circle class='clock-face' r='48'/>
            <g>${minuteTicks}</g><!-- g tag to avoid i18n-format conversion -->
            <g>${hourTicks}</g><!-- g tag to avoid i18n-format conversion -->

            <!-- hour hand -->
            <line class='hour' y1='2' y2='-20'
              transform='rotate(${ 30 * this.date.getHours() + this.date.getMinutes() / 2 })'/>
    
            <!-- minute hand -->
            <line class='minute' y1='4' y2='-30'
              transform='rotate(${ 6 * this.date.getMinutes() + this.date.getSeconds() / 10 })'/>
    
            <!-- second hand -->
            <g transform='rotate(${ 6 * this.date.getSeconds() })'>
              <line class='second' y1='10' y2='-38'/>
              <line class='second-counterweight' y1='10' y2='2'/>
            </g>
          </g>
        </svg>
      </div>
    `;
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
    //case 'target-attribute': break;
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
        transform='rotate(${360 * i / 60})'/>
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
        transform='rotate(${360 * i / 12})'/>
    `);
  }
  return lines;
})();

class WorldClock extends LitClock {

  static get importMeta() {
    return import.meta;
  }

  get date() { this.__date.setTime(this._date.getTime() + this._date.getTimezoneOffset() * 60 * 1000 + this.timezone * 60 * 1000); return this.__date; }
  set date(v) { this._date = v; this.invalidate(); }

  constructor() {
    super();
    this.__date = new Date();
    this.timezone = -this._date.getTimezoneOffset();
  }

  render() {
    return html`${bind(this, 'world-clock')}
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 350px;
          padding: 2px;
        }
      </style>
      <div>
        Timezone: GMT${(this.timezone < 0 ? '' : '+') + (this.timezone / 60)}
        <button @click=${() => this.timezone -= 60}>-1h</button>
        <button @click=${() => this.timezone += 60}>+1h</button>
      </div>
      ${super.render()}
    `;
  }

}
customElements.define('world-clock', WorldClock);

class WorldClockContainer extends i18n(HTMLElement) {

  static get importMeta() {
    return import.meta;
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.timezones = [ 0, -new Date().getTimezoneOffset() /*, +new Date().getTimezoneOffset() */];
    let _langUpdatedBindThis = this._langUpdated.bind(this);
    this.addEventListener('lang-updated', _langUpdatedBindThis); // invalidate on this 'lang-updated'
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
    return html`${bind(this)}
      <style>
        :host {
          display: block;
          width: 100%;
        }
        world-clock {
          display: flow;
          max-width: 300px;
        }
      </style>
      <div>World Clocks</div>
      ${repeat(this.timezones,
               (item) => item,
               (item, index) => 
                 /* no I18N for this template itself */html`<world-clock .timezone=${item}></world-clock>`)}
      <i18n-format id="compound-format-text" class="text">
        <json-data>{
          "0": "No timezones",
          "1": "Only 1 timezone for {2} is shown.",
          "one": "{1} timezone other than {2} is shown.",
          "other": "{1} timezones other than {2} are shown."
        }</json-data>
        <i18n-number offset="1">${this.timezones.length}</i18n-number>
        <span>${'GMT' + (this.timezones[0] < 0 ? '' : '+') + (this.timezones[0] / 60)}</span>
      </i18n-format>
    `;
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
