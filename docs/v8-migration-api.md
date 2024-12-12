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

- Dynamic `import()` is parsed as an `ImportExpression` ([#15682](https://github.com/babel/babel/pull/15682), [#16114](https://github.com/babel/babel/pull/16114)).
  ```ts
  // Example input
  import("foo", options);

  // AST in Babel 7
  {
    type: "CallExpression",
    callee: { type: "Import" },
    arguments: [
      StringLiteral("foo"),
      Identifier("options")
    ]
  }

  // AST in Babel 8
  {
    type: "ImportExpression",
    source: StringLiteral("foo"),
    options: Identifier("options")
  }
  ```
  __Migration__: You are encouraged to test your Babel plugins with the new AST, starting from v7.23.0, specifying `{ parserOpts: { createImportExpressions: true } }` in the Babel config.
  For end users utilizing Babel plugins that rely on the legacy `import()` AST, it is possible to set `createImportExpressions` to `false`. Note that the Babel 7 `import()` AST is now considered
  deprecated, it does not support new ES features such as [Source Phrase Imports](https://tc39.es/proposal-source-phase-imports/). We will remove the `createImportExpressions` parser option in Babel 9.

- Use an identifier for `TSTypeParameter.name` ([#12829](https://github.com/babel/babel/pull/12829)).

  For a TS type parameter `node`, `node.name` is a string in Babel 7 while in Babel 8 it is an Identifier.
  ```ts title="input.ts"
  // T is a TSTypeParameter
  function process<T>(input: T): T {}
  ```

  __Migration__: If you have a customized plugin accessing the name of a type parameter node, use `node.name.name` in Babel 8.

- Rename `parameters` to `params`, `typeAnnotation` to `returnType` for `TSCallSignatureDeclaration`, `TSConstructSignatureDeclaration`, `TSFunctionType`, `TSConstructorType` and `TSMethodSignature`
 ([#9231](https://github.com/babel/babel/issues/9231), [#13709](https://github.com/babel/babel/pull/13709))

  ```ts title="input.ts"
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

- Rename `typeParameters` to `typeArguments` for `TSTypeQuery` ([#16679](https://github.com/babel/babel/issues/16679), [#17012](https://github.com/babel/babel/pull/17012))

  ```ts title=input.ts
  var arr: typeof Array<string>;

  // AST in Babel 7
  {
    type: "TSTypeQuery",
    exprName: Identifier("Array"),
    typeParameters: {
      type: "TSTypeParameterInstantiation",
      params: [{
        type: "TSStringKeyword"
      }]
    }
  }

  // AST in Babel 8
  {
    type: "TSTypeReference",
    exprName: Identifier("Array"),
    typeArguments: {
      type: "TSTypeParameterInstantiation",
      params: [{
        type: "TSStringKeyword"
      }]
    }
  }
  ```

- Rename `typeParameters` to `typeArguments` for `TSTypeReference` ([#16679](https://github.com/babel/babel/issues/16679), [#17008](https://github.com/babel/babel/pull/17008))

  ```ts title=input.ts
  var arr: Array<string>;

  // AST in Babel 7
  {
    type: "TSTypeReference",
    typeName: Identifier("Array"),
    typeParameters: {
      type: "TSTypeParameterInstantiation",
      params: [{
        type: "TSStringKeyword"
      }]
    }
  }

  // AST in Babel 8
  {
    type: "TSTypeReference",
    typeName: Identifier("Array"),
    typeArguments: {
      type: "TSTypeParameterInstantiation",
      params: [{
        type: "TSStringKeyword"
      }]
    }
  }
  ```

- Rename `superTypeParameters` to `superTypeArguments` for `ClassDeclaration` and `ClassExpression` ([#16679](https://github.com/babel/babel/issues/16679), [#16997](https://github.com/babel/babel/pull/16997))

  ```ts title=input.ts
  class X extends Y<string> {}

  // AST in Babel 7
  {
    type: "ClassDeclaration",
    id: Identifier("X"),
    superClass: Identifier("Y"),
    superTypeParameters: {
      type: "TSTypeParameterInstantiation",
      params: [{
        type: "TSStringKeyword"
      }]
    }
  }

  // AST in Babel 8
  {
    type: "ClassDeclaration",
    id: Identifier("X"),
    superClass: Identifier("Y"),
    superTypeArguments: {
      type: "TSTypeParameterInstantiation",
      params: [{
        type: "TSStringKeyword"
      }]
    }
  }
  ```

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Split `typeParameter` of `TSMappedType` ([#16733](https://github.com/babel/babel/pull/16733)).

  For a `TSMappedType` node, the `typeParameter` attribute is split into `key` and `constraint` attributes.
  This is to align the AST for TS nodes with `@typescript-eslint`.

  ```ts
  // Example input
  let map1: { [P in string]: number; };

  // AST in Babel 7
  {
    type: "TSMappedType",
    typeParameter: {
      type: "TypeParameter",
      name: Identifier("P"),
      constraint: TSStringKeyword()
    },
    typeAnnotation: TSNumberKeyword(),
  }

  // AST in Babel 8
  {
    type: "TSMappedType",
    key: Identifier("P"),
    constraint: TSStringKeyword()
    typeAnnotation: TSNumberKeyword(),
  }
  ```

  __Migration__: If you have a customized plugin accessing `typeParameter` of a `TSMappedType` node:
    - For `node.typeParameter.name` in Babel 7, use `node.key` in Babel 8
    - For `node.typeParameter.constraint` in Babel 7, use `node.constraint` in Babel 8

- Split `TSExpressionWithTypeArguments` into `TSClassImplements` and `TSInterfaceHeritage` ([#16731](https://github.com/babel/babel/pull/16731), and rename `typeParameters` to `typeArguments` ([#17017](https://github.com/babel/babel/pull/17017)).

  The builder and validator for `TSExpressionWithTypeArguments` in `@babel/types` and `@babel/traverse` are also removed.
  This is to align the AST for TS nodes with `@typescript-eslint`.

  ```ts
  // Example input
  class C implements X<T> {}
  interface I extends X<T> {}

  // AST in Babel 7
  {
    type: "ClassDeclaration",
    id: Identifier("C"),
    implements: [
      {
        type: "TSExpressionWithTypeArguments",
        expression: Identifier("X"),
        typeParameters: { type: "TSTypeParameterInstantiation", params: [TSTypeReference(Identifier("T"))] }
      }
    ],
    body: ClassBody([]),
  }

  {
    type: "TSInterfaceDeclaration",
    id: Identifier("I"),
    extends: [
      {
        type: "TSExpressionWithTypeArguments",
        expression: Identifier("X"),
        typeParameters: { type: "TSTypeParameterInstantiation", params: [TSTypeReference(Identifier("T"))] }
      }
    ],
    body: TSInterfaceBody([]),
  }

  // AST in Babel 8
  {
    type: "ClassDeclaration",
    id: Identifier("C"),
    implements: [
      {
        type: "TSClassImplements",
        expression: Identifier("X"),
        typeArguments: { type: "TSTypeParameterInstantiation", params: [TSTypeReference(Identifier("T"))] }
      }
    ],
    body: ClassBody([]),
  }

  {
    type: "TSInterfaceDeclaration",
    id: Identifier("I"),
    extends: [
      {
        type: "TSInterfaceHeritage",
        expression: Identifier("X"),
        typeArguments: { type: "TSTypeParameterInstantiation", params: [TSTypeReference(Identifier("T"))] }
      }
    ],
    body: TSInterfaceBody([]),
  }
  ```

  __Migration__: If you are using `TSExpressionWithTypeArguments`, replace it with `TSClassImplements` and `TSInterfaceHeritage` in Babel 8. If you are accessing `node.typeParameters`, use `node.typeArguments`.

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
  When `createParenthesizedExpression` is `false`, you can also use `node.extra.parenthesized` to detect whether `node` is wrapped in parentheses.

- Create `TSAbstractMethodDefinition` and `TSPropertyDefinition` when both `estree` and `typescript` parser plugins are enabled ([#16679](https://github.com/babel/babel/issues/16679), [#17014](https://github.com/babel/babel/pull/17014))

  __Migration__: This breaking change is part of the efforts to libraries and ESLint plugins that can work both with `typescript-eslint` and `@babel/eslint-parser`. For most Babel plugin developers you can safely ignore this change as it does not affect the typescript transform and codemod. That said, if you are trying to develop a custom ESLint rule with `@babel/eslint-parser`, this change aligns the Babel AST to the `typescript-eslint` AST.

## API Changes

### All packages
![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- Disallow importing internal files ([#14013](https://github.com/babel/babel/pull/14013), [#14179](https://github.com/babel/babel/pull/14179)).

  __Migration__: Use the exported API only. If you are relying on Babel internals, please open an issue and let us know.

### `@babel/core`

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Disallow using `babel.transform`, `babel.transformFile`, `babel.transformFromAst`, `babel.parse`, `babel.loadOptions`, `babel.loadPartialConfig` and `babel.createConfigItem` synchronously ([#11110](https://github.com/babel/babel/pull/11110), [#12695](https://github.com/babel/babel/pull/12695), [#15869](https://github.com/babel/babel/pull/15869)).

  __Migration__: The API above require a callback argument. If you are not providing a callback, please use their sync versions: `babel.transformSync`, `babel.transformFileSync`, `babel.transformFromAstSync`, `babel.parseSync`, `babel.loadOptionsSync`, `babel.loadPartialConfigSync` and `babel.createConfigItemSync`.

### `@babel/generator`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `CodeGenerator` class ([#16126](https://github.com/babel/babel/pull/16126))

  __Migration__: In Babel 8 the undocumented `CodeGenerator` class has been removed, please use the default exported `generate` function instead.

  ```diff
  - new CodeGenerator(ast).generate()
  + generate(ast)
  ```

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

  __Migration__: Search usage of `t.isExpression`, `t.assertsExpression` and `Expression` alias in the plugin visitor, and if necessary, update the usage when you are handling super call and super property. For example,

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

- The third argument of `t.tsTypeParameter` requires an `Identifier` node ([#12829](https://github.com/babel/babel/pull/12829))

  __Migration__: Wrap the `name` string within the `identifier` builder

  ```diff title="my-babel-codemod.js"
  t.tsTypeParameter(
    /* constraint */ undefined,
    /* default */ undefined,
  + t.identifier(
      name
  + )
  )
  ```

- The `t.tsMappedType` signature changed ([#16733](https://github.com/babel/babel/pull/16733))

  ```ts
  // Babel 7
  declare function tsMappedType(typeParameter: TSTypeParameter, typeAnnotation?: TSType, nameType?: TSType): TSMappedType
  // Babel 8
  declare function tsMappedType(key: Identifier, constraint: TSType, nameType?: TSType, typeAnnotation?: TSType): TSMappedType
  ```
  __Migration__: See the example below.

  ```ts title=my-babel-codemod.ts
  // To create { [P in string as Q]: number }

  // Babel 7
  t.tsMappedType(
    t.tsTypeParameter(t.tsStringKeyword(), undefined, "P"),
    t.tsNumberKeyword(),
    t.tsTypeReference(t.identifier("Q"))
  )

  // Babel 8
  t.tsMappedType(
    t.identifier("P"),
    t.tsStringKeyword(),
    t.tsTypeReference(t.identifier("Q")),
    t.tsNumberKeyword()
  )
  ```

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `t.jSX*` and `t.tS*` builder aliases ([#6989](https://github.com/babel/babel/issues/6989), [#15527](https://github.com/babel/babel/pull/15527))

  __Migration__: Use `t.jsx*` and `t.ts*` instead. For example, replace `t.jSXIdentifier("foo")` with `t.jsxIdentifier("foo")`.

- Remove `selfClosing` argument from `t.jsxElement` ([#14464](https://github.com/babel/babel/pull/14464))

  ```diff
  - t.jsxElement(openingElement, closingElement, children, selfClosing?: boolean)
  + t.jsxElement(openingElement, closingElement, children)
  ```
  __Migration__: The `selfClosing` argument was already not used in the builder. You can safely remove it.

- Remove `optional` argument from `t.memberExpression` ([#13407](https://github.com/babel/babel/pull/13407))

  ```diff
  - t.memberExpression(object, property, computed, optional?: boolean)
  + t.memberExpression(object, property, computed)
  ```

  __Migration__: The `optional` argument was already not used in the builder. You can safely remove it.

- [Remove the `Noop` node type](https://github.com/babel/babel/issues/12355) ([#12361](https://github.com/babel/babel/pull/12361))

  __Migration__: The `Noop` node is not used. If you are depending on the `Noop` node, please open an issue and talk about your use case.

- Initialize `indexers`, `callProperties` and `internalSlots` in the node `ObjectTypeAnnotation` as an empty array in `t.objectTypeAnnotation` ([#14465](https://github.com/babel/babel/pull/14465))

  __Migration__: In Babel 7 the builder `t.objectTypeAnnotation` initializes them as `null`, this is inconsistent with how `@babel/parser` will parse the Flow object type annotations. In Babel 8 the new default value `[]` matches the parser behaviour. Adapt to the new default value if you are depending on this.

- Reject negative and NaN/infinite numbers from `t.numericLiteral` ([#15802](https://github.com/babel/babel/pull/15802))

  ```js title="babel-plugin.js"
  // NumericLiterals must be non-negative finite numbers.
  t.numericLiteral(-1);
  ```
  __Migration__: Babel 7 silently ignores such invalid usage. Use `t.valueToNode(-1)` instead.

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

- Remove `extra.shorthand` from `ObjectProperty` nodes ([#16521](https://github.com/babel/babel/pull/16521))

  **Migration**: Use `node.shorthand` rather than `node.extra.shorthand`.

### `@babel/traverse`

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove some `NodePath` methods ([#16655](https://github.com/babel/babel/pull/16655))

  __Migration__:
  `hoist`, `updateSiblingKeys`, `call`, `setScope`, `resync`, `popContext`, `pushContext`, `setup`, `setKey`
  These methods are meant to be private so there is no real migration approach. But if your plugin / build is broken by this change, feel free to open an issue and tell us how you use these methods and we can see what we can do after Babel 8 is released.

  `is`, `isnt`, `has`, `equals`
  Access `path.node` instead.
  ```diff
  - functionExpressionPath.equals("id", idNode)
  + functionExpressionPath.node.id === idNode

  - functionExpressionPath.is("id")
  - functionExpressionPath.has("id")
  + functionExpressionPath.node.id

  - functionExpressionPath.has("arguments")
  + !!functionExpressionPath.node.arguments.length

  - functionExpressionPath.isnt("async")
  + !functionExpressionPath.node.async
  ```

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `block` argument from `Scope#rename` ([#15288](https://github.com/babel/babel/pull/15288))

  ```diff
  - rename(oldName: string, newName?: string, block?: t.Pattern | t.Scopable)
  + rename(oldName: string, newName?: string)
  ```

  __Migration__: In Babel 8 the third argument `block` is not used by the method. Consider remove it if you are depending on `Scope#rename`.

- [Allow skipped `NodePath`s to be requeued](https://github.com/babel/babel/blob/43b623c1f1e86e6fb86cae8d955a84fd924380a4/packages/babel-traverse/src/path/context.js#L241-L247) ([#13291](https://github.com/babel/babel/pull/13291))

  **Notes**: `NodePath#requeue()` can requeue a skipped NodePath. This is actually a bugfix, but it causes an infinite loop in the tdz implementation of `@babel/plugin-transform-block-scoping` in Babel 7. So it may break other plugins as well.

  __Migration__: Adapt to the new behaviour. You can use `NodePath#shouldSkip` to check whether a NodePath has been skipped before calling `NodePath#requeue()`.

- Remove methods starting with `_` ([#16504](https://github.com/babel/babel/pull/16504))

  ```
  _assertUnremoved
  _call
  _callRemovalHooks
  _containerInsert
  _containerInsertAfter
  _containerInsertBefore
  _getKey
  _getPattern
  _getQueueContexts
  _getTypeAnnotation
  _markRemoved
  _remove
  _removeFromScope
  _replaceWith
  _resolve
  _resyncKey
  _resyncList
  _resyncParent
  _resyncRemoved
  _verifyNodeList
  ```

  __Migration__: These methods are meant to be private so there is no real migration approach. But if your plugin / build is broken by this change, feel free to open an issue and tell us how you use these methods and we can see what we can do after Babel 8 is released.

### `@babel/compat-data`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `ios_saf` from `data/native-modules.json` ([#15068](https://github.com/babel/babel/pull/15068/commits/554225d72d7781356e05b6bbc4ef85f42629d001))

  __Migration__: Use `ios` instead.

- Rename stage 4 plugin entries from `proposal-*` to `transform-*` in `plugins.json` ([#14976](https://github.com/babel/babel/pull/14976))

  __Migration__: For example, use `transform-class-properties` rather than `proposal-class-properties`. For a complete list of renamed plugin, see [Packages Renames section of Babel 8 migration](./v8-migration.md#package-renames).

### `@babel/eslint-plugin`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- The `default` named exports has been removed ([#14180](https://github.com/babel/babel/pull/14180))

  __Migration__: This change has no effect if you are using the plugin in your ESLint config. However, if you are extending `@babel/eslint-plugin`, ensure that you obtain exports
  from `require("@babel/eslint-plugin")` rather than `require("@babel/eslint-plugin").default`.

  ```js title="my-eslint-plugin.cjs"
  // Don't add `.default` after `require()`
  const { rules, rulesConfig } = require("@babel/eslint-plugin")
  ```

### `@babel/helper-compilation-targets`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- `isRequired` will not accept renamed `proposal-` queries ([#14976](https://github.com/babel/babel/pull/14976))

  ```diff title="my-babel-plugin.js"
  module.exports = api => {
    const targets = api.targets();
    // The targets have native optional chaining support
    // if `transform-optional-chaining` is _not_ required
    const optionalChainingSupported = !isRequired(
  -   "proposal-optional-chaining",
  +   "transform-optional-chaining",
      targets
    );
  };
  ```

  __Migration__: Use the `transform-*` plugin name if the plugin is listed in [the Packages Renames section of Babel 8 migration](./v8-migration.md#package-renames).

### `@babel/helper-replace-supers`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove named export `environmentVisitor` ([#15550](https://github.com/babel/babel/pull/15550))

  __Migration__: Import it from [`@babel/helper-environment-visitor`](./helper-environment-visitor.md).

  ```diff
  - import { environmentVisitor } from "@babel/helper-replace-supers";
  + import environmentVisitor from `@babel/helper-environment-visitor`;
  ```

- Remove named export `skipAllButComputedKey` ([#15550](https://github.com/babel/babel/pull/15550))

  __Migration__: Use [`requeueComputedKeyAndDecorators`](./helper-environment-visitor.md#requeuecomputedkeyanddecorators) instead. Find and replace the following import and usage
  ```js title="my-babel7-plugin.js"
  import { skipAllButComputedKey } from "@babel/helper-replace-supers";
  skipAllButComputedKey(path);
  ```
  to
  ```js title="my-babel8-plugin.js"
  import { requeueComputedKeyAndDecorators } from `@babel/helper-environment-visitor`;
  path.skip();
  requeueComputedKeyAndDecorators(path);
  ```

### `@babel/helper-simple-access`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove the the third parameter `includeUpdateExpression` from the default export ([#15550](https://github.com/babel/babel/pull/15550))

  This change probabaly won't break your integration as `includeUpdateExpression` defaults to `true` in Babel 7. If you are using `includeUpdateExpression: false`, adapt to the new behaviour.

### `@babel/highlight`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove the `getChalk` function (https://github.com/babel/babel/pull/15812)

  If you need to use `chalk`, add it to your dependencies.

## Plugin changes

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove `getModuleName` from plugin pass ([#12724](https://github.com/babel/babel/pull/12724))

  __Migration__: Use `.file.getModuleName` instead. For example,

  ```diff title="my-babel-plugin.js"
  module.exports = {
    name: "my-babel-plugin",
    visitor: {
      Identifier(path, pass) {
  -     const moduleName = pass.getModuleName();
  +     const moduleName = pass.file.getModuleName();
      }
    }
  }
  ```

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `addImport` from plugin pass ([#15576](https://github.com/babel/babel/pull/15576))

  __Migration__: This change probably will not affect your plugin as this method is already throwing an error in Babel 7. Use [`addNamed`](./helper-module-imports.md#import--named-as-_named--from-source) or [`addDefault`](./helper-module-imports.md#import-_default-from-source) from `@babel/helper-module-imports` instead.

- Stop supporting fields as named exports ([#15576](https://github.com/babel/babel/pull/15576))

  __Migration__: This change disallows plugins declared from named exports, for example,
  ```js title="legacy-babel-plugin.js"
  exports.name = "legacy-babel-plugin";
  exports.visitor = {
    Identifier() {}
  }
  ```

  find such patterns and migrate to the following patterns.
  ```js title="my-babel-plugin.cjs"
  module.exports = {
    name: "babel-plugin",
    visitor: {
      Identifier() {}
    }
  }
  ```
