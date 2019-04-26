/*
  @license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
  Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* 
  Example nginx configuration for HTTPS server:

  location / {
    proxy_pass http://localhost:8080/;
  }
*/
const package = require('../package.json');
const path = require('path');
const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const fs = require('fs');

const defaultServerPort = 8080;

const ArgumentParser = require('argparse').ArgumentParser;
var argParser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Serve component demo',
});
argParser.addArgument([ '-p', '--port' ], { help: 'HTTP server port to listen. Default: ' + defaultServerPort });
const args = argParser.parseArgs();

const serverPort = args.port || defaultServerPort;
const demoServerScriptPhysicalPath = __dirname;
const componentsURLPath = '/components';
const componentsPhysicalPath = '../node_modules';
const demoPathRelative = 'demo';
const forbiddenPaths = [ 'gulpfile.js', 'package.json', 'package-lock.json', 'bower.json', 'wct.conf.js' ]
  .concat([ 'demoServer.js', 'gulpfile.js' ]
    .map(p => path.join(demoPathRelative, p)));

const rootPhysicalPath = path.join(demoServerScriptPhysicalPath, '..');
const nodeModulesPhysicalPath = path.join(demoServerScriptPhysicalPath, componentsPhysicalPath);
const expressStaticOptions = {
  setHeaders: function (res, path, stat) {
    res.set('origin-trial',
      // A dedicated Origin Trial token must be obtained for your use from https://developers.chrome.com/origintrials/#/trials/active for the feature "Trial for KV storage built-in module + import maps"
      // This token expires on Jun 7, 2019
      // This token is ONLY for the origin "https://www.local162.org", not for "http://localhost:8080"
      // If you configure a proxy server "https://www.local162.org" to "http://localhost:8080", you can use this token with the origin "https://www.local162.org"
      'AgF8GOYv8QG+eI9JZj8Jx9zCzJm2uo/wYHO/MBwiwW7ZcLZyzKhjM4hh5GqY0bdwIE5pOlkjMS2ZlimmtrrrngoAAABgeyJvcmlnaW4iOiJodHRwczovL3d3dy5sb2NhbDE2Mi5vcmc6NDQzIiwiZmVhdHVyZSI6IkJ1aWx0SW5Nb2R1bGVLdlN0b3JhZ2UiLCJleHBpcnkiOjE1NTk4OTkxOTh9')
  }
};
console.warn('A dedicated Origin Trial token must be obtained for your use from https://developers.chrome.com/origintrials/#/trials/active for the feature "Trial for KV storage built-in module + import maps"');
console.warn('The feature is experimented with Chrome Canary 76');
console.warn('The currently configured token is ONLY for the origin "https://www.local162.org", not for "http://localhost:8080"');
console.warn('This token expires on Jun 7, 2019');
console.warn('If you configure a proxy server "https://www.local162.org" to "http://localhost:8080", you can use this token with the origin "https://www.local162.org"');

app
  .all(forbiddenPaths.map(p => path.join(componentsURLPath, package.name, p)), (req, res, next) => { res.redirect(307, 'about:blank'); })
  .use(path.join(componentsURLPath, package.name), express.static(path.resolve(rootPhysicalPath), expressStaticOptions))
  .use(componentsURLPath, express.static(path.resolve(path.join(demoServerScriptPhysicalPath, componentsPhysicalPath)), expressStaticOptions))
  .use('/node_modules', express.static(path.resolve(nodeModulesPhysicalPath), expressStaticOptions))
  .all('*', (req, res) => {
    res.redirect(307, 'about:blank');
  })
  .listen(serverPort);
