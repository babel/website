---
id: babel-plugin-proposal-await-operations
title: @babel/plugin-proposal-await-operations
sidebar_label: await-operations
---

Transforms await operations.

## Example
```js
await.all promises;
await.allSettled promises;
await.any promises;
await.race promises;
```

will be transformed to

```js
await Promise.all(promises);
await Promise.allSettled(promises);
await Promise.any(promises);
await Promise.race(promises);
```

The plugin assumes that the builtin `Promise` is not shadowed or modified. It should work with a spec-compliant `Promise` polyfill.

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-await-operations
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-await-operations"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-await-operations script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-await-operations"],
});
```

## References

- [Proposal: Await Operations](https://github.com/tc39/proposal-await.ops)
