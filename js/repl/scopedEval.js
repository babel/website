// @flow

let iframe = null;

export default function scopedEval(code: string, sourceMap: ?string) {
  if (iframe === null) {
    iframe = document.createElement("iframe");
    iframe.style.display = "none";

    // $FlowFixMe
    document.body.append(iframe);
  }

  // Append source map footer so errors map to pre-compiled code.
  if (sourceMap) {
    code = `${code}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(
      sourceMap
    )}`;
  }

  // Eval code within an iframe so that it can't eg unmount the REPL.
  iframe.contentWindow.eval(code);
}
