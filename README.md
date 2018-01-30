# [babel/website](https://babeljs.io)

This is the source for the [babeljs.io](https://babeljs.io) website: feel free to suggest changes to our docs!

> We're in the process of re-doing the site so things might be in flux: [#1544](https://github.com/babel/website/issues/1544)

- Old site: `old-site` branch is deployed to https://old.babeljs.io and https://babeljs.io
- New site: `master` branch is deployed to https://new.babeljs.io

### Setup

```bash
$ git clone git@github.com:babel/website.git
$ cd website
$ make bootstrap && make build
```

* Just run `npm start` next time (check the Makefile and the package.json).

### Contributing to the website

To keep documentation in sync across all of Babel's packages and plugins, the documentation for the plugins and presets is sourced directly from the README files located inside their respective repositories ([Babel's packages](https://github.com/babel/babel/tree/master/packages), [babel-minify's packages](https://github.com/babel/minify/tree/master/packages), ...).

For pages that are sourced from README files, the `package` field in the header needs to correspond to your package name. This package name also needs to be added to `scripts/download-readmes.js`.

```yaml
layout: docs
title: babel-register (require hook)
description: How to use babel-register, the require hook.
permalink: /docs/usage/babel-register/
package: babel-register
```

#### Looking for support?

For questions and support please join our [Slack community](https://slack.babeljs.io/), channel #website or directly [here](https://babeljs.slack.com/messages/website/).
