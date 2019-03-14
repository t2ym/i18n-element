const path = require('path');
const merge = require('webpack-merge');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = () => merge(
  {
    entry: './clock.js',
    context: path.resolve('./demo/preprocess'),
    output: {
      filename: './clock.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: '@open-wc/webpack-import-meta-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-syntax-import-meta',
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    'chrome': '72',
                  }
                }
              ]
            ]
          }
        }
      ]
    },
    plugins: [
      new Clean(['dist']),
      new MinifyPlugin({
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
        mangle: false, /*{ // risky mangling options that work with the demo
          keepClassName: true,
        },*/
      }, {}),
      new Html({
        filename: './index.html',
        template: './webpack-index.html',
        minify: false
      }),
      new Copy([ { from: 'locales', to: 'locales' } ], {}),
    ],
  },
);
