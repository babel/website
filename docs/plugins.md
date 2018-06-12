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
> `@babel/preset-env` replaces es2015, es2016, es2017 and latest

- [@babel/preset-env](preset-env.md)
- [@babel/preset-flow](preset-flow.md)
- [@babel/preset-react](preset-react.md)
- [@babel/preset-typescript](preset-typescript.md)

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

- [Stage 0](preset-stage-0.md) - Strawman: just an idea, possible Babel plugin.
- [Stage 1](preset-stage-1.md) - Proposal: this is worth working on.
- [Stage 2](preset-stage-2.md) - Draft: initial spec.
- [Stage 3](preset-stage-3.md) - Candidate: complete spec and initial browser implementations.
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

- [member-expression-literals](plugin-transform-member-expression-literals.md)
- [property-literals](plugin-transform-property-literals.md)
- [reserved-words](plugin-transform-reserved-words.md)

### ES5

- [property-mutators](plugin-transform-property-mutators.md)

### ES2015

- [arrow-functions](plugin-transform-arrow-functions.md)
- [block-scoped-functions](plugin-transform-block-scoped-functions.md)
- [block-scoping](plugin-transform-block-scoping.md)
- [classes](plugin-transform-classes.md)
- [computed-properties](plugin-transform-computed-properties.md)
- [destructuring](plugin-transform-destructuring.md)
- [duplicate-keys](plugin-transform-duplicate-keys.md)
- [for-of](plugin-transform-for-of.md)
- [function-name](plugin-transform-function-name.md)
- [instanceof](plugin-transform-instanceof.md)
- [literals](plugin-transform-literals.md)
- [new-target](plugin-transform-new-target.md)
- [object-super](plugin-transform-object-super.md)
- [parameters](plugin-transform-parameters.md)
- [shorthand-properties](plugin-transform-shorthand-properties.md)
- [spread](plugin-transform-spread.md)
- [sticky-regex](plugin-transform-sticky-regex.md)
- [template-literals](plugin-transform-template-literals.md)
- [typeof-symbol](plugin-transform-typeof-symbol.md)
- [unicode-regex](plugin-transform-unicode-regex.md)

### ES2016

- [exponentiation-operator](plugin-transform-exponentiation-operator.md)

### ES2017

- [async-to-generator](plugin-transform-async-to-generator.md)

### ES2018

- [dotall-regex](plugin-transform-dotall-regex.md)

### Modules

- [modules-amd](plugin-transform-modules-amd.md)
- [modules-commonjs](plugin-transform-modules-commonjs.md)
- [modules-systemjs](plugin-transform-modules-systemjs.md)
- [modules-umd](plugin-transform-modules-umd.md)

### Experimental

- [async-generator-functions](plugin-proposal-async-generator-functions.md)
- [class-properties](plugin-proposal-class-properties.md)
- [decorators](plugin-proposal-decorators.md)
- [do-expressions](plugin-proposal-do-expressions.md)
- [export-default-from](plugin-proposal-export-default-from.md)
- [export-namespace-from](plugin-proposal-export-namespace-from.md)
- [function-bind](plugin-proposal-function-bind.md)
- [function-sent](plugin-proposal-function-sent.md)
- [logical-assignment-operators](plugin-proposal-logical-assignment-operators.md)
- [nullish-coalescing-operator](plugin-proposal-nullish-coalescing-operator.md)
- [numeric-separator](plugin-proposal-numeric-separator.md)
- [object-rest-spread](plugin-proposal-object-rest-spread.md)
- [optional-catch-binding](plugin-proposal-optional-catch-binding.md)
- [optional-chaining](plugin-proposal-optional-chaining.md)
- [pipeline-operator](plugin-proposal-pipeline-operator.md)
- [throw-expressions](plugin-proposal-throw-expressions.md)
- [unicode-property-regex](plugin-proposal-unicode-property-regex.md)

### Minification

