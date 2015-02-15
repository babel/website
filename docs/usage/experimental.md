---
layout: docs
title: Experimental
description: How to use experimental ES7 features.
permalink: /docs/usage/experimental/
redirect_from: /experimental.html
---

> babel also has experimental support for ES7 proposals.

<blockquote class="babel-callout babel-callout-danger">
  <h4>Subject to change</h4>
  <p>
    These proposals are subject to change so <strong><em>use with extreme
    caution</em></strong>. babel may update without warning in order to track spec
    changes. Please do not use them in production applications.
  </p>
</blockquote>

#### Usage

```sh
$ babel --experimental
```

```js
babel.transform("code", { experimental: true });
```


#### Transformers

See [Transformers - Experimental](/docs/usage/transformers#es7-experimental-)
for transformers.
