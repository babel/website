---
layout: docs
title: Syntax JSX
description:
permalink: /docs/plugins/syntax-jsx/
package: babel-plugin-syntax-jsx
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-react-jsx">transform-react-jsx</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html).

## Installation

```sh
$ npm install babel-plugin-syntax-jsx
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-jsx"]
}
```
