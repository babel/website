const template = document.createElement("template");
template.innerHTML = `
  <slot name="name"></slot>

  <!-- description -->
  <slot></slot>

  <br>

  <label><input id="enabled" type="checkbox" checked /> Enabled</label>
  <mini-repl id="repl"></mini-repl>
`;

class AssumptionDocs extends HTMLElement {
  _plugins = this.getAttribute("plugins").split(",");
  _assumption = this.getAttribute("assumption");

  _enabled = true;

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );

    this.shadowRoot
      .getElementById("repl")
      .setInput(this.getAttribute("default-code"));
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

customElements.define("assumption-docs", AssumptionDocs);
