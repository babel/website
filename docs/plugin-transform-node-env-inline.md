---
id: babel-plugin-transform-node-env-inline
title: babel-plugin-transform-node-env-inline
sidebar_label: node-env-inline
---

## Example

**In**

```javascript
process.env.NODE_ENV === "development";
process.env.NODE_ENV === "production";
```

**Out**

```sh
NODE_ENV=development babel in.js --plugins transform-node-env-inline
```

```javascript
true;
false;
```

## Installation

```sh
npm install babel-plugin-transform-node-env-inline --save-dev
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-node-env-inline"]
}
```

### Via CLI

```sh
babel --plugins transform-node-env-inline script.js
```

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: ["transform-node-env-inline"],
});
```
