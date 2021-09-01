---
id: babel-plugin-syntax-top-level-await
title: @babel/plugin-syntax-top-level-await
sidebar_label: syntax-top-level-await
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2022](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
>
> #### Syntax only
>
> This plugin only enables parsing of this feature. Babel doesn't support transforming
> top-level await, but you can use Rollup's `experimentalTopLevelAwait` or webpack@5's
> `experiments.topLevelAwait` options.

```js
const val = await promise;

export { val };
```

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-top-level-await
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-top-level-await"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-top-level-await script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync(code, {
  plugins: ["@babel/plugin-syntax-top-level-await"],
});
```
