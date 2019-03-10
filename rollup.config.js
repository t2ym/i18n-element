import resolve from 'rollup-plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import filesize from 'rollup-plugin-filesize';
import minify from 'rollup-plugin-babel-minify';

export default {
  input: 'i18n.js',
  output: {
    file: 'test/build/i18n.bundled-not-usable-as-it-is.js',
    format: 'esm',
  },
  plugins: [
    resolve({
      modulesOnly: true,
    }),
    minify({
      // Options from polymer-build/src/js-transform.ts
      // Disable the minify-constant-folding plugin because it has a bug relating
      // to invalid substitution of constant values into export specifiers:
      // https://github.com/babel/minify/issues/820
      evaluate: false,

      // TODO(aomarks) Find out why we disabled this plugin.
      simplifyComparisons: false,

      // Prevent removal of things that babel thinks are unreachable, but sometimes
      // gets wrong: https://github.com/Polymer/tools/issues/724
      deadcode: false,

      // Disable the simplify plugin because it can eat some statements preceeding
      // loops. https://github.com/babel/minify/issues/824
      simplify: false,

      // This is breaking ES6 output. https://github.com/Polymer/tools/issues/261
      mangle: false,

      plugins: [
        '@babel/plugin-syntax-object-rest-spread',
        '@babel/plugin-syntax-async-generators',
        //'@babel/plugin-syntax-dynamic-import', // enabled by default
        '@babel/plugin-syntax-import-meta',
      ],

      comments: false, // indicates if comments should be preserved in source;
      banner: undefined, // the comment which should be prepended to the transformed bundle;
      bannerNewLine: false, // indicates if the banner comment should be followed by a new line;
      sourceMap: false, // indicates if sourcemap should be generated;
    }),
    sizes({
      details: true,
    }),
    filesize({
      showBrotliSize: true,
    }),
  ]
}
