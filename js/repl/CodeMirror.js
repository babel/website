// @flow

import { injectGlobal } from "emotion";
import CodeMirror from "codemirror";
import React from "react";
import { colors } from "./styles";

const DEFAULT_CODE_MIRROR_OPTIONS = {
  autoCloseBrackets: true,
  keyMap: "sublime",
  lineNumbers: true,
  matchBrackets: true,
  mode: "text/jsx",
  showCursorWhenSelecting: true,
  styleActiveLine: true,
  tabWidth: 2,
};

type Props = {
  autoFocus: boolean,
  highlight?: Array<Object>,
  onChange: (value: string) => void,
  onCursorActivity?: Function,
  options: Object,
  placeholder?: string,
  value: ?string,
  preserveScrollPosition: boolean,
};

export default class ReactCodeMirror extends React.Component {
  static defaultProps = {
    autoFocus: false,
    preserveScrollPosition: false,
    // eslint-disable-next-line no-unused-vars
    onChange: (value: string) => {},
  };

  props: Props;
  state = {
    isFocused: false,
  };

  _codeMirror: any;
  _textAreaRef: HTMLTextAreaElement;

  componentDidMount() {
    this._codeMirror = CodeMirror.fromTextArea(this._textAreaRef, {
      ...DEFAULT_CODE_MIRROR_OPTIONS,
      ...this.props.options,
    });
    this._codeMirror.on("change", this._onChange);

    this._onMouseMove = this._onMouseMove.bind(this);
    if (this.props.onCursorActivity) {
      this._codeMirror.getScrollerElement().addEventListener('mousemove', this._onMouseMove);
    }

    this._codeMirror.setValue(this.props.value || "");
    this._highlightMarkedCode();
  }

  componentWillUnmount() {
    // is there a lighter-weight way to remove the cm instance?
    if (this._codeMirror) {
      if (this.props.onCursorActivity) {
        this._codeMirror.getScrollerElement().removeEventListener('mousemove', this._onMouseMove);
      }

      this._codeMirror.toTextArea();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.value &&
      nextProps.value !== this.props.value &&
      this._codeMirror.getValue() !== nextProps.value
    ) {
      if (nextProps.preserveScrollPosition) {
        const prevScrollPosition = this._codeMirror.getScrollInfo();
        this._codeMirror.setValue(nextProps.value);
        this._codeMirror.scrollTo(
          prevScrollPosition.left,
          prevScrollPosition.top
        );
      } else {
        this._codeMirror.setValue(nextProps.value);
      }
    } else if (!nextProps.value) {
      this._codeMirror.setValue("");
    }

    if (!this.props.onCursorActivity && nextProps.onCursorActivity) {
      this._codeMirror.getScrollerElement().addEventListener('mousemove', this._onMouseMove);
    }

    this._highlightMarkedCode();

    if (typeof nextProps.options === "object") {
      for (const optionName in nextProps.options) {
        if (nextProps.options.hasOwnProperty(optionName)) {
          this._updateOption(optionName, nextProps.options[optionName]);
        }
      }
    }
  }

  focus() {
    if (this._codeMirror) {
      this._codeMirror.focus();
    }
  }

  render() {
    return (
      <textarea
        autoComplete="off"
        autoFocus={this.props.autoFocus}
        defaultValue={this.props.value}
        ref={this._setTextAreaRef}
        placeholder={this.props.placeholder}
      />
    );
  }

  _onMouseMove = (e: Object) => {
    const coords = { left: e.pageX, top: e.pageY };
    const position = this._codeMirror.coordsChar(coords);

    //$FlowFixMe
    this.props.onCursorActivity(position);
  }

  _highlightMarkedCode = () => {
    this._codeMirror.getDoc().getAllMarks().forEach(mark => mark.clear());

    if (!this.props.highlight) return;

    this.props.highlight.forEach(mark => {
      const css = mark.active
        ? [`background: ${colors.inverseBackgroundDark}`, `color: ${colors.inverseForeground}`]
        : [`background: ${colors.inverseBackgroundLight}`]
      if (mark.cursor) {
        css.push(`cursor: pointer`);
      }
      this._codeMirror.getDoc().markText(
        { line: mark.line, ch: mark.columnStart },
        { line: mark.line, ch: mark.columnEnd },
        {
          css: css.join(';')
        }
      );
    });

    /**
     * Attempt below to scroll to the relevant portion.
     * Disabled, because the code can be well-distributed in Babel and jumping to the top
     * is not useful, it makes it impossible to review all items.
     * To be rewritten as: "is _any_ highlight viewable? if not, scroll to the first".
     */
    // const firstLine = this.props.highlight.reduce((acc, val) => {
    //   return (!acc && val.line) ? val.line : null;
    // }, null);

    // if (firstLine) {
    //   // try to centralize the element
    //   const t = this._codeMirror.charCoords({ line: firstLine, ch: 0 }, "local").top;
    //   const middleHeight = this._codeMirror.getScrollerElement().offsetHeight / 2;
    //   this._codeMirror.scrollTo(null, t - middleHeight - 5);
    // }
  }

  _updateOption(optionName: string, newValue: any) {
    const oldValue = this._codeMirror.getOption(optionName);

    if (oldValue !== newValue) {
      this._codeMirror.setOption(optionName, newValue);
    }
  }

  _onChange = (doc: any, change: any) => {
    if (change.origin !== "setValue") {
      this.props.onChange(doc.getValue());
    }
  };

  _setTextAreaRef = (ref: HTMLTextAreaElement) => {
    this._textAreaRef = ref;
  };
}

injectGlobal({
  ".CodeMirror": {
    height: "100% !important",
    width: "100% !important",
    "-webkit-overflow-scrolling": "touch",
  },
  ".CodeMirror-lines pre.CodeMirror-placeholder": {
    color: colors.foregroundLight,
  },
});
