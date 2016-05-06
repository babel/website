---
layout: docs
title: ES2015 computed properties transform
description:
permalink: /docs/plugins/transform-es2015-computed-properties/
package: babel-plugin-transform-es2015-computed-properties
---

Compile ES2015 computed properties to ES5

## Options `loose`

Just like method assignment in classes, in loose mode, computed property names
use simple assignments instead of being defined. This is unlikely to be an issue
in production code.

## Installation

```sh
$ npm install babel-plugin-transform-es2015-computed-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-computed-properties"]
}

// with options
{
  "plugins": [
    ["transform-es2015-computed-properties", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-computed-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-computed-properties"]
});
```
