// @flow

import { css } from "glamor";
import CodeMirror from "./CodeMirror";
import React from "react";
import { colors } from "./styles";

type Props = {
  className?: string,
  code: ?string,
  error: ?Error,
  info?: ?string,
  onChange?: (value: string) => void,
  options: Object,
  placeholder?: string,
};

export default function CodeMirrorPanel(props: Props) {
  const { className = "", error, info, onChange } = props;

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
      </div>
      {info &&
        <pre className={styles.info}>
          {info}
        </pre>}
      {error &&
        <pre className={styles.error}>
          {error.message}
        </pre>}
    </div>
  );
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
    display: "block",
    height: "100%",
    width: "100%",
    overflow: "auto",
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
};
