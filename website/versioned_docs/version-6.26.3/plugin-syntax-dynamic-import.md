---
id: version-6.26.3-babel-plugin-syntax-dynamic-import
title: babel-plugin-syntax-dynamic-import
sidebar_label: syntax-dynamic-import
original_id: babel-plugin-syntax-dynamic-import
---

`@babel/plugin-syntax-dynamic-import` needed to enable parsing for import().

In Babel 7.8.0 it's enabled by default, so this plugin shouldn't be needed if you are using `@babel/core@>7.8.0`.

If you want to transpile import():

1. If you are using `@babel/preset-env`, it's automatically handled
2. If you are using Webpack or Rollup, you shouldn't transpile import() with Babel and let the bundler handle it for you
3. Otherwise, you need `@babel/plugin-proposal-dynamic-import`

## Installation

```sh
npm install --save-dev babel-plugin-syntax-dynamic-import
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["syntax-dynamic-import"]
}
```

### Via CLI

```sh
babel --plugins syntax-dynamic-import script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-dynamic-import"]
});
```

