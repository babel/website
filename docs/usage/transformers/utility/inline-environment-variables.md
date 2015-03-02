---
layout: docs
title: utility.inlineEnvironmentVariables
description: How to use the utility.inlineEnvironmentVariables transformer.
permalink: /docs/usage/transformers/utility/inline-environment-variables
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

Use this in conjunction with the [utility.deadCodeElimination](/docs/usage/transformers/utility/dead-code-elimination)
transformer to output:

```javascript
development();
```
