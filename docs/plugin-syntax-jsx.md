---
id: babel-plugin-syntax-jsx
title: "@babel/plugin-syntax-jsx"
sidebar_label: syntax-jsx
---

:::note
#### Syntax only

Using this plugin directly only enables Babel to parse this syntax. If you want to transform JSX syntax then use the [transform-react-jsx](plugin-transform-react-jsx.md) plugin or [react](preset-react.md) preset to _both_ parse and transform this syntax.
:::

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-jsx
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-syntax-jsx"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-syntax-jsx script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-jsx"],
});
```
