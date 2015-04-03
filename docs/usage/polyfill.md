---
layout: docs
title: Polyfill
description: How to use the Polyfill.
permalink: /docs/usage/polyfill/
---

<p class="lead">
  Babel includes a polyfill that includes a custom
  <a href="https://github.com/facebook/regenerator/blob/master/runtime.js">regenerator runtime</a>
  and <a href="https://github.com/zloirock/core-js">core.js</a>.
</p>

This will emulate a full ES6 environment. This polyfill is automatically loaded
when using `babel-node` and `babel/register`.

## Usage in Node/Browserify

To include the polyfill you need to require it at the top of the **entry point**
to your application.

```js
require("babel/polyfill");
```

Fortunately, this is also automatically loaded when using the
[require hook](/docs/usage/require).

## Usage in Browser

Available from the `browser-polyfill.js` file within a `babel-core` npm release.
This needs to be included **before** all your compiled Babel code. You can either
prepend it to your compiled code or include it in a `<script>`
before it.

**NOTE:** Do not `require` this via browserify etc, use `babel/polyfill`.
