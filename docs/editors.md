---
layout: docs
title: Editors
description: Learn how to use Babel in your editor of choice
permalink: /docs/editors
---

## 语法高亮

![语法高亮](/images/syntax-highlighting.png)

现在，很多流行的编辑器都直接支持 ES2015+ 语法高亮，而有些则需要安装额外的扩展程序。这个指南将帮助你支持语法高亮。

如果你想要更高级的集成，你可以查看[安装](/docs/setup)指南。

**提示:** 上面截图中使用的字体是 [FiraCode](https://github.com/tonsky/FiraCode)。

### Atom

安装 [language-babel](https://atom.io/packages/language-babel) 组件和按照[说明](https://github.com/gandm/language-babel#installation)操作。

### Sublime Text 3

首先，[安装 Package Control](https://packagecontrol.io/installation)。
然后从 Package Control 菜单里安装 [Babel](https://packagecontrol.io/packages/Babel) 组件和按照[说明](https://github.com/babel/babel-sublime#installation)操作。

### Vim

安装 [vim-javascript](https://github.com/pangloss/vim-javascript) 插件，它同时提供了语法高亮和 Vim 的 JavaScript 缩进支持。

也可以使用 [yajs.vim](https://github.com/othree/yajs.vim) 和 [es.next.syntax](https://github.com/othree/es.next.syntax.vim)。

### Visual Studio Code

安装 [sublime-babel-vscode](https://marketplace.visualstudio.com/items?itemName=joshpeng.sublime-babel-vscode) 扩展程序和按照说明操作.

还有其他方法可以支持语法高亮，你可以在 [Visual Studio Code 文档](https://code.visualstudio.com/Docs/languages/javascript#_writing-jsconfigjson)中了解更多。

### WebStorm

WebStorm 现在支持 ES2015+ 而无需安装任何额外的扩展程序。但是，你可能需要[启用他](https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/)。