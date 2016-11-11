---
layout: docs
title: ES2015 destructuring transform
description:
permalink: /docs/plugins/transform-es2015-destructuring/
package: babel-plugin-transform-es2015-destructuring
---

## Installation

```sh
$ npm install babel-plugin-transform-es2015-destructuring
```

## Options `loose`

All iterable destructuring are assumed to be arrays.

Example: `[...mySet]` for casting a Set as an Array will have issues.

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-es2015-destructuring"]
}
```
