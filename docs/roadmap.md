---
id: roadmap
title: Babel Roadmap
sidebar_label: Roadmap
---

## Ecosystem

### Test Against `test262`

> The parser already does this, but we don't do it for transforms.

We should run against `test262` (the JavaScript test suite). This is made easier with [test262-harness](https://github.com/bterlson/test262-harness). In addition, it would be great to have it run in [test262-report](https://test262.report/), as [announced](https://bocoup.com/blog/announcing-test262-report) by Bocoup.

This will give us a few things:

- Better confidence in Babel's output. More tests/coverage is better for catching regressions and finding spec bugs worth working on.
- Can use these to help do a reverse test against any kind of "loose" mode. We can purposely fail a test when that option intends to not adhere to the spec.
- Can use this new data instead of `compat-table` for `@babel/preset-env`.

### Polyfill behavior

> This is regarding https://github.com/babel/babel/tree/master/packages/babel-preset-env#usebuiltins-usage

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
