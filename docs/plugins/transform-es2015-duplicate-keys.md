---
layout: docs
title: ES2015 duplicate keys transform
description:
permalink: /docs/plugins/transform-es2015-duplicate-keys/
package: babel-plugin-transform-es2015-duplicate-keys
---

Compile objects with duplicate keys to valid strict ES5.

This plugin actually converts duplicate keys in objects to be computed properties, which then must be handled by the [transform-es2015-computed-properties](/docs/plugins/transform-es2015-computed-properties) plugin. The final result won't contain any object literals with duplicate keys.

{% include package_readme.html %}
