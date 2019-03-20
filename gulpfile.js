/*
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const gulp = require('gulp');
const gulpif = require('gulp-if');
const size = require('gulp-size');
const debug = require('gulp-debug');
const gutil = require('gulp-util');
const sort = require('gulp-sort');
const fs = require('fs');
const path = require('path');
const del = require('del');
const runSequence = require('run-sequence');
const through = require('through2');
const JSONstringify = require('json-stringify-safe');
const replace = require('gulp-replace');

gulp.task('patch-wct-browser-legacy', () => {
  return gulp.src([ 'test/browser.js' ], { base: 'test' })
    .pipe(gulp.dest('node_modules/wct-browser-legacy'));
});

gulp.task('patch-browser-capabilities', () => {
  return gulp.src([ 'test/browser-capabilities.js' ], { base: 'test' })
    .pipe(gulp.dest('node_modules/browser-capabilities/lib'));
});

gulp.task('patch-web-component-tester-for-selenium-grid-ie11', () => {
  return gulp.src([ 'node_modules/web-component-tester/runner/webserver.js '], { base: 'node_modules/web-component-tester/runner' })
    .pipe(replace("const DEFAULT_HEADERS = {","const DEFAULT_HEADERS =/**/{\n    'X-UA-Compatible': 'IE=11',"))
    .pipe(gulp.dest('node_modules/web-component-tester/runner/'));
});

gulp.task('patch-web-component-tester-for-http-caching', () => {
  return gulp.src([ 'node_modules/web-component-tester/runner/webserver.js '], { base: 'node_modules/web-component-tester/runner' })
    .pipe(replace("'Cache-Control': 'no-cache, no-store, must-revalidate',", "'Cache-Control': 'public, max-age=31536000',"))
    .pipe(replace("'Pragma': 'no-cache',", "//'Pragma':/**/ 'no-cache',"))
    .pipe(replace("'Expires': '0',", "//'Expires':/**/ '0',"))
    .pipe(gulp.dest('node_modules/web-component-tester/runner/'));
});

const rollup = require('rollup');
const sizes = require('rollup-plugin-sizes');
const filesize = require('rollup-plugin-filesize');
const { terser } = require('rollup-plugin-terser');
const gzip = require('gulp-gzip');

gulp.task('size-webpack', function (cb) {
  return gulp.src('dist/i18n.bundled-not-usable-as-it-is.js')
    .pipe(debug())
    .pipe(size())
    .pipe(gzip())
    .pipe(debug())
    .pipe(size())
    .pipe(gulp.dest('test/build/'));
});

gulp.task('size-polymer-build', function (cb) {
  return gulp.src('test/build/i18n.js')
    .pipe(debug())
    .pipe(size())
    .pipe(gzip())
    .pipe(debug())
    .pipe(size())
    .pipe(gulp.dest('test/build/'));
});

gulp.task('size-polymer-build-core', function (cb) {
  return gulp.src('test/core/i18n-core.js')
    .pipe(debug())
    .pipe(size())
    .pipe(gzip())
    .pipe(debug())
    .pipe(size())
    .pipe(gulp.dest('test/build/'));
});

gulp.task('size', function(cb) {
  runSequence(
    'size-webpack',
    'size-polymer-build',
    'size-polymer-build-core',
    cb);
});

gulp.task('i18n-core.js', function() {
  return gulp.src([ 'src/i18n.js' ])
    .pipe(through.obj(function (file, enc, callback) {
      const FOR_I18N_JS_BEGIN = '/* unnecessary part of i18n-core.js: BEGIN */';
      const FOR_I18N_JS_END = '/* unnecessary part of i18n-core.js: END */';
      const FOR_I18N_CORE_JS_BEGIN = '/* uncommented part of i18n-core.js: BEGIN';
      const FOR_I18N_CORE_JS_END = 'uncommented part of i18n-core.js: END */';
      let src = String(file.contents);
      let lines = src.split(/\n/);
      let i18n_js = [];
      let i18n_core_js = [];
      let for_i18n_js = false;
      let for_i18n_core_js = false;
      for (let line of lines) {
        switch (line) {
        case FOR_I18N_JS_BEGIN:
          for_i18n_js = true;
          break;
        case FOR_I18N_JS_END:
          for_i18n_js = false;
          break;
        case FOR_I18N_CORE_JS_BEGIN:
          for_i18n_core_js = true;
          break;
        case FOR_I18N_CORE_JS_END:
          for_i18n_core_js = false;
          break;
        default:
          if (for_i18n_js) {
            if (for_i18n_core_js) {
              throw new Error('Incorrect format found in src/i18n.js at ' + line);
            }
            else {
              i18n_js.push(line);
            }
          }
          else {
            if (for_i18n_core_js) {
              i18n_core_js.push(line);
            }
            else {
              i18n_js.push(line);
              i18n_core_js.push(line);
            }
          }
          break;
        }
      }
      let i18nCoreFile = new gutil.File({
        cwd: file.cwd,
        base: file.cwd,
        path: 'i18n-core.js',
        contents: new Buffer(i18n_core_js.join('\n'))
      });
      this.push(i18nCoreFile);
      file.base = file.cwd;
      file.path = 'i18n.js';
      file.contents = new Buffer(i18n_js.join('\n'));
      callback(null, file);
    }))
    .pipe(gulp.dest('.'));
});
