---
layout: docs
title: FAQ
description: Frequently Asked Questions and Answers
permalink: /docs/faq/
---

## How does 6to5 differ from other transpilers?

Many issues plague current transpilers, 6to5 takes a unique approach to many aspects.

### No runtime dependency

Many transpilers require a globally polluting polyfill and runtime. 6to5 has various ways
to avoid this, including concise code that utilises minimal inline helpers as well as
features such as [selfContained](/docs/usage/transformers#self-contained) that enable
library authors to utilise ES6 methods without the aforementioned polyfill.

### Readable output

6to5 cares immensely about your output code. Not only should it not be bound to a bulky
runtime but it should always retain as much of the source formatting as possible
(newlines and comments).

### Source maps

Source maps are critical in the context of transpiled languages. This enables you to
seamlessly write and debug your code without worrying about what it turns into.

### Toggleable transformers

With support for ES6 being implemented into engines at a rapid rate it's critical that
certain transformations have the ability to be turned off. With 6to5 **every single**
transformation can be turned off. Classes get supported in your target environment?
Simply disable it and reap the benefits of all the other transformers.

### Feature-rich

As you can tell by the [comparison page](/docs/compare#comparison-to-other-transpilers),
the 6to5 featureset is very comprehensive, supporting every ES6 syntactic feature. With
built-in support for emerging standards such as [Flow](http://flowtype.org) and
[JSX/React](/docs/usage/jsx) it makes it extremely easy to integrate.

### Flexible

The 6to5 compiler is very flexible in it's usage, it has support for an extensive range
of [build systems](/docs/using-6to5#build-systems) as well as for the
[browser](/docs/usage/browser), [node](/docs/using-6to5#node-js) and [more!](/docs/using-6to5#misc).

## What is a transformer?

A transformer is a module that is ran against your code that transforms it. For example,
the `arrowFunctions` transformer has the very specific goal of transforming
[ES6 Arrow Functions](/docs/learn-es6#arrows) to the equivalent ES3. This allows transformers to be disabled and enabled at will which is critical in the
current fast paced development environment.

## What is a module formatter?

A module formatter is a transformer that turns exports and imports into their equivalent
target format. For example, the `common` module formatter transforms
`import { foo } from "bar";` into the CommonJS `var foo = require("bar").foo;`

## Why are there `Array.from` and `Symbol` in my code?! These don't exist!

This is a known [caveat](/docs/caveats). This is because 6to5 compiles to ES3 syntax but with
ES5 and ES6 methods. This is essential to emulate a complete ES6 environment so your code
wont break! You see, ES6 features such as [iterators](/docs/learn-es6#iterators) and
[symbols](/docs/learn-es6#symbols) require a lot of logic to work, and to accurately support these
it would mean **a lot** of boilerplate smoshed into your codebase. This is the approach taken
by other transpilers but 6to5 approaches it quite differently.

You have two options, depending on your use case:

 - Use the wonderful [core aliasing optional transformer](/docs/usage/transformers#core-aliasing). This is recommended if you're writing a library.
 - Or use the bundled 6to5 [polyfill](/docs/usage/polyfill). This is recommended if you're writing an entire application.

## Can 6to5 be installed on Windows?

Yes! During `npm install 6to5`, you might get some errors regarding a module
called `kexec`, this module is optional and it's perfectly fine to simply ignore these
errors.

Alternativly, you can invoke npm with `--no-optional`:

```sh
$ npm install 6to5 --no-optional
```
