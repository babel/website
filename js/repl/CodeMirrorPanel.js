// @flow

import { css } from "emotion";
import CodeMirror from "./CodeMirror";
import React from "react";
import { colors } from "./styles";
import prettyFormat from "pretty-format";

type Props = {
  className?: string,
  code: ?string,
  errorMessage: ?string,
  info?: ?string,
  onChange?: (value: string) => void,
  options: Object,
  placeholder?: string,
  evaluateOutput?: Boolean,
  logs?: Array<mixed>,
};

export default function CodeMirrorPanel(props: Props) {
  const { className = "", errorMessage, info, onChange, logs = [] } = props;
  const hasLogs = logs.length > 0;
  return (
    <div className={`${styles.panel} ${className}`}>
      <div className={`${styles.codeMirror} ${hasLogs ? styles.hasLogs : ""}`}>
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
      </div>
      {logs.length > 0 && (
        <pre className={styles.evaluatedOp}>
          <PrintLogs logs={logs} />
        </pre>
      )}
      {info && <pre className={styles.info}>{info}</pre>}
      {errorMessage && <pre className={styles.error}>{errorMessage}</pre>}
    </div>
  );
}

const PrintLogs = ({ logs }) => {
  return logs.map((log, idx) => {
    return <p key={idx}>{prettyFormat(log)}</p>;
  });
};

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
    display: "block",
    height: "100%",
    width: "100%",
    overflow: "auto",
  }),
  hasLogs: css({
    height: "calc(100% - 100px)",
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
  evaluatedOp: css({
    backgroundColor: colors.evaluatedOpBackground,
    color: colors.evaluatedOpForeground,
    ...sharedBoxStyles,
    height: "100px",
  }),
  output: css({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    overflow: "auto",
  }),
};
