---
id: version-7.1.0-babel-plugin-syntax-dynamic-import
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
  plugins: ["@babel/plugin-syntax-dynamic-import"]
});
```

## Dynamic imports with babel-preset-env

The babel-preset-env plugin doesn't know that the dynamic import plugin will translate `import` into a `Promise`. For example, IE requires the `promise` and `iterator` polyfill to be added manually. 

```js
// webpack config
const config = {
    entry: [
        'core-js/modules/es6.promise',
        'core-js/modules/es6.array.iterator',
        path.resolve(__dirname, "src/main.js"),
    ],
    // ...
}
```

or

```js
// src/main.js
import 'core-js/modules/es6.promise';
import 'core-js/modules/es6.array.iterator';

// ...
```
