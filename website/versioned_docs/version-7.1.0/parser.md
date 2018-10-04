---
id: version-7.1.0-babel-parser
title: @babel/parser
sidebar_label: parser
original_id: babel-parser
---

<p align="left">
  The Babel parser (previously Babylon) is a JavaScript parser used in <a href="https://github.com/babel/babel">Babel</a>.
</p>

 - The latest ECMAScript version enabled by default (ES2017).
 - Comment attachment.
 - Support for JSX, Flow, Typescript.
 - Support for experimental language proposals (accepting PRs for anything at least [stage-0](https://github.com/tc39/proposals/blob/master/stage-0-proposals.md)).

## Credits

Heavily based on [acorn](https://github.com/marijnh/acorn) and [acorn-jsx](https://github.com/RReverser/acorn-jsx),
thanks to the awesome work of [@RReverser](https://github.com/RReverser) and [@marijnh](https://github.com/marijnh).

## API

### `babelParser.parse(code, [options])`

### `babelParser.parseExpression(code, [options])`

`parse()` parses the provided `code` as an entire ECMAScript program, while
`parseExpression()` tries to parse a single Expression with performance in
mind. When in doubt, use `.parse()`.

### Options

- **allowImportExportEverywhere**: By default, `import` and `export`
  declarations can only appear at a program's top level. Setting this
  option to `true` allows them anywhere where a statement is allowed.

- **allowAwaitOutsideFunction**: By default, `await` use is not allowed
  outside of an async function. Set this to `true` to accept such
  code.

- **allowReturnOutsideFunction**: By default, a return statement at
  the top level raises an error. Set this to `true` to accept such
  code.

- **allowSuperOutsideMethod**: By default, `super` use is not allowed
  outside of class and object methods. Set this to `true` to accept such
  code.

- **sourceType**: Indicate the mode the code should be parsed in. Can be
  one of `"script"`, `"module"`, or `"unambiguous"`. Defaults to `"script"`. `"unambiguous"` will make @babel/parser attempt to _guess_, based on the presence of ES6 `import` or `export` statements. Files with ES6 `import`s and `export`s are considered `"module"` and are otherwise `"script"`.

- **sourceFilename**: Correlate output AST nodes with their source filename.  Useful when generating code and source maps from the ASTs of multiple input files.

- **startLine**: By default, the first line of code parsed is treated as line 1. You can provide a line number to alternatively start with. Useful for integration with other source tools.

- **plugins**: Array containing the plugins that you want to enable.

- **strictMode**: By default, ECMAScript code is parsed as strict only if a
  `"use strict";` directive is present or if the parsed file is an ECMAScript
  module. Set this option to `true` to always parse files in strict mode.

- **ranges**: Adds a `ranges` property to each node: `[node.start, node.end]`

- **tokens**: Adds all parsed tokens to a `tokens` property on the `File` node

### Output

The Babel parser generates AST according to [Babel AST format][].
It is based on [ESTree spec][] with the following deviations:

> There is now an `estree` plugin which reverts these deviations

- [Literal][] token is replaced with [StringLiteral][], [NumericLiteral][], [BooleanLiteral][], [NullLiteral][], [RegExpLiteral][]
- [Property][] token is replaced with [ObjectProperty][] and [ObjectMethod][]
- [MethodDefinition][] is replaced with [ClassMethod][]
- [Program][] and [BlockStatement][] contain additional `directives` field with [Directive][] and [DirectiveLiteral][]
- [ClassMethod][], [ObjectProperty][], and [ObjectMethod][] value property's properties in [FunctionExpression][] is coerced/brought into the main method node.

AST for JSX code is based on [Facebook JSX AST][].

[Babel AST format]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md
[ESTree spec]: https://github.com/estree/estree

[Literal]: https://github.com/estree/estree/blob/master/es5.md#literal
[Property]: https://github.com/estree/estree/blob/master/es5.md#property
[MethodDefinition]: https://github.com/estree/estree/blob/master/es2015.md#methoddefinition

[StringLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#stringliteral
[NumericLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#numericliteral
[BooleanLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#booleanliteral
[NullLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#nullliteral
[RegExpLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#regexpliteral
[ObjectProperty]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#objectproperty
[ObjectMethod]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#objectmethod
[ClassMethod]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#classmethod
[Program]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#programs
[BlockStatement]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#blockstatement
[Directive]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#directive
[DirectiveLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#directiveliteral
[FunctionExpression]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#functionexpression

[Facebook JSX AST]: https://github.com/facebook/jsx/blob/master/AST.md

### Semver

The Babel Parser follows semver in most situations. The only thing to note is that some spec-compliancy bug fixes may be released under patch versions.

For example: We push a fix to early error on something like [#107](https://github.com/babel/babylon/pull/107) - multiple default exports per file. That would be considered a bug fix even though it would cause a build to fail.

### Example

```javascript
require("@babel/parser").parse("code", {
  // parse in strict mode and allow module declarations
  sourceType: "module",

  plugins: [
    // enable jsx and flow syntax
    "jsx",
    "flow"
  ]
});
```

### Plugins

#### Miscellaneous

| Name | Code Example |
|------|--------------|
| `estree` ([repo](https://github.com/estree/estree)) | n/a |

#### Language extensions

| Name | Code Example |
|------|--------------|
| `flow` ([repo](https://github.com/facebook/flow)) | `var a: string = "";` |
| `flowComments` ([docs](https://flow.org/en/docs/types/comments/)) | `/*:: type Foo = {...}; */` |
| `jsx` ([repo](https://facebook.github.io/jsx/)) | `<a attr="b">{s}</a>` |
| `typescript` ([repo](https://github.com/Microsoft/TypeScript)) | `var a: string = "";` |

#### ECMAScript [proposals](https://github.com/babel/proposals)

| Name | Code Example |
|------|--------------|
| `asyncGenerators` ([proposal](https://github.com/tc39/proposal-async-iteration)) | `async function*() {}`, `for await (let a of b) {}` |
| `bigInt` ([proposal](https://github.com/tc39/proposal-bigint)) | `100n` |
| `classProperties` ([proposal](https://github.com/tc39/proposal-class-public-fields)) | `class A { b = 1; }` |
| `classPrivateProperties` ([proposal](https://github.com/tc39/proposal-private-fields)) | `class A { #b = 1; }` |
| `classPrivateMethods` ([proposal](https://github.com/tc39/proposal-private-methods)) | `class A { #c() {} }` |
| `decorators` ([proposal](https://github.com/tc39/proposal-decorators)) <br> `decorators-legacy` | `@a class A {}` |
| `doExpressions` ([proposal](https://github.com/tc39/proposal-do-expressions)) | `var a = do { if (true) { 'hi'; } };` |
| `dynamicImport` ([proposal](https://github.com/tc39/proposal-dynamic-import)) | `import('./guy').then(a)` |
| `exportDefaultFrom` ([proposal](https://github.com/leebyron/ecmascript-export-default-from)) | `export v from "mod"` |
| `exportNamespaceFrom` ([proposal](https://github.com/leebyron/ecmascript-export-ns-from)) | `export * as ns from "mod"` |
| `functionBind` ([proposal](https://github.com/zenparsing/es-function-bind)) | `a::b`, `::console.log` |
| `functionSent` | `function.sent` |
| `importMeta` ([proposal](https://github.com/tc39/proposal-import-meta)) | `import.meta.url` |
| `logicalAssignment` ([proposal](https://github.com/tc39/proposal-logical-assignment)) | `a &&= b` |
| `nullishCoalescingOperator` ([proposal](https://github.com/babel/proposals/issues/14)) | `a ?? b` |
| `numericSeparator` ([proposal](https://github.com/samuelgoto/proposal-numeric-separator)) | `1_000_000` |
| `objectRestSpread` ([proposal](https://github.com/tc39/proposal-object-rest-spread)) | `var a = { b, ...c };` |
| `optionalCatchBinding` ([proposal](https://github.com/babel/proposals/issues/7)) | `try {throw 0;} catch{do();}` |
| `optionalChaining` ([proposal](https://github.com/tc39/proposal-optional-chaining)) | `a?.b` |
| `pipelineOperator` ([proposal](https://github.com/babel/proposals/issues/29)) | `a &#124;> b` |
| `throwExpressions` ([proposal](https://github.com/babel/proposals/issues/23)) | `() => throw new Error("")` |

#### Plugins options

> NOTE: When a plugin is specified multiple times, only the first options are considered.

- `decorators`:
  - `decoratorsBeforeExport` (`boolean`)
    ```js
    // decoratorsBeforeExport: true
    @dec
    export class C {}

    // decoratorsBeforeExport: false
    export @dec class C {}
    ```
- `pipelineOperator`:
  - `proposal` (required, accepted values: `minimal`)
    There are different proposals for the pipeline operator. This option
    allows to choose which one to use.
    See [What's Happening With the Pipeline (|>) Proposal?](https://babeljs.io/blog/2018/07/19/whats-happening-with-the-pipeline-proposal) for more information.

- `flow`:
  - `all` (`boolean`, default: `false`)
    Some code has different meaning in Flow and in vanilla JavaScript. For example, `foo<T>(x)` is parsed as a call expression with a type argument in Flow, but as a comparsion (`foo < T > x`) accordingly to the ECMAScript specification. By default, `babel-parser` parses those ambigous constructs as Flow types only if the file starts with a `// @flow` pragma.
    Set this option to `true` to always parse files as if `// @flow` was specified.

### FAQ

#### Will the Babel parser support a plugin system?

Previous issues: [#1351](https://github.com/babel/babel/issues/1351), [#6694](https://github.com/babel/babel/issues/6694).

We currently aren't willing to commit to supporting the API for plugins or the resulting ecosystem (there is already enough work maintaining Babel's own plugin system). It's not clear how to make that API effective, and it would limit our ability to refactor and optimize the codebase.

Our current recommendation for those that want to create their own custom syntax is for users to fork the parser.

To consume your custom parser, you can add a plugin to your [options](options.md#plugins) to call the parser via its npm package name or require it if using JavaScript,

```js
const parse = require("custom-fork-of-babel-parser-on-npm-here");

module.exports = {
  plugins: [{
    parserOverride(code, opts) {
      return parse(code, opts);
    },
  }]
}
```
