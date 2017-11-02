---
layout: default
custom_js:
- index.js
third_party_js:
- /scripts/slick.min.js
- //unpkg.com/babel-standalone@6/babel.min.js
- //cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js
---

<div class="hero">
  <div class="hero__content">
    <h1>Babel 是一个 JavaScript 编译器。</h1>
    <p>今天就开始使用下一代 JavaScript 语法吧！</p>

    <div class="hero-repl" hidden>
      <div class="hero-repl__editor">
        <div class="hero-repl__pane hero-repl__pane--left">
          <h3>输入下一代 JavaScript 代码</h3>
          <div id="hero-repl-in" class="hero-repl__code"></div>
        </div>

        <div class="hero-repl__pane hero-repl__pane--right">
          <h3>获取浏览器兼容的 JavaScript </h3>
          <div id="hero-repl-out" class="hero-repl__code"></div>
          <div class="hero-repl__error"></div>
        </div>
      </div>
      <div class="hero-repl__footer">
        <a href="http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=latest%2Creact%2Cstage-2&experimental=false&loose=false&spec=false&code=%5B1%2C2%2C3%5D.map(n%20%3D%3E%20n%20%2B%201)%3B&playground=true">
          想了解关于 Babel 更多内容请使用我们提供的 REPL 进行实践！
        </a>
      </div>
    </div>

    {% assign latest_post = site.posts.first %}

    <div class="hero-actions">
      <div class="hero-actions-blog">
        <a href="{{ latest_post.url }}">
          <span class="hero-actions-blog__label">最新的博客:</span>
          <span class="hero-actions-blog__post">{{ latest_post.title }}</span>
        </a>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="row featurette text-center featurette--get-started">
    <h2>准备好开始了吗?</h2>

    <div class="col-lg-6">
      <h3>安装 Babel CLI 和 preset</h3>
      <div class="text-left">
<div markdown="1">
```shell
npm install --save-dev babel-cli babel-preset-env
```
</div>
      </div>
    </div>
    <div class="col-lg-6">
      <h3>创建一个 <a href="/docs/usage/babelrc"><code>.babelrc</code></a> 文件 (或者使用你的 <a href="/docs/usage/babelrc#use-via-packagejson">package.json</a>)</h3>
      <div class="text-left">
<div markdown="1">
```json
{
  "presets": ["env"]
}
```
</div>
      </div>
    </div>

    <p>
      有关在构建系统、IDE等设置 Babel 的更多信息，请查看我们的<a href="/docs/setup">交互设置指南</a>.
    </p>
  </div>

  <hr class="featurette-divider">

  <div class="row featurette">
    <div class="col-md-6">
      <h2 id="es2015-and-beyond">ES2015及更高版本</h2>
      <p>
        Babel通过语法转换器支持最新版本的 JavaScript 。
        这些 <a href="https://babeljs.io/docs/plugins/">plugins</a> 允许你<strong>立刻</strong>使用语法，无需等待浏览器支持。
        查看 <a href="https://babeljs.io/docs/plugins/preset-env">env preset</a> 开始使用 Babel 。
      </p>

      <p>你可以通过以下方式安装 preset </p>
