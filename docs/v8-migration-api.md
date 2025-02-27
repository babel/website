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

### JavaScript nodes

![high](https://img.shields.io/badge/risk%20of%20breakage%3F-high-red.svg)

- Represent dynamic `import()` with an `ImportExpression` node ([#15682](https://github.com/babel/babel/pull/15682), [#16114](https://github.com/babel/babel/pull/16114)).
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

### TypeScript nodes

Most of the changes to our TypeScript-specific AST nodes are to reduce the differences with the AST shape of the `@typescript-eslint` project. This will make it easier to write ESLint rules that, when not depending on type information, can work both with `@typescript-eslint/parser` and `@babel/eslint-parser`.

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- <a name="ast-TSTypeParameter"></a> Use an identifier for `TSTypeParameter.name`, rather than a plain string ([#12829](https://github.com/babel/babel/pull/12829))

  ```ts title="input.ts"
  // T is a TSTypeParameter
  function process<T>(input: T): T {}

  // AST in Babel 7
  {
    type: "TSTypeParameter",
    name: "T",
  }

  // AST in Babel 8
  {
    type: "TSTypeParameter",
    name: { type: "Identifier", name: "T" },
  }
  ```

- Allow `ThisExpression` as `TSTypeQuery.exprName`, rather than a `this` identifier ([#17059](https://github.com/babel/babel/pull/17059))

  ```ts title="input.ts"
  function fn() {
    // `typeof this` is a TSTypeQuery
    var self: typeof this
  }

  // AST in Babel 7
  {
    type: "TSTypeQuery",
    exprName: { type: "Identifier", name: "this" }
  }

  // AST in Babel 8
  {
    type: "TSTypeQuery",
    exprName: { type: "ThisExpression" }
  }
  ```

- Parse exporting `TSImportEqualsDeclaration` as an `ExportNamedDeclaration` ([#17073](https://github.com/babel/babel/pull/17073))

  Note that the `isExport` field is also removed. For any `TSImportEqualsDeclaration` NodePath `p`, use `p.parentPath.isExportNamedDeclaration()` to detect whether it is following an `export` keyword.

  ```ts title="input.ts"
  export import foo = require("foo")

  // AST in Babel 7
  {
    type: "TSImportEqualsDeclaration",
    importKind: "value"
    isExport: true,
    id: Identifier("foo"),
    moduleReference: {
      type: "TSExternalModuleReference",
      expression: StringLiteral("foo")
    }
  }

  // AST in Babel 8
  {
    type: "ExportNamedDeclaration",
    declaration: {
      type: "TSImportEqualsDeclaration",
      importKind: "value"
      id: Identifier("foo"),
      moduleReference: {
        type: "TSExternalModuleReference",
        expression: StringLiteral("foo")
      }
    },
    specifiers: []
  }
  ```

- Rename `parameters` to `params` and `typeAnnotation` to `returnType` in `TSCallSignatureDeclaration`, `TSConstructSignatureDeclaration`, `TSFunctionType`, `TSConstructorType` and `TSMethodSignature`
 ([#9231](https://github.com/babel/babel/issues/9231), [#13709](https://github.com/babel/babel/pull/13709))

  <details>
    <summary>TSCallSignatureDeclaration</summary>

    ```ts title="input.ts"
    interface Foo {
      (x: number): string;
    }

    // AST in Babel 7
    {
      type: "TSCallSignatureDeclaration",
      parameters: [
        { type: "Identifier", name: "x", typeAnnotation: { type: "TSNumberKeyword" } }
      ],
      typeAnnotation: {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" }
      }
    }

    // AST in Babel 8
    {
      type: "TSCallSignatureDeclaration",
      params: [
        { type: "Identifier", name: "x", typeAnnotation: { type: "TSNumberKeyword" } }
      ],
      retutnType: {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" }
      }
    }
    ```

  </details>

  <details>
    <summary>TSConstructSignatureDeclaration</summary>

    ```ts title="input.ts"
    interface Foo {
      new (x: number): string;
    }

    // AST in Babel 7
    {
      type: "TSConstructSignatureDeclaration",
      parameters: [
        { type: "Identifier", name: "x", typeAnnotation: { type: "TSNumberKeyword" } }
      ],
      typeAnnotation: {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" }
      }
    }

    // AST in Babel 8
    {
      type: "TSConstructSignatureDeclaration",
      params: [
        { type: "Identifier", name: "x", typeAnnotation: { type: "TSNumberKeyword" } }
      ],
      retutnType: {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" }
      }
    }
    ```

  </details>

  <details>
    <summary>TSMethodSignature</summary>

    ```ts title="input.ts"
    interface Foo {
      foo(x: number): string;
    }

    // AST in Babel 7
    {
      type: "TSMethodSignature",
      key: Identifier("foo"),
      parameters: [
        { type: "Identifier", name: "x", typeAnnotation: { type: "TSNumberKeyword" } }
      ],
      typeAnnotation: {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" }
      }
    }

    // AST in Babel 8
    {
      type: "TSMethodSignature",
      key: Identifier("foo"),
      params: [
        { type: "Identifier", name: "x", typeAnnotation: { type: "TSNumberKeyword" } }
      ],
      retutnType: {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" }
      }
    }
    ```

  </details>

  <details>
    <summary>TSFunctionType</summary>

    ```ts title="input.ts"
    type Bar = (x: number) => string;

    // AST in Babel 7
    {
      type: "TSFunctionType",
      parameters: [
        { type: "Identifier", name: "x", typeAnnotation: { type: "TSNumberKeyword" } }
      ],
      typeAnnotation: {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" }
      }
    }

    // AST in Babel 8
    {
      type: "TSFunctionType",
      params: [
        { type: "Identifier", name: "x", typeAnnotation: { type: "TSNumberKeyword" } }
      ],
      retutnType: {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" }
      }
    }
    ```

  </details>

  <details>
    <summary>TSConstructorType</summary>

    ```ts title="input.ts"
    type Bar = (x: number) => string;

    // AST in Babel 7
    {
      type: "TSConstructorType",
      parameters: [
        { type: "Identifier", name: "x", typeAnnotation: { type: "TSNumberKeyword" } }
      ],
      typeAnnotation: {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" }
      }
    }

    // AST in Babel 8
    {
      type: "TSConstructorType",
      params: [
        { type: "Identifier", name: "x", typeAnnotation: { type: "TSNumberKeyword" } }
      ],
      retutnType: {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" }
      }
    }
    ```

  </details>

- <a name="ast-typeArguments"></a> Rename `typeParameters` to `typeArguments` in `CallExpression`, `JSXOpeningElement`, `NewExpression`, `OptionalCallExpression`, `TSImportType`, `TSInstantiationExpression`, `TSTypeQuery` and  `TSTypeReference` ([#16679](https://github.com/babel/babel/issues/16679), [#17008](https://github.com/babel/babel/pull/17008), [#17012](https://github.com/babel/babel/pull/17012), [#17020](https://github.com/babel/babel/pull/17020), [#17042](https://github.com/babel/babel/pull/17042))

  <details>
    <summary>CallExpression</summary>

    ```ts title="input.ts"
    fn<string>()

    // AST in Babel 7
    {
      type: "CallExpression",
      callee: Identifier("fn"),
      arguments: [],
      typeParameters: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }

    // AST in Babel 8
    {
      type: "CallExpression",
      callee: Identifier("fn"),
      arguments: [],
      typeArguments: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }
    ```

  </details>

  <details>
    <summary>JSXOpeningElement</summary>

    ```ts title="input.ts"
    <Component<string>/>

    // AST in Babel 7
    {
      type: "JSXOpeningElement",
      name: JSXIdentifier("Component"),
      attributes: [],
      selfClosing: true,
      typeParameters: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }

    // AST in Babel 8
    {
      type: "JSXOpeningElement",
      name: JSXIdentifier("Component"),
      attributes: [],
      selfClosing: true,
      typeArguments: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }
    ```

  </details>

  <details>
    <summary>NewExpression</summary>

    ```ts title="input.ts"
    new Component<string>()

    // AST in Babel 7
    {
      type: "NewExpression",
      callee: Identifier("Component"),
      arguments: [],
      typeParameters: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }

    // AST in Babel 8
    {
      type: "NewExpression",
      callee: Identifier("Component"),
      arguments: [],
      typeArguments: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }
    ```

  </details>

  <details>
    <summary>OptionalCallExpression</summary>

    ```ts title="input.ts"
    fn?.<string>()

    // AST in Babel 7
    {
      type: "OptionalCallExpression",
      callee: Identifier("fn"),
      arguments: [],
      optional: true,
      typeParameters: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }

    // AST in Babel 8
    {
      type: "OptionalCallExpression",
      callee: Identifier("fn"),
      arguments: [],
      optional: true,
      typeArguments: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }
    ```

  </details>

  <details>
    <summary>TSImportType</summary>

    ```ts title="input.ts"
    var arr: import("./Array")<string>

    // AST in Babel 7
    {
      type: "TSImportType",
      argument: StringLiteral("./Array"),
      typeParameters: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }

    // AST in Babel 8
    {
      type: "TSImportType",
      argument: {
        type: "TSLiteralType",
        literal: StringLiteral("./Array")
      },
      typeArguments: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }
    ```

  </details>

  <details>
    <summary>TSInstantiationExpression</summary>

    ```ts title="input.ts"
    fn<string>

    // AST in Babel 7
    {
      type: "TSInstantiationExpression",
      expression: Identifier("fn"),
      typeParameters: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }

    // AST in Babel 8
    {
      type: "TSInstantiationExpression",
      expression: Identifier("fn"),
      typeArguments: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }
    ```

  </details>

  <details>
    <summary>TSTypeQuery</summary>

    ```ts title="input.ts"
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
      type: "TSTypeQuery",
      exprName: Identifier("Array"),
      typeArguments: {
        type: "TSTypeParameterInstantiation",
        params: [{
          type: "TSStringKeyword"
        }]
      }
    }
    ```

  </details>

  <details>
    <summary>TSTypeReference</summary>

    ```ts title="input.ts"
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

  </details>

- Rename `superTypeParameters` to `superTypeArguments` in `ClassDeclaration` and `ClassExpression` ([#16679](https://github.com/babel/babel/issues/16679), [#16997](https://github.com/babel/babel/pull/16997))

  ```ts title="input.ts"
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

- <a name="ast-TSMappedType"></a> Split `typeParameter` of `TSMappedType` ([#16733](https://github.com/babel/babel/pull/16733)).

  In `TSMappedType` nodes, the `typeParameter` property is flattened as `key` and `constraint` properties of `TSMappedType` itself.

  ```ts title="input.ts"
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

- Split `TSExpressionWithTypeArguments` into `TSClassImplements` and `TSInterfaceHeritage` ([#16731](https://github.com/babel/babel/pull/16731)).

  The new nodes also use `typeArguments` instead of `typeParameters` ([#17017](https://github.com/babel/babel/pull/17017)). If the `expression` is a TS qualified name (e.g. `a.b`), it will be parsed as a `MemberExpression` ([#17139](https://github.com/babel/babel/pull/17139)).

  <details>
    <summary>ClassDeclaration</summary>

    ```ts title="input.ts"
    class C implements X<T> {}

    // AST in Babel 7
    {
      type: "ClassDeclaration",
      id: Identifier("C"),
      implements: [
        {
          type: "TSExpressionWithTypeArguments",
          expression: Identifier("X"),
          typeParameters: {
            type: "TSTypeParameterInstantiation",
            params: [TSTypeReference(Identifier("T"))]
          }
        }
      ],
      body: ClassBody([]),
    }

    // AST in Babel 8
    {
      type: "ClassDeclaration",
      id: Identifier("C"),
      implements: [
        {
          type: "TSClassImplements",
          expression: Identifier("X"),
          typeArguments: {
            type: "TSTypeParameterInstantiation",
            params: [TSTypeReference(Identifier("T"))]
          }
        }
      ],
      body: ClassBody([]),
    }
    ```

  </details>

  <details>
    <summary>TSInterfaceDeclaration</summary>

    ```ts title="input.ts"
    interface I extends X<T> {}

    // AST in Babel 7
    {
      type: "TSInterfaceDeclaration",
      id: Identifier("I"),
      extends: [
        {
          type: "TSExpressionWithTypeArguments",
          expression: Identifier("X"),
          typeParameters: {
            type: "TSTypeParameterInstantiation",
            params: [TSTypeReference(Identifier("T"))]
          }
        }
      ],
      body: TSInterfaceBody([]),
    }

    // AST in Babel 8
    {
      type: "TSInterfaceDeclaration",
      id: Identifier("I"),
      extends: [
        {
          type: "TSInterfaceHeritage",
          expression: Identifier("X"),
          typeArguments: {
            type: "TSTypeParameterInstantiation",
            params: [TSTypeReference(Identifier("T"))]
          }
        }
      ],
      body: TSInterfaceBody([]),
    }
    ```

  </details>

  <details>
    <summary>Qualified name</summary>

    ```ts title="input.ts"
    class C implements X.Y {}

    // AST in Babel 7
    {
      type: "ClassDeclaration",
      id: Identifier("C"),
      implements: [
        {
          type: "TSExpressionWithTypeArguments",
          expression: {
            type: "TSQualifiedName",
            left: Identifier("X"),
            right: Identifier("Y")
          }
        }
      ],
      body: ClassBody([]),
    }

    // AST in Babel 8
    {
      type: "ClassDeclaration",
      id: Identifier("C"),
      implements: [
        {
          type: "TSClassImplements",
          expression: {
            type: "MemberExpression",
            object: Identifier("X"),
            property: Identifier("Y"),
            computed: false
          }
        }
      ],
      body: ClassBody([]),
    }
    ```

  </details>

- <a name="ast-TSImportType"></a> Wrap the `argument` of `TSImportType` within a `TSLiteralType` ([#17046](https://github.com/babel/babel/pull/17046))

  The `TSImportType` also uses `typeArguments` instead of `typeParameters` ([#17042](https://github.com/babel/babel/pull/17042)). See [here](#ast-typeArguments) for an example.

  ```ts title="input.ts"
    var arr: import("./Array")

    // AST in Babel 7
    {
      type: "TSImportType",
      argument: StringLiteral("./Array")
    }

    // AST in Babel 8
    {
      type: "TSImportType",
      argument: {
        type: "TSLiteralType",
        literal: StringLiteral("./Array")
      }
    }
  ```

- <a name="ast-TSEnumDeclaration"></a> Wrap the `members` of `TSEnumDeclaration` within a `TSEnumBody` node ([#16979](https://github.com/babel/babel/pull/16979))

  ```ts title="input.ts"
  // Example input
  enum ColorType {
    Red,
    Green,
    Blue,
  }

  // AST in Babel 7
  {
    type: "TSEnumDeclaration",
    id: Identifier("ColorType")
    members: [
      EnumMember("Red"),
      EnumMember("Green"),
      EnumMember("Blue")
    ]
  }

  // AST in Babel 8
  {
    type: "TSEnumDeclaration",
    id: Identifier("ColorType")
    body: {
      type: "TSEnumBody",
      members: [
        EnumMember("Red"),
        EnumMember("Green"),
        EnumMember("Blue")
      ]
    }
  }
  ```

- Create `TSTemplateLiteralType` when there is at least one interpolated position

  Note that the AST is not changed when there is no interpolated position, e.g. `` `foo` ``
  as a template literal type is still parsed as a TemplateLiteral node within a TSLiteralType.

  ```ts title="input.ts"
  type World = "world";
  // `hello ${World}` is a template literal type
  type Greeting = `hello ${World}`;

  // AST in Babel 7
  {
    type: "TSLiteralType",
    literal: {
      type: "TemplateLiteral",
      expressions: [{
        type: "TSTypeReference",
        typeName: Identifier("World")
      }],
      quasis: [
        TemplateElement("hello "),
        TemplateElement("")
      ]
    }
  }

  // AST in Babel 8
  {
    type: "TSTemplateLiteralType",
    types: [{
      type: "TSTypeReference",
      typeName: Identifier("World")
    }],
    quasis: [
      TemplateElement("hello "),
      TemplateElement("")
    ]
  }
  ```

- Create `TSAbstractMethodDefinition` and `TSPropertyDefinition` when both `estree` and `typescript` parser plugins are enabled ([#16679](https://github.com/babel/babel/issues/16679), [#17014](https://github.com/babel/babel/pull/17014))

  __Migration__: This breaking change is part of the efforts to libraries and ESLint plugins that can work both with `typescript-eslint` and `@babel/eslint-parser`. For most Babel plugin developers you can safely ignore this change as it does not affect the typescript transform and codemod. That said, if you are trying to develop a custom ESLint rule with `@babel/eslint-parser`, this change aligns the Babel AST to the `typescript-eslint` AST.

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Don't generate `TSParenthesizedType` unless `createParenthesizedExpression` is enabled([#9546](https://github.com/babel/babel/issues/9546), [#12608](https://github.com/babel/babel/pull/12608))

  ```ts title="input.ts"
  type T = ({});

  // Babel 8 with createParenthesizedExpression: true, and Babel 7
  TSParenthesizedType { typeAnnotation: TSTypeLiteral { members: [] } }

  // Babel 8 with createParenthesizedExpression: false
  TSTypeLiteral { members: [] }
  ```

  **Migration**: If you need information about parentheses, specify the [`createParenthesizedExpression`](./parser.md#options) parser option.
  ```json title="babel.config.json"
  { "parserOpts": { "createParenthesizedExpression": true } }
  ```
  When `createParenthesizedExpression` is `false`, you can also use `node.extra.parenthesized` to detect whether `node` is wrapped in parentheses.

## API Changes

### All packages

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Disallow importing internal files ([#14013](https://github.com/babel/babel/pull/14013), [#14179](https://github.com/babel/babel/pull/14179)).

  __Migration__: Use the exported API only. If you are relying on Babel internals, please open an issue and let us know.

### `@babel/core`

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Disallow using `babel.transform`, `babel.transformFile`, `babel.transformFromAst`, `babel.parse`, `babel.loadOptions`, `babel.loadPartialConfig` and `babel.createConfigItem` synchronously ([#11110](https://github.com/babel/babel/pull/11110), [#12695](https://github.com/babel/babel/pull/12695), [#15869](https://github.com/babel/babel/pull/15869)).

  __Migration__: The APIs above require a callback argument. If you are not providing a callback, please use their sync versions: `babel.transformSync`, `babel.transformFileSync`, `babel.transformFromAstSync`, `babel.parseSync`, `babel.loadOptionsSync`, `babel.loadPartialConfigSync` and `babel.createConfigItemSync`.

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

  A `Super` node represents `super` in super call `super()` and super property `super.foo`. As `super` can not be a standalone expression, `t.isExpression(t.super())` will return `false` in Babel 8.

  __Migration__: Search usage of the `t.isExpression` and `t.assertsExpression` functions, and of the `t.Expression` type alias: if they need to also accept `Super` nodes, update them accordingly.

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

- Require an `Identifier` node as the third argument of `t.tsTypeParameter` ([#12829](https://github.com/babel/babel/pull/12829))

  This is due to the corresponding [AST shape change](#ast-TSTypeParameter).

  __Migration__: Wrap the `name` string within the `identifier` builder

  ```diff title="my-babel-codemod.js"
    t.tsTypeParameter(
      /* constraint */ undefined,
      /* default */ undefined,
  +   t.identifier(
        name
  +   )
    )
  ```

- Require a `TSLiteralType` node as the first argument of `t.tsImportType` ([#17046](https://github.com/babel/babel/pull/17046))

  This is due to the corresponding [AST shape change](#ast-TSImportType).

  __Migration__: Wrap the `argument` string literal within the `tsLiteralType` builder

  ```diff title="my-babel-codemod.js"
    t.tsImportType(
  +   t.tsLiteralType(
        t.stringLiteral("foo")
  +   )
    )
  ```

- Require a `TSEnumBody` node as the second argument of `t.tsEnumDeclaration` ([#16979](https://github.com/babel/babel/pull/16979))

  This is due to the corresponding [AST shape change](#ast-TSEnumDeclaration).

  __Migration__: Wrap the `members` array within the `tsEnumBody` builder

  ```diff title="my-babel-codemod.js"
  // Create `enum ColorType { Red, Green, Blue }`
  t.tsEnumDeclaration(
    t.identifier("ColorType"),
  -  [
  +  t.tsEnumBody([
      t.tsEnumMember(t.identifier("Red")),
      t.tsEnumMember(t.identifier("Green")),
      t.tsEnumMember(t.identifier("Blue"))
  -  ],
  +  ]),
  )
  ```

- Update the `t.tsMappedType` signature ([#16733](https://github.com/babel/babel/pull/16733))

  This is due to the corresponding [AST shape change](#ast-TSMappedType).

  ```ts
  // Babel 7
  declare function tsMappedType(
    typeParameter: TSTypeParameter,
    typeAnnotation?: TSType,
    nameType?: TSType
  ): TSMappedType

  // Babel 8
  declare function tsMappedType(
    key: Identifier,
    constraint: TSType,
    nameType?: TSType,
    typeAnnotation?: TSType
  ): TSMappedType
  ```
  __Migration__: See the example below.

  ```ts title="my-babel-codemod.ts"
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

- Remove the `Noop` node type ([#12361](https://github.com/babel/babel/pull/12361))

  __Migration__: There is no generic migration path: you should replace it with the actual node that `Noop` is being used as a placeholder for. If you are depending on `Noop` and have no alternative, please open an issue and explain your use case.

- Initialize `indexers`, `callProperties` and `internalSlots` in the node `ObjectTypeAnnotation` as an empty array in `t.objectTypeAnnotation` ([#14465](https://github.com/babel/babel/pull/14465))

  In Babel 7 the builder `t.objectTypeAnnotation` initializes them as `null`, this is inconsistent with how `@babel/parser` will parse the Flow object type annotations. In Babel 8 the new default value `[]` matches the parser behaviour.

- Reject negative and NaN/infinite numbers from `t.numericLiteral` ([#15802](https://github.com/babel/babel/pull/15802))

  ```js title="babel-plugin.js"
  // NumericLiterals must be non-negative finite numbers.
  t.numericLiteral(-1);
  ```

  __Migration__: To represent a negative number, use `t.unaryExpression("-", t.numericLiteral(1))`. To represent NaN or Infinity, use `t.identifier("NaN")`. To convert a generic numeric value (which could also be negative, NaN, or an inifinity) to the proper AST node, use `t.valueToNode(num)`.

### `@babel/parser`

Other than the changes listed below, `@babel/parser` is affected by all the [AST changes](#ast-changes).

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Align Babel parser error codes between Flow and TypeScript ([#13294](https://github.com/babel/babel/pull/13294))

  The `error.code` for `OptionalBindingPattern` is renamed as `PatternIsOptional`.

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

  Note that `tokens[].type` is meant to be an opaque object used as an identity for token types, as if it was a symol. Its exact shape is meant to be an internal implementation detail.

- Tokenize private names (`#priv`) as a single `privateName` token ([#13256](https://github.com/babel/babel/pull/13256))

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

- Tokenize template literals as `templateNonTail` and `templateTail` ([#13919](https://github.com/babel/babel/pull/13919))

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

- Remove `extra.shorthand` from `ObjectProperty` nodes ([#16521](https://github.com/babel/babel/pull/16521))

  **Migration**: Use `node.shorthand` rather than `node.extra.shorthand`.

### `@babel/traverse`

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove `is`, `isnt`, `has`, `equals` methods from `NodePath` ([#16655](https://github.com/babel/babel/pull/16655))

  __Migration__: Directly compare properties of `path.node` instead.

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

- Remove `Scope.prototype.traverse`, `Scope#parentBlock` and `Scope#hub` ([#16705](https://github.com/babel/babel/pull/16705))

  __Migration__: Use `scope.path` methods and properties instead:

  ```diff
  - scope.traverse(scopeRootNode, visitor, state)
  + scope.path.traverse(visitor, state)

  - scope.parentBlock
  + scope.path.parent

  - scope.hub
  + scope.path.hub
  ```

- Remove `Scope.prototype.getAllBindingsOfKind` and `Scope.prototype.toArray` ([#16705](https://github.com/babel/babel/pull/16705))

  These methods have been removed as they are not used anymore in our code base.

  __Migration__: You can copy&paste them from Babel 7's source to your plugin.

- Remove `hoist`, `updateSiblingKeys`, `call`, `setScope`, `resync`, `popContext`, `pushContext`, `setup`, `setKey` methods from `NodePath` ([#16655](https://github.com/babel/babel/pull/16655))

  These methods are meant to be private so there is no real migration approach. If your plugin / build is broken by this change, feel free to open an issue and tell us how you use these methods and we can see what we can do after Babel 8 is released.

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `block` argument from `Scope#rename` ([#15288](https://github.com/babel/babel/pull/15288))

  ```diff
  - rename(oldName: string, newName?: string, block?: t.Pattern | t.Scopable)
  + rename(oldName: string, newName?: string)
  ```

  __Migration__: Instead of passing a different block to `scope.rename()`, directly call `.rename()` on the scope corresponding to that block.

- Allow skipped `NodePath`s to be requeued ([#13291](https://github.com/babel/babel/pull/13291))

  `NodePath#requeue()` can requeue a skipped NodePath. This is actually a bugfix, but it causes an infinite loop in the [temporal dead zone](https://babeljs.io/docs/babel-plugin-transform-block-scoping#tdz) implementation of `@babel/plugin-transform-block-scoping` in Babel 7: it may break other plugins as well.

  __Migration__: If you want to preserve the old behavior, you can use `NodePath#shouldSkip` to check whether a NodePath has been skipped before calling `NodePath#requeue()`.

- Remove methods starting with `_` from `Scope` and `NodePath` ([#16504](https://github.com/babel/babel/pull/16504), [#16705](https://github.com/babel/babel/pull/16705))

  ```js
  // NodePath.prototype
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

  // Scope.prototype
  _renameFromMap
  _generateUid
  ```

  These methods are meant to be private so there is no real migration approach. If your plugin / build is broken by this change, feel free to open an issue and tell us how you use these methods and we can see what we can do after Babel 8 is released.

### `@babel/eslint-plugin`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove the `default` property of the exports object ([#14180](https://github.com/babel/babel/pull/14180))

  __Migration__: This change has no effect if you are using the plugin in your ESLint config. However, if you are extending `@babel/eslint-plugin`, ensure that you obtain exports
  from `require("@babel/eslint-plugin")` rather than `require("@babel/eslint-plugin").default`.

  ```js title="my-eslint-plugin.cjs"
  // Don't add `.default` after `require()`
  const { rules, rulesConfig } = require("@babel/eslint-plugin")
  ```

### `@babel/compat-data`

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Rename stage 4 plugin entries from `proposal-*` to `transform-*` in `plugins.json` ([#14976](https://github.com/babel/babel/pull/14976))

  This change also affects the `isRequired` function of `@babel/helper-compilation-targets`, which receives plugin names as its first parameter.

  __Migration__: For example, use `transform-class-properties` rather than `proposal-class-properties`. For a complete list of renamed plugin, see [Packages Renames section of Babel 8 migration](./v8-migration.md#package-renames).

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

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove `ios_saf` from `data/native-modules.json` ([#15068](https://github.com/babel/babel/pull/15068/commits/554225d72d7781356e05b6bbc4ef85f42629d001))

  __Migration__: Use `ios` instead.

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

  Note that the Babel 8 behavior is the same as the _default_ Babel 7 behavior (i.e. `includeUpdateExpression: true`).

### `@babel/highlight`

![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

- Remove the `getChalk` function (https://github.com/babel/babel/pull/15812)

  If you need to use `chalk`, add it to your dependencies.

### Plugin API changes

![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

- Remove `getModuleName` from plugin pass ([#12724](https://github.com/babel/babel/pull/12724))

  __Migration__: Use `.file.getModuleName` instead.

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

  This change probably will not affect your plugin as this method is already throwing an error in Babel 7.

  __Migration__: Use [`addNamed`](./helper-module-imports.md#import--named-as-_named--from-source) or [`addDefault`](./helper-module-imports.md#import-_default-from-source) from `@babel/helper-module-imports` instead.

- Stop supporting plugin fields as named exports ([#15576](https://github.com/babel/babel/pull/15576))

  For example, the following file is not a valid plugin anymore:

  ```js title="legacy-babel-plugin.js"
  export const name = "legacy-babel-plugin";
  export const visitor = {
    Identifier() {}
  }
  ```

  __Migration__: Find such patterns and use a default export instead, either exporting a plugin object or a factory function.

  ```js title="my-babel-plugin.cjs"
  export default {
    name: "babel-plugin",
    visitor: {
      Identifier() {}
    }
  }
  ```
