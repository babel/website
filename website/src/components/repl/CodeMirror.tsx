import { basicSetup } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { tsxLanguage } from "@codemirror/lang-javascript";
import { EditorState, Compartment } from "@codemirror/state";
import {
  EditorView,
  placeholder as placeholderExtension,
} from "@codemirror/view";
// Only use type imports for @codemirror/* so that CodeMirror.tsx can share
// the cm6.mjs with the mini-repl.js component
import { type EditorState as EditorStateType } from "@codemirror/state";
import {
  type ViewUpdate,
  type EditorView as EditorViewType,
} from "@codemirror/view";
import React, { useRef, useEffect } from "react";

type Props = {
  onChange: (value: string) => void | null;
  options: {
    lineWrapping: boolean;
    readOnly: boolean;
  };
  parentRef: React.MutableRefObject<HTMLElement>;
  placeholder?: string;
  value: string | undefined | null;
  preserveScrollPosition: boolean;
};

export default function ReactCodeMirror({
  value,
  onChange,
  options,
  parentRef,
  placeholder,
  preserveScrollPosition,
}: Props) {
  const viewRef = useRef<EditorViewType>(null);
  const lineWrappingCompartmentRef = useRef<Compartment>(new Compartment());
  const darkThemeCompartmentRef = useRef<Compartment>(new Compartment());

  useEffect(() => {
    const darkColorSchemeQuery = window.matchMedia(
      "(prefers-color-scheme:dark)"
    );
    const editorState: EditorStateType = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        tsxLanguage,
        darkThemeCompartmentRef.current.of(
          darkColorSchemeQuery.matches ? oneDark : []
        ),
        // We don't use compartment here since readonly can not be changed from UI
        EditorView.editable.of(!options.readOnly),
        placeholderExtension(placeholder),
        lineWrappingCompartmentRef.current.of([]),
        onChange
          ? EditorView.updateListener.of((update: ViewUpdate) => {
              if (update.docChanged) {
                onChange(update.state.doc.toString());
              }
            })
          : [],
        EditorView.theme({
          "&": {
            backgroundColor: "#fff",
            height: "100%",
            maxHeight: "100%",
          },
        }),
      ],
    });

    viewRef.current ??= new EditorView({
      state: editorState,
      parent: parentRef.current,
    });

    const onColorSchemeChange = () => {
      viewRef.current.dispatch({
        effects: darkThemeCompartmentRef.current.reconfigure(
          darkColorSchemeQuery.matches ? oneDark : []
        ),
      });
    };

    darkColorSchemeQuery.addEventListener("change", onColorSchemeChange);

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
        lineWrappingCompartmentRef.current = null;
        darkThemeCompartmentRef.current = null;
      }
      darkColorSchemeQuery.removeEventListener("change", onColorSchemeChange);
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

  return <></>;
}
