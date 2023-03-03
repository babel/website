---
title: Editors
id: editors
---

## Syntax Highlighting

![Syntax Highlighting](/img/syntax-highlighting.png)

These days, many popular editors support ES2015+ syntax highlighting
out of the box, while some require installing additional extensions.
This guide should help you get the syntax highlighting to work.

If you're looking for more advanced integrations, you may want to
take a look at the [Setup](/setup) guide.

**Tip:** The font used on the screenshot above is [FiraCode](https://github.com/tonsky/FiraCode).

### Atom

Install [language-babel](https://atom.io/packages/language-babel) package
and follow the [instructions](https://github.com/gandm/language-babel#installation).

### Emacs

Install the [js2-mode](https://github.com/mooz/js2-mode) that's likely the best JavaScript mode available for Emacs. It has very accurate syntax highlighting using a recursive-descent parser, strict recognition of the Ecma-262 language standard, supports most Rhino and SpiderMonkey extensions from 1.5 and up, and on-the-fly reporting of syntax errors and strict-mode warnings.

In adition to [js2-mode](https://github.com/mooz/js2-mode), you can install two more packages, [js2-refactor](https://github.com/js-emacs/js2-refactor.el) that adds powerful refactorings, and [xref-js2](https://github.com/js-emacs/xref-js2) that makes it easy to jump to function references or definitions.

### Sublime Text 3

First, [install Package Control](https://packagecontrol.io/installation).
Then install [Babel](https://packagecontrol.io/packages/Babel) package
from the Package Control menu and follow
the [instructions](https://github.com/babel/babel-sublime#installation).

### Vim

Install the [vim-javascript](https://github.com/pangloss/vim-javascript) plugin, which brings both
improved syntax highlighting and indentation support for JavaScript to Vim.

Another option is to use [yajs.vim](https://github.com/othree/yajs.vim) with
[es.next.syntax](https://github.com/othree/es.next.syntax.vim).

### Visual Studio Code

Install the [vscode-language-babel](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel) extension and follow the instructions.

There seems to be one other way to get the syntax highlighting working and you can learn
more about it in the [Visual Studio Code docs](https://code.visualstudio.com/Docs/languages/javascript#_javascript-projects-jsconfigjson).

### WebStorm

WebStorm now ships with support for ES2015+ without requiring the installation of any additional
extensions. You may, however, need to [enable it](https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/).
