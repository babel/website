---
title: "Upgrade to Babel 8 (Integration)"
id: v8-migration-api
---

Refer plugin developers or integration users to this document when upgrading to Babel 8.

<!--truncate-->

:::info
Check out the [v8-migration guide](v8-migration.md) for other user-level changes.
:::

## AST Changes

![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- Use an identifier for `TSTypeParameter.name` ([#12829](https://github.com/babel/babel/pull/12829)). For a TS type parameter `node`, `node.name` is a string in Babel 7 while in Babel 8 it is an Identifier.
  ```ts
  // T is a TSTypeParameter
  function process<T>(input: T): T {}
  ```

  __Migration__: If you have a customized plugin accessing the name of a type parameter node, use `node.name.name` in Babel 8.

- Rename `parameters` to `params`, `typeAnnotation` to `returnType` for `TSCallSignatureDeclaration`, `TSConstructSignatureDeclaration`, `TSFunctionType`, `TSConstructorType` and `TSMethodSignature`
 ([#9231](https://github.com/babel/babel/issues/9231), [#13709](https://github.com/babel/babel/pull/13709))

  ```ts
  interface Foo {
    // TSCallSignatureDeclaration
    <T>(): string;

    // TSMethodSignature
    foo<T>(): string;

    // TSConstructSignatureDeclaration
    new <T>(): string;
  }

  // TSFunctionType
  type Bar = <T>() => string;

  // TSConstructorType
  type Baz = new <T>() => string;
  ```

  **Migration**: If you have a customized plugin accessing properties of these TS nodes, make adjustments accordingly:
    - For `node.parameters` in Babel 7, use `node.params` in Babel 8
    - For `node.typeAnnotation` in Babel 7, use `node.returnType` in Babel 8

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Don't generate `TSParenthesizedType` unless `createParenthesizedExpression` is enabled([#9546](https://github.com/babel/babel/issues/9546), [#12608](https://github.com/babel/babel/pull/12608))

  ```ts title="input.ts"
  type T = ({});
  // createParenthesizedExpression: true
  TSParenthesizedType { typeAnnotation: TSTypeLiteral { members: [] } }
  // createParenthesizedExpression: false
  TSTypeLiteral { members: [] }
  ```

  **Migration**: If you need informations about parentheses, specify the [`createParenthesizedExpression`](./parser.md#options) parser option.
  ```json title="babel.config.json"
  { "parserOpts": { "createParenthesizedExpression": true } }
  ```


## API Changes

### All packages
![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- Disallow importing internal files ([#14013](https://github.com/babel/babel/pull/14013)).

  __Migration__: Use the exported API only. If you are relying on Babel internals, please open an issue and let us know.

### `@babel/core`

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Disallow using `babel.transform`, `babel.transformFile`, `babel.transformFromAst`, `babel.parse`, `babel.loadOptions` and `babel.loadPartialConfig` synchronously ([#11110](https://github.com/babel/babel/pull/11110), [#12695](https://github.com/babel/babel/pull/12695)).

  __Migration__: Use sync versions: `babel.transformSync`, `babel.transformFileSync`, `babel.transformFromAstSync`, `babel.parseSync`, `babel.loadOptionsSync` and `babel.loadPartialConfigSync`.

### `@babel/types`

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Reject invalid identifier names in `t.identifier` builder ([#10917](https://github.com/babel/babel/pull/10917)).

  ```js title="babel-plugin.js"
  // Empty string is an invalid identifier name
  // highlight-error-next-line
  t.identifier("");
  ```

  __Migration__: Call `t.identifier` with a valid name.

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `t.jSX*` and `t.tS*` builder aliases ([#6989](https://github.com/babel/babel/issues/6989), [#15527](https://github.com/babel/babel/pull/15527))

  __Migration__: Use `t.jsx*` and `t.ts*` instead. For example, replace `t.jSXIdentifier("foo")` by `t.jsxIdentifier("foo")`.

- Remove `selfClosing` argument from `t.jsxElement` ([#14464](https://github.com/babel/babel/pull/14464))

  ```diff
  - t.jsxElement(openingElement, closingElement, children, selfClosing?: boolean)
  + t.jsxElement(openingElement, closingElement, children)
  ```
  __Migration__: The `selfClosing` argument is not used in the builder. You can safely remove it if you are using `t.jsxElement`.

- [Remove the `Noop` node type](https://github.com/babel/babel/issues/12355) ([#12361](https://github.com/babel/babel/pull/12361))

  __Migration__: The `Noop` node is not used. If you are depending on the `Noop` node, please open an issue and talk about your use case.

### `@babel/parser`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Align Babel parser error codes between Flow and TypeScript ([#13294](https://github.com/babel/babel/pull/13294))

  **Migration**: The `error.code` for `OptionalBindingPattern` is renamed as `PatternIsOptional`.

### `@babel/traverse`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- [Allow skipped `NodePath`s to be requeued](https://github.com/babel/babel/blob/43b623c1f1e86e6fb86cae8d955a84fd924380a4/packages/babel-traverse/src/path/context.js#L241-L247) ([#13291](https://github.com/babel/babel/pull/13291))

  **Notes**: `NodePath#requeue()` can requeue a skipped NodePath. This is actually a bugfix, but it causes an infinite loop in the tdz implementation of `@babel/plugin-transform-block-scoping` so we defer the change to Babel 8.

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `block` argument from `Scope#rename` ([#15288](https://github.com/babel/babel/pull/15288))

  ```diff
  - rename(oldName: string, newName?: string, block?: t.Pattern | t.Scopable)
  + rename(oldName: string, newName?: string)
  ```

  __Migration__: The third argument `block` is not used by the method. You can safely remove it if you are depending on `Scope#rename`.
