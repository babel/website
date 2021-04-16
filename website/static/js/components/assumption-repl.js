const template = document.createElement("template");
template.innerHTML = `
  <label>
    <input id="enabled" type="checkbox" checked /> Enabled
  </label>

  <mini-repl id="repl" vertical></mini-repl>
`;

class AssumptionRepl extends HTMLDivElement {
  _plugins = this.dataset.plugins.split(",");
  _assumption = this.dataset.assumption;
  _input = this.querySelector("code.assumption-input").textContent;

  _enabled = true;

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );

    this.shadowRoot.getElementById("repl").setInput(this._input);
  }

  connectedCallback() {
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
