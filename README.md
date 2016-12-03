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

Babel is composed with multiple packages. Their documentations aren't hosted in this repository.

To update their documentation you will need to refers to its repository ([Babel's packages](https://github.com/babel/babel/tree/master/packages), [Babili's packages](https://github.com/babel/babili/tree/master/packages), ...).

If you want to create a new page, you need to consider the following.

The `package` configuration in the header needs to correspond to your package name.
```yaml
layout: docs
title: babel-register (require hook)
description: How to use babel-register, the require hook.
permalink: /docs/usage/babel-register/
redirect_from:
 - /docs/usage/require/
package: babel-register
```

#### Publishing README from babel

```
{% include package_readme.html %}
```

For example [babel.github.io/docs/plugins/preset-stage-0.md](/docs/plugins/preset-stage-0.md) which then points to [babel/packages/babel-preset-stage-0/README.md](https://github.com/babel/babel/blob/master/packages/babel-preset-stage-0/README.md)

#### Publishing README from babili

```
{% include package_readme.html from="babili" %}
```

#### Manually updating submodules

```sh
git submodule foreach git pull origin master
```

You can safely push them once updated. Note that the website will during deployement fetch all latest submodule versions.
