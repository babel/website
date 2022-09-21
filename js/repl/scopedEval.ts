let iframe = null;

function getIframe() {
  if (iframe === null) {
    iframe = document.createElement("iframe");
    iframe.style.display = "none";

    // $FlowFixMe
    document.body.append(iframe);
  }

  return iframe;
}

function scopedEval(code: string, sourceMap?: string | null) {
  // Append source map footer so errors map to pre-compiled code.
  if (sourceMap) {
    code =
      `${code}\n//` + // !! This is to avoid a bug with convert-source-map which would detect this line as valid sourcemap
      `# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(
        unescape(encodeURIComponent(sourceMap))
      )}`;
  }

  // Eval code within an iframe so that it can't eg unmount the REPL.
  getIframe().contentWindow.eval(code);
}

export default {
  execute: scopedEval,
  getIframe,
};
