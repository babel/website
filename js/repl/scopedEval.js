// @flow

// Some libraries are loaded directly from CDN to improve page speed.
// It's best to mask them so that evaled code doesn't accidentally interact with the page.
// eg ReactDOM.render() shouldn't be able to unmount the REPL app.
// Other globals are just potentially problematic to eval,
// eg document.body.innerHTML = '' shouldn't be able to replace the Babel website.
const globals = [
  "React",
  "ReactDOM",
  "LZString",
  "CodeMirror",
  "document",
  "window",
];

export default function scopedEval(code: string) {
  // $FlowFixMe
  new Function(...globals, code)();
}
