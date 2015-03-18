---
layout: docs
title: Using Babel
description: Guides on how to setup babel in whatever environment you might be working in.
permalink: /docs/using-babel/
redirect_from:
 - /plugins.html
 - /docs/setup/
 - /docs/using-6to5/
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Find your guide</h4>
  <p>
    It doesn't matter if you're using Node.js or Rails, Gulp or Grunt, there's likely a guide on
    this page to help guide you. Go ahead and <span class="label label-info">&#8984; + F</span>
    whatever you're looking for. If it doesn't happen to be on this page you might want to stop by
    our <a href="https://gitter.im/babel/babel">support chat</a>.
  </p>
</blockquote>

## Node.js

### CLI

**Install**

```sh
$ npm install --global babel
```

**Usage**

```sh
$ babel script.js
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For full documentation on the babel CLI see the
    <a href="/docs/usage/cli/">usage docs</a>.
  </p>
</blockquote>

### Require Hook

**Install**

```sh
$ npm install babel
```

**Usage**

All subsequent files required by node with the extensions `.es6`, `.es` and `.js` will
be transformed by babel. The polyfill specified in [polyfill](/docs/usage/polyfill) is
also automatically required.

```javascript
require("babel/register");
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>Not suitable for libraries</h4>
  <p>
    The require hook automatically hooks itself into <strong>all</strong> node requires. This will pollute the global scope and introduce conflicts. Because of this it's not suitable for libraries, if however you're writing an application then it's completely fine to use.
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <p>
    For full documentation on the babel require hook see the
    <a href="/docs/usage/require/">usage docs</a>.
  </p>
</blockquote>

## Meteor

**Install**

Inside your Meteor app directory run:

```sh
$ meteor add grigio:babel
```

**Usage**

Any files with the extensions `.es6.js`, `.es6`, `.es` and `.jsx` will be precompiled with Babel.

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>meteor-babel</strong>'s <a href="https://github.com/grigio/meteor-babel">repo</a> for more info.
    If you find any bugs please <a href="https://github.com/grigio/meteor-babel/issues">report them</a>.
  </p>
  
  <p>
    <em>Issues with the output should be reported on the babel <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

## Rails

### Sprockets

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>sprockets-es6</strong>'s
    <a href="https://github.com/josh/sprockets-es6">repo</a> for more info. If
    you find any bugs please
    <a href="https://github.com/josh/sprockets-es6/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ gem install sprockets-es6
```

**Usage**

```rb
# Gemfile
gem "sprockets"
gem "sprockets-es6"
```

```rb
require "sprockets/es6"
```

## Build Systems

### Broccoli

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>broccoli-babel-transpiler</strong>'s
    <a href="https://github.com/babel/broccoli-babel-transpiler">repo</a> for more
    info. If you find any bugs please
    <a href="https://github.com/babel/broccoli-babel-transpiler/issues">report
    them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev broccoli-babel-transpiler
```

**Usage**

```js
var babelTranspiler = require("broccoli-babel-transpiler");
var scriptTree = babelTranspiler(inputTree, options);
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>Source maps</h4>
  <p>
    Currently this plugin only support inline source maps. If you need separate
    source map feature, we welcome you to submit a pull request.
  </p>
</blockquote>

### Browserify

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>babelify</strong>'s
    <a href="https://github.com/babel/babelify">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/babel/babelify/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev babelify
```

**Usage via CLI**

```sh
$ browserify script.js -t babelify --outfile bundle.js
```

**Usage via Node.js**

```js
browserify({ debug: true })
  .transform(babelify);
```

Or a more complete example:

```js
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

browserify({ debug: true })
  .transform(babelify)
  .require("./script.js", { entry: true })
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message); })
  .pipe(fs.createWriteStream("bundle.js"));
```
**Passing Options**

```sh
$ browserify -d -e script.js -t [ babelify --blacklist regenerator ]
```

```js
browserify().transform(babelify.configure({
  blacklist: ["regenerator"]
}))
```

<blockquote class="babel-callout babel-callout-info">
  <h4>More info</h4>
  <p>
    For more information see the
    <a href="https://github.com/babel/babelify">babelify README</a>
  </p>
</blockquote>

### AMD (requirejs)

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>requirejs-babel</strong>'s
    <a href="https://github.com/mikach/requirejs-babel">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/mikach/requirejs-babel/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install requirejs-babel
```

**Usage**

Add the paths to configuration:

```js
  paths: {
    es6: 'node_modules/requirejse-babel/es6',
    babel: 'node_modules/requirejse-babel/babel-4.6.6.min'
  }
```


Reference files via the es6! plugin name:

```js
  define(['es6!your-es6-module'], function(module) {
    // ...
  });
```


Also it can be optimized by r.js tool.

### Brunch

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>babel-brunch</strong>'s
    <a href="https://github.com/babel/babel-brunch">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/babel/babel-brunch/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev babel-brunch
```

**Configuring**

Set babel options in your brunch config (such as `brunch-config.coffee`) except
for `filename` and `sourceMap` which are handled internally.

```coffee
plugins:
  ESbabel:
    whitelist: ["arrowFunctions"]
    format:
      semicolons: false
```

### Duo

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>duo-babel</strong>'s
    <a href="https://github.com/babel/duo-babel">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/babel/duo-babel/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev duo-babel
```

**Usage via CLI**

```sh
$ duo --use duo-babel
```

**Usage via Node.js**

```js
Duo(root)
  .entry(entry)
  .use(babel)
  .run(fn);
```

### Gobble

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>gobble-babel</strong>'s
    <a href="https://github.com/babel/gobble-babel">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/babel/gobble-babel/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev gobble-babel
```

