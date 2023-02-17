---
id: babel-plugin-transform-regenerator
title: "@babel/plugin-transform-regenerator"
sidebar_label: regenerator
---

> **NOTE**: This plugin is included in `@babel/preset-env`

## Example

**In**

```js title="JavaScript"
function* a() {
  yield 1;
}
```

**Out**

```js title="JavaScript"
var _marked = [a].map(regeneratorRuntime.mark);

function a() {
  return regeneratorRuntime.wrap(
    function a$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return 1;

          case 2:
          case "end":
            return _context.stop();
        }
      }
    },
    _marked[0],
    this
  );
}
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-regenerator
```

## Usage

### With a configuration file (Recommended)

Without options:

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-regenerator"]
}
```

With options:

| name            | default value |
| --------------- | ------------- |
| asyncGenerators | true          |
| generators      | true          |
| async           | true          |

```json title="babel.config.json"
{
  "plugins": [
    [
      "@babel/plugin-transform-regenerator",
      {
        "asyncGenerators": false,
        "generators": false,
        "async": false
      }
    ]
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-regenerator script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-regenerator"],
});
```
