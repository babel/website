---
id: babel-plugin-transform-shorthand-properties
title: @babel/plugin-transform-shorthand-properties
sidebar_label: shorthand-properties
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

**In**

```js
var o = { a, b, c };
```

**Out**

```js
var o = { a: a, b: b, c: c };
```

**In**

```js
var cat = {
  getName() {
    return name;
  },
};
```

**Out**

```js
var cat = {
  getName: function() {
    return name;
  },
};
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-shorthand-properties
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-shorthand-properties"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-shorthand-properties script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-shorthand-properties"],
});
```
