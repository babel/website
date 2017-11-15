---
layout: page
title: 使用 Babel
description: 教你如何在使用 Babel 时选择工具
permalink: /docs/setup/
custom_js_with_timestamps:
- tools.js
---

<div class="container docs-content">
  <div class="step-wizard">
    <div class="step">
      <h2><span class="step-no">1</span> 选择你的工具 (尝试 CLI)</h2>

      {% for tool in site.data.tools %}
        <h5>{{tool.name}}</h5>

        <div class="btn-group">
          {% for item in tool.items %}
            <a href="#installation" class="btn btn-default" data-name="{{item[0]}}">{{item[1]}}</a>
          {% endfor %}
        </div>
      {% endfor %}
    </div>

    <div class="step step-install">
      <h2 id="installation"><span class="step-no">2</span> 安装</h2>
      {% include tools/items.md name="install" %}
    </div>

    <div class="step step-setup">
      <h2><span class="step-no">3</span> 使用</h2>

      {% include tools/items.md name="usage" %}
    </div>

    <div class="step step-setup">
      <h2><span class="step-no">4</span> 创建 <code>.babelrc</code> 配置文件</h2>

      <p>
        虽然已经配置好了 Babel ，但并没有让它真正<em>生效</em>。在项目的根目录中创建一个 <a href="/docs/usage/babelrc">.babelrc</a> 的文件并启用一些 <a href="/docs/plugins">plugin</a> 。
      </p>

      <p>
        首先，你可以使用转换 ES2015+ 的 <a href="https://babeljs.io/docs/plugins/preset-env/">env preset</a> 。 
      </p>

<!--lint disable no-shortcut-reference-link, no-undefined-references-->
<div markdown="1">
```shell
npm install babel-preset-env --save-dev
```
</div>
<!--lint enable no-shortcut-reference-link, no-undefined-references-->

      <p>
        为了让 preset 生效，你需要像下面这样定义你的 <code>.babelrc</code> 文件:
      </p>

<!--lint disable no-shortcut-reference-link, no-undefined-references-->
<div markdown="1">
```json
{
  "presets": ["env"]
}
```
</div>
<!--lint enable no-shortcut-reference-link, no-undefined-references-->

      <p>
        <strong>注意</strong>: 因为 npm 2.x 下载依赖的关系，在使用 npm 2.x 运行 Babel 6.x 的项目时，可能会引起性能问题。 你可以通过切换到 npm 3.x 或在 npm 2.x 上使用 <a href="https://docs.npmjs.com/cli/dedupe">dedupe</a> 选项来解决这个问题。查看 npm 版本你可以运行如下命令:
      </p>

<!--lint disable no-shortcut-reference-link, no-undefined-references-->
<div markdown="1">
```shell
npm --version
```
</div>
<!--lint enable no-shortcut-reference-link, no-undefined-references-->

    </div>
  </div>
</div>
