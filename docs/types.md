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

### anyTypeAnnotation
```javascript
t.anyTypeAnnotation()
```

See also `t.isAnyTypeAnnotation(node, opts)` and `t.assertAnyTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

---

### argumentPlaceholder
```javascript
t.argumentPlaceholder()
```

See also `t.isArgumentPlaceholder(node, opts)` and `t.assertArgumentPlaceholder(node, opts)`.

Aliases: none

---

### arrayExpression
```javascript
t.arrayExpression()
```

See also `t.isArrayExpression(node, opts)` and `t.assertArrayExpression(node, opts)`.

Aliases: `Expression`

 - `elements`: `Array<null | Expression | SpreadElement>` (default: `[]`)

---

### arrayPattern
```javascript
t.arrayPattern(elements)
```

See also `t.isArrayPattern(node, opts)` and `t.assertArrayPattern(node, opts)`.

Aliases: `LVal`, `Pattern`, `PatternLike`

 - `elements`: `Array<PatternLike>` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)

---

### arrayTypeAnnotation
```javascript
t.arrayTypeAnnotation(elementType)
```

See also `t.isArrayTypeAnnotation(node, opts)` and `t.assertArrayTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `elementType`: `FlowType` (required)

---

### arrowFunctionExpression
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

### assignmentExpression
```javascript
t.assignmentExpression(operator, left, right)
```

See also `t.isAssignmentExpression(node, opts)` and `t.assertAssignmentExpression(node, opts)`.

Aliases: `Expression`

 - `operator`: `string` (required)
 - `left`: `LVal` (required)
 - `right`: `Expression` (required)

---

### assignmentPattern
```javascript
t.assignmentPattern(left, right)
```

See also `t.isAssignmentPattern(node, opts)` and `t.assertAssignmentPattern(node, opts)`.

Aliases: `LVal`, `Pattern`, `PatternLike`

 - `left`: `Identifier | ObjectPattern | ArrayPattern | MemberExpression` (required)
 - `right`: `Expression` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)

---

### awaitExpression
```javascript
t.awaitExpression(argument)
```

See also `t.isAwaitExpression(node, opts)` and `t.assertAwaitExpression(node, opts)`.

Aliases: `Expression`, `Terminatorless`

 - `argument`: `Expression` (required)

---

### bigIntLiteral
```javascript
t.bigIntLiteral(value)
```

See also `t.isBigIntLiteral(node, opts)` and `t.assertBigIntLiteral(node, opts)`.

Aliases: `Expression`, `Immutable`, `Literal`, `Pureish`

 - `value`: `string` (required)

---

### binaryExpression
```javascript
t.binaryExpression(operator, left, right)
```

See also `t.isBinaryExpression(node, opts)` and `t.assertBinaryExpression(node, opts)`.

Aliases: `Binary`, `Expression`

 - `operator`: `"+" | "-" | "/" | "%" | "*" | "**" | "&" | "|" | ">>" | ">>>" | "<<" | "^" | "==" | "===" | "!=" | "!==" | "in" | "instanceof" | ">" | "<" | ">=" | "<="` (required)
 - `left`: `Expression` (required)
 - `right`: `Expression` (required)

---

### bindExpression
```javascript
t.bindExpression(object, callee)
```

See also `t.isBindExpression(node, opts)` and `t.assertBindExpression(node, opts)`.

Aliases: `Expression`

 - `object`: `any` (required)
 - `callee`: `any` (required)

---

### blockStatement
```javascript
t.blockStatement(body)
```

See also `t.isBlockStatement(node, opts)` and `t.assertBlockStatement(node, opts)`.

Aliases: `Block`, `BlockParent`, `Scopable`, `Statement`

 - `body`: `Array<Statement>` (required)
 - `directives`: `Array<Directive>` (default: `[]`)

---

### booleanLiteral
```javascript
t.booleanLiteral(value)
```

See also `t.isBooleanLiteral(node, opts)` and `t.assertBooleanLiteral(node, opts)`.

Aliases: `Expression`, `Immutable`, `Literal`, `Pureish`

 - `value`: `boolean` (required)

---

### booleanLiteralTypeAnnotation
```javascript
t.booleanLiteralTypeAnnotation(value)
```

See also `t.isBooleanLiteralTypeAnnotation(node, opts)` and `t.assertBooleanLiteralTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `value`: `boolean` (required)

---

### booleanTypeAnnotation
```javascript
t.booleanTypeAnnotation()
```

See also `t.isBooleanTypeAnnotation(node, opts)` and `t.assertBooleanTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

---

### breakStatement
```javascript
t.breakStatement()
```

See also `t.isBreakStatement(node, opts)` and `t.assertBreakStatement(node, opts)`.

Aliases: `CompletionStatement`, `Statement`, `Terminatorless`

 - `label`: `Identifier` (default: `null`)

---

### callExpression
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

### catchClause
```javascript
t.catchClause(param, body)
```

See also `t.isCatchClause(node, opts)` and `t.assertCatchClause(node, opts)`.

Aliases: `BlockParent`, `Scopable`

 - `param`: `Identifier` (required)
 - `body`: `BlockStatement` (required)

---

### classBody
```javascript
t.classBody(body)
```

See also `t.isClassBody(node, opts)` and `t.assertClassBody(node, opts)`.

Aliases: none

 - `body`: `Array<ClassMethod | ClassPrivateMethod | ClassProperty | ClassPrivateProperty | TSDeclareMethod | TSIndexSignature>` (required)

---

### classDeclaration
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

---

### classExpression
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

---

### classImplements
```javascript
t.classImplements(id)
```

See also `t.isClassImplements(node, opts)` and `t.assertClassImplements(node, opts)`.

