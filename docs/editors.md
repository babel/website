---
layout: docs
title: Editors
description: Learn how to use Babel in your editor of choice
permalink: /docs/editors
---

## Syntax Highlighting

![Syntax Highlighting](/images/syntax-highlighting.png)

These days, many popular editors support ES2015+ syntax highlighting
out of the box, while some require installing additional extensions.
This guide should help you get the syntax highlighting to work.

If you're looking for more advanced integrations, you may want to
take a look at the [Setup](/docs/setup) guide.

**Tip:** The font used on the screenshot above is [FiraCode](https://github.com/tonsky/FiraCode).

### Atom

Install [language-babel](https://atom.io/packages/language-babel) package
and follow the [instructions](https://github.com/gandm/language-babel#installation).

### Sublime Text 3

First, [install Package Control](https://packagecontrol.io/installation).
Then install [Babel](https://packagecontrol.io/packages/Babel) package
from the Package Control menu and follow
the [instructions](https://github.com/babel/babel-sublime#installation).

### Visual Studio Code

Install [Babel ES6/ES7](https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring)
extension and follow the instructions.

There seems to be one other way to get the syntax highlighting working and you can learn
more about it in the [Visual Studio Code docs](https://code.visualstudio.com/Docs/languages/javascript#_writing-jsconfigjson).

### WebStorm

Seems like WebStorm now ships with support for ES2015+ without requiring you
to install additional extensions. You might need to
[enable it](https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/) though.
