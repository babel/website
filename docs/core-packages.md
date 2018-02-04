---
layout: docs
title: Babel's core packages
description: The Babel repo is managed as a monorepo; it's composed of many npm packages
permalink: /docs/core-packages/
package: babel-core
---

## Other packages

* [babylon](babylon.md): Babylon is a JavaScript parser used in Babel
* [babel-core](babel-core.md): The core module that wraps everything in our transform api (used for integrations)
* [babel-generator](babel-generator.md): Prints a string from an AST
* [babel-types](babel-types.md): Babel Types is a Lodash-esque utility library for AST nodes
* [babel-register](babel-register.md): The require hook will bind itself to node's require and automatically compile files on the fly.
* [babel-template](babel-template.md): Generate an AST from a string template
* [babel-helpers](babel-helpers.md): Collection of helper functions used by Babel transforms
* [babel-code-frame](babel-code-frame.md): Generate errors that contain a code frame that point to source locations
