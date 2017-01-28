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
- [Babylon]({{page.url}}#babylon)
- [Babel-core]({{page.url}}#babel-core)
- [Babel-preset-stage-3]({{page.url}}#babel-preset-stage-3)
- [Babel-plugin-syntax-class-constructor-call]({{page.url}}#babel-plugin-syntax-class-constructor-call)

See [...](...) for the full changelog.

# TODO

- add-module-exports - https://github.com/babel/babel/issues/5127
- https://github.com/babel/babel/pull/5128
- https://github.com/babel/babel/issues/5197

## Babel

> Support for Node.js 0.10 and 0.12 has been dropped

We highly encourage you to use a newer version of Node.js since these versions are in end of maintenance.
See [nodejs/LTS](https://github.com/nodejs/LTS) for more informations.

Note that the Babel compiler is only supported officially in these environments:

* Modern browsers such as Chrome, Firefox, Safari, Edge etc.
* Node.js 4 and upper versions

## Babylon

> Removed `*` plugin switch

This was removed and instead you should specificly deside which plugins you want to activate.

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

See [Babylon's plugins](https://babeljs.io/docs/core-packages/babylon/#api-plugins).

> Removed `classConstructorCall` plugin

See <below(link to the babel section about this)> for more information.

> Trailing comma after rest parameter in objects is not allowed anymore

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

### AST changes

These changes are most probably not affecting you if you use babel. They will only affect you if you use our parser Babylon directly and it's output.

* Flow: Node renamed from `ExistentialTypeParam` to `ExistsTypeAnnotation`
* Flow: Node renamed from `NumericLiteralTypeAnnotation` to `NumberLiteralTypeAnnotation`
* Flow: New node `Variance` which replaces the string value of the `variance` field on several nodes (be more specific here)

See [TODO: Babel's AST documentation]() for more informations.

## Babel-core

> `babel-core/register.js` has been removed

Relying on babel-core/register is deprecated and will be removed in Babel 7.

Upgrade with Mocha:

```sh
mocha --compilers js:babel-core/register
```

to:

```sh
mocha --compilers js:babel-register
```

We need to add `babel-register` as a new dependency:

```sh
npm install --save-dev babel-register
```

See [babel-register documentation](https://babeljs.io/docs/usage/babel-register/) for more informations.

## Babel-preset-stage-3

> Presets moved

Theses plugins were moved into `babel-preset-stage-4`:

* `babel-plugin-syntax-trailing-function-commas`

  Example:

  ```js
  clownPuppiesEverywhere(
    'foo',
    'bar', // Next parameter that's added only has to add a new line, not modify this line
  );
  ```

* `babel-plugin-transform-async-to-generator`

  Example:

  ```js
  async function foo() {
      await bar();
  }
  ```

* `babel-plugin-transform-exponentiation-operator`

  Example:

  ```js
  let cubed = 2 ** 3;
  ```

Babel recently created `babel-preset-env` which based on your environment use the right presets. If you have issue with this changes we suggest you using the env preset.
See [/docs/plugins/preset-env/](/docs/plugins/preset-env/) for more informations.

## Babel-plugin-syntax-class-constructor-call

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

See [/docs/plugins/transform-class-properties/](/docs/plugins/transform-class-properties/) for more informations.

<blockquote class="babel-callout">
  <small>We're Riding the Bus to Flavortown!</small>
</blockquote>
