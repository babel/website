---
id: version-7.0.0-babel-plugin-syntax-typescript
title: @babel/plugin-syntax-typescript
sidebar_label: syntax-typescript
original_id: babel-plugin-syntax-typescript
---

```sh
npm install --save-dev @babel/plugin-syntax-typescript
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-typescript"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-typescript script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-typescript"]
});
```

## Options

### `isTSX`

`boolean`, defaults to `false`.

Forcibly enables `jsx` parsing. Otherwise angle brackets will be treated as typescript's legacy type assertion `var foo = <string>bar;`

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
