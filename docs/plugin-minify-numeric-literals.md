---
id: babel-plugin-minify-numeric-literals
title: babel-plugin-minify-numeric-literals
sidebar_label: minify-numeric-literals
---

## Example

**In**

```javascript
[1000, -20000]
```

**Out**

```javascript
[1e3, -2e4]
```

## Installation

```sh
npm install babel-plugin-minify-numeric-literals --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["minify-numeric-literals"]
}
```

### Via CLI

```sh
babel --plugins minify-numeric-literals script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["minify-numeric-literals"]
});
```

