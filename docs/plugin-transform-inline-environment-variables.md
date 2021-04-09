---
id: babel-plugin-transform-inline-environment-variables
title: babel-plugin-transform-inline-environment-variables
sidebar_label: inline-environment-variables
---

## Example

### In

```js
// assuming process.env.NODE_ENV is actually "development"
process.env.NODE_ENV;
```

### Out

```js
"development";
```

## Installation

```sh
npm install babel-plugin-transform-inline-environment-variables --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
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

```sh
babel --plugins transform-inline-environment-variables script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["transform-inline-environment-variables"],
});
```

## Options

- `include` - array of environment variables to include
- `exclude` - array of environment variables to exclude

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
