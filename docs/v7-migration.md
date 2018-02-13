---
title:  "Upgrade to Babel 7"

id: v7-migration
---

Refer users to this document when upgrading to Babel 7.

<!--truncate-->

Because not every breaking change will affect every project, we've sorted the sections by the likelihood of a change breaking tests when upgrading.

## All of Babel

> Support for Node.js 0.10 and 0.12 has been dropped [#5025](https://github.com/babel/babel/pull/5025), [#5041](https://github.com/babel/babel/pull/5041), [#5186](https://github.com/babel/babel/pull/5186) ![high](https://img.shields.io/badge/level%20of%20awesomeness%3F-high-red.svg)

We highly encourage you to use a newer version of Node.js (LTS v8) since the previous versions are not maintained.
See [nodejs/LTS](https://github.com/nodejs/LTS) for more information.

This just means Babel *itself* won't run on older versions of Node. It can still *output* code that runs on old Node.

## [Deprecations](/blog/2017/12/27/nearing-the-7.0-release.html#deprecated-yearly-presets-eg-babel-preset-es20xx)

The "env" preset has been out for more than a year now, and completely replaces some of the presets we've had/suggested earlier.

- `babel-preset-es2015`
- `babel-preset-es2016`
- `babel-preset-es2017`
- `babel-preset-latest`
- can combination of the above ^

We suggest using switching as those presets should be able to be substituted entirely with the env preset.

## Package Renames

### Scoped Packages

The most important change is finally switching all packages to [scoped packages](/blog/2017/12/27/nearing-the-7.0-release.html#renames-scoped-packages-babel-x). (the folder names in the [monorepo](https://github.com/babel/babel/tree/master/packages) are not changed but the package.name is)

This means there will be no more issues with accidental/intentional name squatting, a clear separation from community plugins, and a simpler naming convention.

Your dependencies will need to be modified like so:

`babel-cli` -> `@babel/cli`. For us, we basically started by replacing `babel-` with `@babel/`.

#### Use in the config

You can still use the shorthand way of specifying a preset or plugin. However because of the switch to scoped packages, you still have to specify the `@babel/` just like if you had your own preset to add to the config.

```js
module.exports = {
  "presets": ["@babel/env"], // "@babel/preset-env"
  "plugins": ["@babel/transform-arrow-functions"] // same as "@babel/plugin-transform-arrow-functions"
};
```

### [Switch to `-proposal-` for TC39 Proposals](/blog/2017/12/27/nearing-the-7.0-release.html#renames-proposal)

Example: `@babel/plugin-transform-class-properties` became `@babel/plugin-proposal-class-properties`.

### [Remove the year from package names](/blog/2017/12/27/nearing-the-7.0-release.html#renames-drop-the-year-from-the-plugin-name)

Some of the plugins had `-es3-` or `-es2015-` in the names, but these were unncessary.

`@babel/plugin-transform-es2015-classes` became `@babel/plugin-transform-classes`.

## [Versioning/Dependencies](/blog/2017/12/27/nearing-the-7.0-release.html#peer-dependencies-integrations)

Most plugins/top level packages now have a `peerDependency` on `@babel/core`.

## `"use strict"` and `this` in CommonJS

Babel 6's transformations for ES6 modules ran indiscriminantly on whatever files it was told to process, never taking into account if the file actually had ES6 imports/exports in them. This had the effect of rewriting file-scoped references to `this` to be `undefined` and inserting `"use strict"` at the top of all CommonJS modules that were processed by Babel.

```js
// input.js
this;
```

```js
// output.js v6
"use strict"; // assumed strict modules
undefined; // changed this to undefined
```

```js
// output.js v7
this;
```

This behavior has been restricted in Babel 7 so that for the `transform-es2015-modules-commonjs` transform, the file is only changed if it has ES6 imports or exports in the file. (Editor's note: This may change again if we land https://github.com/babel/babel/issues/6242, so we'll want to revisit this before publishing).

```js
// input2.js
import 'a';
```

```js
// output.js v6 and v7
'use strict';
require('a');
```

If you were relying on Babel to inject `"use strict"` into all of your CommonJS modules automatically, you'll want to explicitly use the `transform-strict-mode` plugin in your Babel config.


## Option parsing

Babel's config options are stricter than in Babel 6.
Where a comma-separated list for presets, e.g. `"presets": 'es2015, es2016'` technically worked before, it will now fail and need to be changed to an array [#5463](https://github.com/babel/babel/pull/5463).

Note this does not apply to the CLI, where `--presets es2015,es2016` will certainly still work.

```diff
{
-  "presets": "@babel/preset-env, @babel/preset-react"
+  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## Resolving string-based config values

In Babel 6, values passed to Babel directly (not from a config file), were resolved relative to the files being compiled, which led to lots of confusion.

In Babel 7, values are resolved consistently either relative to the config file that loaded them, or relative to the working directory.

For `presets` and `plugins` values, this change means that the CLI will behave nicely in cases such as

```bash
babel --presets @babel/preset-es2015 ../file.js
```

Assuming your `node_modules` folder is in `.`, in Babel 6 this would fail because the preset could not be found.

This change also affects `only` and `ignore` which will be expanded on next.


## Path-based `only` and `ignore` patterns

In Babel 6, `only` and `ignore` were treated as a general matching string, rather than a filepath glob. This meant that for instance `*.foo.js` would match `./**/*.foo.js`, which was confusing and surprising to most users.

In Babel 7, these are now treated as path-based glob patterns which can either be relative or absolute paths. This means that if you were using these patterns, you'll probably need to at least add a `**/` prefix to them now to ensure that your patterns match deeply into directories.

`only` and `ignore` patterns _do_ still also work for directories, so you could also use `only: './tests'` to only compile files in your `tests` directory, with no need to use `**/*.js` to match all nested files.


## Babel's CLI commands

The `--copy-files` argument for the `babel` command, which tells Babel to copy all files in a directory that Babel doesn't know how to handle, will also now copy files that failed an `only`/`ignore` check, where before it would silently skip all ignored files.


### `@babel/node`

The `babel-node` command in Babel 6 was part of the `babel-cli` package. In Babel 7, this command has been split out into its own `@babel/node` package, so if you are using that command, you'll want to add this new dependency.


## `@babel/preset-stage-3`

> Remove Stage 4 plugins from Stage 3 [#5126](https://github.com/babel/babel/pull/5126) ![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

These plugins were moved into their yearly presets after moving to Stage 4:

- `babel-plugin-syntax-trailing-function-commas` (`babel-preset-es2017`)
- `babel-plugin-transform-async-to-generator` (`babel-preset-es2017`)
- `babel-plugin-transform-exponentiation-operator` (`babel-preset-es2016`)

Part of the reason we wanted to remove/deprecate stage presets in the first place are because of this issue. Whenever a proposal gets to Stage 4, it should technically be removed from the Stage 3 preset but it is a breaking change. Because all proposals are at risk (almost guranteed) to have breaking changes, it's the only parts of the Babel repo that would regularly have major version bumps (unless we do a 0.x versioning system which is basically the same thing). At the same time, we aren't doing the best job of signaling what each Stage means and the kinds of precautions you may want to take when using a proposal, especially in production.

---

## Spec Compliancy

> A trailing comma cannot come after a RestElement in objects [#290](https://github.com/babel/babylon/pull/290) ![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

This is when you are using `@babel/plugin-proposal-object-rest-spread`.

```diff
var {
-  ...y, // trailing comma is a SyntaxError
+  ...y
} = { a: 1 };
```

## `@babel/register`

> `babel-core/register.js` has been removed [#5132](https://github.com/babel/babel/pull/5132) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

The deprecated usage of `babel-core/register` has been removed in Babel 7; instead use the standalone package `@babel/register`.

Install `@babel/register` as a new dependency:

```sh
npm install --save-dev @babel/register
```

Upgrading with Mocha:

```diff
- mocha --compilers js:babel-core/register
+ mocha --compilers js:@babel/register
```

See [babel-register documentation](https://babeljs.io/docs/usage/babel-register/) for more information.

## Removed `babel-plugin-transform-class-constructor-call`

> babel-plugin-transform-class-constructor-call has been removed [#5119](https://github.com/babel/babel/pull/5119) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

TC39 decided to drop this proposal. You can move your logic into the constructor or into a static method.

```diff
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

-  call constructor(x, y) {
+  static secondConstructor(x, y) {
      return new Point(x, y);
    }
  }

  let p1 = new Point(1, 2);
- let p2 = Point(3, 4);
+ let p2 = Point.secondConstructor(3, 4);
```

See [/docs/plugins/transform-class-constructor-call/](/docs/plugins/transform-class-constructor-call/) for more information.

## `@babel/plugin-transform-template-literals`

>  Template Literals Revision updated [#5523](https://github.com/babel/babel/pull/5523) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

See the proposal for [Template Literals Revision](https://tc39.github.io/proposal-template-literal-revision/).

It cause Babel 6 to throw `Bad character escape sequence (5:6)`.

```js
tag`\unicode and \u{55}`;
```

This has been fixed in Babel 7 and generates something like the following:

```js
function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var _templateObject = _taggedTemplateLiteral([], ["\\unicode and \\u{55}"]);
tag(_templateObject);
```

## `babel`

> Dropping the `babel` package [#5293](https://github.com/babel/babel/pull/5293) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

This package currently gives you an error message to install `babel-cli` instead in v6.
I think we can do something interesting with this name though.

## `@babel/generator`

> Dropping the `quotes` option [#5154](https://github.com/babel/babel/pull/5154)] ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

If you want formatting for compiled output you can use recast/prettier/escodegen/fork babel-generator.

This option was only available through `babel-generator` explicitly until v6.18.0 when we exposed `parserOpts` and `generatorOpts`. Because there was a bug in that release no one should've used this option in Babel itself.

> Dropping the `flowUsesCommas` option [#5123](https://github.com/babel/babel/pull/5123) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

Currently there are 2 supported syntaxes (`,` and `;`) in Flow Object Types.

This change just makes babel-generator output `,` instead of `;`.

## `@babel/core`

> Remove `babel-core/src/api/browser.js` [#5124](https://github.com/babel/babel/pull/5124) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

`babel-browser` was already removed in 6.0. If you need to use Babel in the browser or a non-Node environment, use [babel-standalone](https://github.com/babel/babel-standalone).
