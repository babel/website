---
layout: post
title:  "Nearing the 7.0 Release"
author: Henry Zhu
author_url: "https://twitter.com/left_pad"
date:   2017-11-03 12:00:00
categories: announcements
share_text: "Nearing the 7.0 Release"
---

> Please check out the previous [Planning for 7.0](https://babeljs.io/blog/2017/03/01/upgrade-to-babel-7) post for information up til the first beta release!

# Just started writing, so feel free to edit

### Deprecate yearly presets (babel-preset-es20xx)

TL;DR is use `babel-preset-env` instead.

What's better than having to decide for your what babel preset/plugin to use is if it was done for you, automatically. Although the amount of work that goes into maintaining the lists of data is humogous, it solves multiple issues: keeping users up to date with the spec, less configuration/package confusion, easier upgrade path, less issues about what is what. 

### Not removing Stage presets (babel-preset-stage-x)

https://twitter.com/left_pad/status/873242704364306433

### Scoped Packages (`@babel/x`)

Alright we only just changed every single package for Babel again 😂..

Here's a poll I did almost a year ago:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Thoughts on <a href="https://twitter.com/babeljs">@babeljs</a> using npm scoped packages for 7.0?</p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/821551189166878722">January 18, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Back then, there weren't a lot of projects using scoped packages so most people didn't even know they existed. I believe you also had to pay for a npm org account while now it's free (and supports non scoped packages too). The issues with searching for scoped packages are solved and download counts work. The only thing left is that some 3rd party registries still don't support scoped. I think we are at a point where it seems pretty unreasonable to wait on that, and maybe moving Babel itself to a scoped namespace will push that effort forward anyway?

Since people will complain/wonder why we are doing this:

- Naming is difficult: we don't have to check if someone else decided to use our naming convention for their own plugin
- Similarly, package squatting
  - Sometimes people will create `babel-preset-20xx` or some other package we will use because it's funny and then we have to make an issue/email them to ask for it back.
  - People have a legit package but it happens to be the same name as what we wanted to call it.
  - People see that a new proposal is merge (optional chaining, pipeline operator) and decide to fork and publish a version of it under the same name so that when we publish it errors saying it was already published 🤔. Then I had to find their email and email both them and npm support to get the package back and republish.
- What is an "official" package and what is a user/community package with the same name. We can get issue reports of people using misnamed or unofficial packages because they assumed it was part of Babel. One example of this was a report that `babel-env` was rewriting their `.babelrc` file, and it took a while to realize they thought it was `babel-preset-env`.

So it seems obvious we should do this, and if anything should of done it much earlier 🙂!

Examples of the scoped name change:

`babel-cli` -> `@babel/cli`
`babel-core` -> `@babel/core`
`babel-preset-es2015` -> `@babel/preset-es2015` (this is deprecated though, so use preset-env)
`babel-preset-env` -> `@babel/preset-env`

### TC39 Proposal Plugins (what isn't JS yet)

### Integrations

Packages like `grunt-babel`, `gulp-babel`, `rollup-plugin-babel`, etc all used to have `babel-core` as a dependency.

After v7, we plan to move `babel-core` to be a peerDependency like `babel-loader` has. This lets all these packages not have to bump major versions when the `babel-core` API hasn't changed. Thus they are already published as `7.0.0` since we don't expect any further changes to those packages.

### [#5224](https://github.com/babel/babel/pull/5224) Independent Publishing of Experimental Packages

> I mention this in [The State of Babel](http://babeljs.io/blog/2016/12/07/the-state-of-babel) in the `Versioning` section. [Github Issue](https://github.com/babel/babylon/issues/275)

You might remember that after Babel 6, Babel became a set of npm packages with its own ecosystem of custom presets and plugins.

However since then, we've always used a "fixed/synchronized" versioning system (so that no package is on v7.0 or above). When we do a new release such as `v6.23.0` only packages that have updated code in the source are published with the new version while the rest of the packages are left as is. This mostly works in practice because we use `^` in our packages.

Unfortunately this kind of system requires that a major version be released for all packages once a single package needs it. This either means we make a lot small breaking changes (unnecessary) or we batch lots of breaking changes into a single release. Instead, we want to differentiate between the experimental packages (Stage 0, etc) and everything else (es2015).

This means that we intend to make major version bumps to any experimental proposal plugins when the spec changes rather than waiting to update all of Babel. So anything that is < Stage 4 would be open to breaking changes in the form of major version bumps and same with the Stage presets themselves if we don't drop them entirely.

For example:

Say you are using preset-env (which keeps up to date and currently includes everything in es2015, es2016, es2017) + an experimental plugin. You also decide to use object-rest-spread because it's cool.

```json
{
  "presets": ["env"],
  "plugins": ["transform-object-rest-spread"]
}
```

If the spec to an experimental proposal changes, we should be free to make a breaking change and make a major version bump for that plugin only. Because it only affects that plugin, it doesn't affect anything else and people are free to update when possible. We just want to make sure that users update to the latest version of any experimental proposal when possible and provide the tools to do so automatically if that is reasonable as well.

### Release Process

> I believe the way we want to go about doing this is to move those packages into the `experimental/` folder in our [monorepo](https://github.com/babel/babel) instead of in `packages/`.
> Change our publish process (probably through Lerna) to publish the packages in `experimental/` independently.
