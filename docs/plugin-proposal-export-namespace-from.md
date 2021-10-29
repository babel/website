---
id: babel-plugin-proposal-export-namespace-from
title: @babel/plugin-proposal-export-namespace-from
sidebar_label: export-namespace-from
---

> **NOTE**: This plugin is included in `@babel/preset-env`, in [ES2020](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

## Example

```js
export * as ns from "mod";
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-export-namespace-from
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-export-namespace-from"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-export-namespace-from script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-export-namespace-from"],
});
```

## References

- ~~[Proposal: Additional export-from statements in ES7](https://github.com/leebyron/ecmascript-more-export-from)~~ (Withdrawn)
- [ECMAScript Proposal: export ns from](https://github.com/leebyron/ecmascript-export-ns-from)
