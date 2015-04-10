---
layout: docs
title: Runtime
description: How to use the optional `runtime` transformer.
permalink: /docs/usage/runtime/
---

Babel uses very small helpers for common functions such as `_extend`. By default
this will be added to every file that requires it. This duplication is sometimes
unnecessary, especially when your application is spread out over multiple files.

This is where the `runtime` optional transformer comes in. All of the helpers
will reference the module `babel-runtime` to avoid duplication across your
compiled output.

Another purpose of this transformer is to create a sandboxed environment for your
code. Built-ins such as `Promise`, `Set` and `Map` are aliased to `core-js` so
you can use them seamlessly without having to require a globally polluting
[polyfill](/docs/usage/polyfill). This is fantastic for libraries as you can
write your code without the cognitive overhead of worrying about the environment
that it's going to be ran in.

See the [technical details](#technical-details) section for more information on
how this works and the types of transformations that occur.

<blockquote class="babel-callout babel-callout-info">
  <h4>External package required</h4>
  <p>
    The package <code>babel-runtime</code> is required for this transformer. Run <code>npm install babel-runtime --save</code> to add it to your current node/webpack/browserify project. <code>babel-runtime</code> does not support AMD module loaders like RequireJS.
  </p>
</blockquote>

## Usage

```javascript
require("babel").transform("code", { optional: ["runtime"] });
```

```sh
$ babel --optional runtime script.js
```

## Technical details

The `runtime` optional transformer does three things:

 - Automatically requires `babel-runtime/regenerator` when you use generators/async functions.
 - Automatically requires `babel-runtime/core-js` and maps ES6 static methods and built-ins.
 - Removes the inline babel helpers and uses the module `babel-runtime/helpers` instead.

What does this actually mean though? Basically, you can use built-ins such as `Promise`,
`Set`, `Symbol` etc as well use as all the Babel features that require a polyfill seamlessly,
without global pollution, making it extremely suitable for libraries.

### Regenerator aliasing

Whenever you use a generator function or async function:

```javascript
function* foo() {

}

async function bar() {

}
```

the following is generated:

```javascript
"use strict";

var foo = regeneratorRuntime.mark(function foo() {
  ...
});

function bar() {
  return regeneratorRuntime.async(function bar$(context$1$0) {
    ...
  }, null, this);
}
```

This isn't ideal as then you have to include the regenerator runtime which
pollutes the global scope.

Instead what the `runtime` transformer does it compile that to:

```javascript
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator");

var foo = _regeneratorRuntime.mark(function foo() {
  ...
});

function bar() {
  return _regeneratorRuntime.async(function bar$(context$1$0) {
    ...
  }, null, this);
}
```

This means that you can use the regenerator runtime without polluting your current environment.

### `core-js` aliasing

Sometimes you may want to use new built-ins such as `Map`, `Set`, `Promise` etc. Your only way
to use these is usually to include a globally polluting polyfill.

What the `runtime` transformer does is transform the following:

```javascript
var sym = Symbol();

var promise = new Promise;

console.log(arr[Symbol.iterator]());
```

into the following:

```javascript
"use strict";

var _core = require("babel-runtime/core-js");

var sym = _core.Symbol();

var promise = new _core.Promise();

console.log(_core.$for.getIterator(arr));
```

This means is that you can seamlessly use these native built-ins and static methods
without worrying about where they come from.

**NOTE:** Instance methods such as `"foobar".includes("foo")` will **not** work.

### Helper aliasing

Usually babel will place helpers at the top of your file to do common tasks to avoid
duplicating the code around in the current file. Sometimes these helpers can get a
little bulky and add unnecessary duplication across files. The `runtime`
transformer replaces all the helper calls to a module.

That means that the following code:

```javascript
import foo from "bar";
```

usually turns into:

```javascript
"use strict";

var _interopRequire = function (obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

var foo = _interopRequire(require("bar"));
```

the `runtime` transformer however turns this into:

```javascript
"use strict";

var _babelHelpers = require("babel-runtime/helpers");

var foo = _babelHelpers.interopRequire(require("bar"));
```
