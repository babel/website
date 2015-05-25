---
layout: docs
title: regenerator
description: How to use the regenerator transformer.
permalink: /docs/advanced/transformers/other/regenerator/
redirect_from:
 - /docs/usage/transformers/other/regenerator/
---

The `regenerator` transformer uses the [regenerator](https://github.com/facebook/regenerator)
module to transform async and generator functions.

<blockquote class="babel-callout babel-callout-info">
  <h4>Runtime required</h4>
  <p>
    You need to use either the <a href="/docs/usage/polyfill">Babel polyfill</a> or the <a href="https://github.com/facebook/regenerator/blob/master/runtime.js">regenerator runtime</a>.
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-warning">
  <h4>Async functions</h4>
  <p>
    These are only usable if you enable experimental support. See <a href="/docs/usage/experimental">experimental usage</a> for information.
  </p>
</blockquote>

## Example

**In**

```javascript
function* foo() {
  yield 1;
}
```

**Out**

```javascript
var foo = regeneratorRuntime.mark(function foo() {
  return regeneratorRuntime.wrap(function foo$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return 1;

      case 2:
      case "end":
        return context$1$0.stop();
    }
  }, foo, this);
});
```
