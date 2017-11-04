---
layout: docs
title: Regenerator transform
description:
permalink: /docs/plugins/transform-regenerator/
package: babel-plugin-transform-regenerator
---

This plugin uses the [regenerator](https://github.com/facebook/regenerator) module to
transform async and generator functions. `regeneratorRuntime` is not included.

<blockquote class="babel-callout babel-callout-info">
  <h4>Runtime required</h4>
  <p>
    You need to use either the <a href="/docs/usage/polyfill">Babel polyfill</a> or the <a href="https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js">regenerator runtime</a> so that <code>regeneratorRuntime</code> will be defined.
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-warning">
  <h4>Async functions</h4>
  <p>
    These are only usable if you enable their syntax plugin. See <a href="/docs/plugins/syntax-async-functions">syntax-async-functions</a> for information.
  </p>
</blockquote>

{% include package_readme.html %}
