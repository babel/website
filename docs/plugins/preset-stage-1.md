---
layout: docs
title: Stage 1 preset
description: All you need to use stage 1 (and greater) plugins
permalink: /docs/plugins/preset-es2015/
---

This preset includes the following plugins:

- [transform-class-constructor-call](/docs/plugins/transform-class-constructor-call)
- [transform-class-properties](/docs/plugins/transform-class-properties)
- [transform-decorators](/docs/plugins/transform-decorators)
- [transform-export-extensions](/docs/plugins/transform-export-extensions)

And all plugins from presets:

- [preset-stage-2](/docs/plugins/preset-stage-2)
- [preset-stage-3](/docs/plugins/preset-stage-3)

## Installation

```sh
$ npm install babel-preset-stage-1
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "presets": ["stage-1"]
}
```
