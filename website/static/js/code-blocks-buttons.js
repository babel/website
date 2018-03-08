/* global ClipboardJS */
/* eslint quotes: ["error", "double", { "avoidEscape": true }] */
window.addEventListener("load", function() {
  function button(label, ariaLabel, icon, className) {
    const btn = document.createElement("button");
    btn.classList.add("btn-icon", className);
    btn.setAttribute("aria-label", ariaLabel);
    btn.innerHTML =
      '<div class="btn-icon__body">' +
      icon +
      '<strong class="btn-icon__label">' +
      label +
      "</strong>" +
      "</div>" +
      "</button>";
    return btn;
  }

  function addButtons(codeBlockSelector, btn) {
    document.querySelectorAll(codeBlockSelector).forEach(function(code) {
      code.parentNode.appendChild(btn.cloneNode(true));
    });
  }

  const copyIcon =
    // eslint-disable-next-line max-len
    '<svg width="12" height="12" viewBox="340 364 14 15" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M342 375.974h4v.998h-4v-.998zm5-5.987h-5v.998h5v-.998zm2 2.994v-1.995l-3 2.993 3 2.994v-1.996h5v-1.995h-5zm-4.5-.997H342v.998h2.5v-.997zm-2.5 2.993h2.5v-.998H342v.998zm9 .998h1v1.996c-.016.28-.11.514-.297.702-.187.187-.422.28-.703.296h-10c-.547 0-1-.452-1-.998v-10.976c0-.546.453-.998 1-.998h3c0-1.107.89-1.996 2-1.996 1.11 0 2 .89 2 1.996h3c.547 0 1 .452 1 .998v4.99h-1v-2.995h-10v8.98h10v-1.996zm-9-7.983h8c0-.544-.453-.996-1-.996h-1c-.547 0-1-.453-1-.998 0-.546-.453-.998-1-.998-.547 0-1 .452-1 .998 0 .545-.453.998-1 .998h-1c-.547 0-1 .452-1 .997z" fill-rule="evenodd"/></svg>';

  addButtons(
    ".hljs",
    button("Copy", "Copy code to clipboard", copyIcon, "btn-clipboard")
  );

  const tryIcon =
    // eslint-disable-next-line max-len
    '<svg xmlns="http://www.w3.org/2000/svg" width="12" width="12" viewBox="0 0 64 64"><path fill="currentColor" d="M32 64C14.4 64 0 49.6 0 32S14.4 0 32 0s32 14.4 32 32-14.4 32-32 32zm0-58.7C17.3 5.3 5.3 17.3 5.3 32s12 26.7 26.7 26.7 26.7-12 26.7-26.7S46.7 5.3 32 5.3z"/><path fill="currentColor" d="M42.1 31.1l-15.9-9.4c-1.2-.7-2.1-.2-2.1 1.2v18.3c0 1.4 1 1.9 2.1 1.2L42.1 33s.6-.4.6-.9c0-.6-.6-1-.6-1z"/></svg>';

  addButtons(
    ".hljs.javascript, .hljs.js",
    button("Try", "Try in REPL", tryIcon, "btn-open-in-repl")
  );

  const clipboard = new ClipboardJS(".btn-clipboard", {
    target: function(trigger) {
      return trigger.parentNode.querySelector("code");
    },
  });

  clipboard.on("success", function(event) {
    event.clearSelection();
    const textEl = event.trigger.querySelector(".btn-icon__label");
    textEl.textContent = "Copied";
    setTimeout(function() {
      textEl.textContent = "Copy";
    }, 2000);
  });

  const presets = ["es2015", "stage-0", "react"];
  document.querySelectorAll(".btn-open-in-repl").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const code = this.parentNode.querySelector("code");

      const url =
        "/en/repl.html#" +
        "?babili=false" +
        "&evaluate=false" +
        "&lineWrap=true" +
        "&presets=" +
        encodeURIComponent(presets.join(",")) +
        "&code=" +
        encodeURIComponent(code.textContent);

      window.open(url);
    });
  });
});
