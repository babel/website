---
id: babel-plugin-minify-infinity
title: babel-plugin-minify-infinity
sidebar_label: minify-infinity
---

**In**

```js title="JavaScript"
Infinity;
```

**Out**

```js title="JavaScript"
1 / 0;
```

## Installation

```shell npm2yarn
npm install babel-plugin-minify-infinity --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["minify-infinity"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins minify-infinity script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["minify-infinity"]
});
```

