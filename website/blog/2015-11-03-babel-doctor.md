---
layout: post
title:  "Babel Doctor"
author: Sebastian McKenzie
authorURL: https://twitter.com/sebmck
date:   2015-11-3 10:30:00
categories: announcements
share_text: "Babel Doctor"
---

> Babel Doctor is <s>heavily inspired</s> ripped from the awesome
> [Yeoman Doctor](https://github.com/yeoman/doctor) by
> [Sindre Sorhus](https://github.com/sindresorhus).

---

> babel-doctor has been removed as of v6.18.0 of `babel-cli`. If anyone needs it we will bring it back as a standalone npm module called `babel-doctor`.

<!--truncate-->

We launched [Babel 6](https://babeljs.io/blog/2015/10/29/6.0.0/) last week. This was a
pretty big change from the previous batteries included Babel and with it came a host of
potential environment issues.

In order to combat this we now include a `babel-doctor` command with the `babel-cli` that
detects common problems with your Babel installation such as:

- Missing `.babelrc`.
- Duplicate Babel core modules
- Outdated Babel core modules

## Usage

First, make sure you have the Babel CLI installed.

```sh
$ npm install -g babel-cli@^6.1.0
```

Then simply `cd` into your project directory and run:

```sh
$ babel-doctor

Babel Doctor
Running sanity checks on your system. This may take a few minutes...

✔ Found config at /Users/sebastian/.babelrc
✔ All babel packages appear to be up to date
✔ No duplicate babel packages found

Everything looks all right!

```

----

We hope this makes it easier to setup and use Babel in your project.

Happy hacking!
