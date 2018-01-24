---
layout: docs
title: Babel's core packages
description: The Babel repo is managed as a monorepo; it's composed of many npm packages
permalink: /docs/core-packages/
package: babel-core

id: core
---

## Other packages

* [Babel-types](babel-types/): Babel Types is a Lodash-esque utility library for AST nodes
* [Babel-register](/docs/usage/babel-register/): The require hook will bind itself to node's require and automatically compile files on the fly.
* [Babel-template](babel-template/): Generate an AST from a string template
* [Babel-helpers](babel-helpers/): Collection of helper functions used by Babel transforms
* [Babel-code-frame](babel-code-frame/): Generate errors that contain a code frame that point to source locations
* [Babylon](babylon/): Babylon is a JavaScript parser used in Babel

## Core

{% include package_readme.html %}
