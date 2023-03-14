---
id: babel-helper-environment-visitor
title: "@babel/helper-environment-visitor"
sidebar_label: helper-environment-visitor
---

`@babel/helper-environment-visitor` is a utility package that provides a current `this` context visitor.

## Installation

```shell npm2yarn
npm install @babel/helper-environment-visitor
```

## Usage

To use the package in your Babel plugin, import the required functions from `@babel/helper-environment-visitor`:

```js title="my-babel-plugin.js"
import environmentVisitor, {
  requeueComputedKeyAndDecorators
} from "@babel/helper-environment-visitor";
```

### `environmentVisitor`

It visits all AST nodes within the same `this` context to the root traverse node. Running this visitor alone is no-op as it does not modify AST nodes. This visitor is meant to be used with `traverse.visitors.merge`.

```js title="collect-await-expression.plugin.js"
module.exports = (api) => {
  const { types: t, traverse } = api;
  return {
    name: "collect-await",
    visitor: {
      Function(path) {
        if (path.node.async) {
          const awaitExpressions = [];
          // Get a list of related await expressions within the async function body
          path.traverse(traverse.visitors.merge([
            environmentVisitor,
            {
              AwaitExpression(path) {
                awaitExpressions.push(path);
              },
              ArrowFunctionExpression(path) {
                path.skip();
              },
            }
          ]))
        }
      }
    }
  }
}
```

### `requeueComputedKeyAndDecorators`

```typescript
requeueComputedKeyAndDecorators(path: NodePath): void
```

