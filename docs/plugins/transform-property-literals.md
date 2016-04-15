---
layout: docs
title: Property literals transform
description:
permalink: /docs/plugins/transform-property-literals/
package: babel-plugin-transform-property-literals
---

This plugin allows Babel to transform valid identifier property key literals into identifiers.

## Example

**In**

```javascript
var foo = {
  "bar": function () {}
};
```

**Out**

```javascript
var foo = {
  bar: function () {}
};
```

## Installation

```sh
$ npm install babel-plugin-transform-property-literals
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-property-literals"]
}
```
