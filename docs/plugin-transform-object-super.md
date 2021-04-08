---
id: babel-plugin-transform-object-super
title: @babel/plugin-transform-object-super
sidebar_label: object-super
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Examples

**In**

```javascript
let obj = {
  say() {
    return "Hello";
  },
};

let obj2 = {
  say() {
    return super.say() + "World!";
  },
};
```

**Out**

```javascript
var _obj;

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

var obj = {
  say: function say() {
    return "Hello";
  },
};

var obj2 = (_obj = {
  say: function say() {
    return (
      _get(_obj.__proto__ || Object.getPrototypeOf(_obj), "say", this).call(
        this
      ) + "World!"
    );
  },
});
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-object-super
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-object-super"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-object-super script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-object-super"],
});
```
