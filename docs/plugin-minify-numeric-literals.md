---
id: babel-plugin-minify-numeric-literals
title: babel-plugin-minify-numeric-literals
sidebar_label: minify-numeric-literals
---

## Example

**In**

```js title="JavaScript"
[1000, -20000]
```

**Out**

```js title="JavaScript"
[1e3, -2e4]
```

## Installation

```shell npm2yarn
npm install babel-plugin-minify-numeric-literals --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["minify-numeric-literals"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins minify-numeric-literals script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["minify-numeric-literals"]
});
```

