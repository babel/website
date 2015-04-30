---
layout: docs
title: Plugins
description: How to use and write plugins for Babel
permalink: /docs/usage/plugins/
---

<blockquote class="babel-callout babel-callout-danger">
  <h4>Highly experimental</h4>
  <p>
    Internal APIs are still in a high state of flux. If you find something that is <strong>not</strong>
    documented on this page then you're at risk of it changing without notice.
  </p>
</blockquote>

## Usage

Plugins are resolved relative to the current working directory.

[Node API](/docs/usage/api/):

```javascript
require("babel").transform("code", {
  plugins: ["foo-bar"]
});
```

[CLI](/docs/usage/cli/):

```sh
$ babel --plugins foo-bar script.js
```

[babelrc](/docs/usage/babelrc/):

```javascript
{
  "plugins": ["foo-bar"]
}
```

### Specifying position

By default, plugins are ran **before** the internal ones. You can alternatively specify the position via
a colon after the plugin name. ie:

```javascript
require("babel").transform("code", {
  plugins: ["foo-bar:after", "bar-foo:before"]
});
```

```sh
$ babel --plugins foo-bar:after bar-foo:before script.js
```

## AST documentation

The Babel parser is heavily based on [Acorn](https://github.com/marijnh/acorn) which makes use of the
extremely common and versatile [ESTree](https://github.com/estree/estree) AST format:

 * [Core](https://github.com/estree/estree/blob/master/spec.md)
 * [ES6](https://github.com/estree/estree/blob/master/es6.md)

## Plugin setup

**package.json**

```javascript
{
  "name": "babel-plugin-foo",
  "version": "1.0.0",
  "dependencies": {
    "babel-core": "^5.0.0"
  }
}
```

**index.js**

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    // visitors
  });
};
```

You can find a simple plugin example as well as usage in the [sebmck/babel-plugin-example](https://github.com/sebmck/babel-plugin-example) repo.

## Plugin API

<blockquote class="babel-callout babel-callout-info">
  <h4>Incomplete</h4>
  <p>
    <a href="https://github.com/babel/babel.github.io">Pull requests</a> expanding on existing or adding additional documentation are <strong>extremely</strong> appreciated.
  </p>
</blockquote>

### Visitor overview

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
export default new Transformer("foo-bar", {
  FunctionDeclaration(node, parent) {
  
  }
});
```

### Check if a node is of a certain type

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

### Replacing a node

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

### Replacing with multiple nodes

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

### Inserting a sibling node

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

### Removing a node

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

### Replacing a parent

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

### Removing a parent

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    FunctionDeclaration(node, parent) {
      this.parentPath.remove();
    }
  });
};
```

### Checking if a local variable is bound

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

### Generating a UID

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

### Pushing a variable declaration to a parent scope

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

### Checking if an `Identifier` is referenced

```javascript
module.exports = function (babel) {
  return new babel.Transformer("foo-bar", {
    Identifier(node, parent) {
      this.isReferenced(); // equivalent to babel.types.isReferenced(node, parent);
    }
  });
};
```

### Visitor aliases

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
