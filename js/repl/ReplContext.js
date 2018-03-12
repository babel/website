// @flow
import React from 'react';
import { css } from "emotion";
import PresetLoadingAnimation from "./PresetLoadingAnimation";
import { colors } from "./styles";

import type { SandpackConsumerProps } from './types';

type Props = SandpackConsumerProps & {
  renderEditor: () => React$Node,
  renderLoader: (status: SandpackStatus, errors?: Array<string>) => React$Node,
};

type State = {
  initialDepsLoaded: boolean,
  ready: boolean,
};

const mapItemsToStateMap = items =>
  items.map(i => ({
    label: i,
    isPreLoaded: true,
  }));

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

    if (!initialDepsLoaded && managerStatus === "transpiling") {
      initialDepsLoaded = true;
    }

    if (initialDepsLoaded && !this._loadingTranspilerContext) {
      this._loadingTranspilerContext = true;

      getManagerTranspilerContext().then(context => {
        const { availablePlugins, availablePresets, babelVersion } = context["babel-loader"];

        const transpilerContext = {
          availablePlugins: mapItemsToStateMap(availablePlugins),
          availablePresets: mapItemsToStateMap(availablePresets),
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

  renderLoader(status: SandpackStatus, errors?: Array<string>) {
    let message;
    let loading = true;

    if (status === "initializing" || status === "installing-dependencies") {
      if (errors.length) {
        loading = false;
        message = "An error occurred while loading Babel :(";
      } else if (status === "installing-dependencies") {
        message = "Installing dependencies...";
      } else {
        message = "Initializing...";
      }
    } else {
      message = "Finishing up...";
    }

    return (
      <div className={styles.loader}>
        <div className={styles.loaderContent}>
          {message}
          {loading && (
            <PresetLoadingAnimation className={styles.loadingAnimation} />
          )}
        </div>
      </div>
    );
  }

  render() {
    const { renderEditor, ...props } = this.props;

    if (!this.checkReady()) {
      return this.renderLoader(props.managerStatus, props.errors);
    }

    // This is just temporary
    return renderEditor({
      ...props,
      compiledCode: this.getCompiledCode(),
      transpilerContext: this.state.transpilerContext,
    });
  }
}

const styles = {
  loader: css({
    alignItems: "center",
    background: colors.inverseBackgroundDark,
    color: colors.inverseForegroundLight,
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    width: "100vw",
  }),
  loadingAnimation: css({
    justifyContent: "center",
    margin: "2rem 0 0 0",
  }),
  loaderContent: css({
    margin: "auto",
    textAlign: "center",
  }),
};
