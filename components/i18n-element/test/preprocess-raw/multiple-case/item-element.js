import { Polymer } from '../../../../@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="item-element">
  <template localizable-text="embedded">
    <span id="label">{{text.label}}</span>
  <template id="localizable-text">
<json-data>
{
  "meta": {},
  "model": {},
  "label": "A"
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
Polymer({
  is: 'item-element',
  behaviors: [ BehaviorsStore.I18nBehavior ]
});
