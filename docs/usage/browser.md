---
layout: docs
title: Browser
description: How to compile in the browser.
permalink: /docs/usage/browser/
redirect_from: /browser.html
---

<blockquote class="babel-callout babel-callout-warning">
  <p>
    
  </p>
  <p>
    Compiling in the browser has a fairly limited use case, so if you are
    working on a production site you should be precompiling your scripts
    server-side. See <a href="/docs/setup/#build-systems">setup build systems</a>
    for more information.
  </p>
</blockquote>

## `babel-browser` has been removed.

Use a bundler like [browserify](https://babeljs.io/docs/setup/#browserify)/[webpack](https://babeljs.io/docs/setup/#webpack) or just `require('babel-core')`.

## [babel-standalone](https://github.com/Daniel15/babel-standalone)

If you don't want to do it yourself, you can also use [babel-standalone](https://github.com/Daniel15/babel-standalone) which is a pre-built babel with all of the presets and is used in the [Babel REPL](https://babeljs.io/repl).


