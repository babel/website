---
layout: docs
title: React inline elements transform
description: Replaces the React.createElement function with babelHelpers.jsx.
permalink: /docs/plugins/transform-react-inline-elements/
package: babel-plugin-transform-react-inline-elements
---

Replaces the `React.createElement` function with one that is more optimized for production: `babelHelpers.jsx`.

<blockquote class="babel-callout babel-callout-info">
  <p>
    Note that this requires the global polyfill due to React's use of ES6 <code>Symbol</code> when validating React Elements.
    If <code>Symbol</code> is not present in the browser, your application will fail to render, as Babel will polyfill <code>Symbol</code>
    but React will not have access to that polyfill.
  </p>

  <p>Therefore, you must require the global polyfill at the entry point to your application:</p>

  <code>require("babel-polyfill");</code>
</blockquote>

This transform **should be enabled only in production** (e.g., just before minifying your code) because although it improves runtime performance, it makes warning messages more cryptic and skips important checks that happen in development mode, including propTypes.

{% include package_readme.html %}
