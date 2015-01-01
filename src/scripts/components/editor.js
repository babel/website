import {View} from 'backbone';
import _ from 'lodash';

export default class Editor extends View {
  render() {
    this.editor = ace.edit(this.el);
    this.renderer = this.editor.renderer;
    this.session = this.editor.getSession();
    this.document = this.session.getDocument();

    this.editor.setTheme('ace/theme/tomorrow');
    this.editor.setShowPrintMargin(false);
    this.$el.css({
      fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
      lineHeight: 'inherit'
    });

    this.session.setMode('ace/mode/javascript');
    this.session.setUseSoftTabs(true);
    this.session.setTabSize(2);

    return this;
  }

  setReadOnly() {
    this.editor.setReadOnly(true);
    this.editor.setHighlightActiveLine(false);
    this.editor.setHighlightGutterLine(false);
  }

  getHeight() {
    return this.renderer.lineHeight * this.document.getLength();
  }
}