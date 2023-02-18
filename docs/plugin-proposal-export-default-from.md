---
id: babel-plugin-proposal-export-default-from
title: "@babel/plugin-proposal-export-default-from"
sidebar_label: export-default-from
---

## Example

```js title="JavaScript"
export v from "mod";
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-export-default-from
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-proposal-export-default-from"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-proposal-export-default-from script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-export-default-from"],
});
```

## References

- ~~[Proposal: Additional export-from statements in ES7](https://github.com/leebyron/ecmascript-more-export-from)~~ (Withdrawn)
- [ECMAScript Proposal: export default from](https://github.com/leebyron/ecmascript-export-default-from)
