---
id: babel-plugin-syntax-typescript
title: @babel/plugin-syntax-typescript
sidebar_label: syntax-typescript
---

> #### Syntax only
>
> Using this plugin directly only enables Babel to parse this syntax. If you want to remove TypeScript syntax then use the [typescript](plugin-transform-typescript.md) plugin or [typescript](preset-typescript.md) preset to _both_ parse and transform this syntax.

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
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-typescript"],
});
```

## Options

### `isTSX`

`boolean`, defaults to `false`.

Forcibly enables `jsx` parsing. Otherwise angle brackets will be treated as typescript's legacy type assertion `var foo = <string>bar;`

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
