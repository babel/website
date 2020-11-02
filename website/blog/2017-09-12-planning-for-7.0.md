---
layout: post
title:  "Planning for 7.0"
author: Henry Zhu
authorURL: https://twitter.com/left_pad
date:   2017-09-12 10:00:00
categories: announcements
share_text: "Planning for 7.0"
---

If you didn't know already, we're planning on releasing a 7.0 version soon 🙌 ! Work on it actually started back in February, when I just wanted to make a release to drop Node 0.10/0.12 support and remove babel-runtime and various other code. And since then, we've done releases up to `alpha.20`.

<!--truncate-->

> We're going to update this post throughout the beta releases

Since we're still just a volunteer project, it's been difficult for most of the team to stay focused and motivated to make all these changes and continue to maintain a project that so many companies, bootcamps, and tools rely on so much. But in the meantime we've made a lot of progress: [weekly meetings/notes](https://github.com/babel/notes), participating as invited guests at TC39 for the last few meetings, facilitating in both [RGSoC](https://railsgirlssummerofcode.org/) and [GSoC](https://summerofcode.withgoogle.com), and creating an [Open Collective](https://opencollective.com/babel).

## Upgrading

> Upgrading for most projects should be as simple as updating your `package.json` deps to `7.0.0-beta.0`. For the whole time we've been working on 7.0, we've been using it in Babel itself (so meta) and at my workplace at Behance.

> We will be pinning all dependencies to exact versions until the official release.

```
{
  "devDependencies": {
    "babel-cli": "7.0.0-beta.0"
  }
}
```

Specific packages:

<details>
babel packages in the monorepo should all be >= 7.0.0-beta.0 <br/>
babel-preset-env should be at least 2.0.0-beta.0 <br/>
babel-eslint can be >= 8.0.0 <br/>
babel-loader should be >= 7.0.0 (out of beta since it uses babel-core as a peerDependency) <br/>
grunt-babel can be >= 7.0.0 <br/>
gulp-babel can be >= 7.0.0 <br/>
rollup-plugin-babel can be >= 3.0.2
</details>

---

Please check out our [upgrade guide](https://babeljs.io/blog/2017/03/01/upgrade-to-babel-7) and other guide specifically for [tool authors](https://babeljs.io/blog/2017/03/01/upgrade-to-babel-7-for-tool-authors) which we will also be updating as necessary.

I'd like to go over some notable changes for our first beta release (it's still a lot *smaller* in scope in terms of breaking changes than the previous 6.0 release).

## Re-iterating Project Goals

Before we go into that, I just want to repeat again what the purpose of Babel is.

Since Babel has been renamed from 6to5, browsers have been implementing more of the spec and users are more comfortable with using the latest syntax/build tooling. It shouldn't be surprisingly however that Babel's goals haven't changed much.

Our two goals are hand in hand:

1. Help developers transform new syntax into backwards compatible code (abstract browser support away)
2. Be a bridge to help TC39 get feedback on new ECMAScript proposals and for the community to have a say in the future of the language.