Requeue the computed key and decorators of a class member `path` so that they will be revisited after current traversal queue is drained. See the [example](#replace-top-level-this) section for more usage.

```js title="my-babel-plugin.js"
if (path.isMethod()) {
  requeueComputedKeyAndDecorators(path)
}
```

## Example

### Replace top level `this`

Suppose we are migrating from vanilla JavaScript to ES Modules. Now that the `this` keyword is equivalent to `undefined` at the top level of an ESModule ([spec](https://tc39.es/ecma262/#sec-module-environment-records-getthisbinding)), we want to replace all top-level `this` to [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis):

```js title=input.js
// replace this expression to `globalThis.foo = "top"`
this.foo = "top";

() => {
  // replace
  this.foo = "top"
}
```

We can draft a code mod plugin, here is our first revision:

```js title="Revision 1: replace-top-level-this-plugin.js"
module.exports = (api) => {
  const { types: t } = api;
  return {
    name: "replace-top-level-this",
    visitor: {
      ThisExpression(path) {
        path.replaceWith(t.identifier("globalThis"));
      }
    }
  }
}
```

The first revision works for examples so far. However, it does not really capture the idea of top-level: For example, we should not replace `this` within a non-arrow function: e.g. function declaration, object methods and class methods:

```js title="input.js"
function Foo() {
  // don't replace
  this.foo = "inner";
}

class Bar {
  method() {
    // don't replace
    this.foo = "inner";
  }
}
```

We can skip traversing if we encounter such non-arrow functions. Here we combine multiple AST types with `|` in the visitor selector.

```js title="Revision 2: replace-top-level-this-plugin.js"
module.exports = (api) => {
  const { types: t } = api;
  return {
    name: "replace-top-level-this",
    visitor: {
      ThisExpression(path) {
        path.replaceWith(t.identifier("globalThis"));
      }
      // highlight-start
      "FunctionDeclaration|FunctionExpression|ObjectMethod|ClassMethod|ClassPrivateMethod"(path) {
        path.skip();
      }
      // highlight-end
    }
  }
}
```

`"FunctionDeclaration|..."` is a really long string and can be difficult to maintain. We can
shorten it by using the [FunctionParent](types.md#functionparent) alias:

```js title="Revision 3: replace-top-level-this-plugin.js"
module.exports = (api) => {
  const { types: t } = api;
  return {
    name: "replace-top-level-this",
    visitor: {
      ThisExpression(path) {
        path.replaceWith(t.identifier("globalThis"));
      }
      // highlight-start
      FunctionParent(path) {
        if (!path.isArrowFunctionExpression()) {
          path.skip();
        }
      }
      // highlight-end
    }
  }
}
```

The plugin works generally. However, it can not handle an edge case where top-level `this` is used within computed class elements:

```js title="input.js"
class Bar {
  // replace
  // highlight-start
  [this.foo = "outer"]() {
    // don't replace
    this.foo = "inner";
  }
  // highlight-end
}
```
Here is a simplified syntax tree of the highlighted section above:

```json
{
  "type": "ClassMethod", // skipped
  "key": { "type": "AssignmentExpression" }, // [this.foo = "outer"]
  "body": { "type": "BlockStatement" }, // { this.foo = "inner"; }
  "params": [], // should visit too if there are any
  "computed": true
}
```
If the entire `ClassMethod` node is skipped, then we won't be able to visit the `this.foo` under the `key` property. However, we must visit it as it could be any expression. To achieve this, we need to tell Babel to skip only the `ClassMethod` node, but _not_ its computed key. This is where [`requeueComputedKeyAndDecorators`](#requeuecomputedkeyanddecorators) comes in handy:

```js title="Revision 4: replace-top-level-this-plugin.js"
import {
  requeueComputedKeyAndDecorators
} from "@babel/helper-environment-visitor";

module.exports = (api) => {
  const { types: t } = api;
  return {
    name: "replace-top-level-this",
    visitor: {
      ThisExpression(path) {
        path.replaceWith(t.identifier("globalThis"));
      }
      FunctionParent(path) {
        if (!path.isArrowFunctionExpression()) {
          path.skip();
        }
        // highlight-start
        if (path.isMethod()) {
          requeueComputedKeyAndDecorators(path);
        }
        // highlight-end
      }
    }
  }
}
```

There is still one missing edge case: `this` can be used within computed keys of a class property:

```js title="input.js"
class Bar {
  // replace
  [this.foo = "outer"] =
  // don't replace
  this.foo
}
```

Although `requeueComputedKeyAndDecorators` can handle this edge case as well, the plugin has become quite complex at this point, with a significant amount of time spent on handling the `this` context. In fact, the focus on dealing with `this` has detracted from the actual requirement, which is to replace top-level `this` with `globalThis`.

The `environmentVisitor` is created to simplify the code by extracting the error-prone `this`-handling logic into a helper function, so that you no longer have to deal with it directly.

```js title="Revision 5: replace-top-level-this-plugin.js"
import environmentVisitor from "@babel/helper-environment-visitor";

module.exports = (api) => {
  // highlight-next-line
  const { types: t, traverse } = api;
  return {
    name: "replace-top-level-this",
    // highlight-next-line
    visitor: traverse.visitors.merge([
      {
        ThisExpression(path) {
          path.replaceWith(t.identifier("globalThis"));
        }
      },
      // highlight-start
      environmentVisitor
    ]);
    // highlight-end
  }
}
```

You can try out the final revision on the [AST Explorer](https://astexplorer.net/#/gist/4d1bfca2b315f687da44f3436b2f4d76/58c9b92d4f77586f23f56393252104a274ccb157).

As its name implies, `requeueComputedKeyAndDecorators` supports [ES decorators](./plugin-proposal-decorators.md) as well:

```js title="input.js"
class Foo {
  // replaced to `@globalThis.log`
  @(this.log) foo = 1;
}
```

Since the spec continues to evolve, using `environmentVisitor` can be easier than implementing your own `this` context visitor.

### Find all `super()` calls

This is a [code snippet](https://github.com/babel/babel/blob/8067a84b793b9eb838c221348f09c8946ea1757e/packages/babel-helper-create-class-features-plugin/src/misc.ts#L6-L16) from `@babel/helper-create-class-features-plugin`.

```ts title="src/misc.ts"
const findBareSupers = traverse.visitors.merge<NodePath<t.CallExpression>[]>([
  {
    Super(path) {
      const { node, parentPath } = path;
      if (parentPath.isCallExpression({ callee: node })) {
        this.push(parentPath);
      }
    },
  },
  environmentVisitor,
]);
```
