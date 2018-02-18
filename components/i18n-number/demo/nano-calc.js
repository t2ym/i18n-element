import '../../@polymer/paper-input/paper-input.js';
import '../../@polymer/iron-input/iron-input.js';
import '../../@polymer/iron-icons/iron-icons.js';
import '../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../@polymer/paper-item/paper-item.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../i18n-number.js';
import { Polymer as Polymer$0 } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import * as Polymer from '../../@polymer/polymer/polymer-element.js';
import { dom } from '../../@polymer/polymer/lib/legacy/polymer.dom.js';
/**
@license https://github.com/t2ym/i18n-number/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
if (!Number.isNaN) {
  // polyfill Number.isNaN for IE11
  Number.isNaN = function (value) {
    return typeof value === 'number' && isNaN(value);
  };
}

Polymer$0({
  _template: Polymer.html`
    <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
    <style>
      :host {

      }

      .display-section {
        background-color: rgba(180,202,108,1.0);
      }

      .digits-display {
        font-size: 34px;
        width: auto;
        height: 34px;
        padding: 0px 8px 8px 8px;
        margin: 0px;
        min-width: 100px;
      }

      .button {
        font-size: 24px;
        width: 64px;
        min-width: 40px;
        height: 61px;
        padding: 16px 4px;
        margin: 8px;
      }

      .button-icon {
        width: 29px;
        height: 29px;
      }

      .status-display {
        font-size: 16px;
        height: 16px;
        padding: 0px;
        margin: 0px;
      }

      .status {
        width: 16px;
        min-width: 16px;
        padding-right: 8px;
        text-align: center;
      }

      @media (max-width: 450px) {

        .digits-display {
          font-size: 28px;
          height: 28px;
          padding: 0px 8px 8px 8px;
          margin: 0px;
        }

        .button {
          font-size: 17px;
          height: 36px;
          width: 40px;
          padding: 8px 4px;
        }

        .button-icon {
          width: 20px;
          height: 20px;
        }

        .status-display {
          font-size: 12px;
          height: 12px;
        }

        .status {
          width: 13px;
          min-width: 13px;
          padding-right: 8px;
        }
      }

      .display-section {
        margin: 8px;
        padding: 4px;
      }

      .frame {
        @apply(--shadow-elevation-2dp);
      }

      .keypad {

      }


    </style>

    <table id="frame" class="frame"><tbody><tr><td>
      <div id="display" tabindex="-1" class="display-section layout vertical">
        <div class="layout horizontal status-display">
          <div class="status flex"></div>
          <div class="status">{{_memory(m)}}</div>
          <div class="status">{{_constant(op)}}</div>
          <div class="status">{{_operator(op)}}</div>
        </div>
        <span class="layout horizontal digits-display">
          <span class="flex"></span>
          <i18n-number id="value" formatted="{{value}}" options="{ &quot;maximumFractionDigits&quot;: 16 }">{{pickDisplayValue(x,y,op)}}</i18n-number>
        </span>
      </div>
      <div id="keypad" class="keypad">
        <template is="dom-repeat" items="[ 
                    [ [ &quot;+/-&quot;, &quot;±&quot; ], [ &quot;MR&quot;, &quot;MR&quot; ], [ &quot;M-&quot;, &quot;M-&quot; ], [ &quot;M+&quot;, &quot;M+&quot; ], [ &quot;/&quot;, &quot;÷&quot; ] ],
                    [ [ &quot;%&quot;, &quot;%&quot; ], [ &quot;7&quot;, &quot;7&quot; ], [ &quot;8&quot;, &quot;8&quot; ], [ &quot;9&quot;, &quot;9&quot; ], [ &quot;*&quot;, &quot;×&quot; ] ],
                    [ [ &quot;sqrt&quot;, &quot;√&quot; ], [ &quot;4&quot;, &quot;4&quot; ], [ &quot;5&quot;, &quot;5&quot; ], [ &quot;6&quot;, &quot;6&quot; ], [ &quot;-&quot;, &quot;-&quot; ] ],
                    [ [ &quot;C&quot;, &quot;C&quot; ], [ &quot;1&quot;, &quot;1&quot; ], [ &quot;2&quot;, &quot;2&quot; ], [ &quot;3&quot;, &quot;3&quot; ], [ &quot;+&quot;, &quot;+&quot; ] ],
                    [ [ &quot;AC&quot;, &quot;AC&quot; ], [ &quot;0&quot;, &quot;0&quot; ], [ &quot;.&quot;, &quot;.&quot; ], [ &quot;BS&quot;, &quot;&quot;, &quot;backspace&quot; ], [ &quot;=&quot;, &quot;=&quot; ] ]
                  ]" as="row">
          <div class="layout vertical">
            <div class="layout horizontal">
              <template is="dom-repeat" items="{{row}}">
                <paper-button id="{{item.0}}" class="button" raised="" on-tap="onButtonTap">
                  <template is="dom-if" if="{{item.1}}">{{item.1}}</template>
                  <template is="dom-if" if="{{item.2}}">
                    <iron-icon name="{{item.0}}" class="button-icon" icon="{{item.2}}"></iron-icon>
                  </template>
                </paper-button>
              </template>
            </div>
          </div>
        </template>
      </div>
    </td></tr></tbody></table>
`,

  is: 'nano-calc',

  properties: {
    input: {
      type: String,
      value: '',
      notify: true,
      observer: 'onInputChange'
    },
    value: {
      type: String,
      observer: 'onValueChange',
      notify: true
    },
    x: {
      type: Number,
      value: NaN,
      notify: true
    },
    y: {
      type: Number,
      value: NaN,
      notify: true
    },
    op: {
      type: String,
      value: '',
      notify: true
    },
    m: {
      type: Number,
      value: 0,
      notify: true
    }
  },

  listeners: {
    'keypress': 'onKeyPress',
    'keyup': 'onKeyUp'
  },

  observers: [
  ],

  pickDisplayValue: function (x, y, op) {
    switch (op) {
    case '':
    case '=':
    case '+=':
    case '-=':
    case '*=':
    case '/=':
    case '*%':
      return Number.isNaN(x) ? 0 : x;
    default:
      return Number.isNaN(y) ? x : y;
    }
  },

  onValueChange: function (newValue, oldValue) {
    console.log('newValue = ' + newValue + ' oldValue = ' + oldValue);
  },

  onInputChange: function (newValue, oldValue) {
    console.log('newValue = ' + newValue + ' oldValue = ' + oldValue);
    switch (newValue) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
    case 'AC':
    case 'C':
    case '+/-':
    case 'sqrt':
    case '%':
    case 'M+':
    case 'M-':
    case 'MR':
      this.calculate(newValue);
      break;
    case '':
      if (oldValue && 
          oldValue.length === 1 &&
          '1234567890.'.indexOf(oldValue) > 0) {

      }
      else {
        break;
      }
    default:
      switch (this.op) {
      case '*%':
        this.op = '';
        this.y = NaN;
      case '':
      case '=':
      case '+=':
      case '-=':
      case '*=':
      case '/=':
        this.x = newValue ? Number(newValue) : NaN;
        break;
      default:
        this.y = newValue ? Number(newValue) : NaN;
        break;
      }
      break;
    }
  },

  onButtonTap: function (e) {
    var key = dom(e).localTarget.id ||
              dom(e).localTarget.name;
    console.log('onButtonTap: key = ' + key);
    switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
      this.input += key;
      break;
    case 'BS':
      if (this.input) {
        this.input = this.input.slice(0, -1);
      }
      break;
    default:
      this.input = key;
      break;
    }
    this.$.display.focus();
  },

  onKeyPress: function (e) {
    var key = e.key || String.fromCharCode(e.charCode);
    console.log('onKeyPress: ' + key);
    switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
      this.input += key;
      break;
    case '+':
    case '-':
    case '*':
    case '/':
    case '%':
      this.input = key;
      break;
    case 'm':
      this.input = 'M+';
      break;
    case 'M':
      this.input = 'M-';
      break;
    case 'r':
      this.input = 'MR';
      break;
    case 'n':
      this.input = '+/-';
      break;
    case 's':
      this.input = 'sqrt';
      break;
    case 'c':
      this.input = 'C';
      break;
    case 'C':
      this.input = 'AC';
      break;
    case '=':
    case '\r':
      this.input = '=';
      break;
    default:
      //this.input = key;
      break;
    }
    return false;
  },

  onKeyUp: function (e) {
    var keyCode = e.keyCode;
    console.log('onKeyUp: ' + keyCode);
    switch (keyCode) {
    case 8:
      if (this.input) {
        this.input = this.input.slice(0, -1);
      }
      break;
    default:
      break;
    }
    return false;
  },

  calculate: function (op) {
    var t;
    switch (op) {
    case 'AC':
      this.x = NaN;
      this.y = NaN;
      this.m = 0;
      this.op = '';
      break;
    case 'C':
      switch (this.op) {
      case '':
      case '=':
      case '+=':
      case '-=':
      case '*=':
      case '/=':
        this.x = NaN;
        break;
      case '*%':
        this.x = NaN;
        this.y = NaN;
        this.op =  '';
        break;
      default:
        if (Number.isNaN(this.y)) {
          this.x = NaN;
          this.op = '';
        }
        else {
          this.y = 0;
        }
        break;
      }
      break;
    case '+/-':
      switch (this.op) {
      case '':
      case '=':
      case '+=':
      case '-=':
      case '*=':
      case '/=':
        this.x = -this.x;
        break;
      default:
        this.y = -this.y;
        break;
      }
      break;
    case 'sqrt':
      switch (this.op) {
      case '':
      case '=':
      case '+=':
      case '-=':
      case '*=':
      case '/=':
        this.x = Math.sqrt(this.x);
        break;
      case '*%':
        this.x = Math.sqrt(this.x);
        this.y = NaN;
        this.op = '';
        break;
      default:
        if (Number.isNaN(this.y)) {
          this.y = this.x;
        }
        this.y = Math.sqrt(this.y);
        break;
      }
      break;
    case '%':
      if (this.op &&
          Number.isNaN(this.y)) {
        this.y = this.x;
      }
      switch (this.op) {
      case '':
      case '=':
        this.op = '';
        break;
      case '+=':
        this.x = (this.x + this.y) / this.y * 100;
        break;
      case '-=':
        this.x = (this.x - this.y) / this.y * 100;
        break;
      case '/=':
        this.x = this.x / this.y * 100;
        break;
      case '*=':
        this.x = this.y * this.x / 100;
        break;
      case '+':
        this.x = (this.x + this.y) / this.y * 100;
        this.y = NaN;
        this.op = '';
        break;
      case '-':
        this.x = (this.x - this.y) / this.y * 100;
        this.y = NaN;
        this.op = '';
        break;
      case '*':
        t = this.x;
        this.x = this.x * this.y / 100;
        this.y = t;
        this.op = '*%';
        break;
      case '/':
        this.x = this.x / this.y * 100;
        this.y = NaN;
        this.op = '';
        break;
      case '*%':
        this.y = NaN;
        this.op = '';
        break;
      default:
        this.op = '';
        break;
      }
      break;
    case 'M+':
      switch (this.op) {
      case '':
      case '=':
      case '+=':
      case '-=':
      case '*=':
      case '/=':
      case '*%':
        if (!Number.isNaN(this.x)) {
          this.m += this.x;
        }
        break;
      default:
        if (!Number.isNaN(this.y)) {
          this.m += this.y;
        }
        break;
      }
      break;
    case 'M-':
      switch (this.op) {
      case '':
      case '=':
      case '+=':
      case '-=':
      case '*=':
      case '/=':
      case '*%':
        this.m -= this.x;
        break;
      default:
        this.m -= this.y;
        break;
      }
      break;
    case 'MR':
      switch (this.op) {
      case '':
      case '=':
      case '+=':
      case '-=':
      case '*=':
      case '/=':
      case '*%':
        this.x = this.m;
        break;
      default:
        this.y = this.m;
        break;
      }
      break;
    default:
      if (Number.isNaN(this.x)) {
        this.x = 0;
      }
      if (!Number.isNaN(this.y)) {
        switch (this.op) {
        case '+':
          this.x += this.y;
          break;
        case '+=':
          if (op === '=') {
            this.x += this.y;
          }
          break;
        case '-':
          this.x -= this.y;
          break;
        case '-=':
          if (op === '=') {
            this.x -= this.y;
          }
          break;
        case '*':
          this.x *= this.y;
          break;
        case '*=':
          if (op === '=') {
            this.x *= this.y;
          }
          break;
        case '*%':
          switch (op) {
          case '+':
            this.x = this.y + this.x;
            op = '';
            break;
          case '-':
            this.x = this.y - this.x;
            op = '';
            break;
          default:
            break;
          }
          this.y = NaN;
          break;
        case '/':
          this.x /= this.y;
          break;
        case '/=':
          if (op === '=') {
            this.x /= this.y;
          }
          break;
        case '':
        case '=':
          break;
        default:
          break;
        }
      }
      else {
        switch (op) {
        case '=':
          switch (this.op) {
          case '+':
          case '-':
            this.op = '';
            break;
          case '*':
            this.x = this.x * this.x;
            this.op = '';
            break;
          case '/':
            this.x = this.x / this.x;
            this.op = '';
            break;
          default:
            break;
          }
          break;
        default:
          break;
        }
      }
      switch (op) {
      case '=':
        switch (this.op) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '+=':
        case '-=':
        case '*=':
        case '/=':
          this.op = this.op[0] + op;
          break;
        default:
          this.op = '';
          this.y = NaN;
          break;
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        if (Number.isNaN(this.y) &&
            op === this.op) {
          this.y = this.x;
          this.op = this.op + '=';
        }
        else {
          this.op = op;
          this.y = NaN;
        }
        break;
      case '':
        this.op = op;
        this.y = NaN;
        break;
      }
      break;
    }
    this.input = '';
  },

  _memory: function (m) {
    return m ? 'M' : '';
  },

  _constant: function (op) {
    return op && op.indexOf('=') > 0 ? 'K' : '';
  },

  _operator: function (op) {
    var opStatus;
    switch (op) {
    case '+':
    case '+=':
      opStatus = '+';
      break;
    case '-':
    case '-=':
      opStatus = '-';
      break;
    case '*':
    case '*=':
      opStatus = '×';
      break;
    case '/':
    case '/=':
      opStatus = '÷';
      break;
    default:
      opStatus = '';
      break;
    }
    return opStatus;
  }
});
