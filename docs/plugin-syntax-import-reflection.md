---
id: babel-plugin-syntax-import-reflection
title: @babel/plugin-syntax-import-reflection
sidebar_label: syntax-import-reflection
---

> #### Syntax only
>
> This plugin only enables Babel to parse this syntax. Babel does not support transforming this syntax

This plugin enables Babel to parse import reflections:

```js
import module foo from "./foo.wasm";
```

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-import-reflection
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-import-reflection"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-import-reflection script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-import-reflection"]
});
```
