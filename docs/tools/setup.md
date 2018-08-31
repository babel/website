<p>Great! You've configured Babel but you haven't made it actually <em>do</em> anything. Create a <a href="/docs/usage/babelrc">.babelrc</a> config in your project root and enable some <a href="/docs/plugins">plugins</a>.</p>

To start, you can use the <a href="https://babeljs.io/docs/plugins/preset-env/">env preset</a>, which enables transforms for ES2015+

To make use of Babel 7+ ( babel 7 and future versions ), one need to use the naming convention as with `@babel` as follows:

```shell
npm install @babel/preset-env --save-dev
```

In order to enable the preset with the new naming convention to use babel version 7 you have to define it in your <code>.babelrc</code> file, like this:

```json
{
  "presets": ["babel/env"]
}
```

<strong>Note</strong>: It is required to run babel 7 with naming convention with `@babel` otherwise your configuraion will give out error saying module not found, and it will show all the Babel modules i.e., babel-core, babel-preset-env, babel-preset-react, etc. Hence you need to install all those libraries as follows:

```shell
npm install @babel/core --save-dev
```

<strong>Note</strong>: Running a Babel 6.x project using npm 2.x can cause performance problems because of the way npm 2.x installs dependencies. This problem can be eliminated by either switching to npm 3.x or running npm 2.x with the <a href="https://docs.npmjs.com/cli/dedupe">dedupe</a> flag. To check what version of npm you have run

```shell
npm --version
```
