---
id: babel-plugin-transform-minify-booleans
title: babel-plugin-transform-minify-booleans
sidebar_label: minify-booleans
---

## Example

**In**

```js title="JavaScript"
true;
false;
```

**Out**

```js title="JavaScript"
!0;
!1;
```

## Installation

```shell npm2yarn
npm install babel-plugin-transform-minify-booleans --save-dev
```

## Usage

### With a configuration file (Recommended)

```json title="babel.config.json"
{
  "plugins": ["transform-minify-booleans"]
}
```

### Via CLI

```sh title="Shell"
babel --plugins transform-minify-booleans script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["transform-minify-booleans"],
});
```
