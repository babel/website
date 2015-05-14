---
layout: docs
title: Modules
description: How to use module formatters.
permalink: /docs/usage/modules/
redirect_from: /modules.html
---

See [FAQ - What is a module formatter?](/docs/faq#what-is-a-module-formatter-)
for module formatter terminology.

<p class="lead">
  Babel has the ability to compile ES6 modules to the module system of your
  choice. You can even easily create your own.
</p>

## Usage

```sh
$ babel --modules common script.js
```

```js
babel.transform('import "foo";', { modules: "common" });
```

## Formats

### Common (Default)

[CommonJS (CJS) Modules/1.1](http://wiki.commonjs.org/wiki/Modules/1.1)

**Usage**

```sh
$ babel --modules common
```

**Example**

Exports:

```js
export {test};
export var test = 5;
```

```javascript
exports.test = test;
var test = exports.test = 5;
```

Bare import:

```javascript
import "foo";
```

```javascript
require("foo");
```

Default import:

```javascript
import foo from "foo";
```

```javascript
var foo = _interopRequire(require("foo"));
```

Wildcard import:

```javascript
import * as foo from "foo";
```

```javascript
var foo = _interopRequireWildcard(require("foo"));
```

Named import:

```javascript
import {bar, baz} from "foo";
let x = bar() + baz();
```

```javascript
var _bar$baz = require("foo");
var x = _bar$baz.bar() + _bar$baz.baz();
```

Named alias import:

```javascript
import {bar as baz} from "foo";
let x = baz();
```

```javascript
var _baz = require("foo");
var x = _baz.bar();
```

#### Interop

In order to encourage the use of CommonJS and ES6 modules, when exporting a default
export with **no** other exports `module.exports` will be set in addition to `exports["default"]`.

```javascript
export default test;
```

```javascript
exports["default"] = test;
module.exports = exports["default"];
```

If you don't want this behaviour then you can use the `commonStrict` module formatter.

### AMD

[Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api)

**Usage**

```sh
$ babel --modules amd
```

**Example**

```js
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

```js
define(["exports", "foo"], function (exports, _foo) {
  "use strict";

  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  }

  exports.bar = bar;
  var foo = _interopRequire(_foo);

  function bar() {
    return foo("foobar");
  }
});
```

You can optionally specify to include the module id (using the `--module-ids`
argument):

```js
define("filename", ["exports", "foo"], function (exports, _foo) {})
```

### System

**Usage**

```sh
$ babel --modules system
```

**Example**

```js
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

```js
System.register("bar", ["foo"], function (_export) {
  "use strict";

  var __moduleName = "bar";

  var foo;
  function bar() {
    return foo("foobar");
  }
  return {
    setters: [function (m) {
      foo = m.default;
    }],
    execute: function () {
      _export("bar", bar);
    }
  };
});
```

### UMD

[Universal Module Definition (UMD)](https://github.com/umdjs/umd)

**Usage**

```sh
$ babel --modules umd
```

**Example**

```js
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

```js
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  }
})(function (exports, _foo) {
  "use strict";

  function _interopRequire(obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  }

  exports.bar = bar;
  var foo = _interopRequire(_foo);

  function bar() {
    return foo("foobar");
  }
});
```

### Ignore

**Usage**

```sh
$ babel --modules ignore
```

**Example**

```js
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

```js
function bar() {
  return foo("foobar");
}
```

### Custom

You can alternatively specify module names instead of one of the built-in types.

**Usage**

```sh
$ babel --modules custom-module-formatter
```

**Example**

**`node_modules/custom-module-formatter/index.js`**

```js
module.exports = ModuleFormatter;

function ModuleFormatter() {}

ModuleFormatter.prototype.transform = function (ast) {
  // this is ran after all transformers have had their turn at modifying the ast
  // feel free to modify this however
};

ModuleFormatter.prototype.importDeclaration = function (node, nodes) {
  // node is an ImportDeclaration
};

ModuleFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  // specifier is an ImportSpecifier
  // node is an ImportDeclaration
};

ModuleFormatter.prototype.exportDeclaration = function (node, nodes) {
  // node is an ExportDeclaration
};

ModuleFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  // specifier is an ExportSpecifier
  // node is an ExportDeclaration
};
```
