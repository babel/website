---
layout: docs
title: Runtime transform
description:
permalink: /docs/plugins/transform-runtime/
package: babel-plugin-transform-runtime
---

# babel-plugin-transform-runtime

Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals. (This plugin is recommended in a library/tool)

NOTE: Instance methods such as `"foobar".includes("foo")` will not work since that would require modification of existing builtins (Use [`babel-polyfill`](/docs/usage/polyfill) for that).

{% include package_readme.html %}