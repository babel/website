// @flow

import compile from "./compile";

declare function importScripts(url: string): void;
declare function registerPromiseWorker(handler: Function): void;

importScripts(
  "https://npmcdn.com/promise-worker/dist/promise-worker.register.js"
);

// This script should be executed within a web-worker.
// Values returned below will be automatically wrapped in Promises.
registerPromiseWorker(message => {
  const { method } = message;

  switch (method) {
    case "compile":
      return compile(message.code, message);

    case "loadScript":
      try {
        importScripts(message.url);

        return true;
      } catch (error) {
        return false;
      }
  }
});
