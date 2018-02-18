import '../../polymer/polymer.js';
import { NeonAnimationBehavior } from '../neon-animation-behavior.js';
import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';

/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/*
`<slide-right-animation>` animates the transform of an element from `none` to `translateX(100%)`.
The `transformOrigin` defaults to `0 50%`.

Configuration:
```
{
  name: 'slide-right-animation',
  node: <node>,
  transformOrigin: <transform-origin>,
  timing: <animation-timing>
}
```
*/
Polymer({

  is: 'slide-right-animation',

  behaviors: [
    NeonAnimationBehavior
  ],

  configure: function(config) {
    var node = config.node;

    this._effect = new KeyframeEffect(node, [
      {'transform': 'none'},
      {'transform': 'translateX(100%)'}
    ], this.timingFromConfig(config));

    if (config.transformOrigin) {
      this.setPrefixedProperty(node, 'transformOrigin', config.transformOrigin);
    } else {
      this.setPrefixedProperty(node, 'transformOrigin', '0 50%');
    }

    return this._effect;
  }

});
