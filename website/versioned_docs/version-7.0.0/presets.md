---
id: version-7.0.0-presets
title: Presets
original_id: presets
---

Don't want to assemble your own set of plugins? No problem! Presets can act as an array of Babel plugins or even a sharable [`options`](options.md) config.

## Official Presets

We've assembled some for common environments:

- [@babel/preset-env](preset-env.md)
- [@babel/preset-flow](preset-flow.md)
- [@babel/preset-react](preset-react.md)
- [@babel/preset-typescript](preset-typescript.md)

> Many other community maintained presets are available [on npm](https://www.npmjs.com/search?q=babel-preset)!

## Stage-X (Experimental Presets)

Any transforms in stage-x presets are changes to the language that haven't been approved to be part of a release of Javascript (such as ES6/ES2015).

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

The TC39 stage process is also explained in detail across a few posts by Yehuda Katz (@wycatz) over at [thefeedbackloop.xyz](https://thefeedbackloop.xyz): [Stage 0 and 1](https://thefeedbackloop.xyz/tc39-a-process-sketch-stages-0-and-1/), [Stage 2](https://thefeedbackloop.xyz/tc39-process-sketch-stage-2/), [Stage 3](https://thefeedbackloop.xyz/tc39-process-sketch-stage-3/)


## Creating a Preset

To make your own preset, you just need to export a config.

> It could just return an array of plugins..

```js
module.exports = function() {
  return {
    plugins: [
      "pluginA",
      "pluginB",
      "pluginC",
    ]
  };
}
```

> Presets can contain other presets, and plugins with options.

```js
module.exports = () => ({
  presets: [
    require("@babel/preset-env"),
  ],
  plugins: [
    [require("@babel/plugin-proposal-class-properties"), { loose: true }],
    require("@babel/plugin-proposal-object-rest-spread"),
  ],
});
```

For more info, check out the [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset) section on presets.

## Preset Paths

If the preset is on npm, you can pass in the name of the preset and babel will check that it's installed in `node_modules`

```json
{
  "presets": ["babel-preset-myPreset"]
}
```

You can also specify an relative/absolute path to your presets.

```json
{
  "presets": ["./myProject/myPreset"]
}
```

### Preset Shorthand

If the name of the package is prefixed with `babel-preset-`, you can use a shorthand:

```js
{
  "presets": [
    "myPreset",
    "babel-preset-myPreset" // equivalent
  ]
}
```

This also works with scoped packages:

```js
{
  "presets": [
  	"@org/babel-preset-name",
  	"@org/name" // equivalent
  ]
}
```

## Preset Ordering

Preset ordering is reversed (last to first).

```json
{
  "presets": [
    "a",
    "b",
    "c"
  ]
}
```

Will run in the following order: `c`, `b`, then `a`.

This was mostly for ensuring backwards compatibility, since most users listed "es2015" before "stage-0".

## Preset Options

Both plugins and presets can have options specified by wrapping the name and an options object in an array inside your config.

For specifying no options, these are all equivalent:

```json
{
  "presets": [
    "presetA",
    ["presetA"],
    ["presetA", {}],
  ]
}
```

To specify an option, pass an object with the keys as the option names.

```json
{
  "presets": [
    ["@babel/preset-env", {
      "loose": true,
      "modules": false
    }]
  ]
}
```
