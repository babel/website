---
id: babel-plugin-syntax-bigint
title: @babel/plugin-syntax-bigint
sidebar_label: syntax-bigint
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2020](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
> #### Syntax only
>
> This plugin only enables parsing of this feature. Babel doesn't support transforming BigInts. One recommendation is to use the JSBI library and eventually run `babel-plugin-transform-jsbi-to-bigint` to codemod it to BigInt in the future.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-bigint
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-bigint"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-bigint script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-bigint"],
});
```

## References

- [proposal-bigint](https://github.com/tc39/proposal-bigint)
- [BigInt from v8.dev](https://v8.dev/features/bigint#polyfilling-transpiling)
- [babel-plugin-transform-jsbi-to-bigint](https://github.com/GoogleChromeLabs/babel-plugin-transform-jsbi-to-bigint)
