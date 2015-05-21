---
layout: post
title:  "Babel is not a transpiler"
author: James Kyle
date:   2015-05-20 22:30:00
categories: announcements
share_text: "Babel is not a transpiler"
---

It feels like only a few weeks ago that I was emailing Sebastian for the first
time to make suggestions about 6to5. The repo had about 500 stars at
the time and it only had a handful of ES6 transforms. That was actually about 7
months ago, and it's really a bit crazy how far the project has come in that
time.

There has been so much evolution that sometimes people are left confused about
what Babel _really_ is, and I would like to take the time to share our vision
with all of you.

Babel is _not_ a transpiler. Babel is a **platform** for transpiling.

There is a lot of JavaScript tooling out there that depends on static analysis
in order to function. However, lots of these tools are built on very shaky
foundation, and overall the tooling story for JavaScript has been a long one of
tears and broken dreams.

We can do better as a community.

Babel aims to build a better JavaScript ecosystem by providing a solid
foundation for our tooling. The fact that Babel can transpile future JavaScript
into JavaScript of today is secondary.

The reason Babel supports ES2015/ES2016 is the same reason it supports JSX and
Flow. It is because these things are requirements for building modern tooling.
The built-in transforms are just a default set of tools that run on the Babel
"platform".

This is why comparing Babel to Traceur, TypeScript, or CoffeeScript is a bit
shortsighted. Babel is much more than a transpiler, it's the basis for
developers to go out and build a better JavaScript ecosystem.

So I invite you to go out and build a better JavaScript.

> The Babel fish is probably the oddest thing in the Universe. [...] If you
> stick a Babel fish in your ear you can instantly understand anything in any
> form of language.
>
> – The Hitchhiker's Guide to the Galaxy

<p class="text-right">— The Babel team</p>
