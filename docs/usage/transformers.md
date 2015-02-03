---
layout: docs
title: Transformers
description: What are the various transformers?
permalink: /docs/usage/transformers/
---

See [FAQ - What is a transformer?](/docs/faq#what-is-a-transformer-)
for transformer terminology.

## ES6

 - [es6.arrowFunctions](/docs/learn-es6#arrows)
 - [es6.blockScoping](/docs/learn-es6#let-const)
 - [es6.classes](/docs/learn-es6#classes)
 - [es6.constants](/docs/learn-es6#let-const)
 - [es6.destructuring](/docs/learn-es6#destructuring)
 - [es6.forOf](/docs/learn-es6#iterators-for-of)
 - [es6.modules](/docs/learn-es6#modules)
 - [es6.parameters.default](/docs/learn-es6#default-rest-spread)
 - [es6.parameters.rest](/docs/learn-es6#default-rest-spread)
 - [es6.properties.computed](/docs/learn-es6#enhanced-object-literals)
 - [es6.properties.shorthand](/docs/learn-es6#enhanced-object-literals)
 - [es6.spread](/docs/learn-es6#default-rest-spread)
 - [es6.templateLiterals](/docs/learn-es6#template-strings)
 - [es6.unicodeRegex](/docs/learn-es6#unicode)

## ES7 (Experimental)

- [es7.abstractReferences](https://github.com/zenparsing/es-abstract-refs)
- [es7.arrayComprehension](/docs/learn-es6#comprehensions)
- [es7.generatorComprehension](/docs/learn-es6#comprehensions)
- [es7.exponentiationOperator](https://github.com/rwaldron/exponentiation-operator)
- [es7.objectSpread](https://github.com/sebmarkbage/ecmascript-rest-spread)

<blockquote class="to5-callout to5-callout-warning">
  <h4>Disabled by default</h4>
  <p>
    These are only usable if you enable experimental support. See <a href="/docs/usage/experimental">experimental usage</a> for information.
  </p>
</blockquote>

## Optional

6to5 provides various optional transformers for those of you who want
to take your code that extra mile.

```javascript
require("6to5").transform("code", { optional: ["transformerName"] });
```

```sh
$ 6to5 --optional transformerName
```

<blockquote class="to5-callout to5-callout-info">
  <h4>External package required</h4>
  <p>
    The package <code>6to5-runtime</code> is required for this transformer. Run <code>npm install 6to5-runtime --save</code> to add it to your current node/webpack/browserify project.
  </p>
</blockquote>

### `selfContained`

The `selfContained` optional transformer does three things:

 - Automatically requires `6to5-runtime/regenerator` when you use generators/async functions.
 - Automatically requires `6to5-runtime/core-js` and maps ES6 static methods and built-ins.
 - Removes the inline 6to5 helpers and uses the module `6to5-runtime/helpers` instead.

#### Regenerator aliasing

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

Instead what the `selfContained` transformer does it transpile that to:

```javascript
"use strict";

var _regeneratorRuntime = require("6to5-runtime/regenerator");

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

#### `core-js` aliasing

Sometimes you may want to use new built-ins such as `Map`, `Set`, `Promise` etc. Your only way
to use these is usually to include a globally polluting polyfill.

What the `selfContained` transformer does is transform the following:

```javascript
var sym = Symbol();

var promise = new Promise;

console.log(arr[Symbol.iterator]());
```

into the following:

```javascript
"use strict";

var _core = require("6to5-runtime/core-js");

var sym = _core.Symbol();

var promise = new _core.Promise();

console.log(_core.$for.getIterator(arr));
```

This means is that you can seamlessly use these native built-ins and static methods
without worrying about where they come from.

**NOTE:** Instance methods such as `"foobar".includes("foo")` will **not** work.

#### Helper aliasing

Usually 6to5 will place helpers at the top of your file to do common tasks to avoid
duplicating the code around in the current file. Sometimes these helpers can get a
little bulky and add unneccessary duplication across files. The `selfContained`
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

the `selfContained` transformer however turns this into:

```javascript
"use strict";

var _to5Helpers = require("6to5-runtime/helpers");

var foo = _to5Helpers.interopRequire(require("bar"));
```

### `asyncToGenerator`

Transforms async functions to a generator that uses a helper.
This is useful if you don't want to use `regenerator` or `bluebird`.

```javascript
async function foo() {
  await bar();
}
```

to

```javascript
var _asyncToGenerator = function (fn) {
  ...
};

var foo = _asyncToGenerator(function* () {
  yield bar();
});
```

### `bluebirdCoroutines`

Transforms async functions to their equivalent bluebird method.

```javascript
async function foo() {
  await bar();
}
```

to

```javascript
var Bluebird = require("bluebird");

var foo = Bluebird.coroutine(function* () {
  yield bar();
});
```

### `spec.protoToAssign`

The `protoToAssign` optional transformer will transform all `__proto__`
assignments to a method that will do a shallow copy of all properties.

This means that the following **will** work:

```javascript
var foo = { a: 1 };
var bar = { b: 2 };
bar.__proto__ = foo;
bar.a; // 1
bar.b; // 2
```

however the following **will not**:

```javascript
var foo = { a: 1 };
var bar = { b: 2 };
bar.__proto__ = foo;
bar.a; // 1
foo.a = 2;
bar.a; // 1 - should be 2 but remember that nothing is bound and it's a straight copy
```

This is a case that you have to be aware of if you intend to use this
transformer.

### `spec.typeofSymbol`

ES6 introduces a new native type called [symbols](/docs/learn-es6#symbols).
This transformer wraps all `typeof` expressions with a method that
replicates native behaviour. (ie. returning "symbol" for symbols)

```javascript
typeof Symbol() === "symbol";
```

to

```javascript
var _typeof = function (obj) {
  return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
};

_typeof(Symbol()) === "symbol";
```

### `spec.undefinedToVoid`

Some JavaScript implementations allow `undefined` to be overwritten, this
may lead to peculiar bugs that are extremely hard to track down.

This transformer transforms `undefined` into `void 0` which returns `undefined`
regardless of if it's been reassigned.

```javascript
foo === undefined;
```

to

```javascript
foo === void 0;
```

### `validation.undeclaredVariableCheck`

Throws errors on references to undeclared variables.

## Playground

 - [playground.memoizationOperator](/docs/usage/playground#memoization-assignment-operator)
 - [playground.methodBinding](/docs/usage/playground#method-binding)
 - [playground.objectGetterMemoization](/docs/usage/playground#object-getter-memoization)

<blockquote class="to5-callout to5-callout-warning">
  <h4>Disabled by default</h4>
  <p>
    These are only usable if you enable playground support. See <a href="/docs/usage/playground">playground usage</a> for information.
  </p>
</blockquote>