**Usage**

The `options` argument, if specified, is passed to babel.

```js
var gobble = require("gobble");
module.exports = gobble("src").transform("babel", options);
```

**Source maps**

Sourcemaps are created by default (all the relevant information is filled in by
Gobble, you don't need to specify `sourceMapName` options etc). If you don't
want that, pass `sourceMap: false`.

### Grunt

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>grunt-babel</strong>'s
    <a href="https://github.com/babel/grunt-babel">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/babel/grunt-babel/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev grunt-babel
```

**Usage**

```js
require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
  "babel": {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        "dist/app.js": "src/app.js"
      }
    }
  }
});

grunt.registerTask("default", ["babel"]);
```

### Gulp

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>gulp-babel</strong>'s
    <a href="https://github.com/babel/gulp-babel">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/babel/gulp-babel/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev gulp-babel
```

**Usage**

```js
var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("src/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});
```

**Source maps**

Use [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) like this:

```js
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
```

### Make

**Install**

```sh
$ npm install --global babel
```

**Usage**

```make
SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.js)

lib: $(LIB)
lib/%.js: src/%.js
  mkdir -p $(@D)
  babel $< -o $@
```

```sh
$ make
```

### Webpack

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>babel-loader</strong>'s
    <a href="https://github.com/babel/babel-loader">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/babel/babel-loader/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev babel-loader
```

**Usage via loader**

```js
import Animal from "babel!./Animal.js";

class Person extends Animal {
  constructor(arg="default") {
    this.eat = "Happy Meal";
  }
}

export default Person;
```
```js
var Person = require("babel!./Person.js").default;
new Person();
```

**Usage via config**

```js
module: {
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
  ]
}
```

and then import normally:

```js
import Person from "./Person.js";
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>Troubleshooting</h4>
  <p>
    For additional information on how to troubleshoot <strong>babel-loader</strong> please
    see the
    <a href="https://github.com/babel/babel-loader#troubleshooting">README</a>.
  </p>
</blockquote>

## Misc

### Connect

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>babel-connect</strong>'s
    <a href="https://github.com/babel/babel-connect">repo</a> for more info. If
    you find any bugs please
    <a href="https://github.com/babel/babel-connect/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install babel-connect
```

**Usage**

```js
var babelMiddleware = require("babel-connect");

app.use(babelMiddleware({
  options: {
    // options to use when transforming files
  },
  src: "assets",
  dest: "cache"
}));

app.use(connect.static("cache"));
```

### Jade

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>jade-babel</strong>'s
    <a href="https://github.com/babel/jade-babel">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/babel/jade-babel/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install jade-babel
```

**Usage**

```js
var jade = require("jade");
var babel = require("jade-babel");

jade.filters.babel = babel({});
```

OR

```js
var jade = require("jade");
var babel = require("jade-babel");

jade = babel({}, jade);
```

Now you can use ES6 in your jade templates as following.

```jade
script
  :babel
    console.log("Hello World !!!");
    class Person {
      constructor(name) {
        this.name = name;
      }
      sayName(){
        console.log(`Hello, my name is ${this.name}`);
      }
    }
    var person = new Person("Apoxx");
    person.sayName();
```

### Jest

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>babel-jest</strong>'s
    <a href="https://github.com/babel/babel-jest">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/babel/babel-jest/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev babel-jest
```

**Usage**

In your `package.json` file please make the following changes:

```json
{
  "dependencies": {
    "babel-jest": "*",
    "jest-cli": "*"
  },
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "scriptPreprocessor": "<rootDir>/node_modules/babel-jest",
    "testFileExtensions": ["es6", "js"],
    "moduleFileExtensions": ["js", "json", "es6"]
  }
}
```

### Karma

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <strong>karma-babel-preprocessor</strong>'s
    <a href="https://github.com/babel/karma-babel-preprocessor">repo</a> for more
    info. If you find any bugs please
    <a href="https://github.com/babel/karma-babel-preprocessor/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the babel
    <a href="https://github.com/babel/babel/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev karma-babel-preprocessor
```

**Usage**

See babel options for more details.

Given `options` properties are passed to babel with no change except:

- `filename`
- `sourceMapName`
- `sourceFileName`

Because they should differ from file to file, corresponding configuration
functions are available.

For example, inline sourcemap configuration would look like the following.

```js
module.exports = function(config) {
  config.set({
    files: [
      "src/**/*.js",
      "test/**/*.js"
    ],
    preprocessors: {
      "src/**/*.js": ["babel"],
      "test/**/*.js": ["babel"]
    },
    "babelPreprocessor": {
      options: {
        sourceMap: "inline"
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, ".es5.js");
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    }
  });
};
```

### Mocha

**Install**

```sh
$ npm install --save-dev babel
```

**Usage**

```js
{
  "scripts": {
    "test": "mocha --compilers js:babel/register"
  },
  "devDependencies": {
    "babel": "*",
    "mocha": "*"
  }
}
```

### Nodemon

**Install**

```sh
$ npm install --global babel
```

**Usage**

In your `package.json` add a script:

```js
{
  "scripts": {
    "babel-node": "babel-node --experimental --ignore='foo|bar|baz'"
  }
}
```

```sh
$ nodemon --exec npm run babel-node -- path/to/script.js
```

Calling nodemon with babel-node may lead to arguments getting parsed incorrectly if you forget to use a double dash. Using npm-scripts helpers prevent this. If you chose to skip using npm-scripts, it can be expressed as:

```sh
$ nodemon --exec babel-node --experimental --ignore='foo\|bar\|baz' -- path/to/script.js
```
