---
id: version-7.7.0-babel-plugin-syntax-top-level-await
title: @babel/plugin-syntax-top-level-await
sidebar_label: syntax-top-level-await
original_id: babel-plugin-syntax-top-level-await
---

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
require("@babel/core").transform(code, {
  plugins: ["@babel/plugin-syntax-top-level-await"],
});
```
