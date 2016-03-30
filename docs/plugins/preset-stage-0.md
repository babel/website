---
layout: docs
title: Stage 0 preset
description: All you need to use stage 0 (and greater) plugins
permalink: /docs/plugins/preset-stage-0/
package: babel-preset-stage-0
---

This preset includes the following plugins:

- [transform-do-expressions](/docs/plugins/transform-do-expressions)
- [transform-function-bind](/docs/plugins/transform-function-bind)

And all plugins from presets:

- [preset-stage-1](/docs/plugins/preset-stage-1)
- [preset-stage-2](/docs/plugins/preset-stage-2)
- [preset-stage-3](/docs/plugins/preset-stage-3)

## Installation

```sh
$ npm install --save-dev babel-preset-stage-0
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "presets": ["stage-0"]
}
```
