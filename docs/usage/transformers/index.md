---
layout: docs
title: Transformers
description: What are the various transformers?
permalink: /docs/usage/transformers/
---

A transformer is a module with a specific goal that iis ran against your code to transform it. For example,
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
 - [es6.unicodeRegex](/docs/learn-es6#unicode)

## ES7 (Experimental)

- [es7.abstractReferences](https://github.com/zenparsing/es-abstract-refs)
- [es7.comprehensions](/docs/learn-es6#comprehensions)
- [es7.exponentiationOperator](https://github.com/rwaldron/exponentiation-operator)
- [es7.objectSpread](https://github.com/sebmarkbage/ecmascript-rest-spread)

<blockquote class="babel-callout babel-callout-warning">
  <h4>Disabled by default</h4>
  <p>
    These are only usable if you enable experimental support. See <a href="/docs/usage/experimental">experimental usage</a> for information.
  </p>
</blockquote>

## Other

 - [flow](/docs/usage/transformers/other/flow)
 - [react](/docs/usage/transformers/other/react)
 - [reactCompat](/docs/usage/transformers/other/react-compat)
 - [regenerator](/docs/usage/transformers/other/regenerator)
 - [strict](/docs/usage/transformers/other/strict)

## Optional

Babel also includes some optional transformer for those who want to take their code that extra mile.

These are disabled by default, see [usage](#usage) for how to enable them.

 - [asyncToGenerator](/docs/usage/transformers/other/async-to-generator)
 - [bluebirdCoroutines](/docs/usage/transformers/other/bluebird-coroutines)
 - [runtime](/docs/usage/runtime)
 - [utility.deadCodeElimination](/docs/usage/transformers/utility/dead-code-elimination)
 - [utility.inlineEnvironmentVariables](/docs/usage/transformers/utility/inline-environment-variables)
 - [utility.inlineExpressions](/docs/usage/transformers/utility/inline-expressions)
 - [utility.removeConsole](/docs/usage/transformers/utility/remove-console)
 - [utility.removeDebugger](/docs/usage/transformers/utility/remove-debugger)
 - [spec.protoToAssign](/docs/usage/transformers/spec/proto-to-assign)
 - [spec.typeofSymbol](/docs/usage/transformers/spec/typeof-symbol)
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

## Playground

 - [playground.memoizationOperator](/docs/usage/playground#memoization-assignment-operator)
 - [playground.methodBinding](/docs/usage/playground#method-binding)
 - [playground.objectGetterMemoization](/docs/usage/playground#object-getter-memoization)

<blockquote class="babel-callout babel-callout-warning">
  <h4>Disabled by default</h4>
  <p>
    These are only usable if you enable playground support. See <a href="/docs/usage/playground">playground usage</a> for information.
  </p>
</blockquote>
