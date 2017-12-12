// @flow

import { css } from "emotion";
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
  onChange: (value: string) => void,
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
  _container: HTMLDivElement;

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this._codeMirror = CodeMirror(this._container, {
      value: this.props.value || "",
      placeholder: this.props.placeholder,
      autofocus: this.props.autoFocus,
      ...DEFAULT_CODE_MIRROR_OPTIONS,
      ...this.props.options,
    });
    this._codeMirror.on("change", this._onChange);
  }

  componentWillUnmount() {
    const container = this._container;
    container.removeChild(container.children[0]);
    this._codeMirror = null;
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
    return <div className={styles.editor} ref={c => (this._container = c)} />;
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
}

const styles = {
  editor: css({
    overflow: "auto",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
  }),
};

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
