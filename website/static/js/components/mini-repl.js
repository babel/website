/* globals Babel */

import debounce from "https://cdn.skypack.dev/pin/lodash-es@v4.17.21-rDGl8YjBUjcrrAbjNrmo/mode=imports,min/unoptimized/debounce.js";

// Uncomment the following imports when skypack can handle multiple copies of `FacetProvider` due
// to multiple entries, see https://github.com/babel/website/issues/2456#issuecomment-784245936

// import {
//   EditorState,
//   basicSetup,
// } from "https://cdn.skypack.dev/@codemirror/basic-setup@0.17.0";
// import { EditorView } from "https://cdn.skypack.dev/@codemirror/view@0.17.6";
// import { oneDark } from "https://cdn.skypack.dev/@codemirror/theme-one-dark@0.17.5";
// import { javascriptLanguage } from "https://cdn.skypack.dev/@codemirror/lang-javascript@0.17.2";

import {
  EditorState,
  basicSetup,
  EditorView,
  oneDark,
  javascriptLanguage,
} from "../build/cm6.mjs";

const template = document.createElement("template");
template.innerHTML = `
  <div>
    <div class="repl">
      <h3 class="input-title">Input code</h3>
      <h3 class="output-title">Output code</h3>
      <div id="repl-in" class="repl__code input-editor"></div>
      <div class="output-editor-container">
        <div id="repl-out" class="repl__code"></div>
        <div id="error" class="output-error"></div>
      </div>
    </div>

    <style>
      .repl {
        color: white;

        display: grid;
        grid-template:
          "input-title"
          "input-editor"
          "output-title"
          "output-editor";

        background: #353634;
      }

      @media (min-width: 992px) {
        .repl:not(.vertical) {
          grid-template:
            "input-title output-title"
            "input-editor output-editor"
            / 50% 50%;
        }
      }

      .input-title { grid-area: input-title }
      .output-title { grid-area: output-title }
      .input-editor { grid-area: input-editor }
      .output-editor-container { grid-area: output-editor }

      @media (min-width: 992px) {
        .input-title, .input-editor {
          border-right: 1px solid #4f504d;
        }
      }

      .input-editor, .output-editor-container {
        overflow-x: auto;
      }

      .output-editor-container {
        position: relative;
      }

      .output-error {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        background: #702141;
        font-family: monospace;
        font-size: 0.83rem;
        opacity: 0;
        overflow-y: auto;
        padding: 16px 24px;
        text-align: left;
        transition: opacity 0.25s ease-out;
        white-space: pre;
        display: none;
      }

      .output-error--visible {
        opacity: 1;
        display: block;
      }

      .repl__pane {
        background: #353634;
        border: 1px solid #4f504d;
        position: relative;
      }

      @media (min-width: 992px) {
        .repl__pane {
          width: 50%;
        }
      }

      .repl__code {
        background: #3f403e;
        font-family: monospace;
        font-size: 0.83rem;
        min-height: 125px;
        height: 100%;
        text-align: left;
      }
      @media (min-width: 992px) {
        .repl__code {
          font-size: 1rem;
          min-height: 200px;
        }

        .vertical .repl__code {
          min-height: 150px;
        }
      }

      .repl h3 {
        color: #b7b8b7;
        font-size: 0.875rem;
        margin: 0;
        padding: 12px 24px;
        text-align: center;
      }
      @media (min-width: 992px) {
        .repl h3 {
          font-size: 1rem;
          text-align: left;
        }
      }

      .repl__code .cm-wrap {
        height: 100%;
      }
    </style>
  </div>
`;

class MiniRepl extends HTMLElement {
  _defaultCode = this.getAttribute("default-code");
  _vertical = this.hasAttribute("vertical");
  _options = JSON.parse(this.getAttribute("options")) ?? {};

  _inEditor;
  _outEditor;

  _debouncedShowError = debounce(this._showError.bind(this), 1000);

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    if (this._vertical) {
      this.shadowRoot.querySelector(".repl").classList.add("vertical");
    }
  }

  connectedCallback() {
    const defaultCode = this.getAttribute("default-code") ?? "";

    this._inEditor = new EditorView({
      state: this._createInputEditorState(defaultCode),
      parent: this.shadowRoot.querySelector("#repl-in"),
      root: this.shadowRoot,
      dispatch: tr => {
        this._inEditor.update([tr]);
        this._render();
      },
    });
    this._outEditor = new EditorView({
      state: this._createOutputEditorState(""),
      parent: this.shadowRoot.querySelector("#repl-out"),
      root: this.shadowRoot,
    });

    this.shadowRoot
      .querySelector("#repl-in .cm-wrap")
      .addEventListener("click", () => {
        this._inEditor.focus();
      });
  }

  setInput(code) {
    this._inEditor.setState(this._createInputEditorState(code));
    this._render();
  }

  get options() {
    return this._options;
  }
  set options(options) {
    this._options = options;
    this._render();
  }

  _render() {
    const inputCode = this._inEditor.state.doc.toString();

    if (!inputCode) {
      this._outEditor.setState(this._createOutputEditorState(""));
      this._hideError();
      return;
    }

    try {
      const compiled = this._compile(inputCode);
      this._outEditor.setState(this._createOutputEditorState(compiled));
      this._hideError();
    } catch (err) {
      this._debouncedShowError(err.message);
    }
  }

  _compile(code) {
    return Babel.transform(code, this._options).code;
  }

  _createInputEditorState(content) {
    return EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        oneDark,
        javascriptLanguage,
        //EditorView.lineWrapping,
      ],
    });
  }

  _createOutputEditorState(content) {
    return EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        oneDark,
        javascriptLanguage,
        //EditorView.lineWrapping,
        EditorView.editable.of(false),
      ],
    });
  }

  _showError(babelError) {
    const err = this.shadowRoot.getElementById("error");
    err.textContent = babelError;
    err.classList.add("output-error--visible");
  }

  _hideError() {
    this._debouncedShowError.cancel();
    this.shadowRoot
      .getElementById("error")
      .classList.remove("output-error--visible");
  }
}

customElements.define("mini-repl", MiniRepl);

/*
<h2>noDocumentAll</h2>

<div class="repl" data-original-input="foo?.bar"></div>
*/
