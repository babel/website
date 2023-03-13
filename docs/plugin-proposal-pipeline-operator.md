---
id: babel-plugin-proposal-pipeline-operator
title: "@babel/plugin-proposal-pipeline-operator"
sidebar_label: pipeline-operator
---

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-pipeline-operator
```

## Usage

The pipeline operator has several competing proposals.
Configure which proposal to use with the required `"proposal"` option.
Its value is `"hack"` by default.

| Value | Proposal | Version added |
| ----- | -------- | ------------- |
| `"hack"` | [Hack-style pipes](https://github.com/tc39/proposal-pipeline-operator) | `v7.15.0`
| ~~`"fsharp"`~~ | [F#-style pipes with `await`](https://github.com/valtech-nyc/proposal-fsharp-pipelines) | `v7.5.0`
| ~~`"minimal"`~~ | [Minimal F#-style pipes](https://github.com/tc39/proposal-pipeline-operator/tree/abb51b3aef5c17d5971808aee49ebe6b75d7280f) | `v7.0.0`
| ~~`"smart"`~~ | [Smart-mix pipes](https://github.com/js-choi/proposal-smart-pipelines) (deprecated) | `v7.3.0`

If `"proposal"` is omitted, or if `"proposal": "hack"` is used, then a `"topicToken"` option must be included. The `topicToken` must be one of `"%"`, `"^^"`, `"@@"`, `"^"`, or `"#"`.

The `"proposal": "minimal"`, `"fsharp"`, and `"smart"` options are **deprecated** and subject to removal in a future major version.

### Examples
The following examples use `topicToken: "^^"`.

From [react/scripts/jest/jest-cli.js](https://github.com/facebook/react/blob/12adaffef7105e2714f82651ea51936c563fe15c/scripts/jest/jest-cli.js#L295-L303).
```js title="JavaScript"
// Status quo
console.log(
  chalk.dim(
    `$ ${Object.keys(envars)
      .map(envar => `${envar}=${envars[envar]}`)
      .join(' ')}`,
    'node',
    args.join(' ')
  )
);

// With pipes
Object.keys(envars)
  .map(envar => `${envar}=${envars[envar]}`)
  .join(' ')
  |> `$ ${^^}`
  |> chalk.dim(^^, 'node', args.join(' '))
  |> console.log(^^);
```

From [jquery/src/core/init.js](https://github.com/jquery/jquery/blob/acb7c49c8d42f601fa347661b1118959079f6b52/src/core/init.js#L51-L55).
```js title="JavaScript"
// Status quo
jQuery.merge( this, jQuery.parseHTML(
  match[ 1 ],
  context && context.nodeType ? context.ownerDocument || context : document,
  true
) );

// With pipes
context
  |> (^^ && ^^.nodeType ? ^^.ownerDocument || ^^ : document)
  |> jQuery.parseHTML(match[1], ^^, true)
  |> jQuery.merge(^^);
```

(For a summary of deprecated proposal modes’ behavior, see the [pipe wiki’s table of previous proposals](https://github.com/tc39/proposal-pipeline-operator/wiki#overview-of-previous-proposals).)


### With a configuration file (recommended)

With `^^` topic token:

```json title="babel.config.json"
{
  "plugins": [
    ["@babel/plugin-proposal-pipeline-operator", { "topicToken": "^^" }]
  ]
}
```

With `@@` topic token:

```json title="babel.config.json"
{
  "plugins": [
    ["@babel/plugin-proposal-pipeline-operator", { "topicToken": "@@" }]
  ]
}
```

### Via CLI

Because this plugin requires a configuration option, it [cannot be directly configured from the CLI](https://github.com/babel/babel/issues/4161). Use a [config file](config-files.md) instead with the CLI, to add and configure this plugin.

### Via Node API

With `^^` topic token:

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [
    [ "@babel/plugin-proposal-pipeline-operator", { topicToken: "^^" } ],
  ],
});
```

With `@@` topic token:

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [
    [ "@babel/plugin-proposal-pipeline-operator", { topicToken: "@@" } ],
  ],
});
```
