---
layout: post
title:  "Upgrade guide for Babel 7"
author: Sven SAULEAU
date:   2017-01-23 12:00:00
categories: announcements
share_text: "Upgrade guide for Babel 7"
third_party_js:
- https://platform.twitter.com/widgets.js
custom_js_with_timestamps:
- docs.js
---
Babel 7 is out! This document aims to help people with upgrading Babel.

- [Babel]({{page.url}}#babel)
- [babylon]({{page.url}}#babylon)
- [babel-core]({{page.url}}#babel-core)
- [babel-preset-stage-3]({{page.url}}#babel-preset-stage-3)
- [babel-plugin-syntax-class-constructor-call]({{page.url}}#babel-plugin-syntax-class-constructor-call)

See [...](...) for the full changelog.

# TODO

- add-module-exports - https://github.com/babel/babel/issues/5127
- https://github.com/babel/babel/pull/5128
- https://github.com/babel/babel/issues/5197

## Babel

> Support for Node.js 0.10 and 0.12 has been dropped

We highly encourage you to use a newer version of Node.js (LTS v4, LTS v6) since the previous versions are not maintained.
See [nodejs/LTS](https://github.com/nodejs/LTS) for more information.

Note that the Babel compiler is only supported officially in these environments:

* Modern browsers such as Chrome, Firefox, Safari, Edge etc.
* Node.js 4 and upper versions

## babylon

> Removed the `*` plugin option

This catch-all option was removed; instead you should specifically decide which plugins you want to activate.

We thought it would be a good idea for tools so they wouldn't have to constantly update their config but it also means we can't easily make a breaking change.

Before:

```js
babylon.parse(code, {
  plugins: [ "*" ]
})
```

You can get the old behavior using:

```js
babylon.parse(code, {
  plugins: [
    "asyncGenerators",
    "classProperties",
    "decorators",
    "doExpressions",
    "dynamicImport",
    "exportExtensions",
    "flow",
    "functionBind",
    "functionSent",
    "jsx",
    "objectRestSpread",
  ]
})
```

See babylon's [plugin options](https://babeljs.io/docs/core-packages/babylon/#api-plugins).

> Removed `classConstructorCall` plugin

See [below](#babel-plugin-syntax-class-constructor-call) for more information.

> A trailing comma cannot come after a RestElement in objects.

This is when you are using `babel-plugin-transform-object-rest-spread`

Before:

```js
var { ...y, } = { a: 1};
```

This will now throw a SyntaxError.

After:

```js
var { ...y } = { a: 1};
```

or:

```js
var { ...y, b } = { a: 1};
```

> AST changes

These changes only affect other tools such as Babel plugins.

* Flow: Node renamed from `ExistentialTypeParam` to `ExistsTypeAnnotation`
* Flow: Node renamed from `NumericLiteralTypeAnnotation` to `NumberLiteralTypeAnnotation`
* Flow: New node `Variance` which replaces the string value of the `variance` field on several nodes (be more specific here)

> Node `ForAwaitStatement` has been removed

An `await` property is defined instead.

```text
interface ForOfStatement <: ForInStatement {
  type: "ForOfStatement";
  await: boolean;
}
```

See [Babylon AST spec](https://github.com/babel/babylon/blob/7.0/ast/spec.md) for more information.

## babel-core

> `babel-core/register.js` has been removed

The deprecated usage of `babel-core/register` has been removed in Babel 7; instead use the standalone package `babel-register`.

Install `babel-register` as a new dependency:

```sh
npm install --save-dev babel-register
```

Upgrading with Mocha:

```sh
mocha --compilers js:babel-core/register
```

to:

```sh
mocha --compilers js:babel-register
```

See [babel-register documentation](https://babeljs.io/docs/usage/babel-register/) for more information.

## babel-preset-stage-3

> Plugins moved

These plugins were moved into their yearly presets after moving to Stage 4:

* `babel-plugin-syntax-trailing-function-commas` (babel-preset-es2017)

  Example:

  ```js
  clownPuppiesEverywhere(
    'foo',
    'bar', // Next parameter that's added only has to add a new line, not modify this line
  );
  ```

* `babel-plugin-transform-async-to-generator` (babel-preset-es2017)

  Example:

  ```js
  async function foo() {
      await bar();
  }
  ```

* `babel-plugin-transform-exponentiation-operator` (babel-preset-es2016)

  Example:

  ```js
  let cubed = 2 ** 3;
  ```

We suggest that you use recently created `babel-preset-env` which uses the right plugins based on your environment instead of any yearly preset.

See [/docs/plugins/preset-env/](/docs/plugins/preset-env/) for more information.

## babel-plugin-syntax-class-constructor-call

> babel-plugin-syntax-class-constructor-call has been removed

TC39 decided to drop this proposal.

Before:

```js
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  call constructor(x, y) {
    return new Point(x, y);
  }

}

let p1 = new Point(1, 2);
let p2 = Point(3, 4);
```

You can move your logic into the constructor or into a static method.

Example with a static method:

```js
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static secondConstructor(x, y) {
    return new Point(x, y);
  }

}

let p1 = new Point(1, 2);
let p2 = Point.secondConstructor(3, 4);
```

See [/docs/plugins/transform-class-properties/](/docs/plugins/transform-class-properties/) for more information.

<blockquote class="babel-callout">
  <small>We're Riding the Bus to Flavortown!</small>
</blockquote>
