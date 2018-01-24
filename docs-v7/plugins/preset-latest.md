---
layout: docs
title: Latest preset
description: All you need to compile what's in ES2015+
permalink: /docs/plugins/preset-latest/
package: babel-preset-latest
---

<blockquote class="babel-callout babel-callout-warning">
  <h4>preset-latest is deprecated</h4>
  <p>
    <code>
      { "presets": ["latest"] } === { "presets": ["env"] }
    </code>
  </p>
</blockquote>

> Use [preset-env](/docs/plugins/preset-env/) instead.

This is a special preset that will contain all yearly presets so user's won't need to specify each one individually.

It currently includes:

- [es2017](/docs/plugins/preset-es2017/)
- [es2016](/docs/plugins/preset-es2016/)
- [es2015](/docs/plugins/preset-es2015/)

{% include package_readme.html %}
