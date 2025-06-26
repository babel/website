declare const ace: any;
declare const Babel: any;

import React, { useEffect } from "react";
import debounce from "lodash.debounce";

import "../../static/css/minirepl.css";

const miniReplExamples = [
  "/(?i:a)b/",
  'using Flavortown = from(["Guy Fieri"]);',
  `Object.entries(payload)
  .map(
    ([key, value]) => [key, value.trim()]
  )
  |> Object.fromEntries(%);`,
  // use next(yourTurn) = throw "some code in here!"
  // when we support extractors
  'let yourTurn = throw "some code in here!"',
];

let inEditor;
let outEditor;

let runDemo = true;

const debouncedUpdate = debounce(function () {
  compileCode(inEditor, outEditor);
}, 1000);

function isMobile() {
  return window.screen.width < 760;
}

function setupEditor(id, readOnly) {
  ace.config.set(
    "basePath",
    "https://unpkg.com/ace-builds@1.3.3/src-min-noconflict"
  );
  const editor = ace.edit(id);

  editor.setOptions({
    // editor
    highlightActiveLine: false,
    readOnly: !!readOnly,

    // renderer
    fontSize: "1rem",
    highlightGutterLine: false,
    showGutter: false,
    showLineNumbers: false,
    theme: "ace/theme/tomorrow_night",

    // session
    mode: "ace/mode/javascript",
    tabSize: 2,
    useSoftTabs: true,
    useWorker: false,
    wrap: true,
  });

  editor.renderer.setPadding(24);
  editor.renderer.setScrollMargin(24, 24);
  editor.commands.removeCommands(["gotoline", "find"]);

  return editor;
}

function simulateKeys(editor, texts) {
  let textIndex = 0;
  let charIndex = 0;
  let timeout;

  function simulateKey(changingText?) {
    const delay = changingText ? 4000 : Math.round(Math.random() * 125) + 30;

    timeout = setTimeout(function () {
      if (!runDemo) {
        if (timeout) {
          clearTimeout(timeout);
        }
        return;
      }

      const text = texts[textIndex];

      charIndex++;

      editor.setValue(text.substring(0, charIndex), 1);

      if (charIndex < text.length) {
        simulateKey();
      } else if (charIndex === text.length && textIndex < texts.length - 1) {
        textIndex++;
        charIndex = 0;
        simulateKey(true);
      } else {
        editor.selection.selectAll();
        editor.setReadOnly(false);
        clearTimeout(timeout);
      }
    }, delay);
  }

  simulateKey();
}

function showError(editor, babelError) {
  editor.setValue("");
  const replErrorElement = document.querySelector(".hero-repl__error");
  if (replErrorElement) {
    replErrorElement.textContent = babelError;
    replErrorElement.classList.add("hero-repl__error--visible");
  }
}

function hideError() {
  document
    .querySelector(".hero-repl__error")
    ?.classList.remove("hero-repl__error--visible");
}

function compileCode(sourceEditor, targetEditor) {
  let transformed;

  try {
    transformed = Babel.transform(sourceEditor.getValue(), {
      presets: [
        "react",
        "typescript",
        ["env", { targets: "defaults", loose: true }],
      ],
      plugins: [
        ["external-helpers", { helperVersion: "7.100.0" }],
        // TODO: remove this when preset-env supports it
        ["transform-explicit-resource-management"],
        ["proposal-pipeline-operator", { proposal: "hack", topicToken: "%" }],
        ["proposal-throw-expressions"],
      ],
      filename: "repl.tsx",
      babelrc: false,
    });
  } catch (e) {
    showError(targetEditor, e.message);
  }

  if (transformed) {
    hideError();

    targetEditor.setValue(
      // Remove 'use strict' just for demonstration purposes
      transformed.code.replace(/['|"]use strict['|"];(\n\n)?/g, ""),
      -1
    );
  }
}

export default () => {
  useEffect(() => {
    (async () => {
      // don't init editor on mobile devices
      if (isMobile()) return;

      await import(
        // @ts-expect-error no types
        "https://unpkg.com/ace-builds@1.3.3/src-min-noconflict/ace.js"
      );

      inEditor = setupEditor("hero-repl-in", true);

      outEditor = setupEditor("hero-repl-out", true);
      outEditor.renderer.$cursorLayer.element.style.display = "none";

      setTimeout(function () {
        document
          .querySelector(".hero-repl")
          ?.classList.add("hero-repl--visible");
        simulateKeys(inEditor, miniReplExamples);
      }, 150);
    })();
  });
  return (
    <div className="hero-repl">
      <div className="hero-repl__editor">
        <div className="hero-repl__pane hero-repl__pane--left">
          <h3>Put in next-gen JavaScript</h3>
          <div
            id="hero-repl-in"
            className="hero-repl__code"
            onChange={() => {
              if (!inEditor.getValue()) {
                debouncedUpdate.cancel();
                outEditor.setValue("");
              }

              debouncedUpdate();
            }}
            onClick={() => {
              if (runDemo) {
                debouncedUpdate.cancel();
                runDemo = false;
                inEditor.setReadOnly(false);
                inEditor.setValue("");
                outEditor.setValue("");
              }
            }}
          />
        </div>
        <div className="hero-repl__pane hero-repl__pane--right">
          <h3>Get browser-compatible JavaScript out</h3>
          <div id="hero-repl-out" className="hero-repl__code" />
          <div className="hero-repl__error" />
        </div>
      </div>
    </div>
  );
};
