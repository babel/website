# babel.github.io

This is the source for the [babeljs.io](https://babeljs.io) website, powered by [Jekyll](http://www.jekyllrb.com/), Webpack, as well as Babel itself.

This repo also contains Babel's [source documentation](https://github.com/babel/babel.github.io/tree/master/docs).

### Setup

Run `make build` to perform initial setup (such as install dependencies from `npm`), then run `make serve` to start the development web server. The server will watch for changes to any of the files, and automatically rebuild the site as needed. If changing any of the JavaScript bundles (for example, the REPL), also run `webpack -w` to watch the files and rebuild the bundles as needed.

To just build the site without running the development server or watching for changes, run `make build`. The built site will be in the `_site` directory.
