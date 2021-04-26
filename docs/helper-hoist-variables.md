---
id: babel-helper-hoist-variables
title: @babel/helper-hoist-variables
sidebar_label: helper-hoist-variables
---

```sh
npm install @babel/helper-hoist-variables --save
```

## API

```typescript
type EmitFunction = (
  id: t.Identifier,
  idName: string,
  hasInit: boolean,
) => any;

declare export default hoistVariables(path: NodePath, emit: EmitFunction, kind: "var" | "let" = "var");
```

## Usage

`hoistVariables` traverses a given `path` and replaces variable declarations (`var x = 1`) with assignment expressions (`x = 1`). It can also replace left hand side expressions `for (x of []);` like in `for (var x of []);`). The binding identifiers (`x`) from the declarations will be emitted via the `EmitFunction` callback. `hoistVariables` is only applied to declarations within the same scope of `path`, in other words, it will _not_ hoist variables defined inside a function body nested inside `path`. If `kind` is `"let"` it will hoist `let` declarations.

Generally an `EmitFunction` will declare such variables in outer `scope`.

## Example

```javascript
import hoistVariables from "@babel/helper-hoist-variables";

// a naive plugin transforms
// `(function myEval(){ var x = 1; })()`
// to
// `var x;(function myEval(){ x = 1; })()`

module.exports = api => {
  return {
    visitor: {
      Function(path) {
        if (path.node.id.name === "myEval") {
          const outerScope = path.scope.parent;
          hoistVariables(
            path.get("body"),
            id => {
              // Use Scope#push to register a `var` binding in
              // the outer scope
              outerScope.push({ id });
            },
            "var"
          );
        }
      },
    },
  };
};
```

`@babel/plugin-proposal-do-expressions` also uses the same technique to hoist the `var` declarations in do blocks to the containing function scope.
