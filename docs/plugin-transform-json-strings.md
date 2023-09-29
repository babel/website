---
id: babel-plugin-transform-json-strings
title: "@babel/plugin-transform-json-strings"
sidebar_label: json-strings
---

:::info
This plugin is included in `@babel/preset-env`, in [ES2019](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
:::

## Examples

**In**

```js title="JavaScript"
const ex = "before after";
//                ^ There's a U+2028 char between 'before' and 'after'
```

**Out**

```js title="JavaScript"
const ex = "before\u2028after";
//                ^ There's a U+2028 char between 'before' and 'after'
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-json-strings
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-json-strings"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-json-strings script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-json-strings"],
});
```

## References

- [Proposal: Subsume JSON strings](https://github.com/babel/proposals/issues/43)
