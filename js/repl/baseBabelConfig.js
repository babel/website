import { compareVersions } from "./Utils";
import type { CompileConfig } from "./types";

declare var Babel: any;

export default function baseBabelConfig(config: CompileConfig) {
  const { envConfig, presetsOptions } = config;

  let useBuiltIns = false;
  let spec = false;
  let loose = false;
  let bugfixes = false;
  let corejs = "3.6";

  let presetEnvOptions = {};

  if (envConfig && envConfig.isEnvPresetEnabled) {
    const targets = {};
    const { forceAllTransforms, shippedProposals } = envConfig;

    if (envConfig.browsers) {
      targets.browsers = envConfig.browsers
        .split(",")
        .map(value => value.trim())
        .filter(value => value);
    }
    if (envConfig.isElectronEnabled) {
      targets.electron = envConfig.electron;
    }
    if (envConfig.isBuiltInsEnabled) {
      useBuiltIns = !config.evaluate && envConfig.builtIns;
      if (envConfig.corejs) {
        corejs = envConfig.corejs;
      }
    }
    if (envConfig.isNodeEnabled) {
      targets.node = envConfig.node;
    }
    if (envConfig.isSpecEnabled) {
      spec = envConfig.isSpecEnabled;
    }
    if (envConfig.isLooseEnabled) {
      loose = envConfig.isLooseEnabled;
    }
    if (envConfig.isBugfixesEnabled) {
      bugfixes = envConfig.isBugfixesEnabled;
    }

    presetEnvOptions = {
      targets,
      forceAllTransforms,
      shippedProposals,
      useBuiltIns,
      corejs,
      spec,
      loose,
    };
    if (Babel.version && compareVersions(Babel.version, "7.9.0") !== -1) {
      (presetEnvOptions: any).bugfixes = bugfixes;
    }
  }

  return {
    sourceMap: config.sourceMap,
    assumptions: envConfig?.assumptions ?? {},

    presets: config.presets.map(preset => {
      if (typeof preset !== "string") return preset;
      if (preset === "env") {
        return ["env", presetEnvOptions];
      }
      if (/^stage-[0-2]$/.test(preset)) {
        const decoratorsLegacy = presetsOptions.decoratorsLegacy;
        const decoratorsBeforeExport = decoratorsLegacy
          ? undefined
          : presetsOptions.decoratorsBeforeExport;

        return [
          preset,
          {
            decoratorsLegacy,
            decoratorsBeforeExport,
            pipelineProposal: presetsOptions.pipelineProposal,
          },
        ];
      }
      if (preset === "react") {
        return [
          "react",
          {
            runtime: presetsOptions.reactRuntime,
          },
        ];
      }
      return preset;
    }),
    plugins: config.plugins,
    sourceType: config.sourceType,
  };
}
