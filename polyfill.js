/**
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

// Polyfill IE 11
if (!Object.getOwnPropertyDescriptor(DocumentFragment.prototype, 'children')) {
  Object.defineProperty(DocumentFragment.prototype, 'children', {
    enumerable: true,
    configurable: true,
    get: function () {
      var childNodes = this.childNodes;
      var children = Array.prototype.filter.call(childNodes, function (node) { return node.nodeType === node.ELEMENT_NODE; });
      return children;
    }
  });
}
if (!Object.getOwnPropertyDescriptor(Element.prototype, 'children')) {
  Object.defineProperty(SVGElement.prototype, 'children', {
    enumerable: true,
    configurable: true,
    get: function () {
      var childNodes = this.childNodes;
      var children = Array.prototype.filter.call(childNodes, function (node) { return node.nodeType === node.ELEMENT_NODE; });
      return children;
    }
  });
}
if (Array.from((function *() { yield 1; })()).length === 0) { // Array.from cannot take an iterable object
  // Polyfill Array.from to take an iterable object
  const from = Array.from;
  Array.from = function (iterable) {
    if (typeof iterable[Symbol.iterator] === 'function') {
      let array = [];
      for (let value of iterable) {
        array.push(value);
      }
      return array;
    }
    else {
      return from(iterable);
    }
  }
  // minimal tests
  if (Array.from((function *() { yield* [1,2] })())[1] !== 2) {
    /* istanbul ignore next: Should not throw an error */
    throw new Error('Cannot polyfill Array.from()');
  }
}
if (new Set([1]).size === 0) { // Set constructor cannot take initializers
  // Replace constructor of Set class
  const _Set = window.Set;
  const Set = function Set(iterable = []) {
    let obj = new _Set();
    obj.constructor = Set;
    Object.setPrototypeOf(obj, _Set.prototype);
    for (let value of iterable) {
      obj.add(value);
    }
    return obj;
  };
  // Polyfill [Symbol.species]
  Object.defineProperty(Set, Symbol.species, {
    get: function () { return Set; },
    set: undefined,
    enumerable: false,
    configurable: true,
  });
  // Polyfill [Symbol.iterator]
  _Set.prototype[Symbol.iterator] = function * () {
    let values = [];
    this.forEach(value => values.push(value));
    yield* values;
  };
  // Polyfill values() and entries()
  _Set.prototype.values = _Set.prototype.entries = function * () {
    for (let value of this) {
      yield value;
    }
  };
  // Polyfill add() and has()
  const setMinus0 = new _Set();
  setMinus0.add(-0);
  /* istanbul ignore if */
  if (setMinus0.has(0)) {
    setMinus0.clear(); // Unreachable code: Evolved IE 11?
  }
  _Set.prototype._add = _Set.prototype.add;
  _Set.prototype._has = _Set.prototype.has;
  _Set.prototype.add = function (value) {
    if (value === 0 && setMinus0._has(value)) {
      value = 0; // -0 is normalized as 0
    }
    this._add(value);
    return this;
  };
  _Set.prototype.has = function (value) {
    if (value === 0 && setMinus0._has(value)) {
      value = 0; // -0 is normalized as 0
    }
    return this._has(value);
  };
  Set.prototype = _Set.prototype;
  window.Set = Set;
  // minimal tests
  let set = new Set([1, 2]);
  if (!(set.size === 2 &&
        set.has(1) && set.has(2) && !set.has(3) &&
        set.values().next().value === 1 &&
        set instanceof Set &&
        Set[Symbol.species] === Set &&
        set.add(3) === set &&
        set.has(3) &&
        new Set([0, -0]).size === 1 &&
        new Set([-0]).has(0) &&
        new Set([0]).has(-0))) {
    /* istanbul ignore next: Should not throw an error */
    throw new Error('Cannot polyfill Set class');
  }
}
if (new Map([[1, 'a']]).size === 0) { // Map constructor cannot take initializers
  // Replace constructor of Map class
  const _Map = window.Map;
  const Map = function Map(iterable = []) {
    let obj = new _Map();
    obj.constructor = Map;
    Object.setPrototypeOf(obj, _Map.prototype);
    for (let [key, value] of iterable) {
      obj.set(key, value);
    }
    return obj;
  }
  // Polyfill [Symbol.species]
  Object.defineProperty(Map, Symbol.species, {
    get: function () { return Map; },
    set: undefined,
    enumerable: false,
    configurable: true,
  });
  // Polyfill [Symbol.iterator]
  _Map.prototype[Symbol.iterator] = function * () {
    let keyValuePairs = [];
    this.forEach((value, key) => keyValuePairs.push([key, value]));
    yield* keyValuePairs;
  };
  // Polyfill keys()
  _Map.prototype.keys = function * () {
    for (let [key, value] of this) {
      yield key;
    }
  }
  // Polyfill values()
  _Map.prototype.values = function * () {
    for (let [key, value] of this) {
      yield value;
    }
  }
  // Polyfill entries()
  _Map.prototype.entries = function * () {
    for (let _entry of this) {
      yield _entry;
    }
  }
  // Polyfill set() and has()
  const mapMinus0 = new _Map();
  mapMinus0.set(-0, 1);
  /* istanbul ignore if */
  if (mapMinus0.has(0)) {
    mapMinus0.clear(); // Unreachable code: Evolved IE 11?
  }
  _Map.prototype._set = _Map.prototype.set;
  _Map.prototype._has = _Map.prototype.has;
  _Map.prototype.set = function (key, value) {
    if (key === 0 && mapMinus0._has(key)) {
      key = 0; // -0 is normalized as 0
    }
    this._set(key, value);
    return this;
  };
  _Map.prototype.has = function (key) {
    if (key === 0 && mapMinus0._has(key)) {
      key = 0; // -0 is normalized as 0
    }
    return this._has(key);
  };
  Map.prototype = _Map.prototype;
  window.Map = Map;
  // minimal tests
  let map = new Map([[1, 'a'], [2, 'b']]);
  if (!(map.size === 2 &&
        map.has(1) && map.has(2) && !map.has(3) &&
        map.keys().next().value === 1 &&
        map.values().next().value === 'a' &&
        map.entries().next().value[0] === 1 &&
        map instanceof Map &&
        Map[Symbol.species] === Map &&
        map.set(3, 'c') === map &&
        map.has(3) &&
        new Map([[0,'a'],[-0,'b']]).size === 1 &&
        new Map([[-0,'b']]).has(0) &&
        new Map([[0,'a']]).has(-0))) {
    /* istanbul ignore next: Should not throw an error */
    throw new Error('Cannot polyfill Map class');
  }
}

