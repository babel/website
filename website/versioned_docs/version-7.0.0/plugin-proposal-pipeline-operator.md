---
id: version-7.0.0-babel-plugin-proposal-pipeline-operator
title: @babel/plugin-proposal-pipeline-operator
sidebar_label: proposal-pipeline-operator
original_id: babel-plugin-proposal-pipeline-operator
---

## Installation

```sh
$ npm install --save-dev @babel/plugin-proposal-pipeline-operator
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": [["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]]
}
```

The Pipeline Proposal is one of three competing implementations. Which implementation the plugin should use is configured with the `"proposal"` option. This option is required and should be one of:

* `"minimal"` – [Minimal Pipeline](https://github.com/tc39/proposal-pipeline-operator/)
* `"fsharp"` - [F#-Style Pipeline](https://github.com/valtech-nyc/proposal-fsharp-pipelines) (Coming Soon!)
* `"smart"` - [Smart Pipeline](https://github.com/js-choi/proposal-smart-pipelines) (Coming Soon!)

Only "minimal" is currently supported. The other two flags are in progress.

When one of the implementations is accepted, it will become the default and the `"proposal"` option will no longer be required.

### Via CLI

```sh
$ babel --plugins @babel/plugin-proposal-pipeline-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-pipeline-operator"]
});
```
