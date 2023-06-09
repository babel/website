---
id: babel-plugin-bugfix-safari-id-destructuring-collision-in-function-expression
title: "@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression"
sidebar_label: safari-id-destructuring-collision-in-function-expression
---

This bugfix plugin renames destructuring parameters to workaround a [Safari bug](https://bugs.webkit.org/show_bug.cgi?id=220517) affecting versions 10 to 16.2.

:::tip
This plugin is included in `@babel/preset-env`. Set the [`bugfixes` option](./preset-env.md#bugfixes) to `true` so Babel will automatically enable this plugin for you when your `targets` are affected by the browser bug.
:::

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-bugfix-safari-id-destructuring-collision-in-function-expression"],
});
```
