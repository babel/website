---
id: version-6.26.3-babel-plugin-syntax-async-functions
title: babel-plugin-syntax-async-functions
sidebar_label: syntax-async-functions
original_id: babel-plugin-syntax-async-functions
---

## Example

**Syntax**

```javascript
(async function() {
  await loadStory();
  console.log("Yey, story successfully loaded!");
}());
```

## Installation

```sh
npm install --save-dev babel-plugin-syntax-async-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-async-functions"]
}
```

### Via CLI

```sh
babel --plugins syntax-async-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-async-functions"]
});
```

## References

* [Proposal: Async Functions for ECMAScript](https://github.com/tc39/ecmascript-asyncawait)

