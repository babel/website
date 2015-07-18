---
layout: docs
title: Plugins - Visiting
description: How to visit nodes
permalink: /docs/advanced/plugins/visiting/
redirect_from:
 - /docs/usage/plugins/visiting/
---

## Visitor overview

Visitor objects contain functions of the node types they intend to visit. eg.

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      FunctionDeclaration: {
        enter(node, parent) {

        },

        exit(node, parent) {

        }
      }
    }
  });
}
```

If you only have an `enter` handler then you can simplify it to:

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      FunctionDeclaration(node, parent) {

      }
    }
  });
}
```

## Check if a node is of a certain type

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      CallExpression(node, parent) {
        return t.isIdentifier(node.callee);
      }
    }
  });
}
```

**NOTE:** [Visitor aliases](#visitor-aliases) are also honored so you can use `babel.types.isFunction`.

You can alternatively pass an object that will be shallowly checked against the node. ie:

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      CallExpression(node, parent) {
        return t.isIdentifier(node.callee, { name: "require" }); // found a require call!
      }
    }
  });
}
```

This is far nicer than doing:

```javascript
if (node.callee.type === "Identifier" && node.callee.name === "require") {

}
```

## Checking if an `Identifier` is referenced

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      Identifier(node, parent) {
        this.isReferenced(); // equivalent to babel.types.isReferenced(node, parent);
      }
    }
  });
}
```

## Visitor aliases

Sometimes you may want to visit similar nodes, eg. `FunctionDeclaration` and `FunctionExpression`,
Babel has a bunch of built-in aliases for nodes to make this easier. A full list can be found
in [this directory](https://github.com/babel/babel/tree/master/packages/babel/src/types/definitions),
in the `alias` option of each type definition.

For example if you wanted to visit all functions (meaing `FunctionDeclaration`, `FunctionExpression` and `ArrowFunctionExpression`) then you can use the following:

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      Function(node, parent) {

      }
    }
  });
}
```

**NOTE:**: You can also list multiple visitors together in a string with `|` like the following:

```javascript
export default function ({ Plugin, types: t }) {
  return new Plugin("foo-bar", {
    visitor: {
      "ClassDeclaration|FunctionDeclaration"(node, parent) {

      }
    }
  });
}
```
