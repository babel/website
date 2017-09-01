// @flow

import type { LoadScriptCallback } from "./types";

export default function loadScript(
  url: string,
  callback: LoadScriptCallback,
  targetDocument: Document = document
) {
  const script = targetDocument.createElement("script");
  script.async = true;
  script.src = url;
  script.onerror = () => {
    callback(false);
  };
  script.onload = () => {
    callback(true);
  };

  // $FlowFixMe
  targetDocument.head.appendChild(script);
}
