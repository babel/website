---
id: babel-plugin-proposal-record-and-tuple
title: @babel/plugin-proposal-record-and-tuple
sidebar_label: record-and-tuple
---

## Installation

```sh
$ npm install --save-dev @babel/plugin-proposal-record-and-tuple
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-proposal-record-and-tuple"]
}
```

### Via CLI

```sh
$ babel --plugins @babel/plugin-proposal-record-and-tuple script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: [["@babel/plugin-proposal-record-and-tuple"]],
});
```

## Options

### `importPolyfill`

`boolean`, defaults to `false`.

By default this plugin only transforms the proposal syntax, using the `Record` and `Tuple` globals:

```js
let a = #[1, 2, 3];

// ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇

let a = Tuple(1, 2, 3);
```

You either need to load a polyfill, or you can pass the `"importPolyfill": true` option to inject imports to `@bloomberg/record-tuple-polyfill`, maintained by the proposal authors:

```json
{
  "plugins": [
    [
      "@babel/plugin-proposal-record-and-tuple",
      {
        "importPolyfill": true
      }
    ]
  ]
}
```

```js
let a = #[1, 2, 3];

// ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇

import { Tuple as _Tuple } from "@bloomberg/record-tuple-polyfill";

let a = _Tuple(1, 2, 3);
```

Don't forget to add `@bloomberg/record-tuple-polyfill` to your dependencies!

### `polyfillModuleName`

`string`, defaults to `"@bloomberg/record-tuple-polyfill"`.

If you wish to inject imports to a polyfill different from `@bloomberg/record-tuple-polyfill`, you can use this option to specify its name.
