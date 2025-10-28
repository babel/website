import { css, type CSSInterpolation } from "@emotion/css";
import * as monaco from "monaco-editor";
import * as monacoBasicTS from "monaco-editor/esm/vs/basic-languages/typescript/typescript.js";
import React, { useRef, useEffect } from "react";
import { shikiToMonaco } from "@shikijs/monaco";
import { createHighlighterCoreSync } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import shikiTS from "@shikijs/langs/typescript";
import shikiDarkPlus from "@shikijs/themes/dark-plus";
import shikiLightPlus from "@shikijs/themes/light-plus";
import shikiWasm from "@shikijs/engine-oniguruma/wasm-inlined";
import debounce from "lodash.debounce";

import { colors } from "./lib/styles";
import { preferDarkColorScheme } from "./lib/utils";

type Props = {
  filename: "input.tsx" | "output.jsx" | "babel.config.json";
  code: string;
  placeholder: string;
  onChange?: (value: string) => void;
  onSelect?: (range: number | null) => void;
  fileSize?: string | boolean;
  lineWrapping?: boolean;
  errorMessage?: string;
  selectedRange?: [number, number] | null;
};

const asyncPromise = (async function () {
  const engine = await createOnigurumaEngine(shikiWasm);

  shikiToMonaco(
    createHighlighterCoreSync({
      themes: [shikiDarkPlus, shikiLightPlus],
      langs: [shikiTS],
      engine: engine,
    }),
    monaco
  );

  const element = document.createElement("div");
  const editor = monaco.editor.create(element, {
    model: monaco.editor.createModel(
      "",
      "typescript",
      monaco.Uri.file("empty.tsx")
    ),
  });
  await new Promise((resolve) => {
    editor.onDidChangeModelLanguageConfiguration(() => {
      editor.getModel().dispose();
      editor.dispose();
      element.remove();
      resolve(null);
    });
  });
})();

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  jsx: monaco.languages.typescript.JsxEmit.React,
  module: monaco.languages.typescript.ModuleKind.ESNext,
  target: monaco.languages.typescript.ScriptTarget.Latest,
});

monaco.languages.registerTokensProviderFactory("javascript", {
  create() {
    return { ...monacoBasicTS.language, tokenPostfix: ".js" };
  },
});

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  comments: "ignore",
  trailingCommas: "ignore",
});

export async function load() {
  await asyncPromise;
}

export function Monaco({
  filename,
  code,
  placeholder,
  onChange,
  onSelect,
  fileSize = false,
  lineWrapping = true,
  errorMessage,
  selectedRange,
}: Props) {
  if (code == null) code = "";

  const container = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line prefer-const
  let [editor, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const positionChangedRef = useRef<number>(0);

  useEffect(() => {
    setEditor(
      (editor = monaco.editor.create(container.current, {
        fontSize: 14,
        // https://github.com/microsoft/monaco-editor/issues/4311
        // automaticLayout: true,
        model: monaco.editor.createModel(
          code,
          {
            __proto__: null,
            "input.tsx": "typescript",
            "output.jsx": "javascript",
            "babel.config.json": "json",
          }[filename],
          monaco.Uri.file(filename)
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
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue() || "";
        onChange(value);
      });
    }
    if (onSelect) {
      editor.onDidChangeCursorPosition(
        debounce((e) => {
          if (Date.now() - positionChangedRef.current < 200) {
            return;
          }
          onSelect(editor.getModel().getOffsetAt(e.position));
        }, 150)
      );
    }

    function listener() {
      editor.updateOptions({
        theme: preferDarkColorScheme() ? "dark-plus" : "light-plus",
      });
    }
    listener();
    addEventListener("storage", listener);

    return () => {
      removeEventListener("storage", listener);

      editor.getModel().dispose();
      editor.dispose();
    };
  }, []);

  useEffect(() => {
    const model = editor.getModel();
    if (selectedRange) {
      editor.setSelection(
        monaco.Range.fromPositions(
          model.getPositionAt(selectedRange[0]),
          model.getPositionAt(selectedRange[1])
        )
      );
      positionChangedRef.current = Date.now();
    } else {
      editor.setSelection(new monaco.Range(0, 0, 0, 0));
    }
  }, [selectedRange]);

  useEffect(() => {
    const server = new ResizeObserver(() => {
      setTimeout(() => {
        editor.layout();
      }, 0);
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
      editor.setValue(code);
    }, [code]);
  }

  return (
    <div className={`${styles.panel}`}>
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
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    minHeight: 0,
  }),
  editor: css({
    display: "block",
    height: "100%",
    width: "100%",
    minHeight: 0,
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
