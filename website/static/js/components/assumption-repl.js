const template = document.createElement("template");
template.innerHTML = `
  <label>
    <input id="enabled" type="checkbox" checked /> Enabled
  </label>

  <mini-repl id="repl" vertical></mini-repl>
`;

// Workaround: Pre-formatted text loses line breaks in MDX
// https://github.com/mdx-js/mdx/issues/1095
function extractRawCodeInput(codeEl) {
  const result = [];
  for (const lineEl of codeEl.querySelectorAll(".token-line")) {
    result.push(lineEl.textContent);
  }
  return result.join("\n");
}

class AssumptionRepl extends HTMLDivElement {
  _enabled = true;

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
  }

  connectedCallback() {
    this._plugins = this.dataset.plugins.split(",");
    this._assumption = this.dataset.assumption;
    this._input = extractRawCodeInput(this.querySelector("code"));
    const miniReplComponent = this.shadowRoot.getElementById("repl");
    customElements.upgrade(miniReplComponent);
    miniReplComponent.setInput(this._input);
    this._updateOptions();

    this.shadowRoot.getElementById("enabled").addEventListener("change", () => {
      this._enabled = !this._enabled;
      this._updateOptions();
    });
  }

  _updateOptions() {
    this.shadowRoot.getElementById("repl").options = {
      sourceType: "module",
      plugins: this._plugins.concat([
        ["transform-runtime", { version: "7.100.0" }],
      ]),
      assumptions: {
        [this._assumption]: this._enabled,
      },
    };
  }
}

customElements.define("assumption-repl", AssumptionRepl, { extends: "div" });
