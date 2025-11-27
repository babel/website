// Globals pre-loaded by Worker
declare const Babel: any;
declare const prettier: any;
declare const prettierPlugins: any;

import Transitions from "./transitions";
import type { CompileConfig, Transition } from "./types";

type Return = {
  compiled: string | undefined | null;
  inputAst: any;
  compileErrorMessage: string | undefined | null;
  meta: {
    compiledSize: number;
    rawSize: number;
  };
  sourceMap: string | undefined | null;
  transitions: Array<Transition>;
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

export default function compile(code: string, config: CompileConfig): Return {
  let compiled = null;
  let inputAst = null;
  let compileErrorMessage = null;
  let sourceMap = null;
  const transitions = new Transitions();
  const meta = {
    compiledSize: 0,
    rawSize: new Blob([code], { type: "text/plain" }).size,
  };

  try {
    if (config.getTransitions) {
      config.babelConfig.wrapPluginVisitorMethod =
        transitions.wrapPluginVisitorMethod;
    }

    const configForAst = structuredClone(config.babelConfig);
    (configForAst.plugins ??= []).unshift(() => {
      return {
        visitor: {
          Program: {
            enter(path: any) {
              inputAst = path.parent;
              path.stop();
            },
          },
        },
      };
    });

    Babel.transform(code, configForAst);

    const transformed = Babel.transformFromAst(
      inputAst,
      code,
      config.babelConfig
    );
    compiled = transformed.code;

    if (config.getTransitions) {
      transitions.addExitTransition(compiled);
    }

    if (config.babelConfig.sourceMaps) {
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
      compiled = prettier.format(compiled, {
        ...DEFAULT_PRETTIER_CONFIG,
        plugins: prettierPlugins,
      });
    }
    meta.compiledSize = new Blob([compiled], { type: "text/plain" }).size;
  } catch (error) {
    compiled = null;
    compileErrorMessage = error.message;
    sourceMap = null;
  }

  return {
    compiled,
    inputAst,
    compileErrorMessage,
    meta,
    sourceMap,
    transitions: transitions.getValue(),
  };
}
