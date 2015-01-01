import {View, history} from 'backbone';
import $ from 'jquery';
import _ from 'lodash';
import to5 from '6to5/lib/6to5/browser';
import '6to5/browser-polyfill';
import Editor from '../components/editor';
import Toolbar from '../components/toolbar';

export default class Repl extends View {
  get el() {
    return $(document.body);
  }

  render() {
    this.toolbar = new Toolbar({
      el: this.$('.repl-options'),
      settings: this._getHash()
    }).render();

    this.listenTo(this.toolbar.settings, 'change', function() {
      this._updateHash();
    });

    this.input = new Editor({
      el: this.$('.repl-input .editor')
    }).render();

    this.output = new Editor({
      el: this.$('.repl-output .editor')
    }).render();

    this.output.setReadOnly();

    this.input.session.on('changeScrollTop', _.bind(this._updateOutputScroll, this));
    this.output.session.on('changeScrollTop', _.bind(this._updateInputScroll, this));

    this.input.on('change', this._updateCode);

    return this;
  }

  _updateInputScroll(scrollTop) {
    this._updateScroll(this.output, this.input, scrollTop);
  }

  _updateOutputScroll(scrollTop) {
    this._updateScroll(this.input, this.output, scrollTop);
  }

  _updateScroll(from, to, scrollTop) {
    if (this._isChanging) return;
    this._isChanging = true;
    var position = (scrollTop / from.getHeight()) * to.getHeight();
    to.session.setScrollTop(position);
    this._isChanging = false;
  }

  _getHash() {
    var hash = history.getHash().replace(/^\?/, '').split('&');
    return _.transform(hash, function(accumulator, item) {
      var parts = item.split('=');
      accumulator[parts[0]] = decodeURIComponent(parts[1]);
    }, {});
  }

  _updateHash() {
    var query = _.map(this.toolbar.settings.attributes, function(value, name) {
      return `${name}=${value}`;
    });
    query.push('code=' + encodeURIComponent(this.input.editor.getValue()));
    history._updateHash(history.location, '?' + query.join('&'), true);
  }

  _updateCode() {

  }
}
