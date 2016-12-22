'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  var TextFixture = function (_HTMLElement) {
    _inherits(TextFixture, _HTMLElement);

    function TextFixture() {
      _classCallCheck(this, TextFixture);

      var _this = _possibleConstructorReturn(this, (TextFixture.__proto__ || Object.getPrototypeOf(TextFixture)).call(this));

      _this._fixtureTemplates = null;
      _this._elementsFixtured = false;
      return _this;
    }

    _createClass(TextFixture, [{
      key: 'create',
      value: function create(model) {
        var generatedDoms = [];

        this.restore();

        this.removeElements(this.fixtureTemplates);

        this.forElements(this.fixtureTemplates, function (fixtureTemplate) {
          generatedDoms.push(this.createFrom(fixtureTemplate, model));
        }, this);

        this.forcePolyfillAttachedStateSynchrony();

        if (generatedDoms.length < 2) {
          return generatedDoms[0];
        }

        return generatedDoms;
      }
    }, {
      key: 'createFrom',
      value: function createFrom(fixtureTemplate, model) {
        var fixturedFragment;
        var fixturedElements;
        var fixturedElement;

        if (!(fixtureTemplate && fixtureTemplate.tagName === 'TEMPLATE')) {
          return;
        }

        try {
          fixturedFragment = this.stamp(fixtureTemplate, model);
        } catch (error) {
          console.error('Error stamping', fixtureTemplate, error);
          throw error;
        }

        fixturedElements = this.collectElementChildren(fixturedFragment);

        this.appendChild(fixturedFragment);
        this._elementsFixtured = true;

        if (fixturedElements.length < 2) {
          return fixturedElements[0];
        }

        return fixturedElements;
      }
    }, {
      key: 'restore',
      value: function restore() {
        if (!this._elementsFixtured) {
          return;
        }

        this.removeElements(this.children);

        this.forElements(this.fixtureTemplates, function (fixtureTemplate) {
          this.appendChild(fixtureTemplate);
        }, this);

        this.generatedDomStack = [];

        this._elementsFixtured = false;

        this.forcePolyfillAttachedStateSynchrony();
      }
    }, {
      key: 'forcePolyfillAttachedStateSynchrony',
      value: function forcePolyfillAttachedStateSynchrony() {
        // Force synchrony in attachedCallback and detachedCallback where
        // implemented, in the event that we are dealing with the async Web
        // Components Polyfill.
        if (window.CustomElements && window.CustomElements.takeRecords) {
          window.CustomElements.takeRecords();
        }
      }
    }, {
      key: 'collectElementChildren',
      value: function collectElementChildren(parent) {
        // Note: Safari 7.1 does not support `firstElementChild` or
        // `nextElementSibling`, so we do things the old-fashioned way:
        var elements = [];
        var child = parent.firstChild;

        while (child) {
          if (child.nodeType === Node.ELEMENT_NODE) {
            elements.push(child);
          }

          child = child.nextSibling;
        }

        return elements;
      }
    }, {
      key: 'removeElements',
      value: function removeElements(elements) {
        this.forElements(elements, function (element) {
          this.removeChild(element);
        }, this);
      }
    }, {
      key: 'forElements',
      value: function forElements(elements, iterator, context) {
        Array.prototype.slice.call(elements).forEach(iterator, context);
      }
    }, {
      key: 'stamp',
      value: function stamp(fixtureTemplate, model) {
        var stamped;
        // Check if we are dealing with a "stampable" `<template>`. This is a
        // vaguely defined special case of a `<template>` that is a custom
        // element with a public `stamp` method that implements some manner of
        // data binding.
        if (fixtureTemplate.stamp) {
          stamped = fixtureTemplate.stamp(model);
          // We leak Polymer specifics a little; if there is an element `root`, we
          // want that to be returned.
          stamped = stamped.root || stamped;

          // Otherwise, we fall back to standard HTML templates, which do not have
          // any sort of binding support.
        } else {
            if (model) {
              console.warn(this, 'was given a model to stamp, but the template is not of a bindable type');
            }

            stamped = document.importNode(fixtureTemplate.content, true);

            // Immediately upgrade the subtree if we are dealing with async
            // Web Components polyfill.
            // https://github.com/Polymer/polymer/blob/0.8-preview/src/features/mini/template.html#L52
            if (window.CustomElements && CustomElements.upgradeSubtree) {
              CustomElements.upgradeSubtree(stamped);
            }
          }

        return stamped;
      }
    }, {
      key: 'elementsFixtured',
      get: function get() {
        return this._elementsFixtured;
      }
    }, {
      key: 'fixtureTemplates',
      get: function get() {
        if (!this._fixtureTemplates) {
          // Copy fixtures to a true Array for Safari 7. This prevents their
          // `content` property from being improperly garbage collected.
          this._fixtureTemplates = Array.prototype.slice.apply(this.querySelectorAll('template'));
        }

        return this._fixtureTemplates;
      }
    }]);

    return TextFixture;
  }(HTMLElement);

  try {
    if (window.customElements) {
      customElements.define('test-fixture', TextFixture);
    } else {
      TestFixture = document.registerElement('test-fixture', TextFixture);
    }
  } catch (e) {
    if (window.WCT) {
      console.warn('if you are using WCT, you do not need to manually import test-fixture.html');
    } else {
      console.warn('test-fixture has already been registered!');
    }
  }
})();

