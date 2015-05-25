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
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration: {
      enter(node, parent) {

      },

      exit(node, parent) {

      }
    }
  });
};
```

If you only have an `enter` handler then you can simplify it to:

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent) {
    
    }
  });
};
```

## Check if a node is of a certain type

```javascript
module.exports = function (babel) {
  var t = babel.types;

  return new babel.Transformer("foo-bar", {
    CallExpression(node, parent) {
      return t.isIdentifier(node.callee); 
    }
  })
});
```

**NOTE:** [Visitor aliases](#visitor-aliases) are also honored so you can use `babel.types.isFunction`.

You can alternatively pass an object that will be shallowly checked against the node. ie:

```javascript
module.exports = function (babel) {
  var t = babel.types;
  
  return new babel.Transformer("foo-bar", {
    CallExpression(node, parent) {
      return t.isIdentifier(node.callee, { name: "require" }); // found a require call!
    }
  });
};
```

This is far nicer than doing:

```javascript
if (node.callee.type === "Identifier" && node.callee.name === "require") {

}
```

## Checking if an `Identifier` is referenced

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    Identifier(node, parent) {
      this.isReferenced(); // equivalent to babel.types.isReferenced(node, parent);
    }
  });
};
```

## Visitor aliases

Sometimes you may want to visit similar nodes, eg. `FunctionDeclaration` and `FunctionExpression`,
Babel has a bunch of built-in aliases for nodes to make this easier. A full list can be found at
[alias-keys.json](https://github.com/babel/babel/blob/master/src/babel/types/alias-keys.json).

For example if you wanted to visit all functions (meaing `FunctionDeclaration`, `FunctionExpression` and `ArrowFunctionExpression`) then you can use the following:

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    Function(node, parent) {
    
    }
  });
};
```
