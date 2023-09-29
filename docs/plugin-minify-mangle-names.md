---
id: babel-plugin-minify-mangle-names
title: babel-plugin-minify-mangle-names
sidebar_label: minify-mangle-names
---

## Example

**In**

```js title="JavaScript"
var globalVariableName = 42;
function foo() {
  var longLocalVariableName = 1;
  if (longLocalVariableName) {
    console.log(longLocalVariableName);
  }
}
```

**Out**

```js title="JavaScript"
var globalVariableName = 42;
function foo() {
  var a = 1;
  if (a) {
    console.log(a);
  }
}
```

## Installation

```shell npm2yarn
npm install babel-plugin-minify-mangle-names --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="JSON"
// without options
{
  "plugins": ["minify-mangle-names"]
}
```

```json title="JSON"
// with options
{
  "plugins": [
    ["minify-mangle-names", { "exclude": { "foo": true, "bar": true} }]
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins minify-mangle-names script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["minify-mangle-names"]
});
```

## Options

+ `exclude` - A plain JS Object with keys as identifier names and values indicating whether to exclude (default: `{}`)
+ `eval` - mangle identifiers in scopes accessible by eval (default: `false`)
+ `keepFnName` - prevent mangler from altering function names. Useful for code depending on `fn.name` (default: `false`)
+ `topLevel` - mangle topLevel Identifiers (default: `false`)
+ `keepClassName` - prevent mangler from altering class names (default: `false`).

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::
