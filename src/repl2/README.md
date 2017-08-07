# Babel REPL

Try it out at [bvaughn.github.io/babel-repl](https://bvaughn.github.io/babel-repl/).

## Features
* Comlpetely re-written with React for easier future maintanence.
* Fully Flow-typed.
* Large plugins (eg Babili, Prettier) load on-demand, only if enabled.
  * Loading doesn't block compilation; once a plugin loads, code will be auto-recompiled.
  * This framework can be extended for third party plugins (loaded directly from NPM).
* Mobile-friendly layout.