<div markdown="1">
```shell
npm install --save-dev babel-preset-env
```
</div>
      <p>并添加 <code>"env"</code> 到你的 <code>.babelrc</code> 文件的 presets 数组中。</p>
    </div>

    <div class="col-md-6">
      <div class="col-md-6">
        <ul class="babel-tick-list">
          <li><a href="/docs/plugins/transform-es2015-arrow-functions">Arrow functions</a></li>
          <li><a href="/docs/plugins/syntax-async-functions">Async functions</a></li>
          <li><a href="/docs/plugins/syntax-async-generators">Async generator functions</a></li>
          <li><a href="/docs/plugins/transform-es2015-block-scoping">Block scoping</a></li>
          <li><a href="/docs/plugins/transform-es2015-block-scoped-functions">Block scoped functions</a></li>
          <li><a href="/docs/plugins/transform-es2015-classes">Classes</a></li>
          <li><a href="/docs/plugins/transform-class-properties">Class properties</a></li>
          <li><a href="/docs/plugins/transform-es2015-computed-properties">Computed property names</a></li>
          <li><a href="/docs/plugins/check-es2015-constants">Constants</a></li>
          <li><a href="/docs/plugins/transform-decorators">Decorators</a></li>
          <li><a href="/docs/plugins/transform-es2015-parameters">Default parameters</a></li>
          <li><a href="/docs/plugins/transform-es2015-destructuring">Destructuring</a></li>
          <li><a href="/docs/plugins/transform-do-expressions">Do expressions</a></li>
          <li><a href="/docs/plugins/transform-exponentiation-operator">Exponentiation operator</a></li>
          <li><a href="/docs/plugins/transform-es2015-for-of">For-of</a></li>
        </ul>
      </div>

      <div class="col-md-6">
        <ul class="babel-tick-list">
          <li><a href="/docs/plugins/transform-function-bind">Function bind</a></li>
          <li><a href="/docs/plugins/transform-regenerator">Generators</a></li>
          <li><a href="/docs/plugins/#modules">Modules</a></li>
          <li><a href="/docs/plugins/transform-export-extensions">Module export extensions</a></li>
          <li><a href="/docs/plugins/transform-es2015-literals">New literals</a></li>
          <li><a href="/docs/plugins/transform-object-rest-spread">Object rest/spread</a></li>
          <li><a href="/docs/plugins/transform-es2015-shorthand-properties">Property method assignment</a></li>
          <li><a href="/docs/plugins/transform-es2015-shorthand-properties">Property name shorthand</a></li>
          <li><a href="/docs/plugins/transform-es2015-parameters">Rest parameters</a></li>
          <li><a href="/docs/plugins/transform-es2015-parameters">Spread</a></li>
          <li><a href="/docs/plugins/transform-es2015-sticky-regex">Sticky regex</a></li>
          <li><a href="/docs/plugins/transform-es2015-template-literals">Template literals</a></li>
          <li><a href="/docs/plugins/syntax-trailing-function-commas">Trailing function commas</a></li>
          <li><a href="/docs/plugins/transform-flow-strip-types">Type annotations</a></li>
          <li><a href="/docs/plugins/transform-es2015-unicode-regex">Unicode regex</a></li>
        </ul>
      </div>

      <br>
      <p class="text-center"><a href="/learn-es2015/">了解更多关于 ES2015 &rarr;</a></p>
    </div>
  </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-6">
        <h2 id="polyfill">Polyfill</h2>
        <p>由于 Babel 只转换语法 (如箭头函数)， 你可以使用 babel-polyfill 支持新的全局变量，例如 Promise 、新的原生方法如 String.padStart (left-pad) 等。 它使用了 <a href="https://github.com/zloirock/core-js">core-js</a> 和 <a href="https://facebook.github.io/regenerator/">regenerator</a>。 查看 <a href="/docs/usage/polyfill">babel-polyfill</a> 文档获取更多信息。</p>

        <p>你可以通过以下方式安装 polyfill </p>
<div markdown="1">
```shell
npm install --save-dev babel-polyfill
```
</div>
        <p>使用它时需要让它在你的应用程序的入口起点或打包配置的入口起点的顶部。</p>
      </div>

      <div class="col-md-6">
        <div class="col-md-6">
          <ul class="babel-tick-list">
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer">ArrayBuffer</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from">Array.from</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of">Array.of</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin">Array#copyWithin</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill">Array#fill</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find">Array#find</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex">Array#findIndex</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name">Function#name</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map">Map</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh">Math.acosh</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot">Math.hypot</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul">Math.imul</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN">Number.isNaN</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger">Number.isInteger</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign">Object.assign</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors">Object.getOwnPropertyDescriptors</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is">Object.is</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries">Object.entries</a></li>
          </ul>
        </div>

        <div class="col-md-6">
          <ul class="babel-tick-list">
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values">Object.values</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf">Object.setPrototypeOf</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect">Reflect</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags">RegExp#flags</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set">Set</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt">String#codePointAt</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith">String#endsWith</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint">String.fromCodePoint</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes">String#includes</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw">String.raw</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat">String#repeat</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith">String#startsWith</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart">String#padStart</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd">String#padEnd</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol">Symbol</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap">WeakMap</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet">WeakSet</a></li>
          </ul>
        </div>

        <br>
        <p class="text-center"><a href="https://github.com/zloirock/core-js#index">了解更多特性 &rarr;</a></p>
      </div>
    </div>


  <hr class="featurette-divider">

  <div class="row featurette">

    <div class="col-md-7">
      <h2 id="jsx-and-flow">JSX 和 Flow</h2>
      <p>Babel能够转换 JSX 语法并去除类型注释。查看 <a href="https://babeljs.io/docs/plugins/preset-react/">React preset</a> 开始使用。与 <a href="https://github.com/babel/babel-sublime">babel-sublime</a> 同时使用可以将语法高亮提高到一个新的水平。</p>

      <p>你可以通过以下方式安装 preset </p>
<div markdown="1">
```shell
npm install --save-dev babel-preset-react
```
</div>
      <p>并添加 <code>"react"</code> 到你的 <code>.babelrc</code> 的 presets 数组中。</p>
    </div>
    <div class="col-md-5">
