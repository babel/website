---
id: version-6.26.3-babel-plugin-transform-eval
title: babel-plugin-transform-eval
sidebar_label: transform-eval
original_id: babel-plugin-transform-eval
---

## Example

**In**

```javascript
eval("(() => 'foo')");
```

**Out**

```javascript
eval("(function () { return 'foo'; })");
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-eval
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["transform-eval"]
}
```

### Via CLI

```sh
babel --plugins transform-eval script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-eval"]
});
```

