import resolve from 'rollup-plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import filesize from 'rollup-plugin-filesize';
import babel from 'rollup-plugin-babel';
import minifyPreset from 'babel-preset-minify';

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
    babel({
      sourceMaps: false,
      comments: false,
      plugins: [
        '@babel/plugin-syntax-object-rest-spread',
        '@babel/plugin-syntax-async-generators',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        // rollup rewrites import.meta.url, but makes them point to the file location after bundling
        // we want the location before bundling
        'bundled-import-meta',
      ],
      presets: [
        minifyPreset({}, {
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
        }),
      ],
    }),
    sizes({
      details: true,
    }),
    filesize({
      showBrotliSize: true,
    }),
  ]
}
