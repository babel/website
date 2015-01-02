var resolve = function (loc) {
  try {
    return require.resolve(loc);
  } catch (err) {
    return null;
  }
};

var to5BrowserLoc = resolve("6to5/browser.js") || resolve("6to5/dist/6to5.js");
if (!to5BrowserLoc) throw new Error("please run `make build` in 6to5 root");

var to5PolyfillLoc = resolve("6to5/browser-polyfill.js") || resolve("6to5/dist/polyfill.js");

var locs = [
  resolve("jquery/dist/jquery.js"),
  resolve("bootstrap/dist/js/bootstrap.js"),
  to5BrowserLoc,
  to5PolyfillLoc
];

var fs = require("fs");
var _  = require("lodash");

_.each(locs, function (loc) {
  console.log(fs.readFileSync(loc, "utf8"));
});
