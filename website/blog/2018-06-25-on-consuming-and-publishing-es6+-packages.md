---
layout: post
title:  "On Consuming (and Publishing) ES6+ Packages"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date:   2018-06-25 12:00:00
categories: announcements
share_text: "On Consuming (and Publishing) ES6+ Packages"
---

How can we make compiling dependencies not just possible, but normal?

<!--truncate-->

This post is inspired by [Dan's tweet](https://twitter.com/dan_abramov/status/1009179550134296577) about how we can conflate shipping source code, ES6+, ESM

This is a pretty enabling feature request for the whole ecosystem, so I'm glad we've tried to make this easier in Babel v7 (I just realized this whole post is a good pitch for using it). Hopefully it can be made more standard moving forward (if we're collectively able to figure out some things I outline below).

## Why

Why is compiling your dependencies desirable in the first place (vs. just your own code)?

We can ship less code to users, since JavaScript has a [cost](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e).

## Assumptions

- You can ship to modern browsers (don't have to support IE) or are able to send multiple types of bundles (one way being [checking for script`type=module`](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)).
- And/or the dependencies actually publish ES6+ instead of ES5/ES3.

## Backing up a Bit: Talking About `preset-env`

If you think about it, the argument for why this would be helpful is the same for why we eventually introduced `@babel/preset-env`.

Babel used to be `6to5`, since it only converted from ES6 to ES5. Back then, the browser support for ES6 was almost non-existent so the idea of a JS compiler was an amazing contribution to our ecosystem.

I went through with implementing the preset even though there was so much complexity since it seemed to solve multiple issues for us. I didn't realize how much it would move us forward now that it's finally [surpassed `preset-es2015`](https://npm-stat.com/charts.html?package=babel-preset-es2015&package=babel-preset-env&from=2016-11-01&to=2018-06-22) which is a nice accomplishment.

When I think about Babel's role not just in moving the language itself forward but helping us develop websites better, I saw that we would eventually want to move past only compiling to ES5. Creating `preset-env` helps us align with the browsers since if we only compiled to ES5, no one would ever run native code in the browsers.

The real difference is realizing that there will _always_ be a sliding window of support: whether it's the JavaScript language that continues to move forward with new syntax, the browsers catching up with the standard, or the companies/projects themselves.

- You (your supported environments)
- Browsers (Chrome, Firefox, Edge, Safari)
- TC39/ECMAScript Proposals (and Babel implementations)

Thus the need isn't just for `6to5` to be renamed to Babel because it compiles to `7to5`, but for Babel to change the implicit assumption it only targets ES5. With `@babel/preset-env`, you are able to write the latest JavaScript and target whichever browser (environment) you want!

But assuming people even know it exists or have starting using it at all, it's mainly for your **application** code.

## Your Code

You have control over your own code to be able to take advantage of preset-env: write in ES6+ and target ES6+ browsers.

However, this isn't necessarily the case for your dependencies (though you _should_ take ownership of them).

## What Then?

The next step is to start thinking "how do we actually make this happen"?

Is it as straightforward as just running Babel over `node_modules` with the same configuration for your application?

## Caveats

### Using Non-Standard Syntax

This is what Dan was warning about. There are many issues with *shipping* uncompiled proposal syntax.

#### Using Proposals

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://t.co/femUb4vgxh">pic.twitter.com/femUb4vgxh</a></p>&mdash; Rach Smith 🌈 (@rachsmithtweets) <a href="https://twitter.com/rachsmithtweets/status/892478598765887488?ref_src=twsrc%5Etfw">August 1, 2017</a></blockquote>

We already recommend that people should be careful when using proposals lower than Stage 3, let alone publishing them.

But telling people not to use Stage X goes against the whole purpose of Babel in the first place. A big reason why proposals gain improvements and move forward are because of the feedback the committee gets from real-world usage (whether in production or not) based on using it via Babel.

There is certainly a balance to be had here. We don't want to scare people away from using new syntax (that is a hard sell 😂), but we also don't want people to get the idea that "once it's in Babel, the syntax is official or immutable". Ideally people look into the purpose of a proposal and make the tradeoffs for their use case.

One of the most common things people do is use the Stage 0 or Stage 2 presets. We plan to remove the stage presets in v7 after much back and forth. I thought at first it would be convienent, that people would make their own unofficial ones anyway, or it might help with "JavaScript fatigue". I find now that it just causes more of an issue: people continue to copy/paste configs with out understanding what goes into a preset in the first place. After all, seeing `"stage-0"` says nothing. My hope is that in making the decision to use proposal plugins explicit, people will have to learn what non-standard syntax they are opting into.

#### Staging Process

- The [TC39 staging process](https://tc39.github.io/process-document/) does not always move forward: there is the possibility for a proposal to move to any point in the process: even moving backwards from Stage 3 to Stage 2 as the case with Numeric Separators (`1_000`) or dropped entirely (`Object.observe()`, and others you may have forgotten)
- It can be hard to differentitate between the stages if you aren't involved: most people would advise that Stage 0-2 is unstable though.
- Summary: Stage 0 has no criteria and is just an idea, Stage 1 is accepting that the problem is worth solving, Stage 2 is about describing a solution in spec text, Stage 3 means the specific solution is thought out, and Stage 4 means that it is ready for inclusion with tests, multiple browser implementations, and in-the-field experience.

#### Publishing Non-standard Syntax

So actually publishing it in a library may cause even more issues. Because a TC39 proposal (even at Stage 3) has a possibility of changing, it means you will inevitability have to change the code.

At least if you ship the compiled version, it will still work and the library maintainer can change the output so that it works the same as before. Shipping the uncompiled version means that anyone consuming a package will necessarily have to have a build step to use it, and will have to have the same version of Babel as you. This is no different than using TS/JSX/Flow which you wouldn't publish either.

TODO: Or a proposal might just stall because people are busy, etc. Decorators are a great example of this.

### Conflating ESM and ES6+

When you do `import foo from "foo"` or `require("foo")` and `foo` doesn't have an `index.js`, it will resolve to the `main` field in the `package.json` of the module.

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

However, the sole intention of this field is ESM, not anything else. The [Rollup docs](https://github.com/rollup/rollup/wiki/pkg.module#wait-it-just-means-import-and-export--not-other-future-javascript-features) make it clear that it's not intended for future JavaScript syntax.

What this means is that we may need another way to handle ES6+ even though some libraries may choose to do this anyway.

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

This works for ES2015 but the question next is what about ES2016? Are we supposed to create a new folder for each year and a new field in `package.json`? That seems unsustainable, and will continue to produce larger `node_modules`.

I feel like this is similar to how we had a Babel preset for each year and ended up creating `preset-latest` which included all the yearly plugins (we removed that soon after in favor of `preset-env`).

Having a field like `es-latest` or `esnext` may not be helpful either because we want the library versions to be fixed yet changing. And providing only the source may not always be helpful if you use non-standard syntax, TS, Flow, JSX, etc which might have different behavior based on compiler version. Maybe we need some changes on the `npm` side?

One suggestion is to provide an ES5 version but also publish a version that includes the latest standard syntax so it can be compiled with `preset-env`.

### Dependencies May Not Publish ES6+

TODO:

- Due to complexity and tooling, it may be difficult for projects to publish ES6/ESM without more setup. This is probably the biggest issue to get right, even docs aren't enough. We should add some feature requests to `@babel/cli` to make this easier, and maybe make the `babel` package do this by default? Tools like @developit's [microbundle](https://github.com/developit/microbundle) may help a lot with this.
- How do we deal with polyfills? This could be it's own post (I never finished it). Mention `preset-env` + polyfills. What would it look like for a library author not to have to think about polyfills (or the user).

### Compiler Complexity

Every compiler has bugs, although the risk is lower if there are so many users and sufficient tests. We should just be aware that compiling dependencies does increase the surface area of potential bugs, but I don't believe that should deter us from making this a common practice.

- Babel v6 assumed everything that it compiled was a module and thus in strict mode (one could argue this is actually a good thing). Thus if you tried to run Babel on all your `node_modules` and it encountered something that was a `script` like a jQuery plugin it might cause a lot of issues. This is changed in v7 so that it won't always auto inject the `"use strict"` directive unless it actually is a module.
- React Native has always compiled `node_modules` by default and has probably learned a lot from issues like ^.
- `preset-env` could have its own bugs because we use `compat-table` vs. test262.
- Browsers themselves can have issues with running native ES6+ code vs. ES5.
- Question of how do we determine what is "supported": https://github.com/babel/babel-preset-env/issues/54 example of edge case.

### Help with Babel v7 Config

It can be pretty painful to compile `node_modules` in Babel v6. The reason is both that we never thought of it as something we wanted as well as getting issue reports that people would actually accidently do it making the build slower.

One issue (which we have fixed in v7) is around config lookup. Babel currently runs per file so when compiling a file, it tries to find the closest config to know what to compile against. If it doesn't find it in the same directory, it keeps looking up directories (this is why if you don't specify a config but have one in your home directory it might try to load that instead).

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

- One is to stop lookup at the package boundary (stop when you find a `package.json`). This makes sure Babel won't try to load a config file outside.
- If you use a monorepo, you'll may want to have a `.babelrc` per-package that extends some other central config.
- Babel itself is a monorepo, so instead we are using the new `babel.config.js` which allows you to resolve all files to that config (no more lookup).
- We added an [`"overrides"`](https://github.com/babel/babel/pull/7091) option which allows you to basically create a new config for any set of paths.

This allows you to have a single config for your whole app: maybe you want to compile your server JavaScript code differently than the client code as well as compile something in `node_modules`.

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

### Let's Do This!

Hopefully this is an encouraging call to action for looking into moving forward to make compiling dependencies more first class. It's not just about the specific ES6/ES5 distinction.

Babel v7 should be out soon, this post goes into some of the ways it should help with this effort but we'll need everyone's help to change the ecosystem (more education, published packages that do this, and better tooling and sustainability).

Maybe we should decide on another key in `package.json`, maybe `"es"`? Reminds me of the poll I made for [babel-preset-latest](https://twitter.com/left_pad/status/758429846594850816).

Potential recommendation: package authors should also publish a version compiled down to latest syntax (no experimental proposals) under a new key we can standardize on (I don't believe `module` should be that key) but continue to publish ES5 under `main`. Consumers can use `preset-env` and opt-in into running on `node_modules`.

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
