// @flow

import type { LoadScriptCallback } from "./types";

export default function loadScript(
  url: string,
  callback: LoadScriptCallback,
  target: ?HTMLIFrameElement
) {
  if (target != null) {
    const targetDocument = target.contentDocument;

    // If we're loading this script into an iframe, wait for it to load,
    // Otherwise the script tag we insert will be removed on-load.
    if (targetDocument.readyState !== "complete") {
      target.addEventListener("load", () => {
        // Use the newly-loaded document.
        // $FlowFixMe We know target isn't null at this point
        loadScriptIntoDocument(url, callback, target.contentDocument);
      });
    } else {
      loadScriptIntoDocument(url, callback, targetDocument);
    }
  } else {
    loadScriptIntoDocument(url, callback, document);
  }
}

function loadScriptIntoDocument(
  url: string,
  callback: LoadScriptCallback,
  targetDocument: Document
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
