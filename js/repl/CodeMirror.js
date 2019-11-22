// @flow

import { injectGlobal, css } from "emotion";
import CodeMirror from "codemirror";
import React from "react";
import { colors } from "./styles";
import { preferDarkColorScheme } from "./Utils";

const DEFAULT_CODE_MIRROR_OPTIONS = {
  autoCloseBrackets: true,
  keyMap: "sublime",
  lineNumbers: true,
  matchBrackets: true,
  mode: "text/jsx",
  showCursorWhenSelecting: true,
  styleActiveLine: true,
  tabWidth: 2,
  theme: preferDarkColorScheme() ? "darcula" : "default",
};

type Props = {
  autoFocus: boolean,
  onChange: (value: string) => void,
  options: Object,
  placeholder?: string,
  value: ?string,
  preserveScrollPosition: boolean,
};

type State = {
  isFocused: boolean,
};

export default class ReactCodeMirror extends React.Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    preserveScrollPosition: false,
    // eslint-disable-next-line no-unused-vars
    onChange: (value: string) => {},
  };

  state = {
    isFocused: false,
  };

  _codeMirror: any;
  _textAreaRef: HTMLTextAreaElement | null;

  componentDidMount() {
    this._codeMirror = CodeMirror.fromTextArea(this._textAreaRef, {
      ...DEFAULT_CODE_MIRROR_OPTIONS,
      ...this.props.options,
    });
    this._codeMirror.on("change", this._onChange);
    this._codeMirror.setValue(this.props.value || "");
  }

  componentWillUnmount() {
    // is there a lighter-weight way to remove the cm instance?
    if (this._codeMirror) {
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

  _setTextAreaRef = (ref: HTMLTextAreaElement | null) => {
    this._textAreaRef = ref;
  };
}

injectGlobal({
  ".CodeMirror": {
    height: "100% !important",
    width: "100% !important",
    "-webkit-overflow-scrolling": "touch",
  },
  ".CodeMirror pre.CodeMirror-placeholder.CodeMirror-line-like": css({
    color: colors.foregroundLight,
  }),
});
