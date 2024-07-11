---
id: babel-plugin-bugfix-safari-class-field-initializer-scope
title: "@babel/plugin-bugfix-safari-class-field-initializer-scope"
sidebar_label: bugfix-safari-class-field-initializer-scope
---

This bugfix plugin wraps some class field initializers with an IIFE to workaround [a WebKit bug](https://webkit.org/b/236843) which affects Safari 15.

:::tip
This plugin is included in `@babel/preset-env`, and Babel will automatically enable this plugin for you when your `targets` are affected by the browser bug.
:::

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-bugfix-safari-class-field-initializer-scope
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-bugfix-safari-class-field-initializer-scope"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-bugfix-safari-class-field-initializer-scope script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-bugfix-safari-class-field-initializer-scope"],
});
```
