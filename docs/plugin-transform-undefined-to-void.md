---
id: babel-plugin-transform-undefined-to-void
title: babel-plugin-transform-undefined-to-void
sidebar_label: undefined-to-void
---

This plugin transforms `undefined` into `void 0` which returns undefined regardless of if it's been reassigned.

## Example

**In**

```js title="JavaScript"
foo === undefined;
```

**Out**

```js title="JavaScript"
foo === void 0;
```

## Installation

```shell npm2yarn
npm install babel-plugin-transform-undefined-to-void --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["transform-undefined-to-void"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins transform-undefined-to-void script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["transform-undefined-to-void"],
});
```
