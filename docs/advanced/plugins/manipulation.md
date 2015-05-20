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
module.exports = function (babel) {
  var t = babel.types;
  
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent) {
      // this is shorthand for `this.replaceWith(newNode)`
      return t.expressionStatement(t.literal("i hate function declarations!")); 
    }
  });
};
```

## Replacing with multiple nodes

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent) {
      var t = babel.types;
  
      // this is shorthand for `this.replaceWithMultiple(newNodes)`
      return [
        t.expressionStatement(t.literal("i hate function declarations!")),
        t.expressionStatement(t.literal("jk they're alright")),
        node
      ]; 
    }
  });
};
```

**NOTE:** When replacing an expression with multiple nodes, they **must** be statements. This is because
Babel uses heuristics extensively when replacing nodes which means that you can do some pretty crazy
transformations that would be extremely verbose otherwise.

## Replacing a node with a source string

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionExpression(node, parent) {
      // this is shorthand for `this.replaceWithSourceString(str)`
      return "function (a, b) { return a * b; }";
    }
  });
};
```

**NOTE:** It's not recommended to use this API unless you're dealing with dynamic source strings, otherwise
it's more efficient to parse the code outside of the visitor.

## Inserting a sibling node

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent) {
      this.insertBefore(siblingNode); // or `insertAfter`
    }
  });
};
```

**NOTE:** This should **always** be a statement or an array of statements. This uses the same heuristics
mentioned in [replacing with multiple nodes](#replacing-with-multiple-nodes).

## Removing a node

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent) {
      this.remove();
    }
  });
};
```

You don't need to worry about the contexts where you can remove a node as it'll be cleaned up for you.
ie. if you remove the `LEFT` node in `LEFT || RIGHT` then Babel will automatically turn it into just `RIGHT`.

## Replacing a parent

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent) {
      var t = babel.types;
  
      this.parentPath.replaceWith(
        t.expressionStatement(t.literal("no function declarations allowed!"))
      );
    }
  });
};
```

## Removing a parent

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent) {
      this.parentPath.remove();
    }
  });
};
```
