---
id: version-6.26.3-babel-plugin-transform-node-env-inline
title: babel-plugin-transform-node-env-inline
sidebar_label: transform-node-env-inline
original_id: babel-plugin-transform-node-env-inline
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
npm install babel-plugin-transform-node-env-inline
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

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
require("babel-core").transform("code", {
  plugins: ["transform-node-env-inline"]
});
```

