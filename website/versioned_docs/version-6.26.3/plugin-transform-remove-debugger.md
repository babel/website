---
id: version-6.26.3-babel-plugin-transform-remove-debugger
title: babel-plugin-transform-remove-debugger
sidebar_label: transform-remove-debugger
original_id: babel-plugin-transform-remove-debugger
---

## Example

**In**

```javascript
debugger;
```

**Out**

```javascript
```

## Installation

```sh
npm install babel-plugin-transform-remove-debugger
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-remove-debugger"]
}
```

### Via CLI

```sh
babel --plugins transform-remove-debugger script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-remove-debugger"]
});
```

