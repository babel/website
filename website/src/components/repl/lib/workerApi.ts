import scopedEval from "./scopedEval";
import { registerPromiseWorkerApi } from "./workerUtils";

import type { CompileConfig, PluginState } from "./types";

type PromiseWorkerApi = {
  postMessage(message: any): Promise<any>;
};

type CompileResult = {
  compiled: string | undefined | null;
  compileErrorMessage: string | undefined | null;
  evalErrorMessage: string | undefined | null;
  meta: any;
};

type PluginShape = {
  instanceName: string;
  pluginName: string;
};

/**
 * Interfaces with a web worker to lazy-loads plugins and compile code.
 */
export default class WorkerApi {
  _worker: PromiseWorkerApi = registerPromiseWorkerApi(
    new Worker(new URL("./worker", import.meta.url))
  );

  compile(code: string, config: CompileConfig): Promise<CompileResult> {
    return this._worker
      .postMessage({
        code,
        method: "compile",
        config,
      })
      .then(
        ({ compiled, compileErrorMessage, meta, sourceMap, transitions }) => {
          let evalErrorMessage = null;

          // Compilation is done in a web worker for performance reasons,
          // But eval requires the UI thread so code can access globals like window.
          if (config.evaluate) {
            try {
              scopedEval.execute(compiled, sourceMap);
            } catch (error) {
              evalErrorMessage = error.message;
            }
          }

          return {
            compiled,
            compileErrorMessage,
            evalErrorMessage,
            meta,
            sourceMap,
            transitions,
          };
        }
      );
  }

  getBabelVersion(): Promise<string> {
    return this._worker.postMessage({ method: "getBabelVersion" });
  }

  loadExternalPlugin(url: string, instanceName?: string): Promise<boolean> {
    return this.loadModule(url, instanceName);
  }

  getBundleVersion(name: string): Promise<number> {
    return this._worker.postMessage({ method: "getBundleVersion", name });
  }

  getAvailablePresets(): Promise<Array<string>> {
    return this._worker.postMessage({ method: "getAvailablePresets" });
  }

  getAvailablePlugins(): Promise<Array<string>> {
    return this._worker.postMessage({ method: "getAvailablePlugins" });
  }

  loadPlugin(state: PluginState): Promise<boolean> {
    const { config } = state;

    const url =
      config.url ||
      `${config.baseUrl}/${config.package}@${config.version || ""}`;

    state.isLoading = true;

    const loadPromise = !config.files
      ? this.loadModule(url)
      : Promise.all(
          config.files.map((file) => this.loadModule(`${url}/${file}`))
        );

    return loadPromise.then((success) => {
      if (success) {
        state.isLoaded = true;
        state.isLoading = false;
      } else {
        state.didError = true;
        state.isLoading = false;
      }

      return success;
    });
  }

  loadScript(url: string): Promise<boolean> {
    return this._worker.postMessage({
      method: "loadScript",
      url,
    });
  }

  loadModule(url: string, instanceName?: string): Promise<boolean> {
    return this._worker.postMessage({
      method: "loadModule",
      url,
      instanceName,
    });
  }

  registerPlugins(plugins: Array<PluginShape>): Promise<boolean> {
    return this._worker.postMessage({
      method: "registerPlugins",
      plugins,
    });
  }

  registerPluginAlias(pluginName: string, aliasTo: string): Promise<boolean> {
    return this._worker.postMessage({
      method: "registerPluginAlias",
      pluginName,
      aliasTo,
    });
  }
}
