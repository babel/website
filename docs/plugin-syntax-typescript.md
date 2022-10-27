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

### `disallowAmbiguousJSXLike`

`boolean`, defaults to `false`

Added in: `v7.16.0`

Even when JSX parsing is not enabled, this option disallows using syntax that would be ambiguous with JSX (`<X> y` type assertions and `<X>() => {}` type arguments). It matches the `tsc` behavior when parsing `.mts` and `.mjs` files.

### `dts`

`boolean`, defaults to `false`

Added in: `v7.20.0`

This option will enable parsing within a TypeScript ambient context, where certain syntax have different rules (like `.d.ts` files and inside `declare module` blocks). Please see [Official Handbook](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) and [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/type-system/intro) for more information about ambient contexts.

### `isTSX`

`boolean`, defaults to `false`.

Forcibly enables `jsx` parsing. Otherwise angle brackets will be treated as typescript's legacy type assertion `var foo = <string>bar;`

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
