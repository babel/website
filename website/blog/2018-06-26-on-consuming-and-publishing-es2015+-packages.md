---
layout: post
title:  "On Consuming (and Publishing) ES2015+ Packages"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date:   2018-06-26 12:00:00
categories: announcements
share_text: "On Consuming (and Publishing) ES2015+ Packages"
---

For those of us that need to support older browsers, we run a compiler like Babel over application code. But that's not all of the code that we ship to browsers; there's also the code in our `node_modules`.

Can we make compiling our dependencies not just possible, but normal?

<!--truncate-->

The ability to compile dependencies is an enabling feature request for the whole ecosystem. Starting with some of the changes we made in Babel v7 to make selective dependency compilation possible, we hope to see it standardized moving forward.

## Assumptions

- We ship to modern browsers that support ES2015+ [natively](https://kangax.github.io/compat-table/es6/) (don't have to support IE) or are able to send multiple kinds of bundles (i.e. [by using `<script type="module">` and `<script nomodule>`](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) or ).
- Our dependencies actually publish ES2015+ instead of the current baseline of ES5/ES3.
- The future baseline shouldn't be fixed at ES2015, but is a changing target.

## Why

Why is compiling dependencies (as opposed to just compiling our own code) desirable in the first place?

- To have the freedom to make the tradeoffs of where code is able to run (vs. the library).
- To ship less code to users, since JavaScript has a [cost](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e).

## The Ephemeral JavaScript Runtime

The argument for why compiling dependencies would be helpful is the same for why Babel [eventually](https://github.com/babel/babel/pull/3476) introduced [`@babel/preset-env`](https://babeljs.io/docs/en/next/babel-preset-env.html). We saw that developers would eventually want to move past only compiling to ES5. 

Babel used to be [`6to5`](https://babeljs.io/blog/2017/10/05/babel-turns-three), since it only converted from ES2015 (known as ES6 back then) to ES5. Back then, the browser support for ES2015 was almost non-existent, so the idea of a JavaScript compiler was both novel and useful: we could write modern code, and have it work for all of our users.

But what about the browser runtimes themselves? Because evergreen browsers will eventually catch up to the standard (as they have with ES2015), creating `preset-env` helps Babel and the community align with both the browsers and TC39 itself. If we only compiled to ES5, no one would ever run native code in the browsers.

The real difference is realizing that there will _always_ be a sliding window of support:

- Application code (our supported environments)
- Browsers (Chrome, Firefox, Edge, Safari)
- Babel (the abstraction layer)
- TC39/ECMAScript proposals (and Babel implementations)

Thus, the need isn't just for `6to5` to be renamed to Babel because it compiles to `7to5`, but for Babel to change the implicit assumption it only targets ES5. With `@babel/preset-env`, we are able to write the latest JavaScript and target whichever browser/environment!

Using Babel and `preset-env` helps us keep up with that constantly changing sliding window. However, even if we use it, it's currently used only for *our application code*, and not for our code’s dependencies.

## Who Owns Our Dependencies?

Because we have control over our own code, we are able to take advantage of `preset-env`: both by writing in ES2015+ and targeting ES2015+ browsers.

This isn't necessarily the case for our dependencies; in order to get the same benefits as compiling our code we may need to make some changes.

Is it as straightforward as just running Babel over `node_modules`?

## Current Complexities in Compiling Dependencies

### Compiler Complexity

Although it shouldn't deter us from making this possible, we should be aware that compiling dependencies does increase the surface area of issues and complexity, especially for Babel itself.

- Compilers are no different than other programs and have bugs. 
- Not every dependency needs to be compiled, and compiling more files does mean a slower build.
- `preset-env` itself could have bugs because we use [`compat-table`](https://kangax.github.io/compat-table/es6/) for our data vs. [Test262](https://github.com/tc39/test262) (the official test suite).
- Browsers themselves can have issues with running native ES2015+ code vs. ES5.
- There is still a question of determining what is "supported": see [babel/babel-preset-env#54](https://github.com/babel/babel-preset-env/issues/54) for an example of an edge case. Does it pass the test just because it parses or has partial support?

#### Specific Issues in Babel v6

Running a `script` as a `module` either causes a `SyntaxError`, new runtime errors, or unexpected behavior due to the [differences in semantics](https://developers.google.com/web/fundamentals/primers/modules#intro) between classic scripts and modules.

Babel v6 viewed every file as a `module` and thus in ["strict mode"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

> One could argue this is actually a good thing, since everyone using Babel is opting in to strict mode by default 🙂.

Running Babel with a conventional setup on all our `node_modules` may cause issues with code that is a `script` such as a jQuery plugin.

An example of an issue is how [`this` gets converted to `undefined`](https://github.com/babel/babel/issues/7636).

```js
// Input
(function($) {
  // …
}(this.jQuery));
```

```js
// Output
"use strict";

(function ($) {
  // …
})(undefined.jQuery);
```

This was [changed in v7](https://github.com/babel/babel/pull/6280) so that it won't auto-inject the `"use strict"` directive unless the source file is a `module`.

It was also not in Babel's original scope to compile dependencies: we actually got issue reports that people would accidentally do it, making the build slower. There is a lot of defaults and documentation in the tooling that purposely disable compiling `node_modules`.

### Using Non-Standard Syntax

There are many issues with *shipping* uncompiled proposal syntax (this post was inspired by [Dan's concern](https://twitter.com/dan_abramov/status/1009179550134296577) about this).

#### Staging Process

The [TC39 staging process](https://tc39.github.io/process-document/) does not always move forward: a proposal can move to any point in the process: even moving backwards from Stage 3 to Stage 2 as was the case with Numeric Separators (`1_000`),  dropped entirely (`Object.observe()`, and others we may have forgotten 😁), or just stall like function bind (`a::b`) or decorators until recently.

- Summary of the Stages: Stage 0 has no criteria and means the proposal is just an idea, Stage 1 is accepting that the problem is worth solving, Stage 2 is about describing a solution in spec text, Stage 3 means the specific solution is thought out, and Stage 4 means that it is ready for inclusion in the spec with tests, multiple browser implementations, and in-the-field experience.

#### Using Proposals

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://t.co/femUb4vgxh">pic.twitter.com/femUb4vgxh</a></p>&mdash; Rach Smith 🌈 (@rachsmithtweets) <a href="https://twitter.com/rachsmithtweets/status/892478598765887488?ref_src=twsrc%5Etfw">August 1, 2017</a></blockquote>

We already recommend that people should be careful when using proposals lower than Stage 3, let alone publishing them.

But only telling people not to use Stage X goes against the whole purpose of Babel in the first place. A big reason why proposals gain improvements and move forward are because of the feedback the committee gets from real-world usage (whether in production or not) based on using it via Babel.

There is certainly a balance to be had here: we don't want to scare people away from using new syntax (that is a hard sell 😂), but we also don't want people to get the idea that "once it's in Babel, the syntax is official or immutable". Ideally people look into the purpose of a proposal and make the tradeoffs for their use case.

#### Removing the Stage Presets in v7

Even though one of the most common things people do is use the Stage 0 preset, we plan to remove the stage presets in v7. We thought at first it would be convenient, that people would make their own unofficial ones anyway, or it might help with "JavaScript fatigue". It seems to cause more of an issue: people continue to copy/paste configs without understanding what goes into a preset in the first place. 

After all, seeing `"stage-0"` says nothing. My hope is that in making the decision to use proposal plugins explicit, people will have to learn what non-standard syntax they are opting into. More intentionally, this should lead to a better understanding of not just Babel but of JavaScript as a language and its development instead of just its usage.

### Publishing Non-standard Syntax

As a library author, publishing non-standard syntax is setting our users up for possible inconsistencies, refactoring, and breakage of their projects. Because a TC39 proposal (even at Stage 3) has a possibility of changing, it means we will inevitability have to change the library code. A "new" proposal doesn't mean the idea is fixed or certain but rather that we collectively want to explore the solution space.

At least if we ship the compiled version, it will still work, and the library maintainer can change the output so that it compiles into code that works the same as before. Shipping the uncompiled version means that anyone consuming a package needs to have a build step to use it and needs to have the same configuration of Babel as us. This is in the same bucket as using TS/JSX/Flow: we wouldn't expect consumers to configure the same compiler environment just because we used them.

### Conflating JavaScript Modules and ES2015+

When we write `import foo from "foo"` or `require("foo")` and `foo` doesn't have an `index.js`, it resolves to the `main` field in the `package.json` of the module.

Some tools like Rollup/webpack also read from another field called `module` (previously `jsnext:main`). It uses this to instead resolve to the JS Module file.

- An example with [`redux`](https://github.com/reactjs/redux)

```js
// redux package.json
{
  ...
  "main": "lib/redux.js", // ES5 + Common JS
  "module": "es/redux.js", // ES5 + JS Modules
}
```

This was introduced so that users could consume JS Modules (ESM).

However, the sole intention of this field is ESM, not anything else. The [Rollup docs](https://github.com/rollup/rollup/wiki/pkg.module#wait-it-just-means-import-and-export--not-other-future-javascript-features) specify that the `module` field makes it clear that it's not intended for future JavaScript syntax.

Despite this warning, package authors invariably conflate the use of ES modules with the JavaScript language level they authored it in.

As such, we may need another way to signal the language level.

#### Non-scalable Solutions?

A common suggestion is for libraries to start publishing ES2015 under another field like `es2015`, e.g. `"es2015": "es2015/package.mjs"`.

```js
// @angular/core package.json
{
  "main": "./bundles/core.umd.js",
  "module": "./fesm5/core.js",
  "es2015": "./fesm2015/core.js",
  "esm5": "./esm5/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm5": "./fesm5/core.js",
  "fesm2015": "./fesm2015/core.js",
}
```

This works for ES2015, but it begs the question of what we should do about ES2016? Are we supposed to create a new folder for each year and a new field in `package.json`? That seems unsustainable, and will continue to produce larger `node_modules`.

> This was an issue with Babel itself: we had intended to continue to publish yearly presets (`preset-es2015`, `preset-es2016`..) until we realized that `preset-env` would remove that need.

Publishing it based on specific environments/syntax would seem to be just as untenable as the amount of combinations only increases (`"ie-11-arrow-functions"`).

What about distributing just the source itself? That may have similar problems if we used non-standard syntax as mentioned earlier.

Having a `esnext` field may not be entirely helpful either. The "latest" version of JavaScript changes depending on the point in time we authored the code.

### Dependencies May Not Publish ES2015+

This effort will only be standard if it becomes straightforward to apply as a library author. It will be hard to argue for the significance of this change if both new and popular libraries aren't able to ship the latest syntax.

Due to the complexity and tooling setup, it may be difficult for projects to publish ES2015+/ESM. This is probably the biggest issue to get right, and adding more documentation just isn't enough.

For Babel, we may need to add some feature requests to `@babel/cli` to make this easier, and maybe make the `babel` package do this by default? Or we should integrate better with tools like @developit's [microbundle](https://github.com/developit/microbundle).

And how do we deal with polyfills (this will be an upcoming post)? What would it look like for a library author (or the user) to not to have to think about polyfills?

With all that said, how does Babel help with all this?

## How Babel v7 Helps

As we've discussed, compiling dependencies in Babel v6 can be pretty painful. Babel v7 will address some of these pain points. 

One issue is around configuration lookup. Babel currently runs per file, so when compiling a file, it tries to find the closest config ([`.babelrc`](https://babeljs.io/docs/en/next/babelrc)) to know what to compile against. It keeps looking up the directory tree if it doesn't find it in the current folder.

```
project
└── .babelrc // closest config for a.js
└── a.js
└── node_modules
    └── package
        └── .babelrc // closest config for b.js
        └── b.js
```

We made a [few changes](https://github.com/babel/babel/pull/7358):

- One is to stop lookup at the package boundary (stop when we find a `package.json`). This makes sure Babel won't try to load a config file outside the app, the most surprising being when it finds one in the home directory.
- If we use a monorepo, we may want to have a `.babelrc` per-package that extends some other central config.
- Babel itself is a monorepo, so instead we are using the new `babel.config.js` which allows us to resolve all files to that config (no more lookup).

### Selective Compilation with `"overrides"`

We added an [`"overrides"`](https://github.com/babel/babel/pull/7091) option which allows us to basically create a new config for any set of file paths.

> This allows every config object to specify a `test`/`include`/`exclude` field, just like you might do for Webpack. Each item allows an item, or array of items that can be a `string`, `RegExp`, or `function`.

This allows us to have a single config for our whole app: maybe we want to compile our server JavaScript code differently than the client code (as well as compile some package(s) in `node_modules`).

```js
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
    }],
  ],
  overrides: [{
    test: ["./client-code", "./node_modules/package-a"],
    presets: [
      ['@babel/preset-env', { 
        targets: { "chrome": "60" } },
      }],
    ],
  }],
}
```

## Recommendations to Discuss

We should shift our fixed view of publishing JavaScript to one that keeps up with the latest standard.

We should continue to publish ES5/CJS under `main` for backwards compatibility with current tooling but also publish a version compiled down to latest syntax (no experimental proposals) under a new key we can standardize on like `main-es`. (I don't believe `module` should be that key since it was intended only for JS Modules).

> Maybe we should decide on another key in `package.json`, maybe `"es"`? Reminds me of the poll I made for [babel-preset-latest](https://twitter.com/left_pad/status/758429846594850816).

Compiling dependencies isn't just something for one project/company to take advantage of: it requires a push by the whole community to move forward. Even though this effort will be natural, it might require some sort of standardization: we can implement a set of criteria for how libraries can opt-in to publishing ES2015+ and verify this via CI/tooling/npm itself.

Documentation needs to updated to mention the benefits of compiling `node_modules`, how to do so for the library authors, and how to consume it in bundlers/compilers.

And with Babel 7, consumers can more safely use `preset-env` and opt-in to running on `node_modules` with new config options like `overrides`.

## Let's Do This!

Compiling JavaScript shouldn't be just about the specific ES2015/ES5 distinction, whether it's for our app or our dependencies! Hopefully this is an encouraging call to action re-starting conversations around using ES2015+ published dependencies more first-class.

This post goes into some of the ways Babel should help with this effort, but we'll need everyone's help to change the ecosystem: more education, more opt-in published packages, and better tooling.

---

> Thanks to the [many](https://twitter.com/left_pad/status/1010280464840617984) folks who offered to review this post including [@chrisdarroch](https://twitter.com/chrisdarroch), [@existentialism](https://twitter.com/existentialism), [@mathias](https://twitter.com/mathias), [@betaorbust](https://twitter.com/betaorbust), [@_developit](https://twitter.com/_developit), [@jdalton](https://twitter.com/jdalton), [@bonsaistudio](https://twitter.com/bonsaistudio).

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
