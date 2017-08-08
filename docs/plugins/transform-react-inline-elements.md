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
    Note that this might require the Symbol's global polyfill due to React's use of ES6 <code>Symbol</code> when validating React Elements.
    If <code>Symbol</code> is not present in legacy browser, your application will fail to render if you chose to use <code>transform-runtime</code>
    as then Babel will polyfill <code>Symbol</code> locally but React will not have access to that polyfill.
  </p>

  <p>Therefore, you must require the global polyfill at the entry point to your application:</p>

  <code>import "babel-polyfill";</code>
  or more granular
  <code>import "core-js/modules/es6.symbol";</code>
</blockquote>

This transform **should be enabled only in production** (e.g., just before minifying your code) because although it improves runtime performance, it makes warning messages more cryptic and skips important checks that happen in development mode, including propTypes.

{% include package_readme.html %}
