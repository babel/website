// @flow

// Globals pre-loaded by Worker
declare var Babel: any;
declare var prettier: any;

import type { CompileConfig } from "./types";

type Return = {
  compiled: ?string,
  compileError: ?string,
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
  let compiled = null;
  let compileError = null;
  let sourceMap = null;

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
    sourceMap = null;
  }

  return {
    compiled,
    compileError,
    sourceMap,
  };
}
