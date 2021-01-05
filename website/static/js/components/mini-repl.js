/* globals ace Babel */

import debounce from "https://cdn.skypack.dev/lodash-es/debounce";

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
        bottom: 0;F
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
      }
      .repl__error--visible {
        opacity: 1;
      }
      .repl__footer {
        background: #353634;
        border: 1px solid #4f504d;
        border-radius: 0 0 4px 4px;
        color: #b7b8b7;
      }
      .repl__footer a {
        color: #b7b8b7;
        display: block;
        padding: 1rem 0;
        text-decoration: underline;
        transition: all 0.25s ease-out;
      }
      .repl__footer a:hover {
        background: #4f504d;
        color: #fff;
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
    this._inEditor = this._setupEditor("#repl-in");
    this._outEditor = this._setupEditor("#repl-out", true);

    const defaultCode = this.getAttribute("default-code");
    if (defaultCode) this._inEditor.setValue(defaultCode, 1);

    this._inEditor.on("input", () => this._render());
  }

  set inputCode(code) {
    this._inEditor.setValue(code, 1);
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
    const inputCode = this._inEditor.getValue();

    if (!inputCode) {
      this._outEditor.setValue("");
      this._hideError();
      return;
    }

    try {
      const compiled = this._compile(inputCode);
      this._outEditor.setValue(compiled, 1);
      this._hideError();
    } catch (err) {
      this._debouncedShowError(err.message);
    }
  }

  _compile(code) {
    return Babel.transform(code, this._options).code;
  }

  _setupEditor(id, readOnly = false) {
    const editor = ace.edit(this.shadowRoot.querySelector(id));

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
    editor.renderer.attachToShadowRoot();

    return editor;
  }

  _showError(babelError) {
    this._outEditor.setValue("");
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
