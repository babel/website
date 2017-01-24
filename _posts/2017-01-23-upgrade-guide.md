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

- [babel](#babel)
- [babylon](#babylon)
- [babel-core](#babel-core)
- [babel-preset-stage-3](#babel-preset-stage-3)
- [babel-plugin-syntax-class-constructor-call](#babel-plugin-syntax-class-constructor-call)

# TODO

- add-module-exports - https://github.com/babel/babel/issues/5127
- https://github.com/babel/babel/pull/5128
- https://github.com/babel/babel/issues/5197

## babel

#### Support for Node.js 0.10 and 0.12 has been dropped

We highly encourage you to use a newer version of Node.js since these versions are in end of maintenance.

#### Yarn

Along npm Babel supports Yarn. See [Yarn's documentation](https://yarnpkg.com/en/docs/usage) on how to use it.

## babylon

#### Trailing comma after rest parameter in objects is not allowed anymore

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

## babel-core

#### `babel-core/register.js` has been removed

Relying on babel-core/register is deprecated and will be removed in Babel 7.

Upgrade with Mocha:

```sh
mocha --compilers js:babel-core/register
```

to:

```sh
mocha --compilers js:babel-register
```

We need to add `babel-register` as a new dependecy:

```sh
npm install --save-dev babel-register
```

See [babel-register documentation](https://babeljs.io/docs/usage/babel-register/) for more informations.

## babel-preset-stage-3

#### `babel-plugin-syntax-trailing-function-commas`, `babel-plugin-transform-async-to-generator` and `babel-plugin-transform-exponentiation-operator` are moved into `babel-preset-stage-4`.

Babel recently created `babel-preset-env` which based on your environment use the right presets. If you have issue with this changes we suggest you using the env preset.

#### `babel-plugin-transform-exponentiation-operator` has been removed from this preset

Example:

```js
let cubed = 2 ** 3;
```

If you rely on this syntax, we suggest you using rather the env preset.

## babel-plugin-syntax-class-constructor-call

#### babel-plugin-syntax-class-constructor-call has been removed

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
