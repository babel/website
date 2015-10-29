---
layout: docs
title: Strict mode transform
description:
permalink: /docs/plugins/transform-strict-mode/
---

This plugin places a `"use strict";` directive at the top of all files to enable
[strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

## Installation

```sh
$ npm install babel-plugin-transform-strict-mode
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-strict-mode"]
}
```
