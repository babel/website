---
layout: post
title:  "What's Happening With the Pipeline (|>) Proposal?"
author: James DiGioia
authorURL: https://twitter.com/JamesDiGioia
date: 2018-07-19 12:00:00
categories: announcements
share_text: "What's Happening With the Pipeline (|>) Proposal?"
---

With the release of [babel@7.0.0-beta52](https://github.com/babel/babel/releases/tag/v7.0.0-beta.52), we introduced a new required configuration flag to `@babel/plugin-proposal-pipeline-operator`, a breaking change for the pipeline operator. To clear up any confusion, let's take a look at the pipeline proposal and why we needed to introduce this configuration option.

<!--truncate-->

## Current Status

The pipeline operator was originally [introduced](https://github.com/babel/babel/pull/3159) by [Gilbert Garza](https://github.com/gilbert), providing a clean syntax for "streamlining chained function calls in a readable, functional manner." The pipeline operator has roots in a number of languages, including F#, Hack, Elm, Elixir, and others, but there were two major points of contention in introducing the new syntax to JavaScript:

* Whether and how to introduce placeholders
* How to handle async / await in the pipeline

### Placeholders

The first issue was the question of placeholders. This was first raised by [Kevin Smith](https://github.com/zenparsing) in [this issue](https://github.com/tc39/proposal-pipeline-operator/issues/84), where he suggested [Hack-style pipelining](https://docs.hhvm.com/hack/operators/pipe-operator). In Hack, a placeholder is required for every right-hand side of the pipeline, as in this example:

```hack
namespace Hack\UserDocumentation\Operators\Pipe\Examples\MapFilterCountPiped;

function piped_example(array<int> $arr): int {
  return $arr
    |> \array_map($x ==> $x * $x, $$)
    |> \array_filter($$, $x ==> $x % 2 == 0)
    |> \count($$);
}

var_dump(piped_example(range(1, 10)));
```

We built on this concept, as a placeholder can easily be used in arbitrary expressions, with the placeholder representing the value returned from the previous step. This affords additional flexibility and power within a pipeline step.

The downside is the complexity involved in introducing a new token. The hash (`#`) is the current choice, and although this is still open to bikeshedding, any token would potentially have multiple meanings. The hash is also used by the [private fields proposal](https://github.com/tc39/proposal-class-fields#private-fields), and [all other options are in use in one form or another](https://github.com/tc39/proposal-partial-application/issues/21#issuecomment-361092565).

### Async / Await

The initial introduction of the pipeline included this syntax for `await`:

```js
x |> await f
```

which would desugar to

```js
await f(x)
```

Unfortunately, users may expect this alternative desugaring:

```js
(await f)(x)
```

While there was pushback on the idea of including async handling in the pipeline at all, committee members expressed concern about a pipeline operator that didn't handle async/await. While there are ways to handle Promise-returning functions without explicit syntax, they are too cumbersome to be useful or require a helper function.

## Proposed Solutions

As a result of these discussions, two proposals, along with a base minimal proposal, emerged to resolve them: F# Pipelines and Smart Pipelines. Let's go through how they resolve the problems posed above.

### [Minimal Pipelines](https://github.com/tc39/proposal-pipeline-operator/)

This proposal covers the basic functionality of the pipeline operator. The minimal proposal bans await, so there's no async handling involved at all, and includes no placeholders. It matches the behavior of the babel plugin before we introduced the configuration and is the current specification in the pipeline operator proposal repository. It functions more as a straw man, to compare the benefits and tradeoffs of other the proposals, and is unlikely to be accepted as-is without lethal defects in both of the alternatives.

### [F# Pipelines](https://github.com/valtech-nyc/proposal-fsharp-pipelines/)

On the question of placeholders, F# Pipelines argue they're not needed. In the base proposal, arrow functions fill the area placeholders fill, requiring less new syntax and building on a syntax developers are already familiar with and have been using since ES2015.

As currently specced, arrow functions are required to be wrapped in parentheses:

```js
let person = { score: 25 };

let newScore = person.score
  |> double
  |> (_ => add(7, _))
  |> (_ => boundScore(0, 100, _));
```

Exploration is underway to determine whether it would be feasible to enable arrow functions to be used without parentheses, as they are a significant syntactical burden.

On the question of async, F# Pipelines treat `await` similar to a unary function:

```js
promise |> await
```

This would desugar to:

```js
await promise
```

and can thus be used in the middle of larger function chains with async:

```js
promise
  |> await
  |> (x => doubleSay(x, ', '))
  |> capitalize
  |> (x => x + '!')
  |> (x => new User.Message(x))
  |> (x => stream.write(x))
  |> await
  |> console.log;
```

The special casing of `await` could potentially enable other unary operators to be used similarly (e.g. `typeof`), but the F# pipelines don't support them initially.

### [Smart Pipelines](https://github.com/js-choi/proposal-smart-pipelines/)

Smart Pipelines takes the idea of the placeholder to its logical conclusion, enabling it to manage partial application as well as arbitrary expressions in a pipeline. The above long chain would be written thus:

```js
promise
  |> await #
  |> doubleSay(#, ', ')
  |> # || throw new TypeError()
  |> capitalize
  |> # + '!'
  |> new User.Message(#)
  |> await stream.write(#)
  |> console.log;
```

Smart Pipelines have a few rules for the placeholder. If a bare identifier is provided to a step in the pipeline, no token is necessary, called ["bare style"](https://github.com/js-choi/proposal-smart-pipelines/blob/master/readme.md#bare-style):

```js
x |> a;
x |> f.b;
```

Unlike Hack, unary functions don't require a placeholder token.

For other expressions, a placeholder (called a "lexical topic token") is required, and the code will throw an early SyntaxError if it is not included in ["topic style"](https://github.com/js-choi/proposal-smart-pipelines/blob/master/readme.md#topic-style):

```js
10 |> # + 1;
promise |> await #;
```

If there are any operators, parentheses (including for method calls), brackets, or anything other than identifiers and dot punctuators, then a topic token is necessary. This avoids footguns and eliminate ambiguity when not using a topic token.

Smart pipelines thus resolve the issue of async in an integrative way, allowing all possible expressions to be embedded in a pipeline; not only `await`, but also `typeof`, `yield`, and another other operator desired.

## Where Babel Comes In

Once all three proposals were fleshed out, we realized discussion and debate were unlikely to resolve the inherent tension between them. We decided the best way to make a decision would be with the feedback of developers, using the proposals in real code. Given Babel's role in the community, we decided to introduce all three of the above proposals into the pipeline operator plugin.

Because these proposals parse slightly differently, support needs to be added to `@babel/parser` (formerly `babylon`), and the parser needs to be configured based on which proposal is its current parse target. The pipeline operator plugin itself thus needs the `"proposal"` option, both to configure babylon as well as its own transformation.

We were working under a compressed timeline for this, as we needed to introduce any breaking changes to babel, `@babel/parser`, as well as the pipeline proposal plugin before babel@7 left beta. We also wanted the plugin to be able to eventually default to whichever of the proposals get accepted, so the configuration option becomes obsolete.

Given these two constraints, we opted to introduce this new configuration option and make it required, forcing users to decide which proposal they want to use in their project. Once a particular proposal gets accepted as the canonical behavior of the pipeline operator, we'll deprecate the `"proposal"` option and make the default whichever gets accepted, and the rejected proposals will be removed in the following major version.

## Get Involved

If you're interested in getting involved in the pipeline proposal, all the conversations are public and you  find them in the [pipeline operator repository](https://github.com/tc39/proposal-pipeline-operator/). You can also check out the [presentation from the last TC39 meeting](https://docs.google.com/presentation/d/1eFFRK1wLIazIuK0F6fY974OIDvvWXS890XAMB59PUBA/edit#slide=id.p). Lastly, you can find [James DiGioia](https://twitter.com/jamesdigioia), [J. S. Choi](https://twitter.com/__jschoi), or [Daniel Ehrenberg](https://twitter.com/littledan) on Twitter.

But most importantly, once the work is complete, try out the pipeline operator in your own projects! We're also working on adding options to the [repl](https://babeljs.io/repl/), so you'll be able to try out the code there as well. We need feedback and real code in order for this to be useful, so we'd love to hear from you. Tweet us at [@babeljs](https://twitter.com/babeljs) to let us know.
