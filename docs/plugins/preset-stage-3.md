---
layout: docs
title: Stage 3 preset
description: All you need to use stage 3 plugins
permalink: /docs/plugins/preset-stage-3/
package: babel-preset-stage-3
---

This preset includes the following plugins:

- [transform-object-rest-spread](/docs/plugins/transform-object-rest-spread/)
- [transform-async-generator-functions](/docs/plugins/transform-async-generator-functions/)

> trailing-commas, async, exponentiation will be removed in the next major since they are stage 4 already

- [syntax-trailing-function-commas](/docs/plugins/syntax-trailing-function-commas/)
- [transform-async-to-generator](/docs/plugins/transform-async-to-generator/)
- [transform-exponentiation-operator](/docs/plugins/transform-exponentiation-operator/)

## Installation

```sh
$ npm install --save-dev babel-preset-stage-3
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "presets": ["stage-3"]
}
```
