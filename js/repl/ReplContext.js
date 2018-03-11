// @flow
import React from 'react';

import type { SandpackConsumerProps } from './types';

type Props = SandpackConsumerProps & {
  renderEditor: () => React$Node,
  renderLoader: (status: SandpackStatus, errors?: Array<string>) => React$Node,
};

type State = {
  initialDepsLoaded: boolean,
  ready: boolean,
};

export default class ReplContext extends React.Component<Props, State> {
  state = {
    initialDepsLoaded: false,
    ready: false,
    transpilerContext: null,
  };

  _loadingTranspilerContext: boolean = false;

  componentWillReceiveProps({
    getManagerTranspilerContext,
    managerStatus,
  }: Props) {
    let initialDepsLoaded = this.state.initialDepsLoaded;

    if (!initialDepsLoaded && managerStatus === 'transpiling') {
      initialDepsLoaded = true;
    }

    if (initialDepsLoaded && !this._loadingTranspilerContext) {
      this._loadingTranspilerContext = true;

      getManagerTranspilerContext().then(context => {
        const { availablePlugins, availablePresets, babelVersion } = context['babel-loader'];

        const transpilerContext = {
          availablePlugins,
          availablePresets,
          babelVersion,
        };

        this.setState({ transpilerContext });
      });
    }

    this.setState({ initialDepsLoaded });
  }

  checkReady() {
    return this.state.initialDepsLoaded && !!this.state.transpilerContext;
  }

  getCompiledCode() {
    const managerState = this.props.managerState;

    let compiled;

    if (
      managerState &&
      managerState.transpiledModules["/index.js:"] &&
      managerState.transpiledModules["/index.js:"].source &&
      managerState.transpiledModules["/index.js:"].source.compiledCode
    ) {
      compiled =
        managerState.transpiledModules["/index.js:"].source.compiledCode;
    }

    return compiled;
  }

  render() {
    const { renderEditor, renderLoader, ...props } = this.props;

    if (!this.checkReady()) {
      return renderLoader(props.status, props.errors);
    }

    return renderEditor({
      ...props,
      compiledCode: this.getCompiledCode(),
      transpilerContext: this.state.transpilerContext,
    });
  }
}
