---
layout: docs
title: Object rest spread transform
description: Transform rest properties for object destructuring assignment and spread properties for object literals
permalink: /docs/plugins/transform-object-rest-spread/
package: babel-plugin-transform-object-rest-spread
---

<blockquote class="babel-callout babel-callout-warning">
  <h4>Object Rest currently depends on the destructuring transform and parameters transform</h4>
  <p>Even if you are using Node 6 or a platform that supports destructuring, <a href="/docs/plugins/transform-es2015-destructuring">transform-es2015-destructuring</a> and <a href="/docs/plugins/transform-es2015-parameters">transform-es2015-parameters</a> will currently need to be enabled if using object rest properties.</p>
  <p>There is a PR open to fix this and make this transform standalone: <a href="https://github.com/babel/babel/pull/4755">babel/babel#4755</a></p>
</blockquote>

{% include package_readme.html %}