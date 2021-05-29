---
id: babel-plugin-proposal-pipeline-operator
title: @babel/plugin-proposal-pipeline-operator
sidebar_label: pipeline-operator
---

## Installation

```sh
$ npm install --save-dev @babel/plugin-proposal-pipeline-operator
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": [
    ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]
  ]
}
```

The pipeline proposal is one of four competing implementations. Configure with proposal to use with the required `"proposal"` option.

| Value | Proposal | Version added |
| ----- | -------- | ------------- |
| `"minimal"` | [Minimal F#-style pipes](https://github.com/tc39/proposal-pipeline-operator/) | `v7.0.0`
| `"fsharp"` | [F#-style pipes with `await`](https://github.com/valtech-nyc/proposal-fsharp-pipelines) | `v7.5.0`
| `"hack"` | [Hack-style pipes](https://github.com/js-choi/proposal-hack-pipes) | `v7.15.0`
| `"smart"` | [Smart-mix pipes](https://github.com/js-choi/proposal-smart-pipelines) (deprecated) | `v7.3.0`

If `"proposal": "hack"` is used, then a `"topicToken": "#"` option must also be included. In the future, other choices for `topicToken` will be added.

The `"proposal": "smart"` option is deprecated and subject to removal in a future major version.

When TC39 accepts one of the proposals, that proposal will become the default and the `"proposal"` option will no longer be required.

### Summary of proposals’ behavior

| Original expression | [Minimal F# pipes](https://github.com/tc39/proposal-pipeline-operator/)<br>`{proposal: "minimal"}` | [F# pipes with `await`](https://github.com/valtech-nyc/proposal-fsharp-pipelines/)<br>`{proposal: "fsharp"}` | [Hack pipes](https://github.com/js-choi/proposal-hack-pipes/)<br>`{proposal: "hack",`<br>`topicToken: "#"}` |
| --- | --- | --- | --- |
| `o.m(x)` | `x \|> o.m` | `x \|> o.m` | `x \|> o.m(#)` |
| `o.m(0, x)` | `x \|> y=>o.m(0, y)` | `x \|> y=>o.m(0, y)` | `x \|> o.m(0, #)` |
| `new o.m(x)` | `x \|> y=>new o.m(y)` | `x \|> y=>new o.m(y)` | `x \|> new o.m(#)` |
| `x + 1` | `x \|> y=>y + 1` | `x \|> y=>y + 1` | `x \|> # + 1` |
| `[0, x]` | `x \|> y=>[0, y]` | `x \|> y=>[0, y]` | `x \|> [0, #]` |
| `{ key: x }` | `x \|> y=>({ key: y })` | `x \|> y=>({ key: y })` | `x \|> { key: # }` |
| `await o.m(x)` | Not supported | `x \|> o.m \|> await` | `x \|> await o.m(#)` |
| `yield o.m(x)` | Not supported | Not supported | `x \|> yield o.m(#)` |

### Via CLI

Because this plugin requires a configuration option, it [cannot be directly configured from the CLI](https://github.com/babel/babel/issues/4161). Use a [config file](/docs/en/config-files) instead with the CLI, to add and configure this plugin.

### Via Node API

```javascript
require("@babel/core").transformSync("code", {
  plugins: [
    [ "@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" } ],
  ],
});
```

```javascript
require("@babel/core").transformSync("code", {
  plugins: [
    [ "@babel/plugin-proposal-pipeline-operator", { proposal: "fsharp" } ],
  ],
});
```

```javascript
require("@babel/core").transformSync("code", {
  plugins: [
    [ "@babel/plugin-proposal-pipeline-operator", { proposal: "hack": topicToken: "%" } ],
  ],
});
```
