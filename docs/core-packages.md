---
layout: docs
title: Babel's core packages
description: The Babel repo is managed as a monorepo; it's composed of many npm packages
permalink: /docs/core-packages/
package: babel-core
---

## Other packages

* [babel-types](babel-types/): babel-types is a Lodash-esque utility library for AST nodes
* [babel-register](/docs/usage/babel-register/): The require hook will bind itself to node's require and automatically compile files on the fly.
* [babel-template](babel-template/): Generate an AST from a string template
* [babel-helpers](babel-helpers/): Collection of helper functions used by Babel transforms
* [babel-code-frame](babel-code-frame/): Generate errors that contain a code frame that point to source locations
* [babylon](babylon/): Babylon is a JavaScript parser used in Babel
* [babel-traverse](traverse/): The babel-traverse module maintains the overall tree state, and is responsible for replacing, removing, and adding nodes.
* [babel-generator](generator/): Turns an AST into code.

## Core

{% include package_readme.html %}
