---
id: babel-types
title: @babel/types
sidebar_label: types
---

## Install

```sh
npm install --save-dev @babel/types
```

## API

### AnyTypeAnnotation
```javascript
t.anyTypeAnnotation()
```

See also `t.isAnyTypeAnnotation(node, opts)` and `t.assertAnyTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.anyTypeAnnotation();

const { code } = generate(ast);
console.log(code); // any
```

---

### ArgumentPlaceholder
```javascript
t.argumentPlaceholder()
```

See also `t.isArgumentPlaceholder(node, opts)` and `t.assertArgumentPlaceholder(node, opts)`.

Aliases: none

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.argumentPlaceholder();

const { code } = generate(ast);
console.log(code); // ?
```

---

### ArrayExpression
```javascript
t.arrayExpression()
```

See also `t.isArrayExpression(node, opts)` and `t.assertArrayExpression(node, opts)`.

Aliases: `Expression`

 - `elements`: `Array<null | Expression | SpreadElement>` (default: `[]`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.arrayExpression();

const { code } = generate(ast);
console.log(code); // []
```

---

### ArrayPattern
```javascript
t.arrayPattern(elements)
```

See also `t.isArrayPattern(node, opts)` and `t.assertArrayPattern(node, opts)`.

Aliases: `LVal`, `Pattern`, `PatternLike`

 - `elements`: `Array<PatternLike>` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const elements = [
  t.identifier("foo"),
  t.identifier("bar"),
  t.identifier("baz"),
];
const ast = t.arrayPattern(elements);

const { code } = generate(ast);
console.log(code); // [foo, bar, baz]
```

---

### ArrayTypeAnnotation
```javascript
t.arrayTypeAnnotation(elementType)
```

See also `t.isArrayTypeAnnotation(node, opts)` and `t.assertArrayTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `elementType`: `FlowType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const elementType = t.anyTypeAnnotation();
const ast = t.arrayTypeAnnotation(elementType);

const { code } = generate(ast);
console.log(code); // any[]
```

---

### ArrowFunctionExpression
```javascript
t.arrowFunctionExpression(params, body)
```

See also `t.isArrowFunctionExpression(node, opts)` and `t.assertArrowFunctionExpression(node, opts)`.

Aliases: `BlockParent`, `Expression`, `Function`, `FunctionParent`, `Pureish`, `Scopable`

 - `params`: `Array<Identifier | Pattern | RestElement | TSParameterProperty>` (required)
 - `body`: `BlockStatement | Expression` (required)
 - `async`: `boolean` (default: `false`)
 - `expression`: `boolean` (default: `false`)
 - `generator`: `boolean` (default: `false`)
 - `returnType`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)
 - `typeParameters`: `TypeParameterDeclaration | TSTypeParameterDeclaration | Noop` (default: `null`)

---

### AssignmentExpression
```javascript
t.assignmentExpression(operator, left, right)
```

See also `t.isAssignmentExpression(node, opts)` and `t.assertAssignmentExpression(node, opts)`.

Aliases: `Expression`

 - `operator`: `string` (required)
 - `left`: `LVal` (required)
 - `right`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const operator = "=";
const left = t.identifier("foo");
const right = t.identifier("bar");
const ast = t.assignmentExpression(operator, left, right);

const { code } = generate(ast);
console.log(code); // foo = bar
```

---

### AssignmentPattern
```javascript
t.assignmentPattern(left, right)
```

See also `t.isAssignmentPattern(node, opts)` and `t.assertAssignmentPattern(node, opts)`.

Aliases: `LVal`, `Pattern`, `PatternLike`

 - `left`: `Identifier | ObjectPattern | ArrayPattern` (required)
 - `right`: `Expression` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const left = t.identifier("foo");
const right = t.identifier("bar");
const ast = t.assignmentPattern(left, right);

const { code } = generate(ast);
console.log(code); // foo = bar
```

---

### AwaitExpression
```javascript
t.awaitExpression(argument)
```

See also `t.isAwaitExpression(node, opts)` and `t.assertAwaitExpression(node, opts)`.

Aliases: `Expression`, `Terminatorless`

 - `argument`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const argument = t.identifier("foo");
const ast = t.awaitExpression(argument);

const { code } = generate(ast);
console.log(code); // await foo
```

---

### BigIntLiteral
```javascript
t.bigIntLiteral(value)
```

See also `t.isBigIntLiteral(node, opts)` and `t.assertBigIntLiteral(node, opts)`.

Aliases: `Expression`, `Immutable`, `Literal`, `Pureish`

 - `value`: `string` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = "0";
const ast = t.bigIntLiteral(value);

const { code } = generate(ast);
console.log(code); // 0
```

---

### BinaryExpression
```javascript
t.binaryExpression(operator, left, right)
```

See also `t.isBinaryExpression(node, opts)` and `t.assertBinaryExpression(node, opts)`.

Aliases: `Binary`, `Expression`

 - `operator`: `"+" | "-" | "/" | "%" | "*" | "**" | "&" | "|" | ">>" | ">>>" | "<<" | "^" | "==" | "===" | "!=" | "!==" | "in" | "instanceof" | ">" | "<" | ">=" | "<="` (required)
 - `left`: `Expression` (required)
 - `right`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const operator = "+";
const left = t.identifier("foo");
const right = t.identifier("bar");
const ast = t.binaryExpression(operator, left, right);

const { code } = generate(ast);
console.log(code); // foo + bar
```

---

### BindExpression
```javascript
t.bindExpression(object, callee)
```

See also `t.isBindExpression(node, opts)` and `t.assertBindExpression(node, opts)`.

Aliases: `Expression`

 - `object`: `any` (required)
 - `callee`: `any` (required)

---

### BlockStatement
```javascript
t.blockStatement(body)
```

See also `t.isBlockStatement(node, opts)` and `t.assertBlockStatement(node, opts)`.

Aliases: `Block`, `BlockParent`, `Scopable`, `Statement`

 - `body`: `Array<Statement>` (required)
 - `directives`: `Array<Directive>` (default: `[]`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const body = [
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("foo"), t.identifier("bar")),
  ]),
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("baz"), t.identifier("qux")),
  ]),
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("quux"), t.identifier("corge")),
  ]),
];
const ast = t.blockStatement(body);

const { code } = generate(ast);
console.log(code);
// {
//   const foo = bar;
//   const baz = qux;
//   const quux = corge;
// }
```

---

### BooleanLiteral
```javascript
t.booleanLiteral(value)
```

See also `t.isBooleanLiteral(node, opts)` and `t.assertBooleanLiteral(node, opts)`.

Aliases: `Expression`, `Immutable`, `Literal`, `Pureish`

 - `value`: `boolean` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = true;
const ast = t.booleanLiteral(value);

const { code } = generate(ast);
console.log(code); // true
```

---

### BooleanLiteralTypeAnnotation
```javascript
t.booleanLiteralTypeAnnotation(value)
```

See also `t.isBooleanLiteralTypeAnnotation(node, opts)` and `t.assertBooleanLiteralTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `value`: `boolean` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = true;
const ast = t.booleanLiteralTypeAnnotation(value);

const { code } = generate(ast);
console.log(code); // true
```

---

### BooleanTypeAnnotation
```javascript
t.booleanTypeAnnotation()
```

See also `t.isBooleanTypeAnnotation(node, opts)` and `t.assertBooleanTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.booleanTypeAnnotation();

const { code } = generate(ast);
console.log(code); // boolean
```

---

### BreakStatement
```javascript
t.breakStatement()
```

See also `t.isBreakStatement(node, opts)` and `t.assertBreakStatement(node, opts)`.

Aliases: `CompletionStatement`, `Statement`, `Terminatorless`

 - `label`: `Identifier` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.breakStatement();

const { code } = generate(ast);
console.log(code); // break;
```

---

### CallExpression
```javascript
t.callExpression(callee, arguments)
```

See also `t.isCallExpression(node, opts)` and `t.assertCallExpression(node, opts)`.

Aliases: `Expression`

 - `callee`: `Expression` (required)
 - `arguments`: `Array<Expression | SpreadElement | JSXNamespacedName | ArgumentPlaceholder>` (required)
 - `optional`: `true | false` (default: `null`)
 - `typeArguments`: `TypeParameterInstantiation` (default: `null`)
 - `typeParameters`: `TSTypeParameterInstantiation` (default: `null`)

---

### CatchClause
```javascript
t.catchClause(param, body)
```

See also `t.isCatchClause(node, opts)` and `t.assertCatchClause(node, opts)`.

Aliases: `BlockParent`, `Scopable`

 - `param`: `Identifier` (required)
 - `body`: `BlockStatement` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const param = t.identifier("foo");
const body = t.blockStatement([t.returnStatement(t.thisExpression())]);
const ast = t.catchClause(param, body);

const { code } = generate(ast);
console.log(code);
// catch (foo) {
//   return this;
// }
```

---

### ClassBody
```javascript
t.classBody(body)
```

See also `t.isClassBody(node, opts)` and `t.assertClassBody(node, opts)`.

Aliases: none

 - `body`: `Array<ClassMethod | ClassPrivateMethod | ClassProperty | ClassPrivateProperty | TSDeclareMethod | TSIndexSignature>` (required)

---

### ClassDeclaration
```javascript
t.classDeclaration(id, superClass, body)
```

See also `t.isClassDeclaration(node, opts)` and `t.assertClassDeclaration(node, opts)`.

Aliases: `Class`, `Declaration`, `Pureish`, `Scopable`, `Statement`

 - `id`: `Identifier` (required)
 - `superClass`: `Expression` (required)
 - `body`: `ClassBody` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `abstract`: `boolean` (default: `false`)
 - `declare`: `boolean` (default: `false`)
 - `implements`: `Array<TSExpressionWithTypeArguments | ClassImplements>` (default: `[]`)
 - `mixins`: `any` (default: `null`)
 - `superTypeParameters`: `TypeParameterInstantiation | TSTypeParameterInstantiation` (default: `null`)
 - `typeParameters`: `TypeParameterDeclaration | TSTypeParameterDeclaration | Noop` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const superClass = t.identifier("bar");
const body = t.classBody([
  t.classMethod(
    "method",
    t.identifier("baz"),
    [t.identifier("qux"), t.identifier("quux")],
    t.blockStatement([
      t.returnStatement(
        t.binaryExpression(">", t.identifier("qux"), t.identifier("quux"))
      ),
    ])
  ),
]);
const ast = t.classDeclaration(id, superClass, body);

const { code } = generate(ast);
console.log(code);
// class foo extends bar {
//   baz(qux, quux) {
//     return qux > quux;
//   }
//
// }
```

---

### ClassExpression
```javascript
t.classExpression(id, superClass, body)
```

See also `t.isClassExpression(node, opts)` and `t.assertClassExpression(node, opts)`.

Aliases: `Class`, `Expression`, `Pureish`, `Scopable`

 - `id`: `Identifier` (required)
 - `superClass`: `Expression` (required)
 - `body`: `ClassBody` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `implements`: `Array<TSExpressionWithTypeArguments | ClassImplements>` (default: `[]`)
 - `mixins`: `any` (default: `null`)
 - `superTypeParameters`: `TypeParameterInstantiation | TSTypeParameterInstantiation` (default: `null`)
 - `typeParameters`: `TypeParameterDeclaration | TSTypeParameterDeclaration | Noop` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const superClass = t.identifier("bar");
const body = t.classBody([
  t.classMethod(
    "method",
    t.identifier("baz"),
    [t.identifier("qux"), t.identifier("quux")],
    t.blockStatement([
      t.returnStatement(
        t.binaryExpression(">", t.identifier("qux"), t.identifier("quux"))
      ),
    ])
  ),
]);
const ast = t.classExpression(id, superClass, body);

const { code } = generate(ast);
console.log(code);
// class foo extends bar {
//   baz(qux, quux) {
//     return qux > quux;
//   }
//
// }
```

---

### ClassImplements
```javascript
t.classImplements(id)
```

See also `t.isClassImplements(node, opts)` and `t.assertClassImplements(node, opts)`.

Aliases: `Flow`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterInstantiation` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const ast = t.classImplements(id);

