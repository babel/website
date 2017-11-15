---
layout: docs
title: Plugins
description:
permalink: /docs/plugins/
---

Babel 是一个编译器。 从宏观角度看，它将运行代码分为3个阶段: 解析，转换，及生成(与其他编译器相同).

> 关于编译器的优秀/简单的教程，请查看 [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler)，同时它也从宏观角度上解释了 Babel 本身是如何工作的。

初始阶段，Babel 并没有做任何事情。它基本上就相当于 `const babel = code => code;`，先解析代码，然后再次生成相同的代码。

你可以为 Babel 添加一些插件让其去做任何事情(插件会影响 Babel 的第 2 阶段，转换)。

不知如何下手? 请查看我们的一些 [presets](#presets) 。

## Presets

不想定制你自己的插件? 没关系! Presets 是可共享的 [`.babelrc`](/docs/usage/babelrc) 配置或者只是一个 babel 插件的数组。

### Official Presets

我们已经组装了一些公用的插件:

> 每年每个 preset 只编译当年批准的内容。
> 而 `babel-preset-env` 相当于 es2015 ，es2016 ，es2017 及最新版本。

- [env](/docs/plugins/preset-env/)
- [es2015](/docs/plugins/preset-es2015/)
- [es2016](/docs/plugins/preset-es2016/)
- [es2017](/docs/plugins/preset-es2017/)
- [latest (不推荐使用 env)](/docs/plugins/preset-latest/)
- [react](/docs/plugins/preset-react/)
- [flow](/docs/plugins/preset-flow/)

> [在 npm 上](https://www.npmjs.com/search?q=babel-preset)可以找到许多由其他社区进行维护的 preset 进行使用!

### Stage-X (实验阶段 Presets)

Stage-x preset 中的任何转换都是对未被批准为 JavaScript 版本一部分的语言的变化(如 es6 / es2015 )。

> "语言的变化需要一个过程来发展，该过程提供了将一个想法进化为一种完善规范的指导原则。"

<blockquote class="babel-callout babel-callout-danger">
  <h4>不稳定</h4>
  <p>
    这些提案可能会有所改动，因此请<strong><em>谨慎使用</em></strong>，尤其是第 3 阶段以前的提案。我们计划会在每次 TC39 会议结束后更新对应的 stage-x preset。
  </p>
</blockquote>

[TC39](https://github.com/tc39) 将提案分为以下几个阶段:

- [Stage 0](/docs/plugins/preset-stage-0/) - 稻草人: 只是一个想法，可能是 babel 插件。
- [Stage 1](/docs/plugins/preset-stage-1/) - 提案: 初步尝试。
- [Stage 2](/docs/plugins/preset-stage-2/) - 初稿: 完成初步规范。
- [Stage 3](/docs/plugins/preset-stage-3/) - 候选: 完成规范和浏览器初步实现。
- Stage 4 - 完成: 将被添加到下一年度发布。

欲了解更多信息，请务必查看[当前 TC39 提案](https://github.com/tc39/proposals)及其[文档流程](https://tc39.github.io/process-document).

Yehuda Katz (@wycatz) 在 [thefeedbackloop.xyz](https://thefeedbackloop.xyz) 中的几个帖子中也详细解释了 TC39 各阶段的流程: [Stage 0 和 1](https://thefeedbackloop.xyz/tc39-a-process-sketch-stages-0-and-1/)，[Stage 2](https://thefeedbackloop.xyz/tc39-process-sketch-stage-2/)，[Stage 3](https://thefeedbackloop.xyz/tc39-process-sketch-stage-3/) 以及最终的 Stage 4 。

## 转译 Plugin

这些 Plugin 将用于转译您的代码。

<blockquote class="babel-callout babel-callout-info">
  <p>
    转译 plugin 将启用相应的语法 plugin ，因此你不必同时使用两者。
  </p>
</blockquote>

### ES3

- [es3-member-expression-literals](/docs/plugins/transform-es3-member-expression-literals/)
- [es3-property-literals](/docs/plugins/transform-es3-property-literals/)

### ES5

- [es5-property-mutators](/docs/plugins/transform-es5-property-mutators/)

### ES2015

- [check-es2015-constants](/docs/plugins/check-es2015-constants/)
- [es2015-arrow-functions](/docs/plugins/transform-es2015-arrow-functions/)
- [es2015-block-scoped-functions](/docs/plugins/transform-es2015-block-scoped-functions/)
- [es2015-block-scoping](/docs/plugins/transform-es2015-block-scoping/)
- [es2015-classes](/docs/plugins/transform-es2015-classes/)
- [es2015-computed-properties](/docs/plugins/transform-es2015-computed-properties/)
- [es2015-destructuring](/docs/plugins/transform-es2015-destructuring/)
- [es2015-duplicate-keys](/docs/plugins/transform-es2015-duplicate-keys/)
- [es2015-for-of](/docs/plugins/transform-es2015-for-of/)
- [es2015-function-name](/docs/plugins/transform-es2015-function-name/)
- [es2015-literals](/docs/plugins/transform-es2015-literals/)
- [es2015-object-super](/docs/plugins/transform-es2015-object-super/)
- [es2015-parameters](/docs/plugins/transform-es2015-parameters/)
- [es2015-shorthand-properties](/docs/plugins/transform-es2015-shorthand-properties/)
- [es2015-spread](/docs/plugins/transform-es2015-spread/)
- [es2015-sticky-regex](/docs/plugins/transform-es2015-sticky-regex/)
- [es2015-template-literals](/docs/plugins/transform-es2015-template-literals/)
- [es2015-typeof-symbol](/docs/plugins/transform-es2015-typeof-symbol/)
- [es2015-unicode-regex](/docs/plugins/transform-es2015-unicode-regex/)

### ES2016

- [exponentiation-operator](/docs/plugins/transform-exponentiation-operator/)

### ES2017

- [async-to-generator](/docs/plugins/transform-async-to-generator/)

### 模块

- [es2015-modules-amd](/docs/plugins/transform-es2015-modules-amd/)
- [es2015-modules-commonjs](/docs/plugins/transform-es2015-modules-commonjs/)
- [es2015-modules-systemjs](/docs/plugins/transform-es2015-modules-systemjs/)
- [es2015-modules-umd](/docs/plugins/transform-es2015-modules-umd/)

### 实验阶段

- [async-generator-functions](/docs/plugins/transform-async-generator-functions/)
- [async-to-module-method](/docs/plugins/transform-async-to-module-method/)
- [class-constructor-call](/docs/plugins/transform-class-constructor-call/) (不推荐)
- [class-properties](/docs/plugins/transform-class-properties/)
- [decorators](/docs/plugins/transform-decorators/)
- [do-expressions](/docs/plugins/transform-do-expressions/)
- [export-extensions](/docs/plugins/transform-export-extensions/)
- [function-bind](/docs/plugins/transform-function-bind/)
- [object-rest-spread](/docs/plugins/transform-object-rest-spread/)

### Minification

请查看基于 Babel 的 [minifier](https://github.com/babel/minify) !

这些 plugin 都存在于 minify 项目中。

- [inline-environment-variables](/docs/plugins/transform-inline-environment-variables/)
- [inline-consecutive-adds](/docs/plugins/transform-inline-consecutive-adds/)
- [member-expression-literals](/docs/plugins/transform-member-expression-literals/)
- [merge-sibling-variables](/docs/plugins/transform-merge-sibling-variables/)
- [minify-booleans](/docs/plugins/transform-minify-booleans/)
- [minify-constant-folding](/docs/plugins/minify-constant-folding/)
- [minify-dead-code-elimination](/docs/plugins/minify-dead-code-elimination/)
- [minify-flip-comparisons](/docs/plugins/minify-flip-comparisons/)
- [minify-guarded-expressions](/docs/plugins/minify-guarded-expressions/)
- [minify-infinity](/docs/plugins/minify-infinity/)
- [minify-mangle-names](/docs/plugins/minify-mangle-names/)
- [minify-numeric-literals](/docs/plugins/minify-numeric-literals/)
- [minify-replace](/docs/plugins/minify-replace/)
- [minify-simplify](/docs/plugins/minify-simplify/)
- [minify-type-constructors](/docs/plugins/minify-type-constructors/)
- [node-env-inline](/docs/plugins/transform-node-env-inline/)
- [property-literals](/docs/plugins/transform-property-literals/)
- [regexp-constructors](/docs/plugins/transform-regexp-constructors/)
- [remove-console](/docs/plugins/transform-remove-console/)
- [remove-debugger](/docs/plugins/transform-remove-debugger/)
- [simplify-comparison-operators](/docs/plugins/transform-simplify-comparison-operators/)
- [undefined-to-void](/docs/plugins/transform-undefined-to-void/)

### React

- [react-constant-elements](/docs/plugins/transform-react-constant-elements/)
- [react-display-name](/docs/plugins/transform-react-display-name/)
- [react-inline-elements](/docs/plugins/transform-react-inline-elements/)
- [react-jsx](/docs/plugins/transform-react-jsx/)
- [react-jsx-compat](/docs/plugins/transform-react-jsx-compat/)
- [react-jsx-self](/docs/plugins/transform-react-jsx-self/)
- [react-jsx-source](/docs/plugins/transform-react-jsx-source/)

### 其它

- [eval](/docs/plugins/transform-eval/)
- [flow-comments](/docs/plugins/transform-flow-comments/)
- [flow-strip-types](/docs/plugins/transform-flow-strip-types/)
- [jscript](/docs/plugins/transform-jscript/)
- [object-assign](/docs/plugins/transform-object-assign/)
- [object-set-prototype-of-to-assign](/docs/plugins/transform-object-set-prototype-of-to-assign/)
- [proto-to-assign](/docs/plugins/transform-proto-to-assign/)
- [regenerator](/docs/plugins/transform-regenerator/)
- [runtime](/docs/plugins/transform-runtime/)
- [strict-mode](/docs/plugins/transform-strict-mode/)

## 混合 Plugin

- [external-helpers](/docs/plugins/external-helpers/)

## 语法 Plugins

这些 plugin 允许 Babel **解析**特定类型的语法(不转译)。

> 注意: 转译 plugin 会自动继承/使用语法插件，因此如果已经使用了相应的转译 plugin ，则不需要指定语法 plugin 。

你也可以从 babylon 中提供任意 [`plugin` 选项](https://github.com/babel/babylon/#plugins):

```json
// .babelrc
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

### 实验性的

- [async-generators](/docs/plugins/syntax-async-generators/)
- [class-properties](/docs/plugins/syntax-class-properties/)
- [decorators](/docs/plugins/syntax-decorators/)
- [do-expressions](/docs/plugins/syntax-do-expressions/)
- [dynamic-import](/docs/plugins/syntax-dynamic-import/)
- [export-extensions](/docs/plugins/syntax-export-extensions/)
- [flow](/docs/plugins/syntax-flow/)
- [function-bind](/docs/plugins/syntax-function-bind/)
- [function-sent](/docs/plugins/syntax-function-sent/)
- [jsx](/docs/plugins/syntax-jsx/)
- [object-rest-spread](/docs/plugins/syntax-object-rest-spread/)

### 默认启用

这些 plugin 已经不起作用了，因为较新版本的 babylon 默认已经启用了它们。

- [async-functions](/docs/plugins/syntax-async-functions/) (自 babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1) 起)
- [exponentiation-operator](/docs/plugins/syntax-exponentiation-operator/) (自从 babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1) 起)
- [trailing-function-commas](/docs/plugins/syntax-trailing-function-commas/) (自从 babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1) 起)

### 不推荐

- [class-constructor-call](/docs/plugins/syntax-class-constructor-call/)

## Plugin/Preset 路径

如果 plugin 是通过 npm 安装，你可以传入 plugin 名字给 babel，babel 将检查它是否安装在 `node_modules` 中

`"plugins": ["babel-plugin-myPlugin"]`

你也可以指定你的 plugin/preset 的相对或绝对路径。

`"plugins": ["./node_modules/asdf/plugin"]`

### Plugin/Preset 简写

如果你使用 `babel-plugin-` 作为 plugin 的前缀，你可以使用简写的形式省略掉该前缀。

`"plugins": ["myPlugin"]`

preset 与之相同

`"presets": ["babel-preset-myPreset"]`

vs

`"presets": ["myPreset"]`

这也适用于包裹作用域:

`"presets": ["@org/babel-preset-name"]`

简写:

`"presets": ["@org/name"]`

## Plugin/Preset 排序

> 插件中每个访问者都有排序问题。

这意味着如果两次转译都访问相同的"程序"节点，则转译将按照 plugin 或 preset 的规则进行排序然后执行。

- Plugin 会运行在 Preset 之前。
- Plugin 会从第一个开始顺序执行。ordering is first to last.
- Preset 的顺序则刚好相反(从最后一个逆序执行)。

例如:

```json
{
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
```

将先执行 `transform-decorators-legacy` 再执行 `transform-class-properties`.

一定要记得 preset 的顺序是*反向*的。举个例子:

```json
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ]
}
```

按以下顺序运行: `stage-2`， `react`， 最后 `es2015` 。

这主要是为了保证向后兼容，因为大多数用户会在 "stage-0" 之前列出 "es2015" 。欲了解相关更多信息，请查看 [关于隐式遍历 API 变化的说明](https://github.com/babel/notes/blob/master/2016-08/august-01.md#potential-api-changes-for-traversal) 。

## Plugin/Preset 选项

Plugin 和 Preset 均可以通过将名称和选项对象放置在同一个数组中来指定其选项。

例如:

```json
{
  "plugins": [
    ["transform-async-to-module-method", {
      "module": "bluebird",
      "method": "coroutine"
    }]
  ]
}
```

Preset 的配置选项工作原理与 plugin 完全相同:

```json
{
  "presets": [
    ["es2015", {
      "loose": true,
      "modules": false
    }]
  ]
}
```

## Plugin 的开发

请参考 [babel-handbook](https://github.com/thejameskyle/babel-handbook) ，学习如何制作自己的 plugin 。

一个简易逆转名字的插件 (首页中的示例):

```js
export default function () {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split("").reverse().join("");
      }
    }
  };
}
```

## 创建 Preset

你只需导出一个 config ，就可以拥有自己的 preset 。

```js
// Preset 中可以包含其他 preset 和 带有选项的 plugin 。
module.exports = {
  presets: [
    require("babel-preset-es2015"),
  ],
  plugins: [
    [require("babel-plugin-transform-es2015-template-literals"), { spec: true }],
    require("babel-plugin-transform-es3-member-expression-literals"),
  ],
};
```

相关更多信息，请查阅 [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset) 与 preset 相关部分或者只查看 [es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015) preset 项目相关的示例。
