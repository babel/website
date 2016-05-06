---
layout: docs
title: External helpers
description:
permalink: /docs/plugins/external-helpers/
package: babel-plugin-external-helpers
---

## Detail

Babel has a few helper functions that'll be placed at the top of the generated
code if needed so it's not inlined multiple times throughout that file. This may
become an issue if you have multiple files, especially when you're sending them
to the browser. gzip alleviates most of this concern but it's still not ideal.

You can tell Babel to not place any declarations at the top of your files and
instead just point them to a reference contained within the external helpers.

## Installation

```sh
$ npm install babel-plugin-external-helpers
```

## Usage

Add the following line to your `.babelrc` file:

```json
{
  "plugins": ["external-helpers"]
}
```
