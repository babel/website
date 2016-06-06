---
layout: docs
title: ES3 property literals transform
description:
permalink: /docs/plugins/transform-es3-property-literals/
package: babel-plugin-transform-es3-property-literals
---

This plugin allows Babel to transform reserved word property keys into literals.

## Example

**In**

```javascript
var foo = {
  catch: function () {}
};
```

**Out**

```javascript
var foo = {
  "catch": function () {}
};
```

## Installation

```sh
$ npm install babel-plugin-transform-es3-property-literals
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-es3-property-literals"]
}
```
