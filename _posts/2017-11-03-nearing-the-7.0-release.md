---
layout: post
title:  "Nearing the 7.0 Release"
author: Henry Zhu
author_url: "https://twitter.com/left_pad"
date:   2017-11-03 12:00:00
categories: announcements
share_text: "Nearing the 7.0 Release"
---

> Please check out the previous [Planning for 7.0](https://babeljs.io/blog/2017/09/12/planning-for-7.0) post for information up till the first beta release!

## Project Updates

- We started a new [videos page](https://babeljs.io/docs/community/videos/)! Wanted to create this to provide a resource for people wanting to learn more about how Babel works and help contribute back!

[![videos](https://i.imgur.com/DkBEsfo.png)](https://babeljs.io/docs/community/videos/)

- We created a new [team page](https://babeljs.io/team)! We'll be updating this in the future with more information about what people work on and why they are involved! For such a large project, there are many ways to get involved and help out!

[![team](https://i.imgur.com/YcWgRwf.png)](https://babeljs.io/team)

- Babel turned three years old on [Sept 28](https://babeljs.io/blog/2017/10/05/babel-turns-three)!
- Daniel [moved](https://twitter.com/left_pad/status/926096965565370369) `babel/babylon` and `babel/babel-preset-env` into the main Babel monorepo: [babel/babel](https://github.com/babel/babel), including everything from git history, labels, issues!
- We received a [$1k/month donation](https://twitter.com/left_pad/status/923696620935421953) from Facebook Open Source!
  - If your company would also like to give back and support a fundamental part of JavaScript development and it's future, consider donating to our [Open Collective](https://opencollective.com/babel) or donate developer time to helping maintain the project
  - This the highest monthly donation we've gotten since the start (next highest is $100/month)
  - We're definetely looking to be able to fund people on the team to work full-time
  - In the meantime we will use our funds to meet in person and sending people to TC39 meetings (it's every 2 months around the world). If someone wants to sponsor specifically for that, we can create separate issues to track that so there are concrete/specific things a company can donate for. This has been previously difficult because we've had to pay out of pocket or for me had to find a conference on the same week to speak at to help cover expenses.

### How you can help!

#### #1 Help Maintain the Project (developer time at work)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Engineer: There&#39;s a thing in SQL Server Enterprise blocking us<br>Company: Let&#39;s set up a call next week with them an ongoing discussion to resolve it next quarter<br><br>Engineer: There&#39;s a thing we need in babel, can I spent 2 days with a PR for it<br>Company: lol no it&#39;s their job <a href="https://t.co/icgaoJ0dTe">https://t.co/icgaoJ0dTe</a></p>&mdash; Shiya (@ShiyaLuo) <a href="https://twitter.com/ShiyaLuo/status/931230821976907776?ref_src=twsrc%5Etfw">November 16, 2017</a></blockquote>

#### #2 Fund development

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Company: &quot;We&#39;d like to use SQL Server Enterprise&quot;<br>MS: &quot;That&#39;ll be a quarter million dollars + $20K/month&quot;<br>Company: &quot;Ok!&quot;<br>...<br>Company: &quot;We&#39;d like to use Babel&quot;<br>Babel: &quot;Ok! npm i babel --save&quot;<br>Company: &quot;Cool&quot;<br>Babel: &quot;Would you like to help contribute financially?&quot;<br>Company: &quot;lol no&quot;</p>&mdash; Adam Rackis (@AdamRackis) <a href="https://twitter.com/AdamRackis/status/931195056479965185?ref_src=twsrc%5Etfw">November 16, 2017</a></blockquote>

### Upgrading

We will also be working on a upgrade tool that will help [rewrite your package.json/.babelrc files](https://github.com/babel/notes/issues/44).

### Summary of the [previous post](https://babeljs.io/blog/2017/09/12/planning-for-7.0)

- Drop Node 0.10/0.12/5 support.
- Updated [TC39 proposals](https://github.com/babel/proposals/issues)
  - Numeric Separator: `1_000`
  - Optional Chaining Operator: `a?.b`
  - `import.meta` (parseble)
  - Optional Catch Binding: `try { a } catch {}`
  - BigInt (parseble): `2n`
  - Split export extensions into `export-default-from` and `export-ns-form`
- `.babelrc.js` support (a config using JavaScript instead of JSON)
- A new Typescript Preset + separated the React/Flow presets
- Removed the internal `babel-runtime` dependency for smaller size

### Newly Updated TC39 Proposals

- Pipeline Operator: `a |> b`
- Throw Expressions: `() => throw 'hi'`
- Nullish Coalescing Operator: `a ?? b`

### Deprecated Yearly Presets (e.g. babel-preset-es20xx)

TL;DR is use `babel-preset-env` instead.

What's better than you having to decide what Babel preset to use? If it was done for you, automatically!

Even though the amount of work that goes into maintaining the lists of data is humongous (again why we need help), it solves multiple issues: making sure users are up to date with the spec, less configuration/package confusion, an easier upgrade path, and less issues about what is what.

`babel-preset` is actually a pretty *old* preset that replaces every other syntax preset that you will need (es2015, es2016, es2017, es20xx, latest, etc...).

![npm presets](https://i.imgur.com/nNKKFcp.png)

It compiles the latest yearly release of JavaScript (whatever is in Stage 4) which replaces all the old presets. But it also has the further abilitiy to compile according to the target environments you specify: whether it's for development mode (latest version of a browser), or different builds (one for IE, one for evergreen browsers).

### Not removing the Stage presets (babel-preset-stage-x)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Frustration level if we remove the Stage presets in Babel? (in favor explicitly requiring proposal plugins since they aren&#39;t JavaScript yet)</p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/873242704364306433?ref_src=twsrc%5Etfw">June 9, 2017</a></blockquote>

We can always keep it up to date, and maybe we just need to determine a better system than what these presets are currently.

Right now, they are literally just a list of plugins that we manually update after a TC39 meeting happens. Of course to make this managable we will need to just allow for major version bumps for these "unstable" packages. Part of the reason for this is because the community will just re-create these packages anyway, so we might as well do it via an official package and have the ability to provide better messaging, etc.

### Renames: Scoped Packages (`@babel/x`)

Alright we only just changed every single package for Babel again 😂..

Here's a poll I did almost a year ago:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Thoughts on <a href="https://twitter.com/babeljs">@babeljs</a> using npm scoped packages for 7.0?</p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/821551189166878722">January 18, 2017</a></blockquote>

Back then, there weren't a lot of projects using scoped packages so most people didn't even know they existed. I believe you also had to pay for a npm org account while now it's free (and supports non scoped packages too). The issues with searching for scoped packages are solved and download counts work. The only thing left is that some 3rd party registries still don't support scoped. I think we are at a point where it seems pretty unreasonable to wait on that.

If you want reasons why:

- Naming is difficult: we don't have to check if someone else decided to use our naming convention for their own plugin
- Similarly, package squatting
  - Sometimes people will create `babel-preset-20xx` or some other package we will use because it's funny and then we have to make an issue/email them to ask for it back.
  - People have a legit package but it happens to be the same name as what we wanted to call it.
  - People see that a new proposal is merge (optional chaining, pipeline operator) and decide to fork and publish a version of it under the same name so that when we publish it errors saying it was already published 🤔. Then I had to find their email and email both them and npm support to get the package back and republish.
- What is an "official" package and what is a user/community package with the same name. We can get issue reports of people using misnamed or unofficial packages because they assumed it was part of Babel. One example of this was a report that `babel-env` was rewriting their `.babelrc` file, and it took a while to realize they thought it was `babel-preset-env`.

So it seems obvious we should do this, and if anything should of done it much earlier 🙂!

Examples of the scoped name change:

- `babel-cli` -> `@babel/cli`
- `babel-core` -> `@babel/core`
- `babel-preset-env` -> `@babel/preset-env`

### Renames: `-proposal-`

Any proposals will be named with the `-proposal` prefix now to signify that they aren't officially in JavaScript yet.

So `@babel/plugin-transform-class-properties` -> `@babel/plugin-proposal-class-properties`. And we would name it back when it gets to Stage 4.

### Renames: Drop the year from the plugin name

Previous plugins had the year in the name, but it doesn't seem to be necessary.

So `@babel/plugin-transform-es2015-classes` -> `@babel/plugin-transform-classes`.

Partially since this was only the case for es3/es2015 and we didn't change anything from es2016 or es2017. We are also deprecating the corresponding presets in favor of preset-env, and for the template literal revision just added it to the template literal transform for simplicity.

### Peer Dependencies + Integrations

We are introducing a peer dependency on `@babel/core` for all the plugins (`@babel/plugin-class-properties`), presets (`@babel/preset-env`), top level packages (`@babel/cli`, `babel-loader`).

`babel-loader` already had a `peerDependency` on `babel-core`, so this just changes it to `@babel/core`.

This is just so that people aren't trying to install these packages on the wrong version of Babel.

> For tools that already have a `peerDependency` on `babel-core` and aren't ready for a major bump since changing the peer dependency is a breaking change, we have published a new version of `babel-core` to bridge the changes over with the version [babel-core@7.0.0-bridge.0](https://github.com/babel/babel-bridge). For more information check out [this issue](https://github.com/facebook/jest/pull/4557#issuecomment-344048628)

Similarly, packages like `gulp-babel`, `rollup-plugin-babel`, etc all used to have `babel-core` as a dependency. Now these will also just have a `peerDependency` on `@babel/core`.

This lets all these packages not have to bump major versions when the `@babel/core` API hasn't changed.

### [#5224](https://github.com/babel/babel/pull/5224) Independent Publishing of Experimental Packages

> I mention this in [The State of Babel](http://babeljs.io/blog/2016/12/07/the-state-of-babel) in the `Versioning` section. [Github Issue](https://github.com/babel/babylon/issues/275)

You might remember that after Babel 6, Babel became a set of npm packages with its own ecosystem of custom presets and plugins.

However since then, we've always used a "fixed/synchronized" versioning system (so that no package is on v7.0 or above). When we do a new release such as `v6.23.0` only packages that have updated code in the source are published with the new version while the rest of the packages are left as is. This mostly works in practice because we use `^` in our packages.

Unfortunately this kind of system requires that a major version be released for all packages once a single package needs it. This either means we make a lot small breaking changes (unnecessary) or we batch lots of breaking changes into a single release. Instead, we want to differentiate between the experimental packages (Stage 0, etc) and everything else (es2015).

This means that we intend to make major version bumps to any experimental proposal plugins when the spec changes rather than waiting to update all of Babel. So anything that is < Stage 4 would be open to breaking changes in the form of major version bumps and same with the Stage presets themselves if we don't drop them entirely.

This goes with our decision to change TC39 proposal plugins to have the `-proposal-` name. If the spec changes, we will do a major version bump to the plugin and the preset it belongs to (as opposed to just do a patch version which may break for people). Then we'll need to work on deprecating the old versions and figuring out how to setup the infrastructure to automatically update people so everyone is up to date on what the spec will become (and not get stuck on something like we have with decorators).

### Speed

- fixes from bmuerer: https://twitter.com/rauchg/status/924349334346276864
- benchmark: https://github.com/v8/web-tooling-benchmark/issues/27
- 60% faster https://twitter.com/left_pad/status/927554660508028929

### Compiling `node_modules`
### preset-env: `"useBuiltins": "usage"`

### Upcoming

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

