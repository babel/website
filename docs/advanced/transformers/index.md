---
layout: docs
title: Transformers
description: What are the various transformers?
permalink: /docs/advanced/transformers/
redirect_from:
 - /docs/usage/transformers/
---

A transformer is a module with a specific goal that is ran against your code to transform it. For example,
the `es6.arrowFunctions` transformer has the very specific goal of transforming [ES6 Arrow Functions](https://babeljs.io/docs/learn-es6#arrows)
to the equivalent ES3. This allows transformers to be completely unaware of the other transformations happening
so that you can easily chain them together.

## ES3

 - [es3.memberExpressionLiterals](/docs/advanced/transformers/es3/member-expression-literals)
 - [es3.propertyLiterals](/docs/advanced/transformers/es3/property-literals)

## ES5

 - [es5.properties.mutators](/docs/advanced/transformers/es5/properties-mutators)

## ES6

 - [es6.arrowFunctions](/docs/learn-es6#arrows)
 - [es6.blockScoping](/docs/learn-es6#let-const)
 - [es6.classes](/docs/learn-es6#classes)
 - [es6.constants](/docs/learn-es6#let-const)
 - [es6.destructuring](/docs/learn-es6#destructuring)
 - [es6.forOf](/docs/learn-es6#iterators-for-of)
 - [es6.modules](/docs/learn-es6#modules)
 - [es6.parameters.default](/docs/learn-es6#default-rest-spread)
 - [es6.parameters.rest](/docs/learn-es6#default-rest-spread)
 - [es6.properties.computed](/docs/learn-es6#enhanced-object-literals)
 - [es6.properties.shorthand](/docs/learn-es6#enhanced-object-literals)
 - [es6.spread](/docs/learn-es6#default-rest-spread)
 - [es6.tailCall](/docs/learn-es6#tail-calls)
 - [es6.templateLiterals](/docs/learn-es6#template-strings)
 - [es6.regex.unicode](/docs/learn-es6#unicode)
 - es6.regex.sticky

## ES7 (Experimental)

- [es7.asyncFunctions](https://github.com/lukehoban/ecmascript-asyncawait)
- [es7.classProperties](https://gist.github.com/jeffmo/054df782c05639da2adb)
- [es7.comprehensions](/docs/learn-es6#comprehensions)
- [es7.decorators](https://github.com/wycats/javascript-decorators)
- [es7.exponentiationOperator](https://github.com/rwaldron/exponentiation-operator)
- [es7.exportExtensions](https://github.com/leebyron/ecmascript-more-export-from)
- [es7.functionBind](https://github.com/zenparsing/es-function-bind)
- [es7.objectRestSpread](https://github.com/sebmarkbage/ecmascript-rest-spread)
- [es7.trailingFunctionCommas](https://github.com/jeffmo/es-trailing-function-commas)

<blockquote class="babel-callout babel-callout-warning">
  <h4>Disabled by default</h4>
  <p>
    These are only usable if you enable staged support. See <a href="/docs/usage/experimental">experimental usage</a> for information.
  </p>
</blockquote>

## Other

 - [flow](/docs/advanced/transformers/other/flow)
 - [react](/docs/advanced/transformers/other/react)
 - [reactCompat](/docs/advanced/transformers/other/react-compat)
 - [regenerator](/docs/advanced/transformers/other/regenerator)
 - [strict](/docs/advanced/transformers/other/strict)
 - [jscript](/docs/advanced/transformers/other/jscript)

## Optional

Babel also includes some optional transformers for those who want to take their code that extra mile.

These are disabled by default, see [usage](#usage) for instructions on how to enable them.

 - [es6.spec.blockScoping](/docs/advanced/transformers/es6/spec-block-scoping)
 - [es6.spec.symbols](/docs/advanced/transformers/es6/spec-symbols)
 - [es6.spec.templateLiterals](/docs/advanced/transformers/es6/spec-template-literals)
 - [asyncToGenerator](/docs/advanced/transformers/other/async-to-generator)
 - [bluebirdCoroutines](/docs/advanced/transformers/other/bluebird-coroutines)
 - [runtime](/docs/advanced/runtime)
 - [minification.deadCodeElimination](/docs/advanced/transformers/minification/dead-code-elimination)
 - [minification.inlineExpressions](/docs/advanced/transformers/utility/inline-expressions)
 - [minification.memberExpressionLiterals](/docs/advanced/transformers/minification/member-expression-literals)
 - [minification.propertyLiterals](/docs/advanced/transformers/minification/property-literals)
 - [minification.removeConsole](/docs/advanced/transformers/utility/remove-console)
 - [minification.removeDebugger](/docs/advanced/transformers/utility/remove-debugger)
 - [utility.inlineEnvironmentVariables](/docs/advanced/transformers/utility/inline-environment-variables)
 - [spec.protoToAssign](/docs/advanced/transformers/spec/proto-to-assign)
 - [spec.undefinedToVoid](/docs/advanced/transformers/spec/undefined-to-void)
 - [validation.undeclaredVariableCheck](/docs/advanced/transformers/validation/undeclared-variable-check)
 - [validation.react](/docs/advanced/transformers/validation/react)

### Usage

```javascript
require("babel").transform("code", { optional: ["transformerName"] });
```

```sh
$ babel --optional transformerName script.js
```
