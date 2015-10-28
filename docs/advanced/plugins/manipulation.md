---
layout: docs
title: Plugins - Manipulation
description: How to remove and replace nodes
permalink: /docs/advanced/plugins/manipulation/
redirect_from:
 - /docs/usage/plugins/manipulation/
---

## Replacing a node

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      FunctionDeclaration(node, parent) {
        // this is shorthand for `this.replaceWith(newNode)`
        return t.expressionStatement(t.literal("i hate function declarations!"));
      }
    }
  });
}
```

## Replacing with multiple nodes

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      FunctionDeclaration(node, parent) {
        // this is shorthand for `this.replaceWithMultiple(newNodes)`
        return [
          t.expressionStatement(t.literal("i hate function declarations!")),
          t.expressionStatement(t.literal("jk they're alright")),
          node
        ];
      }
    }
  });
}
```

**NOTE:** When replacing an expression with multiple nodes, they **must** be statements. This is because
Babel uses heuristics extensively when replacing nodes which means that you can do some pretty crazy
transformations that would be extremely verbose otherwise.

## Replacing a node with a source string

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      FunctionExpression(node, parent) {
        // this is shorthand for `this.replaceWithSourceString(str)`
        return "function (a, b) { return a * b; }";
      }
    }
  });
}
```

Currently, the source string must be only standard ES6 code, no JSX or Flow is accepted.

**NOTE:** It's not recommended to use this API unless you're dealing with dynamic source strings, otherwise
it's more efficient to parse the code outside of the visitor.

## Inserting a sibling node

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      FunctionDeclaration(node, parent) {
        this.insertBefore(siblingNode); // or `insertAfter`
      }
    }
  });
}
```

**NOTE:** This should **always** be a statement or an array of statements. This uses the same heuristics
mentioned in [replacing with multiple nodes](#replacing-with-multiple-nodes).

## Removing a node

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      FunctionDeclaration(node, parent) {
        this.dangerouslyRemove();
      }
    }
  });
}
```

## Replacing a parent

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      FunctionDeclaration(node, parent) {
        this.parentPath.replaceWith(
          t.expressionStatement(t.literal("no function declarations allowed!"))
        );
      }
    }
  });
}
```

## Removing a parent

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      FunctionDeclaration(node, parent) {
        this.parentPath.dangerouslyRemove();
      }
    }
  });
}
```
