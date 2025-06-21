import { css, type CSSInterpolation } from "@emotion/css";
import CodeMirror from "./CodeMirror";
import React, { useRef } from "react";
import { colors } from "./styles";

type Props = {
  className?: string;
  code: string | undefined | null;
  errorMessage: string | undefined | null;
  info?: string | null;
  onChange?: (value: string) => void;
  options: {
    fileSize: boolean;
    lineWrapping: boolean;
  };
  placeholder?: string;
  fileSize: string;
};

export default function CodeMirrorPanel(props: Props) {
  const cmParentRef = useRef<HTMLDivElement>(null);
  const {
    className = "",
    code,
    errorMessage,
    fileSize,
    info,
    onChange,
    options,
    placeholder,
  } = props;

  return (
    <div className={`${styles.panel} ${className}`}>
      <div className={styles.codeMirror} ref={cmParentRef}>
        <CodeMirror
          onChange={onChange}
          options={{
            lineWrapping: options.lineWrapping,
            readOnly: onChange == null,
          }}
          parentRef={cmParentRef}
          placeholder={placeholder}
          preserveScrollPosition={onChange == null}
          value={code}
        />
        {options.fileSize && <div className={styles.fileSize}>{fileSize}</div>}
      </div>
      {info && <pre className={styles.info}>{info}</pre>}
      {errorMessage && <pre className={styles.error}>{errorMessage}</pre>}
    </div>
  );
}

const sharedBoxStyles: CSSInterpolation = {
  flex: "0 0 auto",
  maxHeight: "33%",
  overflow: "auto",
  margin: 0,
  padding: "0.5rem 0.75rem",
  fontFamily: "monospace",
  whiteSpace: "pre-wrap",
  WebkitOverflowScrolling: "touch",
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
