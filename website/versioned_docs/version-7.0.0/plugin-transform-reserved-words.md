---
id: version-7.0.0-babel-plugin-transform-reserved-words
title: @babel/plugin-transform-reserved-words
sidebar_label: transform-reserved-words
original_id: babel-plugin-transform-reserved-words
---

Some words were reserved in ES3 as potential future keywords but were not
reserved in ES5 and later. This plugin, to be used when targeting ES3
environments, renames variables from that set of words.

## Example

**In**

```javascript
var abstract = 1;
var x = abstract + 1;
```

**Out**

```javascript
var _abstract = 1;
var x = _abstract + 1;
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-reserved-words
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-reserved-words"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-reserved-words script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-reserved-words"]
});
```

## References

* [ES3 Spec: Future Reserved Words](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf#page=26)

