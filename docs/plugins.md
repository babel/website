---
id: plugins
title: Plugins
---

Babel is a compiler. At a high level, it has 3 stages that it runs code in: parsing, transforming, and generation (like many other compilers).

> For an awesome/simple tutorial on compilers, check out [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler), which also explains how Babel itself works on a high level.

Now, out of the box Babel doesn't do anything. It basically acts like `const babel = code => code;` by parsing the code and then generating the same code back out again.

You will need to add some plugins for Babel to do anything (they affect the 2nd stage, transformation).

Don't know where to start? Check out some of our [presets](#presets).

## Presets

Don't want to assemble your own set of plugins? No problem! Presets are sharable [`.babelrc`](babelrc.md) configs or simply an array of babel plugins.

### Official Presets

We've assembled some for common environments:

> Each yearly preset only compiles what was ratified in that year.
> `babel-preset-env` replaces es2015, es2016, es2017 and latest

- [env](z_preset-env.md)
- [react](z_preset-react.md)
- [flow](z_preset-flow.md)

> Many other community maintained presets are available [on npm](https://www.npmjs.com/search?q=babel-preset)!

### Stage-X (Experimental Presets)

Any transforms in stage-x presets are changes to the language that haven't been approved to be part of a release of Javascript (such as ES6/ES2015).

> "Changes to the language are developed by way of a process which provides guidelines for evolving an addition from an idea to a fully specified feature"

<blockquote class="babel-callout babel-callout-danger">
  <h4>Subject to change</h4>
  <p>
    These proposals are subject to change so <strong><em>use with extreme caution</em></strong>, especially for anything pre stage-3. We plan to update stage-x presets when proposals change after each TC39 meeting when possible.
  </p>
</blockquote>

The [TC39](https://github.com/tc39) categorizes proposals into the following stages:

- [Stage 0](z_preset-stage-0.md) - Strawman: just an idea, possible Babel plugin.
- [Stage 1](z_preset-stage-1.md) - Proposal: this is worth working on.
- [Stage 2](z_preset-stage-2.md) - Draft: initial spec.
- [Stage 3](z_preset-stage-3.md) - Candidate: complete spec and initial browser implementations.
- Stage 4 - Finished: will be added to the next yearly release.

For more information, be sure to check out the [current TC39 proposals](https://github.com/tc39/proposals) and its [process document](https://tc39.github.io/process-document).

The TC39 stage process is also explained in detail across a few posts by Yehuda Katz (@wycatz) over at [thefeedbackloop.xyz](https://thefeedbackloop.xyz): [Stage 0 and 1](https://thefeedbackloop.xyz/tc39-a-process-sketch-stages-0-and-1/), [Stage 2](https://thefeedbackloop.xyz/tc39-process-sketch-stage-2/), [Stage 3](https://thefeedbackloop.xyz/tc39-process-sketch-stage-3/), and Stage 4 coming soon.

## Transform Plugins

These plugins apply transformations to your code.

<blockquote class="babel-callout babel-callout-info">
  <p>
    Transform plugins will enable the corresponding syntax plugin so you don't have to specify both.
  </p>
</blockquote>

### ES3

- [es3-member-expression-literals](z_plugin-transform-es3-member-expression-literals.md)
- [es3-property-literals](z_plugin-transform-es3-property-literals.md)

### ES5

- [es5-property-mutators](z_plugin-transform-es5-property-mutators.md)

### ES2015

- [check-es2015-constants](z_plugin-check-es2015-constants.md)
- [es2015-arrow-functions](z_plugin-transform-es2015-arrow-functions.md)
- [es2015-block-scoped-functions](z_plugin-transform-es2015-block-scoped-functions.md)
- [es2015-block-scoping](z_plugin-transform-es2015-block-scoping.md)
- [es2015-classes](z_plugin-transform-es2015-classes.md)
- [es2015-computed-properties](z_plugin-transform-es2015-computed-properties.md)
- [es2015-destructuring](z_plugin-transform-es2015-destructuring.md)
- [es2015-duplicate-keys](z_plugin-transform-es2015-duplicate-keys.md)
- [es2015-for-of](z_plugin-transform-es2015-for-of.md)
- [es2015-function-name](z_plugin-transform-es2015-function-name.md)
- [es2015-literals](z_plugin-transform-es2015-literals.md)
- [es2015-object-super](z_plugin-transform-es2015-object-super.md)
- [es2015-parameters](z_plugin-transform-es2015-parameters.md)
- [es2015-shorthand-properties](z_plugin-transform-es2015-shorthand-properties.md)
- [es2015-spread](z_plugin-transform-es2015-spread.md)
- [es2015-sticky-regex](z_plugin-transform-es2015-sticky-regex.md)
- [es2015-template-literals](z_plugin-transform-es2015-template-literals.md)
- [es2015-typeof-symbol](z_plugin-transform-es2015-typeof-symbol.md)
- [es2015-unicode-regex](z_plugin-transform-es2015-unicode-regex.md)

### ES2016

- [exponentiation-operator](z_plugin-transform-exponentiation-operator.md)

### ES2017

- [async-to-generator](z_plugin-transform-async-to-generator.md)

### Modules

- [es2015-modules-amd](z_plugin-transform-es2015-modules-amd.md)
- [es2015-modules-commonjs](z_plugin-transform-es2015-modules-commonjs.md)
- [es2015-modules-systemjs](z_plugin-transform-es2015-modules-systemjs.md)
- [es2015-modules-umd](z_plugin-transform-es2015-modules-umd.md)

### Experimental

- [async-generator-functions](z_plugin-transform-async-generator-functions.md)
- [async-to-module-method](z_plugin-transform-async-to-module-method.md)
- [class-constructor-call](z_plugin-transform-class-constructor-call.md) (deprecated)
- [class-properties](z_plugin-transform-class-properties.md)
- [decorators](z_plugin-transform-decorators.md)
- [do-expressions](z_plugin-transform-do-expressions.md)
- [export-extensions](z_plugin-transform-export-extensions.md)
- [function-bind](z_plugin-transform-function-bind.md)
- [object-rest-spread](z_plugin-transform-object-rest-spread.md)

### Minification

Check out our [minifier based on Babel](https://github.com/babel/minify)!

These plugins are in the minify repo.

- [inline-environment-variables](z_plugin-transform-inline-environment-variables.md)
- [inline-consecutive-adds](z_plugin-transform-inline-consecutive-adds.md)
- [member-expression-literals](z_plugin-transform-member-expression-literals.md)
- [merge-sibling-variables](z_plugin-transform-merge-sibling-variables.md)
- [minify-booleans](z_plugin-transform-minify-booleans.md)
- [minify-constant-folding](z_plugin-minify-constant-folding.md)
- [minify-dead-code-elimination](z_plugin-minify-dead-code-elimination.md)
- [minify-flip-comparisons](z_plugin-minify-flip-comparisons.md)
- [minify-guarded-expressions](z_plugin-minify-guarded-expressions.md)
- [minify-infinity](z_plugin-minify-infinity.md)
- [minify-mangle-names](z_plugin-minify-mangle-names.md)
- [minify-numeric-literals](z_plugin-minify-numeric-literals.md)
- [minify-replace](z_plugin-minify-replace.md)
- [minify-simplify](z_plugin-minify-simplify.md)
- [minify-type-constructors](z_plugin-minify-type-constructors.md)
- [node-env-inline](z_plugin-transform-node-env-inline.md)
- [property-literals](z_plugin-transform-property-literals.md)
- [regexp-constructors](z_plugin-transform-regexp-constructors.md)
- [remove-console](z_plugin-transform-remove-console.md)
- [remove-debugger](z_plugin-transform-remove-debugger.md)
- [simplify-comparison-operators](z_plugin-transform-simplify-comparison-operators.md)
- [undefined-to-void](z_plugin-transform-undefined-to-void.md)

### React

- [react-constant-elements](z_plugin-transform-react-constant-elements.md)
- [react-display-name](z_plugin-transform-react-display-name.md)
- [react-inline-elements](z_plugin-transform-react-inline-elements.md)
- [react-jsx](z_plugin-transform-react-jsx.md)
- [react-jsx-compat](z_plugin-transform-react-jsx-compat.md)
- [react-jsx-self](z_plugin-transform-react-jsx-self.md)
- [react-jsx-source](z_plugin-transform-react-jsx-source.md)

### Other

- [eval](z_plugin-transform-eval.md)
- [flow-comments](z_plugin-transform-flow-comments.md)
- [flow-strip-types](z_plugin-transform-flow-strip-types.md)
- [jscript](z_plugin-transform-jscript.md)
- [object-assign](z_plugin-transform-object-assign.md)
- [object-set-prototype-of-to-assign](z_plugin-transform-object-set-prototype-of-to-assign.md)
- [proto-to-assign](z_plugin-transform-proto-to-assign.md)
- [regenerator](z_plugin-transform-regenerator.md)
- [runtime](z_plugin-transform-runtime.md)
- [strict-mode](z_plugin-transform-strict-mode.md)

## Misc Plugins

- [external-helpers](z_plugin-external-helpers.md)

## Syntax Plugins

These plugins allow Babel to **parse** specific types of syntax (not transform).

> NOTE: Transform plugins automatically inherit/use the syntax plugins so you don't need to specify the syntax plugin if the corresponding transform plugin is used already.

You can also provide any [`plugins` option](z_babylon.md#plugins) from babylon:

```json
// .babelrc
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

### Experimental

- [async-generators](z_plugin-syntax-async-generators.md)
- [class-properties](z_plugin-syntax-class-properties.md)
- [decorators](z_plugin-syntax-decorators.md)
- [do-expressions](z_plugin-syntax-do-expressions.md)
- [dynamic-import](z_plugin-syntax-dynamic-import.md)
- [export-extensions](z_plugin-syntax-export-extensions.md)
- [flow](z_plugin-syntax-flow.md)
- [function-bind](z_plugin-syntax-function-bind.md)
- [function-sent](z_plugin-syntax-function-sent.md)
- [jsx](z_plugin-syntax-jsx.md)
- [object-rest-spread](z_plugin-syntax-object-rest-spread.md)

### Enabled by default

These plugins have no effect anymore, as a newer babylon version enabled them by default

- [async-functions](z_plugin-syntax-async-functions.md) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))
- [exponentiation-operator](z_plugin-syntax-exponentiation-operator.md) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))
- [trailing-function-commas](z_plugin-syntax-trailing-function-commas.md) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))

### Deprecated

- [class-constructor-call](z_plugin-syntax-class-constructor-call.md)

## Plugin/Preset Paths

If the plugin is on npm, you can pass in the name of the plugin and babel will check that it's installed in `node_modules`

`"plugins": ["babel-plugin-myPlugin"]`

You can also specify an relative/absolute path to your plugin/preset.

`"plugins": ["./node_modules/asdf/plugin"]`

### Plugin/Preset Shorthand

If you prefix the plugin with `babel-plugin-`, you can use a shorthand to leave out that prefix

`"plugins": ["myPlugin"]`

Same with presets

`"presets": ["babel-preset-myPreset"]`

vs

`"presets": ["myPreset"]`

This also works with scoped packages:

`"presets": ["@org/babel-preset-name"]`

shorthand

`"presets": ["@org/name"]`

## Plugin/Preset Ordering

> Ordering matters for each visitor in the plugin.

This means if two transforms both visit the "Program" node, the transforms will run in either plugin or preset order.

- Plugins run before Presets.
- Plugin ordering is first to last.
- Preset ordering is reversed (last to first).

For example:

```json
{
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
```

Will run `transform-decorators-legacy` then `transform-class-properties`.

It is important to remember that with presets, the order is _reversed_. The following:

```json
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ]
}
```

Will run in the following order: `stage-2`, `react`, then `es2015`.

This is mostly for ensuring backwards compatibility, since most users list "es2015" before "stage-0". For more information, see [notes on potential traversal API changes](https://github.com/babel/notes/blob/master/2016/2016-08/august-01.md#potential-api-changes-for-traversal).

## Plugin/Preset Options

Both plugins and presets can have options specified by wrapping the name and an options object in an array inside your config.

For example:

```json
{
  "plugins": [
    ["transform-async-to-module-method", {
      "module": "bluebird",
      "method": "coroutine"
    }]
  ]
}
```

Settings options for presets works exactly the same:

```json
{
  "presets": [
    ["es2015", {
      "loose": true,
      "modules": false
    }]
  ]
}
```

## Plugin Development

Please refer to the excellent [babel-handbook](https://github.com/thejameskyle/babel-handbook)
to learn how to create your own plugins.

The simple plugin that reverses names (from the homepage):

```js
export default function () {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split("").reverse().join("");
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
    require("babel-preset-es2015"),
  ],
  plugins: [
    [require("babel-plugin-transform-es2015-template-literals"), { spec: true }],
    require("babel-plugin-transform-es3-member-expression-literals"),
  ],
};
```

For more info, check out the [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset) section on presets or just look at the [es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015) preset repo as an example.
