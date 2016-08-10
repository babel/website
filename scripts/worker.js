importScripts("https://npmcdn.com/babel-standalone@6/babel.min.js");
importScripts("https://npmcdn.com/babel-polyfill@6/dist/polyfill.min.js");

self.addEventListener("message", function (e) {
  var input = e.data.input;
  var options = e.data.options;

  try {
    var result = Babel.transform(input, options);
  } catch (e) {
    self.postMessage({
      error: e.toString()
    });
    return;
  }

  self.postMessage({
    code: result.code
  });
});

self.postMessage({
  ready: true,
  version: Babel.version
});
