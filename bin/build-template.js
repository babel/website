var Handlebars = require("handlebars");
var highlight  = require("highlight.js");
var request    = require("request");
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

Handlebars.registerHelper("list_link", function(text, url) {
  text = Handlebars.Utils.escapeExpression(text);
  url  = Handlebars.Utils.escapeExpression(url);

  var result = "<li";

  if (url === this.filename) {
    result += ' class="active"';
  }

  result += '><a href="' + url + '">' + text + "</a></li>";

  return new Handlebars.SafeString(result);
});

var template = Handlebars.compile(
  fs.readFileSync(path.resolve(__dirname, "../src/template.hbs"), "utf8")
);

var pkgLoc = require.resolve("6to5/package.json");
var to5Loc = path.normalize(pkgLoc + "/..");

var pkg     = require(pkgLoc);
var version = pkg.version;

var get = function (url, callback) {
  console.log("get", url);
  request.get({
    url: url,
    json: true,
    headers: {
      "User-Agent": "6to5-website"
    }
  }, function (err, res, body) {
    if (err) throw err;
    if (body.message) throw new Error(body.message);
    callback(body);
  });
};

var getCodeContributors = function (callback) {
  get("https://api.github.com/repos/6to5/6to5/contributors", callback);
};

var getIssueContributors = function (callback) {
  var page = 0;
  var issues = [];

  var next = function () {
    getIssueContributorsPage(++page, function (_issues) {
      if (_issues.length) {
        issues = issues.concat(_issues);
        next();
      } else {
        var users = {};

        _.each(issues, function (issue) {
          var username = issue.user.login;
          var user = users[username] = users[username] || issue.user;
          user.count = user.count || 0;
          user.count++;
        });

        callback(_.sortBy(_.values(users), "count").reverse());
      }
    });
  };

  next();
};

var getIssueContributorsPage = function (page, callback) {
  get("https://api.github.com/repos/6to5/6to5/issues?state=all&per_page=100&page=" + page, callback);
};

var renderPages = function (pagesLoc, codeContributors, issueContributors) {
  _.each(fs.readdirSync(pagesLoc), function (filename) {
    var input    = path.join(pagesLoc, filename);
    var ext      = path.extname(filename);
    var name     = path.basename(filename, ext);
    var filename = name + ".html";
    var output   = __dirname + "/../" + filename;

    var raw     = fs.readFileSync(input, "utf8");
    var content = raw;

    var opts = {
      issueContributors: issueContributors,
      codeContributors:  codeContributors,
      filename:          filename,
      version:           version
    };

    if (ext === ".md") {
      content = marked(raw);
    } else if (ext === ".hbs") {
      content = Handlebars.compile(raw)(opts);
    }

    opts.content = content;

    var html = template(opts);

    fs.writeFileSync(output, html);
  });
};

getCodeContributors(function (codeContributors) {
  getIssueContributors(function (issueContributors) {
    _.each([to5Loc + "/doc", __dirname + "/../src/pages"], function (loc) {
      renderPages(loc, codeContributors, issueContributors);
    });
  });
});
