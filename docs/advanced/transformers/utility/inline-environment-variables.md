---
layout: docs
title: utility.inlineEnvironmentVariables
description: How to use the utility.inlineEnvironmentVariables transformer.
permalink: /docs/advanced/transformers/utility/inline-environment-variables/
redirect_from:
 - /docs/usage/transformers/utility/inline-environment-variables/
---

Inlines environment variables.

## Usage

```javascript
require("babel").transform("code", { optional: ["utility.inlineEnvironmentVariables"] });
```

```sh
$ babel --optional utility.inlineEnvironmentVariables script.js
```

## Example

For example compiling the following file:

**script.js**

```javascript
if (process.env.NODE_ENV === "development") {
  development();
} else {
  production();
}
```

with the command:

```sh
$ NODE_ENV=development babel --optional utility.inlineEnvironmentVariables script.js
```

outputs:

```javascript
if ("development" === "development") {
  development();
} else {
  production();
}
```

Use this in conjunction with the [minification.deadCodeElimination](/docs/usage/transformers/minification/dead-code-elimination)
transformer to output:

```javascript
development();
```

## Require hook

**NOTE:** When used in conjunction with the require hook, the require cache will **not** respond to changes
in environment variables.
