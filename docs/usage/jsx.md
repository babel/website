---
layout: docs
title: JSX
description: How to use JSX.
permalink: /docs/usage/jsx/
---

<p class="lead">
  babel has built-in support for React v0.12 and v0.13. Tags are automatically transformed
  to their equivalent <code>React.createElement(...)</code> and
  <code>displayName</code> is automatically inferred and added to all
  <code>React.createClass</code> calls. Completely compatible with the official
  JSX/React transformer even down to whitespace handling.
</p>

See the [react transformer docs](/docs/advanced/transformers/other/react) for more info.

## Blacklist

To disable this behaviour add the `react` transformer to your blacklist:

````js
babel.transform("code", { blacklist: ["react"] });
```

```sh
$ babel --blacklist react
```

## Pre-v0.12

You can enable the pre-v0.12 syntax with the optional `reactCompat` transformer:

````js
babel.transform("code", { optional: ["reactCompat"] });
```

```sh
$ babel --optional reactCompat
```

See the [reactCompat transformer docs](/docs/advanced/transformers/other/react-compat) for more info.

## Additional changes

These either add additional functionality or result in nicer code, they do not in any way
deviate from the result of the official JSX transformer.

 - When doing `export default React.createClass({});` the `displayName` is inferred from the current filename.
 - Adjacent string literals are concatenated.
