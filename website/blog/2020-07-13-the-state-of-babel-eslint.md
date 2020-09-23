---
layout: post
title:  "The State of babel-eslint"
author: Kai Cataldo
authorURL: https://kaicataldo.com
date:   2020-07-13 0:00:00
categories: announcements
share_text: "The State of babel-eslint"
---

`babel-eslint` is moved to `@babel/eslint-parser`!

<!-- truncate -->

## The Past

Existing as a compatibility layer between Babel and ESLint – two projects maintained by two separate teams – `babel-eslint` has been a difficult package to maintain since the beginning. Some of the challenges the team has faced while maintaining `babel-eslint`:

* `babel-eslint` has historically been maintained by the Babel team, and ensuring that ESLint's core rules (which are released every two weeks) work with experimental syntax is a monumental task.
* Babel's internal AST representation differs from [ESTree](https://github.com/estree/estree), the AST specification used by ESLint. As a result, ESLint-compatibility requires that Babel's parser has a plugin that outputs ASTs that are ESTree-compatible.
* While Babel enables the use of experimental syntax, ESLint core only supports syntax once it reaches [Stage 4](https://tc39.es/process-document/) and is finalized in the spec. This means that ESLint's core rules aren't designed to work with syntax that is Stage 3 and below. Additionally, ESLint has been blocked by the finalizing of the ESTree spec, leading to an even larger discrepancy in the syntax the two projects support.
* The version of Babel's parser that `babel-eslint` relies on is a direct dependency in its `package.json` and the plugins it enables are hardcoded, leading to a potential mismatch in versions and enabled language features between compiling and linting. This has historically led to a lot of confusion and hard-to-debug issues, and we believe solving this issue is a big win for both maintainers and end users.
* `babel-eslint` has to be updated to handle changes in both upstream projects, and has often been out of sync with one or the other.

The challenges above have added up to `babel-eslint` requiring more resources than the team has at its disposal, resulting in `babel-eslint` not getting the attention a widely used project (6M downloads a week at the time of this writing) requires to stay up-to-date.

## The Present

With the next iteration of `babel-eslint`, we have decided to publish the package under a new name: `@babel/eslint-parser`. To alleviate some of the challenges discussed above, we are doing the following:

* `@babel/eslint-parser` will require `@babel/core` as a peer dependency and will now use Babel core's APIs to read and apply your Babel configuration. This means that the same version of Babel with the same settings will be used for both compiling and linting. This is consistent with what we recommend and do with other packages in the Babel ecosystem.
* `@babel/eslint-parser` will live in the main [`babel/babel`](https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser) monorepo with other Babel packages. We hope this will help to mitigate some of the syncing issues `babel-eslint` has seen in the past and allow us to lint the repo with the latest source code in GitHub, shortening the feedback loop of how changes in Babel affect linting.
* [ESTree](https://github.com/estree/estree) - the AST specification that ESLint follows - has recently become active again, and the Babel team is now actively involved in the project. This will hopefully allow us to share what we learn about the AST representation of experimental syntax and help make the integration between tools easier.
* [Kai Cataldo](https://kaicataldo.com) has been helping out with `babel-eslint` for a number of years now, and as a result of being a maintainer of both Babel and ESLint, is uniquely positioned to focus on the interoperability of these two tools. Over the past few months, he has been working on the code changes discussed above and will continue to support the new packages once they are released.

## The Future

We believe that these packages are ready to be released. Because of all the integrations and projects involved (Babel, ESLint, Prettier, frameworks, various plugins, text editor integrations, command-line tools, etc.), we're sure there will be things that need to be fixed, and we plan to iterate quickly.

Please note that `@babel/eslint-parser` will rely on `@babel/core` as a peer dependency and this package must be in your project's `node_modules`.

Once you have ensured that `@babel/core` has been installed, you can run the following commands to upgrade from `babel-eslint` and `babel-eslint-plugin` to the new packages:

npm

```sh
npm uninstall babel-eslint babel-eslint-plugin
npm install --save-dev @babel/eslint-parser @babel/eslint-plugin
```

Yarn

```sh
yarn remove babel-eslint babel-eslint-plugin
yarn add --dev @babel/eslint-parser @babel/eslint-plugin
```

.eslintrc.js

```diff
module.exports = {
---  parser: "babel-eslint",
+++  parser: "@babel/eslint-parser"
    plugins: [
---   "babel"
+++   "@babel
    ]
};
```

`@babel/eslint-parser` expects a standard Babel configuration file (`.babelrc` or `babel.config.js`). For cases where users might not want to use a Babel configuration file or are running Babel through another tool (such as Webpack with babel-loader), `@babel/eslint-parser` also supports applying [Babel configuration](https://babeljs.io/docs/en/options) through your ESLint configuration. Please see the [`babelOptions`](https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser#additional-parser-configuration) configuration option for more details.

## Moving Forward Together

Our short-term goal in making the changes outlined above is to make it easier for `@babel/eslint-parser` to maintain and to make linting Babel-compiled code with ESLint easier and more reliable. We would love your help in this endeavor! Contributions on [GitHub](https://github.com/babel/babel) and [financial donations](https://opencollective.com/babel) go a long way in helping us make this integration the best it can be for the community.
