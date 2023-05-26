import compile from "./compile";
import { registerPromiseWorker } from "./WorkerUtils";

declare var Babel: any;
declare function importScripts(url: string): void;

// This script should be executed within a web-worker.
// Values returned below will be automatically wrapped in Promises.
registerPromiseWorker((message) => {
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
        const target = self[name];
        // @ts-expect-error Window doesn't have the property
        return target.version;
      } catch (error) {
        return null;
      }

    case "getAvailablePresets":
      if (!Babel) return [];

      return Object.keys(Babel.availablePresets).map((p) => ({
        label: p,
        isPreLoaded: true,
      }));

    case "getAvailablePlugins":
      if (!Babel) return [];

      return Object.keys(Babel.availablePlugins);

    case "loadScript":
      if (!Array.isArray(message.url)) {
        message.url = [message.url];
      }
      for (const url of message.url) {
        try {
          importScripts(url);
          return true;
        } catch (error) {
          console.warn(error);
        }
      }
      return false;

    case "registerPlugins":
      try {
        message.plugins.forEach(({ pluginName, instanceName }) => {
          let plugin = self[instanceName] as any;

          if (typeof plugin.default === "function") {
            plugin = plugin.default;
          }

          if (typeof plugin === "undefined") {
            throw new Error(
              `Tried to register plugin "${instanceName}" but something went wrong`
            );
          }

          Babel.registerPlugin(pluginName, plugin);
        });

        return true;
      } catch (error) {
        return false;
      }

    case "registerPluginAlias":
      try {
        const { aliasTo, pluginName } = message;
        if (aliasTo in Babel.availablePlugins) {
          Babel.registerPlugin(pluginName, Babel.availablePlugins[aliasTo]);
          return true;
        } else {
          return false;
        }
      } catch {
        return false;
      }
  }
});
