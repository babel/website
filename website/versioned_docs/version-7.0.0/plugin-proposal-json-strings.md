---
id: version-7.0.0-babel-plugin-proposal-json-strings
title: @babel/plugin-proposal-json-strings
sidebar_label: proposal-json-strings
original_id: babel-plugin-proposal-json-strings
---

## Examples

**In**

```js
const ex = "before after";
//                ^ There's a U+2028 char between 'before' and 'after'
```

**Out**

```js
const ex = "before\u2028after";
//                ^ There's a U+2028 char between 'before' and 'after'
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-json-strings
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-proposal-json-strings"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-json-strings script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-json-strings"]
});
```

## References
- [Proposal: Subsume JSON strings](https://github.com/babel/proposals/issues/43)