<div class="language-javascript highlighter-rouge"><pre class="highlight"><code><span class="kr">export</span> <span class="k">default</span> <span class="nx">React</span><span class="p">.</span><span class="nx">createClass</span><span class="p">({</span>
  <span class="nx">getInitialState</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="p">{</span> <span class="nx">num</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">getRandomNumber</span><span class="p">()</span> <span class="p">};</span>
  <span class="p">},</span>

  <span class="nx">getRandomNumber</span><span class="p">()</span><span class="o">:</span> <span class="nx">number</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">ceil</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">random</span><span class="p">()</span> <span class="o">*</span> <span class="mi">6</span><span class="p">);</span>
  <span class="p">},</span>

  <span class="nx">render</span><span class="p">()</span><span class="o">:</span> <span class="nx">any</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">&lt;div&gt;</span>
      <span class="s2">Your dice roll:</span>
      <span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">num</span><span class="p">}</span>
    <span class="nx">&lt;/div&gt;;</span>
  <span class="p">}</span>
<span class="p">});</span></code></pre></div>

      <p class="text-center">了解更多关于 <a href="https://facebook.github.io/jsx/">JSX</a> 和 <a href="http://flowtype.org/">Flow</a></p>
    </div>
  </div>

  <hr class="featurette-divider">

  <div class="row featurette">
    <div class="col-md-6">
      <h2 id="pluggable">可插拔性</h2>
      <p>Babel 是由很多 plugin 构成。 你可以使用已有的 plugin 或者自己编写 plugin 来组成属于你自己的转换通道。使用或者创建一个 <a href="/docs/plugins/#presets">preset</a> 可以让你轻松使用多个 plugin。<a href="/docs/plugins/">了解更多 &rarr;</a></p>
      <p>通过 <a href="https://astexplorer.net/#/KJ8AjD6maa">astexplorer.net</a> 快速创建一个插件或者使用 <a href="https://github.com/babel/generator-babel-plugin">generator-babel-plugin</a> 生成一个插件模板</p>
    </div>
    <div class="col-md-6">
<div markdown="1">
```javascript
// A plugin is just a function
export default function ({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split('').reverse().join('');
      }
    }
  };
}
```
</div>
    </div>
  </div>

  <hr class="featurette-divider">

  <div class="row featurette">
    <div class="col-md-4">
      <h2 id="debuggable">可调试性</h2>
      <p>支持 <strong>Source map</strong> 因此可以轻松调试编译后代码。</p>
    </div>
    <div class="col-md-8">
      <img src="{{ site.baseurl }}/images/featurettes/debuggable.png?t={{ site.time | date_to_xmlschema }}" alt="Debuggable Sourcemaps" class="featurette-image img-responsive">
    </div>
  </div>

  <!--<div class="row featurette">
    <div class="col-md-4">
      <h2>Readable</h2>
      <p>
        Formatting is retained if possible so your generated code is as similar
        as possible.
      </p>
    </div>
    <div class="col-md-4 col-sm-6">
<div markdown="1">
```javascript

```
</div>
      </div>
      <div class="col-md-4 col-sm-6">
<div markdown="1">
```javascript

```
</div>
    </div>
  </div>

  <!--<hr class="featurette-divider">

  <div class="row featurette">
    <div class="col-md-4 col-md-push-8">
      <h2>Compact</h2>
      <p>Babel uses the least amount of code possible with no dependence on a bulky runtime.</p>
    </div>
    <div class="col-md-4 col-md-pull-4 col-sm-6">
<div markdown="1">
```javascript

```
</div>
    </div>
    <div class="col-md-4 col-md-pull-4 col-sm-6">
<div markdown="1">
```javascript

```
</div>
    </div>
  </div>-->

  <hr class="featurette-divider">

  <div class="featurette">
    <h2 class="text-center">
      <a href="{{ site.baseurl }}/users/">
        谁在使用 Babel ?
      </a>
    </h2>

    <div class="babel-user-container babel-slider">
      {% for user in site.data.users limit:18 %}
        <div class="col-md-4 col-sm-6">
          <a class="babel-user" href="{{user.url}}" title="{{user.name}}">
            <img class="img-responsive" data-lazy="/images/users/{{user.logo}}" alt="{{user.name}}" data-proofer-ignore>
          </a>
        </div>
      {% endfor %}
    </div>

    <div class="text-center">
      <div class="btn-wrapper">
        <a href="{{ site.baseurl }}/users/" class="btn btn-sm btn-featured">Meet more Users</a>
      </div>
    </div>
  </div>

  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.4.1/slick.css">
</div>
