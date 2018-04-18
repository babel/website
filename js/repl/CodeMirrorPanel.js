// @flow

import { css } from "emotion";
import CodeMirror from "./CodeMirror";
import React from "react";
import debounce from "lodash.debounce";
import { colors } from "./styles";

type Props = {
  className?: string,
  code: ?string,
  errorMessage: ?string,
  info?: ?string,
  onChange?: (value: string) => void,
  options: Object,
  placeholder?: string,
  fileSize: string,
};

type State = {
  value: ?string,
};

const DEBOUNCE_DELAY = 500;

export default class CodeMirrorPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.mapPropsToState(props);

  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState(this.mapPropsToState(nextProps));
  }

  mapPropsToState(props: Props) {
    return {
      value: props.code || '',
    };
  }

  _handleChange = debounce(
    (code: string) => this.props.onChange(code),
    DEBOUNCE_DELAY,
  );

  handleChange = (code: string) => {
    this.setState({ value: code });
    this._handleChange(code);
  };

  render() {
    const {
      className = "",
      code,
      errorMessage,
      fileSize,
      info,
      onChange,
      options,
      placeholder,
    } = this.props;

    let fileSizeBubble;

    if (options.fileSize && fileSize !== null) {
      fileSizeBubble = <div className={styles.fileSize}>{fileSize}</div>;
    }

    const readOnly = typeof onChange !== "function";

    return (
      <div className={`${styles.panel} ${className}`}>
        <div className={styles.codeMirror}>
          <CodeMirror
            onChange={!readOnly ? this.handleChange : null}
            options={{
              ...options,
              readOnly,
            }}
            placeholder={placeholder}
            preserveScrollPosition={readOnly}
            value={code}
          />
          {fileSizeBubble}
        </div>
        {info && <pre className={styles.info}>{info}</pre>}
        {errorMessage && <pre className={styles.error}>{errorMessage}</pre>}
      </div>
    );
  }
}

const sharedBoxStyles = {
  flex: "0 0 auto",
  maxHeight: "33%",
  overflow: "auto",
  margin: 0,
  padding: "0.5rem 0.75rem",
  whiteSpace: "pre-wrap",
  "-webkit-overflow-scrolling": "touch",
};

const styles = {
  codeMirror: css({
    bottom: "0",
    display: "flex",
    left: "0",
    overflow: "hidden",
    position: "absolute",
    right: "0",
    top: "0",
  }),
  error: css({
    order: 2,
    backgroundColor: colors.errorBackground,
    borderTop: `1px solid ${colors.errorBorder}`,
    color: colors.errorForeground,
    fontFamily: 'monospace',
    ...sharedBoxStyles,
  }),
  info: css({
    order: 1,
    backgroundColor: colors.infoBackground,
    borderTop: `1px solid ${colors.infoBorder}`,
    color: colors.infoForeground,
    ...sharedBoxStyles,
  }),
  panel: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    overflow: "auto",
    position: "relative",
  }),
  fileSize: css({
    position: "absolute",
    bottom: "1rem",
    right: "2rem",
    zIndex: 2,
    borderRadius: "0.5rem",
    padding: "0.5rem",
    backgroundColor: "rgba(225, 225, 225, 0.75)",
    color: "rgba(0, 0, 0, 0.5)",
    border: "0",
  }),
};
