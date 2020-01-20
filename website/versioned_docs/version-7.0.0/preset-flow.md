---
id: version-7.0.0-babel-preset-flow
title: @babel/preset-flow
sidebar_label: flow
original_id: babel-preset-flow
---

This preset includes the following plugins:

- [@babel/plugin-transform-flow-strip-types](plugin-transform-flow-strip-types.md)

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
npm install --save-dev @babel/preset-flow
```

## Usage

### With a configuration file (Recommended)

```json
{
  "presets": ["@babel/preset-flow"]
}
```

### Via CLI

```sh
babel --presets @babel/preset-flow script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/preset-flow"],
});
```

## Options

### `all`

`boolean`, defaults to `false`.

Flow will only parse Flow-specific features if a `@flow` pragma is present atop the file, or the [`all` option](https://flow.org/en/docs/config/options/#toc-all-boolean) is
set inside the `.flowconfig`.

If you are using the `all` option in your Flow config, be sure to set this option to `true` to get matching behavior.

For example, without either of the above set, the following call expression with a type argument:

```
f<T>(e)
```

Would get parsed as a nested binary expression:

```javascript
f < T > e;
```

> You can read more about configuring preset options [here](https://babeljs.io/docs/en/presets#preset-options)
