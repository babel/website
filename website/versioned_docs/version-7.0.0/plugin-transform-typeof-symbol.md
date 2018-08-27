---
id: version-7.0.0-babel-plugin-transform-typeof-symbol
title: @babel/plugin-transform-typeof-symbol
sidebar_label: transform-typeof-symbol
original_id: babel-plugin-transform-typeof-symbol
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
npm install --save-dev @babel/plugin-transform-typeof-symbol
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-typeof-symbol"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-typeof-symbol script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-typeof-symbol"]
});
```

