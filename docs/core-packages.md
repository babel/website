---
layout: docs
title: Babel's core packages
description: The Babel repo is managed as a monorepo; it's composed of many npm packages
permalink: /docs/core-packages/
package: babel-core
---

## Other packages

* [Types](types): Babel Types is a Lodash-esque utility library for AST nodes
* [Register](register): The require hook will bind itself to node's require and automatically compile files on the fly.
* [Template](template): Generate an AST from a string template
* [Helpers](helpers): Collection of helper functions used by Babel transforms
* [Code-frame](code-frame): Generate errors that contain a code frame that point to source locations

## Core

{% include package_readme.html %}
