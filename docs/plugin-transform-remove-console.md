---
id: babel-plugin-transform-remove-console
title: babel-plugin-transform-remove-console
sidebar_label: remove-console
---

## Example

**In**

```js title="JavaScript"
console.log("foo");
console.error("bar");
```

**Out**

```js title="JavaScript"
```

## Installation

```shell npm2yarn
npm install babel-plugin-transform-remove-console --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="JSON"
// without options
{
  "plugins": ["transform-remove-console"]
}
```

```json title="JSON"
// with options
{
  "plugins": [["transform-remove-console", { "exclude": ["error", "warn"] }]]
}
```

### Via CLI

```sh title="Shell"
babel --plugins transform-remove-console script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["transform-remove-console"],
});
```

## Options

- `exclude` - An array of console methods to exclude from removal.

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
