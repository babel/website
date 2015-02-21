---
layout: docs
title: Transformers
description: What are the various transformers?
permalink: /docs/usage/transformers/
---

See [FAQ - What is a transformer?](/docs/faq#what-is-a-transformer-)
for transformer terminology.

## ES3

 - [es3.memberExpressionLiterals](#)
 - [es3.propertyLiterals](#)

## ES5

 - [es5.properties.mutators](#)

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
 - [es6.tailCall](/docs/learn-es6#tail-calls)
 - [es6.templateLiterals](/docs/learn-es6#template-strings)
 - [es6.unicodeRegex](/docs/learn-es6#unicode)

## ES7 (Experimental)

- [es7.abstractReferences](https://github.com/zenparsing/es-abstract-refs)
- [es7.arrayComprehension](/docs/learn-es6#comprehensions)
- [es7.generatorComprehension](/docs/learn-es6#comprehensions)
- [es7.exponentiationOperator](https://github.com/rwaldron/exponentiation-operator)
- [es7.objectSpread](https://github.com/sebmarkbage/ecmascript-rest-spread)

<blockquote class="babel-callout babel-callout-warning">
  <h4>Disabled by default</h4>
  <p>
    These are only usable if you enable experimental support. See <a href="/docs/usage/experimental">experimental usage</a> for information.
  </p>
</blockquote>

## Other

 - [react](/docs/usage/jsx)
 - [regenerator](https://github.com/facebook/regenerator) (generators/async functions)
 - [useStrict](#)

## Optional

babel provides various optional transformers for those of you who want
to take your code that extra mile.

```javascript
require("babel").transform("code", { optional: ["transformerName"] });
```

```sh
$ babel --optional transformerName
```

### `selfContained`

See [runtime](/docs/usage/runtime) for more info.

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

<blockquote class="babel-callout babel-callout-warning">
  <h4>Disabled by default</h4>
  <p>
    These are only usable if you enable playground support. See <a href="/docs/usage/playground">playground usage</a> for information.
  </p>
</blockquote>
