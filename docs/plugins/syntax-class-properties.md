---
layout: docs
title: Syntax class properties
description:
permalink: /docs/plugins/syntax-class-properties/
package: babel-plugin-syntax-class-properties
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-class-properties">transform-class-properties</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [class properties](https://github.com/jeffmo/es-class-static-properties-and-fields).

## Installation

```sh
$ npm install babel-plugin-syntax-class-properties
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-class-properties"]
}
```
