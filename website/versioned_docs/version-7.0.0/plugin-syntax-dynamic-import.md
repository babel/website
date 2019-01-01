---
id: version-7.0.0-babel-plugin-syntax-dynamic-import
title: @babel/plugin-syntax-dynamic-import
sidebar_label: syntax-dynamic-import
original_id: babel-plugin-syntax-dynamic-import
---

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-dynamic-import script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-dynamic-import"],
});
```

## Working with Webpack and @babel/preset-env

Currently, `@babel/preset-env` is unaware that using `import()` with [Webpack relies on `Promise` internally](https://webpack.js.org/guides/code-splitting/#dynamic-imports). Environments which do not have builtin support for `Promise`, like Internet Explorer, will require both the `promise` and `iterator` polyfills be added manually.

```js
// webpack config
const config = {
  entry: [
    "core-js/modules/es6.promise",
    "core-js/modules/es6.array.iterator",
    path.resolve(__dirname, "src/main.js"),
  ],
  // ...
};
```

or

```js
// src/main.js
import "core-js/modules/es6.promise";
import "core-js/modules/es6.array.iterator";

// ...
```