const isAttributeChangedPolyfillRequired = (function () {
  class DummyCustomElementToCheckAttributeChangedCallbackCapability extends HTMLElement {
    static get observedAttributes() { return ['lang']; }
    attributeChangedCallback(name, oldValue, newValue) { this.attributeChangedCallbackCalled = true; }
  }
  customElements.define('dummy-custom-element-to-check-attribute-changed-callback-capability', DummyCustomElementToCheckAttributeChangedCallbackCapability);
  const dummyElement = document.createElement('dummy-custom-element-to-check-attribute-changed-callback-capability');
  dummyElement.lang = 'en'; // set lang "property" not "attribute"
  return !dummyElement.attributeChangedCallbackCalled;
})();

/**
 * Polyfill mixin for attributeChangedCallback with custom elements v1 polyfill
 *
 * @mixinFunction
 * @param {HTMLElement} base Base class
 * @summary Polyfill mixin for attributeChangedCallback with custom elements v1 polyfill
 */
export const polyfill = (base) => !isAttributeChangedPolyfillRequired ? base :
class PolyfilledElement extends base {

  /**
   * constructor
   */
  constructor() {
    super();
    this._polyfillAttributeChangedCallback();
  }

  /**
   * Setup polyfill for attributeChangedCallback() of custom elements v1 for unsupported browsers
   */
  _polyfillAttributeChangedCallback() {
    this._selfObserver = this._selfObserver || 
      new MutationObserver(this._handleSelfAttributeChange.bind(this));
    this._selfObserver.observe(this, { attributes: true, attributeOldValue: true, attributeFilter: this.constructor.observedAttributes });
  }

  /**
   * Polyfills setAttribute by marking itself executing a setAttribute call
   */
  setAttribute(name, value) {
    if (!this._observedAttributes) {
      let observedAttributes = this.constructor.observedAttributes;
      this.__proto__._observedAttributes = new Set();
      for (let attr of observedAttributes) {
        this._observedAttributes.add(attr);
      }
    }
    if (this._observedAttributes.has(name)) {
      this._lastSetAttributeCall = this._lastSetAttributeCall || Object.create(null);
      this._inSetAttributeCall = true;
      if (Object.prototype.hasOwnProperty.call(this._lastSetAttributeCall, name)) {
        delete this._lastSetAttributeCall[name];
      }
      super.setAttribute(name, value);
      this._inSetAttributeCall = false;
      if (Object.prototype.hasOwnProperty.call(this._lastSetAttributeCall, name)) {
        delete this._lastSetAttributeCall[name];
      }
      else {
        this._lastSetAttributeCall[name] = value;
      }
    }
    else {
      super.setAttribute(name, value);
    }
  }

  /**
   * Polyfills calls to attributeChangedCallback()
   * @param {Array} mutations Array of mutations of observedAttributes
   */
  _handleSelfAttributeChange(mutations) {
    mutations.forEach(function(mutation) {
      switch (mutation.type) {
      case 'attributes':
        let name = mutation.attributeName;
        let oldValue = mutation.oldValue;
        let newValue = this.getAttribute(name);
        /*
        console.log(`${this.is}._handleSelfAttributeChange mutation { "${name}", ` +
          `"${oldValue}"(${typeof oldValue}), "${newValue}"(${typeof newValue}) } ` +
          `_inSetAttributeCall=${this._inSetAttributeCall} _lastSetAttributeCall=${JSON.stringify(this._lastSetAttributeCall, null, 0)}`);
         */
        this._lastSetAttributeCall = this._lastSetAttributeCall || Object.create(null);
        if (!this._inSetAttributeCall &&
             (!Object.prototype.hasOwnProperty.call(this._lastSetAttributeCall, name) ||
               this._lastSetAttributeCall[name] !== newValue)) {
          if (this.attributeChangedCallback) {
            this.attributeChangedCallback(name, oldValue, newValue);
          }
        }
        if (Object.prototype.hasOwnProperty.call(this._lastSetAttributeCall, name)) {
          delete this._lastSetAttributeCall[name];
        }
        else {
          this._lastSetAttributeCall[name] = newValue;
        }
        break;
      default:
        break;
      }
    }, this);
  }
}
