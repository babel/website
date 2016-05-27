---
layout: docs
title: ES2015 modules to SystemJS transform
description:
permalink: /docs/plugins/transform-es2015-modules-systemjs/
package: babel-plugin-transform-es2015-modules-systemjs
---

This plugin transforms ES2015 modules to SystemJS.

[SystemJS](https://github.com/systemjs/systemjs)

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
System.register([], function (_export, _context) {
  return {
    setters: [],
    execute: function () {
      _export("default", 42);
    }
  };
});
```

## Installation

```sh
$ npm install babel-plugin-transform-es2015-modules-systemjs
```

## Usage

Add the following line to your `.babelrc` file:

```javascript
// without options
{
  "plugins": ["transform-es2015-modules-systemjs"]
}

// with options
{
  "plugins": [
    ["transform-es2015-modules-systemjs", {
      // outputs `customSystemName.register(...` instead of `System.register(...`
      "systemGlobal": "customSystemName" 
    }]
  ]
}
```
