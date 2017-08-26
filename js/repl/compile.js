// @flow

// Globals pre-loaded by Worker
declare var Babel: any;
declare var prettier: any;

import { getDebugInfoFromEnvResult } from "./replUtils";

import type { BabelPresetEnvResult, CompileConfig } from "./types";

type Return = {
  compiled: ?string,
  compileError: ?string,
  envPresetDebugInfo: ?string,
  sourceMap: ?string,
};

const DEFAULT_PRETTIER_CONFIG = {
  bracketSpacing: true,
  jsxBracketSameLine: false,
  parser: "babylon",
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
};

export default function compile(code: string, config: CompileConfig): Return {
  const { envConfig } = config;

  let compiled = null;
  let compileError = null;
  let envPresetDebugInfo = null;
  let sourceMap = null;

  if (envConfig && envConfig.isEnvPresetEnabled) {
    const targets = {};
    if (envConfig.browsers) {
      targets.browsers = envConfig.browsers
        .split(",")
        .map(value => value.trim())
        .filter(value => value);
    }
    if (envConfig.isElectronEnabled) {
      targets.electron = envConfig.electron;
    }
    if (envConfig.isNodeEnabled) {
      targets.node = envConfig.node;
    }

    // onPresetBuild is invoked synchronously during compilation.
    // But the env preset info calculated from the callback should be part of our state update.
    let onPresetBuild = null;
    if (config.debugEnvPreset) {
      onPresetBuild = (result: BabelPresetEnvResult) => {
        envPresetDebugInfo = getDebugInfoFromEnvResult(result);
      };
    }

    const options = {
      onPresetBuild,
      targets,
      useBuiltIns: !config.evaluate && config.useBuiltIns,
    };

    config.presets.push(["env", options]);
  }

  try {
    const transformed = Babel.transform(code, {
      babelrc: false,
      filename: "repl",
      presets: config.presets,
      plugins: ["transform-regenerator"],
      sourceMap: config.sourceMap,
    });

    compiled = transformed.code;

    if (config.sourceMap) {
      try {
        sourceMap = JSON.stringify(transformed.map);
      } catch (error) {
        console.error(`Source Map generation failed: ${error}`);
      }
    }

    if (config.prettify && prettier !== undefined) {
      // TODO Don't re-parse; just pass Prettier the AST we already have.
      // This will have to wait until we've updated to Babel 7 since Prettier uses it.
      // Prettier doesn't handle ASTs from Babel 6.
      // if (
      //   prettier.__debug !== undefined &&
      //   typeof prettier.__debug.formatAST === 'function'
      // ) {
      //   compiled = prettier.__debug.formatAST(transformed.ast, DEFAULT_PRETTIER_CONFIG);
      // } else {
      compiled = prettier.format(compiled, DEFAULT_PRETTIER_CONFIG);
      // }
    }
  } catch (error) {
    compiled = null;
    compileError = error.message;
    envPresetDebugInfo = null;
    sourceMap = null;
  }

  return {
    compiled,
    compileError,
    envPresetDebugInfo,
    sourceMap,
  };
}
