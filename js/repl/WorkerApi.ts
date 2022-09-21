import scopedEval from "./scopedEval";
import { registerPromiseWorkerApi } from "./WorkerUtils";

import type { CompileConfig, PluginState } from "./types";

// $FlowFixMe
const WorkerSource = require("worker-loader?inline=no-fallback&esModule=false!./Worker");

type PromiseWorkerApi = {
  postMessage(message: any): Promise<any>;
};

type CompileResult = {
  compiled: string | undefined | null;
  compileErrorMessage: string | undefined | null;
  envPresetDebugInfo: string | undefined | null;
  evalErrorMessage: string | undefined | null;
  meta: any;
  sourceMap: string | undefined | null;
};

type PluginShape = {
  instanceName: string;
  pluginName: string;
};

/**
 * Interfaces with a web worker to lazy-loads plugins and compile code.
 */
export default class WorkerApi {
  _worker: PromiseWorkerApi = registerPromiseWorkerApi(new WorkerSource());

  compile(code: string, config: CompileConfig): Promise<CompileResult> {
    return this._worker
      .postMessage({
        code,
        method: "compile",
        config,
      })
      .then(
        ({
          compiled,
          compileErrorMessage,
          envPresetDebugInfo,
          meta,
          sourceMap,
          transitions,
        }) => {
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
            envPresetDebugInfo,
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

  loadExternalPlugin(url: string | Array<string>): Promise<boolean> {
    return this.loadScript(url);
  }

  getBundleVersion(name: string): Promise<number> {
    return this._worker.postMessage({ method: "getBundleVersion", name });
  }

  getAvailablePresets(): Promise<Array<string>> {
    return this._worker.postMessage({ method: "getAvailablePresets" });
  }

  getAvailablePlugins(): Promise<
    Array<{
      label: string;
      isPreloaded: boolean;
    }>
  > {
    return this._worker.postMessage({ method: "getAvailablePlugins" });
  }

  loadPlugin(state: PluginState): Promise<boolean> {
    const { config } = state;

    const base = config.baseUrl ? [config.baseUrl] : ["https://bundle.run"];
    Array.prototype.push.apply(base, ["https://packd.liuxingbaoyu.xyz"]);

    const urls = config.url
      ? [config.url]
      : base.map(url => `${url}/${config.package}@${config.version || ""}`);

    state.isLoading = true;

    const loadPromise = !config.files
      ? this.loadScript(urls)
      : Promise.all(
          config.files.map(file =>
            this.loadScript(urls.map(url => `${url}/${file}`))
          )
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

  loadScript(url?: string | Array<string>): Promise<boolean> {
    return this._worker.postMessage({
      method: "loadScript",
      url,
    });
  }

  registerEnvPreset(): Promise<boolean> {
    return this._worker.postMessage({
      method: "registerEnvPreset",
    });
  }

  registerPlugins(plugins: Array<PluginShape>): Promise<boolean> {
    return this._worker.postMessage({
      method: "registerPlugins",
      plugins,
    });
  }
}
