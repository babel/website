---
layout: post
title:  "Zero-config code transformation with babel-macros"
author: Kent C. Dodds
date:   2017-09-11 11:00:00
categories: announcements
share_text: "Zero-config code transformation with babel-macros"
custom_js_with_timestamps:
- docs.js
guest_post: true
guest_description: |
  This is a guest post from Kent C. Dodds. Kent works at PayPal.
  Follow Kent on <a href="https://github.com/kentcdodds">GitHub</a>,
  and <a href="https://twitter.com/kentcdodds">Twitter</a>.
---

Babel started out as a transpiler to let you write the latest version of the ECMAScript specification but ship to environments that don't implement those features yet. But it has become much more than that. ["Compilers are the New Frameworks"](https://tomdale.net/2017/09/compilers-are-the-new-frameworks/) says [Tom Dale](https://twitter.com/tomdale) and I could not agree more. We're seeing more and more compile-time optimizations for libraries and frameworks. I'm not talking about syntax extensions to the language, but simple code transformations that enable patterns that would be difficult to accomplish otherwise. One of my favorite things about compiler plugins is that you can use them to optimize the user experience and developer experience at the same time. (Read more about ["How writing custom Babel & ESLint plugins can increase productivity & improve user experience"](https://medium.com/@kentcdodds/how-writing-custom-babel-and-eslint-plugins-can-increase-your-productivity-and-improve-user-fd6dd8076e26)).

I have a few problems with Babel plugins though:

1. They can lead to confusion because when looking at code in a project, you might not know that there's a plugin transforming that code.
2. They have to be globally configured or configured out-of-band (in a `.babelrc` or webpack config).
3. They can conflict in very confusing ways due to the fact that all babel plugins run simultaneously (on a single walk of Babel's AST).

These problems could be solved if we could import Babel plugins and apply them directly to our code. This would mean the transformation is more explicit, we wouldn't need to add them to configuration, and ordering can happen in the order the plugins are imported. Wouldn't that be cool!?!?

## Introducing [`babel-macros`](https://github.com/kentcdodds/babel-macros) 🎣

Guess what! A tool like this exists! `babel-macros` is a new Babel plugin that allows you to do exactly what we're talking about. It's a "new" approach to code transformation. It enables you to have zero-config, importable code transformations. [The idea](https://github.com/threepointone/babel-macros) came from [Sunil Pai](https://twitter.com/threepointone) and caught my attention in [this create-react-app issue](https://github.com/facebookincubator/create-react-app/issues/2730).

So what does it look like? Whelp! There are already a few `babel-macros` packages out there you can try today!

Here's a real-world example of using [`preval.macro`](https://github.com/kentcdodds/preval.macro) to inline an SVG in [a universal application](https://github.com/kentcdodds/glamorous-website) built with [Next.js](https://github.com/zeit/next.js):

```javascript
import preval from 'preval.macro'
import glamorous from 'glamorous'

const base64SearchSVG = preval`
  const fs = require('fs')
  const path = require('path')
  const svgString = fs.readFileSync(path.join(__dirname, 'svgs/search.svg'), 'utf8')
  const base64String = new Buffer(svgString).toString('base64')
  module.exports = base64String
`

const SearchBox = glamorous.input('algolia_searchbox', props => ({
  backgroundImage: `url("data:image/svg+xml;base64,${base64SearchSVG}")`,
  // ...
}))
```

What's cool about this? Well, the alternative would look exactly like the example above except:

1. It's less explicit because there would be no `import preval from 'preval.macro'` in the source code.
2. Have to add `babel-plugin-preval` to your babel configuration. 
3. Need to update your ESLint config to allow for the `preval` variable as a global.
4. If you misconfigured `babel-plugin-preval` you'd get a cryptic error like: `Uncaught ReferenceError: preval is not defined`.

By using `preval.macro` with `babel-macros`, we don't have any of those problems because:

1. The import is there and used explicitly.
2. `babel-macros` needs to be added to your config, but only once, then you can use all the macros you'd like (even local macros!)
3. No need to update ESLint config because it's explicit.
4. If you misconfigure `babel-macros` then you'll get [a much more friendly error message](https://github.com/kentcdodds/babel-macros/blob/f7c9881ee22b19b3c53c93711af6a42895ba1c71/src/__tests__/__snapshots__/index.js.snap#L100) that indicates what the actual problem is pointing you to documentation.

**So what is it really? The TL;DR is that `babel-macros` is a simpler way to write and use Babel transforms.**

There are already several [published `babel-macros`](https://www.npmjs.com/browse/keyword/babel-macros) you can use, including [`preval.macro`](https://github.com/kentcdodds/preval.macro), [`codegen.macro`](https://github.com/kentcdodds/codegen.macro), [`idx.macro`](https://github.com/dralletje/idx.macro), [`emotion/macro`](https://github.com/emotion-js/emotion/blob/master/docs/babel-macros.md), [`tagged-translations/macro`](https://github.com/vinhlh/tagged-translations#via-babel-macros), [`babel-plugin-console/scope.macro`](https://github.com/mattphillips/babel-plugin-console#macros), and [`glamor` 🔜](https://github.com/threepointone/glamor/pull/312).

## Conclusion

I think we've only begun to scratch the surface of what `babel-macros` can do. I'm hoping that we can land it in [create-react-app](https://github.com/facebookincubator/create-react-app/issues/2730) so folks using `create-react-app` can have even more power with zero configuration. I'm really excited to see more Babel plugins expose a `macro` in addition to the existing plugin functionality they already have. I can't wait to see folks create macros that are specific to their project needs.

**Creating a macros is even easier than a regular Babel plugin**, but it does require a bit of knowledge around ASTs and Babel. If this is new to you, there are [a](https://kentcdodds.com/talks/#writing-custom-babel-and-eslint-plugins-with-asts), [few](https://github.com/thejameskyle/babel-handbook), [resources](https://kentcdodds.com/workshops/#code-transformation-and-linting) for you 😀

Good luck to you all! 👋

P.S. I should mention that language macros are not a new concept at all. Being able to teach a language new tricks has been around for a very long time. In fact, there's already [such a tool for JavaScript](http://sweetjs.org/) and even [one implemented as a Babel plugin already](https://github.com/codemix/babel-plugin-macros). `babel-macros` takes a slightly different approach however. While macros have often been associated with defining new syntax for a language, that's not the goal of `babel-macros` at all. In the case of `babel-macros` it's more about code transformations.
