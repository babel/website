---
id: babel-plugin-syntax-import-attributes
title: "@babel/plugin-syntax-import-attributes"
sidebar_label: syntax-import-attributes
---

:::note
#### Syntax only

This plugin only enables Babel to parse this syntax. Babel does not support transforming this syntax
:::

This plugin enables Babel to parse import attributes:

```js title="JavaScript"
import foo from "./foo.json" with { type: "json" };
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-import-attributes
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-import-attributes"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-import-attributes script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-import-attributes"]
});
```

## Options

### `deprecatedAssertSyntax`

`boolean`, defaults to `false`.

If enabled, support parsing import attributes using the [deprecated](https://tc39.es/proposal-import-attributes/#sec-deprecated-assert-keyword-for-import-attributes) `assert` keyword:

```js title="JavaScript"
import foo from "./foo.json" assert { type: "json" };
```

This syntax is only supported in V8-based engines, and its removal from the web is being investigated.
