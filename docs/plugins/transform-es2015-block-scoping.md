---
layout: docs
title: ES2015 block scoping transform
description:
permalink: /docs/plugins/transform-es2015-block-scoping/
package: babel-plugin-transform-es2015-block-scoping
---

Compile ES2015 block scoping (const and let) to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-block-scoping
```

## Options `tdz` (default: false)

Will account for tdz (Temporal Dead Zone).

In

```js
console.log(a);
const a = 1;
```

Out

```js
console.log(function () {
  throw new ReferenceError("a is not defined - temporal dead zone");
}());
var a = 1;
```

Without the `tdz` option:

```
console.log(a); // no error
var a = 1;
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-block-scoping"]
}

// with options
{
  "plugins": [
    ["transform-es2015-block-scoping", { "tdz": true }]
  ]
}
```
