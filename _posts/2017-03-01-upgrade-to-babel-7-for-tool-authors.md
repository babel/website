---
layout: post
title:  "Upgrade to Babel 7 for Tool Authors (WIP)"
author: Sven SAULEAU, Henry Zhu
date:   2017-02-29 11:00:00
categories: announcements
share_text: "Upgrade to Babel 7 for Tool Authors"
third_party_js:
- https://platform.twitter.com/widgets.js
custom_js_with_timestamps:
- docs.js
---

[EDIT: please refer to the new upgrade page](http://new.babeljs.io/docs/en/next/v7-migration-api.html)

Refer users to this document for those that create tools that depend on Babel (such as Babel plugins).

> Also check out the [User Upgrade Guide]({% post_url 2017-03-01-upgrade-to-babel-7 %}) for other relevant changes.

## All Babel packages

### NodeJS support
![high](https://img.shields.io/badge/level%20of%20awesomeness%3F-high-red.svg)

Support for Node.js 0.10 and 0.12 has been dropped as both of this versions are out of maintenance.

### Export changes
![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

Dropped use of `add-module-exports` plugin on Babel packages.
This had to be used earlier to prevent a breaking change with our exports.
If you import a Babel package in a library you may need to use `.default` when using `require` rather than `import`.

## `babel-core`

The publicly exposed but undocumented `Pipeline` class has been removed. Best to use the transformation methods exposed from `babel-core` directly [babel/babel#5376](https://github.com/babel/babel/pull/5376).

The `babel.util.*` helper methods have been removed, and `util.EXTENSIONS` has been moved to `babel.DEFAULT_EXTENSIONS` [babel/babel#5487](https://github.com/babel/babel/pull/5487).

Calls to `babel.transform` or any other transform function may return `null` if the file matched an `ignore` pattern or failed to match an `only` pattern [babel/babel#5487](https://github.com/babel/babel/pull/5487).

The `opts.basename` option exposed on `state.file.opts` has been removed. If you need it, best to build it from `opts.filename` yourself [babel/babel#5467](https://github.com/babel/babel/pull/5467).

## Babylon

> Removed the `*` plugin option [#301](https://github.com/babel/babylon/pull/301) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

This was first added in v6.14.1 (Nov 17, 2016) so it's unlikely anyone was using this.

This catch-all option was removed; instead you should specifically decide which plugins you want to activate.

We thought it would be a good idea for tools so they wouldn't have to constantly update their config but it also means we can't easily make a breaking change.

Before:

```js
babylon.parse(code, {
  plugins: [ "*" ]
})
```

You can get the old behavior using:

```js
babylon.parse(code, {
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
  ]
})
```

See Babylon's [plugin options](https://babeljs.io/docs/core-packages/babylon/#api-plugins).

> Removed `classConstructorCall` plugin [#291](https://github.com/babel/babylon/pull/291) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

## `babel-traverse`

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

This is especially useful when inserting serveral nodes into some higher-up scope, since you can immediately call the `Path` APIs on the node's new `Path`.

```js
const parent = path.findParent(() => /* some selection criteria */);
const helperPaths = path.unshiftContainer("body", helpers);
// helperPaths can now be referenced, manipulated, etc.
```

## AST changes

### JSX* and TS* node builders (from @babel/types package) renamed

The case has been changed: `jsx` and `ts` are now in lowercase.

```diff
- t.jSXIdentifier()
+ t.jsxIdentifier()
```

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

In previous versions `tokens` were always attached to the AST on the top-level. In the latests version of babylon we removed this behavior and made it disabled by default to improve the performance of the parser. All usages in babel itself have been remove and `babel-generator` is not using the tokens anymore for pretty printing.

If your babel-plugin uses `tokens` at the moment, evaluate if it is still necessary and try to remove the usage if possible. If your plugin really depends on getting tokens you can reactivate it but please only consider this if there is no other way as this will hurt users performance.

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

| Name 6.x | Name 7.x | Example | PR |
|----------|----------|---------|----|
| ExistentialTypeParam | ExistsTypeAnnotation | ```type A = B<*>;``` | [#322](https://github.com/babel/babylon/pull/322) |
| NumericLiteralTypeAnnotation | NumberLiteralTypeAnnotation | ```type T = 0;``` | [#332](https://github.com/babel/babylon/pull/332) |

Besides the AST-Nodes also all the functions in `babel-type` have been renamed.

```diff
 import * as t from "babel-types";

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

  * ObjectProperty
  * ObjectMethod
  * AssignmentProperty
  * ClassMethod
  * ClassProperty
  * Property

The type of the new `Variance` node looks like this:

```js
type VarianceNode = {
  type: "Variance",
  kind: "plus"|"minus",
}
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
var a: { [a: number]: string; };
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
