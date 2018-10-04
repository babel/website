---
id: version-7.0.0-babel-plugin-transform-function-name
title: @babel/plugin-transform-function-name
sidebar_label: transform-function-name
original_id: babel-plugin-transform-function-name
---

## Examples

**In**

```javascript
let number = (x) => x
```

**Out**

```javascript
var number = function number(x) {
  return x;
};
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-function-name
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-function-name"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-function-name script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-function-name"]
});
```

