---
id: babel-plugin-bugfix-firefox-class-in-computed-class-key
title: "@babel/plugin-bugfix-firefox-class-in-computed-class-key"
sidebar_label: bugfix-firefox-class-in-computed-class-key
---

This bugfix plugin transforms classes inside computed keys of other classes to workaround a [SpiderMonkey bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1887677) with private class elements.

:::tip
This plugin is included in `@babel/preset-env`, and Babel will automatically enable this plugin for you when your `targets` are affected by the browser bug.
:::

:::warning
Terser versions older than 5.30.2 will undo the transform done by this plugin. Make sure to use at least version 5.30.2, or set the Terser's [`compress.inline`](https://terser.org/docs/options/#compress-options) option to `false`.
:::

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-bugfix-firefox-class-in-computed-class-key
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-bugfix-firefox-class-in-computed-class-key"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-bugfix-firefox-class-in-computed-class-key script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-bugfix-firefox-class-in-computed-class-key"],
});
```
