---
id: babel-helper-wrap-function
title: "@babel/helper-wrap-function"
sidebar_label: helper-wrap-function
---

## Example

**In**

```js title="JavaScript"
(function () {
}());
```

**Out**

```js title="JavaScript"
_wrapper(function () {
})();
```

## Usage

```js title="JavaScript"
import wrapFunction from "@babel/helper-wrap-function";

wrapFunction(nodePathOfTheFunction, nodeWhichReferencesToTheWrapper);
```

