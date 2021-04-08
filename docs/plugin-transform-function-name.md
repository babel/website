---
id: babel-plugin-transform-function-name
title: @babel/plugin-transform-function-name
sidebar_label: function-name
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Examples

**In**

```javascript
let number = x => x;
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

### With a configuration file (Recommended)

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
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-function-name"],
});
```
