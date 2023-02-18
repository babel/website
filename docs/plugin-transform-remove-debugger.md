---
id: babel-plugin-transform-remove-debugger
title: babel-plugin-transform-remove-debugger
sidebar_label: remove-debugger
---

## Example

**In**

```js title="JavaScript"
debugger;
```

**Out**

```js title="JavaScript"
```

## Installation

```shell npm2yarn
npm install babel-plugin-transform-remove-debugger --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["transform-remove-debugger"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins transform-remove-debugger script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["transform-remove-debugger"],
});
```
