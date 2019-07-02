---
layout: post
title:  "Not Born to Die"
author: James Kyle
authorURL: https://twitter.com/thejameskyle
date:   2015-02-15 9:18:00
categories: announcements
share_text: "Not Born to Die: 6to5 has been renamed to Babel"
---

I like to start off our blog posts with the latest big thing 6to5 has achieved. We haven’t reached it quite yet, but in a few days 6to5 and 6to5-core will have been downloaded **half a million times**, and in a month or so it will be over a **million** times.

There has been a bit of confusion in the past as to 6to5’s role in the JavaScript community, which can largely be attributed to its name.

6to5 was not born to die.

<!--truncate-->

Even when the next edition of JavaScript is supported across all environments, the work that has gone into 6to5 will continue to serve an important role in the community.

From minifiers to beautifiers, from linters to code coverage instrumentors, compile-to-javascript languages and syntax extensions, code highlighters and on and on. There are two things that almost any tooling of any programming language depends on really heavily: parsers and transpilers.

The history of these tools in JavaScript has been long and sad. Everyone is constantly reimplementing the same things and it’s created an absolute mess. It’s also the number one reason new language features take a long time to roll out (i.e. “I love using Arrow Functions, but it breaks our code coverage”).

Luckily a lot of work is happening to improve this.

Recently a number of people from Mozilla, Esprima, The jQuery Foundation, Acorn, 6to5, ESLint, and others have come together to create [ESTree](https://github.com/estree/estree), a standard upon which all parser and transpiler tooling will be based on.

We want for 6to5 to solve the transpiler story. If the community could rally around a tool that provides a solid foundation for dealing with a lot of shared issues then we’ll all be much better off.

That might sound a bit absurd and like a fairly lofty goal. Many will think it’s _out of scope_ for something named “6to5”.

I guess it’d be a good idea to rename the project then!

6to5 is now Babel.

Babel will continue to serve as a JavaScript transpiler for using the very latest standards, but will also begin to open up its API for other tools. Anyone who has worked on the project internally knows that Babel is incredibly easy to work with.

We’re incredibly excited for the future and we hope that we can make an even bigger impact on the JavaScript community.

Always bet on JavaScript.

<p class="text-right">— The recently Babel team</p>
