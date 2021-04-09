---
id: babel-plugin-transform-property-literals
title: @babel/plugin-transform-property-literals
sidebar_label: property-literals
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

**In**

```javascript
var foo = {
  // changed
  const: function() {},
  var: function() {},

  // not changed
  default: 1,
  [a]: 2,
  foo: 1,
};
```

**Out**

```javascript
var foo = {
  const: function() {},
  var: function() {},

  default: 1,
  [a]: 2,
  foo: 1,
};
```

## Installation

```sh
npm install @babel/plugin-transform-property-literals --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-property-literals"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-property-literals script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-property-literals"],
});
```
