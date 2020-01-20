---
id: version-6.26.3-babel-plugin-transform-es2015-typeof-symbol
title: babel-plugin-transform-es2015-typeof-symbol
sidebar_label: transform-es2015-typeof-symbol
original_id: babel-plugin-transform-es2015-typeof-symbol
---

## Example

**In**

```javascript
typeof Symbol() === "symbol";
```

**Out**

```javascript
var _typeof = function (obj) {
  return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
};

_typeof(Symbol()) === "symbol";
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-typeof-symbol
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-es2015-typeof-symbol"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-typeof-symbol script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-typeof-symbol"]
});
```

