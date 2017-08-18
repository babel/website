// @flow

import scopedEval from './scopedEval';

import type { CompileConfig } from './types';

type Return = {
  compiled: ?string,
  compileError: ?Error,
  evalError: ?Error
};

const DEFAULT_PRETTIER_CONFIG = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  parser: 'babylon'
};

export default function compile(code: string, config: CompileConfig): Return {
  let compiled = null;
  let compileError = null;
  let evalError = null;

  try {
    const transformed = window.Babel.transform(code, {
      babelrc: false,
      filename: 'repl',
      presets: config.presets,
      plugins: ['transform-regenerator']
    });

    compiled = transformed.code;

    if (config.prettify && window.prettier !== undefined) {
      // TODO Don't re-parse; just pass Prettier the AST we already have.
      // This will have to wait until we've updated to Babel 7 since Prettier uses it.
      // Prettier doesn't handle ASTs from Babel 6.
      // if (
      //   window.prettier.__debug !== undefined &&
      //   typeof window.prettier.__debug.formatAST === 'function'
      // ) {
      //   compiled = window.prettier.__debug.formatAST(transformed.ast, DEFAULT_PRETTIER_CONFIG);
      // } else {
      compiled = window.prettier.format(compiled, DEFAULT_PRETTIER_CONFIG);
      // }
    }

    if (config.evaluate) {
      try {
        // eslint-disable-next-line
        scopedEval(compiled);
      } catch (error) {
        evalError = error;
      }
    }
  } catch (error) {
    compiled = null;
    compileError = error;
  }

  return {
    code,
    compiled,
    compileError,
    evalError
  };
}
