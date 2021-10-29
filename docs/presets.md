---
id: presets
title: Presets
---

Babel presets can act as sharable set of Babel plugins and/or config [`options`](options.md).

## Official Presets

We've assembled a few presets for common environments:

- [@babel/preset-env](preset-env.md) for compiling ES2015+ syntax
- [@babel/preset-typescript](preset-typescript.md) for [TypeScript](https://www.typescriptlang.org)
- [@babel/preset-react](preset-react.md) for [React](https://reactjs.org/)
- [@babel/preset-flow](preset-flow.md) for [Flow](https://flow.org/)

## Other Integrations

If you aren't using Babel directly, the framework you are using may have its own configuration for you to use or extend. Many other community maintained presets are available [on npm](https://www.npmjs.com/search?q=babel-preset)!

[Next.js](https://nextjs.org/docs/advanced-features/customizing-babel-config) | [Nuxt.js](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#babel) | [Parcel](https://en.parceljs.org/javascript.html#babel) | [Jest](https://jestjs.io/docs/getting-started#using-babel) | [Gatsby](https://www.gatsbyjs.com/docs/how-to/custom-configuration/babel)

<div id="preset-paths"></div>

## Using a Preset

Within a Babel config, if the preset is on [npm](https://www.npmjs.com/search?q=babel-preset), you can pass in the name of the preset and Babel will check that it's installed in `node_modules` already. This is added to the [presets](options.md#presets) config option, which takes an array.

```json
{
  "presets": ["babel-preset-myPreset", "@babel/preset-env"]
}
```

Otherwise, you can also specify a relative or absolute path to your presets.

```json
{
  "presets": ["./myProject/myPreset"]
}
```

See [name normalization](options.md#name-normalization) for more specifics on configuring the path of a plugin or preset.

## Stage-X (Experimental Presets)

<blockquote class="babel-callout babel-callout-danger">
  <h4>Deprecated</h4>
  <p>
    As of Babel 7, we've decided to deprecate the Stage-X presets and stop publishing them. Because these proposals are inherently subject to change, it seems better to ask users to specify individual proposals as plugins vs. a catch all preset that you would need to check up on anyway. Check out our <a href="https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets">blog</a> for more context.
  </p>
</blockquote>

Any transforms in stage-x presets are changes to the language that haven't been approved to be part of a release of JavaScript (such as ES6/ES2015).

The [TC39](https://github.com/tc39) categorizes proposals into the following stages:

- [Stage 0](preset-stage-0.md) - Strawman: just an idea, possible Babel plugin.
- [Stage 1](preset-stage-1.md) - Proposal: this is worth working on.
- [Stage 2](preset-stage-2.md) - Draft: initial spec.
- [Stage 3](preset-stage-3.md) - Candidate: complete spec and initial browser implementations.
- Stage 4 - Finished: will be added to the next yearly release.

For more information, be sure to check out the [current TC39 proposals](https://github.com/tc39/proposals) and its [process document](https://tc39.github.io/process-document).

The TC39 stage process is also explained in detail across a few posts by Yehuda Katz (@wycatz) over at [thefeedbackloop.xyz](https://thefeedbackloop.xyz): [Stage 0 and 1](https://thefeedbackloop.xyz/tc39-a-process-sketch-stages-0-and-1/), [Stage 2](https://thefeedbackloop.xyz/tc39-process-sketch-stage-2/), [Stage 3](https://thefeedbackloop.xyz/tc39-process-sketch-stage-3/)

## Creating a Preset

To make your own preset (either for local usage or to npm), you need to export a config object.

> It could just return an array of plugins..

```js
module.exports = function() {
  return {
    plugins: ["pluginA", "pluginB", "pluginC"],
  };
};
```

> Presets can contain other presets, and plugins with options.

```js
module.exports = () => ({
  presets: [require("@babel/preset-env")],
  plugins: [
    [require("@babel/plugin-proposal-class-properties"), { loose: true }],
    require("@babel/plugin-proposal-object-rest-spread"),
  ],
});
```

For more info, check out the [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset) section on presets.

## Preset Ordering

Preset ordering is reversed (last to first).

```json
{
  "presets": ["a", "b", "c"]
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
    "presetA", // bare string
    ["presetA"], // wrapped in array
    ["presetA", {}] // 2nd argument is an empty options object
  ]
}
```

To specify an option, pass an object with the keys as the option names.

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```
