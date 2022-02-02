---
id: babel-plugin-proposal-unicode-sets-regex
title: @babel/plugin-proposal-unicode-sets-regex
sidebar_label: unicode-sets-regex
---

This plugin transforms regular expressions using the `v` flag, introduced by the [RegExp set notation + properties of strings](https://github.com/tc39/proposal-regexp-set-notation) proposal, to regular expressions that use the `u` flag.

## Example

```js
/[\p{ASCII}&&\p{Decimal_Number}]/v
```

will be transformed to

```js
/[0-9]/u
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-unicode-sets-regex
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-unicode-sets-regex"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-unicode-sets-regex script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-unicode-sets-regex"],
});
```
