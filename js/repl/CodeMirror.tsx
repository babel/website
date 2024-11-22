import {
  Compartment,
  EditorState,
  basicSetup,
  EditorView,
  placeholder as placeholderExtension,
  oneDark,
  tsxLanguage,
} from "../cm6.mjs";
// Only use type imports for @codemirror/* so that CodeMirror.tsx can share
// the cm6.mjs with the mini-repl.js component
import { type EditorState as EditorStateType } from "@codemirror/state";
import {
  type ViewUpdate,
  type EditorView as EditorViewType,
} from "@codemirror/view";
import { injectGlobal } from "@emotion/css";
import { preferDarkColorScheme } from "./Utils";
import React, { useRef, useEffect } from "react";

type Props = {
  onChange: (value: string) => void | null;
  options: {
    lineWrapping: boolean;
    readOnly: boolean;
  };
  placeholder?: string;
  value: string | undefined | null;
  preserveScrollPosition: boolean;
};

export default function ReactCodeMirror({
  value,
  onChange,
  options,
  placeholder,
  preserveScrollPosition,
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorViewType>(null);
  const lineWrappingCompartmentRef = useRef<Compartment>(new Compartment());

  useEffect(() => {
    const editorState: EditorStateType = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        tsxLanguage,
        preferDarkColorScheme() ? oneDark : false,
        // We don't use compartment here since readonly can not be changed from UI
        EditorView.editable.of(!options.readOnly),
        placeholderExtension(placeholder),
        lineWrappingCompartmentRef.current.of([]),
        onChange &&
          EditorView.updateListener.of((update: ViewUpdate) => {
            if (update.docChanged) {
              onChange(update.state.doc.toString());
            }
          }),
        EditorView.theme({
          "&": {
            height: "100%",
            maxHeight: "100%",
          },
        }),
      ].filter(Boolean),
    });

    viewRef.current ??= new EditorView({
      state: editorState,
      parent: parentRef.current,
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  // handle value prop updates
  useEffect(() => {
    if (value == null) {
      return;
    }
    const currentValue = viewRef.current?.state.doc.toString();
    if (viewRef.current && value !== currentValue) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: currentValue.length,
          insert: value,
        },
        effects: [
          preserveScrollPosition &&
            EditorView.scrollIntoView(0, {
              yMargin: -viewRef.current.scrollDOM.scrollTop,
            }),
        ].filter(Boolean),
      });
    }
  }, [value]);

  // handle lineWrapping updates
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: lineWrappingCompartmentRef.current.reconfigure(
          options.lineWrapping ? EditorView.lineWrapping : []
        ),
      });
    }
  }, [options.lineWrapping]);

  return <div ref={parentRef} className="CodeMirror" />;
}

injectGlobal({
  ".CodeMirror": {
    height: "100% !important",
    background: "#fff",
  },
});
