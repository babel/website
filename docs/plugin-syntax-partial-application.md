---
id: babel-plugin-syntax-partial-application
title: "@babel/plugin-syntax-partial-application"
sidebar_label: syntax-partial-application
---

:::note
#### Syntax only

It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-partial-application](plugin-proposal-partial-application.md) to _both_ parse and transform this syntax.
:::

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-syntax-partial-application
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": [
    ["@babel/plugin-syntax-partial-application", { "version": "2018-07" }]
  ]
}
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [
    ["@babel/plugin-syntax-partial-application", { version: "2018-07" }]
  ]
});
```

## Options

<details>
  <summary>History</summary>

| Version | Changes |
| --- | --- |
| `v8.1.0` | Added support for `"2021-10"` |
| `v8.0.0` | Added the `version` option with support for `"2018-07"` |
</details>

### `version` (required)

- `"2018-07"` is the proposal version after the updates that was discussed in the July 2018 TC39 meeting.
  ```js
  const addOne = add(1, ?);
  ```
- `"2021-10"` is the proposal version after the updates in October 2021. A partial application is marked with `~`, and supports ordinal placeholders (`?0`) and a rest placeholder (`...`).
  ```js
  const addOne = add~(1, ?);
  const flip = f~(?1, ?0);
  const bound = f~(a, ...);
  const make = new Point~(?, 0);
  ```
