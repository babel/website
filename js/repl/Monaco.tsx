import { css, type CSSInterpolation } from "@emotion/css";
import * as monaco from "monaco-editor";
import React, { useRef, useEffect } from "react";
import { shikiToMonaco } from "@shikijs/monaco";
import { createHighlighter, type HighlighterCore } from "shiki/bundle/web";

import { colors } from "./styles";

type Props = {
  className: string;
  code: string;
  placeholder: string;
  onChange?: (value: string) => void;
  fileSize: string | boolean;
  lineWrapping: boolean;
  errorMessage: string;
};
let highlighter: HighlighterCore;

export default function MonacoWithShiki(props: Props) {
  createHighlighter({
    themes: ["dark-plus"],
    langs: ["typescript"],
  }).then((res) => {
    highlighter = res;
  });
  if (!highlighter) {
    return null;
  }
  return <Monaco {...props} />;
}

function Monaco({
  className,
  code,
  placeholder,
  onChange,
  fileSize,
  lineWrapping,
  errorMessage,
}: Props) {
  const container = useRef<HTMLDivElement>(null);
  let [editor, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    shikiToMonaco(highlighter, monaco);
    setEditor(
      (editor = monaco.editor.create(container.current, {
        padding: {
          top: 2,
        },
        theme: "dark-plus",
        automaticLayout: true,
        language: "typescript",
        placeholder,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        readOnly: !onChange,
      }))
    );
    if (onChange) {
      code && editor.setValue(code);
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        if (value !== code) {
          onChange(value);
        }
      });
    }

    return () => {
      editor.dispose();
    };
  }, []);

  useEffect(() => {
    editor.updateOptions({
      wordWrap: lineWrapping ? "on" : "off",
    });
  }, [lineWrapping]);

  if (!onChange) {
    useEffect(() => {
      code != null && editor.setValue(code);
    }, [code]);
  }

  return (
    <div className={`${styles.panel} ${className}`}>
      <div ref={container} className={styles.editor}>
        {fileSize !== false && (
          <div className={styles.fileSize}>{fileSize}</div>
        )}
      </div>
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
  panel: css({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    overflow: "auto",
  }),
  editor: css({
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