const { code } = generate(ast);
console.log(code); // foo
```

---

### ClassMethod
```javascript
t.classMethod(kind, key, params, body)
```

See also `t.isClassMethod(node, opts)` and `t.assertClassMethod(node, opts)`.

Aliases: `BlockParent`, `Function`, `FunctionParent`, `Method`, `Scopable`

 - `kind`: `"get" | "set" | "method" | "constructor"` (default: `method`)
 - `key`: if computed then `Expression` else `Identifier | Literal` (required)
 - `params`: `Array<Identifier | Pattern | RestElement | TSParameterProperty>` (required)
 - `body`: `BlockStatement` (required)
 - `computed`: `boolean` (default: `false`)
 - `static`: `boolean` (default: `false`)
 - `abstract`: `boolean` (default: `false`)
 - `access`: `"public" | "private" | "protected"` (default: `null`)
 - `accessibility`: `"public" | "private" | "protected"` (default: `null`)
 - `async`: `boolean` (default: `false`)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `generator`: `boolean` (default: `false`)
 - `optional`: `boolean` (default: `false`)
 - `returnType`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)
 - `typeParameters`: `TypeParameterDeclaration | TSTypeParameterDeclaration | Noop` (default: `null`)

---

### ClassPrivateMethod
```javascript
t.classPrivateMethod(kind, key, params, body)
```

See also `t.isClassPrivateMethod(node, opts)` and `t.assertClassPrivateMethod(node, opts)`.

Aliases: `BlockParent`, `Function`, `FunctionParent`, `Method`, `Private`, `Scopable`

 - `kind`: `"get" | "set" | "method" | "constructor"` (required)
 - `key`: `PrivateName` (required)
 - `params`: `Array<Identifier | Pattern | RestElement | TSParameterProperty>` (required)
 - `body`: `BlockStatement` (required)
 - `static`: `boolean` (default: `false`)
 - `abstract`: `boolean` (default: `false`)
 - `access`: `"public" | "private" | "protected"` (default: `null`)
 - `accessibility`: `"public" | "private" | "protected"` (default: `null`)
 - `async`: `boolean` (default: `false`)
 - `computed`: `boolean` (default: `false`)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `generator`: `boolean` (default: `false`)
 - `optional`: `boolean` (default: `false`)
 - `returnType`: `any` (default: `null`)
 - `typeParameters`: `any` (default: `null`)

---

### ClassPrivateProperty
```javascript
t.classPrivateProperty(key)
```

See also `t.isClassPrivateProperty(node, opts)` and `t.assertClassPrivateProperty(node, opts)`.

Aliases: `Private`, `Property`

 - `key`: `PrivateName` (required)
 - `value`: `Expression` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const key = t.privateName(t.identifier("foo"));
const ast = t.classPrivateProperty(key);

const { code } = generate(ast);
console.log(code); // #foo;
```

---

### ClassProperty
```javascript
t.classProperty(key)
```

See also `t.isClassProperty(node, opts)` and `t.assertClassProperty(node, opts)`.

