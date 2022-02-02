---
id: babel-plugin-syntax-pipeline-operator
title: @babel/plugin-syntax-pipeline-operator
sidebar_label: syntax-pipeline-operator
---

> #### Syntax only
>
> It's unlikely you want to use this plugin directly as it only enables Babel to parse this syntax. Instead, use [plugin-proposal-pipeline-operator](plugin-proposal-pipeline-operator.md) to _both_ parse and transform this syntax.

## Installation

```sh
$ npm install @babel/plugin-syntax-pipeline-operator
```

## Usage

### With a configuration file (Recommended)

With `^^` topic token:

```json
{
  "plugins": [
    [ "@babel/plugin-syntax-pipeline-operator", { "topicToken": "^^" } ]
  ]
}
```

With `@@` topic token:

```json
{
  "plugins": [
    [ "@babel/plugin-syntax-pipeline-operator", { "topicToken": "@@" } ]
  ]
}
```

### Via CLI

Because this plugin requires a configuration option, it [cannot be directly configured from the CLI](https://github.com/babel/babel/issues/4161). Use a [config file](/docs/en/config-files) instead with the CLI, to add and configure this plugin.

### Via Node API

With `^^` topic token:

```javascript
require("@babel/core").transformSync("code", {
  plugins: [
    [ "@babel/plugin-syntax-pipeline-operator", { topicToken: "^^" } ],
  ],
});
```

With `@@` topic token:

```javascript
require("@babel/core").transformSync("code", {
  plugins: [
    [ "@babel/plugin-syntax-pipeline-operator", { topicToken: "@@" } ],
  ],
});
```
