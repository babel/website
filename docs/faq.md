---
layout: docs
title: FAQ
description: Frequently Asked Questions and Answers
permalink: /docs/faq/
---

## What is the browser compatibility?

As a rule of thumb, IE9+. You can support IE8 by limiting yourself to a subset of ES6 features. The
[Caveats](/docs/usage/caveats) page goes into the details of supporting legacy browsers.

## How does babel differ from other transpilers?

Many issues plague current transpilers, babel takes a unique approach to many aspects.

### No runtime dependency

Many transpilers require a globally polluting polyfill and runtime. babel has various ways
to avoid this, including concise code that utilises minimal inline helpers as well as
features such as [selfContained](/docs/usage/runtime) that enable
library authors to utilise ES6 methods without the aforementioned polyfill.

### Readable output

babel cares immensely about your output code. Not only should it not be bound to a bulky
runtime but it should always retain as much of the source formatting as possible
(newlines and comments).

### Source maps

Source maps are critical in the context of transpiled languages. This enables you to
seamlessly write and debug your code without worrying about what it turns into.

### Toggleable transformers

With support for ES6 being implemented into engines at a rapid rate it's critical that
certain transformations have the ability to be turned off. With babel **every single**
transformation can be turned off. Classes get supported in your target environment?
Simply disable it and reap the benefits of all the other transformers.

### Feature-rich

As you can tell by the [comparison page](/docs/compare#comparison-to-other-transpilers),
the babel featureset is very comprehensive, supporting every ES6 syntactic feature. With
built-in support for emerging standards such as [Flow](http://flowtype.org) and
[JSX/React](/docs/usage/jsx) it makes it extremely easy to integrate.

### Flexible

Babel is very flexible in it's usage, it has support for an extensive range of
[build systems](/docs/using-babel#build-systems) as well as for the
[browser](/docs/usage/browser), [node](/docs/using-babel#node-js) and [more!](/docs/using-babel#misc).

## What is a transformer?

A transformer is a module that is ran against your code that transforms it. For example,
the `arrowFunctions` transformer has the very specific goal of transforming
[ES6 Arrow Functions](/docs/learn-es6#arrows) to the equivalent ES3. This allows transformers to be disabled and enabled at will which is critical in the
current fast paced development environment.

## What is a module formatter?

A module formatter is a transformer that turns exports and imports into their equivalent
target format. For example, the `common` module formatter transforms
`import { foo } from "bar";` into the CommonJS `var foo = require("bar").foo;`
