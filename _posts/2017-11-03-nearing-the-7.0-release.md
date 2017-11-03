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

### TODOs?

> I believe the way we want to go about doing this is to move those packages into the `experimental/` folder in our [monorepo](https://github.com/babel/babel) instead of in `packages/`.
> Then we should rename all proposals to `babel-plugin-proposal-` instead of `babel-plugin-transform-`
> Change our publish process (probably through Lerna) to publish the packages in `experimental/` independently.

### Deprecate ES20xx presets

> We already deprecated preset-latest a while ago, and ES2016/ES2017 [earlier](https://twitter.com/left_pad/status/897483806499885057)
> It's annoying making a yearly preset (extra package/dependency, issues with npm package squatting unless we do scoped packages)

Developers shouldn't even need to make the decision of what yearly preset to use? If we drop/deprecate these presets then everyone can use [babel-preset-env](https://github.com/babel/babel-preset-env) instead which will already update as the spec changes.

### Using npm Scoped Packages

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Thoughts on <a href="https://twitter.com/babeljs">@babeljs</a> using npm scoped packages for 7.0?</p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/821551189166878722">January 18, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Seems like most who understood what scoped packages are were in favor?

Pros

- Don't have to worry about getting a certain package name (the reason why this was brought up in the first place).

> Many package names have been taken (preset-es2016, preset-es2017, 2020, 2040, etc). Can always ask to transfer but not always easy to do and can lead to users believing certain packages are official due to the naming.

Cons

- We need to migrate to new syntax
- Still unsupported on certain non-npm tools (lock-in)
- No download counts unless we alias back to old names

Sounds like we may want to defer, and in the very least it's not a breaking change given it's a name change.
