---
layout: docs
title: Plugins - Scope
description: How to use scoping and track variables
permalink: /docs/advanced/plugins/scope/
redirect_from:
 - /docs/usage/plugins/scope/
---

## Checking if a local variable is bound

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent, scope) {
      scope.hasBinding("name");
    }
  });
};
```

This will walk up the scope tree and check for that particular binding.

You can also check if a scope has it's **own** binding:

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent, scope) {
      scope.hasOwnBinding("name");
    }
  });
};
```

## Generating a UID

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent, scope) {
      scope.generateUidIdentifier("foo");
    }
  });
};
````

This will generate an identifier that doesn't collide with any locally defined variables.

## Pushing a variable declaration to a parent scope

Sometimes you may want to push a `VariableDeclaration` so you can assign to it inside of an expression.

For example the following transformer:

```javascript
module.exports = function (babel) {
  var t = babel.types;
  
  return new babel.Transformer("foo-bar", {
    CallExpression(node, parent, scope) {
      var id = scope.generateUidBasedOnNode(node);
      scope.push({ id });
      return t.assignmentExpression("=", id, node);
    }
  });
};
```

Will transform:

```javascript
function foo() {
  bar();
}
```

into:

```javascript
function foo() {
  var _bar;
  _bar = bar();
}
```

## Rename a binding and it's references

```javascript
module.exports = function (babel) {
  var t = babel.types;
  
  return new babel.Transformer("foo-bar", {
    Program(node, parent, scope) {
      // no second argument passed so this will generate a uid based on `foo`
      scope.rename("foo");

      // rename bar to foobar
      scope.rename("bar", "foobar");
    }
  });
};
```


Will transform:

```javascript
function bar() {
  return "foo!";
}

function foo() {
  bar();
}

foo();
```

into:

```javascript
function foobar() {
  return "foo!";
}

function _foo() {
  foobar();
}

_foo();
```
