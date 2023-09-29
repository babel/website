---
id: babel-plugin-transform-block-scoping
title: "@babel/plugin-transform-block-scoping"
sidebar_label: block-scoping
---

:::info
This plugin is included in `@babel/preset-env`
:::

## Examples

**In**

```js title="JavaScript"
{
  let a = 3;
}

let a = 3;
```

**Out**

```js title="JavaScript"
{
  var _a = 3;
}

var a = 3;
```

## Constant checks

This plugin also validates all `const` variables.
Reassignment of constants is a runtime error and it will insert the necessary error code for those.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-block-scoping
```

## Usage

### With a configuration file (Recommended)

Without options:

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-block-scoping"]
}
```

With options:

```json title="babel.config.json"
{
  "plugins": [
    [
      "@babel/plugin-transform-block-scoping",
      {
        "throwIfClosureRequired": true
      }
    ]
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-block-scoping script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-block-scoping"],
});
```

## Options

### `throwIfClosureRequired`

`boolean`, defaults to `false`.

In cases such as the following it's impossible to rewrite let/const without adding an additional function and closure while transforming:

```js title="JavaScript"
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1);
}
```

In extremely performance-sensitive code, this can be undesirable. If `"throwIfClosureRequired": true` is set, Babel throws when transforming these patterns instead of automatically adding an additional function.

### `tdz`

`boolean`, defaults to `false`.

By default this plugin will ignore the _temporal dead zone (TDZ)_ for block-scoped variables. The following code will **not throw an error when transpiled with Babel, which is not spec compliant**:

```js title="JavaScript"
i;
let i;
```

If you need these errors you can tell Babel to try and find them by setting `"tdz": true` for this plugin. However, the current implementation might not get all edge cases right and its best to just avoid code like this in the first place.

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::
