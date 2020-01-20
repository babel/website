---
id: version-6.26.3-babel-plugin-transform-proto-to-assign
title: babel-plugin-transform-proto-to-assign
sidebar_label: transform-proto-to-assign
original_id: babel-plugin-transform-proto-to-assign
---

## Detail

This means that the following **will** work:

```javascript
var foo = { a: 1 };
var bar = { b: 2 };
bar.__proto__ = foo;
bar.a; // 1
bar.b; // 2
```

however the following **will not**:

```javascript
var foo = { a: 1 };
var bar = { b: 2 };
bar.__proto__ = foo;
bar.a; // 1
foo.a = 2;
bar.a; // 1 - should be 2 but remember that nothing is bound and it's a straight copy
```

This is a case that you have to be aware of if you intend to use this plugin.

## Example

**In**

```javascript
bar.__proto__ = foo;
```

**Out**

```javascript
var _defaults = ...;

_defaults(bar, foo);
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-proto-to-assign
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-proto-to-assign"]
}
```

### Via CLI

```sh
babel --plugins transform-proto-to-assign script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-proto-to-assign"]
});
```

