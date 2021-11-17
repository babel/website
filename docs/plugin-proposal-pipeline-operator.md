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

The pipeline operator has several competing proposals.
Configure which proposal to use with the required `"proposal"` option.
Its value is `"hack"` by default.

| Value | Proposal | Version added |
| ----- | -------- | ------------- |
| ~~`"minimal"`~~ | [Minimal F#-style pipes](https://github.com/tc39/proposal-pipeline-operator/) | `v7.0.0`
| ~~`"fsharp"`~~ | [F#-style pipes with `await`](https://github.com/valtech-nyc/proposal-fsharp-pipelines) | `v7.5.0`
| `"hack"` | [Hack-style pipes](https://github.com/js-choi/proposal-hack-pipes) | `v7.15.0`
| ~~`"smart"`~~ | [Smart-mix pipes](https://github.com/js-choi/proposal-smart-pipelines) (deprecated) | `v7.3.0`

If `"proposal"` is omitted, or if `"proposal": "hack"` is used, then a `"topicToken": "^^"`, `"topicToken": "^"`, or `"topicToken": "#"` option must also be included.

The `"proposal": "minimal"`, `"fsharp"`, and `"smart"` options are **deprecated** and subject to removal in a future major version.

### Examples
The following examples use `topicToken: "^^"`.

From [react/scripts/jest/jest-cli.js][].
```js
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

From [jquery/src/core/init.js][].
```js
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

[react/scripts/jest/jest-cli.js]: https://github.com/facebook/react/blob/17.0.2/scripts/jest/jest-cli.js
[jquery/src/core/init.js]: https://github.com/jquery/jquery/blob/2.2-stable/src/core/init.js

(For a summary of deprecated proposal modes’ behavior, see the [pipe wiki’s table of previous proposals](https://github.com/tc39/proposal-pipeline-operator/wiki#overview-of-previous-proposals).)


### With a configuration file (recommended)

With `^^` topic token:

```json
{
  "plugins": [
    ["@babel/plugin-proposal-pipeline-operator", { "topicToken": "^^" }]
  ]
}
```

With `@@` topic token:

```json
{
  "plugins": [
    ["@babel/plugin-proposal-pipeline-operator", { "topicToken": "@@" }]
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
    [ "@babel/plugin-proposal-pipeline-operator", { topicToken: "^^" } ],
  ],
});
```

With `@@` topic token:

```javascript
require("@babel/core").transformSync("code", {
  plugins: [
    [ "@babel/plugin-proposal-pipeline-operator", { topicToken: "@@" } ],
  ],
});
```
