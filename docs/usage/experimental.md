---
layout: docs
title: Experimental
description: How to use experimental ES7 features.
permalink: /docs/usage/experimental/
redirect_from: /experimental.html
---

> Babel also has experimental support for ES7 proposals.

<blockquote class="babel-callout babel-callout-danger">
  <h4>Subject to change</h4>
  <p>
    These proposals are subject to change so <strong><em>use with extreme caution</em></strong>.
    Babel may update without warning in order to track spec changes.
  </p>
</blockquote>

The TC39 categorises proposals into 4 stages:

 - Stage 0 - Strawman
 - Stage 1 - Proposal
 - Stage 2 - Draft
 - Stage 3 - Candidate
 - Stage 4 - Finished

Proposals that are **stage 2 or above** are enabled by default. Now this does not mean that they're guaranteed
to be included in future ECMAScript specifications or maintained in Babel itself. Stage 2 is considered a good
point for inclusion by default in Babel due to their relative maturity and need for critical proposal feedback.

## Status

### Stage 0

- [es7.comprehensions](/docs/learn-es6#comprehensions)
- [es7.classProperties](https://gist.github.com/jeffmo/054df782c05639da2adb)
- [es7.functionBind](https://github.com/zenparsing/es-function-bind)

### Stage 1

- [es7.asyncFunctions](https://github.com/lukehoban/ecmascript-asyncawait)
- [es7.decorators](https://github.com/wycats/javascript-decorators)
- [es7.exportExtensions](https://github.com/leebyron/ecmascript-more-export-from)
- [es7.objectRestSpread](https://github.com/sebmarkbage/ecmascript-rest-spread)
- [es7.trailingFunctionCommas](https://github.com/jeffmo/es-trailing-function-commas)

### Stage 2

**NOTE:** Stage 2 and above are enabled by default.

- [es7.exponentiationOperator](https://github.com/rwaldron/exponentiation-operator)

## Usage

### Enable by stage

```sh
$ babel --stage 0
```

```js
babel.transform("code", { stage: 0 });
```

### Enable by transformer

```sh
$ babel --optional es7.decorators
```

```js
babel.transform("code", { optional: ["es7.decorators"] });
```
