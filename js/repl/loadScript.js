// @flow

import type { LoadScriptCallback } from "./types";

export default function loadScript(url: string, callback: LoadScriptCallback) {
  const script = document.createElement("script");
  script.async = true;
  script.src = url;
  script.onerror = () => {
    callback(false);
  };
  script.onload = () => {
    callback(true);
  };

  // $FlowFixMe
  document.head.appendChild(script);
}
