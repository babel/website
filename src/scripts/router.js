import {Router} from 'backbone';
import IndexPage from './pages/index';
import PluginsPage from './pages/plugins';
import DocsPage from './pages/docs';
import ReplPage from './pages/repl';

export default class PageRouter extends Router {
  get routes() {
    return {
      '6to5.github.io/dist/index.html'      : 'index',
      '6to5.github.io/dist/plugins.html'    : 'plugins',
      '6to5.github.io/dist/repl.html'       : 'repl',
      '6to5.github.io/dist/tour.html'       : 'docs',
      '6to5.github.io/dist/usage.html'      : 'docs',
      '6to5.github.io/dist/compare.html'    : 'docs',
      '6to5.github.io/dist/caveats.html'    : 'docs',
      '6to5.github.io/dist/docs/:name.html' : 'docs'
    };
  }

  index() {
    new IndexPage().render();
  }

  plugins() {
    new PluginsPage().render();
  }

  repl() {
    new ReplPage().render();
  }

  docs() {
    new DocsPage().render();
  }
}