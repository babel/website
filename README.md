# babel.github.io

This is the source for the [babeljs.io](https://babeljs.io) website, powered by [Jekyll](https://jekyllrb.com/).

This repo also contains babel's [source documentation](https://github.com/babel/babel.github.io/tree/master/docs).

> The babel repo is [babel/babel](https://github.com/babel/babel)

Feel free to suggest changes to our docs, or add new content!

### Setup

```bash
$ git clone git@github.com:babel/babel.github.io.git
$ cd babel.github.io
```

* [Please install ruby](https://www.ruby-lang.org/en/documentation/installation/), if not already installed.
  * Use `which ruby` or `ruby --version`, to verify if ruby is installed.
  * Make sure `bundler` is installed by running `gem install bundler`
* Install `jekyll` dependencies by running `bundle install`
* `npm i` to install this package's dependencies
* To start the web server on your machine, check out this repo and run `npm start`.

### Contributing to the website

To keep documentation in sync across all of Babel's packages and plugins, the documentation for the plugins and presets is sourced directly from the README files located inside their respective repositories ([Babel's packages](https://github.com/babel/babel/tree/master/packages), [Babili's packages](https://github.com/babel/babili/tree/master/packages), ...).

For pages that are sourced from README files, the `package` field in the header needs to correspond to your package name. This package name also needs to be added to `scripts/download-readmes.js`.

```yaml
layout: docs
title: babel-register (require hook)
description: How to use babel-register, the require hook.
permalink: /docs/usage/babel-register/
redirect_from:
 - /docs/usage/require/
package: babel-register
```

#### Publishing README

```
{% include package_readme.html %}
```

For example [babel.github.io/docs/plugins/preset-stage-0.md](/docs/plugins/preset-stage-0.md) which then points to [babel/packages/babel-preset-stage-0/README.md](https://github.com/babel/babel/blob/master/packages/babel-preset-stage-0/README.md)

If you encounter an `Liquid Exception: Included file '_includes/.../packages/.../README.md' not found`, please double check your `package` configuration, and ensure you have ran `scripts/download-readmes.js` (`make build` will run this for you).

#### Linting markdown

```sh
npm test
```

This will lint markdown documents inside both the website and the imported repositories (like babel, babili, etc).

#### Testing compiled output

```sh
rake
```

Running this will check the compiled output for broken links and invalid markup.

#### Looking for support?

For questions and support please join our [Slack community](https://slack.babeljs.io/), channel #website or directly [here](https://babeljs.slack.com/messages/website/).
