---
layout: post
title:  "Removing Babel's Stage Presets"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date:   2018-07-27 12:00:00
categories: announcements
share_text: "Removing Babel's Stage Presets"
---

Moving forward with v7, we've decided it's best to stop publishing the Stage presets in Babel (e.g. `@babel/preset-stage-0`).

We didn't make this decision lightly and wanted bring show some context regarding TC39, new proposals, and Babel.

<!--truncate-->

## Some History

A Babel preset is a shareable list of plugins.

The [official Babel Stage presets](https://babeljs.io/docs/en/next/presets) tracked the [TC39 Staging process](https://tc39.github.io/process-document/) for new [syntax proposals](https://github.com/tc39/proposals) in JavaScript.

Each preset (ex. stage-3, stage-2, etc.) included all the plugins for that particular stage and the ones above it (ex. stage-2 included stage-3, etc).

---

This allowed users who wanted to use experimental syntax to simply add the preset, instead of needing to configure/install each individual plugin.

We actually [added](https://github.com/babel/babel/pull/2649) the Stage presets shortly after Babel's v6 release (it was previously a config flag in v5).

These are some older examples from Babel v6.

Common to see this in a config: 

```js
{
  "presets": ["es2015", "react", "stage-0"]
}
```

Original source of the package: [babel-preset-stage-0](https://unpkg.com/babel-preset-stage-0@6.0.14/index.js)

```js
module.exports = {
  presets: [
    require("babel-preset-stage-1")
  ],
  plugins: [
    require("babel-plugin-transform-do-expressions"),
    require("babel-plugin-transform-function-bind")
  ]
};
```

## Problems

These presets were a convenient way to use what we all wanted: the new, shiny, "yet-to-be-determined" future of JavaScript.

Looking back, it worked really well! (Maybe too well?)

### Too Good a Job?

Languages like [CoffeeScript](https://coffeescript.org/) and tooling like [Traceur](https://github.com/google/traceur-compiler) helped establish the idea that compiling JavaScript wasn't crazy. Babel made it even easier to both use new/future syntax and integrate with existing tooling. The expectations changed from skepticism and worry to completely embracing the experimental.

We probably wouldn't be where we are at if not for the wide adoption of compilers such as Babel: it accelerated the usage (and teaching) of ES2015 to a much larger audience. The growth of React further fueled usage as its JSX syntax, class properties, and object rest/spread led to people knowing a bit more about these syntax proposals.

Babel became a one-time setup for people, never to be thought of again. It became underlying infrastructure, hidden behind other tooling until there was a `SyntaxError`, dependency issues, or integration issues. Simply use `stage-0`.

This was awesome to see in some ways, as it meant that these ideas were being tested in the wild, even in production environments. However, it also meant that many companies, tools, and people would encounter some trouble if a proposal happened to change in a significant way (or even get dropped altogether).

### "ES7 Decorators"

Part of issue is precisely around naming things, and as we hear a lot, naming things is hard.

There were a lot of names for ES6 itself: Harmony, ES Next, ES6, ES2015. When people hear about new ideas it makes sense to just pick the latest number and attach the name to it.

Thus it's easy to [search](https://twitter.com/search?q=es7%20class%20properties&src=typd) [around](https://twitter.com/search?q=es7%20decorators&src=typd) for tweets/blog posts/talks that say something like "ES7 Decorators" and find it become the established name for it.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Your reminder that binding with :: is just an experimental proposal at stage 0 and might never become a part of JS. Don&#39;t call it &quot;ES7&quot;.</p>&mdash; Dan Abramov (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/785082176610115584?ref_src=twsrc%5Etfw">October 9, 2016</a></blockquote>

It's completely understandable that this happens without realizing it, but continuing to do so sets different expectations for how the language progresses. It's nothing to feel guilty about, we learn as a community and [remind](https://twitter.com/dan_abramov/status/785082176610115584) one another of how JavaScript works.

[Jay Phelps](https://twitter.com/_jayphelps/status/779770321003962369) wrote a nice [article](https://medium.com/@jayphelps/please-stop-referring-to-proposed-javascript-features-as-es7-cad29f9dcc4b) about the subject. He explains it would be best to call them by the "Stage" they are currently at: "Stage 2 Decorators", or just simply the "Decorators Proposal".

The reasoning is that saying "ES7 Decorators" assumes that Decorators is expected to be in ES7. I mentioned this in my [last post regarding compiling node_modules](https://babeljs.io/blog/2018/06/26/on-consuming-and-publishing-es2015+-packages#staging-process), but being in a particular Stage doesn't guarantee much: a proposal can stall, move backward, or get removed entirely.

We wanted to highlight this fact when we decided to [change the names](https://babeljs.io/docs/en/next/v7-migration#switch-to-proposal-for-tc39-proposals-blog-2017-12-27-nearing-the-70-releasehtml-renames-proposal) of the proposal plugins from `@babel/plugin-transform-` to `@babel/plugin-proposal-`.

What are we to do here? It does feel like part of our responsibility to make speaking about these proposals clear.

### Semver is Hard for Compilers

TODO: https://twitter.com/sebmck/status/685870041347305472, https://github.com/babel/babel/pull/3225 (rollup, flow, typescript, what about other compilers)

### Ecosystem Maintenance Burden

TODO: We push all other tools in a negative way, burdensome even for us! Can mention all the tooling that needs to be updated along the way and the lack of help. https://twitter.com/mjackson/status/619580016473456641, http://jshint.com/blog/new-lang-features/


### Back and Forth

We've had many issues to talk about what to do with the Stage presets over the years: [#4914](https://github.com/babel/babel/issues/4914), [#4955](https://github.com/babel/babel/issues/4955), [#7770](https://github.com/babel/babel/issues/7770)

I even wrote an older post about the release of 7.0 that said we *weren't* [removing them](https://babeljs.io/blog/2017/12/27/nearing-the-7.0-release) 😅.

Having the Stage presets in place lead to some issues for Babel itself:

- It was a common issue to ask something like: ["What presets(s) are needed to use async functions?"](https://github.com/babel/babel/issues/2948). It was difficult for people to be able to know what exactly "stage-0" meant, and few people would look at the `package.json` or source.
- Removing a plugin in Stage 3 is actually a breaking change. This issue is exacerbated when you are trying to use preset-env to not compile a natively supported proposal.

### BabelScript

[TC39](https://tc39.github.io/process-document/) strongly recommends caution with anyone using Stage 2 proposals or below and may feel pressure from the community to keep the implementation as is instead of making better or necessary changes for fear of breaking existing code or fragmentation (ex: using a different symbol like `#` for decorators instead of `@`). 

People joke that developers that use Babel are using "BabelScript" instead of JavaScript, that somehow once a Babel plugin is made for it, it must be "fixed" or in the language already (not true). For some, the first question that people think of when they see a new syntax or idea (Stage -1 😂) they ask whether there's a Babel plugin for it already.

Having presets for proposals so early in the process may imply to people that these proposals are guaranteed to move forward or have a stable implementation.

### Setting Expectations

But after it became normal for people to write in ES6 thanks to compilers, it was natural for developers to want to try out even newer "features". The way this worked in Babel was to use the `stage` flag in previous versions or the `stage-x` presets.

Being the most convenient way of opting into any new feature, it quickly became the default for people when configuring Babel (even though in Babel v6 it moved to not doing anything by default which there was a lot of complaints about).

It became common to see `"stage-0"` show up in libraries, boilerplates, talks, tweets, and slides.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;Just say no&quot; to `babel?stage=0` in production.</p>&mdash; Ryan Florence (@ryanflorence) <a href="https://twitter.com/ryanflorence/status/627154904302288897?ref_src=twsrc%5Etfw">July 31, 2015</a></blockquote>

There was a lot of good discussion even years ago, 
but it wasn't the easiest thing to navigate: we wouldn't want to penalize users that understood the tradeoffs by putting `console.warn`'s when using it, and not having the option at all seemed unreasonable at the time. 

Blindly opting in to Stage 0 (whether we had it by default) or people choosing to do so seems dangerous, but also never using any proposals maybe overly cautious and doesn't work with the strengths of using Babel. Ideally everyone is able to make an informed decision on the kinds of features that seem reasonable to them and use them wisely, whether they are at Stage 0 or not. [Mike Pennisi](https://twitter.com/jugglinmike) wrote a great [post](https://bocoup.com/blog/javascript-developers-watch-your-language) about these concerns.

It isn't our intention to threaten, rush, or force specific things into the ecosystem or JavaScript but faithfully maintain the implementation/discussions around new ideas so that they have been tested.

## Hesitations

Why not remove it earlier? Stage presets have been part of Babel for years and there were concerns with adding more "complexity" to using Babel. A lot of tooling, documentation, articles, and knowledge were around the Stage presets. And it seemed better to have officially maintained presets.

We're trying to determine the right level of feedback: if it's only the committee that decides what goes in the language it may lead to well-specified features that are not needed, but if the community expects that in-progress, experimental proposals are considered stable or alright to use in production without consequence then we have another issue. We all want to move forward and to proceed with intention: not rushing but not being too cautious. Babel can be the right place to do that experimentation but knowing where the boundaries are is necessary.

In the end, it actually makes more sense to remove the presets because it means that users have to explicitly opt-in to using new proposals. This would be considered a "feature" since it means someone would have to make the decision to use each proposal, which is reasonable for any proposal since they all have varying levels of instability, usefulness, complexity.

We do have some expectation of initial backlash but it does feel like removing the Stage presets is a better decision for us all in the long run.

TODO: mention stuff like https://news.ycombinator.com/item?id=11371906, https://www.reddit.com/r/javascript/comments/4c8isx/babel_6_useless_by_default_a_lesson_in_how_not_to/

## Migrating

TL;DR is that removing the Stage presets so that at some level, people will have to opt-in and know what kinds of proposals are being used instead of assuming what people should use, especially given the unstable nature of some of these proposals. If you use your own preset or a toolchain (i.e. [create-react-app](https://github.com/facebook/create-react-app)) it's possible this change doesn't affect you directly.

We deprecated the Stage presets in v7 as of `7.0.0-beta.52`, so if you don't want to change your config now we would suggest you *pin* the versions to `beta.54` until you can upgrade; after `beta.54` we will throw an error with how to migrate.

For a more automatic migration, we have updated [babel-upgrade](https://github.com/babel/babel-upgrade) which you can run with `npx babel-upgrade`.

Also, you are free to make your own preset that contains the same plugins and upgrade them as you please.

## The Future

TODO: Refer to previous [post](https://babeljs.io/blog/2018/07/19/whats-happening-with-the-pipeline-proposal) about configuring proposal plugins to not have default behaviors if in-flux.

We are trying to better position ourselves in the JavaScript ecosystem: being part of the TC39 process and being a resource for both implementing newer (Stage 0-2) proposals and receiving feedback from users.

---

TODO: considerations/alternatives/workarounds?

> `babel-init`?
> Rely on other higher level tools like create-react-app
> Tool to convert your current config into a shareable preset
> `babel-upgrade`

There are a lot of other ways to tackle this issue as well, and maybe we can use them if it makes more sense in the future.

- Versioning strategies: Independently version the presets and update them immediately when needed
- [Rename the presets](https://github.com/babel/babel/issues/4914)
- Keep them but warn/error when out of date?

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
