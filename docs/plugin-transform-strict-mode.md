---
id: babel-plugin-transform-strict-mode
title: @babel/plugin-transform-strict-mode
sidebar_label: transform-strict-mode
---

This plugin may be enabled via `@babel/plugin-transform-modules-commonjs`.
To do this you can pass `strict: true` as an option to the commonjs transform.
This option defaults to `false`.

## Example

**In**

```javascript
foo();
```

**Out**

```javascript
"use strict";

foo();
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-strict-mode
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**


```json
{
  "plugins": ["@babel/plugin-transform-strict-mode"]
}
```


### Via CLI

```sh
babel --plugins @babel/plugin-transform-strict-mode script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-strict-mode"]
});
```

