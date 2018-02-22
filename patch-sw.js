/*
@license https://github.com/t2ym/i18n-element/blob/master/LICENSE.md
Copyright (c) 2018, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/* replace import.meta.url with a literal string of response.url */
addEventListener('fetch', function (event) {
  if (event.request.method === 'GET') {
    event.respondWith(async function() {
      let response = await fetch(event.request);
      if (response.status === 200 && response.type !== 'opaque') {
        let url = new URL(response.url);
        if (url.pathname.match(/[.js]$/)) {
          let code = await response.text();
          if (code.indexOf('import.meta.url') >= 0) {
            code = code.replace(/import[.]meta[.]url/g, '\'' + response.url + '\'');
          }
          response = new Response(code, { headers: {'Content-Type': 'text/javascript'} });
        }
      }
      return response;
    }());
  }
});
