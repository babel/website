---
layout: docs
title: Transformers
description: What are the various transformers?
permalink: /docs/usage/transformers/
---

A transformer is a module with a specific goal that is ran against your code to transform it. For example,
the `es6.arrowFunctions` transformer has the very specific goal of transforming [ES6 Arrow Functions](https://babeljs.io/docs/learn-es6#arrows)
to the equivalent ES3. This allows transformers to be completely unaware of the other transformations happening
so that you can easily chain them together.

## ES3

 - [es3.memberExpressionLiterals](/docs/usage/transformers/es3/member-expression-literals)
 - [es3.propertyLiterals](/docs/usage/transformers/es3/property-literals)

## ES5

 - [es5.properties.mutators](/docs/usage/transformers/es5/properties-mutators)

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
- [es7.comprehensions](/docs/learn-es6#comprehensions)
- [es7.classProperties](https://gist.github.com/jeffmo/054df782c05639da2adb)
- [es7.decorators](https://github.com/wycats/javascript-decorators)
- [es7.exportExtensions](https://github.com/leebyron/ecmascript-more-export-from)
- [es7.exponentiationOperator](https://github.com/rwaldron/exponentiation-operator)
- [es7.objectRestSpread](https://github.com/sebmarkbage/ecmascript-rest-spread)
- [es7.trailingFunctionCommas](https://github.com/jeffmo/es-trailing-function-commas)

<blockquote class="babel-callout babel-callout-warning">
  <h4>Disabled by default</h4>
  <p>
    These are only usable if you enable staged support. See <a href="/docs/usage/experimental">experimental usage</a> for information.
  </p>
</blockquote>

## Other

 - [flow](/docs/usage/transformers/other/flow)
 - [react](/docs/usage/transformers/other/react)
 - [reactCompat](/docs/usage/transformers/other/react-compat)
 - [regenerator](/docs/usage/transformers/other/regenerator)
 - [strict](/docs/usage/transformers/other/strict)
 - [jscript](/docs/usage/transformers/other/jscript)

## Optional

Babel also includes some optional transformers for those who want to take their code that extra mile.

These are disabled by default, see [usage](#usage) for instructions on how to enable them.

 - [es6.spec.blockScoping](/docs/usage/transformers/es6/spec-block-scoping)
 - [es6.spec.symbols](/docs/usage/transformers/es6/spec-symbols)
 - [es6.spec.templateLiterals](/docs/usage/transformers/es6/spec-template-literals)
 - [asyncToGenerator](/docs/usage/transformers/other/async-to-generator)
 - [bluebirdCoroutines](/docs/usage/transformers/other/bluebird-coroutines)
 - [runtime](/docs/usage/runtime)
 - [minification.deadCodeElimination](/docs/usage/transformers/minification/dead-code-elimination)
 - [minification.propertyLiterals](/docs/usage/transformers/minification/property-literals)
 - [minification.memberExpressionLiterals](/docs/usage/transformers/minification/member-expression-literals)
 - [utility.inlineEnvironmentVariables](/docs/usage/transformers/utility/inline-environment-variables)
 - [utility.inlineExpressions](/docs/usage/transformers/utility/inline-expressions)
 - [utility.removeConsole](/docs/usage/transformers/utility/remove-console)
 - [utility.removeDebugger](/docs/usage/transformers/utility/remove-debugger)
 - [spec.protoToAssign](/docs/usage/transformers/spec/proto-to-assign)
 - [spec.undefinedToVoid](/docs/usage/transformers/spec/undefined-to-void)
 - [validation.undeclaredVariableCheck](/docs/usage/transformers/validation/undeclared-variable-check)
 - [validation.react](/docs/usage/transformers/validation/react)

### Usage

```javascript
require("babel").transform("code", { optional: ["transformerName"] });
```

```sh
$ babel --optional transformerName script.js
```
