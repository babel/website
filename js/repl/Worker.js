// @flow

import compile from "./compile";
import registerPromiseWorker from "promise-worker/register";

declare var Babel: any;
declare var babelPresetEnvStandalone: any;
declare function importScripts(url: string): void;

// This script should be executed within a web-worker.
// Values returned below will be automatically wrapped in Promises.
registerPromiseWorker(message => {
  const { method } = message;

  switch (method) {
    case "compile":
      return compile(message.code, message.config);

    case "loadScript":
      try {
        importScripts(message.url);

        return true;
      } catch (error) {
        return false;
      }

    case "registerEnvPreset":
      try {
        Babel.registerPreset("env", babelPresetEnvStandalone);

        return true;
      } catch (error) {
        return false;
      }
  }
});
