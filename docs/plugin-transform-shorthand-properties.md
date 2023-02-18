---
id: babel-plugin-transform-shorthand-properties
title: "@babel/plugin-transform-shorthand-properties"
sidebar_label: shorthand-properties
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

**In**

```js title="JavaScript"
var o = { a, b, c };
```

**Out**

```js title="JavaScript"
var o = { a: a, b: b, c: c };
```

**In**

```js title="JavaScript"
var cat = {
  getName() {
    return name;
  },
};
```

**Out**

```js title="JavaScript"
var cat = {
  getName: function() {
    return name;
  },
};
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-shorthand-properties
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-shorthand-properties"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-shorthand-properties script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-shorthand-properties"],
});
```
