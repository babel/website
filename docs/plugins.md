---
layout: docs
title: Plugins
description:
permalink: /docs/plugins/
redirect_from:
 - /docs/advanced/plugins/
 - /docs/usage/modules/
---

Babel is a compiler. At a high level, it has 3 stages that it runs code in: parsing, transforming, and generation (like many other compilers).

> For an awesome/simple tutorial on compilers, check out [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler), which also explains how Babel itself works on a high level.

Now, out of the box Babel doesn't do anything. It basically acts like `const babel = code => code;` by parsing the code and then generating the same code back out again.

You will need to add some plugins for Babel to do anything (they affect the 2nd stage, transformation).

Don't know where to start? Check out some of our [presets](#presets).

## Presets

Don't want to assemble your own set of plugins? No problem! Presets are sharable [`.babelrc`](/docs/usage/babelrc) configs or simply an array of babel plugins.

### Official Presets

We've assembled some for common environments:

> Each yearly preset only compiles what was ratified in that year. Use `preset-latest` to transform all yearly presets

 - [env (new)](https://github.com/babel/babel-preset-env)
 - [latest](/docs/plugins/preset-latest)
 - [es2017](/docs/plugins/preset-es2017)
 - [es2016](/docs/plugins/preset-es2016)
 - [es2015](/docs/plugins/preset-es2015)
 - [react](/docs/plugins/preset-react)

> Many other community maintained presets are available [on npm](https://www.npmjs.com/search?q=babel-preset)!

### Stage-X (Experimental Presets)

Any transforms in stage-x presets are changes to the language that haven't been approved to be part of a release of Javascript (such as ES6/ES2015).

> "Changes to the language are developed by way of a process which provides guidelines for evolving an addition from an idea to a fully specified feature"

<blockquote class="babel-callout babel-callout-danger">
  <h4>Subject to change</h4>
  <p>
    These proposals are subject to change so <strong><em>use with extreme caution</em></strong>, especially for anything pre stage-3.
  </p>
</blockquote>

The [TC39](https://github.com/tc39) categorises proposals into 4 stages:

 - [stage-0](/docs/plugins/preset-stage-0) - Strawman: just an idea, possible Babel plugin.
 - [stage-1](/docs/plugins/preset-stage-1) - Proposal: this is worth working on.
 - [stage-2](/docs/plugins/preset-stage-2) - Draft: initial spec.
 - [stage-3](/docs/plugins/preset-stage-3) - Candidate: complete spec and initial browser implementations.
 - stage-4 - Finished: will be added to the next yearly release.

Also check out the [current tc39 proposals](https://github.com/tc39/proposals) and its [process document](https://tc39.github.io/process-document).

## Transform Plugins

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
 - [es2015-constants](/docs/plugins/check-es2015-constants)
 - [es2015-destructuring](/docs/plugins/transform-es2015-destructuring)
 - [es2015-duplicate-keys](/docs/plugins/transform-es2015-duplicate-keys) 
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

### ES2016
 - [exponentiation-operator](/docs/plugins/transform-exponentiation-operator)

### ES2017
 - [async-to-generator](/docs/plugins/transform-async-to-generator)

### Modules
 - [es2015-modules-amd](/docs/plugins/transform-es2015-modules-amd)
 - [es2015-modules-commonjs](/docs/plugins/transform-es2015-modules-commonjs)
 - [es2015-modules-systemjs](/docs/plugins/transform-es2015-modules-systemjs)
 - [es2015-modules-umd](/docs/plugins/transform-es2015-modules-umd)

### Experimental
<!-- - [async-functions](/docs/plugins/transform-async-functions) -->
 - [async-to-module-method](/docs/plugins/transform-async-to-module-method)
 - [class-constructor-call](/docs/plugins/transform-class-constructor-call) (Deprecated)
 - [class-properties](/docs/plugins/transform-class-properties)
 - [decorators](/docs/plugins/transform-decorators)
 - [do-expressions](/docs/plugins/transform-do-expressions)
 - [export-extensions](/docs/plugins/transform-export-extensions)
 - [function-bind](/docs/plugins/transform-function-bind)
 - [object-rest-spread](/docs/plugins/transform-object-rest-spread)

### Minification

Check out our [minifier based on Babel](https://github.com/babel/babili)!

These plugins are in the minify repo.

 - [member-expression-literals](/docs/plugins/transform-member-expression-literals)
 - [merge-sibling-variables](/docs/plugins/transform-merge-sibling-variables)
 - [minify-booleans](/docs/plugins/transform-minify-booleans)
 - [property-literals](/docs/plugins/transform-property-literals)
 - [remove-console](/docs/plugins/transform-remove-console)
 - [remove-debugger](/docs/plugins/transform-remove-debugger)
 - [simplify-comparison-operators](/docs/plugins/transform-simplify-comparison-operators)
 - [undefined-to-void](/docs/plugins/transform-undefined-to-void)
 - [inline-environment-variables](/docs/plugins/transform-inline-environment-variables)
 - [node-env-inline](/docs/plugins/transform-node-env-inline)

### React
 - [react-constant-elements](/docs/plugins/transform-react-constant-elements)
 - [react-display-name](/docs/plugins/transform-react-display-name)
 - [react-inline-elements](/docs/plugins/transform-react-inline-elements)
 - [react-jsx](/docs/plugins/transform-react-jsx)
 - [react-jsx-compat](/docs/plugins/transform-react-jsx-compat)
 - [react-jsx-self](/docs/plugins/transform-react-jsx-self)
 - [react-jsx-source](/docs/plugins/transform-react-jsx-source)

### Other
 - [eval](/docs/plugins/transform-eval)
 - [flow-comments](/docs/plugins/transform-flow-comments)
 - [flow-strip-types](/docs/plugins/transform-flow-strip-types)
 - [jscript](/docs/plugins/transform-jscript)
 - [object-assign](/docs/plugins/transform-object-assign)
 - [object-set-prototype-of-to-assign](/docs/plugins/transform-object-set-prototype-of-to-assign)
 - [proto-to-assign](/docs/plugins/transform-proto-to-assign)
 - [regenerator](/docs/plugins/transform-regenerator)
 - [runtime](/docs/plugins/transform-runtime)
 - [strict-mode](/docs/plugins/transform-strict-mode)

## Misc Plugins

 - [external-helpers](/docs/plugins/external-helpers)
 - [undeclared-variables-check](/docs/plugins/undeclared-variables-check)

## Syntax Plugins

These plugins allow Babel to **parse** specific types of syntax (not transform).

> NOTE: Transform plugins automatically inherit/use the syntax plugins so you don't need to specify the syntax plugin if the corresponding transform plugin is used already.

You can also provide any [`plugins` option](https://github.com/babel/babylon/#plugins) from babylon:

```js
// .babelrc
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

### Experimental
 - [async-generators](/docs/plugins/syntax-async-generators)
 - [class-properties](/docs/plugins/syntax-class-properties)
 - [decorators](/docs/plugins/syntax-decorators)
 - [do-expressions](/docs/plugins/syntax-do-expressions)
 - [export-extensions](/docs/plugins/syntax-export-extensions)
 - [flow](/docs/plugins/syntax-flow)
 - [function-bind](/docs/plugins/syntax-function-bind)
 - [function-sent](/docs/plugins/syntax-function-sent)
 - [jsx](/docs/plugins/syntax-jsx)
 - [object-rest-spread](/docs/plugins/syntax-object-rest-spread)

### Enabled by default

These plugins have no effect anymore, as a newer babylon version enabled them by default

 - [async-functions](/docs/plugins/syntax-async-functions) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))
 - [exponentiation-operator](/docs/plugins/syntax-exponentiation-operator) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))
 - [trailing-function-commas](/docs/plugins/syntax-trailing-function-commas) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))

### Deprecated
 - [class-constructor-call](/docs/plugins/syntax-class-constructor-call)

## Plugin/Preset Paths

If the plugin is on npm, you can pass in the name of the plugin and babel will check that it's installed in `node_modules`

`"plugins": ["babel-plugin-myPlugin"]`

You can also specify an relative/absolute path to your plugin/preset.

`"plugins": ["./node_modules/asdf/plugin"]`

### Preset/Plugin Shorthand

If you prefix the plugin with `babel-plugin-`, you can use a shorthand to leave out that prefix

`"plugins": ["myPlugin"]`

Same with presets

`"presets": ["babel-preset-myPreset"]`

vs

`"presets": ["myPreset"]`

This also works with scoped packages

```js
{
  presets: ["@org/babel-preset-name"], // actual package
  presets: ["@org/name"] // shorthand name
}
```

## Plugin/Preset Ordering

Ordering matters for each visitor in the plugin. This means if two transforms both visit "Program", the transforms will run in either plugin or preset order.

Plugins run before Presets.

Plugin ordering is first to last.

```js
"plugins": [
  "transform-decorators-legacy", // will run first
  "transform-class-properties" // will run second
]
```

Preset ordering is reversed (last to first).

> Yes this is confusing, see [babel/notes #2](https://github.com/babel/notes/blob/master/2016-08/august-01.md#potential-api-changes-for-traversal).

> I believe the reason why (for backwards compatability) is that most users had listed "es2015" first and "stage-0" second.
> And stage-0 would run before es2015.

```js
"presets": [
  "es2015", // will run third
  "react", // will run second
  "stage-2" // will run first
]
```

## Plugin/Presets Options

Plugins and Presets can both specify options. You can do so in your config by wrapping it in an array and providing a options object. For example:

```js
{
  "plugins": [
    ["transform-async-to-module-method", {
      "module": "bluebird",
      "method": "coroutine"
    }]
  ]
}

{
  "presets": [
    ["es2015", { "loose": true, "modules": false }]
  ]
}
```

## Plugin Development

Please refer to the excellent [babel-handbook](https://github.com/thejameskyle/babel-handbook)
to learn how to create your own plugins.

The simple plugin that reverses names (from the homepage):

```js
export default function ({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split('').reverse().join('');
      }
    }
  };
}
```

## Creating a Preset

To make your own preset, you just need to export a config.

```js
// Presets can contain other presets, and plugins with options.
module.exports = {
  presets: [
    require('babel-preset-es2015'),
  ],
  plugins: [
    [require('babel-plugin-transform-es2015-template-literals'), { spec: true }],
    require('babel-plugin-transform-es3-member-expression-literals'),
  ],
};
```

For more info, check out the [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset) section on presets or just look at the [es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015) preset repo as an example.
