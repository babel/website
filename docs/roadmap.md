---
id: roadmap
title: Babel Roadmap
sidebar_label: Roadmap
---

This document outlines some of the improvements our team members would like to work on during this year.

This is far from being a complete list of all the new features or important changes that we'll bring to Babel, but it's a good summary if you are interested in the general direction that the project is moving toward. We may not actually finish every listed point or may delay some of them to the next year. Some of them have clear starting and ending points, while others need more research or [RFCs](https://github.com/babel/rfcs).

If your company is interested and would like to directly sponsor any particular item please [reach out](mail:team@babeljs.io)!

## Babel 2021 Roadmap

### Babel 8

We have been talking about the Babel 8 release for more than one year (we initially scheduled it about one year ago)! However, we are now closer then ever to it's release!

Most of the remaining tasks are in the [tracking issue](https://github.com/babel/babel/issues/10746), but there are still a few blockers:
- We want to drop support for [Node.js 10](https://github.com/nodejs/Release), which stops being maintained on 2021-04-30.
- We would like to release Babel as a pure ESM package. We are now in the process of converting our sources to be compatible with Node.js' ESM implementation, and while doing so, we are examining how we can make it easier for people that currently use Babel to compile ESM to CJS.
- We are trying to align our TypeScript AST with the [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint/) project. Our ASTs are _almost_ identical, but we need to introduce some small breaking changes to fully align.
- Our release infrastructure doesn't support yet pre-releases, or using multiple "main" branches (one for Babel 8 and one for Babel 7).
- We haven't figured out yet a policy for Babel 7 maintenance.

### Implement new TC39 proposals

Babel can currently parse all the Stage 3 proposals, and we can transform all of them except for top-level await, import assertions and JSON modules (which are best handled by bundlers working with the dependencies graph).

We support all the Stage 2 proposals except for:
- The new iteration of the decorators proposal (we need to implement both parsing and transform);
- Transform for the Module Blocks proposal (we implemented parsing in Babel 7.13.0).

We will implement support for decorators, and investigate if and how we can implement a transform for module blocks.

While we don't support many Stage 1 proposals, there have been recent updates to the pipeline operator and to do expressions. Since we already support those proposals and the community is quite excited about them, we will update our implementations.

There are also other proposals (such as pattern matching) that we have not yet implemented because their champions expect to do significant changes to the syntax and semantics. However, we are closely following their development, and will implement them in Babel as soon as they stabilize a bit.

### Move `@babel/preset-env` into `@babel/core`

A minimal Babel transforming setup requires at least three packages:
- `@babel/core`
- `@babel/preset-env`
- a Babel "runner" (`@babel/cli`, `babel-loader`, `@rollup/plugin-babel`, etc)

Moving `@babel/preset-env` directly into `@babel/core` has two big advantages:

- It will be easier to configure Babel in simple projects, you would only need to enable a `compileJS: true` option in `babel.config.json` (or it could even be the default in the future -- it can't be default as `@babel/eslint-parser` does not compile the source)
- It will make sure that the plugin versions are in sync with the `@babel/core` version, avoiding most of the bugs caused by mismatched/incompatible packages versions
- When we move to ESM, it will be hard to resolve and load plugin synchronously in `transformSync`. This prevents it from being a problem.

There is already [a RFC](https://github.com/babel/rfcs/pull/10) to move _plugins_ for stable ECMAScript features in `@babel/core`, which is the first step in this direction.

With our current `@babel/preset-env` architecture, we would need to specially handle official plugins to automatically enable or disable them based on `targets`.
However, this has two drawbacks:
- Compatibility data for a specific plugin is completely separated from the plugin implementation (it's not even a dependency, more something like an internal implicit peer dependency: plugin -> @babel/core -> @babel/compat-data);
- Official plugins would get special treatment from `@babel/core`, but we want to make sure that third-party plugins have the same capabilities as official plugins.

### Continue developing the `babel-polyfills` project

We have already decided to remove the older `core-js@2` support from `@babel/preset-env` in Babel 8. We also want to stop promoting a specific third-party polyfill, which might give our users the impression that it's part of Babel itself.

This might happen in two different ways:
- We just remove `core-js@3` from `@babel/preset-env` in Babel 8, encouraging users to migrate to `babel-plugin-polyfill-corejs3` (which is what `@babel/preset-env` internally uses starting from version 7.10.0)
- We can keep `core-js@3` support in `@babel/preset-env`, but not migrate it to `@babel/core` when we'll move the transform plugins.

Whichever path we take, we would like to offer at least one alternative to our users when they'll need to update the `core-js` integration in their configuration. `core-js` is a really good polyfill that ensures the highest possible spec compliancy, but users may prefer different trade-offs.

([Nicolò](https://github.com/nicolo-ribaudo)) is working with [@ljharb](https://github.com/ljharb) to make sure that the [`@es-shims` project](https://github.com/es-shims/) supports at least all the ES2015+ features (we actually aim for ES5+), so that Babel users are free to choose to between at least two options.

This needs to happen _before_ dropping built-in support for `core-js@3`, so that people interested in `es-shims` don't have to migrate twice.

### Expand `targets` usage for granular transforms

Since the beginning, `@babel/preset-env` has used the `targets` option to automatically enable or disable transform plugins.

However, there isn't a 1-to-1 mapping between Babel plugins and features implemented in browsers.

For example, we have a single plugin for the different class fields types (public and private, static and instance), but browsers have varying compatibility matrices:

- Firefox 73 and Safari 14 support only public instance fields
- Firefox 75+ supports public instance and static fields
- Chrome 79+ supports public and private fields, but doesn't support private fields in some optional chaining expressions
- Chrome 84+ fully supports private fields, and also private methods
- Safari TP 121 fully supports private fields (even with `?.`), but it doesn't support private methods

Creating a plugin for each feature is sub-optimal. For example, we can convert private methods to private fields and then, if needed, convert them to older syntax. However, we can generate better/optimized output by directly converting private methods down to older syntax without the intermediate step if we know that it needs to be transpiled down.

Since Babel 7.13.0, we can read the `targets` option directly inside a plugin, we can modify our plugins to automatically perform a _partial_ compilation of a given ECMAScript feature, which would give advantages in the output size and runtime performance.

**Prior Art**

This approach isn't completely new. Thanks to a collaboration with [@_developit](https://twitter.com/_developit), in Babel 7.9.0 we introduced a new `bugfixes: true` option for `@babel/preset-env`. When this option is enabled, and when using `esmodules: true` as the compilation target, we only partially compile [some features](https://github.com/babel/preset-modules#features-supported). This what made us initially think about this possibility, but the current partial transforms are less useful when using more modern targets (for example, `defaults, not ie 11`).

We also already use the `targets` option to decide whether we can use `Object.assign` when compiling object spread or not.

**Action Points**

This goal can be split into two big tasks that can be done in parallel:
- We need to identify *where* these optimizations can be useful by collecting real-world browserslist queries and by simulating how popular queries (for example, `defaults` or `>2%, not dead`) will evolve in the future.
- We need to actually implement the necessary optimizations, making sure that they still work well with the other plugins (since they would highly increase the number of possible transform combinations).

### Investigate new compiler `assumptions`

In Babel 7.13.0 we introduced a new top-level [`assumptions`](https://babeljs.io/docs/en/options#assumptions) option, to formalize what the `loose` mode option does and offer more granular control to our users (since often they can only enable _some_ assumptions and not all of them).

However, we only included options for assumptions we _already_ made when compiling in `loose` mode. We can now investigate what new assumptions our users might need.

The are already some proposals, such as:
- [#8222](https://github.com/babel/babel/issues/8222) - assume that all the ESM imports are actually immutable, avoiding the code needed for live bindings.
- [#11356](https://github.com/babel/babel/issues/11356) - assume that compiled classes do not extends native classes, avoiding the runtime performance cost needed to instantiate possibly native classes.

We can find which new assumptions we should implement, by:
- Manually checking which features we compile to "non-obvious" output, which is usually caused by edge cases that many developers don't care about.
- Ask for feedback from the community, since developers can test which assumptions work and which don't on their applications.

### Overhaul the Babel REPL

The Babel REPL is a convenient playground to learn how Babel transpiles source code.

Current limits:

- The REPL does not support `assumptions` config. Although we have a dedicated per-assumption basis mini REPL on https://babel.dev/assumptions, currently we can not show how these `assumptions` might work together
- The REPL does not support plugin options. Some plugins have required options, such as `@babel/plugin-proposal-record-and-tuple` and `@babel/plugin-proposal-decorators`
https://github.com/babel/website/issues/1292, https://github.com/babel/website/issues/2224, https://github.com/babel/website/pull/1970

Features good to have:

- AST Explorer (integrate with existing one)
- stderr with complete stack trace as error log
- stdout as output
- Change Babel version from UI

At least 15% of open issues in babel-website are related to the REPL: https://github.com/babel/website/issues?q=is%3Aissue+is%3Aopen+label%3Arepl

### Educational/Debugging Tooling

Related to the REPL/ASTExplorer, we could do with more tooling to help with general plugin development for ourselves and 3rd-party plugins. This is rather exploratory in nature: different visualizations for the AST itself, debugging, etc.

Some things already in progress Henry has been working on and off on:

- [Codesandbox](https://codesandbox.io/s/babel-repl-custom-plugin-7s08o) for making a simple Babel plugin in the same vein as https://astexplorer.net but with custom configs.
- [Visualization](https://twitter.com/left_pad/status/1367941962083471361?s=20) of input to output mapping to help understand how Babel transforms it's code. Could be useful even for documentation in getting JavaScript users familiar with new syntax or a specific demo of a transform.
- [Mapping](https://twitter.com/left_pad/status/1298792944099561473?s=20) of input to output like a sourcemap type structure. Can do a reverse mapping to find out what plugin caused the code to be outputted a certain way which helps with debugging.

For an interactive example of what we are thinking about: https://babel-explorer.netlify.app/ (click and hold the mouse in the bottom sector!)

<!--

## Ecosystem

### Test Against `test262`

> The parser already does this, but we don't do it for transforms.

We should run against `test262` (the JavaScript test suite). This is made easier with [test262-harness](https://github.com/bterlson/test262-harness). In addition, it would be great to have it run in [test262-report](https://test262.report/), as [announced](https://bocoup.com/blog/announcing-test262-report) by Bocoup.

This will give us a few things:

- Better confidence in Babel's output. More tests/coverage is better for catching regressions and finding spec bugs worth working on.
- Can use these to help do a reverse test against any kind of "loose" mode. We can purposely fail a test when that option intends to not adhere to the spec.
- Can use this new data instead of `compat-table` for `@babel/preset-env`.

### Polyfill behavior

> This is regarding https://github.com/babel/babel/tree/main/packages/babel-preset-env#usebuiltins-usage

- [ ] Allow any substitute polyfill instead of `core-js`. You should be able to override anything (custom `Promise`, etc)
- [ ] Make `"usage"` option the default after it is stable.

### Build/publish workflow

- Guide on compiling/publishing ES2015+, .mjs, etc: https://twitter.com/philwalton/status/908082461799616512
- Support multi-build/folder outputs based on ES version/browser/engines?

### Codemods for TC39 Proposals

> Lebab/others are already used to convert from ES5 -> ESNext, so incorporate it into Babel itself.

- Refactor [Lebab](https://github.com/lebab/lebab/issues/138) as Babel transforms (can keep the cli since it's a separate tool)
  - Usecase: ES3 -> ES6+ (on source code)
  - Usecase: Remove usage of dropped proposals
  - Usecase: Auto upgrade to the latest version of a proposal spec (if possible)
  - Can we somehow combine forces in: babel-codemod/jscodeshift/lebab, prettier/recast/babel-generator? I really don't want to update all of these: new syntax equals re-writing the printer in all of these places separately/out of sync.

## Increasing the quality of community plugins

- Work with the community to create guides on how to write plugins or understand ASTs, etc
- Analysis of API's/syntax used (Google BigQuery)
- Have #blessed/sanctioned/curated packages according to some standard
  - Can use for smoke tests
  - Official testing package
  - Certain level of coverage, downloads, etc
  - Create a scoped namespace on github/npm for these? like webpack-contrib
  - Can enforce linting rules on apis?
  - Makes ecosystem changes easier if can notify and upgrade these plugins beforehand
  - Create a set of standard tests to verify against (handles all syntax)
  - Documented/tested set of options

### ASTExplorer

- allow custom version of babel-standalone (same as REPL to allow per PR tests)
- integrate with repl? (both are in react)
- auto publish a plugin to npm?
- create tests?
- hook into codesandbox?

---

## Feature

### Performance table for ES6+ (used in babel-preset-env under new option e.g `perf`)

> Add a new option in `preset-env`: will continue to compile if the native support is *slower*. Can setup a threshold, may need to compare against the size difference.

- Use [six-speed](https://github.com/kpdecker/six-speed) repo as a base, needs to apply for ES6 and proposals
- Need continued maintenance

### Compiled Output Stats

> [#5340](https://github.com/babel/babel/issues/5340) Can show the code size before and after compiling to give a sense of compiled output. Could create suggestions like using "loose" mode or not compiling, etc.

- The [REPL](https://twitter.com/existentialism/status/948940160653291520) just added a before/after code-size
- Maybe difficult to do per transform

### Async Transforms

Support having async plugins. Will require it to be opt-in and for all other plugins to be async.

### Plugin Ordering

- Add `before`/`after` keys for plugins so they can specify order.
- Possibly implement related plugins in the same "plugin" but just expose a flag out to the end-user.

### Babel Helpers (shared code)
- loader should handle these automatically like rollup
- allow 3rd party helpers?  https://github.com/babel/babel/issues/6487
- allow compilation of helpers (write in esnext?) https://github.com/babel/babel/issues/5876

## Repurpose `babel` / create `babel-init`

> We can re-use the `babel` package for a more simplified *0 config™* version

Not sure what this looks like but had this idea for a really long time and didn't really get anywhere - the cli version could just be https://github.com/developit/microbundle for libs? Maybe webpack/parcel would have it covered for apps?

---

## General/Infra

### Smoke Tests

- Babel itself https://github.com/babel/babel/issues/6134
- Important community plugins (`babel-plugin-instanbul`, css-in-js)
- `babel-core` integrations (wrappers like `babel-loader`, test frameworks, etc)
- Libraries (`(p)react`, `redux`, `vue`)
- Tools that use individual packages (`debugger.html`, `prepack`)
- OSS Apps (`nylas-mail`)

### Better Debuggability

- Query config for data for other tools
- `babel --settings`
- Validate config better
- Create/expand on new tools like https://github.com/boopathi/babel-time-travel

#### Website/Docs

- Translations
- Real documentation on APIs
- Up to date babel-handbook/merge into rehauled website
- Link to common errors pages

#### Better REPL

- Dropdown examples/examples of syntax from github?
- Import any package from npm (can give test examples for 3rd party plugins, debugging issues)
- Run any plugin from npm
- Create a plugin from the repl (can we merge it with ASTExplorer/codesandbox?), even publish, run from URL?
- Import/Export a config file
- Combine ^ with the ability to run the version of Babel in a PR/master.
- Use plugin's tests in the repo as "examples" for docs.

### `babel-bot`

> [#43](https://github.com/babel/babel-bot/issues/43) Rewrite it with [probot](https://github.com/probot/probot)

A bot is really useful to do github/maintainer activities automatically.

We haven't updated this in a long time due to Andrew being busy and not setting up the automatic infra on AWS. Switching will make updating actually real so we can add some new features which would save some headache.

References: https://github.com/eslint/eslint-github-bot, https://github.com/open-bot/open-bot

### Expanded Maintainer Guide

> Better onboarding/contributing guide
- Guide to different aspects of contributing with real examples to issues/PRs

### Maintainers/Sustainability

- Promote Open Collective, talking with companies about office hours, sponsorship, contracting?
- Mentoring: Google Summer of Code/Rails Girls Summer of Code were great but was hard to keep up with volunteers and I felt like we could be doing a lot more with full time help.
- Maybe doing local meetups on contributing, or livestreaming development/maintenance work?
- Should focus on bringing in maintainers that will lower the burden, not increase it even if there is upfront work

---

## Big Wishlist (might be out of scope/complex/ecosystem)

- Should Babel operate multi-file/take in a dep graph?
- Should Babel use type info (from other things like ts/flow/runtime info)
- AST
  - Can we just move back to acorn + estree?
  - Should we switch to shift?
  - What about binary ast?
  - immutable? https://github.com/babel/babel/issues/4130#issuecomment-245411113

-->
