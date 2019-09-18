---
layout: post
title:  "The Babel Podcast"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date:   2019-07-02 0:00:00
categories: announcements
share_text: "The Babel Podcast"
---

Today we're announcing the [The Babel Podcast](https://podcast.babeljs.io)!

> You probably use Babel, directly or as a dependency. But do you ever wonder who works on it? Henry Zhu chats with other members of the team, TC39, and the JS community about the future of JavaScript and how it's all maintained. Please join us in babbling about Babel (and everything else)!

### Subscribe with: [Apple]( https://podcasts.apple.com/us/podcast/the-babel-podcast/id1470143101) | [Google](https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkcy50cmFuc2lzdG9yLmZtL3RoZS1iYWJlbC1wb2RjYXN0) | [Spotify](https://open.spotify.com/show/3TK8x8AGckeEQEtnJVZYAz) | [RSS](https://feeds.transistor.fm/the-babel-podcast)

<!-- truncate -->

To start out, our first [episode](https://podcast.babeljs.io/rome) is with our good friend [Sebastian McKenzie](https://twitter.com/sebmck), the creator of Babel ([transcript](https://podcast.babeljs.io/rome/#transcript))!
 
<iframe src='https://share.transistor.fm/e/b65dd0f9' width='100%' height='180' frameborder='0' scrolling='no' seamless='true' style='width:100%; height:180px;'></iframe>

> It does take time to create and maintain these podcasts (equipment, research, editing, transcription), so consider [supporting](https://github.com/babel/babel?sponsor=1) us! We could also add specific podcast sponsors, so let [me](https://twitter.com/left_pad) know if you'd be interested in doing so.

## Why?

Personally, I've been getting into podcasts a lot lately: first with [Hope in Source](https://hopeinsource.com) ([blog](https://www.henryzoo.com/living-out-in-faith)) and recently [Maintainers Anonymous](https://www.maintainersanonymous.com) ([blog](https://www.henryzoo.com/maintainers-podcast)). After years of just listening to them, I finally felt the urge to start some, and now we're here.

I understand there are plenty of JavaScript podcasts, podcasts about open source, and maybe way too many podcasts in general; but I think there's room for a podcast about specific open source projects. We are in the interesting position to be able to talk about topics that level up the community as stewards of this infrastructure project.

Instead of being interviewed to talk about our own project, why not do it ourselves and have a space to go deeper? Many times the questions and responses are high level because the audience is not specific to the tool being mentioned, not interested, or just doesn't have enough context to understand. It can be more comfortable to just be yourself and not need to craft a specific response online. Why wait to speak on another platform when we have the chance to do it on our own time? Having our own "official" content as well (whether it's documentation, videos, workshops, etc) makes it easier for everyone (searching, newcomers, ourselves, etc).

If anything, this could help our team to better communicate to our users and the greater JavaScript community about how things work and an opportunity for us all to level up in understanding so more people can get involved and help out.

So what does it all mean? What could be interesting about a podcast specifically about Babel? Is talking about random bugs or issues of the day relevant or worth listening to? Let's talk about purpose.

## Goals

Podcasting doesn't have a lot of rules and we can do whatever seems fun: it also gives the capacity to explain things in detail and give a more personal, intimate touch, unlike social media (including GitHub).

- Inspire and inform would-be contributors to get involved (for more detailed topics I think I'd continue to try livestreams/videos)
- Helping people understand the ecosystem JavaScript better (the language/specification itself, TC39, culture).
- Learning about the people and context behind the tools we use: Babel maintainers/contributors, related projects like webpack/ESLint, TC39 committee.

Current non-goals: talk about news or a "this week in Babel", have a set weekly schedule, have a certain type of format (guests, 30 minutes, etc).

## Help Us Brainstorm Ideas!

> Please reach out to us at [@babeljs](https://twitter.com/babeljs) on Twitter or on the [repo](https://github.com/hzoo/podcast.babeljs.io) if you have guest suggestions, topic ideas, or feedback!

### Some Guest/Topics Ideas

What else do you want to hear about? Who do you want to hear from?

- Interviewing the core team/contributors: how did you get involved, what is exciting about the project, your role, the future?
- High level concepts in Babel (ASTs, visitor pattern, compilers, testing, JS specification)
- Background/struggles in key decisions we've made:
    - Removing stage presets
    - On private fields syntax (# instead of private)
    - Common questions: "Won't Babel be obsolete soon?"
    - Why did you do x?
- Chatting with various Babel plugin authors? [babel-macros](https://github.com/kentcdodds/babel-plugin-macros), i18n
- Babel alternatives: [traceur](https://github.com/google/traceur-compiler), [buble](https://github.com/bublejs/buble), [sucrase](https://github.com/alangpierce/sucrase), [swc](https://github.com/swc-project/swc)
    - It would be fun to chat about why the projects were made, what the differences/tradeoffs are, etc!
- Compile to JavaScript languages
    - Elm/Reason/etc (standalone language)
    - Coffeescript/Dart (explicitly recommends Babel for compiling down to ES5)
    - Fable (F#) (uses Babel itself)
    - TypeScript (we have an integration)
- Related tooling: CSSX, PostCSS
- Babel integrations (things that use Babel as infrastructure): Jest/Next.js/Parcel/CRA

### Language Standards/TC39 Topics

- Speak with folks on TC39 to explain how things are done, how to get involved, and what can change.
    - On Babel as a test bed for new features
    - How does it differ from other language standards like C or browser APIs?
    - History of a specific feature: how does it get finalized?
    - What’s a meeting like: who goes, how it is organized? Is there much arguing or voting?
    - How has decision making evolved over time? (the Staging process)
    - How is “feedback” received or taken?
    - How important are “edge cases”: why does it matter?
    - Perception of the language over time: moving too fast, moving too slow
    - Questions about language design: performance, usability, teachability, aesthetics, syntax budget, etc.
    - Ecosystem alignment: how is the language shaped by tools, libraries, other use cases other than the web?
- History of Committee Itself
    - Transitions: using a Word doc to GitHub, using TCQ, the "how we work" repo
    - Growth of committee over the years (language designers, implementers, practitioners, educators, combination)
    - Specific proposals: Object.observe, etc?
- Presenting a Proposal
    - Explaining the problem space
    - Scope: complexity of change, interactions with other features
    - Precedence: existing userland implementation, previous discussions, other languages, similar features

> We asked on [Twitter](https://twitter.com/left_pad/status/1093529997162237952) about the name and got some fun suggestions including Lost in Transpilation, Babbling On, Babel Babble, etc. But in the end, "The Babel Podcast" is the most clear!
