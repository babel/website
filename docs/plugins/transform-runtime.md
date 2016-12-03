---
layout: docs
title: Runtime transform
description: Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals
permalink: /docs/plugins/transform-runtime/
package: babel-plugin-transform-runtime
---

This plugin is recommended in a library/tool.

NOTE: Instance methods such as `"foobar".includes("foo")` will not work since that would require modification of existing builtins (Use [`babel-polyfill`](/docs/usage/polyfill) for that).

{% include package_readme.html %}