---
title: "Upgrade to Babel 7"
id: v7-migration
---

Refer users to this document when upgrading to Babel 7. Check [here](v7-migration-api.md) for API/integration changes.

<!--truncate-->

Because not every breaking change will affect every project, we've sorted the sections by the likelihood of a change breaking tests when upgrading.

## All of Babel

> Support for Node.js 0.10, 0.12, 4 and 5 has been dropped [#5025](https://github.com/babel/babel/pull/5025), [#5041](https://github.com/babel/babel/pull/5041), [#7755](https://github.com/babel/babel/pull/7755), [#5186](https://github.com/babel/babel/pull/5186)

We highly encourage you to use a newer version of Node.js (LTS v8) since the previous versions are not maintained.
See [nodejs/LTS](https://github.com/nodejs/LTS) for more information.

This just means Babel _itself_ won't run on older versions of Node. It can still _output_ code that runs on old Node versions.

## Config Lookup Changes

For more info, read our [6.x vs 7.x comparison](config-files.md#6x-vs-7x-babelrc-loading).

Babel has had issues previously with handling `node_modules`, symlinks, and monorepos. We've made some changes to account for this: Babel will stop lookup at the `package.json` boundary instead of looking up the chain. For monorepos we have added a new `babel.config.js` file that centralizes our config across all the packages (alternatively you could make a config per package). In 7.1, we've introduced a [`rootMode`](options.md#rootmode) option for further lookup if necessary.

## [Yearly Preset Deprecations](/blog/2017/12/27/nearing-the-7.0-release.html#deprecated-yearly-presets-eg-babel-preset-es20xx)

The "env" preset has been out for more than a year now, and completely replaces some of the presets we've had and suggested earlier.

- `babel-preset-es2015`
- `babel-preset-es2016`
- `babel-preset-es2017`
- `babel-preset-latest`
- A combination of the above ^

These presets should be substituted with the "env" preset.

## [Stage Preset Deprecations](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)

We are removing the stage presets in favor of explicit proposal usage. Can check the [stage-0 README](https://github.com/babel/babel/tree/755ec192e22c6b6e00782e4810366d0166fdbebd/packages/babel-preset-stage-0#babelpreset-stage-0) for more migration steps.

To do this automatically you can run [`npx babel-upgrade`](https://github.com/babel/babel-upgrade) (PR added [here](https://github.com/babel/babel-upgrade/pull/69)).

## [Remove proposal polyfills in `@babel/polyfill`](https://github.com/babel/babel/issues/8416)

Based on similar thinking, we have removed the polyfill proposals from `@babel/polyfill`.

Right now `@babel/polyfill` is mostly just an alias of `core-js` v2. [Source](https://github.com/babel/babel/blob/master/packages/babel-polyfill/src/index.js)

Before it used to just be 2 imports:

```js
import "core-js/shim"; // included < Stage 4 proposals
import "regenerator-runtime/runtime";
```

If you want to use proposals, you will need to import these independently. You should import them directly from the [`core-js`](https://github.com/zloirock/core-js/tree/v2#usage) package or another package on npm.

e.g.

```js
// for core-js v2:
import "core-js/fn/array/flat-map";

// for core-js v3:
import "core-js/features/array/flat-map";
```

Below is a list of Stage < 3 proposal polyfills in `core-js` v2.

<details>

```js
// core-js v2

// Stage 3
import "core-js/fn/string/trim-left";
import "core-js/fn/string/trim-right";
import "core-js/fn/string/match-all";
import "core-js/fn/array/flat-map";
import "core-js/fn/array/flatten"; // RENAMED
import "core-js/fn/global";

// Stage 1
import "core-js/fn/symbol/observable";
import "core-js/fn/promise/try";
import "core-js/fn/observable";

// Stage 1 Math Extensions
import "core-js/fn/math/clamp";
import "core-js/fn/math/deg-per-rad";
import "core-js/fn/math/degrees";
import "core-js/fn/math/fscale";
import "core-js/fn/math/iaddh";
import "core-js/fn/math/isubh";
import "core-js/fn/math/imulh";
import "core-js/fn/math/rad-per-deg";
import "core-js/fn/math/radians";
import "core-js/fn/math/scale";
import "core-js/fn/math/umulh";
import "core-js/fn/math/signbit";

// Stage 1 "of and from on collection constructors"
import "core-js/fn/map/of";
import "core-js/fn/set/of";
import "core-js/fn/weak-map/of";
import "core-js/fn/weak-set/of";
import "core-js/fn/map/from";
import "core-js/fn/set/from";
import "core-js/fn/weak-map/from";
import "core-js/fn/weak-set/from";

// Stage 0
import "core-js/fn/string/at";

// Nonstandard
import "core-js/fn/object/define-getter";
import "core-js/fn/object/define-setter";
import "core-js/fn/object/lookup-getter";
import "core-js/fn/object/lookup-setter";
// import "core-js/fn/map/to-json"; // Not available standalone
// import "core-js/fn/set/to-json"; // Not available standalone

import "core-js/fn/system/global";
import "core-js/fn/error/is-error";
import "core-js/fn/asap";

// Decorator metadata? Not sure of stage/proposal
import "core-js/fn/reflect/define-metadata";
import "core-js/fn/reflect/delete-metadata";
import "core-js/fn/reflect/get-metadata";
import "core-js/fn/reflect/get-metadata-keys";
import "core-js/fn/reflect/get-own-metadata";
import "core-js/fn/reflect/get-own-metadata-keys";
import "core-js/fn/reflect/has-metadata";
import "core-js/fn/reflect/has-own-metadata";
import "core-js/fn/reflect/metadata";
```

</details>

## [Versioning/Dependencies](/blog/2017/12/27/nearing-the-7.0-release.html#peer-dependencies-integrations)

Most plugins/top level packages now have a `peerDependency` on `@babel/core`.

## Package Renames

- `babylon` is now `@babel/parser`

You can still use the shorthand version of a package name (remove the `preset-` or `plugin-`) in the config, but I'm choosing to use the whole package name for clarity (maybe we should just remove that, given it doesn't save that much typing anyway).

```diff
{
-  "presets": ["@babel/preset-react"],
+  "presets": ["@babel/react"], // this is equivalent
-  "plugins": ["@babel/transform-runtime"],
+  "plugins": ["@babel/plugin-transform-runtime"], // same
}
```

### Scoped Packages

The most important change is finally switching all packages to [scoped packages](/blog/2017/12/27/nearing-the-7.0-release.html#renames-scoped-packages-babel-x) (the folder names in the [monorepo](https://github.com/babel/babel/tree/main/packages) are not changed but the name in its `package.json` is).

This means there will be no more issues with accidental/intentional name squatting, a clear separation from community plugins, and a simpler naming convention.

Your dependencies will need to be modified like so:

`babel-cli` -> `@babel/cli`. For us, we basically started by replacing `babel-` with `@babel/`.

#### Use in the config

You can still use the shorthand way of specifying a preset or plugin. However because of the switch to scoped packages, you still have to specify the `@babel/` just like if you had your own preset to add to the config.

```js
module.exports = {
  presets: ["@babel/env"], // "@babel/preset-env"
  plugins: ["@babel/transform-arrow-functions"], // same as "@babel/plugin-transform-arrow-functions"
};
```

### [Switch to `-proposal-` for TC39 Proposals](/blog/2017/12/27/nearing-the-7.0-release.html#renames-proposal)

This means any plugin that isn't in a yearly release (ES2015, ES2016, etc) should be renamed to `-proposal`. This is so we can better signify that a proposal isn't officially in JavaScript.

Examples:

- `@babel/plugin-transform-function-bind` is now `@babel/plugin-proposal-function-bind` (Stage 0)
- `@babel/plugin-transform-class-properties` is now `@babel/plugin-proposal-class-properties` (Stage 3)

This also means that when a proposal moves to Stage 4, we should rename the package.

### [Remove the year from package names](/blog/2017/12/27/nearing-the-7.0-release.html#renames-drop-the-year-from-the-plugin-name)

Some of the plugins had `-es3-` or `-es2015-` in the names, but these were unnecessary.

`@babel/plugin-transform-es2015-classes` became `@babel/plugin-transform-classes`.

## `"use strict"` and `this` in CommonJS

Babel 6's transformations for ES6 modules ran indiscriminately on whatever files it was told to process, never taking into account if the file actually had ES6 imports/exports in them. This had the effect of rewriting file-scoped references to `this` to be `undefined` and inserting `"use strict"` at the top of all CommonJS modules that were processed by Babel.

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
import "a";
```

```js
// output.js v6 and v7
"use strict";
require("a");
```

If you were relying on Babel to inject `"use strict"` into all of your CommonJS modules automatically, you'll want to explicitly use the `transform-strict-mode` plugin in your Babel config.

## Separation of the React and Flow presets

`babel-preset-react` has always included the flow plugin. This has caused a lot of issues with users that accidentally use `flow` syntax unintentionally due to a typo, or adding it in without typechecking with `flow` itself, resulting in errors.

This issue was compounded when we decided to support TypeScript. If you wanted to use the React and TypeScript presets, we would have to figure out a way to turn on/off the syntax, automatically, via file type or the directive. In the end, it was easier to separate the presets entirely.

Presets enable Babel to parse types provided by Flow / TypeScript (and other dialects / languages), then strip them out when compiling down to JavaScript.

```diff
{
-  "presets": ["@babel/preset-react"]
+  "presets": ["@babel/preset-react", "@babel/preset-flow"] // parse & remove flow types
+  "presets": ["@babel/preset-react", "@babel/preset-typescript"] // parse & remove typescript types
}
```

## Option parsing

Babel's config options are stricter than in Babel 6.
Where a comma-separated list for presets, e.g. `"presets": 'es2015, es2016'` technically worked before, it will now fail and needs to be changed to an array [#5463](https://github.com/babel/babel/pull/5463).

Note this does not apply to the CLI, where `--presets es2015,es2016` will certainly still work.

```diff
{
-  "presets": "@babel/preset-env, @babel/preset-react"
+  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## Plugin/Preset Exports

All plugins/presets should now export a function rather than an object for consistency ([via babel/babel#6494](https://github.com/babel/babel/pull/6494)). This will help us with caching.

## Resolving string-based config values

In Babel 6, values passed to Babel directly (not from a config file), were resolved relative to the files being compiled, which led to lots of confusion.

In Babel 7, values are resolved consistently either relative to the config file that loaded them, or relative to the working directory.

For `presets` and `plugins` values, this change means that the CLI will behave nicely in cases such as

```bash
babel --presets @babel/preset-env ../file.js
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

### `@babel/runtime`, `@babel/plugin-transform-runtime`

We have separated out Babel's helpers from it's "polyfilling" behavior in runtime. More details in the [PR](https://github.com/babel/babel/pull/8266).

[`@babel/runtime`](runtime.md) now only contains the helpers, and if you need `core-js` you can use [`@babel/runtime-corejs2`](runtime-corejs2.md) and the option provided in the transform. For both you still need the [`@babel/plugin-transform-runtime`](plugin-transform-runtime.md)

#### Only Helpers

```sh
# install the runtime as a dependency
npm install @babel/runtime
# install the plugin as a devDependency
npm install @babel/plugin-transform-runtime --save-dev
```

```json
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

#### Helpers + polyfilling from `core-js`

So if you need `core-js` support with `transform-runtime`, you would now pass the `corejs` option and use the `@babel/runtime-corejs2` dependency instead of `@babel/runtime`.

```sh
# install the runtime as a dependency
npm install @babel/runtime-corejs2
# install the plugin as a devDependency
npm install @babel/plugin-transform-runtime --save-dev
```

```diff
{
  "plugins": [
-   ["@babel/plugin-transform-runtime"],
+   ["@babel/plugin-transform-runtime", {
+     "corejs": 2,
+   }],
  ]
}
```

---

## Spec Compliancy

### `@babel/plugin-proposal-object-rest-spread`

> A trailing comma cannot come after a RestElement in objects [#290](https://github.com/babel/babylon/pull/290) ![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

```diff
var {
-  ...y, // trailing comma is a SyntaxError
+  ...y
} = { a: 1 };
```

---

> Since Object Spread defines new properties and `Object.assign` just sets them, Babel has changed the default behavior to be more spec compliant.

- [objectSpread helper function](https://github.com/babel/babel/blob/007bfb656502a44f6ab50cd64750cc4b38f9efff/packages/babel-helpers/src/helpers.js#L375)
- [extends helper function](https://github.com/babel/babel/blob/007bfb656502a44f6ab50cd64750cc4b38f9efff/packages/babel-helpers/src/helpers.js#L357-L373)

```js
// input
z = { x, ...y };
```

```js
// v7 default behavior: ["proposal-object-rest-spread"]
function _objectSpread(target) { ... }

z = _objectSpread({
  x
}, y);
```

```js
// Old v6 behavior: ["proposal-object-rest-spread", { "loose": true }]
function _extends(target) { ... }

z = _extends({
  x
}, y);
```

```js
// Substitute for Object.assign: ["proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }]
z = Object.assign(
  {
    x,
  },
  y
);
```

### `@babel/plugin-proposal-class-properties`

The default behavior is changed to what was previously "spec" by default

```js
// input
class Bork {
  static a = "foo";
  y;
}
```

```js
// v7 default behavior: ["@babel/plugin-proposal-class-properties"]
var Bork = function Bork() {
  Object.defineProperty(this, "y", {
    enumerable: true,
    writable: true,
    value: void 0,
  });
};

Object.defineProperty(Bork, "a", {
  enumerable: true,
  writable: true,
  value: "foo",
});
```

```js
// old v6 behavior: ["@babel/plugin-proposal-class-properties", { "loose": true }]
var Bork = function Bork() {
  this.y = void 0;
};

Bork.a = "foo";
```

### Split `@babel/plugin-transform-export-extensions` into the two renamed proposals

This is a long time coming but this was finally changed.

`@babel/plugin-proposal-export-default-from`

```js
export v from "mod";
```

`@babel/plugin-proposal-export-namespace-from`

```js
export * as ns from "mod";
```

### `@babel/plugin-transform-template-literals`

> Template Literals Revision updated [#5523](https://github.com/babel/babel/pull/5523) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

See the proposal for [Template Literals Revision](https://tc39.github.io/proposal-template-literal-revision/).

It causes Babel 6 to throw `Bad character escape sequence (5:6)`.

```js
tag`\unicode and \u{55}`;
```

This has been fixed in Babel 7 and generates something like the following:

```js
// default
function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}
var _templateObject = /*#__PURE__*/ _taggedTemplateLiteral(
  [void 0],
  ["\\unicode and \\u{55}"]
);
tag(_templateObject);
```

```js
// loose mode
function _taggedTemplateLiteralLoose(strings, raw) {
  strings.raw = raw;
  return strings;
}
var _templateObject = /*#__PURE__*/ _taggedTemplateLiteralLoose(
  [void 0],
  ["\\unicode and \\u{55}"]
);
tag(_templateObject);
```

---

> Default to previous "spec" mode for regular template literals

```js
// input
`foo${bar}`;
```

```js
// default v7 behavior: ["@babel/plugin-transform-template-literals"]
"foo".concat(bar);
```

```js
// old v6 behavior: ["@babel/plugin-transform-template-literals", { "loose": true }]
"foo" + bar;
```

### `@babel/plugin-proposal-decorators`

In anticipation of the new decorators proposal implementation, we've decided to make it the new default behavior. This means that to continue using the current decorators syntax/behavior, you must set the `legacy` option as `true`.

```diff
 {
   "plugins": [
-    "@babel/plugin-proposal-decorators"
+    ["@babel/plugin-proposal-decorators", { "legacy": true }]
   ]
 }
```

> NOTE: If you are using `@babel/preset-stage-0` or `@babel/preset-stage-1`, which include this plugin, you must pass them the `decoratorsLegacy` option.

### `@babel/plugin-proposal-pipeline-operator`

Newer proposals in flux will error by default and will require everyone to opt into a specific proposal while things are still < Stage 2. This is explained more in this [post](https://babeljs.io/blog/2018/07/19/whats-happening-with-the-pipeline-proposal).

```diff
{
  "plugins": [
-   "@babel/plugin-proposal-pipeline-operator"
+   ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]
  ]
}
```

### Removed `babel-plugin-transform-class-constructor-call`

> babel-plugin-transform-class-constructor-call has been removed [#5119](https://github.com/babel/babel/pull/5119) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

TC39 decided to drop this proposal. You can move your logic into the constructor or into a static method.

See [/docs/plugins/transform-class-constructor-call/](/docs/plugins/transform-class-constructor-call/) for more information.

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

### `@babel/plugin-async-to-generator`

We merged `babel-plugin-transform-async-to-module-method` into the regular async plugin by just making it an option.

```diff
{
  "plugins": [
-    ["@babel/transform-async-to-module-method"]
+    ["@babel/transform-async-to-generator", {
+      "module": "bluebird",
+      "method": "coroutine"
+    }]
  ]
}
```

## `babel`

> Dropping the `babel` package [#5293](https://github.com/babel/babel/pull/5293) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

This package currently gives you an error message to install `babel-cli` instead in v6.
I think we can do something interesting with this name though.

## `@babel/register`

> `babel-core/register.js` has been removed [#5132](https://github.com/babel/babel/pull/5132) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

The deprecated usage of `babel-core/register` has been removed in Babel 7; instead use the standalone package `@babel/register`.

Install `@babel/register` as a new dependency:

```sh
npm install --save-dev @babel/register
```

Upgrading with Mocha:

```diff
- mocha --require babel-core/register
+ mocha --require @babel/register
```

`@babel/register` will also now only compile files in the current working directly (was done to fix issues with symlinking).

`@babel/register` options are now replaced instead of merged

## `@babel/generator`

> Dropping the `quotes` option [#5154](https://github.com/babel/babel/pull/5154)] ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

If you want formatting for compiled output you can use recast/prettier/escodegen/fork babel-generator.

This option was only available through `babel-generator` explicitly until v6.18.0 when we exposed `parserOpts` and `generatorOpts`. Because there was a bug in that release, no one should've used this option in Babel itself.

> Dropping the `flowUsesCommas` option [#5123](https://github.com/babel/babel/pull/5123) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

Currently there are 2 supported syntaxes (`,` and `;`) in Flow Object Types.

This change just makes babel-generator output `,` instead of `;`.

## `@babel/core`

> Remove `babel-core/src/api/browser.js` [#5124](https://github.com/babel/babel/pull/5124) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

`babel-browser` was already removed in 6.0. If you need to use Babel in the browser or a non-Node environment, use [@babel/standalone](standalone.md).

Babel will return `filename` as an absolute path [#8044](https://github.com/babel/babel/pull/8044)

## `@babel/preset-env`

`loose` mode will now automatically exclude the `typeof-symbol` transform (a lot of projects using loose mode were doing this).
