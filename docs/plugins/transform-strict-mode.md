---
layout: docs
title: Strict mode transform
description:
permalink: /docs/plugins/transform-strict-mode/
package: babel-plugin-transform-strict-mode
---

This plugin places a `"use strict";` directive at the top of all files to enable
[strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

## Installation

```sh
$ npm install babel-plugin-transform-strict-mode
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-strict-mode"]
}

// with options
{
  "plugins": [
    ["transform-strict-mode", {
      "strict": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-strict-mode script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-strict-mode"]
});
```
