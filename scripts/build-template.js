var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var marked = require('marked');
var highlight = require('highlight.js');
var _ = require('lodash');

var renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
  href = href.toLowerCase().replace('.md', '.html');
  return marked.Renderer.prototype.link.apply(this, arguments);
};

renderer.heading = function(text, level, raw) {
  raw = raw.toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/-$/, '');
  text = '<a class="anchor" href="#' + raw + '" aria-hidden="true"><span class="octicon octicon-link"></span></a>' + text;
  return marked.Renderer.prototype.heading.apply(this, arguments);
};

marked.setOptions({
  renderer: renderer,
  highlight: function(code, lang) {
    if (!lang) {
      return highlight.highlightAuto(code).value;
    }

    if (lang === 'html') lang = 'erb';

    if (highlight.listLanguages().indexOf(lang) > -1) {
      return highlight.highlight(lang, code).value;
    } else {
      return code;
    }
  }
});

var template = Handlebars.compile(
  fs.readFileSync(path.resolve(__dirname, '../src/template.hbs')).toString()
);

_.each({
  '6to5/README.md'   : '../index.html',
  '6to5/LICENSE'     : '../license.html',
  '6to5/FEATURES.md' : '../features.html',
  '6to5/MODULES.md'  : '../modules.html'
}, function(output, input) {
  var markdown = fs.readFileSync(require.resolve(input)).toString();
  var content = marked(markdown);
  var html = template({ content: content });
  fs.writeFileSync(path.resolve(__dirname, output), html);
});
