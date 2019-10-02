---
layout: post
title: "Babel Turns Three"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date: 2017-10-05 13:00:00
categories: announcements
share_text: "Babel Turns Three"
---

> Happy Birthday Babel! 🎂 (Sept 28)

Babel has really come a long way since [Sebastian](https://github.com/kittens) started the project only 3 years ago! A while back it was renamed from [6to5 to Babel](https://babeljs.io/blog/2015/02/15/not-born-to-die); for good reason as it has significantly contributed to the use of ES2015+ by [many companies](https://babeljs.io/users), libraries, and developers alike.

<!--truncate-->

And now it's even helping move the language forward by supporting the proposals coming from TC39. We're looking forward to being able to participate more in [TC39 meetings](https://twitter.com/loganfsmyth/status/844252727186149377).

We're really happy to see that the project itself has grown so much since [last year](https://babeljs.io/blog/2016/09/28/6.16.0)!

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">According to BigQuery there&#39;s 110,000 websites using <a href="https://twitter.com/babeljs?ref_src=twsrc%5Etfw">@babeljs</a>. (At least using the classes plugin). <a href="https://t.co/kOxlLsFKPX">pic.twitter.com/kOxlLsFKPX</a></p>&mdash; Sebastian McKenzie (@sebmck) <a href="https://twitter.com/sebmck/status/911336494824132608?ref_src=twsrc%5Etfw">September 22, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

- The number of contributors to our main repository has doubled from 200 to 400
- We've doubled the amount of [downloads to `babel-core`](https://www.npmjs.com/package/babel-core) (4.5m/month to 11m/month)
- Grew from 4500 to 7500 users on our [Slack community](https://babeljs.slack.com) (sign up [here](http://slack.babeljs.io/))
- Up to 2000 community `babel-plugin` packages [on npm](https://www.npmjs.com/search?q=babel-plugin) and over 1000 community `babel-preset` packages [on npm](https://www.npmjs.com/search?q=babel-preset)

## Sustainability

By every metric above, it seems like Babel is doing really well, and it is! A lot of that is just the result of network effects and people coming to using Babel as the norm for compiling JavaScript. However the project isn't just about the code, but everyone involved in it.

I tried to give some talks this year to explain not just [how Babel works](https://github.com/hzoo/so-how-does-babel-even-work) but what it's like to [maintain an Open Source project](https://github.com/hzoo/maintaining-an-oss-project). Hopefully I was able to get across the current state of things and start a dialog as many others have done about how we are to improve upon how we view OSS, not just for [maintainers themselves](https://github.com/hzoo/maintainer-heal-thyself) but the culture around it.

We've accomplished a lot, but we have to continue to work in multiple ways to make it better by funding/sponsoring maintainers, adding new contributors, and working with the community that we are a part of.

- Participated in [Summer of Code](https://babeljs.io/blog/2017/08/09/babel-and-summer-of-code), both Google and Rails Girls, with 4 awesome interns: [Peeyush](https://twitter.com/peeyFTW), [Karl](https://twitter.com/qantas94heavy), [Kara](https://twitter.com/KaraMarck), and [Emma](https://twitter.com/EmmaMDeacon)!
- Support from my team at [Behance](https://twitter.com/Behance) to work on Babel for [half my time at work](https://twitter.com/left_pad/status/867714802386444288)!
- [Justin](https://github.com/jridgewell) on the [AMP team at Google](https://twitter.com/AMPhtml/status/883373137517092864) is able to get 20% time at work to work on Babel as well as attend TC39 meetings (Google is a committee member)!
- We started an [Open Collective](https://opencollective.com/babel) with the hopes of funding maintainers in the future!
- An amazing team of maintainers: some of us just did an [AMA](https://hashnode.com/ama/with-babel-team-cj7awmk5e00ij54wu6onnyc5w). ([the team section](https://github.com/babel/babel#team) needs to be updated)

> Reach out to us if your company would like to contribute on work time: please join us in making Babel a sustainable project for everyone, not just as users but for our community!

---

## What's been happening?

### Deploying native ES2015+ is discussed more with [babel-preset-env](https://github.com/babel/babel-preset-env)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">New article: How to deploy ES2015+ code in production today (without transpiling to ES5) and why you should! <a href="https://t.co/jBMA8aKpyN">https://t.co/jBMA8aKpyN</a> <a href="https://t.co/nmV4kXEKiI">pic.twitter.com/nmV4kXEKiI</a></p>&mdash; Phil Walton (@philwalton) <a href="https://twitter.com/philwalton/status/908082461799616512?ref_src=twsrc%5Etfw">September 13, 2017</a></blockquote>

### New [babeljs.io/repl](https://babeljs.io/repl) in React thanks to [@brian_d_vaughn](https://twitter.com/brian_d_vaughn) and pull request urls thanks to [@Daniel15](https://twitter.com/Daniel15).

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">Give the new, experimental Babel REPL a try!<a href="https://t.co/OAbvglsdoG">https://t.co/OAbvglsdoG</a> <a href="https://t.co/rVnNIOazvs">pic.twitter.com/rVnNIOazvs</a></p>&mdash; Brian Vaughn (@brian_d_vaughn) <a href="https://twitter.com/brian_d_vaughn/status/898215894639423488?ref_src=twsrc%5Etfw">August 17, 2017</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Soon, pull requests to <a href="https://twitter.com/babeljs?ref_src=twsrc%5Etfw">@babeljs</a> will link to the REPL to make it easy to test! Here&#39;s a sneak peek: <a href="https://t.co/6rzvjlnb1w">https://t.co/6rzvjlnb1w</a> cc <a href="https://twitter.com/left_pad?ref_src=twsrc%5Etfw">@left_pad</a> <a href="https://t.co/NH7PiFYKaG">pic.twitter.com/NH7PiFYKaG</a></p>&mdash; Daniel Lo Nigro (@Daniel15) <a href="https://twitter.com/Daniel15/status/896511729185603584?ref_src=twsrc%5Etfw">August 12, 2017</a></blockquote>

### [test262](https://github.com/tc39/test262) tests against Babylon (and soon Babel) by [@JugglinMike](https://twitter.com/JugglinMike)

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">So looks like that&#39;s ~97.76% passing (55k tests!!) <a href="https://t.co/KlGeFM2a1r">pic.twitter.com/KlGeFM2a1r</a></p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/894370297264189440?ref_src=twsrc%5Etfw">August 7, 2017</a></blockquote>

### Increased participation on TC39

> So many committee members having been helping a lot with github issues, tracking/implementing/reviewing proposals, discussions in slack, and more: [@rwaldron](https://twitter.com/rwaldron), [@ljharb](https://twitter.com/ljharb), [@littledan](https://twitter.com/littledan), [@mathias](https://twitter.com/mathias), [@benjamn](https://twitter.com/benjamn), [@leobalter](https://twitter.com/leobalter), [@gsathya](https://twitter.com/_gsathya), [@gisenberg](https://twitter.com/the_gisenberg), [@kentcdodds](https://twitter.com/kentcdodds), [@bakkoting](https://twitter.com/bakkoting)

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">✍️ Updates from the Sept TC39 meeting this week for what we need to update in <a href="https://twitter.com/babeljs?ref_src=twsrc%5Etfw">@babeljs</a> (links go to separate issues) <a href="https://t.co/4nvusNIeJX">https://t.co/4nvusNIeJX</a> <a href="https://t.co/RP444BvZnO">pic.twitter.com/RP444BvZnO</a></p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/914118289181298688?ref_src=twsrc%5Etfw">September 30, 2017</a></blockquote>

### Babel 7 is soon!

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">Just published a post for the first <a href="https://twitter.com/babeljs?ref_src=twsrc%5Etfw">@babeljs</a> 7.0 beta release <a href="https://t.co/DnEfR4e8qb">https://t.co/DnEfR4e8qb</a></p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/907607921290301440?ref_src=twsrc%5Etfw">September 12, 2017</a></blockquote>

## Future Ideas

- Providing a ["metadata" plugin](https://github.com/babel/notes/issues/34) for users to grep for patterns in their codebases. This will be useful to figure out how people are using certain proposals (similar to what was done in [tc39/proposal-optional-chaining#17](https://github.com/tc39/proposal-optional-chaining/issues/17) for CoffeeScript regarding `?.`)
- Better codemod support for all proposals: ideally each proposal plugin should come with a plugin to remove/compile the proposal away if a proposal gets dropped or the syntax changes. Similarly, we can provide a codemod to automatically convert syntax over to the new proposal as well (ideally using [lebab](https://lebab.io))
- Figuring out tooling for publishing ES2015+ and how that interacts with polyfills, transform-runtime, babel-preset-env, npm, .mjs
- Fixing plugin ordering, traversal edge cases, `babel` package, `babel --init`, performance/size stats.

## Thanks

Again, thanks to all for using and contributing back to Babel! We're looking forward to what's in store for the project!
