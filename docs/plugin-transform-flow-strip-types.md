---
id: babel-plugin-transform-flow-strip-types
title: @babel/plugin-transform-flow-strip-types
sidebar_label: Flow Plugin
---

> **NOTE**: This plugin is included in `@babel/preset-flow`

## Example

**In**

```javascript
function foo(one: any, two: number, three?): string {}
```

**Out**

```javascript
function foo(one, two, three) {}
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-flow-strip-types
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-flow-strip-types"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-flow-strip-types script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-flow-strip-types"],
});
```

## Options

### `all`

`boolean`, defaults to `false`.

Flow will only parse Flow-specific features if a `@flow` pragma is present atop the file, or the [`all` option](https://flow.org/en/docs/config/options/#toc-all-boolean) is
set inside the `.flowconfig`.

If you are using the `all` option in your Flow config, be sure to set this option to `true` to get matching behavior.

For example, without either of the above, the following call expression with a type argument:

```
f<T>(e)
```

Would get parsed as a nested binary expression:

```javascript
f < T > e;
```

### `requireDirective`

`boolean`, defaults to `false`.

Setting this to true will only strip annotations and declarations from files
that contain the `// @flow` directive. It will also throw errors for any Flow
annotations found in files without the directive.

### `allowDeclareFields`

`boolean`, defaults to `false`

Added in: `v7.9.0`

> NOTE: This will be enabled by default in Babel 8

When enabled, type-only class fields are only removed if they are prefixed with the `declare` modifier:

```javascript
class A {
  declare foo: string; // Removed
  bar: string; // Initialized to undefined
}
```

> You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
