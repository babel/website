---
layout: post
title:  "Babel's Funding Plans"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date: 2019-11-08 12:00:00
categories: announcements
share_text: "Babel's Funding Plans"
---

One of the greatest strengths of open source software is that it is open and free for anyone to contribute. This also leads to one of its greatest challenges, which is to support consistent, sustainable maintenance.

Babel isn't a company. As mentioned in the [7.0.0 post](https://babeljs.io/blog/2018/08/27/7.0.0#maintainers-are-people), the all-volunteer Babel team (sans Henry) has been doing its best to steward the project and handle all the expectations of the community. We're glad that we have continued to make releases, but even keeping up-to-date with reported issues is difficult to manage, let alone our integrations with other tools, new proposals, and effect on the greater ecosystem.

In March 2018, Henry [left his job](https://www.henryzoo.com/leaving-behance/) to start [working on securing more funding for Babel](https://www.henryzoo.com/in-pursuit-of-open-source-part-1/). After a lot of work and support from the community, the team was able to fund Henry as a full-time maintainer.

This has been a big win for the team, but we're finding that it is not enough.

<!-- truncate -->

## New Challenges

Babel has come a long way from [its origins as "6to5"](https://www.youtube.com/watch?v=fntd0sPMOtQ), growing beyond just the *adoption* and implementation of language features in JavaScript. It has become a key part in its _development_:

- Babel's popularity has increased exponentially, going from 3M downloads per week in March 2018 to 16M downloads per week today.

- Babel is now involved in the [TC39](https://tc39.es) standards process as participating members in meetings and discussions. "Is there a Babel plugin already?" is a common question for new proposals.

- Babel has become so embedded as underlying infrastructure that most developers interact with it indirectly, including in CLIs such as [`create-react-app`](https://github.com/facebook/create-react-app), bundlers like [Parcel](https://parceljs.org), frameworks like [Next.js](https://nextjs.org), and many npm libraries.

Widespread adoption brings with it new challenges, and the team has been grappling with issues around maintenance and sustainability. The project has grown beyond the resources the team has available, and we'd like to share our plan for addressing this problem.

## Funding Plans

We believe that Babel would benefit immensely from more than one person being funded to work on the project, and want to secure funding for three additional team members, [Nicolò](https://twitter.com/NicoloRibaudo), [Jùnliàng](https://twitter.com/JLHwung), and [Kai](https://twitter.com/kai_cataldo) as part-time maintainers.

We are setting up an additional funding goal of $12,000/month through [Open Collective](https://opencollective.com/babel). This is $4,000/month each, which is the target we have defined for a part-time salary.

We discussed a number of different approaches as a team – creating an hourly rate for contributors, setting aside grants for features, bug bounties for specific issues – and ultimately decided that a stable income would lead to higher quality work (no pressure to rush development), the ability to dedicate time to plan for a roadmap in a more holistic manner, being able to take time for breaks and vacation, and not having to worry about where their next paycheck is coming from.

That being said, we will continue to evaluate and be open/transparent with making changes as needed.

We'd like to give a huge shoutout to our Open Collective sponsors: [Handshake](https://handshake.org/), [Airbnb](https://twitter.com/airbnbeng), [AMP](https://amp.dev/), [Facebook](https://opensource.facebook.com), [trivago](https://tech.trivago.com/opensource/), [Salesforce](https://twitter.com/salesforceeng), [Frontend Masters](https://frontendmasters.com/), [RunKit](https://runkit.com/home), [Webflow](https://webflow.com/), [Adobe](https://www.adobe.com/), [Coinbase](https://www.coinbase.com/), [BitMEX](https://www.bitmex.com/), and everyone else who has donated!

![Babel Open Collective monthly donations graph](https://i.imgur.com/C76KsKZ.png)

__One thing we'd like to note:__ Collectives currently only show the total annual amount donated, which may work better with a one-time grant donation model. We believe that showcasing the monthly recurring amount is a more accurate description of the financial health of our project, and the team is hoping to help out with this [issue](https://github.com/opencollective/opencollective/issues/1585).

## How You Can Help

You can financially contribute to Babel on our [Open Collective](https://opencollective.com/babel)!

Our team is using [Open Collective](https://opencollective.com/babel) to fund our team members. Both companies and individuals and donate to the team, either as a one-time or recurring donation.

If you have any questions or concerns about financially contributing to Babel we'd be happy to discuss by [email](team@babeljs.io).

And in case your company is located in one of the cities that the core team lives in we'd also love to meet in-person!

- [Henry](https://twitter.com/left_pad) is based in NYC and will be in the Bay Area November 4th-15th.
- [Nicolò](https://twitter.com/NicoloRibaudo) is based in Italy and will be in Moscow November 6th-10th.
- [Brian](https://twitter.com/existentialism) is based in Houston, TX.
- [Jùnliàng](https://twitter.com/JLHwung) is based in Ontario.
- [Kai](https://twitter.com/kai_cataldo) is based in the New York City area.

The team would appreciate hearing about how you are using Babel or how you are looking to get involved.

## Our Goals

We will be writing up more in-depth posts on these topics, but here are some general areas where we aim to continue focusing on:

- **Stability**: This includes checking against the official [test262](https://github.com/tc39/test262) tests. This [support](https://github.com/babel/babel/issues/4987) gives us a better sense of our spec compliance so we know what is missing, adding smoke tests using Babel itself and our top dependents, in addition to our own tests. Reliability is extremely important to us given our position in the ecosystem.

- **Debuggability**: We would like to implement better warnings/errors on [configuration](https://github.com/babel/babel/issues/10617) and explain what is being outputted to help users make decisions on code size. Given the complexity of a pluggable tool tracking an ever-changing specification, it can be hard to hide the complexity. We would really like to spend time on making our usage more accessible.

- **General ecosystem support**: This includes what we can do to help libraries publish ES2015+ code and for developers to target new browsers and ship less code (your own code, node_modules, [polyfills](https://github.com/babel/babel/issues/10008)) when possible, while still making it accessible for all browser users.

- **Codemods**: We would like to put more emphasis on the opposite direction of code transformation (aka 5to6, [Lebab](https://github.com/lebab/lebab)), which is a powerful idea that we can help educate the community about. This would help with the transition between changes in the proposal (or if it's dropped/stalled) via an upgrade tool. 

And long term:

- **Proposal Advancement**: Our goal is to enable a feedback loop for proposal champions to get validation through "real world" use cases within the JavaScript community. This will ultimately only happen if the plugin is adopted, there's enough time for people to use it and learn its implications, and for there to be a workflow in place for dialogue with and giving feedback to the TC39 committee. We would like to figure out how to best be a resource for more community members to understand the TC39 process and get involved in the improvement of JavaScript from the ground up. This requires plugins tracking the proposals to be created in a timely fashion and maintained, which requires a considerable amount of effort. This is especially true with plugins for early stage proposals, since these plugins require continued maintenance as proposals are updated.
- **Education**: Related to this is an aspiration to help more developers understand the tools they use. Many tools and frameworks, particularly in the JavaScript ecosystem, operate over similar core concepts (such as ASTs). Leveling the playing field empowers more people to contribute, fix issues, and bring new ideas to the table. Language development has a high barrier to entry that our project can help lower.

## How Companies and Individuals Have Helped Before

We know that as maintainers we need to do outreach for our project and for open source as a whole. Our efforts up to this point have consisted of the following:

- [Thinkmill](https://www.thinkmill.com.au/) funded 3 months of part-time work on Babel for Sebastian, the creator of Babel, while he was employed there. This was followed by 3 months working part-time on Babel at [Cloudflare](https://www.cloudflare.com/). And then almost 12 months of full-time work while employed by [Facebook](https://opensource.facebook.com/), which included the entire release of Babel 6.
- Adobe funded 50% of Henry's work on Babel during his time working there.
- We've helped companies during internal open source-oriented hackathons, including [Condé Nast](https://technology.condenast.com/) and [Bloomberg](https://www.techatbloomberg.com/) and hosting workshops on open source and Babel development at companies like Netflix.
- Speaking at [companies](https://twitter.com/left_pad/status/1190398587538202624?s=20) like Spotify/Facebook, local [meetups](https://twitter.com/left_pad/status/1184301596437549056?s=20), bootcamps, [universities](https://twitter.com/left_pad/status/1191515333347004416?s=20) like Berkeley, and participating in [Hacktoberfest](https://twitter.com/bendhalpern/status/1050181229910331392?s=20) events.

Supporting the project is not limited to just financial means. Different companies have allowed their employees to implement some specific features during their working time:

- [Bloomberg](https://www.techatbloomberg.com/)'s folks have implemented support for different class features (like private fields), and are currently working on automatic testing of Babel's transforms using the official ECMAScript test suite (Test262)

- [Trivago](https://tech.trivago.com/), which was also a Base Support Sponsor, has implemented the partial application proposal

- [RunKit](https://runkit.com/) has been working with Nicolò as a contractor to implement syntactic placeholders in `@babel/template`.

Support can ultimately an opportunity to talk and learn from maintainers, provide real-world feedback to the project, and build a long-term relationship.

> We get a lot of valuable ideas from our relationships with maintainers. It's almost a proxy for hiring the best people in the world, only for a limited amount of time. Open Collective gives a business like ours access to a diverse talent pool that would be impossible to build internally. - [Guillermo Rauch](https://blog.opencollective.com/zeit/)

Want to get involved? Learn more in the [How You Can Help section](#how-you-can-help).

## Conclusion

In an ideal world, Babel wouldn't even be necessary. However, in practice, there may always be gaps between where JavaScript is at with future proposals, when vendors can implement them (after Stage 3), what browsers a given website supports, and what Node.js versions are supported for a given library. In that sliding window of functionality is where a tool like Babel can provide significant value.

While we are excited for where Babel will go in the future, the team has been struggling to keep up with the current demands of the project for quite some time.  Meeting our funding goals will allow us to not only better meet the current needs of the project, but also help push it into the future.

We hope you will join us in [supporting](https://opencollective.com/babel) this community, whether through sponsorship of the core team or getting involved in the project.

Thanks and we hope to see you around, whether in-person or on GitHub!
