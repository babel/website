---
layout: docs
title: Browser
description: How to compile in the browser.
permalink: /docs/usage/browser/
redirect_from: /browser.html
---

<p class="lead">
  A browser version of Babel is available from <code>browser.js</code> inside a <code>babel-core</code> npm release
</p>

<blockquote class="babel-callout babel-callout-warning">
  <h4>Not intended for serious use</h4>
  <p>
    Compiling in the browser has a fairly limited use case, so if you are
    working on a production site you should be precompiling your scripts
    server-side. See <a href="/docs/setup/#build-systems">setup build systems</a>
    for more information.
  </p>
</blockquote>

## Script tags

When the `browser.js` file is included all scripts with the type
`text/ecmascript-6` and `text/babel` are automatically compiled and run.

```html
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
class Test {
  test() {
    return "test";
  }
}

var test = new Test;
test.test(); // "test"
</script>
```

## API

Programmatically compile and execute strings of ES6 code.

See [options](/docs/usage/options/) for additional documentation.

### `babel.transform(code, [opts])`

```js
babel.transform("class Test {}").code;
```

### `babel.run(code, [opts])`

````js
babel.run("class Test {}");
````
