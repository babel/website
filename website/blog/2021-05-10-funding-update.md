---
layout: post
title: "Babel is used by millions, so why are we running out of money?"
author: Babel Core Team
date: 2021-05-10 0:00:00
categories: announcements
share_text: "Babel is used by millions, so why are we running out of money?"
---

Since 2018, Babel has been doing a [funding experiment](https://babeljs.io/blog/2019/11/08/babels-funding-plans): can full time work on Babel be sustained? We've learned the answer might be no.

<!-- truncate -->

In November 2019, after successfully paying [Henry](https://twitter.com/left_pad) a salary for over a year, we [expanded our goal](https://babeljs.io/blog/2019/11/08/babels-funding-plans) to also support three additional maintainers: [Jùnliàng](https://twitter.com/JLHwung), [Kai](https://twitter.com/kai_cataldo), and [Nicolò](https://twitter.com/NicoloRibaudo).

Part of the Babel team ([Nicolò](https://twitter.com/NicoloRibaudo), [Jùnliàng](https://twitter.com/JLHwung) and [Henry](https://twitter.com/left_pad)) is still being paid a salary to work on Babel, but we now need to make some adjustments in light of the donations we are currently receiving. This update is to talk about that and ask for further support from the community.

## Looking Back

In 2018, Henry [left his job](https://www.henryzoo.com/in-pursuit-of-open-source-part-1/) to see if he could make a living working on open source and Babel, looking to people like [Evan You](https://twitter.com/youyuxi) as an example and for advice. He had already started work on getting more funding through the [Open Collective](https://opencollective.com/babel) that we had set up in 2017 to support the project and specifically our previous core team member [Logan Smyth](https://github.com/loganfsmyth), but it was difficult to do so early on while working half-time.

After a few months, the fundraising efforts allowed paying Henry every month: we settled on \$11,000 per month as a baseline salary for working full-time on open source. We had a large grant (\$10k for 10 months) from [Handshake](https://handshake.org/grant-sponsors/) which initially helped boost our funds, but even when it ended we didn't have problems paying our team thanks to some amazing sponsors such as Airbnb, Trivago, Gatsby, AMP, and Salesforce.

We didn't want to stop there. We thought that by demonstrating our ability to create and _pay_ a strong team, more features and improvements (and in turn, value) would be delivered via Babel, which would continue the momentum of funding and sponsorship. We decided to start paying [Jùnliàng](https://twitter.com/jlhwung), [Nicolò](https://twitter.com/NicoloRibaudo) and [Kai](https://twitter.com/kai_cataldo) a "part-time" rate: we could initially afford \$2,000 USD per month. Our hope was by [announcing this plan](https://babeljs.io/blog/2019/11/08/babels-funding-plans) and continuing our fundraising efforts, we would be able to increase the budget and raise them to the full-time rate.

## Where Babel is Today

It has been more than a year since then and we've both done and learned a lot.

[We've implemented](https://babel.dev/docs/en/features-timeline) support for many new ECMAScript proposals, kept up with every new TypeScript and Flow release, and designed [new features](https://babel.dev/assumptions) to allow producing smaller compiled output. We are now nearing the next major release, Babel 8.

Babel continues to be used by thousands of [companies all over the world](https://babeljs.io/en/users.html). It's integrated into all kinds of frameworks in the JavaScript ecosystem, whether it's React, Next.js, Vue, Ember, Angular, etc. We are hitting over [117 million downloads/month](https://www.npmjs.com/package/@babel/core). It powers custom plugins and optimizations in varied scenarios like CSS-in-JS, GraphQL, or localization across enormous code bases.

Babel also has become the intersection where practioners and language designers meet. We believe that it's become a vital part of the process used to test new ECMAscript proposals (hopefully, not with too many unstable proposals in production!). This creates the ability for JavaScript developers to try new features and give feedback to the TC39 committee and ultimately influence how the language evolves. Babel doesn't represent any individual company's interest but hopefully the JavaScript users eagerness to participate in new ideas. Even if you or your company don't directly use Babel, you can still directly benefit from how it can help standardizing language features.

## Our Current Funding Situation

Every project has unique funding propositions and problems. For Babel, people often don't directly interact with it: like most build tools, you set them up once at the beginning and then forget about them (until you find a bug, sometimes!).

You won't see job offers for a "Babel developer", even if most of the major JS frameworks are used with Babel. Additionally, with the growth of pre-configured frameworks such as Next.js that lift the responsibility of managing the underlying build tools from their users, it's not uncommon to use Babel without even knowing it. This makes it harder for our users to justify sponsoring us to their companies.

From the beginning, we knew we wouldn't have enough to pay anyone a full time salary, so Henry has been spending a lot of time attempting to get continued funding, giving talks at conferences and talking to companies. However, 2020 has negatively affected our funding, despite the tech industry's growth during this time. We lost some big sponsors, and Kai had to step down to get full-time work at another job.

We were hoping to see a continued increase in donations to be able to increase what Jùnliàng and Nicolò where taking, but it didn't happen.

<!-- Image source: https://observablehq.com/@nicolo-ribaudo/babel-opencollective-donations as of Apr 20, accounting -18k to spend this month (3*6k) -->

![Chart showing our OpenCollective balance decreasing since mid 2020](https://i.imgur.com/bsSHoRF.png)

## The Future

Despite these funding difficulties, we still want to keep paying our core team, in order to continue improving Babel. We want to focus on making Babel easier to configure, more performant, and produce more optimized output. We want to continue implementing new proposals while also ensuring that existing features are rock solid. We want to be able to spend time on better documentation of not just Babel itself but JavaScript and language design, creating an environment where any developer can tinker with making their own syntax if they choose. There's a large scope not in terms of the code we write but opportunities to bring more people into the language design space for people who might not have ever considered it. We have also published [a roadmap](https://babeljs.io/docs/en/roadmap#babel-2021-roadmap) to better communicate our medium-term goals.

We strongly believe that working in open source should be a viable and sustainable career path. We should be bringing everyone *up* to the same level, not *down*. However, we need to face the fact that this would mean draining [our current balance](https://opencollective.com/babel#category-BUDGET) in just a few months.

Everyone taking smaller and smaller amounts ends up creating a false sense of sustainability. It lowers how we value our own work, and what sponsors perceive to be sustainable amount of funding.

The reality is that, without more funding, we risk not being able to maintain the high standard of support and development that Babel and its users deserve. We risk losing more team members, who deserve to make a decent living in line with their skill level. The open source ecosystem also risks under-supporting a critical and widely used piece of technology.

## Our Ask

For now, Nicolò, Henry, and Jùnliàng will all be paid a temporary rate of \$6,000 per month. This doesn't solve the problem, but it gives us time while increasing the initial temporary \$2,000 USD salaries. The burn rate will still be more than the donations we currently receive each month, but our current balance allows us to sustain this amount until the end of 2021.

We'll do our best to balance all the priorities, while at reduced capacity due to being able to fund less of people's time and needing to spend some of that time finding new sponsors. Babel is not a company, a product, or service. And we have a small team, so we are the same people working on engineering and on funding. But it's a compromise we don't think we should have to make, considering the huge value that Babel delivers.

To fully fund the currently paid maintainers (but we would like to expand who is being paid, to include the whole core team), we need at least $333,000 per year, which is 2x what we're currently bringing in. Considering the amounts of money in the tech sector, this seems tiny in comparison—but it would make a big difference to Babel. Our story and stories like it make a big difference to the health and sustainability of the open source ecosystem overall.

**So, our ask is to help fund our work**, via [Open Collective](https://opencollective.com/babel) and [GitHub Sponsors](https://github.com/sponsors/babel). Though individual contributions do matter (and we deeply appreciate them), we are really looking for more companies to step up and become [corporate sponsors](https://opencollective.com/babel/contribute), alongside our current sponsors like AMP, Airbnb, Salesforce, GitPod, and others. If it would be better for your company to sustain us in other ways, we are also open to hearing any ideas. Reach out to us directly or by email at team@babeljs.io.

We intensely hope that we'll reach our goals: more and more companies use Babel to deliver their products, and what we are asking for is a tiny fraction of the value we provide. Babel is relied upon by a big part of the web, and it's in the interests of everyone to ensure that the project continues being maintained at the same quality levels as it is now.

<div style="display:flex; justify-content:space-around; align-items:center">
  <a href="https://opencollective.com/babel/donate" target="_blank" style="all:unset;cursor:pointer">
    <img alt="Donate to our OpenCollective!" src="https://opencollective.com/babel/donate/button@2x.png?color=blue" width=300 />
  </a>
  <iframe src="https://github.com/sponsors/babel/button" title="Sponsor Babel on GitHub" height="35" width="300" style="border: 0;background: transparent;"></iframe>
</div>
