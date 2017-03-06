---
layout: docs
title: React constant elements transformer
description: Treat React JSX elements as value types and hoist them to the highest scope.
permalink: /docs/plugins/transform-react-constant-elements/
package: babel-plugin-transform-react-constant-elements
---

Hoists element creation to the top level for subtrees that are fully static, which reduces call to `React.createElement` and the resulting allocations. More importantly, it tells React that the subtree hasn't changed so React can completely skip it when reconciling.

This transform **should be enabled only in production** (e.g., just before minifying your code) because although it improves runtime performance, it makes warning messages more cryptic.

{% include package_readme.html %}
