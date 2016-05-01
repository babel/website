---
layout: docs
title: Class constructor call
description:
permalink: /docs/plugins/syntax-class-constructor-call/
package: babel-plugin-syntax-class-constructor-call
---

<blockquote class="babel-callout babel-callout-warning">
  <h4>Class constructor call is a deprecated feature</h4>
  <p>The class constructor call proposal has been withdrawn (<a href="https://github.com/tc39/ecma262/blob/master/withdrawn-proposals.md#withdrawn-proposals">Withdrawn Proposals</a>) and <a href="https://github.com/babel/babel/wiki/Babel-7">it will be removed in Babel 7</a>.</p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-class-constructor-call">transform-class-constructor-call</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [callable class constructors](https://github.com/tc39/ecma262/blob/master/workingdocs/callconstructor.md).

## Installation

```sh
$ npm install babel-plugin-syntax-class-constructor-call
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-class-constructor-call"]
}
```
