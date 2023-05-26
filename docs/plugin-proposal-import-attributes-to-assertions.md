---
id: babel-plugin-proposal-import-attributes-to-assertions
title: "@babel/plugin-proposal-import-attributes-to-assertions"
sidebar_label: import-attributes-to-assertions
---

:::caution

This plugin will generate code that is not compatible with the current ECMAScript specification or with any currently proposed addition to it. Only use it when you are shipping native ES modules and you need compatibility exclusively with tools that don't support the Import Attributes syntax (`import pkg from "./package.json" with { type: "json" }`) but support the old Import Assertions syntax (`import pkg from "./package.json" assert { type: "json" }`), such as Chrome 91+ and Node.js 17.2+.

:::

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-import-attributes-to-assertions
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-import-attributes-to-assertions"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-import-attributes-to-assertions script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-import-attributes-to-assertions"],
});
```
