import { ElementMixin } from '../@polymer/polymer/lib/mixins/element-mixin.js';
var _bindingRegex_patch = {
  // Issue with https://github.com/Polymer/polymer/issues/3349 
  _bindingRegex_1_2_4: (function() {
    var IDENT  = '(?:' + '[a-zA-Z_$][\\w.:$-*]*' + ')';
    var NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
    var SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
    var DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
    var STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
    var ARGUMENT = '(?:' + IDENT + '|' + NUMBER + '|' +  STRING + '\\s*' + ')';
    var ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
    var ARGUMENT_LIST = '(?:' + '\\(\\s*' +
                                  '(?:' + ARGUMENTS + '?' + ')' +
                                '\\)\\s*' + ')';
    var BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
    var OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
    var CLOSE_BRACKET = '(?:]]|}})';
    var NEGATE = '(?:(!)\\s*)?'; // Group 2
    var EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
    return new RegExp(EXPRESSION, "g");
  })(),

  // Fix from https://github.com/TimvdLippe/polymer/blob/fix-binding-with-dash/src/lib/annotations/annotations.html
  _bindingRegex_1_2_4_patched: (function() {
    var IDENT  = '(?:' + '[a-zA-Z_\\$][\\w\\.:\\$\\-\\*]*' + ')';
    var NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
    var SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
    var DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
    var STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
    var ARGUMENT = '(?:' + IDENT + '|' + NUMBER + '|' +  STRING + '\\s*' + ')';
    var ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
    var ARGUMENT_LIST = '(?:' + '\\(\\s*' +
                                  '(?:' + ARGUMENTS + '?' + ')' +
                                '\\)\\s*' + ')';
    var BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
    var OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
    var CLOSE_BRACKET = '(?:]]|}})';
    var NEGATE = '(?:(!)\\s*)?'; // Group 2
    var EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
    return new RegExp(EXPRESSION, "g");
  })()
};

if (!ElementMixin && Polymer.Annotations._bindingRegex.toString() === 
    _bindingRegex_patch._bindingRegex_1_2_4.toString()) {
  console.log('Fixing Polymer issue#3349 by patching Polymer.Annotations._bindingRegex for Polymer 1.2.4');
  Polymer.Annotations._bindingRegex = _bindingRegex_patch._bindingRegex_1_2_4_patched;
}
