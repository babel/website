// @flow

import compile from "./compile";
import { registerPromiseWorker } from "./WorkerUtils";

declare var Babel: any;
declare var babelPresetEnv: any;
declare function importScripts(url: string): void;

// This script should be executed within a web-worker.
// Values returned below will be automatically wrapped in Promises.
registerPromiseWorker(message => {
  const { method, name } = message;

  switch (method) {
    case "compile":
      return compile(message.code, message.config);

    case "getBabelVersion":
      try {
        return Babel.version;
      } catch (error) {
        return null;
      }

    case "getBundleVersion":
      try {
        const target = self[name].default || self[name];
        return target.version;
      } catch (error) {
        return null;
      }

    case "loadScript":
      try {
        importScripts(message.url);

        return true;
      } catch (error) {
        return false;
      }

    case "registerEnvPreset":
      try {
        // Was registered when loaded;
        // Babel.registerPreset("env", babelPresetEnv.default);

        return true;
      } catch (error) {
        return false;
      }
  }
});
