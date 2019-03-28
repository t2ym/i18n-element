/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import {html, render} from 'lit-html/lit-html.js';

/**
 * <shadow-repeat> element to repeat items in Shadow Root via slot elements
 *
 * Usage:
 *  <shadow-repeat .repeater=${() => repeat(this.items, (item, index) => html`<slot name=${index}>`)} .items=${this.items}><!-- items property is optional to trigger redrawing -->
 *    <!-- stock views in Light DOM and show selected views in shadow DOM via slot names as keys -->
 *    ${repeat(this.items, (item, index) => index, (item, index) => html`<item-element slot=${index} .data=${item} discard-on-disconnect></item-element>`)}
 *  </shadow-repeat>
 *
 * @customElement
 */
export class ShadowRepeat extends HTMLElement {
  static get is() {
    return 'shadow-repeat';
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
  connectedCallback() {
    this.connected = true;
    this.invalidate();
  }
  disconnectedCallback() {
    this.connected = false;
  }
  get repeater() {
    return this._repeater;
  }
  set repeater(value) {
    this._onRepeaterChange(this._repeater = value);
  }
  get items() {
    return null;
  }
  set items(value) {
    this.invalidate();
  }
  _onRepeaterChange(repeater) {
    this.invalidate();
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
  render() {
    return html`${this.repeater()}`;
  }
}
customElements.define('shadow-repeat', ShadowRepeat);