Aliases: `Flow`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterInstantiation` (default: `null`)

---

### classMethod
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

### classPrivateMethod
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

### classPrivateProperty
```javascript
t.classPrivateProperty(key)
```

See also `t.isClassPrivateProperty(node, opts)` and `t.assertClassPrivateProperty(node, opts)`.

Aliases: `Private`, `Property`

 - `key`: `PrivateName` (required)
 - `value`: `Expression` (default: `null`)

---

### classProperty
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

---

### conditionalExpression
```javascript
t.conditionalExpression(test, consequent, alternate)
```

See also `t.isConditionalExpression(node, opts)` and `t.assertConditionalExpression(node, opts)`.

Aliases: `Conditional`, `Expression`

 - `test`: `Expression` (required)
 - `consequent`: `Expression` (required)
 - `alternate`: `Expression` (required)

---

### continueStatement
```javascript
t.continueStatement()
```

See also `t.isContinueStatement(node, opts)` and `t.assertContinueStatement(node, opts)`.

Aliases: `CompletionStatement`, `Statement`, `Terminatorless`

 - `label`: `Identifier` (default: `null`)

---

### debuggerStatement
```javascript
t.debuggerStatement()
```

See also `t.isDebuggerStatement(node, opts)` and `t.assertDebuggerStatement(node, opts)`.

Aliases: `Statement`

---

### declareClass
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

### declaredPredicate
```javascript
t.declaredPredicate(value)
```

See also `t.isDeclaredPredicate(node, opts)` and `t.assertDeclaredPredicate(node, opts)`.

Aliases: `Flow`, `FlowPredicate`

 - `value`: `Flow` (required)

---

### declareExportAllDeclaration
```javascript
t.declareExportAllDeclaration(source)
```

See also `t.isDeclareExportAllDeclaration(node, opts)` and `t.assertDeclareExportAllDeclaration(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `source`: `StringLiteral` (required)
 - `exportKind`: `"type" | "value"` (default: `null`)

---

### declareExportDeclaration
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

### declareFunction
```javascript
t.declareFunction(id)
```

See also `t.isDeclareFunction(node, opts)` and `t.assertDeclareFunction(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `predicate`: `DeclaredPredicate` (default: `null`)

---

### declareInterface
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

### declareModule
```javascript
t.declareModule(id, body)
```

See also `t.isDeclareModule(node, opts)` and `t.assertDeclareModule(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier | StringLiteral` (required)
 - `body`: `BlockStatement` (required)
 - `kind`: `"CommonJS" | "ES"` (default: `null`)

---

### declareModuleExports
```javascript
t.declareModuleExports(typeAnnotation)
```

See also `t.isDeclareModuleExports(node, opts)` and `t.assertDeclareModuleExports(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `typeAnnotation`: `TypeAnnotation` (required)

---

### declareOpaqueType
```javascript
t.declareOpaqueType(id)
```

See also `t.isDeclareOpaqueType(node, opts)` and `t.assertDeclareOpaqueType(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterDeclaration` (default: `null`)
 - `supertype`: `FlowType` (default: `null`)

---

### declareTypeAlias
```javascript
t.declareTypeAlias(id, typeParameters, right)
```

See also `t.isDeclareTypeAlias(node, opts)` and `t.assertDeclareTypeAlias(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterDeclaration` (required)
 - `right`: `FlowType` (required)

---

### declareVariable
```javascript
t.declareVariable(id)
```

See also `t.isDeclareVariable(node, opts)` and `t.assertDeclareVariable(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)

---

### decorator
```javascript
t.decorator(expression)
```

See also `t.isDecorator(node, opts)` and `t.assertDecorator(node, opts)`.

Aliases: none

 - `expression`: `Expression` (required)

---

### directive
```javascript
t.directive(value)
```

See also `t.isDirective(node, opts)` and `t.assertDirective(node, opts)`.

Aliases: none

 - `value`: `DirectiveLiteral` (required)

---

### directiveLiteral
```javascript
t.directiveLiteral(value)
```

See also `t.isDirectiveLiteral(node, opts)` and `t.assertDirectiveLiteral(node, opts)`.

Aliases: none

 - `value`: `string` (required)

---

### doExpression
```javascript
t.doExpression(body)
```

See also `t.isDoExpression(node, opts)` and `t.assertDoExpression(node, opts)`.

Aliases: `Expression`

 - `body`: `BlockStatement` (required)

---

### doWhileStatement
```javascript
t.doWhileStatement(test, body)
```

See also `t.isDoWhileStatement(node, opts)` and `t.assertDoWhileStatement(node, opts)`.

Aliases: `BlockParent`, `Loop`, `Scopable`, `Statement`, `While`

 - `test`: `Expression` (required)
 - `body`: `Statement` (required)

---

### emptyStatement
```javascript
t.emptyStatement()
```

See also `t.isEmptyStatement(node, opts)` and `t.assertEmptyStatement(node, opts)`.

Aliases: `Statement`

---

### emptyTypeAnnotation
```javascript
t.emptyTypeAnnotation()
```

See also `t.isEmptyTypeAnnotation(node, opts)` and `t.assertEmptyTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

---

### existsTypeAnnotation
```javascript
t.existsTypeAnnotation()
```

See also `t.isExistsTypeAnnotation(node, opts)` and `t.assertExistsTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

---

### exportAllDeclaration
```javascript
t.exportAllDeclaration(source)
```

See also `t.isExportAllDeclaration(node, opts)` and `t.assertExportAllDeclaration(node, opts)`.

Aliases: `Declaration`, `ExportDeclaration`, `ModuleDeclaration`, `Statement`

 - `source`: `StringLiteral` (required)

---

### exportDefaultDeclaration
```javascript
t.exportDefaultDeclaration(declaration)
```

See also `t.isExportDefaultDeclaration(node, opts)` and `t.assertExportDefaultDeclaration(node, opts)`.

Aliases: `Declaration`, `ExportDeclaration`, `ModuleDeclaration`, `Statement`

 - `declaration`: `FunctionDeclaration | TSDeclareFunction | ClassDeclaration | Expression` (required)

---

### exportDefaultSpecifier
```javascript
t.exportDefaultSpecifier(exported)
```

See also `t.isExportDefaultSpecifier(node, opts)` and `t.assertExportDefaultSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `exported`: `Identifier` (required)

---

### exportNamedDeclaration
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

### exportNamespaceSpecifier
```javascript
t.exportNamespaceSpecifier(exported)
```

See also `t.isExportNamespaceSpecifier(node, opts)` and `t.assertExportNamespaceSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `exported`: `Identifier` (required)

---

### exportSpecifier
```javascript
t.exportSpecifier(local, exported)
```

See also `t.isExportSpecifier(node, opts)` and `t.assertExportSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `local`: `Identifier` (required)
 - `exported`: `Identifier` (required)

---

### expressionStatement
```javascript
t.expressionStatement(expression)
```

See also `t.isExpressionStatement(node, opts)` and `t.assertExpressionStatement(node, opts)`.

Aliases: `ExpressionWrapper`, `Statement`

 - `expression`: `Expression` (required)

---

### file
```javascript
t.file(program, comments, tokens)
```

See also `t.isFile(node, opts)` and `t.assertFile(node, opts)`.

Aliases: none

 - `program`: `Program` (required)
 - `comments`: `any` (required)
 - `tokens`: `any` (required)

---

### forInStatement
```javascript
t.forInStatement(left, right, body)
```

See also `t.isForInStatement(node, opts)` and `t.assertForInStatement(node, opts)`.

Aliases: `BlockParent`, `For`, `ForXStatement`, `Loop`, `Scopable`, `Statement`

 - `left`: `VariableDeclaration | LVal` (required)
 - `right`: `Expression` (required)
 - `body`: `Statement` (required)

---

### forOfStatement
```javascript
t.forOfStatement(left, right, body)
```

See also `t.isForOfStatement(node, opts)` and `t.assertForOfStatement(node, opts)`.

Aliases: `BlockParent`, `For`, `ForXStatement`, `Loop`, `Scopable`, `Statement`

 - `left`: `VariableDeclaration | LVal` (required)
 - `right`: `Expression` (required)
 - `body`: `Statement` (required)
 - `await`: `boolean` (default: `false`)

---

### forStatement
```javascript
t.forStatement(init, test, update, body)
```

See also `t.isForStatement(node, opts)` and `t.assertForStatement(node, opts)`.

Aliases: `BlockParent`, `For`, `Loop`, `Scopable`, `Statement`

 - `init`: `VariableDeclaration | Expression` (required)
 - `test`: `Expression` (required)
 - `update`: `Expression` (required)
 - `body`: `Statement` (required)

---

### functionDeclaration
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

### functionExpression
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

### functionTypeAnnotation
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

### functionTypeParam
```javascript
t.functionTypeParam(name, typeAnnotation)
```

See also `t.isFunctionTypeParam(node, opts)` and `t.assertFunctionTypeParam(node, opts)`.

Aliases: `Flow`

 - `name`: `Identifier` (required)
 - `typeAnnotation`: `FlowType` (required)
 - `optional`: `boolean` (default: `false`)

---

### genericTypeAnnotation
```javascript
t.genericTypeAnnotation(id)
```

See also `t.isGenericTypeAnnotation(node, opts)` and `t.assertGenericTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `id`: `Identifier | QualifiedTypeIdentifier` (required)
 - `typeParameters`: `TypeParameterInstantiation` (default: `null`)

---

### identifier
```javascript
t.identifier(name)
```

See also `t.isIdentifier(node, opts)` and `t.assertIdentifier(node, opts)`.

Aliases: `Expression`, `LVal`, `PatternLike`, `TSEntityName`

 - `name`: `string` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `optional`: `boolean` (default: `false`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)

---

### ifStatement
```javascript
t.ifStatement(test, consequent)
```

See also `t.isIfStatement(node, opts)` and `t.assertIfStatement(node, opts)`.

Aliases: `Conditional`, `Statement`

 - `test`: `Expression` (required)
 - `consequent`: `Statement` (required)
 - `alternate`: `Statement` (default: `null`)

---

### importDeclaration
```javascript
t.importDeclaration(specifiers, source)
```

See also `t.isImportDeclaration(node, opts)` and `t.assertImportDeclaration(node, opts)`.

Aliases: `Declaration`, `ModuleDeclaration`, `Statement`

 - `specifiers`: `Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>` (required)
 - `source`: `StringLiteral` (required)
 - `importKind`: `"type" | "typeof" | "value"` (default: `null`)

---

### importDefaultSpecifier
```javascript
t.importDefaultSpecifier(local)
```

See also `t.isImportDefaultSpecifier(node, opts)` and `t.assertImportDefaultSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `local`: `Identifier` (required)

---

### importNamespaceSpecifier
```javascript
t.importNamespaceSpecifier(local)
```

See also `t.isImportNamespaceSpecifier(node, opts)` and `t.assertImportNamespaceSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `local`: `Identifier` (required)

---

### importSpecifier
```javascript
t.importSpecifier(local, imported)
```

See also `t.isImportSpecifier(node, opts)` and `t.assertImportSpecifier(node, opts)`.

Aliases: `ModuleSpecifier`

 - `local`: `Identifier` (required)
 - `imported`: `Identifier` (required)
 - `importKind`: `"type" | "typeof"` (default: `null`)

---

### inferredPredicate
```javascript
t.inferredPredicate()
```

See also `t.isInferredPredicate(node, opts)` and `t.assertInferredPredicate(node, opts)`.

Aliases: `Flow`, `FlowPredicate`

---

### interfaceDeclaration
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

### interfaceExtends
```javascript
t.interfaceExtends(id)
```

See also `t.isInterfaceExtends(node, opts)` and `t.assertInterfaceExtends(node, opts)`.

Aliases: `Flow`

 - `id`: `Identifier | QualifiedTypeIdentifier` (required)
 - `typeParameters`: `TypeParameterInstantiation` (default: `null`)

---

### interfaceTypeAnnotation
```javascript
t.interfaceTypeAnnotation(extends, body)
```

See also `t.isInterfaceTypeAnnotation(node, opts)` and `t.assertInterfaceTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `extends`: `Array<InterfaceExtends>` (required)
 - `body`: `ObjectTypeAnnotation` (required)

---

### interpreterDirective
```javascript
t.interpreterDirective(value)
```

See also `t.isInterpreterDirective(node, opts)` and `t.assertInterpreterDirective(node, opts)`.

Aliases: none

 - `value`: `string` (required)

---

### intersectionTypeAnnotation
```javascript
t.intersectionTypeAnnotation(types)
```

See also `t.isIntersectionTypeAnnotation(node, opts)` and `t.assertIntersectionTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `types`: `Array<FlowType>` (required)

---

### jsxAttribute
```javascript
t.jsxAttribute(name)
```

See also `t.isJSXAttribute(node, opts)` and `t.assertJSXAttribute(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `name`: `JSXIdentifier | JSXNamespacedName` (required)
 - `value`: `JSXElement | JSXFragment | StringLiteral | JSXExpressionContainer` (default: `null`)

---

### jsxClosingElement
```javascript
t.jsxClosingElement(name)
```

See also `t.isJSXClosingElement(node, opts)` and `t.assertJSXClosingElement(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `name`: `JSXIdentifier | JSXMemberExpression` (required)

---

### jsxClosingFragment
```javascript
t.jsxClosingFragment()
```

See also `t.isJSXClosingFragment(node, opts)` and `t.assertJSXClosingFragment(node, opts)`.

Aliases: `Immutable`, `JSX`

---

### jsxElement
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

### jsxEmptyExpression
```javascript
t.jsxEmptyExpression()
```

See also `t.isJSXEmptyExpression(node, opts)` and `t.assertJSXEmptyExpression(node, opts)`.

Aliases: `JSX`

---

### jsxExpressionContainer
```javascript
t.jsxExpressionContainer(expression)
```

See also `t.isJSXExpressionContainer(node, opts)` and `t.assertJSXExpressionContainer(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `expression`: `Expression | JSXEmptyExpression` (required)

---

### jsxFragment
```javascript
t.jsxFragment(openingFragment, closingFragment, children)
```

See also `t.isJSXFragment(node, opts)` and `t.assertJSXFragment(node, opts)`.

Aliases: `Expression`, `Immutable`, `JSX`

 - `openingFragment`: `JSXOpeningFragment` (required)
 - `closingFragment`: `JSXClosingFragment` (required)
 - `children`: `Array<JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment>` (required)

---

### jsxIdentifier
```javascript
t.jsxIdentifier(name)
```

See also `t.isJSXIdentifier(node, opts)` and `t.assertJSXIdentifier(node, opts)`.

Aliases: `JSX`

 - `name`: `string` (required)

---

### jsxMemberExpression
```javascript
t.jsxMemberExpression(object, property)
```

See also `t.isJSXMemberExpression(node, opts)` and `t.assertJSXMemberExpression(node, opts)`.

Aliases: `JSX`

 - `object`: `JSXMemberExpression | JSXIdentifier` (required)
 - `property`: `JSXIdentifier` (required)

---

### jsxNamespacedName
```javascript
t.jsxNamespacedName(namespace, name)
```

See also `t.isJSXNamespacedName(node, opts)` and `t.assertJSXNamespacedName(node, opts)`.

Aliases: `JSX`

 - `namespace`: `JSXIdentifier` (required)
 - `name`: `JSXIdentifier` (required)

---

### jsxOpeningElement
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

### jsxOpeningFragment
```javascript
t.jsxOpeningFragment()
```

See also `t.isJSXOpeningFragment(node, opts)` and `t.assertJSXOpeningFragment(node, opts)`.

Aliases: `Immutable`, `JSX`

---

### jsxSpreadAttribute
```javascript
t.jsxSpreadAttribute(argument)
```

See also `t.isJSXSpreadAttribute(node, opts)` and `t.assertJSXSpreadAttribute(node, opts)`.

Aliases: `JSX`

 - `argument`: `Expression` (required)

---

### jsxSpreadChild
```javascript
t.jsxSpreadChild(expression)
```

See also `t.isJSXSpreadChild(node, opts)` and `t.assertJSXSpreadChild(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `expression`: `Expression` (required)

---

### jsxText
```javascript
t.jsxText(value)
```

See also `t.isJSXText(node, opts)` and `t.assertJSXText(node, opts)`.

Aliases: `Immutable`, `JSX`

 - `value`: `string` (required)

---

### labeledStatement
```javascript
t.labeledStatement(label, body)
```

See also `t.isLabeledStatement(node, opts)` and `t.assertLabeledStatement(node, opts)`.

Aliases: `Statement`

 - `label`: `Identifier` (required)
 - `body`: `Statement` (required)

---

### logicalExpression
```javascript
t.logicalExpression(operator, left, right)
```

See also `t.isLogicalExpression(node, opts)` and `t.assertLogicalExpression(node, opts)`.

Aliases: `Binary`, `Expression`

 - `operator`: `"||" | "&&" | "??"` (required)
 - `left`: `Expression` (required)
 - `right`: `Expression` (required)

---

### memberExpression
```javascript
t.memberExpression(object, property)
```

See also `t.isMemberExpression(node, opts)` and `t.assertMemberExpression(node, opts)`.

Aliases: `Expression`, `LVal`

 - `object`: `Expression` (required)
 - `property`: if computed then `Expression` else `Identifier` (required)
 - `computed`: `boolean` (default: `false`)
 - `optional`: `true | false` (default: `null`)

---

### metaProperty
```javascript
t.metaProperty(meta, property)
```

See also `t.isMetaProperty(node, opts)` and `t.assertMetaProperty(node, opts)`.

Aliases: `Expression`

 - `meta`: `Identifier` (required)
 - `property`: `Identifier` (required)

---

### mixedTypeAnnotation
```javascript
t.mixedTypeAnnotation()
```

See also `t.isMixedTypeAnnotation(node, opts)` and `t.assertMixedTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

---

### newExpression
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

### noop
```javascript
t.noop()
```

See also `t.isNoop(node, opts)` and `t.assertNoop(node, opts)`.

Aliases: none

---

### nullableTypeAnnotation
```javascript
t.nullableTypeAnnotation(typeAnnotation)
```

See also `t.isNullableTypeAnnotation(node, opts)` and `t.assertNullableTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `typeAnnotation`: `FlowType` (required)

---

### nullLiteral
```javascript
t.nullLiteral()
```

See also `t.isNullLiteral(node, opts)` and `t.assertNullLiteral(node, opts)`.

Aliases: `Expression`, `Immutable`, `Literal`, `Pureish`

---

### nullLiteralTypeAnnotation
```javascript
t.nullLiteralTypeAnnotation()
```

See also `t.isNullLiteralTypeAnnotation(node, opts)` and `t.assertNullLiteralTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

---

### numberLiteralTypeAnnotation
```javascript
t.numberLiteralTypeAnnotation(value)
```

See also `t.isNumberLiteralTypeAnnotation(node, opts)` and `t.assertNumberLiteralTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `value`: `number` (required)

---

### numberTypeAnnotation
```javascript
t.numberTypeAnnotation()
```

See also `t.isNumberTypeAnnotation(node, opts)` and `t.assertNumberTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

---

### numericLiteral
```javascript
t.numericLiteral(value)
```

See also `t.isNumericLiteral(node, opts)` and `t.assertNumericLiteral(node, opts)`.

Aliases: `Expression`, `Immutable`, `Literal`, `Pureish`

 - `value`: `number` (required)

---

### objectExpression
```javascript
t.objectExpression(properties)
```

See also `t.isObjectExpression(node, opts)` and `t.assertObjectExpression(node, opts)`.

Aliases: `Expression`

 - `properties`: `Array<ObjectMethod | ObjectProperty | SpreadElement>` (required)

---

### objectMethod
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

### objectPattern
```javascript
t.objectPattern(properties)
```

See also `t.isObjectPattern(node, opts)` and `t.assertObjectPattern(node, opts)`.

Aliases: `LVal`, `Pattern`, `PatternLike`

 - `properties`: `Array<RestElement | ObjectProperty>` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)

---

### objectProperty
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

---

### objectTypeAnnotation
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

### objectTypeCallProperty
```javascript
t.objectTypeCallProperty(value)
```

See also `t.isObjectTypeCallProperty(node, opts)` and `t.assertObjectTypeCallProperty(node, opts)`.

Aliases: `Flow`, `UserWhitespacable`

 - `value`: `FlowType` (required)
 - `static`: `boolean` (default: `false`)

---

### objectTypeIndexer
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

---

### objectTypeInternalSlot
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

---

### objectTypeProperty
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

---

### objectTypeSpreadProperty
```javascript
t.objectTypeSpreadProperty(argument)
```

See also `t.isObjectTypeSpreadProperty(node, opts)` and `t.assertObjectTypeSpreadProperty(node, opts)`.

Aliases: `Flow`, `UserWhitespacable`

 - `argument`: `FlowType` (required)

---

### opaqueType
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

### optionalCallExpression
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

### optionalMemberExpression
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

### parenthesizedExpression
```javascript
t.parenthesizedExpression(expression)
```

See also `t.isParenthesizedExpression(node, opts)` and `t.assertParenthesizedExpression(node, opts)`.

Aliases: `Expression`, `ExpressionWrapper`

 - `expression`: `Expression` (required)

---

### pipelineBareFunction
```javascript
t.pipelineBareFunction(callee)
```

See also `t.isPipelineBareFunction(node, opts)` and `t.assertPipelineBareFunction(node, opts)`.

Aliases: none

 - `callee`: `Expression` (required)

---

### pipelinePrimaryTopicReference
```javascript
t.pipelinePrimaryTopicReference()
```

See also `t.isPipelinePrimaryTopicReference(node, opts)` and `t.assertPipelinePrimaryTopicReference(node, opts)`.

Aliases: `Expression`

---

### pipelineTopicExpression
```javascript
t.pipelineTopicExpression(expression)
```

See also `t.isPipelineTopicExpression(node, opts)` and `t.assertPipelineTopicExpression(node, opts)`.

Aliases: none

 - `expression`: `Expression` (required)

---

### placeholder
```javascript
t.placeholder(expectedNode, name)
```

See also `t.isPlaceholder(node, opts)` and `t.assertPlaceholder(node, opts)`.

Aliases: none

 - `expectedNode`: `"Identifier" | "StringLiteral" | "Expression" | "Statement" | "Declaration" | "BlockStatement" | "ClassBody" | "Pattern"` (required)
 - `name`: `Identifier` (required)

---

### privateName
```javascript
t.privateName(id)
```

See also `t.isPrivateName(node, opts)` and `t.assertPrivateName(node, opts)`.

Aliases: `Private`

 - `id`: `Identifier` (required)

---

### program
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

---

### qualifiedTypeIdentifier
```javascript
t.qualifiedTypeIdentifier(id, qualification)
```

See also `t.isQualifiedTypeIdentifier(node, opts)` and `t.assertQualifiedTypeIdentifier(node, opts)`.

Aliases: `Flow`

 - `id`: `Identifier` (required)
 - `qualification`: `Identifier | QualifiedTypeIdentifier` (required)

---

### regExpLiteral
```javascript
t.regExpLiteral(pattern)
```

See also `t.isRegExpLiteral(node, opts)` and `t.assertRegExpLiteral(node, opts)`.

Aliases: `Expression`, `Literal`

 - `pattern`: `string` (required)
 - `flags`: `string` (default: `""`)

---

### restElement
```javascript
t.restElement(argument)
```

See also `t.isRestElement(node, opts)` and `t.assertRestElement(node, opts)`.

Aliases: `LVal`, `PatternLike`

 - `argument`: `LVal` (required)
 - `decorators`: `Array<Decorator>` (default: `[]`)
 - `typeAnnotation`: `TypeAnnotation | TSTypeAnnotation | Noop` (default: `null`)

---

### returnStatement
```javascript
t.returnStatement()
```

See also `t.isReturnStatement(node, opts)` and `t.assertReturnStatement(node, opts)`.

Aliases: `CompletionStatement`, `Statement`, `Terminatorless`

 - `argument`: `Expression` (default: `null`)

---

### sequenceExpression
```javascript
t.sequenceExpression(expressions)
```

See also `t.isSequenceExpression(node, opts)` and `t.assertSequenceExpression(node, opts)`.

Aliases: `Expression`

 - `expressions`: `Array<Expression>` (required)

---

### spreadElement
```javascript
t.spreadElement(argument)
```

See also `t.isSpreadElement(node, opts)` and `t.assertSpreadElement(node, opts)`.

Aliases: `UnaryLike`

 - `argument`: `Expression` (required)

---

### stringLiteral
```javascript
t.stringLiteral(value)
```

See also `t.isStringLiteral(node, opts)` and `t.assertStringLiteral(node, opts)`.

Aliases: `Expression`, `Immutable`, `Literal`, `Pureish`

 - `value`: `string` (required)

---

### stringLiteralTypeAnnotation
```javascript
t.stringLiteralTypeAnnotation(value)
```

See also `t.isStringLiteralTypeAnnotation(node, opts)` and `t.assertStringLiteralTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `value`: `string` (required)

---

### stringTypeAnnotation
```javascript
t.stringTypeAnnotation()
```

See also `t.isStringTypeAnnotation(node, opts)` and `t.assertStringTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

---

### switchCase
```javascript
t.switchCase(test, consequent)
```

See also `t.isSwitchCase(node, opts)` and `t.assertSwitchCase(node, opts)`.

Aliases: none

 - `test`: `Expression` (required)
 - `consequent`: `Array<Statement>` (required)

---

### switchStatement
```javascript
t.switchStatement(discriminant, cases)
```

See also `t.isSwitchStatement(node, opts)` and `t.assertSwitchStatement(node, opts)`.

Aliases: `BlockParent`, `Scopable`, `Statement`

 - `discriminant`: `Expression` (required)
 - `cases`: `Array<SwitchCase>` (required)

---

### taggedTemplateExpression
```javascript
t.taggedTemplateExpression(tag, quasi)
```

See also `t.isTaggedTemplateExpression(node, opts)` and `t.assertTaggedTemplateExpression(node, opts)`.

Aliases: `Expression`

 - `tag`: `Expression` (required)
 - `quasi`: `TemplateLiteral` (required)
 - `typeParameters`: `TypeParameterInstantiation | TSTypeParameterInstantiation` (default: `null`)

---

### templateElement
```javascript
t.templateElement(value)
```

See also `t.isTemplateElement(node, opts)` and `t.assertTemplateElement(node, opts)`.

Aliases: none

 - `value`: `{ raw: string` (required)
 - `cooked`: `string }` (default: `null`)
 - `tail`: `boolean` (default: `false`)

---

### templateLiteral
```javascript
t.templateLiteral(quasis, expressions)
```

See also `t.isTemplateLiteral(node, opts)` and `t.assertTemplateLiteral(node, opts)`.

Aliases: `Expression`, `Literal`

 - `quasis`: `Array<TemplateElement>` (required)
 - `expressions`: `Array<Expression>` (required)

---

### thisExpression
```javascript
t.thisExpression()
```

See also `t.isThisExpression(node, opts)` and `t.assertThisExpression(node, opts)`.

Aliases: `Expression`

---

### thisTypeAnnotation
```javascript
t.thisTypeAnnotation()
```

See also `t.isThisTypeAnnotation(node, opts)` and `t.assertThisTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

---

### throwStatement
```javascript
t.throwStatement(argument)
```

See also `t.isThrowStatement(node, opts)` and `t.assertThrowStatement(node, opts)`.

Aliases: `CompletionStatement`, `Statement`, `Terminatorless`

 - `argument`: `Expression` (required)

---

### tryStatement
```javascript
t.tryStatement(block)
```

See also `t.isTryStatement(node, opts)` and `t.assertTryStatement(node, opts)`.

Aliases: `Statement`

 - `block`: `BlockStatement` (required)
 - `handler`: `CatchClause` (default: `null`)
 - `finalizer`: `BlockStatement` (default: `null`)

---

### tsAnyKeyword
```javascript
t.tsAnyKeyword()
```

See also `t.isTSAnyKeyword(node, opts)` and `t.assertTSAnyKeyword(node, opts)`.

Aliases: `TSType`

---

### tsArrayType
```javascript
t.tsArrayType(elementType)
```

See also `t.isTSArrayType(node, opts)` and `t.assertTSArrayType(node, opts)`.

Aliases: `TSType`

 - `elementType`: `TSType` (required)

---

### tsAsExpression
```javascript
t.tsAsExpression(expression, typeAnnotation)
```

See also `t.isTSAsExpression(node, opts)` and `t.assertTSAsExpression(node, opts)`.

Aliases: `Expression`

 - `expression`: `Expression` (required)
 - `typeAnnotation`: `TSType` (required)

---

### tsBooleanKeyword
```javascript
t.tsBooleanKeyword()
```

See also `t.isTSBooleanKeyword(node, opts)` and `t.assertTSBooleanKeyword(node, opts)`.

Aliases: `TSType`

---

### tsCallSignatureDeclaration
```javascript
t.tsCallSignatureDeclaration(typeParameters, parameters)
```

See also `t.isTSCallSignatureDeclaration(node, opts)` and `t.assertTSCallSignatureDeclaration(node, opts)`.

Aliases: `TSTypeElement`

 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `parameters`: `Array<Identifier | RestElement>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)

---

### tsConditionalType
```javascript
t.tsConditionalType(checkType, extendsType, trueType, falseType)
```

See also `t.isTSConditionalType(node, opts)` and `t.assertTSConditionalType(node, opts)`.

Aliases: `TSType`

 - `checkType`: `TSType` (required)
 - `extendsType`: `TSType` (required)
 - `trueType`: `TSType` (required)
 - `falseType`: `TSType` (required)

---

### tsConstructorType
```javascript
t.tsConstructorType(typeParameters, parameters)
```

See also `t.isTSConstructorType(node, opts)` and `t.assertTSConstructorType(node, opts)`.

Aliases: `TSType`

 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `parameters`: `Array<Identifier | RestElement>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)

---

### tsConstructSignatureDeclaration
```javascript
t.tsConstructSignatureDeclaration(typeParameters, parameters)
```

See also `t.isTSConstructSignatureDeclaration(node, opts)` and `t.assertTSConstructSignatureDeclaration(node, opts)`.

Aliases: `TSTypeElement`

 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `parameters`: `Array<Identifier | RestElement>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)

---

### tsDeclareFunction
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

### tsDeclareMethod
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

### tsEnumDeclaration
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

---

### tsEnumMember
```javascript
t.tsEnumMember(id)
```

See also `t.isTSEnumMember(node, opts)` and `t.assertTSEnumMember(node, opts)`.

Aliases: none

 - `id`: `Identifier | StringLiteral` (required)
 - `initializer`: `Expression` (default: `null`)

---

### tsExportAssignment
```javascript
t.tsExportAssignment(expression)
```

See also `t.isTSExportAssignment(node, opts)` and `t.assertTSExportAssignment(node, opts)`.

Aliases: `Statement`

 - `expression`: `Expression` (required)

---

### tsExpressionWithTypeArguments
```javascript
t.tsExpressionWithTypeArguments(expression)
```

See also `t.isTSExpressionWithTypeArguments(node, opts)` and `t.assertTSExpressionWithTypeArguments(node, opts)`.

Aliases: `TSType`

 - `expression`: `TSEntityName` (required)
 - `typeParameters`: `TSTypeParameterInstantiation` (default: `null`)

---

### tsExternalModuleReference
```javascript
t.tsExternalModuleReference(expression)
```

See also `t.isTSExternalModuleReference(node, opts)` and `t.assertTSExternalModuleReference(node, opts)`.

Aliases: none

 - `expression`: `StringLiteral` (required)

---

### tsFunctionType
```javascript
t.tsFunctionType(typeParameters, parameters)
```

See also `t.isTSFunctionType(node, opts)` and `t.assertTSFunctionType(node, opts)`.

Aliases: `TSType`

 - `typeParameters`: `TSTypeParameterDeclaration` (required)
 - `parameters`: `Array<Identifier | RestElement>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)

---

### tsImportEqualsDeclaration
```javascript
t.tsImportEqualsDeclaration(id, moduleReference)
```

See also `t.isTSImportEqualsDeclaration(node, opts)` and `t.assertTSImportEqualsDeclaration(node, opts)`.

Aliases: `Statement`

 - `id`: `Identifier` (required)
 - `moduleReference`: `TSEntityName | TSExternalModuleReference` (required)
 - `isExport`: `boolean` (default: `false`)

---

### tsImportType
```javascript
t.tsImportType(argument)
```

See also `t.isTSImportType(node, opts)` and `t.assertTSImportType(node, opts)`.

Aliases: `TSType`

 - `argument`: `StringLiteral` (required)
 - `qualifier`: `TSEntityName` (default: `null`)
 - `typeParameters`: `TSTypeParameterInstantiation` (default: `null`)

---

### tsIndexedAccessType
```javascript
t.tsIndexedAccessType(objectType, indexType)
```

See also `t.isTSIndexedAccessType(node, opts)` and `t.assertTSIndexedAccessType(node, opts)`.

Aliases: `TSType`

 - `objectType`: `TSType` (required)
 - `indexType`: `TSType` (required)

---

### tsIndexSignature
```javascript
t.tsIndexSignature(parameters)
```

See also `t.isTSIndexSignature(node, opts)` and `t.assertTSIndexSignature(node, opts)`.

Aliases: `TSTypeElement`

 - `parameters`: `Array<Identifier>` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (default: `null`)
 - `readonly`: `boolean` (default: `false`)

---

### tsInferType
```javascript
t.tsInferType(typeParameter)
```

See also `t.isTSInferType(node, opts)` and `t.assertTSInferType(node, opts)`.

Aliases: `TSType`

 - `typeParameter`: `TSTypeParameter` (required)

---

### tsInterfaceBody
```javascript
t.tsInterfaceBody(body)
```

See also `t.isTSInterfaceBody(node, opts)` and `t.assertTSInterfaceBody(node, opts)`.

Aliases: none

 - `body`: `Array<TSTypeElement>` (required)

---

### tsInterfaceDeclaration
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

### tsIntersectionType
```javascript
t.tsIntersectionType(types)
```

See also `t.isTSIntersectionType(node, opts)` and `t.assertTSIntersectionType(node, opts)`.

Aliases: `TSType`

 - `types`: `Array<TSType>` (required)

---

### tsLiteralType
```javascript
t.tsLiteralType(literal)
```

See also `t.isTSLiteralType(node, opts)` and `t.assertTSLiteralType(node, opts)`.

Aliases: `TSType`

 - `literal`: `NumericLiteral | StringLiteral | BooleanLiteral` (required)

---

### tsMappedType
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

### tsMethodSignature
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

### tsModuleBlock
```javascript
t.tsModuleBlock(body)
```

See also `t.isTSModuleBlock(node, opts)` and `t.assertTSModuleBlock(node, opts)`.

Aliases: `Block`, `BlockParent`, `Scopable`

 - `body`: `Array<Statement>` (required)

---

### tsModuleDeclaration
```javascript
t.tsModuleDeclaration(id, body)
```

See also `t.isTSModuleDeclaration(node, opts)` and `t.assertTSModuleDeclaration(node, opts)`.

Aliases: `Declaration`, `Statement`

 - `id`: `Identifier | StringLiteral` (required)
 - `body`: `TSModuleBlock | TSModuleDeclaration` (required)
 - `declare`: `boolean` (default: `false`)
 - `global`: `boolean` (default: `false`)

---

### tsNamespaceExportDeclaration
```javascript
t.tsNamespaceExportDeclaration(id)
```

See also `t.isTSNamespaceExportDeclaration(node, opts)` and `t.assertTSNamespaceExportDeclaration(node, opts)`.

Aliases: `Statement`

 - `id`: `Identifier` (required)

---

### tsNeverKeyword
```javascript
t.tsNeverKeyword()
```

See also `t.isTSNeverKeyword(node, opts)` and `t.assertTSNeverKeyword(node, opts)`.

Aliases: `TSType`

---

### tsNonNullExpression
```javascript
t.tsNonNullExpression(expression)
```

See also `t.isTSNonNullExpression(node, opts)` and `t.assertTSNonNullExpression(node, opts)`.

Aliases: `Expression`

 - `expression`: `Expression` (required)

---

### tsNullKeyword
```javascript
t.tsNullKeyword()
```

See also `t.isTSNullKeyword(node, opts)` and `t.assertTSNullKeyword(node, opts)`.

Aliases: `TSType`

---

### tsNumberKeyword
```javascript
t.tsNumberKeyword()
```

See also `t.isTSNumberKeyword(node, opts)` and `t.assertTSNumberKeyword(node, opts)`.

Aliases: `TSType`

---

### tsObjectKeyword
```javascript
t.tsObjectKeyword()
```

See also `t.isTSObjectKeyword(node, opts)` and `t.assertTSObjectKeyword(node, opts)`.

Aliases: `TSType`

---

### tsOptionalType
```javascript
t.tsOptionalType(typeAnnotation)
```

See also `t.isTSOptionalType(node, opts)` and `t.assertTSOptionalType(node, opts)`.

Aliases: `TSType`

 - `typeAnnotation`: `TSType` (required)

---

### tsParameterProperty
```javascript
t.tsParameterProperty(parameter)
```

See also `t.isTSParameterProperty(node, opts)` and `t.assertTSParameterProperty(node, opts)`.

Aliases: `LVal`

 - `parameter`: `Identifier | AssignmentPattern` (required)
 - `accessibility`: `"public" | "private" | "protected"` (default: `null`)
 - `readonly`: `boolean` (default: `false`)

---

### tsParenthesizedType
```javascript
t.tsParenthesizedType(typeAnnotation)
```

See also `t.isTSParenthesizedType(node, opts)` and `t.assertTSParenthesizedType(node, opts)`.

Aliases: `TSType`

 - `typeAnnotation`: `TSType` (required)

---

### tsPropertySignature
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

---

### tsQualifiedName
```javascript
t.tsQualifiedName(left, right)
```

See also `t.isTSQualifiedName(node, opts)` and `t.assertTSQualifiedName(node, opts)`.

Aliases: `TSEntityName`

 - `left`: `TSEntityName` (required)
 - `right`: `Identifier` (required)

---

### tsRestType
```javascript
t.tsRestType(typeAnnotation)
```

See also `t.isTSRestType(node, opts)` and `t.assertTSRestType(node, opts)`.

Aliases: `TSType`

 - `typeAnnotation`: `TSType` (required)

---

### tsStringKeyword
```javascript
t.tsStringKeyword()
```

See also `t.isTSStringKeyword(node, opts)` and `t.assertTSStringKeyword(node, opts)`.

Aliases: `TSType`

---

### tsSymbolKeyword
```javascript
t.tsSymbolKeyword()
```

See also `t.isTSSymbolKeyword(node, opts)` and `t.assertTSSymbolKeyword(node, opts)`.

Aliases: `TSType`

---

### tsThisType
```javascript
t.tsThisType()
```

See also `t.isTSThisType(node, opts)` and `t.assertTSThisType(node, opts)`.

Aliases: `TSType`

---

### tsTupleType
```javascript
t.tsTupleType(elementTypes)
```

See also `t.isTSTupleType(node, opts)` and `t.assertTSTupleType(node, opts)`.

Aliases: `TSType`

 - `elementTypes`: `Array<TSType>` (required)

---

### tsTypeAliasDeclaration
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

### tsTypeAnnotation
```javascript
t.tsTypeAnnotation(typeAnnotation)
```

See also `t.isTSTypeAnnotation(node, opts)` and `t.assertTSTypeAnnotation(node, opts)`.

Aliases: none

 - `typeAnnotation`: `TSType` (required)

---

### tsTypeAssertion
```javascript
t.tsTypeAssertion(typeAnnotation, expression)
```

See also `t.isTSTypeAssertion(node, opts)` and `t.assertTSTypeAssertion(node, opts)`.

Aliases: `Expression`

 - `typeAnnotation`: `TSType` (required)
 - `expression`: `Expression` (required)

---

### tsTypeLiteral
```javascript
t.tsTypeLiteral(members)
```

See also `t.isTSTypeLiteral(node, opts)` and `t.assertTSTypeLiteral(node, opts)`.

Aliases: `TSType`

 - `members`: `Array<TSTypeElement>` (required)

---

### tsTypeOperator
```javascript
t.tsTypeOperator(typeAnnotation)
```

See also `t.isTSTypeOperator(node, opts)` and `t.assertTSTypeOperator(node, opts)`.

Aliases: `TSType`

 - `typeAnnotation`: `TSType` (required)
 - `operator`: `string` (default: `""`)

---

### tsTypeParameter
```javascript
t.tsTypeParameter()
```

See also `t.isTSTypeParameter(node, opts)` and `t.assertTSTypeParameter(node, opts)`.

Aliases: none

 - `constraint`: `TSType` (default: `null`)
 - `default`: `TSType` (default: `null`)
 - `name`: `string` (default: `""`)

---

### tsTypeParameterDeclaration
```javascript
t.tsTypeParameterDeclaration(params)
```

See also `t.isTSTypeParameterDeclaration(node, opts)` and `t.assertTSTypeParameterDeclaration(node, opts)`.

Aliases: none

 - `params`: `Array<TSTypeParameter>` (required)

---

### tsTypeParameterInstantiation
```javascript
t.tsTypeParameterInstantiation(params)
```

See also `t.isTSTypeParameterInstantiation(node, opts)` and `t.assertTSTypeParameterInstantiation(node, opts)`.

Aliases: none

 - `params`: `Array<TSType>` (required)

---

### tsTypePredicate
```javascript
t.tsTypePredicate(parameterName, typeAnnotation)
```

See also `t.isTSTypePredicate(node, opts)` and `t.assertTSTypePredicate(node, opts)`.

Aliases: `TSType`

 - `parameterName`: `Identifier | TSThisType` (required)
 - `typeAnnotation`: `TSTypeAnnotation` (required)

---

### tsTypeQuery
```javascript
t.tsTypeQuery(exprName)
```

See also `t.isTSTypeQuery(node, opts)` and `t.assertTSTypeQuery(node, opts)`.

Aliases: `TSType`

 - `exprName`: `TSEntityName | TSImportType` (required)

---

### tsTypeReference
```javascript
t.tsTypeReference(typeName)
```

See also `t.isTSTypeReference(node, opts)` and `t.assertTSTypeReference(node, opts)`.

Aliases: `TSType`

 - `typeName`: `TSEntityName` (required)
 - `typeParameters`: `TSTypeParameterInstantiation` (default: `null`)

---

### tsUndefinedKeyword
```javascript
t.tsUndefinedKeyword()
```

See also `t.isTSUndefinedKeyword(node, opts)` and `t.assertTSUndefinedKeyword(node, opts)`.

Aliases: `TSType`

---

### tsUnionType
```javascript
t.tsUnionType(types)
```

See also `t.isTSUnionType(node, opts)` and `t.assertTSUnionType(node, opts)`.

Aliases: `TSType`

 - `types`: `Array<TSType>` (required)

---

### tsUnknownKeyword
```javascript
t.tsUnknownKeyword()
```

See also `t.isTSUnknownKeyword(node, opts)` and `t.assertTSUnknownKeyword(node, opts)`.

Aliases: `TSType`

---

### tsVoidKeyword
```javascript
t.tsVoidKeyword()
```

See also `t.isTSVoidKeyword(node, opts)` and `t.assertTSVoidKeyword(node, opts)`.

Aliases: `TSType`

---

### tupleTypeAnnotation
```javascript
t.tupleTypeAnnotation(types)
```

See also `t.isTupleTypeAnnotation(node, opts)` and `t.assertTupleTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `types`: `Array<FlowType>` (required)

---

### typeAlias
```javascript
t.typeAlias(id, typeParameters, right)
```

See also `t.isTypeAlias(node, opts)` and `t.assertTypeAlias(node, opts)`.

Aliases: `Declaration`, `Flow`, `FlowDeclaration`, `Statement`

 - `id`: `Identifier` (required)
 - `typeParameters`: `TypeParameterDeclaration` (required)
 - `right`: `FlowType` (required)

---

### typeAnnotation
```javascript
t.typeAnnotation(typeAnnotation)
```

See also `t.isTypeAnnotation(node, opts)` and `t.assertTypeAnnotation(node, opts)`.

Aliases: `Flow`

 - `typeAnnotation`: `FlowType` (required)

---

### typeCastExpression
```javascript
t.typeCastExpression(expression, typeAnnotation)
```

See also `t.isTypeCastExpression(node, opts)` and `t.assertTypeCastExpression(node, opts)`.

Aliases: `Expression`, `ExpressionWrapper`, `Flow`

 - `expression`: `Expression` (required)
 - `typeAnnotation`: `TypeAnnotation` (required)

---

### typeofTypeAnnotation
```javascript
t.typeofTypeAnnotation(argument)
```

See also `t.isTypeofTypeAnnotation(node, opts)` and `t.assertTypeofTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `argument`: `FlowType` (required)

---

### typeParameter
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

### typeParameterDeclaration
```javascript
t.typeParameterDeclaration(params)
```

See also `t.isTypeParameterDeclaration(node, opts)` and `t.assertTypeParameterDeclaration(node, opts)`.

Aliases: `Flow`

 - `params`: `Array<TypeParameter>` (required)

---

### typeParameterInstantiation
```javascript
t.typeParameterInstantiation(params)
```

See also `t.isTypeParameterInstantiation(node, opts)` and `t.assertTypeParameterInstantiation(node, opts)`.

Aliases: `Flow`

 - `params`: `Array<FlowType>` (required)

---

### unaryExpression
```javascript
t.unaryExpression(operator, argument)
```

See also `t.isUnaryExpression(node, opts)` and `t.assertUnaryExpression(node, opts)`.

Aliases: `Expression`, `UnaryLike`

 - `operator`: `"void" | "throw" | "delete" | "!" | "+" | "-" | "~" | "typeof"` (required)
 - `argument`: `Expression` (required)
 - `prefix`: `boolean` (default: `false`)

---

### unionTypeAnnotation
```javascript
t.unionTypeAnnotation(types)
```

See also `t.isUnionTypeAnnotation(node, opts)` and `t.assertUnionTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowType`

 - `types`: `Array<FlowType>` (required)

---

### updateExpression
```javascript
t.updateExpression(operator, argument)
```

See also `t.isUpdateExpression(node, opts)` and `t.assertUpdateExpression(node, opts)`.

Aliases: `Expression`

 - `operator`: `"++" | "--"` (required)
 - `argument`: `Expression` (required)
 - `prefix`: `boolean` (default: `false`)

---

### variableDeclaration
```javascript
t.variableDeclaration(kind, declarations)
```

See also `t.isVariableDeclaration(node, opts)` and `t.assertVariableDeclaration(node, opts)`.

Aliases: `Declaration`, `Statement`

 - `kind`: `"var" | "let" | "const"` (required)
 - `declarations`: `Array<VariableDeclarator>` (required)
 - `declare`: `boolean` (default: `false`)

---

### variableDeclarator
```javascript
t.variableDeclarator(id)
```

See also `t.isVariableDeclarator(node, opts)` and `t.assertVariableDeclarator(node, opts)`.

Aliases: none

 - `id`: `LVal` (required)
 - `init`: `Expression` (default: `null`)
 - `definite`: `boolean` (default: `false`)

---

### variance
```javascript
t.variance(kind)
```

See also `t.isVariance(node, opts)` and `t.assertVariance(node, opts)`.

Aliases: `Flow`

 - `kind`: `"minus" | "plus"` (required)

---

### voidTypeAnnotation
```javascript
t.voidTypeAnnotation()
```

See also `t.isVoidTypeAnnotation(node, opts)` and `t.assertVoidTypeAnnotation(node, opts)`.

Aliases: `Flow`, `FlowBaseAnnotation`, `FlowType`

---

### whileStatement
```javascript
t.whileStatement(test, body)
```

See also `t.isWhileStatement(node, opts)` and `t.assertWhileStatement(node, opts)`.

Aliases: `BlockParent`, `Loop`, `Scopable`, `Statement`, `While`

 - `test`: `Expression` (required)
 - `body`: `BlockStatement | Statement` (required)

---

### withStatement
```javascript
t.withStatement(object, body)
```

See also `t.isWithStatement(node, opts)` and `t.assertWithStatement(node, opts)`.

Aliases: `Statement`

 - `object`: `Expression` (required)
 - `body`: `BlockStatement | Statement` (required)

---

### yieldExpression
```javascript
t.yieldExpression()
```

See also `t.isYieldExpression(node, opts)` and `t.assertYieldExpression(node, opts)`.

Aliases: `Expression`, `Terminatorless`

 - `argument`: `Expression` (default: `null`)
 - `delegate`: `boolean` (default: `false`)

---
