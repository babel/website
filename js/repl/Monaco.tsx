import { css, type CSSInterpolation } from "@emotion/css";
import * as monaco from "monaco-editor";
import React, { useRef, useEffect } from "react";
import { shikiToMonaco } from "@shikijs/monaco";
import { createHighlighterCoreSync } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import shikiTS from "@shikijs/langs/typescript";
import shikiDarkPlus from "@shikijs/themes/dark-plus";
import shikiLightPlus from "@shikijs/themes/light-plus";
import shikiWasm from "@shikijs/engine-oniguruma/wasm-inlined";

import { colors } from "./styles";
import { preferDarkColorScheme } from "./Utils";

type Props = {
  className: string;
  code: string;
  placeholder: string;
  onChange?: (value: string) => void;
  fileSize: string | boolean;
  lineWrapping: boolean;
  errorMessage: string;
  fastMode?: boolean;
};

const shikiPromise = (async function () {
  const engine = await createOnigurumaEngine(shikiWasm);

  shikiToMonaco(
    createHighlighterCoreSync({
      themes: [shikiDarkPlus, shikiLightPlus],
      langs: [shikiTS],
      engine: engine,
    }),
    monaco
  );
})();

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  jsx: monaco.languages.typescript.JsxEmit.React,
});

export default function MonacoWithShiki(props: Props) {
  const [asyncLoaded, setAsyncLoaded] = React.useState(false);
  React.useEffect(() => {
    shikiPromise.then(() => {
      setAsyncLoaded(true);
    });
  }, []);
  if (!asyncLoaded) {
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
  fastMode,
}: Props) {
  const container = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line prefer-const
  let [editor, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [rect, setRect] = React.useState<DOMRect | null>(null);

  useEffect(() => {
    setEditor(
      (editor = monaco.editor.create(container.current, {
        padding: {
          top: 2,
        },
        // https://github.com/microsoft/monaco-editor/issues/4311
        // automaticLayout: true,
        model: fastMode
          ? monaco.editor.createModel(
              "",
              "javascript",
              monaco.Uri.file("output/output.tsx")
            )
          : monaco.editor.createModel(
              "",
              "typescript",
              monaco.Uri.file(
                onChange ? "input/input.tsx" : "output/output.tsx"
              )
            ),
        placeholder,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        readOnly: !onChange,
      }))
    );
    if (onChange) {
      if (code) {
        editor.setValue(code);
      }
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
    function listener() {
      if (fastMode) {
        editor.updateOptions({
          theme: preferDarkColorScheme() ? "vs-dark" : "vs",
        });
      } else {
        editor.updateOptions({
          theme: preferDarkColorScheme() ? "dark-plus" : "light-plus",
        });
      }
    }
    listener();
    addEventListener("storage", listener);
    return () => {
      removeEventListener("storage", listener);
    };
  }, []);

  useEffect(() => {
    const server = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const contentRect = entry.contentRect;
        setRect(contentRect);
        if (
          !rect ||
          rect.width !== contentRect.width ||
          rect.height !== contentRect.height
        ) {
          editor.layout();
        }
      }
    });
    server.observe(container.current);
    return () => {
      server.disconnect();
    };
  }, []);

  useEffect(() => {
    editor.updateOptions({
      wordWrap: lineWrapping ? "on" : "off",
    });
  }, [lineWrapping]);

  if (!onChange) {
    useEffect(() => {
      if (code != null) {
        editor.setValue(code);
      }
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
