---
id: babel-plugin-transform-undefined-to-void
title: babel-plugin-transform-undefined-to-void
sidebar_label: undefined-to-void
---

This plugin transforms `undefined` into `void 0` which returns undefined regardless of if it's been reassigned.

## Example

**In**

```javascript
foo === undefined;
```

**Out**

```javascript
foo === void 0;
```

## Installation

```sh
npm install babel-plugin-transform-undefined-to-void --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-undefined-to-void"]
}
```

### Via CLI

```sh
babel --plugins transform-undefined-to-void script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["transform-undefined-to-void"],
});
```
