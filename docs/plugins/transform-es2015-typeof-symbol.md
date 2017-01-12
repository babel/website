---
layout: docs
title: ES2015 typeof symbol transform
description:
permalink: /docs/plugins/transform-es2015-typeof-symbol/
package: babel-plugin-transform-es2015-typeof-symbol
---

ES6 introduces a new native type called [symbols](/docs/learn-es6#symbols).
This transformer wraps all `typeof` expressions with a method that
replicates native behaviour. (ie. returning "symbol" for symbols)

{% include package_readme.html %}
