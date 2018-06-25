---
layout: post
title:  "On Consuming (and Publishing) ES2015+ Packages"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date:   2018-06-25 12:00:00
categories: announcements
share_text: "On Consuming (and Publishing) ES2015+ Packages"
---

How can we make compiling our dependencies not just possible, but normal?

<!--truncate-->

The ability to compile dependencies is an enabling feature request for the whole ecosystem. Starting with some of the changes we made in Babel v7, we hope to see it standardized moving forward.

## Assumptions

- We believe compiling our own app code is useful.
- We can and will ship to modern browsers that support ES2015+ [natively](https://kangax.github.io/compat-table/es6/) (don't have to support IE) or are able to send multiple kinds of bundles (i.e. [checking for script`type=module`](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)).
- Our dependencies actually publish ES2015+ instead of the current baseline of ES5/ES3.
- The future baseline shouldn't be fixed at ES2015, but is a changing target.

## Why

Why is compiling dependencies desirable in the first place (vs. our own code)?

- To have the freedom to make the tradeoffs of where code is able to run (vs. the library).
- To ship less code to users, since JavaScript has a [cost](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e).

## The Ephemeral JavaScript Runtime

The argument for why compiling dependencies would be helpful is the same for why Babel [eventually](https://github.com/babel/babel/pull/3476) introduced [`@babel/preset-env`](https://babeljs.io/docs/en/next/babel-preset-env.html). We saw that developers would eventually want to move past only compiling to ES5. 

Babel used to be [`6to5`](https://babeljs.io/blog/2017/10/05/babel-turns-three), since it only converted from ES2015 to ES5. Back then, the browser support for ES2015 was almost non-existent, so the idea of a JavaScript compiler was both novel and useful: we could write modern code and have it work for all of our users.

But what about the browser runtimes themselves? Because evergreen browsers will eventually catch up to the standard (and they have with ES2015), creating `preset-env` helps Babel and the community align with both the browsers and TC39 itself. If we only compiled to ES5, no one would ever run native code in the browsers.

The real difference is realizing that there will _always_ be a sliding window of support:

- Application code (our supported environments)
- Browsers (Chrome, Firefox, Edge, Safari)
- Babel (the abstraction layer)
- TC39/ECMAScript Proposals (and Babel implementations)

Thus the need isn't just for `6to5` to be renamed to Babel because it compiles to `7to5`, but for Babel to change the implicit assumption it only targets ES5. With `@babel/preset-env`, we are able to write the latest JavaScript and target whichever browser (environment)!

Using Babel and `preset-env` helps us keep up with that constantly changing sliding window. However, even if we use it, it's currently used for *our application code* and not what our code depends upon.

## Who Owns Our Dependencies?

Because we have control over our own code, we are able to take advantage of `preset-env`: both by writing in ES2015+ and targeting ES2015+ browsers.

This isn't necessarily the case for our dependencies; in order to get the same benefits as compiling our code we may need to make some changes.

Is it as straightforward as just running Babel over `node_modules`?

## The Current Complexities in Compiling Dependencies

### Compiler Complexity

Although it shouldn't deter us from making this a common practice, we should be aware that compiling dependencies does increase the surface area of issues and complexity.

- Compilers are no different than other programs and has bugs. 
- `preset-env` itself could have because we use [`compat-table`](https://kangax.github.io/compat-table/es6/) for our data vs. [test262](https://github.com/tc39/test262) (the official test suite).
- Browsers themselves can have issues with running native ES2015+ code vs. ES5.
- There is still a question of determining what is "supported": https://github.com/babel/babel-preset-env/issues/54 is an example of an edge case.

#### Specific Issues in v6

Running a `script` as a `module` will either cause a `SyntaxError`, new runtime erorrs, or unexpected behavior due to the differences in semantics.

Babel v6 viewed every file as a `module` and thus in ["strict mode"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

> One could argue this is actually a good thing, since everyone using Babel will be opt-ing into strict mode by default 🙂.

Running Babel with a conventional setup on all our `node_modules` may cause issues with code that is a `script` such as a jQuery plugin.

An example of an issue is how [`this` gets converted to `undefined`](https://github.com/babel/babel/issues/7636).

```js
// Input
(function($) {
  // ...
}(this.jQuery));
```

```js
// Output
"use strict";

(function ($) {
  // ...
})(undefined.jQuery);
```

This was [changed in v7](https://github.com/babel/babel/pull/6280) so that it won't auto inject the `"use strict"` directive unless it actually is a `module`.

It was also not in Babel's original scope to compile dependencies: we actually got issue reports that people would accidently do it, making the build slower. So there may be a lot of defaults and documentation in the tooling that purposely not allow compiling `node_modules`.

### Using Non-Standard Syntax

There are many issues with *shipping* uncompiled proposal syntax (this post was inspired by [Dan's concern](https://twitter.com/dan_abramov/status/1009179550134296577) about this).

#### Staging Process

The [TC39 staging process](https://tc39.github.io/process-document/) does not always move forward: a proposal can move to any point in the process: even moving backwards from Stage 3 to Stage 2 as the case with Numeric Separators (`1_000`),  dropped entirely (`Object.observe()`, and others we may have forgotten 😁), or just stall like function bind (`a::b`) or decorators until recently.

- Summary of the Stages: Stage 0 has no criteria and is just an idea, Stage 1 is accepting that the problem is worth solving, Stage 2 is about describing a solution in spec text, Stage 3 means the specific solution is thought out, and Stage 4 means that it is ready for inclusion with tests, multiple browser implementations, and in-the-field experience.

#### Using Proposals

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://t.co/femUb4vgxh">pic.twitter.com/femUb4vgxh</a></p>&mdash; Rach Smith 🌈 (@rachsmithtweets) <a href="https://twitter.com/rachsmithtweets/status/892478598765887488?ref_src=twsrc%5Etfw">August 1, 2017</a></blockquote>

We already recommend that people should be careful when using proposals lower than Stage 3, let alone publishing them.

But only telling people not to use Stage X goes against the whole purpose of Babel in the first place. A big reason why proposals gain improvements and move forward are because of the feedback the committee gets from real-world usage (whether in production or not) based on using it via Babel.

There is certainly a balance to be had here: we don't want to scare people away from using new syntax (that is a hard sell 😂), but we also don't want people to get the idea that "once it's in Babel, the syntax is official or immutable". Ideally people look into the purpose of a proposal and make the tradeoffs for their use case.

#### Removing the Stage Presets in v7

Even though one of the most common things people do is use the Stage 0 preset, we plan to remove the stage presets in v7. We thought at first it would be convienent, that people would make their own unofficial ones anyway, or it might help with "JavaScript fatigue". It seems to cause more of an issue: people continue to copy/paste configs with out understanding what goes into a preset in the first place. 

After all, seeing `"stage-0"` says nothing. My hope is that in making the decision to use proposal plugins explicit, people will have to learn what non-standard syntax they are opting into. More intentionality should lead to a better understanding of not just Babel but JavaScript the language and it's development instead of just it's usage.

### Publishing Non-standard Syntax

As a library author, publishing non-standard syntax is setting our users up for possible inconsistencies, refactoring, and breakage of their projects. Because a TC39 proposal (even at Stage 3) has a possibility of changing, it means we will inevitability have to change the library code.

At least if we ship the compiled version, it will still work and the library maintainer can change the output so that it works the same as before. Shipping the uncompiled version means that anyone consuming a package will necessarily have to have a build step to use it, and will have to have the same configuration of Babel as us. This is in the same bucket as using TS/JSX/Flow: we wouldn't expect consumers to configure the same compiler environment just because we used them.

### Conflating ESM and ES2015+

When we write `import foo from "foo"` or `require("foo")` and `foo` doesn't have an `index.js`, it will resolve to the `main` field in the `package.json` of the module.

Some tools like Rollup/Webpack will also read from another field called `module` (previously `jsnext:main`). It uses this to instead resolve to the ESM file.

- An example with [`redux`](https://github.com/reactjs/redux)

```js
// redux package.json
{
  ...
  "main": "lib/redux.js", // ES5 + CJS
  "module": "es/redux.js", // ES5 + ESM
}
```

This was introduced so that users could consume ES2015 modules (ESM).

However, the sole intention of this field is ESM, not anything else. The [Rollup docs](https://github.com/rollup/rollup/wiki/pkg.module#wait-it-just-means-import-and-export--not-other-future-javascript-features) that specify the `module` field make it clear that it's not intended for future JavaScript syntax.

Despite this warning, package authors invariably conflate the use of ES modules with the JavaScript language level they authored it in.

As such, we may need another way to signal the language level.

#### Non-scalable Solutions?

A common suggestion is for libraries to start publishing ES2015 under another field like `es2015`, e.g. `"es2015": "es2015/redux.js"`.

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

This effort will only be standard if it becomes straightfoward to do as a library author. It will be hard to argue for the significance of this change if both new and popular libraries aren't able to ship the latest syntax.

Due to the complexity and tooling setup, it may be difficult for projects to publish ES2015+/ESM. This is probably the biggest issue to get right, and more documentation just isn't enough.

For Babel, we may need to add some feature requests to `@babel/cli` to make this easier, and maybe make the `babel` package do this by default? Or we should integrate better with tools like @developit's [microbundle](https://github.com/developit/microbundle).

And how do we deal with polyfills (this will be an upcoming post)? What would it look like for a library author not to have to think about polyfills (or the user).

With all that said, how does Babel help with all this?

## How Babel v7 Helps

As we've discussed, compiling dependencies in Babel v6 can be pretty painful. Babel v7 will address some of these pain points. 

One issue is around configuration lookup. Babel currently runs per file so when compiling a file, it tries to find the closest config ([`.babelrc`](https://babeljs.io/docs/en/next/babelrc)) to know what to compile against. It will keep looking up the directory tree if it doesn't find it in the current folder.

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

- One is to stop lookup at the package boundary (stop when we find a `package.json`). This makes sure Babel won't try to load a config file outside the app, the most surprising being with it finds one in your home directory.
- If we use a monorepo, we'll may want to have a `.babelrc` per-package that extends some other central config.
- Babel itself is a monorepo, so instead we are using the new `babel.config.js` which allows us to resolve all files to that config (no more lookup).
- We added an [`"overrides"`](https://github.com/babel/babel/pull/7091) option which allows us to basically create a new config for any set of paths.

This allows us to have a single config for our whole app: maybe we want to compile our server JavaScript code differently than the client code as well as compile something in `node_modules`.

```js
// babel.config.js
module.exports = {
  presets: [
    ['env', { 
      targets: { node: 'current' },
    }],
  ],
  overrides: [{
    test: "./client",
    presets: [
      ['env', { 
        targets: { browsers: ["last 2 versions"] },
      }],
    ],
  }, {
    test: "./node_modules/",
    presets: [
      ['env', { 
        targets: { browsers: ["last 2 versions"] },
      }],
    ],
  }],
}
```

## Recommendation to Discuss

My recommendation is that package authors should continue to publish ES5/CJS under `main` for backwards compat with current tooling and workflow but also publish a version compiled down to latest syntax (no experimental proposals) under a new key we can standardize on like `main-es` (I don't believe `module` should be that key).

> Maybe we should decide on another key in `package.json`, maybe `"es"`? Reminds me of a poll I made for [babel-preset-latest](https://twitter.com/left_pad/status/758429846594850816).

Compiling dependencies isn't just something for one project/company to take advantage of: it requires a push by the whole community to move forward. Even though this effort will be natural, it might require some sort of standardization: we can implement a set of criteria for how librarys can opt-in to publishing ES2015+ and verify this via CI/tooling/npm itself.

Documentation needs to updated to mention the benefits of compiling `node_modules`, how to do so for the library authors, and how to consume it in bundlers/compilers.

With Babel 7, consumers can more safely use `preset-env` and opt-in into running on `node_modules` with new config options like `overrides`.

## Let's Do This!

Hopefully this is an encouraging call to action for looking into moving forward to make compiling dependencies more first class. It's not just about the specific ES2015/ES5 distinction.

Babel v7 should be out soon. This post goes into some of the ways it should help with this effort but we'll need everyone's help to change the ecosystem: more education, published packages that do this, and better tooling and sustainability.

> Thanks to the [many](https://twitter.com/left_pad/status/1010280464840617984) folks who offered to review this post including [@chrisdarroch](https://twitter.com/chrisdarroch), [@existentialism](https://twitter.com/existentialism), [@betaorbust](https://twitter.com/betaorbust), [@_developit](https://twitter.com/_developit), [@jdalton](https://twitter.com/jdalton), [@bonsaistudio](https://twitter.com/bonsaistudio).

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
