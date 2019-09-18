---
title: "Upgrade to Babel 7 (API)"
id: v7-migration-api
---

Refer users to this document when upgrading to Babel 7.

<!--truncate-->

> Also check out the [v7-migration guide](v7-migration.md) for other user-level changes.

## All Babel packages

### NodeJS support

![high](https://img.shields.io/badge/level%20of%20awesomeness%3F-high-red.svg)

Support for Node.js 0.10 and 0.12 has been dropped as both of this versions are out of maintenance.

### Export changes

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

Dropped use of `add-module-exports` plugin on Babel packages.
This had to be used earlier to prevent a breaking change with our exports.
If you import a Babel package in a library you may need to use `.default` when using `require` rather than `import`.

## `@babel/core`

Changed `ast` to be false by default for performance (most tools aren't using it) [babel/babel#7436](https://github.com/babel/babel/pull/7436/commits/8e3e6e0a8838607c5a01ba4232c4d3ff8dee5db0).

The publicly exposed but undocumented `Pipeline` class has been removed. Best to use the transformation methods exposed from `@babel/core` directly [babel/babel#5376](https://github.com/babel/babel/pull/5376).

The `babel.util.*` helper methods have been removed, and `util.EXTENSIONS` has been moved to `babel.DEFAULT_EXTENSIONS` [babel/babel#5487](https://github.com/babel/babel/pull/5487).

Calls to `babel.transform` or any other transform function may return `null` if the file matched an `ignore` pattern or failed to match an `only` pattern [babel/babel#5487](https://github.com/babel/babel/pull/5487).

The `opts.basename` option exposed on `state.file.opts` has been removed. If you need it, best to build it from `opts.filename` yourself [babel/babel#5467](https://github.com/babel/babel/pull/5467).

Removed `resolveModuleSource`. We recommend using `babel-plugin-module-resolver@3`'s 'resolvePath' options [babel/babel#6343](https://github.com/babel/babel/pull/6343)

Removed `babel.analyse` because it was just an alias for `babel.transform`

Removed `path.mark()` since we didn't use it and it can be implemented in your own plugin.

Removed `babel.metadata` since the generated plugin metadata is always included in the output result.

Removed `path.hub.file.addImport`. You can use the `@babel/helper-module-imports` module instead.

```diff
+  import { addDefault } from "@babel/helper-module-imports";
function importModule(pkgStore, name, path) {
-  return path.hub.file.addImport(resolvePath(pkgStore, name, path), 'default', name);
+  return addDefault(path, resolvePath(pkgStore, name, path), { nameHint: name });
}
```

### Config changes

We've made some major changes to way config lookup works:

> By default when searching for `.babelrc` files for a given file, stop at `package.json`.

For any particular file, Babel v6 keeps looking up the directory hierarchy until it finds a config file.
This means your project might break because it uses a config file found outside the package root like in
the home directory.

> Adds support for a `babel.config.js` file along the lines of what Webpack does

Because this would break how a monorepo works (including Babel itself), we are introducing a new config file,
that basically removes the hierarchical nature of configs.

Included is a `root` option that defaults to the current working directory for it to find the file.
It is also not loaded relatively so it will handle symlinking correctly, whereas before you may have had
hard-code the paths in webpack before.

Check the `babel.config.js` docs for more info: [project-wide configuration](config-files.md#project-wide-configuration)

This file combined with the new [`overrides`](options.md#overrides) property and `env` lets you have a single config file
that can work for all the files in a project vs. multiple config files per folder.

We also exclude `node_modules` by default and only look in the root unless you opt-in to setting
an array of the `.babelrcRoots` option such as `"babelrcRoots": [".", "node_modules/pkgA"]`

## Asserting Babel version [#7450](https://github.com/babel/babel/pull/7450)

Plugins can check that it's loaded with a certain version of Babel.
The API will expose an `assertVersion` method, where you can pass in semver.

The declare helper is used to keep backwards compat with v6.

```js
import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(7);
  // ...
});
```

## Babel plugins/presets

It currently takes it as the first parameter the `babel` object, and plugin/preset options, and the `dirname`

```js
module.exports = function(api, options, dirname) {};
```

## `babel-parser` (known as Babylon)

> Removed the `*` plugin option [#301](https://github.com/babel/babylon/pull/301) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

This was first added in v6.14.1 (Nov 17, 2016) so it's unlikely anyone was using this.

This catch-all option was removed; instead you should specifically decide which plugins you want to activate.

We thought it would be a good idea for tools so they wouldn't have to constantly update their config but it also means we can't easily make a breaking change.

Before:

```js
babelParser.parse(code, {
  plugins: ["*"],
});
```

You can get the old behavior using:

```js
babelParser.parse(code, {
  plugins: [
    "asyncGenerators",
    "classProperties",
    "decorators",
    "doExpressions",
    "dynamicImport",
    "exportExtensions",
    "flow",
    "functionBind",
    "functionSent",
    "jsx",
    "objectRestSpread",
  ],
});
```

See Babylon's [plugin options](parser.md#plugins).

> Renamed `decorators` plugin to `decorators-legacy` ![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

It has been renamed to align with the `legacy` option of `@babel/plugin-proposal-decorators`. A new `decorators` plugin has been implemented, which implements the new decorators proposal.

The two versions of the proposals have different syntaxes, so it is highly recommended to use `decorators-legacy` until the new semantics are implemented by Babel.

> Removed `classConstructorCall` plugin [#291](https://github.com/babel/babylon/pull/291) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

## `@babel/traverse`

> Remove support for flow bindings [babel/babel#6528](https://github.com/babel/babel/pull/6528)

The reason behind this change is that `declare var foo` doesn't introduce a new local binding, but it represents a global one.

> `getFunctionParent` will no longer return `Program`, please use `getProgramParent` instead [#5923](https://github.com/babel/babel/pull/5923). ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

It doesn't make sense that a function named `getFunctionParent` also returns the Program, so that was removed.

To get the equivalent behavior, you'll need to make a change like

```diff
- path.scope.getFunctionParent()
+ path.scope.getFunctionParent() || path.scope.getProgramParent()
```

> Path replacement/removal APIs now return an array of new paths ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

For instance, using `Path#insertBefore`, or `Path#replaceWith` will now always return an array of the newly inserted/replaced paths.

```js
const node = t.nullLiteral();
const [replaced] = path.replaceWith(node);
replace.node === node; // => true
```

This is especially useful when inserting several nodes into some higher-up scope, since you can immediately call the `Path` APIs on the node's new `Path`.

```js
const parent = path.findParent(() => /* some selection criteria */);
const helperPaths = path.unshiftContainer("body", helpers);
// helperPaths can now be referenced, manipulated, etc.
```

## AST changes

### Add `InterpreterDirective` Node [#7928](https://github.com/babel/babel/pull/7928)

Babylon already parses "shebangs" (`#!env node`) but put's in a comment in the `Program` node.
Now we are just creating an actual node for it.

Add a new `interpreter` field to the `Program` node.

```js
extend interface Program {
  interpreter: InterpreterDirective;
}
```

Add the `InterpreterDirective` Node

```js
interface InterpreterDirective <: Node {
    type: "InterpreterDirective";
    value: string;
}
```

### JSX* and TS* node builders (from @babel/types package) renamed

The case has been changed: `jsx` and `ts` are now in lowercase.

```diff
- t.jSXIdentifier()
+ t.jsxIdentifier()
```

In general, we have differentiated the node types with `TypeAnnotation` for Flow and `TSTypeAnnotation` for TypeScript so for the shared type nodes, TypeScript has a `TS` prefix.

### `.expression` field removed from `ArrowFunctionExpression`

The `expression` field was removed to eliminate two different sources of truth and needing plugins to manually keep them in sync. You can now simply check whether the function body is a `BlockStatement` or not:

```diff
  return {
    visitor: {
      ArrowFunctionExpression({ node }) {
-       if (node.expression) {
+       if (node.body.type !== "BlockStatement") {
          // () => foo;
        }
      }
    }
  };
```

### Tokens removed

In previous versions `tokens` were always attached to the AST on the top-level. In the latest version of `@babel/parser` we removed this behavior and made it disabled by default to improve the performance of the parser. All usages in babel itself have been removed and `@babel/generator` is not using the tokens anymore for pretty printing.

If your babel plugin uses `tokens` at the moment, evaluate if it is still necessary and try to remove the usage if possible. If your plugin really depends on getting tokens you can reactivate it but please only consider this if there is no other way as this will hurt users performance.

To activate you need to set the `tokens` option of babylon to true. You can do this directly from your plugin.

```js
export default function() {
  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.tokens = true;
    },
    ...
  };
}
```

### Renamed

The following nodes have been renamed:

| Name 6.x                     | Name 7.x                    | Example          | PR                                                |
| ---------------------------- | --------------------------- | ---------------- | ------------------------------------------------- |
| ExistentialTypeParam         | ExistsTypeAnnotation        | `type A = B<*>;` | [#322](https://github.com/babel/babylon/pull/322) |
| NumericLiteralTypeAnnotation | NumberLiteralTypeAnnotation | `type T = 0;`    | [#332](https://github.com/babel/babylon/pull/332) |

Besides the AST-Nodes also all the corresponding functions in `@babel/types` have been renamed.

```diff
 import * as t from "@babel/types";

 return {
-  ExistentialTypeParam(path) {
-    const parent = path.findParent((path) => path.isExistentialTypeParam());
-    t.isExistentialTypeParam(parent);
+  ExistsTypeAnnotation(path) {
+    const parent = path.findParent((path) => path.isExistsTypeAnnotation());
+    t.isExistsTypeAnnotation(parent);

-    return t.existentialTypeParam();
+    return t.existsTypeAnnotation();
   },
-  NumericLiteralTypeAnnotation(path) {
-    const parent = path.findParent((path) => path.isNumericLiteralTypeAnnotation());
-    t.isNumericLiteralTypeAnnotation(parent);
+  NumberLiteralTypeAnnotation(path) {
+    const parent = path.findParent((path) => path.isNumberLiteralTypeAnnotation());
+    t.isNumberLiteralTypeAnnotation(parent);

-    return t.numericLiteralTypeAnnotation();
+    return t.numberLiteralTypeAnnotation();
   }
 };
```

### Replaced

On the following AST-Nodes the value of the field `variance` has been changed from a simple string value to be its own AST-Node called `Variance`. [#333](https://github.com/babel/babylon/pull/333)

The field is only available when enabling the `flow` plugin in babylon.

- ObjectProperty
- ObjectMethod
- AssignmentProperty
- ClassMethod
- ClassProperty
- Property

The type of the new `Variance` node looks like this:

```js
type VarianceNode = {
  type: "Variance",
  kind: "plus" | "minus",
};
```

```diff
 return {
   Property({ node }) {
-    if (node.variance === "plus") {
+    if (node.variance.kind === "plus") {
       ...
-    } else if (node.variance === "minus") {
+    } else if (node.variance.kind === "minus") {
       ...
     }
   }
 };
```

### Location changes

The location info of `ObjectTypeIndexer` has been changed to not include semicolons. This was done to align with the flow-parser and have the same location information. [#228](https://github.com/babel/babylon/pull/228)

Example:

```js
var a: { [a: number]: string };
```

```diff
 {
   "type": "ObjectTypeIndexer",
   "start": 9,
-  "end": 29,
+  "end": 28,
   "loc": {
     "start": {
       "line": 1,
       "column": 9,
     },
     "end": {
       "line": 1,
-      "column": 29
+      "column": 28
     }
   }
 }
```

### Removal

#### ForAwaitStatement

The AST-Node `ForAwaitStatement` has been removed and is replace with the field `await` in the `ForOfStatement` node [#349](https://github.com/babel/babylon/pull/349)

```diff
 interface ForOfStatement <: ForInStatement {
   type: "ForOfStatement";
+  await: boolean;
 }
```

```diff
 return {
-  ForAwaitStatement(path) {
-    ...
+  ForOfStatement(path) {
+    if (path.node.await) {
+      ...
+    }
   }
 };
```

#### RestProperty & SpreadProperty

The two AST-Nodes `RestProperty` and `SpreadProperty` have been removed in favor of reusing `RestElement` and `SpreadElement` [#384](https://github.com/babel/babylon/pull/384)

```diff
 return {
   SpreadElement(path) {
-    ...
-  },
-  SpreadProperty(path) {
-    ...
+    if (path.parentPath.isObjectExpression()) {
+      ...
+    } else if (path.parentPath.isArrayExpression()) {
+      ...
+    }
   },
   RestElement(path) {
-    ...
-  },
-  RestProperty(path) {
-    ...
+    if (path.parentPath.isObjectPattern()) {
+      ...
+    } else if (path.parentPath.isArrayPattern()) {
+      ...
+    }
   }
 };
```

See our [upgrade PR for Babel](https://github.com/babel/babel/pull/5317) and the [Babylon AST spec](https://github.com/babel/babylon/blob/7.0/ast/spec.md) for more information.

