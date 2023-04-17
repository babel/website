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

- Disallow importing internal files ([#14013](https://github.com/babel/babel/pull/14013), [#14179](https://github.com/babel/babel/pull/14179)).

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

- Remove `Super` from the `Expression` alias ([#14750](https://github.com/babel/babel/pull/14750)).

  A `Super` node represents `super` in super call `super()` and super property `super.foo`. `super` can not be a standalone expression. In other words, `t.isExpression(t.super())` will return `false` in Babel 8.

  __Migration__: Search usage of `t.isExpression`, `t.assertsExpression` and `Expression` alias in the plugin visitor, update the usage when you are handling super call and super property. For example,

  ```diff title="my-babel-plugin.js"
  // Add `.foo` to an expression
  - if (t.isExpression(path.node)) {
  + if (t.isExpression(path.node) || t.isSuper(path.node)) {
    path.replaceWith(
      t.memberExpression(
        path.node,
        t.identifier("foo")
      ))
  }
  ```
  You don't have to update the usage if `super()` and `super.foo` is not involved:
  ```js title="my-babel-plugin.js"
  // define an expression as a computed key of `foo`
  if (t.isExpression(path.node)) {
    path.replaceWith(
      t.memberExpression(
        t.identifier("foo"),
        // `super` can not be a computed key, so we don't update `isExpression`
        path.node,
        /* computed */ true
      ))
  }
  ```

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `t.jSX*` and `t.tS*` builder aliases ([#6989](https://github.com/babel/babel/issues/6989), [#15527](https://github.com/babel/babel/pull/15527))

  __Migration__: Use `t.jsx*` and `t.ts*` instead. For example, replace `t.jSXIdentifier("foo")` by `t.jsxIdentifier("foo")`.

- Remove `selfClosing` argument from `t.jsxElement` ([#14464](https://github.com/babel/babel/pull/14464))

  ```diff
  - t.jsxElement(openingElement, closingElement, children, selfClosing?: boolean)
  + t.jsxElement(openingElement, closingElement, children)
  ```
  __Migration__: The `selfClosing` argument is not used in the builder. You can safely remove it.

- Remove `optional` argument from `t.memberExpression` ([#13407](https://github.com/babel/babel/pull/13407))

  ```diff
  - t.memberExpression(object, property, computed, optional?: boolean)
  + t.memberExpression(object, property, computed)
  ```

  __Migration__: The `optional` argument is not used in the builder. You can safely remove it.

- [Remove the `Noop` node type](https://github.com/babel/babel/issues/12355) ([#12361](https://github.com/babel/babel/pull/12361))

  __Migration__: The `Noop` node is not used. If you are depending on the `Noop` node, please open an issue and talk about your use case.

- Initialize `indexers`, `callProperties` and `internalSlots` in the node `ObjectTypeAnnotation` as an empty array in `t.objectTypeAnnotation` ([#14465](https://github.com/babel/babel/pull/14465))

  __Migration__: In Babel 7 the builder `t.objectTypeAnnotation` initializes them as `null`, this is inconsistent with how `@babel/parser` will parse the Flow object type annotations. In Babel 8 the new default value `[]` matches the parser behaviour. Adapt to the new default value if you are depending on this.

### `@babel/parser`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Align Babel parser error codes between Flow and TypeScript ([#13294](https://github.com/babel/babel/pull/13294))

  **Migration**: The `error.code` for `OptionalBindingPattern` is renamed as `PatternIsOptional`.

- Remove `updateContext` field from `tokens[].type` returned from option `tokens: true ` ([#13768](https://github.com/babel/babel/pull/13768))

  ```js title="babel-integration.js"
  import { parse } from "@babel/parser";

  const { tokens } = parse("a = 42", { tokens: true });
  tokens[0].type;
  // Babel 7
  // { label: "name", updateContext: null, ...other properties }
  // Babel 8
  // { label: "name", ... other properties }
  ```
  **Migration**: This change probably won't affect your integration. The `tokens[].type` is an object storing meta information of a token as implementation details.

- Tokenize private name `#priv` as a single `privateName` token ([#13256](https://github.com/babel/babel/pull/13256))

  This change will affect your integration only when you are using `tokens: true` and are depending on the extra `tokens` AST output.

  ```js title="babel-integration.js"
  import { parse } from "@babel/parser";

  const { tokens } = parse("class C { #priv }", { tokens: true });
  tokens.filter(t => t.start >= 10 && t.end <= 15) // get tokens for `#priv`
  // Babel 7
  // [
  //  Token (#) { value: "#", start: 10, end: 11 },
  //  Token (name) { value: "priv", start: 11, end: 15 }
  // ]
  // Babel 8
  // [
  //  Token (privateName) { value: "priv", start: 10, end: 15 }
  // ]
  ```
  **Migration**: Adapt to the new `privateName` token. If you want to restore to the Babel 7 behaviour, manually process the `privateName` token into the `#` token and the `name` token ([example](https://github.com/babel/babel/blob/7e60a93897f9a134506251ea51269faf4d02a86c/packages/babel-parser/src/parser/statement.ts#L86-L110)).

- Tokenize string template as `templateNonTail` and `templateTail` ([#13919](https://github.com/babel/babel/pull/13919))

  This change will affect your integration only when you are using `tokens: true` and are depending on the extra `tokens` AST output.

  ```js title="babel-integration.js"
  import { parse } from "@babel/parser";

  const { tokens } = parse("`head${x}middle${y}tail`", { tokens: true });
  console.log(tokens); // print tokens
  // Babel 7
  // [
  //  Token (`),
  //  Token (template) { value: "head" }, Token (${),
  //  Token (name) { value: "x" }, Token (}),
  //  Token (template) { value: "middle" }, Token (${),
  //  Token (name) { value: "y" }, Token (}),
  //  Token (template) { value: "tail" }
  //  Token (`)
  // ]
  // Babel 8
  // [
  //  Token (templateNonTail) { value: "head" },
  //  Token (name) { value: "x" },
  //  Token (templateNonTail) { value: "middle" },
  //  Token (name) { value: "y" },
  //  Token (templateTail) { value: "tail" }
  // ]
  ```

  **Migration**: Adapt to the new token design. If you want to restore to the Babel 7 behaviour, manually transform them to the Babel 7 tokens ([example](https://github.com/babel/babel/blob/7e60a93897f9a134506251ea51269faf4d02a86c/packages/babel-parser/src/parser/statement.ts#L116-L188)).

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

### `@babel/compat-data`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `ios_saf` from `data/native-modules.json` ([#15068](https://github.com/babel/babel/pull/15068/commits/554225d72d7781356e05b6bbc4ef85f42629d001))

  __Migration__: Use `ios` instead.
