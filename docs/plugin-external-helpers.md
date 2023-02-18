---
id: babel-plugin-external-helpers
title: "@babel/plugin-external-helpers"
sidebar_label: external-helpers
---

```shell npm2yarn
npm install --save-dev @babel/plugin-external-helpers
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-external-helpers"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-external-helpers script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-external-helpers"]
});
```

