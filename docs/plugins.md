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

> Each yearly preset only compiles what was ratified in that year.
> `babel-preset-env` replaces es2015, es2016, es2017, latest

- [env](/docs/plugins/preset-env/)
- [es2015](/docs/plugins/preset-es2015/)
- [es2016](/docs/plugins/preset-es2016/)
- [es2017](/docs/plugins/preset-es2017/)
- [latest (deprecated in favor of env)](/docs/plugins/preset-latest/)
- [react](/docs/plugins/preset-react/)
- [flow](/docs/plugins/preset-flow/)

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

- [Stage 0](/docs/plugins/preset-stage-0/) - Strawman: just an idea, possible Babel plugin.
- [Stage 1](/docs/plugins/preset-stage-1/) - Proposal: this is worth working on.
- [Stage 2](/docs/plugins/preset-stage-2/) - Draft: initial spec.
- [Stage 3](/docs/plugins/preset-stage-3/) - Candidate: complete spec and initial browser implementations.
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

- [es3-member-expression-literals](/docs/plugins/transform-es3-member-expression-literals/)
- [es3-property-literals](/docs/plugins/transform-es3-property-literals/)

### ES5

- [es5-property-mutators](/docs/plugins/transform-es5-property-mutators/)

### ES2015

- [check-es2015-constants](/docs/plugins/check-es2015-constants/)
- [es2015-arrow-functions](/docs/plugins/transform-es2015-arrow-functions/)
- [es2015-block-scoped-functions](/docs/plugins/transform-es2015-block-scoped-functions/)
- [es2015-block-scoping](/docs/plugins/transform-es2015-block-scoping/)
- [es2015-classes](/docs/plugins/transform-es2015-classes/)
- [es2015-computed-properties](/docs/plugins/transform-es2015-computed-properties/)
- [es2015-destructuring](/docs/plugins/transform-es2015-destructuring/)
- [es2015-duplicate-keys](/docs/plugins/transform-es2015-duplicate-keys/)
- [es2015-for-of](/docs/plugins/transform-es2015-for-of/)
- [es2015-function-name](/docs/plugins/transform-es2015-function-name/)
- [es2015-literals](/docs/plugins/transform-es2015-literals/)
- [es2015-object-super](/docs/plugins/transform-es2015-object-super/)
- [es2015-parameters](/docs/plugins/transform-es2015-parameters/)
- [es2015-shorthand-properties](/docs/plugins/transform-es2015-shorthand-properties/)
- [es2015-spread](/docs/plugins/transform-es2015-spread/)
- [es2015-sticky-regex](/docs/plugins/transform-es2015-sticky-regex/)
- [es2015-template-literals](/docs/plugins/transform-es2015-template-literals/)
- [es2015-typeof-symbol](/docs/plugins/transform-es2015-typeof-symbol/)
- [es2015-unicode-regex](/docs/plugins/transform-es2015-unicode-regex/)

### ES2016

- [exponentiation-operator](/docs/plugins/transform-exponentiation-operator/)

### ES2017

- [async-to-generator](/docs/plugins/transform-async-to-generator/)

### Modules

- [es2015-modules-amd](/docs/plugins/transform-es2015-modules-amd/)
- [es2015-modules-commonjs](/docs/plugins/transform-es2015-modules-commonjs/)
- [es2015-modules-systemjs](/docs/plugins/transform-es2015-modules-systemjs/)
- [es2015-modules-umd](/docs/plugins/transform-es2015-modules-umd/)

### Experimental

- [async-generator-functions](/docs/plugins/transform-async-generator-functions/)
- [async-to-module-method](/docs/plugins/transform-async-to-module-method/)
- [class-constructor-call](/docs/plugins/transform-class-constructor-call/) (deprecated)
- [class-properties](/docs/plugins/transform-class-properties/)
- [decorators](/docs/plugins/transform-decorators/)
- [do-expressions](/docs/plugins/transform-do-expressions/)
- [export-extensions](/docs/plugins/transform-export-extensions/)
- [function-bind](/docs/plugins/transform-function-bind/)
- [object-rest-spread](/docs/plugins/transform-object-rest-spread/)

### Minification

