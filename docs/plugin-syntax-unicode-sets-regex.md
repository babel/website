---
id: babel-plugin-syntax-unicode-sets-regex
title: @babel/plugin-syntax-unicode-sets-regex
sidebar_label: syntax-unicode-sets-regex
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-unicode-sets-regex](plugin-proposal-unicode-sets-regex.md) to _both_ parse and transform this syntax.

This plugin enables parsing regular expressions using the `v` flag, introduced by the [RegExp set notation + properties of strings](https://github.com/tc39/proposal-regexp-set-notation) proposal, to regular expressions that use the `u` flag.

## Example

```js
/[\p{ASCII}&&\p{Decimal_Number}]/v
```

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-unicode-sets-regex
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-syntax-unicode-sets-regex"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-unicode-sets-regex script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-syntax-unicode-sets-regex"],
});
```
