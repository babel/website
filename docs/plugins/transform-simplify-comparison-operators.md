---
layout: docs
title: Simplfy comparison operator transform
description:
permalink: /docs/plugins/transform-simplify-comparison-operators/
package: babel-plugin-transform-simplify-comparison-operators
---

This plugin simplifies comparisons from strict `===` to `==` when each side is inferred
to always be the same type.

## Example

**In**

```javascript
"foo" === "bar";
```

**Out**

```javascript
"foo" == "bar";
```

## Installation

```sh
$ npm install babel-plugin-transform-simplify-comparison-operators
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-simplify-comparison-operators"]
}
```
