---
layout: docs
title: Async to generator transform
description:
permalink: /docs/plugins/transform-async-to-generator/
package: babel-plugin-transform-async-to-generator
---

## Example

**In**

```javascript
async function foo() {
  await bar();
}
```

**Out**

```javascript
var _asyncToGenerator = function (fn) {
  ...
};
var foo = _asyncToGenerator(function* () {
  yield bar();
});
```

## Installation

```sh
$ npm install babel-plugin-transform-async-to-generator
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-async-to-generator"]
}
```

## References

* [Proposal: Async Functions for ECMAScript](https://github.com/tc39/ecmascript-asyncawait)
