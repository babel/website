---
layout: docs
title: Async function to module method transform
description:
permalink: /docs/plugins/transform-async-to-module-method/
package: babel-plugin-transform-async-to-module-method
---

This plugin allows Babel to transform async functions into a Bluebird coroutine.

## Example

**In**

```javascript
async function foo() {
  await bar();
}
```

**Out**

```javascript
var Bluebird = require("bluebird");

var foo = Bluebird.coroutine(function* () {
  yield bar();
});
```

## Installation

```sh
$ npm install babel-plugin-transform-async-to-module-method
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-async-to-module-method"]
}

// with options
{
  "plugins": [
    ["transform-async-to-module-method", {
      "module": "bluebird",
      "method": "coroutine"
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-async-to-module-method script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-async-to-module-method"]
});
```
