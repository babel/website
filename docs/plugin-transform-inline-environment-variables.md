---
id: babel-plugin-transform-inline-environment-variables
title: babel-plugin-transform-inline-environment-variables
sidebar_label: inline-environment-variables
---

## Example

### In

```js title="JavaScript"
// assuming process.env.NODE_ENV is actually "development"
process.env.NODE_ENV;
```

### Out

```js title="JavaScript"
"development";
```

## Installation

```shell npm2yarn
npm install babel-plugin-transform-inline-environment-variables --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="JSON"
// without options
{
  "plugins": ["transform-inline-environment-variables"]
}

// with options
{
  "plugins": [
    ["transform-inline-environment-variables", {
      "include": [
        "NODE_ENV"
      ]
    }]
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins transform-inline-environment-variables script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["transform-inline-environment-variables"],
});
```

## Options

- `include` - array of environment variables to include
- `exclude` - array of environment variables to exclude

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::
