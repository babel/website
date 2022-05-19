---
id: features-timeline
title: Features Timeline
---

Which major new features did we introduce in each Babel version? This page includes a very short summary for each _minor_ release, or you can read the full changelog [on GitHub](https://github.com/babel/babel/blob/main/CHANGELOG.md)!
Additionally, use this timeline to track some other important efforts, such as the [babel-polyfills](https://github.com/babel/babel-polyfills) project.

<ol class="timeline-container">
<li data-date="May 2022">

## Babel 7.18.0

[blog post](https://babeljs.io/blog/2022/05/19/7.18.0)

- [TypeScript 4.7](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/) support
- Transform support for the [Private destructuring](https://github.com/tc39/proposal-destructuring-private) Stage 2 proposal
  ```js
  class A {
    #x = 2;
    method() {
      const { #x: x } = this;
    }
  }
  ```
- No more need to manually include the `regenerator-runtime` helper when compiling generators

</li>
<li data-date="Feb 2022">

## Babel 7.17.0

[blog post](https://babeljs.io/blog/2022/02/02/7.17.0)

- Support for the new version of the [decorators](https://github.com/tc39/proposal-decorators) Stage 2 proposal
  ```js
  class A {
    @reactive #x = 2;

    @logger
    method() {
      this.#x++;
    }
  }
  ```
- Support for the [RegExp set notation and properties of strings](https://github.com/tc39/proposal-regexp-set-notation/) Stage 2 proposal
  ```js
  /[\p{RGI_Emoji}&&[\0-\uFFFF]]/v;
  ```
- Parser support for the [private destructuring](https://github.com/tc39/proposal-destructuring-private) Stage 2 proposal
  ```js
  class A {
    #x = 2;
    method() {
      const { #x: x } = this;
    }
  }
  ```

</li>
<li data-date="Oct 2021">

## Babel 7.16.0

[blog post](https://babeljs.io/blog/2021/10/29/7.16.0)

- Enable the [class static blocks](https://github.com/tc39/proposal-class-static-block) Stage 4 proposal by default
  ```js
  class A {
    static {
      initialize(A);
    }
  }
  ```
- [TypeScript 4.5](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/) support
- Support [ESLint 8](https://eslint.org/blog/2021/10/eslint-v8.0.0-released) in `@babel/eslint-parser`.

</li>
<li data-date="Jul 2021">

## Babel 7.15.0

[blog post](https://babeljs.io/blog/2021/07/26/7.15.0)

- Enable parsing for the [top-level `await`](https://github.com/tc39/proposal-top-level-await) Stage 4 proposal by default
  ```js
  import db from "db";
  await db.connect();
  ```
- Enable the [Private Brand Checks](https://github.com/tc39/proposal-private-fields-in-in) Stage 4 proposal by default
  ```js
  class A {
    static { initialize(A); } // static block
    #field;
    is(obj) {
      return #field in obj; // private brand check
    }
  }
  ```
- Support the "Hack-style" [pipeline operator](https://github.com/tc39/proposal-pipeline-operator) Stage 2 proposal
  ```js
  const result = "World" |> `Hello, ${%}!` |> alert(%);
  ```
- [TypeScript 4.4](https://devblogs.microsoft.com/typescript/announcing-typescript-4-4/) support

</li>
<li data-date="Apr 2021">

## Babel 7.14.0

[blog post](https://babeljs.io/blog/2021/04/29/7.14.0)

- Enable the [Class Fields](https://github.com/tc39/proposal-class-fields),
  [Private Methods](https://github.com/tc39/proposal-private-methods) and [Static Class Features](https://github.com/tc39/proposal-static-class-features) Stage 4 proposals by default
- Add the [Private Brand Checks](https://github.com/tc39/proposal-private-fields-in-in) and [Static Class Blocks](https://github.com/tc39/proposal-class-static-block) proposals to `@babel/preset-env`'s [`shippedProposals`](https://babeljs.io/docs/en/babel-preset-env#shippedproposals)
  ```js
  class A {
    static { initialize(A); } // static block
    #field;
    is(obj) {
      return #field in obj; // private brand check
    }
  }
  ```
- Support for the [`async do` expressions](https://github.com/tc39/proposal-async-do-expressions) proposal
  ```js
  let valP = async do {
    2 + await computeIt();
  };
  ```
- Support for the [`importInterop: "node"`](https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs#importinterop) option in `@babel/plugin-transform-modules-commonjs`, to aligh Babel with the Node.js behavior
- [TypeScript 4.3](https://devblogs.microsoft.com/typescript/announcing-typescript-4-3/) support

</li>
<li data-date="Feb 2021">

## Babel 7.13.0

[blog post](https://babeljs.io/blog/2021/02/22/7.13.0)

- Top-level [`targets`](https://babeljs.io/docs/en/options#output-targets) option ([RFC](https://github.com/babel/rfcs/pull/2))
- Granular compiler assumptions ([docs](https://babeljs.io/assumptions), [RFC](https://github.com/babel/rfcs/pull/5))
- Support for the [Records and Tuples](https://github.com/tc39/proposal-record-tuple) proposals
  ```js
  let rec = #{ x: 1 };
  let tup = #[1, 2, 3];
  ```
- [TypeScript 4.2](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/) support

</li>
<li data-date="Oct 2020">

## Babel 7.12.0

[blog post](https://babeljs.io/blog/2020/10/15/7.12.0)

- Support for the [class static blocks](https://github.com/tc39/proposal-class-static-block) proposal
  ```js
  class A {
    static { initialize(A); }
  }
  ```
- Support for [imports and exports string names](https://github.com/tc39/ecma262/pull/2154)
  ```js
  let happy = "wooo!";
  export { happy as "😃" };
  ```
- Parser support for the [Import Assertions](https://github.com/tc39/proposal-import-assertions) proposal
  ```js
  import json from "./foo.json" assert { type: "json" };
  ```
- [TypeScript 4.1](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/) support

</li>
<li data-date="Jul 2020">

## Babel 7.11.0

[blog post](https://babeljs.io/blog/2020/07/30/7.11.0)

- Enable the [Logical Assignment](https://github.com/tc39/proposal-logical-assignment/) and
  [Numeric Separator](https://github.com/tc39/proposal-numeric-separator) Stage 4 proposals by default
- Parser support for the [Decimal](https://github.com/tc39/proposal-decimal) proposal
  ```js
  console.assert(0.1m + 0.2m === 0.3m);
  ```
- [TypeScript 4.0](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/) support

</li>
<li class="no-children">

## @babel/eslint-parser

[blog post](https://babeljs.io/blog/2020/07/13/the-state-of-babel-eslint)

</li>
<li data-date="May 2020">

## Babel 7.10.0

[blog post](https://babeljs.io/blog/2020/05/25/7.10.0)

- Enable parser support for the [`import.meta`](https://github.com/tc39/proposal-import-meta/) Stage 4 proposal by default
- Support for the [Ergonomic brand checks for Private Fields](https://github.com/tc39/proposal-private-fields-in-in) proposal
  ```js
  class Car {
    #plate;
    race(other) {
       if (#plate in other) console.log("Racing against another car!");
    }
  }
  ```

</li>
<li class="no-children">

## babel-polyfills

[repository](https://github.com/babel/babel-polyfills)

</li>
<li data-date="Mar 2020">

## Babel 7.9.0

[blog post](https://babeljs.io/blog/2020/03/16/7.9.0)

- [`bugfixes`](https://babeljs.io/docs/en/babel-preset-env#bugfixes) option in `@babel/preset-env`, to workaround browsers bugs rather than compiling whole Features
- [TypeScript 3.8](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/) support
- Support for Flow `declare` class fields
- Support for the [automatic](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) JSX runtime

</li>
<li data-date="Jan 2020">

## Babel 7.8.0

[blog post](https://babeljs.io/blog/2020/01/11/7.8.0)

- Enable the [Optional Chaining](https://github.com/tc39/proposal-optional-chaining) and the
  [Nullish Coalescing](https://github.com/tc39/proposal-nullish-coalescing) Stage 4 proposals by default
- Support `.mjs` configuration files

</li>
<li data-date="Nov 2019">

## Babel 7.7.0

[blog post](https://babeljs.io/blog/2019/11/05/7.7.0)

- Parser support for the [top-level `await`](https://github.com/tc39/proposal-top-level-await) proposal
  ```js
  import db from "./database.js";

  await db.connect();
  ```
- Add error recovery support for Early Errors in `@babel/parser`
- Support `.json` and `.cjs` configuration files
- [TypeScript 3.7](https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/) support

</li>
<li data-date="Sep 2019">

## Babel 7.6.0

[blog post](https://babeljs.io/blog/2019/09/05/7.6.0)

- Support for static private accessors, part of the
  [static class features](https://github.com/tc39/proposal-static-class-features/) proposal
  ```js
  class Dog {
    static get #className() { return "Dog"; }
  }
  ```

</li>
<li data-date="Jul 2019">

## Babel 7.5.0

[blog post](https://babeljs.io/blog/2019/07/03/7.5.0)

- Support for the [F# pipeline operator](https://github.com/valtech-nyc/proposal-fsharp-pipelines/) proposal
  ```js
  num |> add(2) |> double
  ```
- TypeScript `namespace` support

</li>
<li data-date="Mar 2019">

## Babel 7.4.0

[blog post](https://babeljs.io/blog/2019/03/19/7.4.0)

- Support for injecting `core-js@3` polyfills
- Support for the [Partial Application](https://github.com/tc39/proposal-partial-application/) proposal
  ```js
  strings.map(parseInt(?));
  ```
- Support for static private methods, part of the
  [static class features](https://github.com/tc39/proposal-static-class-features/) proposal
  ```js
  class Dog {
    static #register() { /* ... */ }
  }
  ```
- [TypeScript 3.4](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/) support

</li>
<li data-date="Jan 2019">

## Babel 7.3.0

[blog post](https://babeljs.io/blog/2019/01/21/7.3.0)

- Support for instance private accessors, part of the
  [private methods](https://github.com/tc39/proposal-private-methods/) proposal
  ```js
  class Dog {
    get #randomId() { return Math.random(); }
  }
  ```
- Support for the [smart pipeline operator](https://github.com/js-choi/proposal-smart-pipelines/) proposal
  ```js
  num |> add(2, #) |> double
  ```
- Support for
  [named capturing groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges#using_named_groups)
  in regular expressions
  ```js
  str.match({String.raw`/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/`})
  ```
- TypeScript 3.2 and 2.9 support

</li>
<li data-date="Dec 2018">

## Babel 7.2.0

[blog post](https://babeljs.io/blog/2018/12/03/7.2.0)

- Support for instance private methods, part of the [private methods](https://github.com/tc39/proposal-private-methods/) proposal
  ```js
  class Dog {
    #bark() { console.log("Mew!") }
  }
  ```

</li>
<li data-date="Sep 2018">

## Babel 7.1.0

[blog post](https://babeljs.io/blog/2018/09/17/7.1.0)

- Support for the [decorators](https://babeljs.io/blog/2018/09/17/decorators) proposal, as it was specified in September 2018
  ```js
  class Person {
    @autoIncrement age;
  }
  ```
- Support for static private fields, part of the [static class features](https://github.com/tc39/proposal-static-class-features/) proposal
  ```js
  class Person {
    static #classId = 3;
  }
  ```

</li>
<li data-date="Aug 2018" class="no-children">

## Babel 7

[blog post](https://babeljs.io/blog/2018/08/27/7.0.0)

This has a lot more changes since it was 2 years of pre-releases.

- Drop support for un-maintained Node versions: 0.10, 0.12, 4, 5
- Switch to scoped packages ([`babel-core`](https://www.npmjs.com/package/babel-core) to [`@babel/core`](https://www.npmjs.com/package/@babel/core))
- Remove yearly presets (`@babel/preset-es2015`) and Stage presets (`@babel/preset-stage-0`) ([blog post](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)).
- Added "pure" (`/*#__PURE__*/` ) annotation support in certain cases. (Implemented later as [@babel/helper-annotate-as-pure](helper-annotate-as-pure.md)
- Add project-wide `babel.config.js` config file ([docs](config-files.md)) and [`overrides`](options.md#overrides) config option.
- Added `"useBuiltIns: "usage"` to [`@babel/preset-env`](preset-env.md#usebuiltins)
- Support TypeScript via `@babel/preset-typescript`
- Support JSX Fragments `<></>`
- Support a ton of TC39 proposals:
  - [Unicode Property Regex](plugin-proposal-unicode-property-regex.md)
  - [JSON Superset](plugin-proposal-json-strings.md)
  - [`new.target`](plugin-transform-new-target.md)
  - [Class Private Instance Fields](plugin-proposal-class-properties.md) (`class A { #b = 2 }`)
  - [Optional Catch Binding](plugin-proposal-optional-catch-binding.md) `try { throw 0 } catch { do() }`
  - [BigInt](plugin-syntax-bigint.md) (syntax only)
  - [`import.meta`](plugin-syntax-import-meta.md) (syntax only) (`import.meta.url`)
  - [Numeric Separators](plugin-proposal-numeric-separator.md) (`1_000`)
  - [`function.sent`](plugin-proposal-function-sent.md)
  - [Optional Chaining](plugin-proposal-optional-chaining.md) (`a?.b`)
  - [Logical Assignment Operators](plugin-proposal-logical-assignment-operators.md) (`a &&= b; a ||= b`)
  - [Nullish Coalescing Operator](plugin-proposal-nullish-coalescing-operator.md) (`a ?? b`)
  - [Pipeline Operator](plugin-proposal-pipeline-operator.md) (`a |> b`)
  - [Throw Expressions](plugin-proposal-throw-expressions.md) (`() => throw new Error("a")`)

</li>
</ol>
