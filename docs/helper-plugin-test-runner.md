---
id: babel-helper-plugin-test-runner
title: @babel/helper-plugin-test-runner
sidebar_label: helper-plugin-test-runner
---

## Usage:

> Check Babel for an example: https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-exponentiation-operator/test

1. Inside a `/test` directory, add an `index.js` with the contents
```js
import runner from "@babel/helper-plugin-test-runner";

runner(__dirname);
```
2. Inside `/test/fixtures`, create a folder for each suite (eg; one suite for each feature of your plugin).
3. Suite folders may contain files and folders. Files will be transformed and run; use `expect()` assertions to verify correct behavior. Folders may contain `input.js`, `output.js`, and/or `exec.js`. The output of transforming `input.js` will be checked to match the contents of `output.js`. `exec.js`, if it exists, will be transformed and run, as with a file in the suite folder.
3. To run a specific test, run `TEST_GREP=testName make test`. [Read more](https://github.com/babel/babel/blob/main/CONTRIBUTING.md#running-lintingtests).
