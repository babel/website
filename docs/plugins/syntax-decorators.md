---
layout: docs
title: Syntax decorators
description:
permalink: /docs/plugins/syntax-decorators/
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-decorators">transform-decorators</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md).

## Installation

```sh
$ npm install babel-plugin-syntax-decorators
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-decorators"]
}
```
