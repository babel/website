// @flow

import { css } from "emotion";
import CodeMirror from "./CodeMirror";
import React from "react";
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

export default function CodeMirrorPanel(props: Props) {
  const {
    className = "",
    errorMessage,
    fileSize,
    info,
    onChange,
    options,
  } = props;

  return (
    <div className={`${styles.panel} ${className}`}>
      <div className={styles.codeMirror}>
        <CodeMirror
          onChange={onChange}
          options={{
            ...props.options,
            readOnly: onChange == null,
          }}
          placeholder={props.placeholder}
          preserveScrollPosition={onChange == null}
          value={props.code}
        />
        {options.fileSize && <div className={styles.fileSize}>{fileSize}</div>}
      </div>
      {info && <pre className={styles.info}>{info}</pre>}
      {errorMessage && <pre className={styles.error}>{errorMessage}</pre>}
    </div>
  );
}

const sharedBoxStyles = {
  flex: "0 0 auto",
  maxHeight: "33%",
  overflow: "auto",
  margin: 0,
  padding: "0.5rem 0.75rem",
  fontFamily: "monospace",
  whiteSpace: "pre-wrap",
  "-webkit-overflow-scrolling": "touch",
};

const styles = {
  codeMirror: css({
    display: "block",
    height: "100%",
    width: "100%",
    overflow: "auto",
    position: "relative",
  }),
  error: css({
    order: 2,
    backgroundColor: colors.errorBackground,
    borderTop: `1px solid ${colors.errorBorder}`,
    color: colors.errorForeground,
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    overflow: "auto",
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
