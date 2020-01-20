---
id: version-6.26.3-babel-plugin-transform-es2015-spread
title: babel-plugin-transform-es2015-spread
sidebar_label: transform-es2015-spread
original_id: babel-plugin-transform-es2015-spread
---

## Example

**In**

```js
var a = ['a', 'b', 'c'];
var b = [...a, 'foo'];
```

**Out**

```js
var a = [ 'a', 'b', 'c' ];
var b = [].concat(a, [ 'foo' ]);
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-spread
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "plugins": ["transform-es2015-spread"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-es2015-spread", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-spread script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-spread"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

In loose mode, **all** iterables are assumed to be arrays.

