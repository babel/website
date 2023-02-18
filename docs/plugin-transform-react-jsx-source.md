---
id: babel-plugin-transform-react-jsx-source
title: "@babel/plugin-transform-react-jsx-source"
sidebar_label: react-jsx-source
---

> **NOTE**: This plugin is included in `@babel/preset-react`

## Example

**In**

```
<sometag />
```

**Out**

```
<sometag __source={ { fileName: 'this/file.js', lineNumber: 10, columnNumber: 1 } } />
```

The `columnNumber` is emitted since `v7.9.0`.

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-react-jsx-source
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-react-jsx-source"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-react-jsx-source script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-react-jsx-source"],
});
```
