import type { LoadScriptCallback } from "./types";

export default function loadScript(
  url: string | Array<string>,
  callback: LoadScriptCallback,
  maybeTarget?: HTMLIFrameElement
) {
  if (Array.isArray(url)) {
    url = url.slice();
    function retryCallback(result) {
      if (result) {
        callback(true);
      } else {
        if (url.length > 0) {
          // @ts-expect-error url is string[]
          loadScriptInternal(url.shift(), callback, maybeTarget);
        } else {
          callback(false);
        }
      }
    }

    retryCallback(false);
  } else {
    loadScriptInternal(url, callback, maybeTarget);
  }
}

function loadScriptInternal(
  url: string,
  callback: LoadScriptCallback,
  maybeTarget?: HTMLIFrameElement | null
) {
  if (maybeTarget != null) {
    const target = maybeTarget;

    // If we're loading this script into an iframe, wait for it to load,
    // Otherwise the script tag we insert will be removed on-load.
    if (target.contentDocument.readyState !== "complete") {
      target.addEventListener("load", () => {
        // Use the newly-loaded document.
        loadScriptIntoDocument(url, callback, target.contentDocument);
      });
    } else {
      loadScriptIntoDocument(url, callback, target.contentDocument);
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
