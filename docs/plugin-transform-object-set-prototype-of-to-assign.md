---
id: babel-plugin-transform-object-set-prototype-of-to-assign
title: @babel/plugin-transform-object-set-prototype-of-to-assign
sidebar_label: object-set-prototype-of-to-assign
---

**NOTE:** There are some caveats when using this plugin, see the [`@babel/plugin-transform-proto-to-assign`](plugin-transform-proto-to-assign.md) docs for more information.

## Example

**In**

```javascript
Object.setPrototypeOf(bar, foo);
```

**Out**

```javascript
var _defaults = ...;

_defaults(bar, foo);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-object-set-prototype-of-to-assign
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-object-set-prototype-of-to-assign"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-object-set-prototype-of-to-assign script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-object-set-prototype-of-to-assign"],
});
```
