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

The pipeline proposal is one of three competing implementations. Configure with proposal to use with the required `"proposal"` option.

| Value | Proposal | Version added |
| ----- | -------- | ------------- |
| `"minimal"` | [Minimal F#-style pipes](https://github.com/tc39/proposal-pipeline-operator/) | `v7.0.0`
| `"fsharp"` | [F#-style pipes with `await`](https://github.com/valtech-nyc/proposal-fsharp-pipelines) | `v7.5.0`
| `"hack"` | [Hack-style pipes](https://github.com/js-choi/proposal-hack-pipes) | `v7.15.0`
| `"smart"` | [Smart-mix pipes](https://github.com/js-choi/proposal-smart-pipelines) (deprecated) | `v7.3.0`

If `"proposal": "hack"` is used, then a `"topicToken": "%"` option must also be included.

The `"proposal": "smart"` option is deprecated and subject to removal in a future major version.

When TC39 accepts one of the proposals, that proposal will become the default and the `"proposal"` option will no longer be required.

### Via CLI

```sh
$ babel --plugins @babel/plugin-proposal-pipeline-operator script.js
```

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