Check out our [minifier based on Babel](https://github.com/babel/babili)!

These plugins are in the minify repo.

- [inline-environment-variables](/docs/plugins/transform-inline-environment-variables/)
- [inline-consecutive-adds](/docs/plugins/transform-inline-consecutive-adds/)
- [member-expression-literals](/docs/plugins/transform-member-expression-literals/)
- [merge-sibling-variables](/docs/plugins/transform-merge-sibling-variables/)
- [minify-booleans](/docs/plugins/transform-minify-booleans/)
- [minify-constant-folding](/docs/plugins/minify-constant-folding/)
- [minify-dead-code-elimination](/docs/plugins/minify-dead-code-elimination/)
- [minify-flip-comparisons](/docs/plugins/minify-flip-comparisons/)
- [minify-guarded-expressions](/docs/plugins/minify-guarded-expressions/)
- [minify-infinity](/docs/plugins/minify-infinity/)
- [minify-mangle-names](/docs/plugins/minify-mangle-names/)
- [minify-numeric-literals](/docs/plugins/minify-numeric-literals/)
- [minify-replace](/docs/plugins/minify-replace/)
- [minify-simplify](/docs/plugins/minify-simplify/)
- [minify-type-constructors](/docs/plugins/minify-type-constructors/)
- [node-env-inline](/docs/plugins/transform-node-env-inline/)
- [property-literals](/docs/plugins/transform-property-literals/)
- [regexp-constructors](/docs/plugins/transform-regexp-constructors/)
- [remove-console](/docs/plugins/transform-remove-console/)
- [remove-debugger](/docs/plugins/transform-remove-debugger/)
- [simplify-comparison-operators](/docs/plugins/transform-simplify-comparison-operators/)
- [undefined-to-void](/docs/plugins/transform-undefined-to-void/)

### React

- [react-constant-elements](/docs/plugins/transform-react-constant-elements/)
- [react-display-name](/docs/plugins/transform-react-display-name/)
- [react-inline-elements](/docs/plugins/transform-react-inline-elements/)
- [react-jsx](/docs/plugins/transform-react-jsx/)
- [react-jsx-compat](/docs/plugins/transform-react-jsx-compat/)
- [react-jsx-self](/docs/plugins/transform-react-jsx-self/)
- [react-jsx-source](/docs/plugins/transform-react-jsx-source/)

### Other

- [eval](/docs/plugins/transform-eval/)
- [flow-comments](/docs/plugins/transform-flow-comments/)
- [flow-strip-types](/docs/plugins/transform-flow-strip-types/)
- [jscript](/docs/plugins/transform-jscript/)
- [object-assign](/docs/plugins/transform-object-assign/)
- [object-set-prototype-of-to-assign](/docs/plugins/transform-object-set-prototype-of-to-assign/)
- [proto-to-assign](/docs/plugins/transform-proto-to-assign/)
- [regenerator](/docs/plugins/transform-regenerator/)
- [runtime](/docs/plugins/transform-runtime/)
- [strict-mode](/docs/plugins/transform-strict-mode/)

## Misc Plugins

- [external-helpers](/docs/plugins/external-helpers/)
- [undeclared-variables-check](/docs/plugins/undeclared-variables-check/)

## Syntax Plugins

These plugins allow Babel to **parse** specific types of syntax (not transform).

> NOTE: Transform plugins automatically inherit/use the syntax plugins so you don't need to specify the syntax plugin if the corresponding transform plugin is used already.

You can also provide any [`plugins` option](https://github.com/babel/babylon/#plugins) from babylon:

```json
// .babelrc
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

### Experimental

- [async-generators](/docs/plugins/syntax-async-generators/)
- [class-properties](/docs/plugins/syntax-class-properties/)
- [decorators](/docs/plugins/syntax-decorators/)
- [do-expressions](/docs/plugins/syntax-do-expressions/)
- [dynamic-import](/docs/plugins/syntax-dynamic-import/)
- [export-extensions](/docs/plugins/syntax-export-extensions/)
- [flow](/docs/plugins/syntax-flow/)
- [function-bind](/docs/plugins/syntax-function-bind/)
- [function-sent](/docs/plugins/syntax-function-sent/)
- [jsx](/docs/plugins/syntax-jsx/)
- [object-rest-spread](/docs/plugins/syntax-object-rest-spread/)

### Enabled by default

These plugins have no effect anymore, as a newer babylon version enabled them by default

- [async-functions](/docs/plugins/syntax-async-functions/) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))
- [exponentiation-operator](/docs/plugins/syntax-exponentiation-operator/) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))
- [trailing-function-commas](/docs/plugins/syntax-trailing-function-commas/) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))

### Deprecated

- [class-constructor-call](/docs/plugins/syntax-class-constructor-call/)

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

This is mostly for ensuring backwards compatibility, since most users list "es2015" before "stage-0". For more information, see [notes on potential traversal API changes](https://github.com/babel/notes/blob/master/2016-08/august-01.md#potential-api-changes-for-traversal).

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
export default function ({ types: t }) {
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
