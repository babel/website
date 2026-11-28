import formatConsoleArgs from "./formatConsoleArgs";

import type { ConsoleEntry, ConsoleLevel } from "./types";

type ConsoleListener = (entries: ReadonlyArray<ConsoleEntry>) => void;

const CONSOLE_LEVELS: ReadonlyArray<ConsoleLevel> = [
  "log",
  "info",
  "warn",
  "error",
  "debug",
];

// Keep only the most recent messages so that logging in a long loop doesn't
// freeze the page.
const MAX_CONSOLE_ENTRIES = 1000;

let iframe = null;
let consoleEntries: ConsoleEntry[] = [];
let consoleListener: ConsoleListener | null = null;
let isNotifyScheduled = false;

function notifyConsoleListener() {
  isNotifyScheduled = false;
  if (consoleListener) consoleListener(consoleEntries.slice());
}

function scheduleConsoleNotification() {
  // Batch the messages logged synchronously by the evaluated code.
  if (isNotifyScheduled) return;
  isNotifyScheduled = true;
  queueMicrotask(notifyConsoleListener);
}

function addConsoleEntry(level: ConsoleLevel, args: readonly unknown[]) {
  let message: string;
  try {
    message = formatConsoleArgs(args);
  } catch {
    // e.g. revoked proxies, or objects whose methods throw when inspected.
    // Never make the evaluated code's `console` calls throw.
    message = "[Unable to display the logged value]";
  }

  if (consoleEntries.length >= MAX_CONSOLE_ENTRIES) consoleEntries.shift();
  consoleEntries.push({ level, message });
  scheduleConsoleNotification();
}

function clearConsole() {
  consoleEntries = [];
  scheduleConsoleNotification();
}

function captureConsole(contentWindow) {
  const console = contentWindow.console;

  // Calls are still forwarded to the original methods, so that the messages
  // keep showing up in the browser's developer tools.
  for (const level of CONSOLE_LEVELS) {
    const original = console[level];
    console[level] = function (...args) {
      addConsoleEntry(level, args);
      return original.apply(this, args);
    };
  }

  const originalClear = console.clear;
  console.clear = function (...args) {
    clearConsole();
    return originalClear.apply(this, args);
  };

  // Errors thrown synchronously are rethrown by `scopedEval`, but errors
  // thrown in callbacks (e.g. timers or promises) only reach these events.
  contentWindow.addEventListener("error", (event) => {
    addConsoleEntry(
      "error",
      // `event.message` already starts with "Uncaught".
      event.error == null ? [event.message] : ["Uncaught", event.error]
    );
  });
  contentWindow.addEventListener("unhandledrejection", (event) => {
    addConsoleEntry("error", ["Uncaught (in promise)", event.reason]);
  });
}

function getIframe() {
  if (iframe === null) {
    iframe = document.createElement("iframe");
    iframe.style.display = "none";

    // $FlowFixMe
    document.body.append(iframe);

    captureConsole(iframe.contentWindow);
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

  const contentWindow = getIframe().contentWindow;

  // Every evaluation starts with an empty console.
  clearConsole();

  // Eval code within an iframe so that it can't eg unmount the REPL.
  try {
    contentWindow.eval(code);
  } catch (error) {
    addConsoleEntry("error", ["Uncaught", error]);
    throw error;
  }
}

/**
 * Registers a function called with the messages logged by the evaluated code
 * every time they change. Pass `null` to unregister it.
 */
function setConsoleListener(listener: ConsoleListener | null) {
  consoleListener = listener;
}

export default {
  execute: scopedEval,
  getIframe,
  setConsoleListener,
};
