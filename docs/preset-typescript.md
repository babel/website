---
id: babel-preset-typescript
title: @babel/preset-typescript
sidebar_label: typescript
---

This preset includes the following plugins:

- [@babel/plugin-transform-typescript](plugin-transform-typescript.md)

> You will need to specify `--extensions ".ts"` for `@babel/cli` & `@babel/node` cli's to handle `.ts` files.

## Example

**In**

```javascript
const x: number = 0;
```

**Out**

```javascript
const x = 0;
```

## Installation

```sh
npm install --save-dev @babel/preset-typescript
```

## Usage

### With a configuration file (Recommended)


```json
{
  "presets": ["@babel/preset-typescript"]
}
```

### Via CLI

```sh
babel --presets @babel/preset-typescript script.ts
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/preset-typescript"],
});
```

## Options

### `isTSX`

`boolean`, defaults to `false`

Forcibly enables `jsx` parsing. Otherwise angle brackets will be treated as typescript's legacy type assertion `var foo = <string>bar;`. Also, `isTSX: true` requires `allExtensions: true`.

### `jsxPragma`

`string`, defaults to `React`

Replace the function used when compiling JSX expressions. This is so that we know that the import is not a type import, and should not be removed.

### `allExtensions`

`boolean`, defaults to `false`

Indicates that every file should be parsed as TS or TSX (depending on the `isTSX` option).

### `allowNamespaces`

`boolean`, uses the default set by [`@babel/plugin-transform-typescript`](https://babeljs.io/docs/en/babel-plugin-transform-typescript#allownamespaces).

Enables compilation of TypeScript namespaces.

### `allowDeclareFields`

`boolean`, defaults to `false`

> NOTE: This will be enabled by default in Babel 8

When enabled, type-only class fields are only removed if they are prefixed with the `declare` modifier:

```javascript
class A {
  declare foo: string; // Removed
  bar: string; // Initialized to undefined
}
```

### `onlyRemoveTypeImports`

`boolean`, defaults to `false`

When set to `true`, the transform will only remove [type-only imports](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-exports) (introduced in TypeScript 3.8). This should only be used if you are using TypeScript >= 3.8.

> You can read more about configuring preset options [here](https://babeljs.io/docs/en/presets#preset-options).