---
id: babel-plugin-transform-template-literals
title: @babel/plugin-transform-template-literals
sidebar_label: template-literals
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

**In**

```javascript
`foo${bar}`;
```

**Out**

```javascript
"foo".concat(bar);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-template-literals
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-template-literals"]
}
```

With options:

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-template-literals",
      {
        "loose": true
      }
    ]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-template-literals script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-template-literals"],
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

> ⚠️ Consider migrating to the top level [`mutableTemplateObject`](assumptions.md#mutabletemplateobject) assumption.

```jsonc
// babel.config.json
{
  "assumptions": {
    "mutableTemplateObject": true
  }
}
```

When `mutableTemplateObject` is `true`, tagged template literal objects aren't frozen. All template literal expressions and quasis are combined with the `+` operator instead of with `String.prototype.concat`.

When `false` or not set, all template literal expressions and quasis are combined with `String.prototype.concat`. It will handle cases with `Symbol.toPrimitive` correctly and throw correctly if template literal expression is a `Symbol()`. See [babel/babel#5791](https://github.com/babel/babel/pull/5791).

**In**

```javascript
`foo${bar}`;
```

**Out**

```javascript
"foo" + bar;
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
