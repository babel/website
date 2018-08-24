---
id: version-6.26.3-babel-helper-plugin-test-runner
title: babel-helper-plugin-test-runner
sidebar_label: babel-helper-plugin-test-runner
original_id: babel-helper-plugin-test-runner
---

## Usage:

> Check Babel for an example: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-exponentiation-operator/test

1. Inside a `/test` directory, add an `index.js` with the contents `require("babel-helper-plugin-test-runner")(__dirname);`. 
2. Inside `/test/fixtures`, create a folder for each suite (eg; one suite for each feature of your plugin). 
3. Suite folders may contain files and folders. Files will be transformed and run; use `expect()` assertions to verify correct behavior. Folders may contain `actual.js`, `expected.js`, and/or `exec.js`. The output of transforming `actual.js` will be checked to match the contents of `expected.js`. `exec.js`, if it exists, will be transformed and run, as with a file in the suite folder.
3. Install and run `mocha`.
4. To run a specific test, run `mocha --grep testName`. 

