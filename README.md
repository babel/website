# [babel/website](https://babeljs.io)

> ## :warning: Hacktoberfest notice
>
> We welcome any contribution that brings value to the project, whether they are opened for Hacktoberfest or not. However, we don't appreciate spam PRs such as [#2367](https://github.com/babel/website/pull/2367), that would hinder future collaboration. It also takes precious maintainer time that is better spent on other PRs that benefit rest of the community.
>
> If you want to contribute but don't know where to start, you can take a look at [the open issues](https://github.com/babel/website/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) in this repository, or the ["docs" issues](https://github.com/babel/babel/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22i%3A+docs%22) in `babel/babel`.

This is the source for the [babeljs.io](https://babeljs.io) website; feel free to suggest changes to our docs!

- Current: `master` branch is deployed to https://babeljs.io
- Old: `old-site` branch is deployed to https://old.babeljs.io

### Setup

Node: Check that Node is installed with version 10.19.0 and up. You can check this with node -v.

Yarn: Make sure that Yarn 1 is installed with version >= 1.19.0.

```bash
$ git clone git@github.com:babel/website.git
$ cd website
$ yarn && yarn bootstrap
```

- Just run `yarn start` next time (check the package.json for scripts).

### Contributing to the website

To keep documentation in sync across all of Babel's packages, the docs are now directly located in this repository. The READMEs in [`babel/babel`](https://github.com/babel/babel) are [auto generated](https://github.com/babel/babel/blob/master/scripts/generators/readmes.js) and point to this documentation.

You might want to make yourself familiar with [docusaurus](https://docusaurus.io/docs/en/installation) to make significant changes to the website. If you only want to make content changes you just need to know about versioned docs.

#### Versioned docs

- `/docs` - the files in here are responsible for the "next" version at https://babeljs.io/docs/en/next.
- `/website/versioned_docs/version-*` - these are the docs for the past versions, the latest one being the currently published version at https://babeljs.io/docs/en

After making your changes to the markdown files in the `/docs` folder, a git hook script will suggest files from the past versions folders that you might also need to apply your changes to.

# Usage Guide
There are quite a few tools in the Babel toolchain that try to make it easy for you to use Babel whether you're an "end-user" or building an integration of Babel itself. This will be a quick introduction to those tools and you can read more about them in the "Usage" section of the docs.

If you're using a framework, the work of configuring Babel might be different or actually already handled for you. Check out our interactive setup guide instead.

# Overview
This guide will show you how to compile your JavaScript application code that uses ES2015+ syntax into code that works in current browsers. That will involve both transforming new syntax and polyfilling missing features.

### The entire process to set this up involves:

Running these commands to install the packages:

npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill

Copy
Creating a config file named babel.config.json in the root of your project with this content:

{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.4",
      }
    ]
  ]
}

Copy
The browsers list above is just an arbitrary example. You will have to adapt it for the browsers you want to support.

And running this command to compile all your code from the src directory to lib:

./node_modules/.bin/babel src --out-dir lib

Copy
You can use the npm package runner that comes with npm@5.2.0 to shorten that command by replacing ./node_modules/.bin/babel with npx babel

Read on for a step-by-step explanation of how this works and an introduction to each of the tools used.

#### Looking for support?

For questions and support on contributing please join our [Slack community](https://slack.babeljs.io/), channel `#website` or directly [here](https://babeljs.slack.com/messages/website).
