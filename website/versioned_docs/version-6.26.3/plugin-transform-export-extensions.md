---
id: version-6.26.3-babel-plugin-transform-export-extensions
title: babel-plugin-transform-export-extensions
sidebar_label: transform-export-extensions
original_id: babel-plugin-transform-export-extensions
---

## Example

```js
export * as ns from 'mod';
export v from 'mod';
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-export-extensions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-export-extensions"]
}
```

### Via CLI

```sh
babel --plugins transform-export-extensions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-export-extensions"]
});
```
## References

* ~~[Proposal: Additional export-from statements in ES7](https://github.com/leebyron/ecmascript-more-export-from)~~ (Withdrawn)
* [ECMAScript Proposal: export ns from](https://github.com/leebyron/ecmascript-export-ns-from)
* [ECMAScript Proposal: export default from](https://github.com/leebyron/ecmascript-export-default-from)

