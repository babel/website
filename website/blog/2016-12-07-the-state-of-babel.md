---
layout: post
title:  "The State of Babel"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date:   2016-12-07 14:30:00
categories: announcements
share_text: "The State of Babel"
third_party_js:
- https://platform.twitter.com/widgets.js
custom_js_with_timestamps:
- docs.js
---

- [Some History](https://babeljs.io/blog/2016/12/07/the-state-of-babel#some-history)
- [Current Status](https://babeljs.io/blog/2016/12/07/the-state-of-babel#current-status)
- [The Future](https://babeljs.io/blog/2016/12/07/the-state-of-babel#the-future)
- [Community](https://babeljs.io/blog/2016/12/07/the-state-of-babel#community)

<!--truncate-->

> Previous issues: [Babel Roadmap #4130](https://github.com/babel/babel/issues/4130), [6.0 #2168](https://github.com/babel/babel/issues/2168)

Please check out the [Community](https://babeljs.io/blog/2016/12/07/the-state-of-babel#community) section if nothing else.

> Also published as part of [Mariko Kosaka's](https://twitter.com/kosamari) 2016 [Web Advent Calendar](http://web.advent.today/)!

## Some History

[Sebastian](https://github.com/kittens) created "6to5" in September of 2014. Interestingly enough, he made it to scratch an itch he had with understanding programming languages and how they work. You might have assumed whoever created the project already knew how compilers worked and understood JavaScript perfectly... but you would be wrong! Check out his post for a great read of his story: [~2015 in Review](https://medium.com/@sebmck/2015-in-review-51ac7035e272#.jdoo279bl).

6to5 did exactly that: easily turn ES6 code into ES5 code. When 6to5 became Babel as mentioned in [Not Born to Die](https://babeljs.io/blog/2015/02/15/not-born-to-die), it became a platform: a suite of tools designed to create the next generation of JavaScript tooling. No longer did it just compile ES6 to ES5, it allowed developers to build tools on top of it.

Here are some of our milestones:

- In [5.0.0](https://babeljs.io/blog/2015/03/31/5.0.0), Babel aligned more with the [TC39 process](https://tc39.github.io/process-document/) by introducing `stages`, added a `.babelrc` config option, and created a plugin system for custom transforms.
- In [6.0.0](https://babeljs.io/blog/2015/10/29/6.0.0), Babel became modular (a pretty controversial idea at the time). This was a huge change that led to opt-in functionality (no defaults) and the concept of `Presets` and Plugin Options.
  - As mentioned in his article, Sebastian joined Facebook in July 2015 and worked on the entire development of Babel 6 on company time.
- [6.3.13](https://github.com/babel/babel/blob/main/.github/CHANGELOG-v6.md#638-6313) Sebastian extracted our [monorepo](https://github.com/babel/babel/blob/main/doc/design/monorepo.md) build/publish tools into what is now [Lerna](https://github.com/lerna/lerna). (What's funny is [James](https://github.com/thejameskyle) rewrote it 3 times and I had to review everything)
  - After this was around when both Sebastian and James got burned out on Babel, and a few contributors stepped up.
  - We struggled to find direction and deal with the bugs/requests coming in but we got a lot of stuff done!
- [6.13.0](https://github.com/babel/babel/releases/tag/v6.13.0) finally added [Preset Options](http://babeljs.io/docs/plugins/#plugin-preset-options).
- [6.14.0](http://babeljs.io/blog/2016/08/24/6.14.0) added a [latest-preset](http://babeljs.io/docs/plugins/preset-latest/) that keeps up to date with the yearly JavaScript specification.
- [6.16.0](http://babeljs.io/blog/2016/09/28/6.16.0) allowed changing out the parser or code-generator.
- In August, we released [Babili, a minifier based on Babel](https://babeljs.io/blog/2016/08/30/babili).
- In September, we released the first version of [babel-preset-env](https://github.com/babel/babel-preset-env) (read on for details).
- After a year on [Phabricator](https://twitter.com/sebmck/status/667097915605708804), we moved back to to [GitHub issues](https://twitter.com/left_pad/status/773619871074648064) thanks solely to [@danez](https://github.com/danez) and his amazing (and underappreciated) work.

> If you're using Babel, let us know with a [PR](https://github.com/babel/babel.github.io/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aclosed+%22New+User%3A%22) to our [users page](http://babeljs.io/users/)!

Now `babel-core` is downloaded over 5 million times per month and almost 60 million times total and used at huge companies like Facebook/Netflix/Airbnb and other OSS projects like React/Yarn.


Thanks everyone for your continued support! We want to continue acting as the foundation of the JavaScript toolchain: compilation, linting, minification, codemods, code coverage, etc.

## Current Status

If you're interested in helping out please check out the issues linked below!

### Maintaining Babel plugins [for each proposal in TC39](https://github.com/tc39/proposals) starting from Stage 0

[TC39](https://github.com/tc39) stands for Ecma International, Technical Committee 39: it's the committee that makes JavaScript.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/b0rk">@b0rk</a> Short answers:<br><br>Who&#39;s there? Engine implementers, developers, a handful of academics and theorists, and <a href="https://twitter.com/BrendanEich">@BrendanEich</a>.</p>&mdash; Yehuda Katz (@wycats) <a href="https://twitter.com/wycats/status/803821500394598401">November 30, 2016</a></blockquote>

Babel uses [TC39's concept of stages](http://babeljs.io/docs/plugins/#stage-x-experimental-presets-) to categorize its experimental plugins. Users should be able to easily use features before they are all implemented in browsers in [stage 4 of the TC39 process](https://tc39.github.io/process-document/).

Babel is fundamental in the process given its place in the ecosystem: it is significantly easier for a developer to update a `.babelrc` file than a browser flag and much faster to write a Babel plugin than to implement the feature natively in the browser. This is the core of Babel.

But the proposals process involves significant iteration: proposals can change in syntax or even get dropped. Because TC39 meets every 2 months, plugins should be updated as least as often as each change in stage so that users can be in sync.

> Early feedback to the proposal champion and committee is extremely valuable although it is recommended to use Stage 0/1/2 features with caution.
> Although companies like Facebook take advantage of these kinds of features, they have created codemods to allow easy change.

---

There isn't enough time or resources to maintain each plugin, especially when there are spec updates.

- Some transforms are simply out of date such as decorators. Logan had to port the previous spec [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) for Babel 6 and we haven't had anyone able to rewrite it for the updated spec.
- [babel/babel#3473 - Async iteration proposal](https://github.com/babel/babel/pull/3473) wasn't merged for so long because we just didn't have time to review it. By the time it was merged it had already moved
from stage 2 to stage 3.

---

Next we're going to be working with:

- [Daniel Ehrenberg](https://github.com/littledan) on [Private Fields (Stage 2)](https://github.com/tc39/proposal-private-fields)
- [Yehuda Katz](https://github.com/wycats) on [Class and Property Decorators (Stage 2)](http://tc39.github.io/proposal-decorators/)
- [Mathias Bynens](https://mathiasbynens.be/) on [Unicode Property Escapes in Regular Expressions (Stage 2)](https://github.com/tc39/proposal-regexp-unicode-property-escapes) via [babel/babel#3683](https://github.com/babel/babel/pull/3683)

Relevant Issues:

- Should we create a codemod for Stage X proposals at the same time as creating the actual transform?
- [Private Fields](https://github.com/babel/babel/issues/4408)
- [Decorators Proposal](https://github.com/babel/babel/issues/2645)

> Check out [thefeedbackloop.xyz](https://thefeedbackloop.xyz/tc39-november-2016-day-1/) for more info on TC39!

### Maintaining other ecosystem plugins: JSX/Flow

Babel is vital to the [React](https://reactjs.org) and [Flow](https://flowtype.org/) ecosystems, and we work closely with the relevant teams at Facebook.

- [React plugins](https://babeljs.io/docs/plugins/#react), [React preset](https://babeljs.io/docs/plugins/preset-react/)
  - These cover the main `JSX` transform, development plugins, and optimizations.
- [Flow plugin](https://babeljs.io/docs/plugins/transform-flow-strip-types)

Relevant Issue Labels:

- [babel/babel: React issues](https://github.com/babel/babel/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aopen%20label%3A%22react%22%20)
- [facebook/react: Optimizing Compiler](https://github.com/facebook/react/labels/Component%3A%20Optimizing%20Compiler)

### [babel-preset-env](https://github.com/babel/babel-preset-env) ("autoprefixer" for Babel)

JavaScript compilation is a moving target: There are yearly updates to the spec, browser vendors are constantly updating to that spec, and users may drop support for earlier browsers. At first glance, there doesn't seem to be a fixed target for what we should compile our JavaScript down to.

![](https://cloud.githubusercontent.com/assets/588473/19214029/58deebce-8d48-11e6-9004-ee3fbcb75d8b.png)

> The [compat-table](https://github.com/kangax/) is updated constantly and is used for this preset.

This is where `babel-preset-env` comes in: it's a Babel preset that automatically determines the correct Babel plugins to use based on the provided environments.

Its goal is both simplicity in use and efficiency in output: you only need to worry about your target environments to be able to take advantage of native code. The preset decides for you the required plugins.

#### Some example configs

Targeting Chrome 55 + last 2 versions of other browsers via [browserslist](https://github.com/ai/browserslist)

```js
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 55,
        "browsers": ["last 2 versions"]
      }
    }]
  ]
}
```

Targeting the current Node.js version (uses `process.versions.node`)

```js
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

Chrome 55 `useBuiltIns` + webpack 2

```js
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 55
      },
      "modules": false,
      "useBuiltIns": true
    }]
  ]
}
```

**In**

```js
import "babel-polyfill";
```

**Out (different based on environment)**

```js
import "core-js/modules/es7.string.pad-start";
import "core-js/modules/es7.string.pad-end";
```

Relevant Issues:

- Next big feature: apply the same idea of preset-env to polyfills as well [babel/babel-preset-env#20](https://github.com/babel/babel-preset-env/issues/20) with corresponding PR in [babel/babel-preset-env#56](https://github.com/babel/babel-preset-env/pull/56).
- [Using browserslist](https://github.com/babel/babel-preset-env/issues/26) and [PR](https://github.com/babel/babel-preset-env/pull/51)
- ["Node.js versions support" in Browserslist](https://github.com/ai/browserslist/issues/75)
- [Publish runnable tests & browser data to npm](https://github.com/kangax/compat-table/issues/711)

### Linting via [babel-eslint](https://github.com/babel/babel-eslint)

<img class="img-responsive" alt="example of eslint" src="/blog/assets/2016-12-07-the-state-of-babel/eslint.png">

ESLint doesn't support new language features until they reach Stage 4 of the proposals process. For this reason we maintain [babel-eslint](https://github.com/babel/babel-eslint) (a custom ESLint parser) so you can continue to lint JavaScript with experimental syntax.

This project was one of the hardest projects to work on: because it is just a compatibility layer between Babel and ESLint there is inherently a constant need for updates when either projects update and a high risk of unexpected changes due to monkey-patching. It was unfortunate to get issues like [babel/babel-eslint#243](https://github.com/babel/babel-eslint/issues/243) or [babel/babel-eslint#267](https://github.com/babel/babel-eslint/issues/267).

To that end, we'd like to lessen the maintenance burden of this project by improving our scope and traversal interop with ESLint. It might even be interesting to be able to write ESLint rules using babel APIs or vice versa?

Relevant Issues:

- [Previous Linting APIs Discussion](https://github.com/babel/babel/issues/1829)
- [Running smoke tests on ESLint](https://github.com/babel/babel-eslint/issues/62)
- [babel/babel-eslint#88](https://github.com/babel/babel-eslint/issues/88) is still relevant now

### Minification

[Babili](https://github.com/babel/babili) is our new Babel-powered minifier, enabling you to produce minified code while targeting the latest browsers.

**In**

```js
class Mangler {
  constructor(program) {
    this.program = program;
  }
}
new Mangler();
```

**Out**

```js
// ES2015 code -> Babili -> Minified ES2015 Code
class a{constructor(b){this.program=b}}new a;
```

Check out our [blog post](http://babeljs.io/blog/2016/08/30/babili) for more info.

Since it was recently released, we're looking for some new contributors! There's a lot of small bugs and things that could be improved for those looking for a new project to help out with!

### Codemods / Refactoring / `eslint --fix`

A `codemod` is a tool-assisted code modification; a fancy find-and-replace.

If you wanted to change `merge({})` to `Object.assign({})` (and maybe later [object rest](https://github.com/sebmarkbage/ecmascript-rest-spread)) you might do a regex replace. But you don't want to replace the other parts of the code that also might be called `merge` such as imports/exports, strings, comments, and local variables. To do it safely you'll want something more powerful that only changes the specific code you need.

Although Babel already handles transforming code into other code, it doesn't really care about the styling of the input code as a compiler. After using Babel with its default options to do a codemod, `git diff` looks really messy.

Enter [Recast](https://github.com/benjamn/recast): a tool that preserves the formatting of unmodified code while also pretty-printing any new AST nodes.

![recast](https://cloud.githubusercontent.com/assets/588473/16584612/04a82078-428b-11e6-9f79-a665eef848ea.gif)

> In the screenshot above, the top-left pane is the input code and the bottom-right pane is the output code after the babel plugin is run. In this case it's preserving the whitespace of the input code when possible.

By passing in [Recast](https://github.com/benjamn/recast) in the options, Babel can power the future of codemods.

`.babelrc`

```js
{
  "parserOpts": {
    "parser": "recast"
  },
  "generatorOpts": {
    "generator": "recast"
  }
}
```

Run the relevant Babel transform(s) on the source code and overwrite it:

```sh
babel src -d src
```

This feature was just made possible so we're looking forward to making it easier to use and seeing the transformations it can enable. Check out the [6.16.0 blog post](https://babeljs.io/blog/2016/09/28/6.16.0#-new-feature) for more info!

Other relevant projects: [JSCodeshift](https://github.com/facebook/jscodeshift), [js-codemod](https://github.com/cpojer/js-codemod), [Lebab](https://github.com/lebab/lebab).

Relevant Issues:

- [Rewriting Lebab as a Babel transformer](https://github.com/lebab/lebab/issues/138)
- [Babel integration with jscodeshift](https://github.com/facebook/jscodeshift/issues/168)

### Code Coverage / Instrumentation

![](https://istanbul.js.org/assets/browser.png)

We want to support tools like [nyc](https://github.com/istanbuljs/nyc) and [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul).

### Plugin Ecosystem

Thanks to our vibrant community, new plugins are constantly being created: whether it be a new way to write your [css in jsx](https://github.com/zeit/styled-jsx) or [rewire your tests](https://github.com/speedskater/babel-plugin-rewire).

> Currently there are > 1200 [babel-plugins on npm](https://www.npmjs.com/search?q=babel-plugin-).

We've had some interesting discussions on how we can grow and support the plugin ecosystem. We could try to watch all the repos but that is obviously overwhelming.

It might be interesting to create some bots to automate a few tasks: create specific Babel plugins/ESLint rules for babel-plugins, write codemods to update API changes, and integrate plugins into our smoke test.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/jaredforsyth">@jaredforsyth</a> <a href="https://twitter.com/reactjs">@reactjs</a> My five minute POC ☺️ <a href="https://t.co/v74UFHsSJG">https://t.co/v74UFHsSJG</a> <a href="https://t.co/B3YwVWkH5g">pic.twitter.com/B3YwVWkH5g</a></p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/805971589430968320">December 6, 2016</a></blockquote>

- Should we create a newsletter for new/useful plugins?
- How can we teach people about plugins and how to write them?
- How can we make [ASTExplorer](http://astexplorer.net/) better?

### Documentation (this website!)

Docs contributions have definitely been lacking in the [last year](https://github.com/babel/babel.github.io/graphs/contributors).

However just recently we've done a lot of awesome stuff:

- [@Daniel15](https://github.com/Daniel15) has been maintaining [babel-standalone](https://github.com/babel/babel-standalone) which we use in the REPL and has some automation when new releases get out.
- [@maxiloc](https://github.com/maxiloc) added search functionality via Algolia via [#977](https://github.com/babel/babel.github.io/pull/977)

We've also added new collaborators:

- [@STRML](https://github.com/STRML): Added Discourse to all github pages via [#875](https://github.com/babel/babel.github.io/pull/875)
- [@xtuc](https://github.com/xtuc): Added support for reading the README from the babel repo so we don't have to sync 2 copies of docs via [#990](https://github.com/babel/babel.github.io/pull/990)
- [@fredericmarx](https://github.com/fredericmarx): Added support for a copy to clipboard button for code snippets via [#998](https://github.com/babel/babel.github.io/pull/998)
- [@seedofjoy](https://github.com/seedofjoy): Added a resize ability for the REPL via [#1003](https://github.com/babel/babel.github.io/pull/1003)

Some Ideas

- All plugins should have examples. Can also embed [RunKit](https://runkit.com/home) or the REPL.
- Update FAQ with common errors
- API docs / make [babel-handbook](https://github.com/thejameskyle/babel-handbook) better

Relevant Issues:

- [Reorganizing the docs layout](https://github.com/babel/babel.github.io/issues/930)
- [Showcase community plugins](https://github.com/babel/babel.github.io/issues/831)
- [Adding a resources page](https://github.com/babel/babel.github.io/issues/27)
- [Learn ES2015: teach others about ES2015+](https://github.com/babel/babel.github.io/issues/994)
- [REPL: adding example dropdowns](https://github.com/babel/babel.github.io/issues/59)
- [REPL: supporting all options](https://github.com/babel/babel.github.io/issues/92)
- [REPL: allow the REPL to import any community plugin from npm](https://github.com/babel/babel.github.io/issues/858)
- [REPL: Use ASTexplorer](https://github.com/fkling/astexplorer/issues/70)
- [ASTexplorer: Real Time collaboration](https://github.com/fkling/astexplorer/issues/166)

## The Future

> NOTE: Everything below can be changed or dropped. Some might be already in the works and others are just suggestions that need a proper discussion/champion.

> Priority should be determined on what the community needs: not because it would be nice to have.

### [Plugin API Changes](https://github.com/babel/notes/blob/master/2016/2016-08/august-01.md#potential-api-changes-for-traversal)

There is a lot of confusion around how plugins/presets interact regarding ordering. This results in bugs and issues with the config which require users to place plugins before/after others in a non-intuitive way.

We’re currently discussing API changes that could reduce the confusion. However, since this is a fundamental change to the core of Babel, it might take a while to figure out the best approach.

### Versioning

Since Babel 6 we've used a ["fixed" mode of versioning](https://github.com/lerna/lerna#how-it-works) via Lerna. This is what allows us to release multiple packages at the same time all under the same version (if that package changes). This is nice because you don't have to manually set a version for each package but everything moves together. The only time this could cause an error is when one on the packages makes a breaking change: then every package also will bump major versions.

This is explained more in [babel/notes](https://github.com/babel/notes/blob/master/2016/2016-07/july-31.md#future-of-babels-release-process-and-its-ecosystem) but we still need to figure out the best plan of action for the project.

What happens when we need to update a Stage 0 spec to Stage 1 and it's a breaking change to the parser? Are we just going to bump the major version, wait to batch some changes up, or figure out how to do it via multiple versions of plugins?

[Discussion Issue](https://github.com/babel/babel/issues/4950)

#### Changing the Mindset Around Stage X Presets

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">My rule of thumb on how I decide what future features to transpile:<br>&quot;Could I reasonably codemod this if it changes?&quot;<br>Don&#39;t do it otherwise.</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/803815749416456196">November 30, 2016</a></blockquote>

Relevant Issues:

- [Should we rename the stage x presets to explain more that they are "experimental"](https://github.com/babel/babel/issues/4914)

#### Speed

Performance is a feature! Other things can be more of a priority at times (bug fixes, spec compliancy, etc) but it's still important in a few different aspects.

- How can we reduce the size/time of install, especially for a project with multiple packages? (this is helped by [yarn](https://yarnpkg.com))
- How can we parse faster?
- How can we make faster plugins (and measure them individually)?
- How can we generate the transformed code faster?
- How can we generate code that runs fast in the browser (https://fhinkel.github.io/six-speed/)?

If you to read the compiled output and see issues, then report it and ask for help in making a PR!

Previous Issues:

- [Speeeeed](https://github.com/babel/babel/issues/1486)
- [Amazing PR to improve babel-generator by @gzzhanghao](https://github.com/babel/babel/pull/3283)

### Possible TypeScript Support?

Maybe Babel could learn to understand TypeScript syntax (like we do with Flow)? We could add a plugin to strip TypeScript types for better interop.

This would mean parsing TypeScript specific syntax and stripping it out. However TypeScript does have non-type syntax, so for things like `enum` we will would have to discuss more.

### Use Type Information?

Integrate with a type system such as Flow/TypeScript to make optimizations. This just means that Babel should be able to gain the knowledge through those tools that an identifier `arr` is actually an `Array` or not.

> There are a few plugins that actually do type checking: [babel-plugin-typecheck](https://github.com/codemix/babel-plugin-typecheck) and [babel-plugin-tcomb](https://github.com/gcanti/babel-plugin-tcomb)

- [Previous Issue](https://github.com/babel/babel/issues/653)

### Taking in a Dependency Graph / Operate Multi-file?

Then we could integrate with other tools like Webpack better. This would allow cross file transformations or whole codebase optimizations. The main reason for this would be for the minifier (being able to remove properties based on checking the usage across the whole application) or for example providing errors for missing/invalid import/exports.

- [Discussion Issue](https://github.com/babel/babel/issues/4949)

### Parser Errors

Better error messages from the parser like in [Compiler Errors for Humans](http://elm-lang.org/blog/compiler-errors-for-humans).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">babel-eslint@7.1.1: now adds the code frame when there&#39;s a parser error! <a href="https://t.co/yoxRpGXq5E">pic.twitter.com/yoxRpGXq5E</a></p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/799388723896946692">November 17, 2016</a></blockquote>

> It is obvious that we all want to see helpful errors!

We can do better inference/guessing on user intention to prevent vague errors. Let us know in what cases that happens!

Relevant Issues:

- [#125 Better message when using `await` in a non-async function](https://github.com/babel/babylon/pull/125)
- [#169 Better message for a syntax error when a plugin isn't enabled](https://github.com/babel/babylon/issues/169)
- [#212 Better message for using super when not using a non-object method](https://github.com/babel/babylon/issues/212)

### `babel-init`

Basically a way to set up Babel more easily like [create-react-app](https://github.com/facebookincubator/create-react-app) does.

- Set up a `.babelrc` from scratch, prompt with questions

Possible Idea:

- Ask about target environments (browsers, node) and pass to `babel-preset-env`
- Ask about experimental features (add specific plugins)
- Update the `babel` npm package to do something again: Make it the default/opt-in/opinionated `babel` that Babel 5 was. It can default to using `env` and say the `latest 2 browsers` (without any config).

Relevant Issues:

- [CLI (babel init) command](https://github.com/babel/babel/issues/3977)
- [Repurpose `babel` npm package](https://github.com/babel/babel/issues/4951)

### Run [tc39/test262](https://github.com/tc39/test262)

> test262 tests conformance to the continually maintained draft future ECMAScript standard found at [tc39.github.io/ecma262](http://tc39.github.io/ecma262/), together with any Stage 3 or later TC39 proposals. It is maintained by Tom Care ([@tcare](https://github.com/tcare)) with significant contributions from many in the ECMAScript community.

Running the official spec tests against Babel can make sure we comply to the spec or at least know when we don't. We'll want to figure out how to do filtering on things we can't compile (proxy, TCO, etc) and set up an easy way to check failing tests and file issues and PRs for them.

Relevant Issues:

- [Adding test262 to compat-table](https://github.com/kangax/compat-table/issues/830)
- [Running test262 on the web](https://github.com/bakkot/test262-web-runner/)

### Smoke/Integration Tests

It would be useful to either have a reverse [Greenkeeper](https://greenkeeper.io) or to run tests with master branch of Babel so that we can catch any major regressions before any release (node has the [citgm project](https://github.com/nodejs/citgm) for this). In theory we would want to take the biggest open source projects that use Babel and run their tests.

[motiz88/babel-smoke-tests](https://github.com/motiz88/babel-smoke-tests) is a good start! It would also be great if there's already something like this out there!

### Program Analysis

- [Program Slicing](https://en.wikipedia.org/wiki/Program_slicing)

There was a great talk by [Alan Shreve](https://twitter.com/inconshreveable) called ["Idealized Commit Logs: Code Simplification via Program Slicing"](https://www.youtube.com/watch?v=dSqLt8BgbRQ) which inspired @kentcdodds to try it out in JavaScript via [slice-js](http://slides.com/kentcdodds/faster-javascript#/).

The general idea is that we have a lot of tools to help us write code but not a lot for helping us understand/read code. You can think of code-slicing as a form of targeted dead-code elimination.

![slice-js](https://s3.amazonaws.com/media-p.slid.es/uploads/55780/images/3189688/Screen_Shot_2016-11-02_at_11.46.25_PM.png)

A program slice basically cuts away from the source code the code that isn't used for a test case that you run. If there are lots of if statements and loops that aren't run during your usecase then it won't show up in the program slice.

- Semantic (AST aware) Grepping tool?

Similar to [graspjs](http://www.graspjs.com/), I think it would be interesting to be able to do a find-replace with the input being an AST. It would allow us to create other analysis tools: the ability to find all IIFE's in our code, the number of times a method is called, or even how many Classes we have in our codebase.

### `babel --settings`

This command would print out all info (also when erroring). It would also include performance metrics on how long each plugin takes.

- [Discussion Issue](https://github.com/babel/babel/issues/2960)

### Parser Unity

There have also been some discussions around parser/AST unity, in [TheLarkInn/js-parser-discussions](https://github.com/TheLarkInn/js-parser-discussions) and previously with [ESTree](https://github.com/estree/estree).

Unfortunately with Babel 6, we have "forked" and have a few differences in [our AST](https://github.com/babel/babylon#output) than ESTree. Babel aims to support stage x features while other parsers may only want to support stage 4 features. We all might prioritize certain things more than others regarding spec compliancy, performance, stage x features, error messages, extensibility, releases, etc. However it's important for us to be open to breaking changes that may lead to better interop and a better community.

### Sweet.js Interop?

Previous [issue](https://github.com/babel/babel/issues/568#issuecomment-71716260). Maybe we can just figure out how to have better interop instead?

### Node.js Support

Should we drop support according to the EOL of Node.js versions? How long should we wait to do this in general?

- Do we want to continue to support our users who haven't updated yet?
- There are certain transforms/PRs that are blocked by this, due to tools that have also dropped older versions.
- Many other build-time projects like ESLint have done so already.
- Are we going to make a major version just for this or plan out other changes in addition?

- [Discussion Issue](https://github.com/babel/babel/issues/4315)

### Babel 5 to 6 transition / Upgrade Paths

Babel 6 was really difficult for the community to upgrade to. The initial release was a bit rushed. Although we did have a [6.0 release post](http://babeljs.io/blog/2015/10/29/6.0.0), a [setup guide](http://babeljs.io/blog/2015/10/31/setting-up-babel-6) soon after, a even a [tool (now deprecated)](http://babeljs.io/blog/2015/11/03/babel-doctor) to help with the transition it was still difficult for users to understand the changes.

There are still [a good amount of users on Babel 5](https://libraries.io/npm/babel-core/usage) that we don't want to leave behind. What can we do to help them upgrade? What steps do we need to take in the future to make sure the same thing doesn't happen with a Babel 7? Are there other projects/communities we should be reaching out to and helping?

Relevant Issues:

- [ember-cli Babel 6.0 Issue](https://github.com/ember-cli/ember-cli/issues/5015) needs help!
- Any others?

### What else?

Anything else not already brought up here? Please send us a tweet [@babeljs](https://twitter.com/babeljs), a message on our slack (join at [https://slack.babeljs.io/](https://slack.babeljs.io), comment on this post, or create an discussion issue in our repo!)

Are there projects or communities we should partner with more? How can we make the contributing experience more welcome? What can we do to make the development process more transparent?

## Community

Old Issues:

- [Call for Contributors!](https://github.com/babel/babel/issues/1347)
- [Being Prepared for Getting Hit by a Bus](https://github.com/babel/babel/issues/1888)

You might think that as [a project gets more widely used](https://npm-stat.com/charts.html?package=babel-core&from=2015-02-07&to=2016-12-07) that more people show up to help out. But like most OSS projects that aren't backed by a company, there is a constant issue with maintenance and sustainability; people get burned out, move on to other cool projects, or get busy with work/family/etc.

Like James describes in [Dear JavaScript](https://medium.com/@thejameskyle/dear-javascript-7e14ffcae36c), the current Babel team is pretty small.

> Babel isn't a company, a special team at Facebook, or corporate-funded OSS project. It's a community-driven effort currently held up by a few people and we want that to grow.

So if you're interested in contributing to a tool you use, we're hoping this could be the one!

### What issues should I look at or contribute to?

Many of our projects have both [`beginner-friendly`](https://github.com/babel/babel/labels/beginner-friendly) and [`help-wanted`](https://github.com/babel/babel/labels/help-wanted) labels. You can also check out [`discussion`](https://github.com/babel/babel/labels/discussion).

### Team

Our core team is:

- [Henry Zhu, @hzoo](https://github.com/hzoo)
- [Logan Smyth, @loganfsmyth](https://github.com/loganfsmyth)
- [Daniel Tschinder, @danez](https://github.com/danez)

And just in the last 3 months a lot more collaborators:

- [Moti Zilberman, @motiz88](https://github.com/motiz88)
- [Dan Harper, @danharper](https://github.com/danharper)
- [Kai Cataldo, @kaicataldo](https://github.com/kaicataldo)
- [Andrew Levine, @drewml](https://github.com/DrewML)
- [Brian Ng, @existentialism](https://github.com/existentialism)
- [Jessica Franco, @Jessidhia](https://github.com/Jessidhia)

Babili core team:

- [Juriy Zaytsev, @kangax](https://github.com/kangax)
- [Boopathi Rajaa, @boopathi](https://github.com/boopathi)

As mentioned above we have a lot of website collaborators:

- [Daniel Lo Nigro, @daniel15](https://github.com/daniel15)
- [Samuel Reed, @STRML](https://github.com/STRML)
- [Sven SAULEAU, @xtuc](https://github.com/xtuc)
- [Frederic Marx, @fredericmarx](https://github.com/fredericmarx)
- [Igor Mozharovsky, @seedofjoy](https://github.com/seedofjoy)

Inactive but still a resource:

- [Sebastian McKenzie, @kittens](https://github.com/kittens) - Yarn
- [James Kyle, @thejameskyle](https://github.com/thejameskyle) - Flow/Yarn
- [Amjad Masad, @amasad](https://github.com/amasad) - [repl.it](https://repl.it/)
- [Jesse McCarthy, @jmm](https://github.com/jmm)

### How can I contact the team?

#### GitHub

For bug reports/PRs you can check our [repositories](https://github.com/babel/).

#### Twitter

You can ping us on Twitter with [@babeljs](https://twitter.com/babeljs) - or mention us individually.

I myself joined Twitter to be able to talk with users and help out. Being able to post new features and changelogs is really useful and can help give us feedback!

#### Slack

We have a relatively active community on there!

You'll find a lot of awesome community members willing to help such as [Jordan Harband, @ljharb](https://github.com/ljharb), [Jessica Franco, @Jessidhia](https://github.com/Jessidhia), [Jimmy Jia, @taion](https://github.com/taion), [Denis Pushkarev, @zloirock](https://github.com/zloirock) and more!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">If you haven&#39;t joined our slack yet: please join at <a href="https://t.co/h3m7l9jkrg">https://t.co/h3m7l9jkrg</a>. Check out development/plugins to see what&#39;s up! <a href="https://t.co/f1CKaV8G6G">pic.twitter.com/f1CKaV8G6G</a></p>&mdash; Babel (@babeljs) <a href="https://twitter.com/babeljs/status/793223871080136705">October 31, 2016</a></blockquote>

If you just have questions join [#discussion](https://babeljs.slack.com/messages/discussion/) and if you want to help or listen in check out [#development](https://babeljs.slack.com/messages/development/).

We try not to discuss in private if there's no need to: I myself usually post the issues/PRs I'm working on for people to review and talk about.

#### Other

How else can we interact with the community? Should we go and start meetups, go to conferences, or manage hackathons?

How can we make Babel sustainable? Should we setup a [Open Collective](https://opencollective.com/opensource) or seek a foundation? Should we pay for a [project manager](https://medium.com/open-collective/wanted-a-product-manager-for-open-source-projects-bf19bcd680f5#.awwsg684n)?

Let us know your thoughts! What do you want out of Babel?

---

> See typos/issues? Please send a PR or comment on [babel/babel.github.io#1014](https://github.com/babel/babel.github.io/pull/1014)

If anything we want to let you know that many of us got our start with Babel in order to learn JavaScript rather than helping because we already knew it. Personally, I knew nothing about compilers and had just learned what ES6 was when I found the project. I got here because of a tiny bit of curiosity and [some encouragement from a lot of people](https://medium.com/@hzoo/ossthanks-some-thoughts-d0267706c2c6#.lcga2ggrw). I want to carry that forward and hope that we can all succeed together.

Thanks so much for reading!

Henry Zhu ([@hzoo](https://github.com/hzoo)) ([@left_pad](https://twitter.com/left_pad))

> Thanks to way too many folks for their review and thoughts: @DrewML, @mrjoelkemp, @kentcdodds, @existentialism, @jdalton, @gaearon, @nolanlawson, @jayphelps, @montogeek, @TheLarkInn, @jasonLaster, @benjamn, @addyosmani, @Daniel15, @loganfsmyth, @gr2m, @mathiasbynens, @chicoxyzzy, @bvaughn, @bcoe.
