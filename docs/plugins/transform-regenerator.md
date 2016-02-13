---
layout: docs
title: Regenerator transform
description:
permalink: /docs/plugins/transform-regenerator/
package: babel-plugin-transform-regenerator
---

This plugin uses the [regenerator](https://github.com/facebook/regenerator) module to
transform async and generator functions.

<blockquote class="babel-callout babel-callout-warning">
  <h4>Async functions</h4>
  <p>
    These are only usable if you enable their syntax plugin. See <a href="/docs/plugins/syntax-async-functions">syntax-async-functions</a> for information.
  </p>
</blockquote>

## Installation

```sh
$ npm install babel-plugin-transform-regenerator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-regenerator"]
}
// with options
{
  "plugins": [
    ["transform-regenerator", {
        asyncGenerators: false, // true by default
        generators: false, // true by default
        async: false // true by default
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-regenerator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-regenerator"]
});
```