Aliases: `Property`

 - `key`: `Identifier | StringLiteral | NumericLiteral | Expression` (required)
 - `value`: `Expression` (default: `null`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `computed`: `boolean` (default: `false`)
 - `abstract`: `boolean` (default: `false`)
 - `accessibility`: `"public" | "private" | "protected"` (default: `null`)
 - `definite`: `boolean` (default: `false`)
 - `optional`: `boolean` (default: `false`)
 - `readonly`: `boolean` (default: `false`)
 - `static`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const key = t.identifier("foo");
const ast = t.classProperty(key);

const { code } = generate(ast);
console.log(code); // foo;
```

---

### ConditionalExpression
```javascript
t.conditionalExpression(test, consequent, alternate)
```

See also `t.isConditionalExpression(node, opts)` and `t.assertConditionalExpression(node, opts)`.

Aliases: `Conditional`, `Expression`

 - `test`: `Expression` (required)
 - `consequent`: `Expression` (required)
 - `alternate`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const test = t.identifier("foo");
const consequent = t.identifier("bar");
const alternate = t.identifier("baz");
const ast = t.conditionalExpression(test, consequent, alternate);

const { code } = generate(ast);
console.log(code); // foo ? bar : baz
```

---

### ContinueStatement
```javascript
t.continueStatement()
```

See also `t.isContinueStatement(node, opts)` and `t.assertContinueStatement(node, opts)`.

Aliases: `CompletionStatement`, `Statement`, `Terminatorless`

 - `label`: `Identifier` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.continueStatement();

const { code } = generate(ast);
console.log(code); // continue;
```

---

### DebuggerStatement
```javascript
t.debuggerStatement()
```

See also `t.isDebuggerStatement(node, opts)` and `t.assertDebuggerStatement(node, opts)`.

Aliases: `Statement`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.debuggerStatement();

const { code } = generate(ast);
console.log(code); // debugger;
```

---

### DeclareClass
```javascript
t.declareClass(id, typeParameters, extends, body)
```

See also `t.isDeclareClass(node, opts)` and `t.assertDeclareClass(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterDeclaration` (required)
 - `extends`: `Array<InterfaceExtends>` (required)
 - `body`: `ObjectTypeAnnotation` (required)
 - `implements`: `Array<ClassImplements>` (default: `[]`)
 - `mixins`: `Array<InterfaceExtends>` (default: `[]`)

---

### DeclaredPredicate
```javascript
t.declaredPredicate(value)
```

See also `t.isDeclaredPredicate(node, opts)` and `t.assertDeclaredPredicate(node, opts)`.

Aliases: `Flow`, `FlowPredicate`

 - `value`: `Flow` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = t.anyTypeAnnotation();
const ast = t.declaredPredicate(value);

const { code } = generate(ast);
console.log(code); // %checks(any)
```

---

### DeclareExportAllDeclaration
```javascript
t.declareExportAllDeclaration(source)
```

See also `t.isDeclareExportAllDeclaration(node, opts)` and `t.assertDeclareExportAllDeclaration(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `source`: `StringLiteral` (required)
 - `exportKind`: `"type" | "value"` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const source = t.stringLiteral("foo");
const ast = t.declareExportAllDeclaration(source);

const { code } = generate(ast);
console.log(code); // declare export * from "foo";
```

---

### DeclareExportDeclaration
```javascript
t.declareExportDeclaration()
```

See also `t.isDeclareExportDeclaration(node, opts)` and `t.assertDeclareExportDeclaration(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `declaration`: `Flow` (default: `null`)
 - `specifiers`: `Array<ExportSpecifier | ExportNamespaceSpecifier>` (default: `[]`)
 - `source`: `StringLiteral` (default: `null`)
 - `default`: `boolean` (default: `false`)

---

### DeclareFunction
```javascript
t.declareFunction(id)
```

See also `t.isDeclareFunction(node, opts)` and `t.assertDeclareFunction(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `predicate`: `DeclaredPredicate` (default: `null`)

---

### DeclareInterface
```javascript
t.declareInterface(id, typeParameters, extends, body)
```

See also `t.isDeclareInterface(node, opts)` and `t.assertDeclareInterface(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterDeclaration` (required)
 - `extends`: `Array<InterfaceExtends>` (required)
 - `body`: `ObjectTypeAnnotation` (required)
 - `implements`: `Array<ClassImplements>` (default: `[]`)
 - `mixins`: `Array<InterfaceExtends>` (default: `[]`)

---

### DeclareModule
```javascript
t.declareModule(id, body)
```

See also `t.isDeclareModule(node, opts)` and `t.assertDeclareModule(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier | StringLiteral` (required)
 - `body`: `BlockStatement` (required)
 - `kind`: `"CommonJS" | "ES"` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const body = t.blockStatement([t.returnStatement(t.thisExpression())]);
const ast = t.declareModule(id, body);

const { code } = generate(ast);
console.log(code);
// declare module foo {
//   return this;
// }
```

---

### DeclareModuleExports
```javascript
t.declareModuleExports(typeAnnotation)
```

See also `t.isDeclareModuleExports(node, opts)` and `t.assertDeclareModuleExports(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `typeAnnotation`: `TypeAnnotation` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const typeAnnotation = t.typeAnnotation(t.anyTypeAnnotation());
const ast = t.declareModuleExports(typeAnnotation);

const { code } = generate(ast);
console.log(code); // declare module.exports: any
```

---

### DeclareOpaqueType
```javascript
t.declareOpaqueType(id)
```

See also `t.isDeclareOpaqueType(node, opts)` and `t.assertDeclareOpaqueType(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterDeclaration` (default: `null`)
 - `supertype`: `FlowType` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const ast = t.declareOpaqueType(id);

const { code } = generate(ast);
console.log(code); // declare opaque type foo;
```

---

### DeclareTypeAlias
```javascript
t.declareTypeAlias(id, typeParameters, right)
```

See also `t.isDeclareTypeAlias(node, opts)` and `t.assertDeclareTypeAlias(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterDeclaration` (required)
 - `right`: `FlowType` (required)

---

### DeclareVariable
```javascript
t.declareVariable(id)
```

See also `t.isDeclareVariable(node, opts)` and `t.assertDeclareVariable(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const ast = t.declareVariable(id);

const { code } = generate(ast);
console.log(code); // declare var foo;
```

---

### Decorator
```javascript
t.decorator(expression)
```

See also `t.isDecorator(node, opts)` and `t.assertDecorator(node, opts)`.

Aliases: none

 - `expression`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const ast = t.decorator(expression);

const { code } = generate(ast);
console.log(code); // @foo
```

---

### Directive
```javascript
t.directive(value)
```

See also `t.isDirective(node, opts)` and `t.assertDirective(node, opts)`.

Aliases: none

 - `value`: `DirectiveLiteral` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = t.directiveLiteral("foo");
const ast = t.directive(value);

const { code } = generate(ast);
console.log(code); // "foo";
```

---

### DirectiveLiteral
```javascript
t.directiveLiteral(value)
```

See also `t.isDirectiveLiteral(node, opts)` and `t.assertDirectiveLiteral(node, opts)`.

Aliases: none

 - `value`: `string` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = "0";
const ast = t.directiveLiteral(value);

const { code } = generate(ast);
console.log(code); // "0"
```

---

### DoExpression
```javascript
t.doExpression(body)
```

See also `t.isDoExpression(node, opts)` and `t.assertDoExpression(node, opts)`.

Aliases: `Expression`

 - `body`: `BlockStatement` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const body = t.blockStatement([t.returnStatement(t.thisExpression())]);
const ast = t.doExpression(body);

const { code } = generate(ast);
console.log(code);
// do {
//   return this;
// }
```

---

### DoWhileStatement
```javascript
t.doWhileStatement(test, body)
```

See also `t.isDoWhileStatement(node, opts)` and `t.assertDoWhileStatement(node, opts)`.

Aliases: `BlockParent`, `Loop`, `Scopable`, `Statement`, `While`

 - `test`: `Expression` (required)
 - `body`: `Statement` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const test = t.identifier("foo");
const body = t.variableDeclaration("const", [
  t.variableDeclarator(t.identifier("bar"), t.identifier("baz")),
]);
const ast = t.doWhileStatement(test, body);

const { code } = generate(ast);
console.log(code); // do const bar = baz; while (foo);
```

---

### EmptyStatement
```javascript
t.emptyStatement()
```

See also `t.isEmptyStatement(node, opts)` and `t.assertEmptyStatement(node, opts)`.

Aliases: `Statement`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.emptyStatement();

const { code } = generate(ast);
console.log(code); // ;
```

---

### EmptyTypeAnnotation
```javascript
t.emptyTypeAnnotation()
```

See also `t.isEmptyTypeAnnotation(node, opts)` and `t.assertEmptyTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.emptyTypeAnnotation();

const { code } = generate(ast);
console.log(code); // empty
```

---

### ExistsTypeAnnotation
```javascript
t.existsTypeAnnotation()
```

See also `t.isExistsTypeAnnotation(node, opts)` and `t.assertExistsTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.existsTypeAnnotation();

const { code } = generate(ast);
console.log(code); // *
```

---

### ExportAllDeclaration
```javascript
t.exportAllDeclaration(source)
```

See also `t.isExportAllDeclaration(node, opts)` and `t.assertExportAllDeclaration(node, opts)`.

Aliases: `Declaration`, `ExportDeclaration`, `ModuleDeclaration`, `Statement`

 - `source`: `StringLiteral` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const source = t.stringLiteral("foo");
const ast = t.exportAllDeclaration(source);

const { code } = generate(ast);
console.log(code); // export * from "foo";
```

---

### ExportDefaultDeclaration
```javascript
t.exportDefaultDeclaration(declaration)
```

See also `t.isExportDefaultDeclaration(node, opts)` and `t.assertExportDefaultDeclaration(node, opts)`.

Aliases: `Declaration`, `ExportDeclaration`, `ModuleDeclaration`, `Statement`

 - `declaration`: `FunctionDeclaration | TSDeclareFunction | ClassDeclaration | Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const declaration = t.functionDeclaration(
  t.identifier("foo"),
  [
    t.identifier("bar"),
    t.assignmentPattern(t.identifier("baz"), t.stringLiteral("qux")),
    t.assignmentPattern(t.identifier("quux"), t.numericLiteral(1337)),
  ],
  t.blockStatement([t.returnStatement(t.thisExpression())])
);
const ast = t.exportDefaultDeclaration(declaration);

const { code } = generate(ast);
console.log(code);
// export default function foo(bar, baz = "qux", quux = 1337) {
//   return this;
// }
```

---

### ExportDefaultSpecifier
```javascript
t.exportDefaultSpecifier(exported)
```

See also `t.isExportDefaultSpecifier(node, opts)` and `t.assertExportDefaultSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `exported`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const exported = t.identifier("foo");
const ast = t.exportDefaultSpecifier(exported);

const { code } = generate(ast);
console.log(code); // foo
```

---

### ExportNamedDeclaration
```javascript
t.exportNamedDeclaration(declaration, specifiers)
```

See also `t.isExportNamedDeclaration(node, opts)` and `t.assertExportNamedDeclaration(node, opts)`.

Aliases: `Declaration`, `ExportDeclaration`, `ModuleDeclaration`, `Statement`

 - `declaration`: `Declaration` (required)
 - `specifiers`: `Array<ExportSpecifier | ExportDefaultSpecifier | ExportNamespaceSpecifier>` (required)
 - `source`: `StringLiteral` (default: `null`)
 - `exportKind`: `"type" | "value"` (default: `null`)

---

### ExportNamespaceSpecifier
```javascript
t.exportNamespaceSpecifier(exported)
```

See also `t.isExportNamespaceSpecifier(node, opts)` and `t.assertExportNamespaceSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `exported`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const exported = t.identifier("foo");
const ast = t.exportNamespaceSpecifier(exported);

const { code } = generate(ast);
console.log(code); // * as foo
```

---

### ExportSpecifier
```javascript
t.exportSpecifier(local, exported)
```

See also `t.isExportSpecifier(node, opts)` and `t.assertExportSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `local`: `Identifier` (required)
 - `exported`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const local = t.identifier("foo");
const exported = t.identifier("bar");
const ast = t.exportSpecifier(local, exported);

const { code } = generate(ast);
console.log(code); // foo as bar
```

---

### ExpressionStatement
```javascript
t.expressionStatement(expression)
```

See also `t.isExpressionStatement(node, opts)` and `t.assertExpressionStatement(node, opts)`.

Aliases: `ExpressionWrapper`, `Statement`

 - `expression`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const ast = t.expressionStatement(expression);

const { code } = generate(ast);
console.log(code); // foo;
```

---

### File
```javascript
t.file(program, comments, tokens)
```

See also `t.isFile(node, opts)` and `t.assertFile(node, opts)`.

Aliases: none

 - `program`: `Program` (required)
 - `comments`: `any` (required)
 - `tokens`: `any` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const program = t.program([
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("foo"), t.identifier("bar")),
  ]),
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("baz"), t.identifier("qux")),
  ]),
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("quux"), t.identifier("corge")),
  ]),
]);
const comments = "grault";
const tokens = "garply";
const ast = t.file(program, comments, tokens);

const { code } = generate(ast);
console.log(code);
// const foo = bar;
// const baz = qux;
// const quux = corge;
```

---

### ForInStatement
```javascript
t.forInStatement(left, right, body)
```

See also `t.isForInStatement(node, opts)` and `t.assertForInStatement(node, opts)`.

Aliases: `BlockParent`, `For`, `ForXStatement`, `Loop`, `Scopable`, `Statement`

 - `left`: `VariableDeclaration | LVal` (required)
 - `right`: `Expression` (required)
 - `body`: `Statement` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const left = t.variableDeclaration("const", [
  t.variableDeclarator(t.identifier("foo"), t.identifier("bar")),
]);
const right = t.identifier("baz");
const body = t.variableDeclaration("const", [
  t.variableDeclarator(t.identifier("qux"), t.identifier("quux")),
]);
const ast = t.forInStatement(left, right, body);

const { code } = generate(ast);
console.log(code); // for (const foo = bar in baz) const qux = quux;
```

---

### ForOfStatement
```javascript
t.forOfStatement(left, right, body)
```

See also `t.isForOfStatement(node, opts)` and `t.assertForOfStatement(node, opts)`.

Aliases: `BlockParent`, `For`, `ForXStatement`, `Loop`, `Scopable`, `Statement`

 - `left`: `VariableDeclaration | LVal` (required)
 - `right`: `Expression` (required)
 - `body`: `Statement` (required)
 - `await`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const left = t.variableDeclaration("const", [
  t.variableDeclarator(t.identifier("foo"), t.identifier("bar")),
]);
const right = t.identifier("baz");
const body = t.variableDeclaration("const", [
  t.variableDeclarator(t.identifier("qux"), t.identifier("quux")),
]);
const ast = t.forOfStatement(left, right, body);

const { code } = generate(ast);
console.log(code); // for (const foo = bar of baz) const qux = quux;
```

---

### ForStatement
```javascript
t.forStatement(init, test, update, body)
```

See also `t.isForStatement(node, opts)` and `t.assertForStatement(node, opts)`.

Aliases: `BlockParent`, `For`, `Loop`, `Scopable`, `Statement`

 - `init`: `VariableDeclaration | Expression` (required)
 - `test`: `Expression` (required)
 - `update`: `Expression` (required)
 - `body`: `Statement` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const init = t.variableDeclaration("const", [
  t.variableDeclarator(t.identifier("foo"), t.identifier("bar")),
]);
const test = t.identifier("baz");
const update = t.identifier("qux");
const body = t.variableDeclaration("const", [
  t.variableDeclarator(t.identifier("quux"), t.identifier("corge")),
]);
const ast = t.forStatement(init, test, update, body);

const { code } = generate(ast);
console.log(code); // for (const foo = bar; baz; qux) const quux = corge;
```

---

### FunctionDeclaration
```javascript
t.functionDeclaration(id, params, body)
```

See also `t.isFunctionDeclaration(node, opts)` and `t.assertFunctionDeclaration(node, opts)`.

Aliases: `BlockParent`, `Declaration`, `Function`, `FunctionParent`, `Pureish`, `Scopable`, `Statement`

 - `id`: `Identifier` (required)
 - `params`: `Array<Identifier | Pattern | RestElement | TSParameterProperty>` (required)
 - `body`: `BlockStatement` (required)
 - `generator`: `boolean` (default: `false`)
 - `async`: `boolean` (default: `false`)
 - `declare`: `boolean` (default: `false`)
 - `returnType`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)
 - `typeParameters`: `TypeParameterDeclaration | TSTypeParameterDeclaration | Noop` (default: `null`)

---

### FunctionExpression
```javascript
t.functionExpression(id, params, body)
```

See also `t.isFunctionExpression(node, opts)` and `t.assertFunctionExpression(node, opts)`.

Aliases: `BlockParent`, `Expression`, `Function`, `FunctionParent`, `Pureish`, `Scopable`

 - `id`: `Identifier` (required)
 - `params`: `Array<Identifier | Pattern | RestElement | TSParameterProperty>` (required)
 - `body`: `BlockStatement` (required)
 - `generator`: `boolean` (default: `false`)
 - `async`: `boolean` (default: `false`)
 - `returnType`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)
 - `typeParameters`: `TypeParameterDeclaration | TSTypeParameterDeclaration | Noop` (default: `null`)

---

### FunctionTypeAnnotation
```javascript
t.functionTypeAnnotation(typeParameters, params, rest, returnType)
```

See also `t.isFunctionTypeAnnotation(node, opts)` and `t.assertFunctionTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `typeParameters`: `TypeParameterDeclaration` (required)
 - `params`: `Array<FunctionTypeParam>` (required)
 - `rest`: `FunctionTypeParam` (required)
 - `returnType`: `FlowType` (required)

---

### FunctionTypeParam
```javascript
t.functionTypeParam(name, typeAnnotation)
```

See also `t.isFunctionTypeParam(node, opts)` and `t.assertFunctionTypeParam(node, opts)`.

Aliases: `Flow`

 - `name`: `Identifier` (required)
 - `typeAnnotation`: `FlowType` (required)
 - `optional`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const name = t.identifier("foo");
const typeAnnotation = t.anyTypeAnnotation();
const ast = t.functionTypeParam(name, typeAnnotation);

const { code } = generate(ast);
console.log(code); // foo: any
```

---

### GenericTypeAnnotation
```javascript
t.genericTypeAnnotation(id)
```

See also `t.isGenericTypeAnnotation(node, opts)` and `t.assertGenericTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `id`: `Identifier | QualifiedTypeIdentifier` (required)
 - `typeParameters`: `TypeParameterInstantiation` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const ast = t.genericTypeAnnotation(id);

const { code } = generate(ast);
console.log(code); // foo
```

---

### Identifier
```javascript
t.identifier(name)
```

See also `t.isIdentifier(node, opts)` and `t.assertIdentifier(node, opts)`.

Aliases: `Expression`, `LVal`, `PatternLike`, `TSEntityName`

 - `name`: `string` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `optional`: `boolean` (default: `false`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const name = "foo";
const ast = t.identifier(name);

const { code } = generate(ast);
console.log(code); // foo
```

---

### IfStatement
```javascript
t.ifStatement(test, consequent)
```

See also `t.isIfStatement(node, opts)` and `t.assertIfStatement(node, opts)`.

Aliases: `Conditional`, `Statement`

 - `test`: `Expression` (required)
 - `consequent`: `Statement` (required)
 - `alternate`: `Statement` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const test = t.identifier("foo");
const consequent = t.variableDeclaration("const", [
  t.variableDeclarator(t.identifier("bar"), t.identifier("baz")),
]);
const ast = t.ifStatement(test, consequent);

const { code } = generate(ast);
console.log(code); // if (foo) const bar = baz;
```

---

### Import
```javascript
t.import()
```

See also `t.isImport(node, opts)` and `t.assertImport(node, opts)`.

Aliases: `Expression`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.import();

const { code } = generate(ast);
console.log(code); // import
```

---

### ImportDeclaration
```javascript
t.importDeclaration(specifiers, source)
```

See also `t.isImportDeclaration(node, opts)` and `t.assertImportDeclaration(node, opts)`.

Aliases: `Declaration`, `ModuleDeclaration`, `Statement`

 - `specifiers`: `Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>` (required)
 - `source`: `StringLiteral` (required)
 - `importKind`: `"type" | "typeof" | "value"` (default: `null`)

---

### ImportDefaultSpecifier
```javascript
t.importDefaultSpecifier(local)
```

See also `t.isImportDefaultSpecifier(node, opts)` and `t.assertImportDefaultSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `local`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const local = t.identifier("foo");
const ast = t.importDefaultSpecifier(local);

const { code } = generate(ast);
console.log(code); // foo
```

---

### ImportNamespaceSpecifier
```javascript
t.importNamespaceSpecifier(local)
```

See also `t.isImportNamespaceSpecifier(node, opts)` and `t.assertImportNamespaceSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `local`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const local = t.identifier("foo");
const ast = t.importNamespaceSpecifier(local);

const { code } = generate(ast);
console.log(code); // * as foo
```

---

### ImportSpecifier
```javascript
t.importSpecifier(local, imported)
```

See also `t.isImportSpecifier(node, opts)` and `t.assertImportSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `local`: `Identifier` (required)
 - `imported`: `Identifier` (required)
 - `importKind`: `"type" | "typeof"` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const local = t.identifier("foo");
const imported = t.identifier("bar");
const ast = t.importSpecifier(local, imported);

const { code } = generate(ast);
console.log(code); // bar as foo
```

---

### InferredPredicate
```javascript
t.inferredPredicate()
```

See also `t.isInferredPredicate(node, opts)` and `t.assertInferredPredicate(node, opts)`.

Aliases: `Flow`, `FlowPredicate`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.inferredPredicate();

const { code } = generate(ast);
console.log(code); // %checks
```

---

### InterfaceDeclaration
```javascript
t.interfaceDeclaration(id, typeParameters, extends, body)
```

See also `t.isInterfaceDeclaration(node, opts)` and `t.assertInterfaceDeclaration(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterDeclaration` (required)
 - `extends`: `Array<InterfaceExtends>` (required)
 - `body`: `ObjectTypeAnnotation` (required)
 - `implements`: `Array<ClassImplements>` (default: `[]`)
 - `mixins`: `Array<InterfaceExtends>` (default: `[]`)

---

### InterfaceExtends
```javascript
t.interfaceExtends(id)
```

See also `t.isInterfaceExtends(node, opts)` and `t.assertInterfaceExtends(node, opts)`.

Aliases: `Flow`

 - `id`: `Identifier | QualifiedTypeIdentifier` (required)
 - `typeParameters`: `TypeParameterInstantiation` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const ast = t.interfaceExtends(id);

const { code } = generate(ast);
console.log(code); // foo
```

---

### InterfaceTypeAnnotation
```javascript
t.interfaceTypeAnnotation(extends, body)
```

See also `t.isInterfaceTypeAnnotation(node, opts)` and `t.assertInterfaceTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `extends`: `Array<InterfaceExtends>` (required)
 - `body`: `ObjectTypeAnnotation` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const _extends = [
  t.interfaceExtends(t.identifier("foo")),
  t.interfaceExtends(t.identifier("bar")),
  t.interfaceExtends(t.identifier("baz")),
];
const body = t.objectTypeAnnotation([
  t.objectTypeProperty(t.identifier("qux"), t.anyTypeAnnotation()),
]);
const ast = t.interfaceTypeAnnotation(_extends, body);

const { code } = generate(ast);
console.log(code);
// interface extends foo, bar, baz {
//   qux: any
// }
```

---

### InterpreterDirective
```javascript
t.interpreterDirective(value)
```

See also `t.isInterpreterDirective(node, opts)` and `t.assertInterpreterDirective(node, opts)`.

Aliases: none

 - `value`: `string` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = "0";
const ast = t.interpreterDirective(value);

const { code } = generate(ast);
console.log(code); // #!0
```

---

### IntersectionTypeAnnotation
```javascript
t.intersectionTypeAnnotation(types)
```

See also `t.isIntersectionTypeAnnotation(node, opts)` and `t.assertIntersectionTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `types`: `Array<FlowType>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const types = [
  t.anyTypeAnnotation(),
  t.stringTypeAnnotation(),
  t.numberTypeAnnotation(),
];
const ast = t.intersectionTypeAnnotation(types);

const { code } = generate(ast);
console.log(code); // any & string & number
```

---

### JSXAttribute
```javascript
t.jsxAttribute(name)
```

See also `t.isJSXAttribute(node, opts)` and `t.assertJSXAttribute(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `name`: `JSXIdentifier | JSXNamespacedName` (required)
 - `value`: `JSXElement | JSXFragment | StringLiteral | JSXExpressionContainer` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const name = t.jsxIdentifier("foo");
const ast = t.jsxAttribute(name);

const { code } = generate(ast);
console.log(code); // foo
```

---

### JSXClosingElement
```javascript
t.jsxClosingElement(name)
```

See also `t.isJSXClosingElement(node, opts)` and `t.assertJSXClosingElement(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `name`: `JSXIdentifier | JSXMemberExpression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const name = t.jsxIdentifier("foo");
const ast = t.jsxClosingElement(name);

const { code } = generate(ast);
console.log(code); // </foo>
```

---

### JSXClosingFragment
```javascript
t.jsxClosingFragment()
```

See also `t.isJSXClosingFragment(node, opts)` and `t.assertJSXClosingFragment(node, opts)`.

Aliases: `Immutable`, `JSX`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.jsxClosingFragment();

const { code } = generate(ast);
console.log(code); // </>
```

---

### JSXElement
```javascript
t.jsxElement(openingElement, closingElement, children, selfClosing)
```

See also `t.isJSXElement(node, opts)` and `t.assertJSXElement(node, opts)`.

Aliases: `Expression`, `Immutable`, `JSX`

 - `openingElement`: `JSXOpeningElement` (required)
 - `closingElement`: `JSXClosingElement` (required)
 - `children`: `Array<JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment>` (required)
 - `selfClosing`: `any` (required)

---

### JSXEmptyExpression
```javascript
t.jsxEmptyExpression()
```

See also `t.isJSXEmptyExpression(node, opts)` and `t.assertJSXEmptyExpression(node, opts)`.

Aliases: `JSX`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.jsxEmptyExpression();

const { code } = generate(ast);
console.log(code); //
```

---

### JSXExpressionContainer
```javascript
t.jsxExpressionContainer(expression)
```

See also `t.isJSXExpressionContainer(node, opts)` and `t.assertJSXExpressionContainer(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `expression`: `Expression | JSXEmptyExpression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const ast = t.jsxExpressionContainer(expression);

const { code } = generate(ast);
console.log(code); // {foo}
```

---

### JSXFragment
```javascript
t.jsxFragment(openingFragment, closingFragment, children)
```

See also `t.isJSXFragment(node, opts)` and `t.assertJSXFragment(node, opts)`.

Aliases: `Expression`, `Immutable`, `JSX`

 - `openingFragment`: `JSXOpeningFragment` (required)
 - `closingFragment`: `JSXClosingFragment` (required)
 - `children`: `Array<JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment>` (required)

---

### JSXIdentifier
```javascript
t.jsxIdentifier(name)
```

See also `t.isJSXIdentifier(node, opts)` and `t.assertJSXIdentifier(node, opts)`.

Aliases: `JSX`

 - `name`: `string` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const name = "foo";
const ast = t.jsxIdentifier(name);

const { code } = generate(ast);
console.log(code); // foo
```

---

### JSXMemberExpression
```javascript
t.jsxMemberExpression(object, property)
```

See also `t.isJSXMemberExpression(node, opts)` and `t.assertJSXMemberExpression(node, opts)`.

Aliases: `JSX`

 - `object`: `JSXMemberExpression | JSXIdentifier` (required)
 - `property`: `JSXIdentifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const object = t.jsxMemberExpression(
  t.jsxIdentifier("foo"),
  t.jsxIdentifier("bar")
);
const property = t.jsxIdentifier("baz");
const ast = t.jsxMemberExpression(object, property);

const { code } = generate(ast);
console.log(code); // foo.bar.baz
```

---

### JSXNamespacedName
```javascript
t.jsxNamespacedName(namespace, name)
```

See also `t.isJSXNamespacedName(node, opts)` and `t.assertJSXNamespacedName(node, opts)`.

Aliases: `JSX`

 - `namespace`: `JSXIdentifier` (required)
 - `name`: `JSXIdentifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const namespace = t.jsxIdentifier("foo");
const name = t.jsxIdentifier("bar");
const ast = t.jsxNamespacedName(namespace, name);

const { code } = generate(ast);
console.log(code); // foo:bar
```

---

### JSXOpeningElement
```javascript
t.jsxOpeningElement(name, attributes)
```

See also `t.isJSXOpeningElement(node, opts)` and `t.assertJSXOpeningElement(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `name`: `JSXIdentifier | JSXMemberExpression` (required)
 - `attributes`: `Array<JSXAttribute | JSXSpreadAttribute>` (required)
 - `selfClosing`: `boolean` (default: `false`)
 - `typeParameters`: `TypeParameterInstantiation | TSTypeParameterInstantiation` (default: `null`)

---

### JSXOpeningFragment
```javascript
t.jsxOpeningFragment()
```

See also `t.isJSXOpeningFragment(node, opts)` and `t.assertJSXOpeningFragment(node, opts)`.

Aliases: `Immutable`, `JSX`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.jsxOpeningFragment();

const { code } = generate(ast);
console.log(code); // <>
```

---

### JSXSpreadAttribute
```javascript
t.jsxSpreadAttribute(argument)
```

See also `t.isJSXSpreadAttribute(node, opts)` and `t.assertJSXSpreadAttribute(node, opts)`.

Aliases: `JSX`

 - `argument`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const argument = t.identifier("foo");
const ast = t.jsxSpreadAttribute(argument);

const { code } = generate(ast);
console.log(code); // {...foo}
```

---

### JSXSpreadChild
```javascript
t.jsxSpreadChild(expression)
```

See also `t.isJSXSpreadChild(node, opts)` and `t.assertJSXSpreadChild(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `expression`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const ast = t.jsxSpreadChild(expression);

const { code } = generate(ast);
console.log(code); // {...foo}
```

---

### JSXText
```javascript
t.jsxText(value)
```

See also `t.isJSXText(node, opts)` and `t.assertJSXText(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `value`: `string` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = "0";
const ast = t.jsxText(value);

const { code } = generate(ast);
console.log(code); // 0
```

---

### LabeledStatement
```javascript
t.labeledStatement(label, body)
```

See also `t.isLabeledStatement(node, opts)` and `t.assertLabeledStatement(node, opts)`.

Aliases: `Statement`

 - `label`: `Identifier` (required)
 - `body`: `Statement` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const label = t.identifier("foo");
const body = t.variableDeclaration("const", [
  t.variableDeclarator(t.identifier("bar"), t.identifier("baz")),
]);
const ast = t.labeledStatement(label, body);

const { code } = generate(ast);
console.log(code); // foo: const bar = baz;
```

---

### LogicalExpression
```javascript
t.logicalExpression(operator, left, right)
```

See also `t.isLogicalExpression(node, opts)` and `t.assertLogicalExpression(node, opts)`.

Aliases: `Binary`, `Expression`

 - `operator`: `"||" | "&&" | "??"` (required)
 - `left`: `Expression` (required)
 - `right`: `Expression` (required)

---

### MemberExpression
```javascript
t.memberExpression(object, property)
```

See also `t.isMemberExpression(node, opts)` and `t.assertMemberExpression(node, opts)`.

Aliases: `Expression`, `LVal`

 - `object`: `Expression` (required)
 - `property`: if computed then `Expression` else `Identifier` (required)
 - `computed`: `boolean` (default: `false`)
 - `optional`: `true | false` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const object = t.thisExpression();
const property = t.identifier("foo");
const ast = t.memberExpression(object, property);

const { code } = generate(ast);
console.log(code); // this.foo
```

---

### MetaProperty
```javascript
t.metaProperty(meta, property)
```

See also `t.isMetaProperty(node, opts)` and `t.assertMetaProperty(node, opts)`.

Aliases: `Expression`

 - `meta`: `Identifier` (required)
 - `property`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const meta = t.identifier("foo");
const property = t.identifier("bar");
const ast = t.metaProperty(meta, property);

const { code } = generate(ast);
console.log(code); // foo.bar
```

---

### MixedTypeAnnotation
```javascript
t.mixedTypeAnnotation()
```

See also `t.isMixedTypeAnnotation(node, opts)` and `t.assertMixedTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.mixedTypeAnnotation();

const { code } = generate(ast);
console.log(code); // mixed
```

---

### NewExpression
```javascript
t.newExpression(callee, arguments)
```

See also `t.isNewExpression(node, opts)` and `t.assertNewExpression(node, opts)`.

Aliases: `Expression`

 - `callee`: `Expression` (required)
 - `arguments`: `Array<Expression | SpreadElement | JSXNamespacedName | ArgumentPlaceholder>` (required)
 - `optional`: `true | false` (default: `null`)
 - `typeArguments`: `TypeParameterInstantiation` (default: `null`)
 - `typeParameters`: `TSTypeParameterInstantiation` (default: `null`)

---

### Noop
```javascript
t.noop()
```

See also `t.isNoop(node, opts)` and `t.assertNoop(node, opts)`.

Aliases: none

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.noop();

const { code } = generate(ast);
console.log(code); //
```

---

### NullableTypeAnnotation
```javascript
t.nullableTypeAnnotation(typeAnnotation)
```

See also `t.isNullableTypeAnnotation(node, opts)` and `t.assertNullableTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `typeAnnotation`: `FlowType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const typeAnnotation = t.anyTypeAnnotation();
const ast = t.nullableTypeAnnotation(typeAnnotation);

const { code } = generate(ast);
console.log(code); // ?any
```

---

### NullLiteral
```javascript
t.nullLiteral()
```

See also `t.isNullLiteral(node, opts)` and `t.assertNullLiteral(node, opts)`.

Aliases: `Expression`, `Immutable`, `Literal`, `Pureish`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.nullLiteral();

const { code } = generate(ast);
console.log(code); // null
```

---

### NullLiteralTypeAnnotation
```javascript
t.nullLiteralTypeAnnotation()
```

See also `t.isNullLiteralTypeAnnotation(node, opts)` and `t.assertNullLiteralTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.nullLiteralTypeAnnotation();

const { code } = generate(ast);
console.log(code); // null
```

---

### NumberLiteralTypeAnnotation
```javascript
t.numberLiteralTypeAnnotation(value)
```

See also `t.isNumberLiteralTypeAnnotation(node, opts)` and `t.assertNumberLiteralTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `value`: `number` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = 0;
const ast = t.numberLiteralTypeAnnotation(value);

const { code } = generate(ast);
console.log(code); // 0
```

---

### NumberTypeAnnotation
```javascript
t.numberTypeAnnotation()
```

See also `t.isNumberTypeAnnotation(node, opts)` and `t.assertNumberTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.numberTypeAnnotation();

const { code } = generate(ast);
console.log(code); // number
```

---

### NumericLiteral
```javascript
t.numericLiteral(value)
```

See also `t.isNumericLiteral(node, opts)` and `t.assertNumericLiteral(node, opts)`.

Aliases: `Expression`, `Immutable`, `Literal`, `Pureish`

 - `value`: `number` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = 0;
const ast = t.numericLiteral(value);

const { code } = generate(ast);
console.log(code); // 0
```

---

### ObjectExpression
```javascript
t.objectExpression(properties)
```

See also `t.isObjectExpression(node, opts)` and `t.assertObjectExpression(node, opts)`.

Aliases: `Expression`

 - `properties`: `Array<ObjectMethod | ObjectProperty | SpreadElement>` (required)

---

### ObjectMethod
```javascript
t.objectMethod(kind, key, params, body)
```

See also `t.isObjectMethod(node, opts)` and `t.assertObjectMethod(node, opts)`.

Aliases: `BlockParent`, `Function`, `FunctionParent`, `Method`, `ObjectMember`, `Scopable`, `UserWhitespacable`

 - `kind`: `"method" | "get" | "set"` (required)
 - `key`: if computed then `Expression` else `Identifier | Literal` (required)
 - `params`: `Array<Identifier | Pattern | RestElement | TSParameterProperty>` (required)
 - `body`: `BlockStatement` (required)
 - `computed`: `boolean` (default: `false`)
 - `async`: `boolean` (default: `false`)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `generator`: `boolean` (default: `false`)
 - `returnType`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)
 - `typeParameters`: `TypeParameterDeclaration | TSTypeParameterDeclaration | Noop` (default: `null`)

---

### ObjectPattern
```javascript
t.objectPattern(properties)
```

See also `t.isObjectPattern(node, opts)` and `t.assertObjectPattern(node, opts)`.

Aliases: `LVal`, `Pattern`, `PatternLike`

 - `properties`: `Array<RestElement | ObjectProperty>` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)

---

### ObjectProperty
```javascript
t.objectProperty(key, value)
```

See also `t.isObjectProperty(node, opts)` and `t.assertObjectProperty(node, opts)`.

Aliases: `ObjectMember`, `Property`, `UserWhitespacable`

 - `key`: if computed then `Expression` else `Identifier | Literal` (required)
 - `value`: `Expression | PatternLike` (required)
 - `computed`: `boolean` (default: `false`)
 - `shorthand`: `boolean` (default: `false`)
 - `decorators`: `Array<Decorator>` (default: `[]`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const key = t.identifier("foo");
const value = t.identifier("bar");
const ast = t.objectProperty(key, value);

const { code } = generate(ast);
console.log(code); // foo: bar
```

---

### ObjectTypeAnnotation
```javascript
t.objectTypeAnnotation(properties)
```

See also `t.isObjectTypeAnnotation(node, opts)` and `t.assertObjectTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `properties`: `Array<ObjectTypeProperty | ObjectTypeSpreadProperty>` (required)
 - `indexers`: `Array<ObjectTypeIndexer>` (default: `[]`)
 - `callProperties`: `Array<ObjectTypeCallProperty>` (default: `[]`)
 - `internalSlots`: `Array<ObjectTypeInternalSlot>` (default: `[]`)
 - `exact`: `boolean` (default: `false`)
 - `inexact`: `boolean` (default: `false`)

---

### ObjectTypeCallProperty
```javascript
t.objectTypeCallProperty(value)
```

See also `t.isObjectTypeCallProperty(node, opts)` and `t.assertObjectTypeCallProperty(node, opts)`.

Aliases: `Flow`, `UserWhitespacable`

 - `value`: `FlowType` (required)
 - `static`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = t.anyTypeAnnotation();
const ast = t.objectTypeCallProperty(value);

const { code } = generate(ast);
console.log(code); // any
```

---

### ObjectTypeIndexer
```javascript
t.objectTypeIndexer(id, key, value)
```

See also `t.isObjectTypeIndexer(node, opts)` and `t.assertObjectTypeIndexer(node, opts)`.

Aliases: `Flow`, `UserWhitespacable`

 - `id`: `Identifier` (required)
 - `key`: `FlowType` (required)
 - `value`: `FlowType` (required)
 - `variance`: `Variance` (default: `null`)
 - `static`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const key = t.anyTypeAnnotation();
const value = t.anyTypeAnnotation();
const ast = t.objectTypeIndexer(id, key, value);

const { code } = generate(ast);
console.log(code); // [foo: any]: any
```

---

### ObjectTypeInternalSlot
```javascript
t.objectTypeInternalSlot(id, value, optional, static, method)
```

See also `t.isObjectTypeInternalSlot(node, opts)` and `t.assertObjectTypeInternalSlot(node, opts)`.

Aliases: `Flow`, `UserWhitespacable`

 - `id`: `Identifier` (required)
 - `value`: `FlowType` (required)
 - `optional`: `boolean` (required)
 - `static`: `boolean` (required)
 - `method`: `boolean` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const value = t.anyTypeAnnotation();
const optional = true;
const static = true;
const method = true;
const ast = t.objectTypeInternalSlot(id, value, optional, static, method);

const { code } = generate(ast);
console.log(code); // static [[foo]]?any
```

---

### ObjectTypeProperty
```javascript
t.objectTypeProperty(key, value)
```

See also `t.isObjectTypeProperty(node, opts)` and `t.assertObjectTypeProperty(node, opts)`.

Aliases: `Flow`, `UserWhitespacable`

 - `key`: `Identifier | StringLiteral` (required)
 - `value`: `FlowType` (required)
 - `variance`: `Variance` (default: `null`)
 - `kind`: `"init" | "get" | "set"` (default: `null`)
 - `optional`: `boolean` (default: `false`)
 - `proto`: `boolean` (default: `false`)
 - `static`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const key = t.identifier("foo");
const value = t.anyTypeAnnotation();
const ast = t.objectTypeProperty(key, value);

const { code } = generate(ast);
console.log(code); // foo: any
```

---

### ObjectTypeSpreadProperty
```javascript
t.objectTypeSpreadProperty(argument)
```

See also `t.isObjectTypeSpreadProperty(node, opts)` and `t.assertObjectTypeSpreadProperty(node, opts)`.

Aliases: `Flow`, `UserWhitespacable`

 - `argument`: `FlowType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const argument = t.anyTypeAnnotation();
const ast = t.objectTypeSpreadProperty(argument);

const { code } = generate(ast);
console.log(code); // ...any
```

---

### OpaqueType
```javascript
t.opaqueType(id, typeParameters, supertype, impltype)
```

See also `t.isOpaqueType(node, opts)` and `t.assertOpaqueType(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterDeclaration` (required)
 - `supertype`: `FlowType` (required)
 - `impltype`: `FlowType` (required)

---

### OptionalCallExpression
```javascript
t.optionalCallExpression(callee, arguments, optional)
```

See also `t.isOptionalCallExpression(node, opts)` and `t.assertOptionalCallExpression(node, opts)`.

Aliases: `Expression`

 - `callee`: `Expression` (required)
 - `arguments`: `Array<Expression | SpreadElement | JSXNamespacedName>` (required)
 - `optional`: `boolean` (required)
 - `typeArguments`: `TypeParameterInstantiation` (default: `null`)
 - `typeParameters`: `TSTypeParameterInstantiation` (default: `null`)

---

### OptionalMemberExpression
```javascript
t.optionalMemberExpression(object, property, computed, optional)
```

See also `t.isOptionalMemberExpression(node, opts)` and `t.assertOptionalMemberExpression(node, opts)`.

Aliases: `Expression`

 - `object`: `Expression` (required)
 - `property`: `any` (required)
 - `computed`: `boolean` (required)
 - `optional`: `boolean` (required)

---

### ParenthesizedExpression
```javascript
t.parenthesizedExpression(expression)
```

See also `t.isParenthesizedExpression(node, opts)` and `t.assertParenthesizedExpression(node, opts)`.

Aliases: `Expression`, `ExpressionWrapper`

 - `expression`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const ast = t.parenthesizedExpression(expression);

const { code } = generate(ast);
console.log(code); // (foo)
```

---

### PipelineBareFunction
```javascript
t.pipelineBareFunction(callee)
```

See also `t.isPipelineBareFunction(node, opts)` and `t.assertPipelineBareFunction(node, opts)`.

Aliases: none

 - `callee`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const callee = t.identifier("foo");
const ast = t.pipelineBareFunction(callee);

const { code } = generate(ast);
console.log(code); // foo
```

---

### PipelinePrimaryTopicReference
```javascript
t.pipelinePrimaryTopicReference()
```

See also `t.isPipelinePrimaryTopicReference(node, opts)` and `t.assertPipelinePrimaryTopicReference(node, opts)`.

Aliases: `Expression`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.pipelinePrimaryTopicReference();

const { code } = generate(ast);
console.log(code); // #
```

---

### PipelineTopicExpression
```javascript
t.pipelineTopicExpression(expression)
```

See also `t.isPipelineTopicExpression(node, opts)` and `t.assertPipelineTopicExpression(node, opts)`.

Aliases: none

 - `expression`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const ast = t.pipelineTopicExpression(expression);

const { code } = generate(ast);
console.log(code); // foo
```

---

### Placeholder
```javascript
t.placeholder(expectedNode, name)
```

See also `t.isPlaceholder(node, opts)` and `t.assertPlaceholder(node, opts)`.

Aliases: none

 - `expectedNode`: `"Identifier" | "StringLiteral" | "Expression" | "Statement" | "Declaration" | "BlockStatement" | "ClassBody" | "Pattern"` (required)
 - `name`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expectedNode = "Identifier";
const name = t.identifier("foo");
const ast = t.placeholder(expectedNode, name);

const { code } = generate(ast);
console.log(code); // %%foo%%
```

---

### PrivateName
```javascript
t.privateName(id)
```

See also `t.isPrivateName(node, opts)` and `t.assertPrivateName(node, opts)`.

Aliases: `Private`

 - `id`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const ast = t.privateName(id);

const { code } = generate(ast);
console.log(code); // #foo
```

---

### Program
```javascript
t.program(body)
```

See also `t.isProgram(node, opts)` and `t.assertProgram(node, opts)`.

Aliases: `Block`, `BlockParent`, `Scopable`

 - `body`: `Array<Statement>` (required)
 - `directives`: `Array<Directive>` (default: `[]`)
 - `sourceType`: `"script" | "module"` (default: `'script'`)
 - `interpreter`: `InterpreterDirective` (default: `null`)
 - `sourceFile`: `string` (default: `""`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const body = [
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("foo"), t.identifier("bar")),
  ]),
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("baz"), t.identifier("qux")),
  ]),
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("quux"), t.identifier("corge")),
  ]),
];
const ast = t.program(body);

const { code } = generate(ast);
console.log(code);
// const foo = bar;
// const baz = qux;
// const quux = corge;
```

---

### QualifiedTypeIdentifier
```javascript
t.qualifiedTypeIdentifier(id, qualification)
```

See also `t.isQualifiedTypeIdentifier(node, opts)` and `t.assertQualifiedTypeIdentifier(node, opts)`.

Aliases: `Flow`

 - `id`: `Identifier` (required)
 - `qualification`: `Identifier | QualifiedTypeIdentifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const qualification = t.identifier("bar");
const ast = t.qualifiedTypeIdentifier(id, qualification);

const { code } = generate(ast);
console.log(code); // bar.foo
```

---

### RegExpLiteral
```javascript
t.regExpLiteral(pattern)
```

See also `t.isRegExpLiteral(node, opts)` and `t.assertRegExpLiteral(node, opts)`.

Aliases: `Expression`, `Literal`

 - `pattern`: `string` (required)
 - `flags`: `string` (default: `""`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const pattern = "w+";
const ast = t.regExpLiteral(pattern);

const { code } = generate(ast);
console.log(code); // /w+/
```

---

### RestElement
```javascript
t.restElement(argument)
```

See also `t.isRestElement(node, opts)` and `t.assertRestElement(node, opts)`.

Aliases: `LVal`, `PatternLike`

 - `argument`: `LVal` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const argument = t.identifier("foo");
const ast = t.restElement(argument);

const { code } = generate(ast);
console.log(code); // ...foo
```

---

### ReturnStatement
```javascript
t.returnStatement()
```

See also `t.isReturnStatement(node, opts)` and `t.assertReturnStatement(node, opts)`.

Aliases: `CompletionStatement`, `Statement`, `Terminatorless`

 - `argument`: `Expression` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.returnStatement();

const { code } = generate(ast);
console.log(code); // return;
```

---

### SequenceExpression
```javascript
t.sequenceExpression(expressions)
```

See also `t.isSequenceExpression(node, opts)` and `t.assertSequenceExpression(node, opts)`.

Aliases: `Expression`

 - `expressions`: `Array<Expression>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expressions = [
  t.identifier("foo"),
  t.identifier("bar"),
  t.identifier("baz"),
];
const ast = t.sequenceExpression(expressions);

const { code } = generate(ast);
console.log(code); // foo, bar, baz
```

---

### SpreadElement
```javascript
t.spreadElement(argument)
```

See also `t.isSpreadElement(node, opts)` and `t.assertSpreadElement(node, opts)`.

Aliases: `UnaryLike`

 - `argument`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const argument = t.identifier("foo");
const ast = t.spreadElement(argument);

const { code } = generate(ast);
console.log(code); // ...foo
```

---

### StringLiteral
```javascript
t.stringLiteral(value)
```

See also `t.isStringLiteral(node, opts)` and `t.assertStringLiteral(node, opts)`.

Aliases: `Expression`, `Immutable`, `Literal`, `Pureish`

 - `value`: `string` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = "0";
const ast = t.stringLiteral(value);

const { code } = generate(ast);
console.log(code); // "0"
```

---

### StringLiteralTypeAnnotation
```javascript
t.stringLiteralTypeAnnotation(value)
```

See also `t.isStringLiteralTypeAnnotation(node, opts)` and `t.assertStringLiteralTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `value`: `string` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const value = "0";
const ast = t.stringLiteralTypeAnnotation(value);

const { code } = generate(ast);
console.log(code); // "0"
```

---

### StringTypeAnnotation
```javascript
t.stringTypeAnnotation()
```

See also `t.isStringTypeAnnotation(node, opts)` and `t.assertStringTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.stringTypeAnnotation();

const { code } = generate(ast);
console.log(code); // string
```

---

### Super
```javascript
t.super()
```

See also `t.isSuper(node, opts)` and `t.assertSuper(node, opts)`.

Aliases: `Expression`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.super();

const { code } = generate(ast);
console.log(code); // super
```

---

### SwitchCase
```javascript
t.switchCase(test, consequent)
```

See also `t.isSwitchCase(node, opts)` and `t.assertSwitchCase(node, opts)`.

Aliases: none

 - `test`: `Expression` (required)
 - `consequent`: `Array<Statement>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const test = t.identifier("foo");
const consequent = [
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("bar"), t.identifier("baz")),
  ]),
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("qux"), t.identifier("quux")),
  ]),
  t.breakStatement(),
];
const ast = t.switchCase(test, consequent);

const { code } = generate(ast);
console.log(code);
// case foo:
//   const bar = baz;
//   const qux = quux;
//   break;
```

---

### SwitchStatement
```javascript
t.switchStatement(discriminant, cases)
```

See also `t.isSwitchStatement(node, opts)` and `t.assertSwitchStatement(node, opts)`.

Aliases: `BlockParent`, `Scopable`, `Statement`

 - `discriminant`: `Expression` (required)
 - `cases`: `Array<SwitchCase>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const discriminant = t.identifier("foo");
const cases = [
  t.switchCase(t.stringLiteral("bar"), [
    t.variableDeclaration("const", [
      t.variableDeclarator(t.identifier("baz"), t.identifier("qux")),
    ]),
    t.variableDeclaration("const", [
      t.variableDeclarator(t.identifier("quux"), t.identifier("corge")),
    ]),
    t.breakStatement(),
  ]),
  t.switchCase(t.stringLiteral("grault"), [
    t.variableDeclaration("const", [
      t.variableDeclarator(t.identifier("garply"), t.identifier("waldo")),
    ]),
    t.variableDeclaration("const", [
      t.variableDeclarator(t.identifier("fred"), t.identifier("plugh")),
    ]),
    t.breakStatement(),
  ]),
  t.switchCase(t.stringLiteral("xyzzy"), [
    t.variableDeclaration("const", [
      t.variableDeclarator(t.identifier("thud"), t.identifier("barFoo")),
    ]),
    t.variableDeclaration("const", [
      t.variableDeclarator(t.identifier("bazFoo"), t.identifier("quxFoo")),
    ]),
    t.breakStatement(),
  ]),
];
const ast = t.switchStatement(discriminant, cases);

const { code } = generate(ast);
console.log(code);
// switch (foo) {
//   case "bar":
//     const baz = qux;
//     const quux = corge;
//     break;
//
//   case "grault":
//     const garply = waldo;
//     const fred = plugh;
//     break;
//
//   case "xyzzy":
//     const thud = barFoo;
//     const bazFoo = quxFoo;
//     break;
// }
```

---

### TaggedTemplateExpression
```javascript
t.taggedTemplateExpression(tag, quasi)
```

See also `t.isTaggedTemplateExpression(node, opts)` and `t.assertTaggedTemplateExpression(node, opts)`.

Aliases: `Expression`

 - `tag`: `Expression` (required)
 - `quasi`: `TemplateLiteral` (required)
 - `typeParameters`: `TypeParameterInstantiation | TSTypeParameterInstantiation` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const tag = t.identifier("foo");
const quasi = t.templateLiteral(
  [t.templateElement({ raw: "bar" }, true)],
  [t.identifier("baz"), t.identifier("qux"), t.identifier("quux")]
);
const ast = t.taggedTemplateExpression(tag, quasi);

const { code } = generate(ast);
console.log(code); // foo`bar`
```

---

### TemplateElement
```javascript
t.templateElement(value)
```

See also `t.isTemplateElement(node, opts)` and `t.assertTemplateElement(node, opts)`.

Aliases: none

 - `value`: `any` (required)
 - `tail`: `boolean` (default: `false`)

---

### TemplateLiteral
```javascript
t.templateLiteral(quasis, expressions)
```

See also `t.isTemplateLiteral(node, opts)` and `t.assertTemplateLiteral(node, opts)`.

Aliases: `Expression`, `Literal`

 - `quasis`: `Array<TemplateElement>` (required)
 - `expressions`: `Array<Expression>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const quasis = [
  t.templateElement({ raw: "foo" }, true),
  t.templateElement({ raw: "bar" }, true),
  t.templateElement({ raw: "baz" }, true),
];
const expressions = [
  t.identifier("qux"),
  t.identifier("quux"),
  t.identifier("corge"),
];
const ast = t.templateLiteral(quasis, expressions);

const { code } = generate(ast);
console.log(code); // `foo${qux}bar${quux}baz`
```

---

### ThisExpression
```javascript
t.thisExpression()
```

See also `t.isThisExpression(node, opts)` and `t.assertThisExpression(node, opts)`.

Aliases: `Expression`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.thisExpression();

const { code } = generate(ast);
console.log(code); // this
```

---

### ThisTypeAnnotation
```javascript
t.thisTypeAnnotation()
```

See also `t.isThisTypeAnnotation(node, opts)` and `t.assertThisTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.thisTypeAnnotation();

const { code } = generate(ast);
console.log(code); // this
```

---

### ThrowStatement
```javascript
t.throwStatement(argument)
```

See also `t.isThrowStatement(node, opts)` and `t.assertThrowStatement(node, opts)`.

Aliases: `CompletionStatement`, `Statement`, `Terminatorless`

 - `argument`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const argument = t.identifier("foo");
const ast = t.throwStatement(argument);

const { code } = generate(ast);
console.log(code); // throw foo;
```

---

### TryStatement
```javascript
t.tryStatement(block)
```

See also `t.isTryStatement(node, opts)` and `t.assertTryStatement(node, opts)`.

Aliases: `Statement`

 - `block`: `BlockStatement` (required)
 - `handler`: `CatchClause` (default: `null`)
 - `finalizer`: `BlockStatement` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const block = t.blockStatement([t.returnStatement(t.thisExpression())]);
const ast = t.tryStatement(block);

const { code } = generate(ast);
console.log(code);
// try {
//   return this;
// }
```

---

### TSAnyKeyword
```javascript
t.tsAnyKeyword()
```

See also `t.isTSAnyKeyword(node, opts)` and `t.assertTSAnyKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsAnyKeyword();

const { code } = generate(ast);
console.log(code); // any
```

---

### TSArrayType
```javascript
t.tsArrayType(elementType)
```

See also `t.isTSArrayType(node, opts)` and `t.assertTSArrayType(node, opts)`.

Aliases: `TSType`

 - `elementType`: `TSType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const elementType = t.tsAnyKeyword();
const ast = t.tsArrayType(elementType);

const { code } = generate(ast);
console.log(code); // any[]
```

---

### TSAsExpression
```javascript
t.tsAsExpression(expression, typeAnnotation)
```

See also `t.isTSAsExpression(node, opts)` and `t.assertTSAsExpression(node, opts)`.

Aliases: `Expression`

 - `expression`: `Expression` (required)
 - `typeAnnotation`: `TSType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const typeAnnotation = t.tsAnyKeyword();
const ast = t.tsAsExpression(expression, typeAnnotation);

const { code } = generate(ast);
console.log(code); // foo as any
```

---

### TSBooleanKeyword
```javascript
t.tsBooleanKeyword()
```

See also `t.isTSBooleanKeyword(node, opts)` and `t.assertTSBooleanKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsBooleanKeyword();

const { code } = generate(ast);
console.log(code); // boolean
```

---

### TSCallSignatureDeclaration
```javascript
t.tsCallSignatureDeclaration(typeParameters, parameters)
```

See also `t.isTSCallSignatureDeclaration(node, opts)` and `t.assertTSCallSignatureDeclaration(node, opts)`.

Aliases: `TSTypeElement`

 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `parameters`: `Array<Identifier | RestElement>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)

---

### TSConditionalType
```javascript
t.tsConditionalType(checkType, extendsType, trueType, falseType)
```

See also `t.isTSConditionalType(node, opts)` and `t.assertTSConditionalType(node, opts)`.

Aliases: `TSType`

 - `checkType`: `TSType` (required)
 - `extendsType`: `TSType` (required)
 - `trueType`: `TSType` (required)
 - `falseType`: `TSType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const checkType = t.tsAnyKeyword();
const extendsType = t.tsAnyKeyword();
const trueType = t.tsAnyKeyword();
const falseType = t.tsAnyKeyword();
const ast = t.tsConditionalType(checkType, extendsType, trueType, falseType);

const { code } = generate(ast);
console.log(code); // any extends any ? any : any
```

---

### TSConstructorType
```javascript
t.tsConstructorType(typeParameters, parameters)
```

See also `t.isTSConstructorType(node, opts)` and `t.assertTSConstructorType(node, opts)`.

Aliases: `TSType`

 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `parameters`: `Array<Identifier | RestElement>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)

---

### TSConstructSignatureDeclaration
```javascript
t.tsConstructSignatureDeclaration(typeParameters, parameters)
```

See also `t.isTSConstructSignatureDeclaration(node, opts)` and `t.assertTSConstructSignatureDeclaration(node, opts)`.

Aliases: `TSTypeElement`

 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `parameters`: `Array<Identifier | RestElement>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)

---

### TSDeclareFunction
```javascript
t.tsDeclareFunction(id, typeParameters, params)
```

See also `t.isTSDeclareFunction(node, opts)` and `t.assertTSDeclareFunction(node, opts)`.

Aliases: `Declaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TSTypeParameterDeclaration | Noop` (required)
 - `params`: `Array<Identifier | Pattern | RestElement | TSParameterProperty>` (required)
 - `returnType`: `TSTypeAnnotation | Noop` (default: `null`)
 - `async`: `boolean` (default: `false`)
 - `declare`: `boolean` (default: `false`)
 - `generator`: `boolean` (default: `false`)

---

### TSDeclareMethod
```javascript
t.tsDeclareMethod(decorators, key, typeParameters, params)
```

See also `t.isTSDeclareMethod(node, opts)` and `t.assertTSDeclareMethod(node, opts)`.

Aliases: none

 - `decorators`: `Array<Decorator>` (required)
 - `key`: `Identifier | StringLiteral | NumericLiteral | Expression` (required)
 - `typeParameters`: `TSTypeParameterDeclaration | Noop` (required)
 - `params`: `Array<Identifier | Pattern | RestElement | TSParameterProperty>` (required)
 - `returnType`: `TSTypeAnnotation | Noop` (default: `null`)
 - `abstract`: `boolean` (default: `false`)
 - `access`: `"public" | "private" | "protected"` (default: `null`)
 - `accessibility`: `"public" | "private" | "protected"` (default: `null`)
 - `async`: `boolean` (default: `false`)
 - `computed`: `boolean` (default: `false`)
 - `generator`: `boolean` (default: `false`)
 - `kind`: `"get" | "set" | "method" | "constructor"` (default: `'method'`)
 - `optional`: `boolean` (default: `false`)
 - `static`: `boolean` (default: `false`)

---

### TSEnumDeclaration
```javascript
t.tsEnumDeclaration(id, members)
```

See also `t.isTSEnumDeclaration(node, opts)` and `t.assertTSEnumDeclaration(node, opts)`.

Aliases: `Declaration`, `Statement`

 - `id`: `Identifier` (required)
 - `members`: `Array<TSEnumMember>` (required)
 - `const`: `boolean` (default: `false`)
 - `declare`: `boolean` (default: `false`)
 - `initializer`: `Expression` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const members = [
  t.tsEnumMember(t.identifier("bar")),
  t.tsEnumMember(t.identifier("baz")),
  t.tsEnumMember(t.identifier("qux")),
];
const ast = t.tsEnumDeclaration(id, members);

const { code } = generate(ast);
console.log(code);
// enum foo {
//   bar,
//   baz,
//   qux,
// }
```

---

### TSEnumMember
```javascript
t.tsEnumMember(id)
```

See also `t.isTSEnumMember(node, opts)` and `t.assertTSEnumMember(node, opts)`.

Aliases: none

 - `id`: `Identifier | StringLiteral` (required)
 - `initializer`: `Expression` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const ast = t.tsEnumMember(id);

const { code } = generate(ast);
console.log(code); // foo,
```

---

### TSExportAssignment
```javascript
t.tsExportAssignment(expression)
```

See also `t.isTSExportAssignment(node, opts)` and `t.assertTSExportAssignment(node, opts)`.

Aliases: `Statement`

 - `expression`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const ast = t.tsExportAssignment(expression);

const { code } = generate(ast);
console.log(code); // export = foo;
```

---

### TSExpressionWithTypeArguments
```javascript
t.tsExpressionWithTypeArguments(expression)
```

See also `t.isTSExpressionWithTypeArguments(node, opts)` and `t.assertTSExpressionWithTypeArguments(node, opts)`.

Aliases: `TSType`

 - `expression`: `TSEntityName` (required)
 - `typeParameters`: `TSTypeParameterInstantiation` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const ast = t.tsExpressionWithTypeArguments(expression);

const { code } = generate(ast);
console.log(code); // foo
```

---

### TSExternalModuleReference
```javascript
t.tsExternalModuleReference(expression)
```

See also `t.isTSExternalModuleReference(node, opts)` and `t.assertTSExternalModuleReference(node, opts)`.

Aliases: none

 - `expression`: `StringLiteral` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.stringLiteral("foo");
const ast = t.tsExternalModuleReference(expression);

const { code } = generate(ast);
console.log(code); // require("foo")
```

---

### TSFunctionType
```javascript
t.tsFunctionType(typeParameters, parameters)
```

See also `t.isTSFunctionType(node, opts)` and `t.assertTSFunctionType(node, opts)`.

Aliases: `TSType`

 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `parameters`: `Array<Identifier | RestElement>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)

---

### TSImportEqualsDeclaration
```javascript
t.tsImportEqualsDeclaration(id, moduleReference)
```

See also `t.isTSImportEqualsDeclaration(node, opts)` and `t.assertTSImportEqualsDeclaration(node, opts)`.

Aliases: `Statement`

 - `id`: `Identifier` (required)
 - `moduleReference`: `TSEntityName | TSExternalModuleReference` (required)
 - `isExport`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const moduleReference = t.identifier("bar");
const ast = t.tsImportEqualsDeclaration(id, moduleReference);

const { code } = generate(ast);
console.log(code); // import foo = bar;
```

---

### TSImportType
```javascript
t.tsImportType(argument)
```

See also `t.isTSImportType(node, opts)` and `t.assertTSImportType(node, opts)`.

Aliases: `TSType`

 - `argument`: `StringLiteral` (required)
 - `qualifier`: `TSEntityName` (default: `null`)
 - `typeParameters`: `TSTypeParameterInstantiation` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const argument = t.stringLiteral("foo");
const ast = t.tsImportType(argument);

const { code } = generate(ast);
console.log(code); // import("foo")
```

---

### TSIndexedAccessType
```javascript
t.tsIndexedAccessType(objectType, indexType)
```

See also `t.isTSIndexedAccessType(node, opts)` and `t.assertTSIndexedAccessType(node, opts)`.

Aliases: `TSType`

 - `objectType`: `TSType` (required)
 - `indexType`: `TSType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const objectType = t.tsAnyKeyword();
const indexType = t.tsAnyKeyword();
const ast = t.tsIndexedAccessType(objectType, indexType);

const { code } = generate(ast);
console.log(code); // any[any]
```

---

### TSIndexSignature
```javascript
t.tsIndexSignature(parameters)
```

See also `t.isTSIndexSignature(node, opts)` and `t.assertTSIndexSignature(node, opts)`.

Aliases: `TSTypeElement`

 - `parameters`: `Array<Identifier>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)
 - `readonly`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const parameters = [
  t.identifier("foo"),
  t.identifier("bar"),
  t.identifier("baz"),
];
const ast = t.tsIndexSignature(parameters);

const { code } = generate(ast);
console.log(code); // [foo, bar, baz];
```

---

### TSInferType
```javascript
t.tsInferType(typeParameter)
```

See also `t.isTSInferType(node, opts)` and `t.assertTSInferType(node, opts)`.

Aliases: `TSType`

 - `typeParameter`: `TSTypeParameter` (required)

---

### TSInterfaceBody
```javascript
t.tsInterfaceBody(body)
```

See also `t.isTSInterfaceBody(node, opts)` and `t.assertTSInterfaceBody(node, opts)`.

Aliases: none

 - `body`: `Array<TSTypeElement>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const body = [
  t.tsIndexSignature([t.identifier("foo")]),
  t.tsIndexSignature([t.identifier("bar")]),
  t.tsIndexSignature([t.identifier("baz")]),
];
const ast = t.tsInterfaceBody(body);

const { code } = generate(ast);
console.log(code);
// {
//   [foo];
//   [bar];
//   [baz];
// }
```

---

### TSInterfaceDeclaration
```javascript
t.tsInterfaceDeclaration(id, typeParameters, extends, body)
```

See also `t.isTSInterfaceDeclaration(node, opts)` and `t.assertTSInterfaceDeclaration(node, opts)`.

Aliases: `Declaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `extends`: `Array<TSExpressionWithTypeArguments>` (required)
 - `body`: `TSInterfaceBody` (required)
 - `declare`: `boolean` (default: `false`)

---

### TSIntersectionType
```javascript
t.tsIntersectionType(types)
```

See also `t.isTSIntersectionType(node, opts)` and `t.assertTSIntersectionType(node, opts)`.

Aliases: `TSType`

 - `types`: `Array<TSType>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const types = [t.tsAnyKeyword(), t.tsStringKeyword(), t.tsNumberKeyword()];
const ast = t.tsIntersectionType(types);

const { code } = generate(ast);
console.log(code); // any & string & number
```

---

### TSLiteralType
```javascript
t.tsLiteralType(literal)
```

See also `t.isTSLiteralType(node, opts)` and `t.assertTSLiteralType(node, opts)`.

Aliases: `TSType`

 - `literal`: `NumericLiteral | StringLiteral | BooleanLiteral` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const literal = t.numericLiteral(1337);
const ast = t.tsLiteralType(literal);

const { code } = generate(ast);
console.log(code); // 1337
```

---

### TSMappedType
```javascript
t.tsMappedType(typeParameter)
```

See also `t.isTSMappedType(node, opts)` and `t.assertTSMappedType(node, opts)`.

Aliases: `TSType`

 - `typeParameter`: `TSTypeParameter` (required)
 - `typeAnnotation`: `TSType` (default: `null`)
 - `optional`: `boolean` (default: `false`)
 - `readonly`: `boolean` (default: `false`)

---

### TSMethodSignature
```javascript
t.tsMethodSignature(key, typeParameters, parameters)
```

See also `t.isTSMethodSignature(node, opts)` and `t.assertTSMethodSignature(node, opts)`.

Aliases: `TSTypeElement`

 - `key`: `Expression` (required)
 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `parameters`: `Array<Identifier | RestElement>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)
 - `computed`: `boolean` (default: `false`)
 - `optional`: `boolean` (default: `false`)

---

### TSModuleBlock
```javascript
t.tsModuleBlock(body)
```

See also `t.isTSModuleBlock(node, opts)` and `t.assertTSModuleBlock(node, opts)`.

Aliases: `Block`, `BlockParent`, `Scopable`

 - `body`: `Array<Statement>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const body = [
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("foo"), t.identifier("bar")),
  ]),
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("baz"), t.identifier("qux")),
  ]),
  t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier("quux"), t.identifier("corge")),
  ]),
];
const ast = t.tsModuleBlock(body);

const { code } = generate(ast);
console.log(code);
// {
//   const foo = bar;
//   const baz = qux;
//   const quux = corge;
// }
```

---

### TSModuleDeclaration
```javascript
t.tsModuleDeclaration(id, body)
```

See also `t.isTSModuleDeclaration(node, opts)` and `t.assertTSModuleDeclaration(node, opts)`.

Aliases: `Declaration`, `Statement`

 - `id`: `Identifier | StringLiteral` (required)
 - `body`: `TSModuleBlock | TSModuleDeclaration` (required)
 - `declare`: `boolean` (default: `false`)
 - `global`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const body = t.tsModuleBlock([t.returnStatement(t.thisExpression())]);
const ast = t.tsModuleDeclaration(id, body);

const { code } = generate(ast);
console.log(code);
// namespace foo {
//   return this;
// }
```

---

### TSNamespaceExportDeclaration
```javascript
t.tsNamespaceExportDeclaration(id)
```

See also `t.isTSNamespaceExportDeclaration(node, opts)` and `t.assertTSNamespaceExportDeclaration(node, opts)`.

Aliases: `Statement`

 - `id`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const ast = t.tsNamespaceExportDeclaration(id);

const { code } = generate(ast);
console.log(code); // export as namespace foo
```

---

### TSNeverKeyword
```javascript
t.tsNeverKeyword()
```

See also `t.isTSNeverKeyword(node, opts)` and `t.assertTSNeverKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsNeverKeyword();

const { code } = generate(ast);
console.log(code); // never
```

---

### TSNonNullExpression
```javascript
t.tsNonNullExpression(expression)
```

See also `t.isTSNonNullExpression(node, opts)` and `t.assertTSNonNullExpression(node, opts)`.

Aliases: `Expression`

 - `expression`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const ast = t.tsNonNullExpression(expression);

const { code } = generate(ast);
console.log(code); // foo!
```

---

### TSNullKeyword
```javascript
t.tsNullKeyword()
```

See also `t.isTSNullKeyword(node, opts)` and `t.assertTSNullKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsNullKeyword();

const { code } = generate(ast);
console.log(code); // null
```

---

### TSNumberKeyword
```javascript
t.tsNumberKeyword()
```

See also `t.isTSNumberKeyword(node, opts)` and `t.assertTSNumberKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsNumberKeyword();

const { code } = generate(ast);
console.log(code); // number
```

---

### TSObjectKeyword
```javascript
t.tsObjectKeyword()
```

See also `t.isTSObjectKeyword(node, opts)` and `t.assertTSObjectKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsObjectKeyword();

const { code } = generate(ast);
console.log(code); // object
```

---

### TSOptionalType
```javascript
t.tsOptionalType(typeAnnotation)
```

See also `t.isTSOptionalType(node, opts)` and `t.assertTSOptionalType(node, opts)`.

Aliases: `TSType`

 - `typeAnnotation`: `TSType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const typeAnnotation = t.tsAnyKeyword();
const ast = t.tsOptionalType(typeAnnotation);

const { code } = generate(ast);
console.log(code); // any?
```

---

### TSParameterProperty
```javascript
t.tsParameterProperty(parameter)
```

See also `t.isTSParameterProperty(node, opts)` and `t.assertTSParameterProperty(node, opts)`.

Aliases: `LVal`

 - `parameter`: `Identifier | AssignmentPattern` (required)
 - `accessibility`: `"public" | "private" | "protected"` (default: `null`)
 - `readonly`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const parameter = t.identifier("foo");
const ast = t.tsParameterProperty(parameter);

const { code } = generate(ast);
console.log(code); // foo
```

---

### TSParenthesizedType
```javascript
t.tsParenthesizedType(typeAnnotation)
```

See also `t.isTSParenthesizedType(node, opts)` and `t.assertTSParenthesizedType(node, opts)`.

Aliases: `TSType`

 - `typeAnnotation`: `TSType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const typeAnnotation = t.tsAnyKeyword();
const ast = t.tsParenthesizedType(typeAnnotation);

const { code } = generate(ast);
console.log(code); // (any)
```

---

### TSPropertySignature
```javascript
t.tsPropertySignature(key)
```

See also `t.isTSPropertySignature(node, opts)` and `t.assertTSPropertySignature(node, opts)`.

Aliases: `TSTypeElement`

 - `key`: `Expression` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)
 - `initializer`: `Expression` (default: `null`)
 - `computed`: `boolean` (default: `false`)
 - `optional`: `boolean` (default: `false`)
 - `readonly`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const key = t.identifier("foo");
const ast = t.tsPropertySignature(key);

const { code } = generate(ast);
console.log(code); // foo;
```

---

### TSQualifiedName
```javascript
t.tsQualifiedName(left, right)
```

See also `t.isTSQualifiedName(node, opts)` and `t.assertTSQualifiedName(node, opts)`.

Aliases: `TSEntityName`

 - `left`: `TSEntityName` (required)
 - `right`: `Identifier` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const left = t.identifier("foo");
const right = t.identifier("bar");
const ast = t.tsQualifiedName(left, right);

const { code } = generate(ast);
console.log(code); // foo.bar
```

---

### TSRestType
```javascript
t.tsRestType(typeAnnotation)
```

See also `t.isTSRestType(node, opts)` and `t.assertTSRestType(node, opts)`.

Aliases: `TSType`

 - `typeAnnotation`: `TSType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const typeAnnotation = t.tsAnyKeyword();
const ast = t.tsRestType(typeAnnotation);

const { code } = generate(ast);
console.log(code); // ...any
```

---

### TSStringKeyword
```javascript
t.tsStringKeyword()
```

See also `t.isTSStringKeyword(node, opts)` and `t.assertTSStringKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsStringKeyword();

const { code } = generate(ast);
console.log(code); // string
```

---

### TSSymbolKeyword
```javascript
t.tsSymbolKeyword()
```

See also `t.isTSSymbolKeyword(node, opts)` and `t.assertTSSymbolKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsSymbolKeyword();

const { code } = generate(ast);
console.log(code); // symbol
```

---

### TSThisType
```javascript
t.tsThisType()
```

See also `t.isTSThisType(node, opts)` and `t.assertTSThisType(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsThisType();

const { code } = generate(ast);
console.log(code); // this
```

---

### TSTupleType
```javascript
t.tsTupleType(elementTypes)
```

See also `t.isTSTupleType(node, opts)` and `t.assertTSTupleType(node, opts)`.

Aliases: `TSType`

 - `elementTypes`: `Array<TSType>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const elementTypes = [
  t.tsAnyKeyword(),
  t.tsStringKeyword(),
  t.tsNumberKeyword(),
];
const ast = t.tsTupleType(elementTypes);

const { code } = generate(ast);
console.log(code); // [any, string, number]
```

---

### TSTypeAliasDeclaration
```javascript
t.tsTypeAliasDeclaration(id, typeParameters, typeAnnotation)
```

See also `t.isTSTypeAliasDeclaration(node, opts)` and `t.assertTSTypeAliasDeclaration(node, opts)`.

Aliases: `Declaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `typeAnnotation`: `TSType` (required)
 - `declare`: `boolean` (default: `false`)

---

### TSTypeAnnotation
```javascript
t.tsTypeAnnotation(typeAnnotation)
```

See also `t.isTSTypeAnnotation(node, opts)` and `t.assertTSTypeAnnotation(node, opts)`.

Aliases: none

 - `typeAnnotation`: `TSType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const typeAnnotation = t.tsAnyKeyword();
const ast = t.tsTypeAnnotation(typeAnnotation);

const { code } = generate(ast);
console.log(code); // : any
```

---

### TSTypeAssertion
```javascript
t.tsTypeAssertion(typeAnnotation, expression)
```

See also `t.isTSTypeAssertion(node, opts)` and `t.assertTSTypeAssertion(node, opts)`.

Aliases: `Expression`

 - `typeAnnotation`: `TSType` (required)
 - `expression`: `Expression` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const typeAnnotation = t.tsAnyKeyword();
const expression = t.identifier("foo");
const ast = t.tsTypeAssertion(typeAnnotation, expression);

const { code } = generate(ast);
console.log(code); // <any> foo
```

---

### TSTypeLiteral
```javascript
t.tsTypeLiteral(members)
```

See also `t.isTSTypeLiteral(node, opts)` and `t.assertTSTypeLiteral(node, opts)`.

Aliases: `TSType`

 - `members`: `Array<TSTypeElement>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const members = [
  t.tsIndexSignature([t.identifier("foo")]),
  t.tsIndexSignature([t.identifier("bar")]),
  t.tsIndexSignature([t.identifier("baz")]),
];
const ast = t.tsTypeLiteral(members);

const { code } = generate(ast);
console.log(code);
// {
//   [foo];
//   [bar];
//   [baz];
// }
```

---

### TSTypeOperator
```javascript
t.tsTypeOperator(typeAnnotation)
```

See also `t.isTSTypeOperator(node, opts)` and `t.assertTSTypeOperator(node, opts)`.

Aliases: `TSType`

 - `typeAnnotation`: `TSType` (required)
 - `operator`: `string` (default: `""`)

---

### TSTypeParameter
```javascript
t.tsTypeParameter()
```

See also `t.isTSTypeParameter(node, opts)` and `t.assertTSTypeParameter(node, opts)`.

Aliases: none

 - `constraint`: `TSType` (default: `null`)
 - `default`: `TSType` (default: `null`)
 - `name`: `string` (default: `""`)

---

### TSTypeParameterDeclaration
```javascript
t.tsTypeParameterDeclaration(params)
```

See also `t.isTSTypeParameterDeclaration(node, opts)` and `t.assertTSTypeParameterDeclaration(node, opts)`.

Aliases: none

 - `params`: `Array<TSTypeParameter>` (required)

---

### TSTypeParameterInstantiation
```javascript
t.tsTypeParameterInstantiation(params)
```

See also `t.isTSTypeParameterInstantiation(node, opts)` and `t.assertTSTypeParameterInstantiation(node, opts)`.

Aliases: none

 - `params`: `Array<TSType>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const params = [t.tsAnyKeyword(), t.tsStringKeyword(), t.tsNumberKeyword()];
const ast = t.tsTypeParameterInstantiation(params);

const { code } = generate(ast);
console.log(code); // <any, string, number>
```

---

### TSTypePredicate
```javascript
t.tsTypePredicate(parameterName, typeAnnotation)
```

See also `t.isTSTypePredicate(node, opts)` and `t.assertTSTypePredicate(node, opts)`.

Aliases: `TSType`

 - `parameterName`: `Identifier | TSThisType` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const parameterName = t.identifier("foo");
const typeAnnotation = t.tsTypeAnnotation(t.tsAnyKeyword());
const ast = t.tsTypePredicate(parameterName, typeAnnotation);

const { code } = generate(ast);
console.log(code); // foo is any
```

---

### TSTypeQuery
```javascript
t.tsTypeQuery(exprName)
```

See also `t.isTSTypeQuery(node, opts)` and `t.assertTSTypeQuery(node, opts)`.

Aliases: `TSType`

 - `exprName`: `TSEntityName | TSImportType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const exprName = t.identifier("foo");
const ast = t.tsTypeQuery(exprName);

const { code } = generate(ast);
console.log(code); // typeof foo
```

---

### TSTypeReference
```javascript
t.tsTypeReference(typeName)
```

See also `t.isTSTypeReference(node, opts)` and `t.assertTSTypeReference(node, opts)`.

Aliases: `TSType`

 - `typeName`: `TSEntityName` (required)
 - `typeParameters`: `TSTypeParameterInstantiation` (default: `null`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const typeName = t.identifier("foo");
const ast = t.tsTypeReference(typeName);

const { code } = generate(ast);
console.log(code); // foo
```

---

### TSUndefinedKeyword
```javascript
t.tsUndefinedKeyword()
```

See also `t.isTSUndefinedKeyword(node, opts)` and `t.assertTSUndefinedKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsUndefinedKeyword();

const { code } = generate(ast);
console.log(code); // undefined
```

---

### TSUnionType
```javascript
t.tsUnionType(types)
```

See also `t.isTSUnionType(node, opts)` and `t.assertTSUnionType(node, opts)`.

Aliases: `TSType`

 - `types`: `Array<TSType>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const types = [t.tsAnyKeyword(), t.tsStringKeyword(), t.tsNumberKeyword()];
const ast = t.tsUnionType(types);

const { code } = generate(ast);
console.log(code); // any | string | number
```

---

### TSUnknownKeyword
```javascript
t.tsUnknownKeyword()
```

See also `t.isTSUnknownKeyword(node, opts)` and `t.assertTSUnknownKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsUnknownKeyword();

const { code } = generate(ast);
console.log(code); // unknown
```

---

### TSVoidKeyword
```javascript
t.tsVoidKeyword()
```

See also `t.isTSVoidKeyword(node, opts)` and `t.assertTSVoidKeyword(node, opts)`.

Aliases: `TSType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.tsVoidKeyword();

const { code } = generate(ast);
console.log(code); // void
```

---

### TupleTypeAnnotation
```javascript
t.tupleTypeAnnotation(types)
```

See also `t.isTupleTypeAnnotation(node, opts)` and `t.assertTupleTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `types`: `Array<FlowType>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const types = [
  t.anyTypeAnnotation(),
  t.stringTypeAnnotation(),
  t.numberTypeAnnotation(),
];
const ast = t.tupleTypeAnnotation(types);

const { code } = generate(ast);
console.log(code); // [any, string, number]
```

---

### TypeAlias
```javascript
t.typeAlias(id, typeParameters, right)
```

See also `t.isTypeAlias(node, opts)` and `t.assertTypeAlias(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterDeclaration` (required)
 - `right`: `FlowType` (required)

---

### TypeAnnotation
```javascript
t.typeAnnotation(typeAnnotation)
```

See also `t.isTypeAnnotation(node, opts)` and `t.assertTypeAnnotation(node, opts)`.

Aliases: `Flow`

 - `typeAnnotation`: `FlowType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const typeAnnotation = t.anyTypeAnnotation();
const ast = t.typeAnnotation(typeAnnotation);

const { code } = generate(ast);
console.log(code); // : any
```

---

### TypeCastExpression
```javascript
t.typeCastExpression(expression, typeAnnotation)
```

See also `t.isTypeCastExpression(node, opts)` and `t.assertTypeCastExpression(node, opts)`.

Aliases: `Expression`, `ExpressionWrapper`, `Flow`

 - `expression`: `Expression` (required)
 - `typeAnnotation`: `TypeAnnotation` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const expression = t.identifier("foo");
const typeAnnotation = t.typeAnnotation(t.anyTypeAnnotation());
const ast = t.typeCastExpression(expression, typeAnnotation);

const { code } = generate(ast);
console.log(code); // (foo: any)
```

---

### TypeofTypeAnnotation
```javascript
t.typeofTypeAnnotation(argument)
```

See also `t.isTypeofTypeAnnotation(node, opts)` and `t.assertTypeofTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `argument`: `FlowType` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const argument = t.anyTypeAnnotation();
const ast = t.typeofTypeAnnotation(argument);

const { code } = generate(ast);
console.log(code); // typeof any
```

---

### TypeParameter
```javascript
t.typeParameter()
```

See also `t.isTypeParameter(node, opts)` and `t.assertTypeParameter(node, opts)`.

Aliases: `Flow`

 - `bound`: `TypeAnnotation` (default: `null`)
 - `default`: `FlowType` (default: `null`)
 - `variance`: `Variance` (default: `null`)
 - `name`: `string` (default: `""`)

---

### TypeParameterDeclaration
```javascript
t.typeParameterDeclaration(params)
```

See also `t.isTypeParameterDeclaration(node, opts)` and `t.assertTypeParameterDeclaration(node, opts)`.

Aliases: `Flow`

 - `params`: `Array<TypeParameter>` (required)

---

### TypeParameterInstantiation
```javascript
t.typeParameterInstantiation(params)
```

See also `t.isTypeParameterInstantiation(node, opts)` and `t.assertTypeParameterInstantiation(node, opts)`.

Aliases: `Flow`

 - `params`: `Array<FlowType>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const params = [
  t.anyTypeAnnotation(),
  t.stringTypeAnnotation(),
  t.numberTypeAnnotation(),
];
const ast = t.typeParameterInstantiation(params);

const { code } = generate(ast);
console.log(code); // <any, string, number>
```

---

### UnaryExpression
```javascript
t.unaryExpression(operator, argument)
```

See also `t.isUnaryExpression(node, opts)` and `t.assertUnaryExpression(node, opts)`.

Aliases: `Expression`, `UnaryLike`

 - `operator`: `"void" | "throw" | "delete" | "!" | "+" | "-" | "~" | "typeof"` (required)
 - `argument`: `Expression` (required)
 - `prefix`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const operator = "+";
const argument = t.identifier("foo");
const ast = t.unaryExpression(operator, argument);

const { code } = generate(ast);
console.log(code); // +foo
```

---

### UnionTypeAnnotation
```javascript
t.unionTypeAnnotation(types)
```

See also `t.isUnionTypeAnnotation(node, opts)` and `t.assertUnionTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `types`: `Array<FlowType>` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const types = [
  t.anyTypeAnnotation(),
  t.stringTypeAnnotation(),
  t.numberTypeAnnotation(),
];
const ast = t.unionTypeAnnotation(types);

const { code } = generate(ast);
console.log(code); // any | string | number
```

---

### UpdateExpression
```javascript
t.updateExpression(operator, argument)
```

See also `t.isUpdateExpression(node, opts)` and `t.assertUpdateExpression(node, opts)`.

Aliases: `Expression`

 - `operator`: `"++" | "--"` (required)
 - `argument`: `Expression` (required)
 - `prefix`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const operator = "++";
const argument = t.identifier("foo");
const ast = t.updateExpression(operator, argument);

const { code } = generate(ast);
console.log(code); // foo++
```

---

### VariableDeclaration
```javascript
t.variableDeclaration(kind, declarations)
```

See also `t.isVariableDeclaration(node, opts)` and `t.assertVariableDeclaration(node, opts)`.

Aliases: `Declaration`, `Statement`

 - `kind`: `"var" | "let" | "const"` (required)
 - `declarations`: `Array<VariableDeclarator>` (required)
 - `declare`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const kind = "var";
const declarations = [
  t.variableDeclarator(t.identifier("foo"), t.identifier("bar")),
  t.variableDeclarator(t.identifier("baz"), t.identifier("qux")),
  t.variableDeclarator(t.identifier("quux"), t.identifier("corge")),
];
const ast = t.variableDeclaration(kind, declarations);

const { code } = generate(ast);
console.log(code);
// var foo = bar,
//     baz = qux,
//     quux = corge;
```

---

### VariableDeclarator
```javascript
t.variableDeclarator(id)
```

See also `t.isVariableDeclarator(node, opts)` and `t.assertVariableDeclarator(node, opts)`.

Aliases: none

 - `id`: `LVal` (required)
 - `init`: `Expression` (default: `null`)
 - `definite`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const id = t.identifier("foo");
const ast = t.variableDeclarator(id);

const { code } = generate(ast);
console.log(code); // foo
```

---

### Variance
```javascript
t.variance(kind)
```

See also `t.isVariance(node, opts)` and `t.assertVariance(node, opts)`.

Aliases: `Flow`

 - `kind`: `"minus" | "plus"` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const kind = "minus";
const ast = t.variance(kind);

const { code } = generate(ast);
console.log(code); // -
```

---

### VoidTypeAnnotation
```javascript
t.voidTypeAnnotation()
```

See also `t.isVoidTypeAnnotation(node, opts)` and `t.assertVoidTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.voidTypeAnnotation();

const { code } = generate(ast);
console.log(code); // void
```

---

### WhileStatement
```javascript
t.whileStatement(test, body)
```

See also `t.isWhileStatement(node, opts)` and `t.assertWhileStatement(node, opts)`.

Aliases: `BlockParent`, `Loop`, `Scopable`, `Statement`, `While`

 - `test`: `Expression` (required)
 - `body`: `BlockStatement | Statement` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const test = t.identifier("foo");
const body = t.blockStatement([t.returnStatement(t.thisExpression())]);
const ast = t.whileStatement(test, body);

const { code } = generate(ast);
console.log(code);
// while (foo) {
//   return this;
// }
```

---

### WithStatement
```javascript
t.withStatement(object, body)
```

See also `t.isWithStatement(node, opts)` and `t.assertWithStatement(node, opts)`.

Aliases: `Statement`

 - `object`: `Expression` (required)
 - `body`: `BlockStatement | Statement` (required)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const object = t.thisExpression();
const body = t.blockStatement([t.returnStatement(t.thisExpression())]);
const ast = t.withStatement(object, body);

const { code } = generate(ast);
console.log(code);
// with (this) {
//   return this;
// }
```

---

### YieldExpression
```javascript
t.yieldExpression()
```

See also `t.isYieldExpression(node, opts)` and `t.assertYieldExpression(node, opts)`.

Aliases: `Expression`, `Terminatorless`

 - `argument`: `Expression` (default: `null`)
 - `delegate`: `boolean` (default: `false`)

```javascript
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const ast = t.yieldExpression();

const { code } = generate(ast);
console.log(code); // yield
```

---
