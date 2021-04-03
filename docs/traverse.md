---
id: babel-traverse
title: @babel/traverse
---

## Install

```sh
npm install --save @babel/traverse
```

## Usage

We can use it alongside the babel parser to traverse and update nodes:

```js
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
    }
  },
});
```

Also, we can target particular [**node types**](https://babeljs.io/docs/en/babel-types#api) in the Syntax Tree

```js
traverse(ast, {
  FunctionDeclaration: function(path) {
    path.node.id.name = "x";
  },
});
```

[📖 **Read the full docs here**](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md#babel-traverse)
