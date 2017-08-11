// @flow

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
    compiled = window.Babel.transform(code, {
      presets: config.presets,
      plugins: ['transform-regenerator']
    }).code;

    if (config.prettify && window.prettier !== undefined) {
      // TODO Don't re-parse; just pass Prettier the AST we already have.
      compiled = window.prettier.format(compiled, DEFAULT_PRETTIER_CONFIG);
    }

    if (config.evaluate) {
      try {
        // eslint-disable-next-line
        eval(compiled);
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
