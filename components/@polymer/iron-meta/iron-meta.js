import '../polymer/polymer.js';
import { Polymer as Polymer$0 } from '../polymer/lib/legacy/polymer-fn.js';

export const IronMeta = function(options) {
  IronMeta[' '](options);

  this.type = (options && options.type) || 'default';
  this.key = options && options.key;
  if (options && 'value' in options) {
    this.value = options.value;
  }
};

// This function is used to convince Closure not to remove constructor calls
// for instances that are not held anywhere. For example, when
// `new Polymer.IronMeta({...})` is used only for the side effect of adding
// a value.
IronMeta[' '] = function(){};

IronMeta.types = {};

IronMeta.prototype = {
  get value() {
    var type = this.type;
    var key = this.key;

    if (type && key) {
      return IronMeta.types[type] && IronMeta.types[type][key];
    }
  },

  set value(value) {
    var type = this.type;
    var key = this.key;

    if (type && key) {
      type = IronMeta.types[type] = IronMeta.types[type] || {};
      if (value == null) {
        delete type[key];
      } else {
        type[key] = value;
      }
    }
  },

  get list() {
    var type = this.type;

    if (type) {
      var items = IronMeta.types[this.type];
      if (!items) {
        return [];
      }

      return Object.keys(items).map(function(key) {
        return metaDatas[this.type][key];
      }, this);
    }
  },

  byKey: function(key) {
    this.key = key;
    return this.value;
  }
};

var metaDatas = IronMeta.types;

Polymer$0({

  is: 'iron-meta',

  properties: {

    /**
     * The type of meta-data.  All meta-data of the same type is stored
     * together.
     * @type {string}
     */
    type: {
      type: String,
      value: 'default',
    },

    /**
     * The key used to store `value` under the `type` namespace.
     * @type {?string}
     */
    key: {
      type: String,
    },

    /**
     * The meta-data to store or retrieve.
     * @type {*}
     */
    value: {
      type: String,
      notify: true,
    },

    /**
     * If true, `value` is set to the iron-meta instance itself.
     */
     self: {
      type: Boolean,
      observer: '_selfChanged'
    },

    __meta: {
      type: Boolean,
      computed: '__computeMeta(type, key, value)'
    }
  },

  hostAttributes: {
    hidden: true
  },

  __computeMeta: function(type, key, value) {
    var meta = new IronMeta({
      type: type,
      key: key
    });

    if (value !== undefined && value !== meta.value) {
      meta.value = value;
    } else if (this.value !== meta.value) {
      this.value = meta.value;
    }

    return meta;
  },

  get list() {
    return this.__meta && this.__meta.list;
  },

  _selfChanged: function(self) {
    if (self) {
      this.value = this;
    }
  },

  /**
   * Retrieves meta data value by key.
   *
   * @method byKey
   * @param {string} key The key of the meta-data to be returned.
   * @return {*}
   */
  byKey: function(key) {
    return new IronMeta({
      type: this.type,
      key: key
    }).value;
  }
});
