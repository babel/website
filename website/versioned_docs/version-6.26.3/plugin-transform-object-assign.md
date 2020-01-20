---
id: version-6.26.3-babel-plugin-transform-object-assign
title: babel-plugin-transform-object-assign
sidebar_label: transform-object-assign
original_id: babel-plugin-transform-object-assign
---

## Example

**In**

```javascript
Object.assign(a, b);
```

**Out**

```javascript
var _extends = ...;

_extends(a, b);
```

## Caveats

- Will only work with code of the form `Object.assign` or `Object['assign']`. The following patterns are not supported:

  ```javascript
  var { assign } = Object;
  var assign = Object.assign;
  ```

## Installation

```sh
npm install --save-dev babel-plugin-transform-object-assign
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-object-assign"]
}
```

### Via CLI

```sh
babel --plugins transform-object-assign script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-object-assign"]
});
```

