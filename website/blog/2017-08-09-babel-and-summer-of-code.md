---
layout: post
title:  "Babel and Summer of Code 2017"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date:   2017-08-09 12:00:00
categories: announcements
share_text: "Babel and Summer of Code 2017"
third_party_js:
- https://platform.twitter.com/widgets.js
custom_js_with_timestamps:
- docs.js
---

For the first time, Babel is participating in *Summer of Code*!
Although we forgot to make an announcement post earlier, here's our progress update 😊

<!--truncate-->

## What is it?

### [Google Summer of Code](https://summerofcode.withgoogle.com/)

> [Babel's Profile for GSoC](https://summerofcode.withgoogle.com/organizations/5842528113786880/)

GSoC is an international annual program which pairs open source projects and university students! We work with the students on a project and Google pays them a stipend.

#### Peeyush Kushwaha (India)

- Github: [@peey](https://github.com/peey), Twitter: [@peeyFTW](https://twitter.com/peeyFTW)

#### Karl Cheng (Australia)

- Github: [@Qantas94Heavy](https://github.com/Qantas94Heavy), Twitter: [@qantas94heavy](https://twitter.com/qantas94heavy)

We're happy to be working with both Peeyush and Karl!

Peeyush has already made a [bunch of PRs](https://github.com/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3Apeey+user%3Ababel+is%3Aboth) with improving documentation and bug fixes. In addition, he's been focusing on the much desired [decorators transform](https://github.com/tc39/proposal-decorators). We'll be updating [this issue](https://github.com/babel/proposals/issues/11) with more progress.

Karl has similarly made many [contributions already](https://github.com/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3AQantas94Heavy+user%3Ababel+), and is now focusing on the private properties transform (now part of the [combined class properties proposal](https://github.com/tc39/proposal-class-fields)). We'll be updating [this issue](https://github.com/babel/proposals/issues/12) with more progress.

To track their work on these transforms and the progress of other specs/proposals, be sure to check out the [Babel TC39 Proposal Status Tracker](https://github.com/babel/proposals).

It's been really amazing working with them the past 2 months! We've really enjoyed teaching, working, and learning with them on the project. Partnering with TC39 in making these Babel plugins a reality has also been helpful for everyone.

### Rails Girls Summer of Code

> [Babel's RGSoC Page](https://teams.railsgirlssummerofcode.org/teams/307)

RGSoC is a similar program to GSOC: annual, global, pays a stipend, brings projects and newcomers together, with a focus on bringing diversity into Open Source.

#### Kara de la Marck (London)

- Github: [@MarckK](https://github.com/MarckK), Twitter: [@KaraMarck](https://twitter.com/KaraMarck)

#### Emma Deacon (London)

- Github: [@EmmaDeacon](https://github.com/EmmaDeacon), Twitter: [@EmmaMDeacon](https://twitter.com/EmmaMDeacon)

Where RGSoC differs from GSoC is that it matches developers with team coaches in addition to the open source project's  mentors. Pivotal London is working with Kara and Emma as their daily coworkers/supporters. We are lucky to have _seven_ awesome coaches from their organization to help them, while on our side we can leave feedback on issues/PRs in GitHub and in our Slack.

We're incredibly lucky to work with both Kara and Emma!

They're currently working on some codemods! Ideally we would have codemods to convert ES2015 to ES2016+ ([Lebab](https://lebab.io/)) and if necessary, codemods to remove dropped TC39 proposals. We'd also want to have codemods for our upcoming Babel 7 release for a easy/automated upgrade!

In the meantime, they've already done all the necessary work to implement the new [optional catch binding](https://github.com/tc39/proposal-optional-catch-binding) proposal as a plugin! It was really cool to see that we had already released the Babel plugin before the TC39 meeting a few weeks ago! You can follow this [issue](https://github.com/babel/proposals/issues/7) for more information.

## Why?

- Participating in these programs means more developer exposure to participating in open source!
- Helps us as a project onboard and mentor new contributors in a more formal, structured way. It helps us identify any issues with our code setup, and more importantly with our process (multiple timezones, different backgrounds) and culture.
- Helps bring in different people into the project that otherwise may not have contributed to Babel or open source. The hope is that they continue to stick around or be involved in the open source community! We want to do our part to make open source a welcoming and diverse community, focusing on individuals first.
- We get _four_ full time people working on our project for a whole summer! This is a great opportunity for each of them to work on high impact problems, and for us to be in a support role to help them succeed.
- Hopefully it inspires some to get involved as a result of the program, and for others to step up as mentors/maintainers (ideally from the hundreds of top companies that use this project everyday) to bring people in.
- Ultimately, this is just about building a community and making a great experience for our students/interns.

It takes a lot of work to get involved in any community, and it's up to the people already involved to make this as easy as possible to join in. It requires one to spend the time to meet people where they are at (in many ways), not just write code but to invest in others. A community is about the people, and open source is about the community.

Participating in Summer of Code gives us a great opportunity to make this happen, and we're continuously working on improving.

Look at all the amazing work they've already done! We're really excited for what's to come and will do another post on our results and what we've learned.

> Look out for next year's [RGSoC](https://twitter.com/RailsGirlsSoC) and [GSoC](https://twitter.com/gsoc) if you want to participate (for your own project, as a participant, or to help us out) *cough Sean*.

---

## Thanks

To my team at Behance/Adobe for allowing me to spend time at work maintaining Babel and participating in Summer of Code!

Thanks to all the other helpers/maintainers ([Brian](https://github.com/existentialism), [Logan](https://github.com/loganfsmyth), [Jessica](https://github.com/Jessidhia), [Sven](https://github.com/xtuc), [Justin](https://github.com/jridgewell), [Boopathi](https://github.com/boopathi)), on Slack and GitHub issues! It can be a lot of work managing all the parts of an open source project, so we are glad to have the extra help!

Huge shoutout to many [TC39](https://github.com/tc39) members like [@littledan](https://twitter.com/littledan), [@bakkoting](https://twitter.com/bakkoting), [@ljharb](https://twitter.com/ljharb) for helping review PRs, better inform/work on [babel/proposals](https://github.com/babel/proposals), and discuss implementation/spec details in our Slack rooms! I know it's a lot of work 🙂

And thanks to [Brian](https://github.com/existentialism) again for help with editing!
