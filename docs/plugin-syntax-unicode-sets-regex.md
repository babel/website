---
id: babel-plugin-syntax-unicode-sets-regex
title: "@babel/plugin-syntax-unicode-sets-regex"
sidebar_label: syntax-unicode-sets-regex
---

:::note
#### Syntax only

It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-transform-unicode-sets-regex](plugin-transform-unicode-sets-regex.md) to _both_ parse and transform this syntax.
:::

This plugin enables parsing regular expressions using the `v` flag, introduced by the [RegExp set notation + properties of strings](https://github.com/tc39/proposal-regexp-set-notation) proposal, to regular expressions that use the `u` flag.

## Example

```js title="JavaScript"
/[\p{ASCII}&&\p{Decimal_Number}]/v
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-unicode-sets-regex
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-unicode-sets-regex"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-unicode-sets-regex script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-unicode-sets-regex"],
});
```
