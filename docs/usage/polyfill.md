---
layout: docs
title: Polyfill
description: How to use the Polyfill.
permalink: /docs/usage/polyfill/
package: babel-polyfill
---

<p class="lead">
  Babel includes a polyfill that includes a custom
  <a href="https://github.com/facebook/regenerator/blob/master/runtime.js">regenerator runtime</a>
  and <a href="https://github.com/zloirock/core-js">core-js</a>.
</p>

This will emulate a full ES2015 environment and is intended to be used in an application rather than a library/tool. This polyfill is automatically loaded
when using `babel-node`.

This means you can use new built-ins like `Promise` or `WeakMap`, static methods like `Array.from` or `Object.assign`, instance methods like `Array.includes`, and generator functions (provided you use the [regenerator](/docs/plugins/transform-regenerator/) plugin). The polyfill adds to the global scope as well as native prototypes like `String` in order to do this.

<blockquote class="babel-callout babel-callout-info">
  <h5>
    If you are looking for something that won't modify globals to be used in a tool/library, checkout the <a href="/docs/plugins/transform-runtime"><code>transform-runtime</code></a> plugin. This means you won't be able to use the instance methods mentioned above like <code>Array.includes</code>.
  </h5>
</blockquote>

Note: Depending on what ES2015 methods you actually use, you may not need to use `babel-polyfill` or the runtime plugin. You may want to only [load the specific polyfills you are using](https://github.com/zloirock/core-js#commonjs) (like `Object.assign`) or just document that the environment the library is being loaded in should include certain polyfills.

## Installation

```sh
$ npm install --save-dev babel-polyfill
```

## Usage in Node / Browserify / Webpack

To include the polyfill you need to require it at the top of the **entry point**
to your application.

```js
require("babel-polyfill");
```

If you are using ES6's `import` syntax in your application's **entry point**, you
should instead import the polyfill at the top of the **entry point** to ensure the
polyfills are loaded first:

```js
import "babel-polyfill";
```

With `webpack.config.js`, add `babel-polyfill` to your entry array:

```js
module.exports = {
   entry: ['babel-polyfill', './app/js']
};
```

## Usage in Browser

Available from the `dist/polyfill.js` file within a `babel-polyfill` npm release.
This needs to be included **before** all your compiled Babel code. You can either
prepend it to your compiled code or include it in a `<script>`
before it.

**NOTE:** Do not `require` this via browserify etc, use `babel-polyfill`.
