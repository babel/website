---
layout: docs
title: FAQ
description: Frequently Asked Questions and Answers
permalink: /docs/faq/
---

## What is the browser compatibility?

As a rule of thumb, IE9+. You can support IE8 by limiting yourself to a subset of ES6 features. The
[Caveats](/docs/advanced/caveats) page goes into the details of supporting legacy browsers.

## Why am I getting a syntax error when using `{ ...props }` and `async function foo() {}`?

You need to enable the [experimental option](/docs/usage/experimental).

## Why is the output of `for...of` so verbose and ugly?

This is necessary in order to comply with the spec as an iterators `return` method must be called on
errors. An alternative is to enable [loose mode](/docs/advanced/loose#abrupt-completions) but please note
that there are **many** caveats to be aware of if you enable loose mode and that you're willingly choosing
to be spec incompliant.

Please see [google/traceur-compiler#1773](https://github.com/google/traceur-compiler/issues/1773) and
[babel/babel/#838](https://github.com/babel/babel/issues/838) for more information.

## Why are `this` and `arguments` being remapped in arrow functions?

Arrow functions **are not** synonymous with normal functions. `arguments` and `this` inside arrow functions
reference their *outer function* for example:

```javascript
var user = {
  firstName: "Sebastian",
  lastName: "McKenzie",
  getFullName: () => {
    // whoops! `this` doesn't actually reference `user` here
    return this.firstName + " " + this.lastName;
  }
};
```

Please see [#842](https://github.com/babel/babel/issues/842), [#814](https://github.com/babel/babel/issues/814),
[#733](https://github.com/babel/babel/issues/733) and [#730](https://github.com/babel/babel/issues/730) for
more information.

## Why is `this` being remapped to `undefined`?

Babel assumes that all input code is an ES2015 module. ES2015 modules are implicitly strict mode so this means
that top-level `this` is not `window` in the browser nor is it `exports` in node.

If you don't want this behaviour then you have the option of disabling the `strict` transformer:

```sh
$ babel --blacklist strict script.js
```

```javascript
require("babel").transform("code", { blacklist: ["strict"] });
```

**PLEASE NOTE:** If you do this you're willingly deviating from the spec and this may cause future
interop issues.

See the [strict transformer docs](/docs/advanced/transformers/other/strict) for more info.

## How does Babel differ from other transpilers?

Many issues plague current transpilers, Babel takes a unique approach to many aspects.

### No runtime dependency

Many transpilers require a globally polluting polyfill and runtime. Babel has various ways
to avoid this, including concise code that utilises minimal inline helpers as well as
features such as [runtime](/docs/usage/runtime) that enable library authors to utilise ES2015
methods without the aforementioned polyfill.

### Readable output

Babel cares immensely about your output code. Not only should it not be bound to a bulky
runtime but it should always retain as much of the source formatting as possible
(newlines and comments).

### Source maps

Source maps are critical in the context of transpiled languages. This enables you to
seamlessly write and debug your code without worrying about what it turns into.

### Toggleable transformers

With support for ES2015 being implemented into engines at a rapid rate it's critical that
certain transformations have the ability to be turned off. With Babel **every single**
transformation can be turned off. Classes get supported in your target environment?
Simply disable it and reap the benefits of all the other transformers.

### Feature-rich

The Babel feature set is very comprehensive, supporting every ES2015 syntactic feature. With
built-in support for emerging standards such as [Flow](http://flowtype.org) and
[JSX/React](/docs/usage/jsx) it makes it extremely easy to integrate.

### Flexible

Babel is very flexible in it's usage, it has support for an extensive range of
[build systems](/docs/setup#build-systems) as well as for the
[browser](/docs/usage/browser), [node](/docs/setup#node-js) and [more!](/docs/setup#misc).

## What is a module formatter?

A module formatter is a transformer that turns exports and imports into their equivalent
target format. For example, the `common` module formatter transforms
`import { foo } from "bar";` into the CommonJS `var foo = require("bar").foo;`