Thus, I think it's an understatement to say that Babel is a vital part of the JavaScript community (almost 10 million downloads a month of `babel-core`) and sorely needs its support. (The only talks I've tried to give are about this point: [JSConf EU](https://github.com/hzoo/maintaining-an-oss-project), [React Rally](https://github.com/hzoo/so-how-does-babel-even-work), [TC39](https://github.com/hzoo/role-of-babel-in-js)). I said recently: "What happens if Babel dies"? What happens when the current group of people interested in this project get bored/burned out/move on to other things? (What if it's already happened?). Are we going to do something about it? I don't want to just ask you to help us, you already are *us* as users of the project.

Ok then, let's talk about some changes!

## Drop Support for Unmaintained Node Versions: 0.10, 0.12, 5 ([#4315](https://github.com/babel/babel/issues/4315))

Progress in OSS projects often comes at the cost of upgrading for its users. Because of this, we've always been hesitant in making the choice to introduce a major version bump/breaking changes. By dropping unsupported versions of Node, we can not only make a number of improvements to the codebase, but also upgrade dependencies and tools (ESLint, Yarn, Jest, Lerna, etc).

## 👓 Proposal Updates/Spec Compliancy

> AKA the only things most of you care about 😅

### Philosophy (Proposals: spec, loose, default behavior)

We've created a new repo: [babel/proposals](https://github.com/babel/proposals) to track our progress on the various [TC39 Proposals](https://github.com/tc39/proposals) and meetings.

I also added a section about [how we accept new proposals](https://github.com/babel/proposals#when-does-babel-implement-new-features). Our basic thinking is that we will start accepting PRs for anything a TC39 champion is going to present (Stage 0). And we will update them (with your help!) when the spec changes.

Naturally, we will take the opportunity to be as spec compliant as possible (within reasonable speed, etc) as the default behavior. This means if you need a faster/smaller build, you should use the `loose` option which will purposely disregard certain spec changes like runtime checks and other edge cases. The reason why it is opt-in is because we expect you should know what you are doing, while others should be able to seamlessly upgrade `babel-preset-env` to use the native version of each syntax or stop using Babel entirely and have no issues.

### Stage 3: Class Properties (from Stage 2)

> [`babel-plugin-transform-class-properties`](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-class-properties): the default behavior is now what was previously the "spec" option, which uses `Object.defineProperty` instead of simple assignment.

> This currently has the effect of breaking the [legacy decorators plugin](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) (which we made the "transform-decorators" plugin in 7.0) if you try to decorate a class property. You'll need to use the `loose` option to be compatible with the version of decorators in the transform until we release the Stage 2 decorators plugin.

> Private fields are WIP: [#6120](https://github.com/babel/babel/pull/6120)

Input

```js
class Bork {
  static a = 'foo';
  x = 'bar';
}
```

Output (default)

```js
class Bork {
  constructor() {
    Object.defineProperty(this, "x", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 'bar'
    });
  }
};

Object.defineProperty(Bork, "a", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'foo'
});
```

Output (loose mode)

```js
class Bork {
  constructor() {
    this.x = 'bar';
  }
};
Bork.a = 'foo';
```


### Stage 3: Object Rest Spread (from Stage 2)

> [`babel-plugin-transform-object-rest-spread`](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-object-rest-spread): And now the plugin handles non-string keys (ex: Number/Symbol)

Input

```js
// Rest Properties
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// Spread Properties
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```

Also disallowed

```js
var { ...{ x } } = obj;
var { ...[ y ] } = obj;
```

### Stage 3: Optional Catch Binding (new)

> [`babel-plugin-transform-optional-catch-binding`](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-optional-catch-binding): allow developers to use try/catch without creating an unused binding.

Input

```js
try {
  throw 0;
} catch {
  doSomethingWhichDoesNotCareAboutTheValueThrown();
}
```

Output

```js
try {
  throw 0;
} catch (_unused) {
  doSomethingWhichDoesNotCareAboutTheValueThrown();
}
```

### Stage 3: Unicode Property Regex (new)

> [`babel-plugin-transform-unicode-property-regex`](https://github.com/mathiasbynens/babel-plugin-transform-unicode-property-regex): compile Unicode property escapes (`\p{…}` and `\P{…}`) in Unicode regular expressions to ES5 or ES6 that works in today’s environments.

Input

```js
var regex = /\p{ASCII_Hex_Digit}/u;
```

Output

```js
var regex = /[0-9A-Fa-f]/;
```

### Stage 3: BigInt (new, unfinished)

> `babel-plugin-transform-bigint`: [#6015](https://github.com/babel/babel/pull/6015).
> This won't be included in the Stage presets because it would be slow to wrap all operators.

Input

```js
50000n + 60n;
```

Output

```js
import babelCheckBinaryExpressions from "babel-check-binary-expressions";
babelCheckBinaryExpressions(new BigInt("50000"), new BigInt("60"), "+");
```

### Stage 3: Dynamic Import (from Stage 2)

> [`babel-plugin-syntax-dynamic-import`](https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-dynamic-import): You only need to parse the syntax since tools like Webpack can handle the transformation in place of Babel.
> There is also a [plugin for Node](https://github.com/airbnb/babel-plugin-dynamic-import-node)

Input

```js
const testModule = import('test-module');
```

### Stage 2: `import.meta` (syntax only)

> A meta property that is only syntactically valid in modules, meant for meta-information about the currently running module provided by the host environment.

Input

```js
const size = import.meta.scriptElement.dataset.size || 300;
```

### Stage 2: Numeric Separators (new)

> [`babel-plugin-transform-numeric-separator`](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-numeric-separator): make numeric literals more readable by creating a visual separation (a `_`) between groups of digits.

Input

```js
1_000_000_000
0b1010_0001_1000_0101
0xA0_B0_C0
```

Output

```js
1000000000
0b1010000110000101
0xA0B0C0
```

### Stage 2: Decorators (from Stage 1), still WIP

> [`babel-plugin-transform-decorators`](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-decorators): [#6107](https://github.com/babel/babel/pull/6107)

Disallowed

```js
// no computed decorator keys
@dec[foo]
class A {}

// no parameter decorators (a separate proposal)
class Foo {
  constructor(@foo x) {}
}

// no decorators on object methods
var o = {
  @baz
  foo() {}
}

// decorator cannot be attached to the export
@foo
export default class {}
```

Valid

```js
// decorators with a call expression
@foo('bar')
class A {
  // decorators on computed methods
  @autobind
  [method](arg) {}
  // decorators on generator functions
  @deco
  *gen() {}
  // decorators with a member expression
  @a.b.c(e, f)
  m() {}
}

// exported decorator classes
export default @foo class {}
```

Unsupported (WIP)

```js
// decorated class properties
class A {
  @dec name = 0
}
```

### Stage 2: `function.sent` (new)

> [`babel-plugin-transform-function-sent`](https://www.npmjs.com/package/babel-plugin-transform-function-sent): compile the `function.sent` meta property, used inside generator functions

Input

```js
function* generator() {
    console.log("Sent", function.sent);
    console.log("Yield", yield);
}

const iterator = generator();
iterator.next(1); // Logs "Sent 1"
iterator.next(2); // Logs "Yield 2"
```

Output

```js
let generator = _skipFirstGeneratorNext(function* () {
    const _functionSent = yield;
    console.log("Sent", _functionSent);
    console.log("Yield", yield);
});
```

### Stage 2: export-ns-from

> [`babel-plugin-transform-export-namespace`](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-export-namespace): a shorthand to import/reexport a namespace. Split out from the old `transform-export-extensions` which combined this proposal with another


Input

```js
export * as ns from "mod";
```

Output

```js
import * as ns from "mod";
export {ns};
```

### Stage 1: export-default-from

> [`babel-plugin-transform-export-default`](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-export-default): a shorthand to import/reexport something. Split out from the old `transform-export-extensions` which combined this proposal with another


Input

```js
export v from "mod";
```

Output

```js
import _v from "module";
export { _v as v };
```

### Stage 1: Optional Chaining (new)

> [`babel-plugin-transform-optional-chaining`](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-optional-chaining): the operator (`?.`) allows you to handle properties of deeply nested objects without worrying about undefined intermediate objects.

Input

```js
a?.b = 42;
```

Output

```js
var _a;
(_a = a) == null ? void 0 : _a.b = 42;
```

### ES2015: `new.target`

> [`babel-plugin-transform-new-target`](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-new-target): we never got around to implementing `new.target` support earlier, so now there is a plugin for it that will be included in the ES2015/env presets.

Example

```js
// with a function
function Foo() {
  console.log(new.target);
}

Foo(); // => undefined
new Foo(); // => Foo

// with classes
class Foo {
  constructor() {
    console.log(new.target);
  }
}

class Bar extends Foo {
}

new Foo(); // => Foo
new Bar(); // => Bar
```

Input

```js
class Foo {
  constructor() {
    new.target;
  }

  test() {
    new.target;
  }
}
```

Output

```js
class Foo {
  constructor() {
    this.constructor;
  }

  test() {
    void 0;
  }
}
```

## 🚀 New Feature

### `.babelrc.js`

> [babel/babel#4630](https://github.com/babel/babel/issues/4630)

`*.js` configuration files are fairly common in the JavaScript ecosystem. ESLint and Webpack both allow for `.eslintrc.js` and `webpack.config.js` configuration files, respectively.

Writing configuration files in JavaScript allows for dynamic configuration, making it possible to write a single configuration file that can adapt to different environments programmatically.

```js
var env = process.env.BABEL_ENV || process.env.NODE_ENV;
var plugins = [];
if (env === 'production') {
  plugins.push.apply(plugins, ["a-super-cool-babel-plugin"]);
}
module.exports = { plugins };
```

```js
var env = process.env.BABEL_ENV || process.env.NODE_ENV;
module.exports = {
  plugins: [
    env === 'production' && "another-super-cool-babel-plugin"
  ].filter(Boolean)
};
```

This was previously done through the `env` configuration option, which is now deprecated. See [below](#deprecate-the-env-option-in-babelrc) for more details.

### TypeScript

You can now use `babel-preset-typescript` to allow Babel to strip types similar to how `babel-preset-flow` works!

```json
{
  "presets": ["typescript"]
}
```

We're working on a guide for how to setup TypeScript and Babel with the TypeScript team, which should be finished before the official 7.0 release. TL;DR is that you setup TS with `--noEmit` or use it in the editor/watch mode so that you can use preset-env and other Babel plugins.

### "Pure" Annotation in specific transforms for minifiers

After [#6209](https://github.com/babel/babel/pull/6209), ES6 classes that are transpiled will have a `/*#__PURE__*/` comment that minifiers like Uglify and babel-minify can use for dead code elimination. These annotations may expand to our helper functions as well.

Input

```js
class C {
  m(x) {
    return 'a';
  }
}
```

Output

```js
var C = /*#__PURE__*/ function () {
  function C() {
    _classCallCheck(this, C)
  }
  C.prototype.m = function m(x) {
    return 'a';
  };
  return C;
}();
```

## 😎 Other Breaking Changes

### Removed `babel-preset-flow` from `babel-preset-react`

This was important because we got a lot of complaints from users that weren't using any types/flow that they ended up writing invalid JS but there was no syntax error because they used the react preset.

Also we have the TypeScript preset now, so it didn't make sense to include `flow` in the react preset itself anymore.

### Integrations

Packages like `grunt-babel`, `gulp-babel`, `rollup-plugin-babel`, etc all used to have `babel-core` as a dependency.

After v7, we plan to move `babel-core` to be a peerDependency like `babel-loader` has. This lets all these packages not have to bump major versions when the `babel-core` API hasn't changed. Thus they are already published as `7.0.0` since we don't expect any further changes to those packages.

## Meta

### Remove `babel-runtime` from our own Babel dependencies ([#5218](https://github.com/babel/babel/pull/5218))

Babel itself doesn't have that many external dependencies, but in 6.x [each package has a dependency on `babel-runtime`](https://github.com/babel/babel/blob/958f72ddc28e2f5d02adf44eadd2b1265dd0fa4d/packages/babel-plugin-transform-es2015-arrow-functions/package.json#L12) so that built-ins like Symbol, Map, Set, and others are available without needing a polyfill. By changing the minimum supported version of Node to v4 (where those built-ins are supported natively), we can drop the dependency entirely.

> This is an issue on npm 2 (we didn't recommended its use with Babel 6) and older yarn, but not npm 3 due to its deduping behavior.

With [Create React App](https://github.com/facebookincubator/create-react-app) the size of the node_modules folder changed drastically when babel-runtime was hoisted.

- `node_modules` for npm 3: ~120MB
- `node_modules` for Yarn (<`0.21.0`): ~518MB
- `node_modules` for Yarn (<`0.21.0`) with hoisted `babel-runtime`: ~157MB
- `node_modules` for Yarn + [PR #2676](https://github.com/yarnpkg/yarn/pull/2676): ~149MB ([tweet](https://twitter.com/bestander_nz/status/833696202436784128))

So although this issue has been fixed "upstream" by using npm >= 3/later Yarn, we can do our part by simply dropping our own dependency on `babel-runtime`.

### Independent Publishing of Experimental Packages ([#5224](https://github.com/babel/babel/pull/5224))

> I mention this in [The State of Babel](http://babeljs.io/blog/2016/12/07/the-state-of-babel) in the `Versioning` section. [Github Issue](https://github.com/babel/babylon/issues/275)

You might remember that after Babel 6, Babel became a set of npm packages with its own ecosystem of custom presets and plugins.

However since then, we've always used a "fixed/synchronized" versioning system (so that no package is on v7.0 or above). When we do a new release such as `v6.23.0` only packages that have updated code in the source are published with the new version while the rest of the packages are left as is. This mostly works in practice because we use `^` in our packages.

Unfortunately this kind of system requires that a major version be released for all packages once a single package needs it. This either means we make a lot small breaking changes (unnecessary) or we batch lots of breaking changes into a single release. Instead, we want to differentiate between the experimental packages (Stage 0, etc) and everything else (es2015).

This means that we intend to make major version bumps to any experimental proposal plugins when the spec changes rather than waiting to update all of Babel. So anything that is < Stage 4 would be open to breaking changes in the form of major version bumps and same with the Stage presets themselves if we don't drop them entirely.

For example:

Say you are using preset-env (which keeps up to date and currently includes everything in es2015, es2016, es2017) + an experimental plugin. You also decide to use object-rest-spread because it's cool.

```json
{
  "presets": ["env"],
  "plugins": ["transform-object-rest-spread"]
}
```

If the spec to an experimental proposal changes, we should be free to make a breaking change and make a major version bump for that plugin only. Because it only affects that plugin, it doesn't affect anything else and people are free to update when possible. We just want to make sure that users update to the latest version of any experimental proposal when possible and provide the tools to do so automatically if that is reasonable as well.

## 💀 Possible Deprecations

### ~~Deprecate the "env" option in `.babelrc`~~

> [babel/babel#5276](https://github.com/babel/babel/issues/5276)
> EDIT: We changed the behavior to be more intuitive and did not remove it.

The "env" configuration option (not to be confused with babel-preset-env) has been a source of confusion for our users as seen by the numerous issues reported.

The [current behavior](http://babeljs.io/docs/usage/babelrc/#env-option) is to merge the config values into the top level values which isn't always intuitive such that developers end up putting nothing in the top level and just duplicating all the presets/plugins under separate envs.

To eliminate the confusion (and help our power users), we're considering dropping the env config option all together and recommending users use the proposed JS config format (see below).

### Deprecate ES20xx presets (done)

> We already deprecated preset-latest a while ago, and ES2016/ES2017 [earlier](https://twitter.com/left_pad/status/897483806499885057)
> It's annoying making a yearly preset (extra package/dependency, issues with npm package squatting unless we do scoped packages)

Developers shouldn't even need to make the decision of what yearly preset to use? If we drop/deprecate these presets then everyone can use [babel-preset-env](https://github.com/babel/babel-preset-env) instead which will already update as the spec changes.

## 🤔 Questions

### Deprecate/Rename/Remove Stage X presets (done)

> EDIT: we did this and we wrote a whole [post](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets) to explain it.

Many in the community (and TC39) have expressed concerns over the Stage X presets. I believe I just added them to have an easy migration path from Babel 5 to Babel 6 (used to be a "stage" option).

While we want to have an easy to use tool, it turns out that many companies/developers use these "not yet JavaScript" presets all the time, and in production. "Stage 0" doesn't really set the same tone as `babel-preset-dont-use-this-stage-0`.

> Ariya just made an [awesome poll](https://twitter.com/AriyaHidayat/status/833797322786025472) that explains what I'm talking about

Developers don't actually know what features are in what version of JavaScript (and they shouldn't have to know). However it is a problem when we all start thinking that "features" that are actually still proposals are in the spec already.

Many open source projects (including Babel still 😝), tutorials, conference talks, etc all use `stage-0`. React promotes the use of JSX, class properties (now Stage 3), object rest/spread (now Stage 3) and we all believe that it's just JavaScript because Babel compiled it for them. So maybe removing this abstraction would help people understand more about what is going on and the tradeoffs one is making when choosing to use Stage X plugins.

It also seems much easier to maintain your own preset than to have to update the Stage preset.

> I often see people go "I want object rest, and that's stage 2, so I enabled stage 2". They now have a load of other experimental features enabled they might not know about and probably don't need.
> Also, as stages change over time then people who aren't using shrinkwrap or yarn will get new features appearing, possibly without their knowledge. If a feature is canned they might even get one vanishing. @glenjamin

### Using npm Scoped Packages (done, `@babel/x`)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Thoughts on <a href="https://twitter.com/babeljs">@babeljs</a> using npm scoped packages for 7.0?</p>&mdash; Henry Zhu (@left_pad) <a href="https://twitter.com/left_pad/status/821551189166878722">January 18, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Seems like most who understood what scoped packages are were in favor?

Pros

- Don't have to worry about getting a certain package name (the reason why this was brought up in the first place).

> Many package names have been taken (preset-es2016, preset-es2017, 2020, 2040, etc). Can always ask to transfer but not always easy to do and can lead to users believing certain packages are official due to the naming.

Cons

- We need to migrate to new syntax
- Still unsupported on certain non-npm tools (lock-in)
- No download counts unless we alias back to old names

Sounds like we may want to defer, and in the very least it's not a breaking change given it's a name change.

### `external-helpers`, `transform-runtime`, `babel-polyfill`

EDIT: we separated out `transform-runtime`'s use of `@babel/runtime` and `core-js`

> "regeneratorRuntime is not defined" - reported all the time.

Basically we need a better solution around how to deal with built-ins/polyfills.

- Developers don't know what regenerator-runtime is, they just want to use generators/async functions.
- Many developers are confused as to why a runtime is needed at all or why Babel doesn't compile `Promise`, `Object.assign`, or some other built-in.
- Developers are confused with the difference between `transform-runtime` the Babel plugin and the runtime itself, `babel-runtime`.
- Complaints about generated code size since `babel-polyfill` includes all polyfills (although now we have [`useBuiltIns`](https://github.com/babel/babel-preset-env#usebuiltins)) and no one knowing about `external-helpers`

Can we combine/replace these packages and have an easier, default experience?

## What's next?

We want the community to upgrade and provide their feedback/reports. There will probably be a lot of initial activity which can be overwhelming so please be patient with us. We'd appreciate the help in helping triage, write docs/upgrade guides/tips, and codemods to help others upgrade more seamlessly. Because Babel touches a lot of the JavaScript ecosystem, it may not be as simple as simply updating one package because it could depend on other community Babel plugins on npm. We're not going to just wait around for a month and hope people upgrade, there's a lot of work to be done to make this happen without half the community still staying on 6.x next year. I'd not like to leave projects (and people) behind. So let us know what we can do to help, and I'd ask that you'd do the same for us and the rest of the community.

## Project Sustainability

Shoutout to my team at [Behance](https://www.behance.net) for allowing me to work on Babel part-time at work; we're still basically the only company working to sustain Babel in any capacity on work time. I'm really glad to be able to support the project at work instead of only after work/weekends, and hope this can be the case for more maintainers in the future. (I hope we've been a good example of how companies can support the open source projects they use and not necessarily "own").

We don't have enough in our Open Collective still to pay someone full time: I believe the highest donation we've gotten is $750 from Webflow, and highest monthly donation is $100 from various individuals/companies, so either we some work there or we work on getting more companies involved like AMP/Google have done (@jridgewell who recently joined our team is able to spend work time as well, and it's made a big difference).

Ask if your company can sponsor with our [Open Collective](https://opencollective.com/babel), let us know what's missing, how you can get involved. You don't even have to have a specific reason to get involved. If you simply care about sustaining a project for the forseable future, just get your team plugged in and get involved.

## Future

After 7.0: there's a lot of potential avenues for us to explore (that we've all brought up years ago): separating traversal from plugins (async visitors?), immutable AST, syntax extensions? On the infra side: integrating with test262 and smoke tests, better github workflow to go from proposal to transform, codemod infrastructure for automatic upgrades, etc.

Follow our meeting notes/discussions on [babel/notes](https://github.com/babel/notes) and get involved!

## Thanks!

I'm hopeful that we can do the official release soon, but I'd like to mention that open source is sustained by consistent, day-to-day maintenance and not just a hyped-up release cycle where we just leave everyone else in the dust and move on so it may take a little longer as we wait to fixup bugs and upgrade the ecosystem.
