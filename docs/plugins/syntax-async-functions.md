---
layout: docs
title: Syntax async functions
description:
permalink: /docs/plugins/syntax-async-functions/
package: babel-plugin-syntax-async-functions
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Syntax only</h4>
  <p>
    This plugin only allows Babel to parse this syntax. If you want to transform it then
    see <a href="/docs/plugins/transform-regenerator">transform-regenerator</a>, <a href="/docs/plugins/transform-async-to-generator">transform-async-to-generator</a>, or <a href="/docs/plugins/transform-async-to-module-method">transform-async-to-module-method</a>.
  </p>
</blockquote>

This plugin allows Babel to parse [async functions](https://github.com/tc39/ecmascript-asyncawait).

## Example

**Syntax**

```javascript
(async function() {
  await loadStory();
  console.log("Yey, story successfully loaded!");
}());
```

## Installation

```sh
$ npm install babel-plugin-syntax-async-functions
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["syntax-async-functions"]
}
```
