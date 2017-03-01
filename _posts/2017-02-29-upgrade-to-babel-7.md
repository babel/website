---
layout: post
title:  "Upgrade to Babel 7 (WIP)"
author: Sven SAULEAU, Henry Zhu
date:   2017-02-29 00:00:00
categories: announcements
share_text: "Upgrade to Babel 7"
third_party_js:
- https://platform.twitter.com/widgets.js
custom_js_with_timestamps:
- docs.js
---

Babel 7 is out! Refer users this document when upgrading to Babel 7.

Because not every breaking change will affect every project, we've sorted the sections by the likelihood of a change breaking tests when upgrading.

## All of Babel

> Support for Node.js 0.10 and 0.12 has been dropped [#5025](https://github.com/babel/babel/pull/5025), [#5041](https://github.com/babel/babel/pull/5041), [#5186](https://github.com/babel/babel/pull/5186) ![high](https://img.shields.io/badge/level%20of%20awesome%3F-high-red.svg)

We highly encourage you to use a newer version of Node.js (LTS v4, LTS v6) since the previous versions are not maintained.
See [nodejs/LTS](https://github.com/nodejs/LTS) for more information.

> This just means Babel *itself* won't run on older versions of Node. It can still *output* code that runs on old Node. 

## babel-preset-stage-3

> Remove Stage 4 plugins from Stage 3 [#5126](https://github.com/babel/babel/pull/5126) ![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

These plugins were moved into their yearly presets after moving to Stage 4:

`babel-plugin-syntax-trailing-function-commas` (`babel-preset-es2017`)

Example:

```js
clownPuppiesEverywhere(
  'foo',
  'bar', // Next parameter that's added only has to add a new line, not modify this line
);
```

`babel-plugin-transform-async-to-generator` (`babel-preset-es2017`)

Example:

```js
async function foo() {
    await bar();
}
```

`babel-plugin-transform-exponentiation-operator` (babel-preset-es2016)

Example:

```js
let cubed = 2 ** 3;
```

---

Instead of any yearly preset, we suggest that you use the newly created `babel-preset-env` which uses the correct plugins based on your environment.

Before:

```json
{
  "presets": ["es2015", "es2016", "es2017"]
}
```

After:

```json
{
  "presets": ["env"]
}
```

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```

See [/docs/plugins/preset-env/](/docs/plugins/preset-env/) for more information.

## Spec Compliancy 

> A trailing comma cannot come after a RestElement in objects [#290](https://github.com/babel/babylon/pull/290) ![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

This is when you are using `babel-plugin-transform-object-rest-spread`

Before:

```js
var { ...y, } = { a: 1};
```

This will now throw a syntax error.

After:

```js
var { ...y } = { a: 1};
```

or:

```js
var { ...y, b } = { a: 1};
```

## babel-preset-stage-1/babel-preset-stage-2 (decorators)

> [legacy-decorators](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) has been moved into the [transform-decorators](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-decorators) package [#5225](https://github.com/babel/babel/pull/5225) ![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

Currently, we don't have a Stage 2 transform for decorators. Instead of making it error, we are adding legacy-decorators as part of the Stage 1 preset by merging it into the transform-decorators plugin.

## babel-core

> `babel-core/register.js` has been removed [#5132](https://github.com/babel/babel/pull/5132) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

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

## babel-plugin-transform-class-constructor-call

> babel-plugin-transform-class-constructor-call has been removed [#5119](https://github.com/babel/babel/pull/5119) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

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

See [/docs/plugins/transform-class-constructor-call/](/docs/plugins/transform-class-constructor-call/) for more information.

## babel

> Dropping the `babel` package [#5293](https://github.com/babel/babel/pull/5293) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

This package currently gives you an error message to install `babel-cli` instead in v6. We will just not publish a v7 version. It also doesn't make sense if we switch to scoped package `babel` -> `@babel/babel`?

## babel-generator

> Dropping the `quotes` option [#5154](https://github.com/babel/babel/pull/5154)] ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

If you want formatting for compiled output you can use recast/prettier/escodegen/fork babel-generator.

This option was only available through `babel-generator` explicitly until v6.18.0 when we exposed `parserOpts` and `generatorOpts`. Because there was a bug in that release no one should've used this option in Babel itself.

> Dropping the `flowUsesCommas` option [#5123](https://github.com/babel/babel/pull/5123) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

Currently there are 2 supported syntaxes (`,` and `;`) in Flow Object Types. 

This change just makes babel-generator output `,` instead of `;`.

## babel-core

> Remove `babel-core/src/api/browser.js` [#5124](https://github.com/babel/babel/pull/5124) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

`babel-browser` was already removed in 6.0. If you need to use Babel in the browser or a non-Node environment, use [babel-standalone](https://github.com/babel/babel-standalone)
