---
layout: docs
title: FAQ
description: Frequently Asked Questions and Answers
permalink: /docs/faq/
---

## What is a transformer?

A transformer is a module that is ran against your code that transforms it. For example,
the `arrowFunctions` transformer has the very specific goal of transforming
[ES6 Arrow Functions](/docs/tour#arrows) to the equivalent ES3. This allows transformers to be disabled and enabled at will which is critical in the
current fast paced development environment.

## Why are there `Array.from` and `Object.assign` calls in my code?! These functions don't exist!

This is a known [caveat](/docs/caveats). This is because 6to5 compiles to ES3 syntax but with
ES5 and ES6 methods. This is essential to emulate a complete ES6 environment so your code
wont break! You see, ES6 features such as [iterators](/docs/tour#iterators) and
[symbols](/docs/tour#symbols) require a lot of logic to work, and to accurately support these
it would mean **a lot** of boilerplate smoshed into your codebase. This is the approach taken
by other transpilers but 6to5 approaches it quite differently.

You have two options, depending on your use case:

 - Use the wonderful [core aliasing optional transformer](/docs/usage/transformers#core-aliasing). This is recommended if you're writing a library.
 - Or use the bundled 6to5 [polyfill](/docs/usage/polyfill). This is recommended if you're writing an entire application.

## How does 6to5 differ from other transpilers?

Many issues plague current transpilers, 6to5 takes a unique approach to many aspects.

### No runtime dependency

Many transpilers require a globally polluting polyfill and runtime. 6to5 has various ways
to avoid this, including concise code that utilises minimal inline helpers as well as
features such as [coreAliasing](/docs/usage/transformers#core-aliasing) that enable library
authors to utilise all 6to5 features without the aforementioned polyfill.

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
[JSX/React](/docs/usage/jsx) it makes it extremely to integrate.