Check out our [minifier based on Babel](https://github.com/babel/minify)!

These plugins are in the minify repo.

- [inline-consecutive-adds](plugin-transform-inline-consecutive-adds.md)
- [inline-environment-variables](plugin-transform-inline-environment-variables.md)
- [member-expression-literals](plugin-transform-member-expression-literals.md)
- [merge-sibling-variables](plugin-transform-merge-sibling-variables.md)
- [minify-booleans](plugin-transform-minify-booleans.md)
- [minify-builtins](plugin-minify-builtins.md)
- [minify-constant-folding](plugin-minify-constant-folding.md)
- [minify-dead-code-elimination](plugin-minify-dead-code-elimination.md)
- [minify-flip-comparisons](plugin-minify-flip-comparisons.md)
- [minify-guarded-expressions](plugin-minify-guarded-expressions.md)
- [minify-infinity](plugin-minify-infinity.md)
- [minify-mangle-names](plugin-minify-mangle-names.md)
- [minify-numeric-literals](plugin-minify-numeric-literals.md)
- [minify-replace](plugin-minify-replace.md)
- [minify-simplify](plugin-minify-simplify.md)
- [minify-type-constructors](plugin-minify-type-constructors.md)
- [node-env-inline](plugin-transform-node-env-inline.md)
- [property-literals](plugin-transform-property-literals.md)
- [regexp-constructors](plugin-transform-regexp-constructors.md)
- [remove-console](plugin-transform-remove-console.md)
- [remove-debugger](plugin-transform-remove-debugger.md)
- [remove-undefined](plugin-transform-remove-undefined.md)
- [simplify-comparison-operators](plugin-transform-simplify-comparison-operators.md)
- [undefined-to-void](plugin-transform-undefined-to-void.md)

### React

- [react-constant-elements](plugin-transform-react-constant-elements.md)
- [react-display-name](plugin-transform-react-display-name.md)
- [react-inline-elements](plugin-transform-react-inline-elements.md)
- [react-jsx](plugin-transform-react-jsx.md)
- [react-jsx-compat](plugin-transform-react-jsx-compat.md)
- [react-jsx-self](plugin-transform-react-jsx-self.md)
- [react-jsx-source](plugin-transform-react-jsx-source.md)

### Other

- [flow-comments](plugin-transform-flow-comments.md)
- [flow-strip-types](plugin-transform-flow-strip-types.md)
- [jscript](plugin-transform-jscript.md)
- [object-assign](plugin-transform-object-assign.md)
- [object-set-prototype-of-to-assign](plugin-transform-object-set-prototype-of-to-assign.md)
- [proto-to-assign](plugin-transform-proto-to-assign.md)
- [regenerator](plugin-transform-regenerator.md)
- [runtime](plugin-transform-runtime.md)
- [strict-mode](plugin-transform-strict-mode.md)

## Misc Plugins

- [external-helpers](plugin-external-helpers.md)

## Syntax Plugins

These plugins allow Babel to **parse** specific types of syntax (not transform).

> NOTE: Transform plugins automatically inherit/use the syntax plugins so you don't need to specify the syntax plugin if the corresponding transform plugin is used already.

You can also provide any [`plugins` option](parser.md#plugins) from the Babel parser:

```json
// .babelrc
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

### Experimental

- [async-generators](plugin-syntax-async-generators.md)
- [class-properties](plugin-syntax-class-properties.md)
- [decorators](plugin-syntax-decorators.md)
- [do-expressions](plugin-syntax-do-expressions.md)
- [dynamic-import](plugin-syntax-dynamic-import.md)
- [export-default-from](plugin-syntax-export-default-from.md)
- [export-namespace-from](plugin-syntax-export-namespace-from.md)
- [flow](plugin-syntax-flow.md)
- [function-bind](plugin-syntax-function-bind.md)
- [function-sent](plugin-syntax-function-sent.md)
- [import-meta](plugin-syntax-import-meta.md)
- [jsx](plugin-syntax-jsx.md)
- [logical-assignment-operators](plugin-syntax-logical-assignment-operators.md)
- [nullish-coalescing-operator](plugin-syntax-nullish-coalescing-operator.md)
- [numeric-separator](plugin-syntax-numeric-separator.md)
- [object-rest-spread](plugin-syntax-object-rest-spread.md)
- [optional-catch-binding](plugin-syntax-optional-catch-binding.md)
- [optional-chaining](plugin-syntax-optional-chaining.md)
- [pipeline-operator](plugin-syntax-pipeline-operator.md)
- [throw-expressions](plugin-syntax-throw-expressions.md)
- [typescript](plugin-syntax-typescript.md)

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
    require("@babel/preset-env"),
  ],
  plugins: [
    [require("@babel/plugin-transform-template-literals"), { spec: true }],
    require("@babel/plugin-transform-member-expression-literals"),
  ],
};
```

For more info, check out the [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset) section on presets.
