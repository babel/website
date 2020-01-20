---
id: version-6.26.3-babel-plugin-transform-async-to-module-method
title: babel-plugin-transform-async-to-module-method
sidebar_label: transform-async-to-module-method
original_id: babel-plugin-transform-async-to-module-method
---

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
npm install --save-dev babel-plugin-transform-async-to-module-method
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["transform-async-to-module-method"]
}
```

With options:

```json
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
babel --plugins transform-async-to-module-method script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-async-to-module-method"]
});
```

