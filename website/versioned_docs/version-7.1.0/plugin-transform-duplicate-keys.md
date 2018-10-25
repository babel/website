---
id: version-7.1.0-babel-plugin-transform-duplicate-keys
title: @babel/plugin-transform-duplicate-keys
sidebar_label: transform-duplicate-keys
original_id: babel-plugin-transform-duplicate-keys
---

This plugin actually converts duplicate keys in objects to be computed properties, which then must be handled by the [@babel/plugin-transform-computed-properties](plugin-transform-computed-properties.md) plugin. The final result won't contain any object literals with duplicate keys.

## Example

**In**

```javascript
var x = { a: 5, a: 6 };
var y = {
  get a() {},
  set a(x) {},
  a: 3,
};
```

**Out**

```javascript
var x = { a: 5, ["a"]: 6 };
var y = {
  get a() {},
  set a(x) {},
  ["a"]: 3,
};
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-duplicate-keys
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-duplicate-keys"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-duplicate-keys script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-duplicate-keys"],
});
```
