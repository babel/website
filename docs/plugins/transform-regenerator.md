---
layout: docs
title: Regenerator transform
description:
permalink: /docs/plugins/transform-regenerator/
package: babel-plugin-transform-regenerator
---

This plugin uses the [regenerator](https://github.com/facebook/regenerator) module to
transform async and generator functions.

<blockquote class="babel-callout babel-callout-warning">
  <h4>Async functions</h4>
  <p>
    These are only usable if you enable their syntax plugin. See <a href="/docs/plugins/syntax-async-functions">syntax-async-functions</a> for information.
  </p>
</blockquote>

## Installation

```sh
$ npm install babel-plugin-transform-regenerator
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["transform-regenerator"]
}
```
