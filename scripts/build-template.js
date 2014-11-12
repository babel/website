var Handlebars = require("handlebars");
var highlight  = require("highlight.js");
var marked     = require("marked");
var path       = require("path");
var fs         = require("fs");
var _s         = require("underscore.string");
var _          = require("lodash");

var headings = {};

var renderer = new marked.Renderer;

renderer.link = function (href, title, text) {
  href = href.toLowerCase().replace(".md", ".html");
  return marked.Renderer.prototype.link.apply(this, arguments);
};

renderer.heading = function (text, level, raw) {
  raw = _s.dasherize(_s.stripTags(raw.toLowerCase()));
  var i = headings[raw] || 0;
  headings[raw] = i + 1;
  if (i > 0) raw += "-" + i;

  text = '<a class="anchor" href="#' + raw + '" aria-hidden="true"><span class="octicon octicon-link"></span></a>' + text;
  return marked.Renderer.prototype.heading.apply(this, arguments);
};

marked.setOptions({
  renderer: renderer,
  highlight: function (code, lang) {
    if (!lang) {
      return highlight.highlightAuto(code).value;
    }

    if (lang === "html") lang = "erb";

    if (highlight.listLanguages().indexOf(lang) >= 0) {
      return highlight.highlight(lang, code).value;
    } else {
      return code;
    }
  }
});

var template = Handlebars.compile(
  fs.readFileSync(path.resolve(__dirname, "../src/template.hbs"), "utf8")
);

var pkgLoc = require.resolve("6to5/package.json");
var to5Loc = path.normalize(pkgLoc + "/..");

var pkg     = require(pkgLoc);
var version = pkg.version;

var pagesLoc = to5Loc + "/doc";

_.each(fs.readdirSync(pagesLoc), function (filename) {
  var input  = path.join(pagesLoc, filename);
  var name   = path.basename(filename, ".md");
  var output = __dirname + "/../" + name + ".html";

  var markdown = fs.readFileSync(input, "utf8");
  var content  = marked(markdown);
  var html     = template({ content: content, version: version });

  fs.writeFileSync(output, html);
});
