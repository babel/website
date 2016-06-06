---
layout: docs
title: JScript transform
description:
permalink: /docs/plugins/transform-jscript/
package: babel-plugin-transform-jscript
---

This plugin allows Babel to transform named function expressions into function declarations to get around some
[particularly nasty JScript bugs](https://kangax.github.io/nfe/#jscript-bugs) related to name
function expressions.

## Example

**In**

```javascript
var foo = function bar() {

};
```

**Out**

```javascript
"use strict";

var foo = (function () {
  function bar() {}

  return bar;
})();
```

## Installation

```sh
$ npm install babel-plugin-transform-jscript
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-jscript"]
}
```
