---
layout: docs
title: FAQ
description: Frequently Asked Questions and Answers
permalink: /docs/faq/
---

## Help?! I just want to use Babel like it was in 5.x! Everything is too complicated now!

We hear you! Babel 6 requires a tiny bit of configuration in order to get going.
[We think this is for the best](/blog/2015/10/29/6.0.0/) and have added
[presets](/docs/plugins#presets) to ease this transition.

## Upgrading from Babel 5.x to Babel 6

At the heart of Babel 6 is [plugins](/docs/plugins). What plugins you need completely
depends on your specific configuration but if just add the following `.babelrc` file to
get all the same transforms that were in Babel 5:

```json
{
  "presets": ["es2015", "react", "stage-2"]
}
```

```sh
$ npm install babel-preset-es2015 babel-preset-react babel-preset-stage-2
```

## Where did all the docs go?!

Babel 6 removes a lot of the options in favor of <a href="/docs/plugins">plugins</a> so a
lot of the docs are no longer applicable.

For every removed option there should be a plugin for it. It's possible we may have missed
something, if you think this is the case, please
<a href="https://phabricator.babeljs.io/maniphest/task/create/">open an issue</a>!

Babel is an open source project and we appreciate any and all contributions we can get.
Please help out with documentation if you can by submitting a pull request to the
[babel.github.io](https://github.com/babel/babel.github.io) repo.
