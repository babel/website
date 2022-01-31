// @flow

// Globals pre-loaded by Worker
import baseBabelConfig from "./baseBabelConfig";
declare var Babel: any;
declare var prettier: any;
declare var prettierPlugins: any;

import Transitions from "./Transitions";
import type {
  BabelPresets,
  CompileConfig,
  Transition,
  SupportedFileExtension,
} from "./types";

type Return = {
  compiled: ?string,
  compileErrorMessage: ?string,
  envPresetDebugInfo: ?string,
  meta: {
    compiledSize: number,
    rawSize: number,
  },
  sourceMap: ?string,
  transitions: Array<Transition>,
};

const DEFAULT_PRETTIER_CONFIG = {
  bracketSpacing: true,
  jsxBracketSameLine: false,
  parser: "babel",
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
};

function guessFileExtension(presets: BabelPresets): SupportedFileExtension {
  let ext = ".js";
  if (presets.includes("typescript")) {
    ext = ".ts";
  }
  if (presets.includes("react")) {
    ext = (ext + "x": any);
  }
  return (ext: SupportedFileExtension);
}

export default function compile(code: string, config: CompileConfig): Return {
  let compiled = null;
  let compileErrorMessage = null;
  let envPresetDebugInfo = null;
  let sourceMap = null;
  const transitions = new Transitions();
  const meta = {
    compiledSize: 0,
    rawSize: new Blob([code], { type: "text/plain" }).size,
  };
  const babelConfig = baseBabelConfig(config);
  babelConfig.babelrc = false;
  babelConfig.filename = "repl" + guessFileExtension(config.presets);
  babelConfig.wrapPluginVisitorMethod = config.getTransitions
    ? transitions.wrapPluginVisitorMethod
    : undefined;

  try {
    const transformed = Babel.transform(code, babelConfig);
    compiled = transformed.code;

    if (config.getTransitions) {
      transitions.addExitTransition(compiled);
    }

    if (config.sourceMap) {
      try {
        sourceMap = JSON.stringify(transformed.map);
      } catch (error) {
        console.error(`Source Map generation failed: ${error}`);
      }
    }

    if (
      config.prettify &&
      typeof prettier !== "undefined" &&
      typeof prettierPlugins !== "undefined"
    ) {
      // TODO Don't re-parse; just pass Prettier the AST we already have.
      // This will have to wait until we've updated to Babel 7 since Prettier uses it.
      // Prettier doesn't handle ASTs from Babel 6.
      // if (
      //   prettier.__debug !== undefined &&
      //   typeof prettier.__debug.formatAST === 'function'
      // ) {
      //   compiled = prettier.__debug.formatAST(transformed.ast, DEFAULT_PRETTIER_CONFIG);
      // } else {
      compiled = prettier.format(compiled, {
        ...DEFAULT_PRETTIER_CONFIG,
        plugins: prettierPlugins,
      });
      // }
    }
    meta.compiledSize = new Blob([compiled], { type: "text/plain" }).size;
  } catch (error) {
    compiled = null;
    compileErrorMessage = error.message;
    envPresetDebugInfo = null;
    sourceMap = null;
  }

  return {
    compiled,
    compileErrorMessage,
    envPresetDebugInfo,
    meta,
    sourceMap,
    transitions: transitions.getValue(),
  };
}
