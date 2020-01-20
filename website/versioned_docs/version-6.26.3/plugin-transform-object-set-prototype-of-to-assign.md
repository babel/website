---
id: version-6.26.3-babel-plugin-transform-object-set-prototype-of-to-assign
title: babel-plugin-transform-object-set-prototype-of-to-assign
sidebar_label: transform-object-set-prototype-of-to-assign
original_id: babel-plugin-transform-object-set-prototype-of-to-assign
---

**NOTE:** There are some caveats when using this plugin, see the [`babel-plugin-transform-proto-to-assign` README](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-proto-to-assign) for more information..

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
npm install --save-dev babel-plugin-transform-object-set-prototype-of-to-assign
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-object-set-prototype-of-to-assign"]
}
```

### Via CLI

```sh
babel --plugins transform-object-set-prototype-of-to-assign script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-object-set-prototype-of-to-assign"]
});
```

