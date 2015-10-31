---
layout: docs
title: Plugins
description:
permalink: /docs/plugins/
redirect_from:
 - /docs/advanced/plugins/
---

Out of the box Babel doesn't do anything. In order to actually do anything to your code
you need to enable plugins. Don't know where to start? Check out some of the
[presets](#presets).

## Presets

Don't want to assemble your own set of plugins? No problem! Presets are sharable configs.
We've assembled some for common environments:

 - [es2015](/docs/plugins/preset-es2015)
 - [stage-0](/docs/plugins/preset-stage-0)
 - [stage-1](/docs/plugins/preset-stage-1)
 - [stage-2](/docs/plugins/preset-stage-2)
 - [stage-3](/docs/plugins/preset-stage-3)
 - [react](/docs/plugins/preset-react)

## Misc

 - [external-helpers](/docs/plugins/external-helpers)
 - [undeclared-variables-check](/docs/plugins/undeclared-variables-check)

## Syntax

These plugins allow Babel to parse specific types of syntax.

 - [async-functions](/docs/plugins/syntax-async-functions)
 - [async-generators](/docs/plugins/syntax-async-generators)
 - [class-constructor-call](/docs/plugins/syntax-class-constructor-call)
 - [class-properties](/docs/plugins/syntax-class-properties)
 - [decorators](/docs/plugins/syntax-decorators)
 - [do-expressions](/docs/plugins/syntax-do-expressions)
 - [exponentiation-operator](/docs/plugins/syntax-exponentiation-operator)
 - [export-extensions](/docs/plugins/syntax-export-extensions)
 - [flow](/docs/plugins/syntax-flow)
 - [function-bind](/docs/plugins/syntax-function-bind)
 - [jsx](/docs/plugins/syntax-jsx)
 - [object-rest-spread](/docs/plugins/syntax-object-rest-spread)
 - [trailing-function-commas](/docs/plugins/syntax-trailing-function-commas)

## Transform

These plugins apply transformations to your code.

<blockquote class="babel-callout babel-callout-info">
  <p>
    Transform plugins will enable the corresponding syntax plugin so you don't have to specify both.
  </p>
</blockquote>

### ES3
 - [es3-member-expression-literals](/docs/plugins/transform-es3-member-expression-literals)
 - [es3-property-literals](/docs/plugins/transform-es3-property-literals)

### ES5
 - [es5-property-mutators](/docs/plugins/transform-es5-property-mutators)

### ES2015
 - [es2015-arrow-functions](/docs/plugins/transform-es2015-arrow-functions)
 - [es2015-block-scoped-functions](/docs/plugins/transform-es2015-block-scoped-functions)
 - [es2015-block-scoping](/docs/plugins/transform-es2015-block-scoping)
 - [es2015-classes](/docs/plugins/transform-es2015-classes)
 - [es2015-computed-properties](/docs/plugins/transform-es2015-computed-properties)
 - [es2015-constants](/docs/plugins/transform-es2015-constants)
 - [es2015-destructuring](/docs/plugins/transform-es2015-destructuring)
 - [es2015-for-of](/docs/plugins/transform-es2015-for-of)
 - [es2015-function-name](/docs/plugins/transform-es2015-function-name)
 - [es2015-literals](/docs/plugins/transform-es2015-literals)
 - [es2015-object-super](/docs/plugins/transform-es2015-object-super)
 - [es2015-parameters](/docs/plugins/transform-es2015-parameters)
 - [es2015-shorthand-properties](/docs/plugins/transform-es2015-shorthand-properties)
 - [es2015-spread](/docs/plugins/transform-es2015-spread)
 - [es2015-sticky-regex](/docs/plugins/transform-es2015-sticky-regex)
 - [es2015-template-literals](/docs/plugins/transform-es2015-template-literals)
 - [es2015-typeof-symbol](/docs/plugins/transform-es2015-typeof-symbol)
 - [es2015-unicode-regex](/docs/plugins/transform-es2015-unicode-regex)
 
### Modules
 - [es2015-modules-amd](/docs/plugins/transform-es2015-modules-amd)
 - [es2015-modules-commonjs](/docs/plugins/transform-es2015-modules-commonjs)
 - [es2015-modules-systemjs](/docs/plugins/transform-es2015-modules-systemjs)
 - [es2015-modules-umd](/docs/plugins/transform-es2015-modules-umd)

### Experimental
<!-- - [async-functions](/docs/plugins/transform-async-functions) -->
 - [async-to-generator](/docs/plugins/transform-async-to-generator)
 - [async-to-module-method](/docs/plugins/transform-async-to-module-method)
 - [class-constructor-call](/docs/plugins/transform-class-constructor-call)
 - [class-properties](/docs/plugins/transform-class-properties)
 - [decorators](/docs/plugins/transform-decorators)
 - [do-expressions](/docs/plugins/transform-do-expressions)
 - [exponentiation-operator](/docs/plugins/transform-exponentiation-operator)
 - [export-extensions](/docs/plugins/transform-export-extensions)
 - [function-bind](/docs/plugins/transform-function-bind)
 - [object-rest-spread](/docs/plugins/transform-object-rest-spread)
 
### Minification
 - [member-expression-literals](/docs/plugins/transform-member-expression-literals)
 - [merge-sibling-variables](/docs/plugins/transform-merge-sibling-variables)
 - [minify-booleans](/docs/plugins/transform-minify-booleans)
 - [property-literals](/docs/plugins/transform-property-literals)
 - [remove-console](/docs/plugins/transform-remove-console)
 - [remove-debugger](/docs/plugins/transform-remove-debugger)
 - [simplify-comparison-operators](/docs/plugins/transform-simplify-comparison-operators)

### React
 - [react-constant-elements](/docs/plugins/transform-react-constant-elements)
 - [react-display-name](/docs/plugins/transform-react-display-name)
 - [react-inline-elements](/docs/plugins/transform-react-inline-elements)
 - [react-jsx](/docs/plugins/transform-react-jsx)
 - [react-jsx-compat](/docs/plugins/transform-react-jsx-compat)

### Other
 - [eval](/docs/plugins/transform-eval)
 - [flow-strip-types](/docs/plugins/transform-flow-strip-types)
 - [inline-environment-variables](/docs/plugins/transform-inline-environment-variables)
 - [jscript](/docs/plugins/transform-jscript)
 - [node-env-inline](/docs/plugins/transform-node-env-inline)
 - [object-assign](/docs/plugins/transform-object-assign)
 - [object-set-prototype-of-to-assign](/docs/plugins/transform-object-set-prototype-of-to-assign)
 - [proto-to-assign](/docs/plugins/transform-proto-to-assign)
 - [regenerator](/docs/plugins/transform-regenerator)
 - [runtime](/docs/plugins/transform-runtime)
 - [strict-mode](/docs/plugins/transform-strict-mode)
 - [undefined-to-void](/docs/plugins/transform-undefined-to-void)
