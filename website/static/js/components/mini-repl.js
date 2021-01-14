/* globals Babel */

import debounce from "https://cdn.skypack.dev/lodash-es/debounce";
import {
  EditorState,
  basicSetup,
} from "https://cdn.skypack.dev/@codemirror/basic-setup";
import { EditorView } from "https://cdn.skypack.dev/@codemirror/view";
import { oneDark } from "https://cdn.skypack.dev/@codemirror/theme-one-dark";
import { javascriptLanguage } from "https://cdn.skypack.dev/@codemirror/lang-javascript";

const template = document.createElement("template");
template.innerHTML = `
  <div>
    <div class="repl">
      <div class="repl__editor">
        <div class="repl__pane repl__pane--left">
          <h3>
            Input code
          </h3>
          <div id="repl-in" class="repl__code repl-in"></div>
        </div>
        <div class="repl__pane repl__pane--right">
          <h3>
            Output code
          </h3>
          <div id="repl-out" class="repl__code repl-out" />
        </div>
        <div id="error" class="repl__error" />
      </div>
    </div>

    <style>
      .repl {
        color: white;
        max-width: 1024px;
        margin: 0 auto;
      }
      .repl__error {
        background: #702141;
        bottom: 0;
        font-family: monospace;
        font-size: 0.83rem;
        left: 0;
        opacity: 0;
        overflow-y: auto;
        padding: 16px 24px;
        position: absolute;
        right: 0;
        text-align: left;
        transition: opacity 0.25s ease-out;
        top: 47px;
        white-space: pre;
        display: none;
      }
      .repl__error--visible {
        opacity: 1;
        display: block;
      }
      .repl__editor {
        display: flex;
        flex-direction: column;
      }
      @media (min-width: 992px) {
        .repl__editor {
          flex-direction: row;
        }
      }
      .repl__pane {
        background: #353634;
        border: 1px solid #4f504d;
        position: relative;
      }

      @media (min-width: 992px) {
        .repl__pane {
          flex: 1 1 50%;
        }
      }

      .repl__code {
        background: #3f403e;
        font-family: monospace;
        font-size: 0.83rem;
        height: 125px;
        text-align: left;
        overflow-y: auto;
      }
      @media (min-width: 992px) {
        .repl__code {
          font-size: 1rem;
          height: 200px;
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
    </style>
  </div>
`;

class MiniRepl extends HTMLElement {
  _defaultCode = this.getAttribute("default-code");
  _options = JSON.parse(this.getAttribute("options")) ?? {};

  _inEditor;
  _outEditor;

  _debouncedShowError = debounce(this._showError.bind(this), 1000);

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log(this.getAttribute("default-code"));
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

    //this._inEditor.on("input", () => this._render());
  }

  set inputCode(code) {
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
        javascriptLanguage.extension,
        EditorView.lineWrapping,
      ],
    });
  }

  _createOutputEditorState(content) {
    return EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        oneDark,
        javascriptLanguage.extension,
        EditorView.lineWrapping,
        EditorView.editable.of(false),
      ],
    });
  }

  _showError(babelError) {
    const err = this.shadowRoot.getElementById("error");
    err.textContent = babelError;
    err.classList.add("repl__error--visible");
  }

  _hideError() {
    this._debouncedShowError.cancel();

    this.shadowRoot
      .getElementById("error")
      .classList.remove("repl__error--visible");
  }
}

customElements.define("mini-repl", MiniRepl);

/*
<h2>noDocumentAll</h2>

<div class="repl" data-original-input="foo?.bar"></div>
*/
