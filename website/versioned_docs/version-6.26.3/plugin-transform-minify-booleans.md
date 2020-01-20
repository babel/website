---
id: version-6.26.3-babel-plugin-transform-minify-booleans
title: babel-plugin-transform-minify-booleans
sidebar_label: transform-minify-booleans
original_id: babel-plugin-transform-minify-booleans
---

## Example

**In**

```javascript
true;
false;
```

**Out**

```javascript
!0;
!1;
```

## Installation

```sh
npm install babel-plugin-transform-minify-booleans
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-minify-booleans"]
}
```

### Via CLI

```sh
babel --plugins transform-minify-booleans script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-minify-booleans"]
});
```

