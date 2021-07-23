---
layout: post
title:  "Nearing the 7.0 Release"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date:   2017-12-27 21:00:00
categories: announcements
share_text: "Nearing the 7.0 Release"
---

> Check out [Planning for 7.0](https://babeljs.io/blog/2017/09/12/planning-for-7.0) for the last updates throughout the 7.0 pre-releases. If something isn't clear in this post let me know!

<!--truncate-->

## Project Updates

- We started a new [videos page](https://babeljs.io/docs/community/videos/)! We created this for people wanting to learn more about how Babel works and to help others contribute back. This page contains videos of conference talks on Babel and related concepts from team members and people in the community (you can send a PR if you have done a talk like this as well).

[![videos](https://i.imgur.com/DkBEsfo.png)](https://babeljs.io/docs/community/videos/)

- We created a new [team page](https://babeljs.io/team) as well! We will be updating this page in the future with more information about what people work on and why they are involved. For such a large project, there are many ways to get involved and help out.

[![team](https://i.imgur.com/YcWgRwf.png)](https://babeljs.io/team)

- Babel turned 3 years old on [September 28, 2017](https://babeljs.io/blog/2017/10/05/babel-turns-three)!
- Daniel [moved](https://twitter.com/left_pad/status/926096965565370369) `babel/babylon` and `babel/babel-preset-env` into the main Babel monorepo, [babel/babel](https://github.com/babel/babel), and this includes all git history, labels, issues.
- We received a [$1k/month donation](https://twitter.com/left_pad/status/923696620935421953) from Facebook Open Source!
  - This the highest monthly donation we have gotten since the start (next highest is $100/month).
  - In the meantime, we will use our funds to meet in person and to send people to TC39 meetings. These meetings are every 2 months around the world.
  - If a company wants to specifically sponsor something, we can create separate issues to track. This was previously difficult because we had to pay out of pocket, or we had to find a conference on the same week to speak at to help cover expenses.

### How you can help!

If your company would like to **give back** by supporting a fundamental part of JavaScript development and it's future, consider donating to our [Open Collective](https://opencollective.com/babel). You can also donate developer time to help maintain the project.

#### #1 Help Maintain the Project (developer time at work)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Engineer: There&#39;s a thing in SQL Server Enterprise blocking us<br>Company: Let&#39;s set up a call next week with them an ongoing discussion to resolve it next quarter<br><br>Engineer: There&#39;s a thing we need in babel, can I spent 2 days with a PR for it<br>Company: lol no it&#39;s their job <a href="https://t.co/icgaoJ0dTe">https://t.co/icgaoJ0dTe</a></p>&mdash; Shiya (@ShiyaLuo) <a href="https://twitter.com/ShiyaLuo/status/931230821976907776?ref_src=twsrc%5Etfw">November 16, 2017</a></blockquote>

The best thing we can get on this project are people committed to helping out with the project given the massive amount of work/responsibility it takes. Again, [I never felt ready](https://dev.to/hzoo/im-the-maintainer-of-babel-ask-me-anything-282/comments/1k6d) to be a maintainer but somehow stumbled upon it but I'm just one person, and our team is just a few people.

#### #2 Fund development

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Company: &quot;We&#39;d like to use SQL Server Enterprise&quot;<br>MS: &quot;That&#39;ll be a quarter million dollars + $20K/month&quot;<br>Company: &quot;Ok!&quot;<br>...<br>Company: &quot;We&#39;d like to use Babel&quot;<br>Babel: &quot;Ok! npm i babel --save&quot;<br>Company: &quot;Cool&quot;<br>Babel: &quot;Would you like to help contribute financially?&quot;<br>Company: &quot;lol no&quot;</p>&mdash; Adam Rackis (@AdamRackis) <a href="https://twitter.com/AdamRackis/status/931195056479965185?ref_src=twsrc%5Etfw">November 16, 2017</a></blockquote>

We are definitely looking to be able to fund people on the team to work full-time. Logan in particular left his job a while ago and is using our current funds to work on Babel part time at the moment!

#### #3 Contribute in other ways 😊

For example, [Angus](https://twitter.com/angustweets) made us an [official song](https://medium.com/@angustweets/hallelujah-in-praise-of-babel-977020010fad)!

### Upgrading

We will also be working on a upgrade tool that will help [rewrite your package.json/.babelrc files](https://github.com/babel/notes/issues/44) and more. Ideally this means it would modify any necessary version number changes, package renames, and config changes.

Please reach out to help and to post issues when trying to update! This is a great opportunity to get involved and to help the ecosystem update!

### Summary of the [previous post](https://babeljs.io/blog/2017/09/12/planning-for-7.0)

- Dropped Node 0.10/0.12/5 support.
- Updated [TC39 proposals](https://github.com/babel/proposals/issues)
  - Numeric Separator: `1_000`
  - Optional Chaining Operator: `a?.b`
  - `import.meta` (parsable)
  - Optional Catch Binding: `try { a } catch {}`
  - BigInt (parsable): `2n`
  - Split export extensions into `export-default-from` and `export-ns-form`
- `.babelrc.js` support (a config using JavaScript instead of JSON)
- Added a new Typescript Preset + separated the React/Flow presets
  - Added [JSX Fragment Support](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html) and various Flow updates
- Removed the internal `babel-runtime` dependency for smaller size

### Newly Updated TC39 Proposals

- Pipeline Operator: `a |> b`
- Throw Expressions: `() => throw 'hi'`
- Nullish Coalescing Operator: `a ?? b`

### Deprecated Yearly Presets (e.g. babel-preset-es20xx)

TL;DR: use `babel-preset-env`.

What's better than you having to decide which Babel preset to use? Having it done for you, automatically!

Even though the amount of work that goes into maintaining the lists of data is humongous — again, why we need help — it solves multiple issues. It makes sure users are up to date with the spec. It means less configuration/package confusion. It means an easier upgrade path. And it means less issues about what is what.

`babel-preset-env` is actually a pretty *old* preset that replaces every other syntax preset that you will need (es2015, es2016, es2017, es20xx, latest, etc...).

[![npm presets](https://i.imgur.com/nNKKFcp.png)](https://npm-stat.com/charts.html?package=babel-preset-env&package=babel-preset-es2015&package=babel-preset-es2016&package=babel-preset-es2017&package=babel-preset-latest&from=2016-11-21&to=2017-11-21)

It compiles the latest yearly release of JavaScript (whatever is in Stage 4) which replaces all the old presets. But it also has the ability to compile according to target environments you specify: whether that is for development mode, like the latest version of a browser, or for multiple builds, like a version for IE, and then another version for evergreen browsers.

### ~~Not removing the Stage presets (babel-preset-stage-x)~~

EDIT: We removed them, explained [here](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Frustration level if we remove the Stage presets in Babel? (in favor explicitly requiring proposal plugins since they aren&#39;t JavaScript yet)</p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/873242704364306433?ref_src=twsrc%5Etfw">June 9, 2017</a></blockquote>

We can always keep it up to date, and maybe we just need to determine a better system than what these presets are currently.

Right now, stage presets are literally just a list of plugins that we manually update after TC39 meetings. To make this manageable, we need to allow major version bumps for these "unstable" packages. Part of the reason for this is because the community will re-create these packages anyway, so we might as well do it from an official package and then have the ability to provide better messaging, etc.

### Renames: Scoped Packages (`@babel/x`)

Here is a poll I did almost a year ago:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Thoughts on <a href="https://twitter.com/babeljs">@babeljs</a> using npm scoped packages for 7.0?</p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/821551189166878722">January 18, 2017</a></blockquote>

Back then, not a lot of projects used scoped packages, so most people didn't even know they existed. You may also have had to pay for a npm org account back then, while now it's free (and supports non scoped packages, too). The issues with searching for scoped packages are solved and download counts work. The only thing left is that some 3rd party registries still don't support scoped packages, and I think we are at a point where it seems pretty unreasonable to wait on that.

If you want reasons why we prefer scoped packages:

- Naming is difficult: we won’t have to check if someone else decided to use our naming convention for their own plugin
- Similarly, package squatting
  - Sometimes people create `babel-preset-20xx` or some other package because it's funny, and then we have to make an issue/email to ask for it back.
  - People have a legit package, but it happens to be the same name as what we wanted to call it.
  - People see that a new proposal is merging (like optional chaining, pipeline operator) and decide to fork and publish a version of it under the same name. Then, when we publish, it tell us the package was already published 🤔. Then, I have to find their email and email both them and npm support to get the package back and republish.
- What is an "official" package and what is a user/community package with the same name? We can get issue reports of people using misnamed or unofficial packages because they assumed it was part of Babel. One example of this was a report that `babel-env` was rewriting their `.babelrc` file, and it took them a while to realize it wasn't `babel-preset-env`.

So, it seems obvious we should use scoped packages, and, if anything, we should have done it much earlier 🙂!

Examples of the scoped name change:

- `babel-cli` -> `@babel/cli`
- `babel-core` -> `@babel/core`
- `babel-preset-env` -> `@babel/preset-env`

### Renames: `-proposal-`

Any proposals will be named with `-proposal-` now to signify that they aren't officially in JavaScript yet.

So `@babel/plugin-transform-class-properties` becomes `@babel/plugin-proposal-class-properties`, and we would name it back once it gets into Stage 4.

### Renames: Drop the year from the plugin name

Previous plugins had the year in the name, but it doesn't seem to be necessary now.

So `@babel/plugin-transform-es2015-classes` becomes `@babel/plugin-transform-classes`.

Since years were only the case for es3/es2015, we didn't change anything from es2016 or es2017. However, we are deprecating those presets in favor of preset-env, and, for the template literal revision, we just added it to the template literal transform for simplicity.

### Peer Dependencies + Integrations

We are introducing a peer dependencies on `@babel/core` for all the plugins (`@babel/plugin-class-properties`), presets (`@babel/preset-env`), and top level packages (`@babel/cli`, `babel-loader`).

> peerDependencies are dependencies expected to be used by your code, as opposed to dependencies only used as an implementation detail.
> — [Stijn de Witt via StackOverflow](https://stackoverflow.com/a/34645112).

`babel-loader` already had a `peerDependency` on `babel-core`, so this just changes it to `@babel/core`. This is just so that people weren't trying to install these packages on the wrong version of Babel.

For tools that already have a `peerDependency` on `babel-core` and aren't ready for a major bump (since changing the peer dependency is a breaking change), we have published a new version of `babel-core` to bridge the changes over with the new version [babel-core@7.0.0-bridge.0](https://github.com/babel/babel-bridge). For more information check out [this issue](https://github.com/facebook/jest/pull/4557#issuecomment-344048628).

Similarly, packages like `gulp-babel`, `rollup-plugin-babel`, etc, all used to have `babel-core` as a dependency. Now these will just have a `peerDependency` on `@babel/core`. This lets these packages not have to bump major versions when the `@babel/core` API hasn't changed.

### [#5224](https://github.com/babel/babel/pull/5224) Independent Publishing of Experimental Packages

> I mention this in [The State of Babel](http://babeljs.io/blog/2016/12/07/the-state-of-babel) in the `Versioning` section. [Github Issue](https://github.com/babel/babylon/issues/275)

You might remember that after Babel 6, Babel became a set of npm packages with its own ecosystem of custom presets and plugins.

However since then, we have always used a "fixed/synchronized" versioning system (so that no package is on v7.0 or above). When we do a new release such as `v6.23.0` only packages that have updated code in the source are published with the new version while the rest of the packages are left as is. This mostly works in practice because we use `^` in our packages.

Unfortunately this kind of system requires that a major version be released for all packages once a single package needs it. This either means we make a lot small breaking changes (unnecessary), or we batch lots of breaking changes into a single release. Instead, we want to differentiate between the experimental packages (Stage 0, etc.) and everything else (es2015).

This means we intend to make major version bumps to any experimental proposal plugins when the spec changes rather than waiting to update all of Babel. So anything that is < Stage 4 would be open to breaking changes in the form of major version bumps and same with the Stage presets themselves (if we don't drop them entirely).

This goes with our decision to change TC39 proposal plugins to use the `-proposal-` name. If the spec changes, we will do a major version bump to the plugin and the preset it belongs to (as opposed to just making a patch version which may break for people). Then, we will need to deprecate the old versions and setup an infrastructure to automatically update people so that everyone is up to date on what the spec will become (and so they don't get stuck on something, like we have with decorators).

### The `env` option in `.babelrc` is not being deprecated!

Unlike in the [last post](https://babeljs.io/blog/2017/09/12/planning-for-7.0#deprecate-the-env-option-in-babelrc), we just fixed the merging behavior to be [more consistent](https://twitter.com/left_pad/status/936687774098444288).

The configuration in `env` is given higher priority than root config items, and instead of just being a weird approach of using both, plugins and presets now merge based on their identity, so you can do

```js
{
  presets: [
    ['env', { modules: false}],
  ],
  env: {
    test: {
      presets: [
         'env'
      ],
    }
  },
}
```

with `BABEL_ENV=test`, which would replace the root env config, with the one from test, which has no options.

### [Support `class A extends Array` (oldest caveat)](https://twitter.com/left_pad/status/940723982638157829)

Babel will automatically wrap any native built-ins like `Array`, `Error`, `HTMLElement` etc so that doing this just works when compiling classes.

### Speed

- Many [fixes](https://twitter.com/rauchg/status/924349334346276864
) from [bmeurer](https://twitter.com/bmeurer) on the v8 team!
- 60% faster via the [web-tooling-benchmark](https://github.com/v8/web-tooling-benchmark) https://twitter.com/left_pad/status/927554660508028929

### preset-env: `"useBuiltins": "usage"`

`babel-preset-env` introduced the idea of compiling syntax to different targets and via the `useBuiltIns` option, the ability to also only add polyfills that the targets don't support.

So with this option, something like:

```js
import "babel-polyfill";
```

Can turn into

```js
import "core-js/modules/es7.string.pad-start";
import "core-js/modules/es7.string.pad-end";
// ...
```

if the target environment happens to support polyfills other than `padStart` or `padEnd`.

However in order to make that even better, we should only import polyfills that are "used" in the codebase itself. Why even import `padStart` if it's not even used in the code?

`"useBuiltins": "usage"` is our first attempt to begin that idea. It does an import at the top of each file but only adds the import if it finds it used in the code. This approach means that we can import the minimum amount of polyfills necessary for the app (and only if the target environment doesn't support it).


So if you use `Promise` in your code, it will import it at the top of the file (if your target doesn't support it). Bundlers will dedupe the file if it's the same so this approach won't cause multiple polyfills to be imported.

```js
import "core-js/modules/es6.promise";
var a = new Promise();
```

```js
import "core-js/modules/es7.array.includes";
[].includes
a.includes
```

With type inference we can know if an instance method like `.includes` is for an array or not, and having a false positive is ok until that logic is better since it's still better than importing the whole polyfill like before.

### Misc Updates

- [`babel-template`](https://github.com/babel/babel/blob/main/packages/babel-template) is faster/easier to use
- [regenerator](https://github.com/facebook/regenerator) was released under the [MIT License](https://twitter.com/left_pad/status/938825429955125248) - it's the dependency used to compile generators/async
- "lazy" option to the `modules-commonjs` plugin via [#6952](https://github.com/babel/babel/pull/6952)
- You can now use `envName: "something"` in .babelrc or pass via cli `babel --envName=something` instead of having to use `process.env.BABEL_ENV` or `process.env.NODE_ENV`
- `["transform-for-of", { "assumeArray": true }]` to make all for-of loops output as regular arrays
- Exclude `transform-typeof-symbol` in loose mode for preset-env [#6831](https://github.com/babel/babel/pull/6831)
- [Landed PR for better error messages with syntax errors](https://twitter.com/left_pad/status/942859244759666691)

### Todos Before Release

- [Handle `.babelrc` lookup](https://github.com/babel/babel/issues/6766) (want this done before first RC release)
- ["overrides" support](https://github.com/babel/babel/pull/7091): different config based on glob pattern
- Caching and invalidation logic in babel-core.
- Either implement or have plan in place for versioning and handling polyfills independently from helpers, so we aren't explicitly tied to core-js 2 or 3, since people may have things that depend on one or the other and won't want to load both a lot of the time.
- Either a [working decorator implementation](https://github.com/babel/babel/pull/6107), or functional legacy implementation, with clear path to land current spec behavior during 7.x's lifetime.

### Thanks

Shoutout to our team of volunteers: [Logan](https://twitter.com/loganfsmyth) who has been really pushing hard to fix a lot of our core issues regarding configs and more and the one doing all of that hard work, [Brian](https://twitter.com/existentialism) who has been taking over maintenance of a lot of preset-env work and just whatever I was doing before 😛, and [Daniel](https://twitter.com/TschinderDaniel) who has always been stepping in when we need the help whether it be maintaining babel-loader or helping move the babylon/babel-preset-env repo's over. And same with [Nicolo](https://twitter.com/NicoloRibaudo), [Sven](https://twitter.com/svensauleau), [Artem](https://twitter.com/yavorsky_), and [Jessica](https://twitter.com/jessidhia) for stepping up in the last year to help out.

I'm really looking forward to a release (I'm tired too; it's almost been a year 😝), but also don't want to rush anything just because! Been a lot of ups and downs throughout this release but I've certainly learned a lot and I'm sure the rest of the team has as well.

And if I've learned anything at all this year, I should really heed this advice rather than just write about it.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;Before you go maintaining anything else, maintain your own body first&quot; - Mom 😸</p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/944313617243099136?ref_src=twsrc%5Etfw">December 22, 2017</a></blockquote>

> Also thanks to [Mariko](https://twitter.com/kosamari) for the [light push](https://twitter.com/kosamari/status/944272286055530496) to actually finish this post (2 months in the making)

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
