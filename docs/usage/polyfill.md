---
layout: docs
title: Polyfill
description: How to use the Polyfill.
permalink: /docs/usage/polyfill/
---

<p class="lead">
  6to5 includes a polyfill that includes a custom
  <a href="https://github.com/facebook/regenerator/blob/master/runtime.js">regenerator runtime</a>
  and <a href="https://github.com/zloirock/core-js">core.js</a>.
</p>

This will emulate a full ES6 environment. This polyfill is automatically loaded
when using `6to5-node` and `6to5/register`.

## Usage in Node/Browserify

To include the polyfill you need to require it at the top of the **entry point**
to your application.

```js
require("6to5/polyfill");
```

Fortunately, this is also automatically loaded when using the
[require hook](/docs/usage/require).

## Usage in Browser

Available from the `browser-polyfill.js` file within the 6to5 directory of an
npm release. This needs to be included **before** all your compiled 6to5 code.
You can either prepend it to your compiled code or include it in a `<script>`
before it.

**NOTE:** Do not `require` this via browserify etc, use `6to5/polyfill`.
