---
layout: docs
title: Stage 2 preset
description: All you need to use stage 2 (and greater) plugins
permalink: /docs/plugins/preset-stage-2/
package: babel-preset-stage-2
---

This preset includes the following plugins:

- [syntax-trailing-function-commas](/docs/plugins/syntax-trailing-function-commas)
- [transform-object-rest-spread](/docs/plugins/transform-object-rest-spread)

And all plugins from presets:

- [preset-stage-3](/docs/plugins/preset-stage-3)

## Installation

```sh
$ npm install --save-dev babel-preset-stage-2
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "presets": ["stage-2"]
}
```
