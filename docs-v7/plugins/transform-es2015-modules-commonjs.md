---
layout: docs
title: ES2015 modules to CommonJS transform
description:
permalink: /docs/plugins/transform-es2015-modules-commonjs/
package: babel-plugin-transform-es2015-modules-commonjs
---

<blockquote class="babel-callout babel-callout-info">
  <h4>Babel 6 Changes</h4>
  <p>
    Babel 6 changed some behavior by not doing <code>module.exports = exports['default']</code> anymore in the modules transforms.
  </p>
  <p>
    There are some caveats, but you can use <a href="https://www.npmjs.com/package/babel-plugin-add-module-exports">babel-plugin-add-module-exports</a>, so that updating to Babel 6 isn't a breaking change since users that don't use ES modules don't have to do <code>require("your-module").default</code>.
  </p>
  <p>
    However, it may not match how Node eventually implements ES modules natively given the <a href="https://github.com/nodejs/node-eps/blob/master/002-es-modules.md#46-es-consuming-commonjs">the current proposal</a>.
  </p>
</blockquote>

This plugin transforms ES2015 modules to CommonJS.

[CommonJS (CJS) Modules/1.1](http://wiki.commonjs.org/wiki/Modules/1.1)

{% include package_readme.html %}
