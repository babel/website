// @flow
import React from "react";
import { css } from "emotion";
import { OpenInCodeSandbox } from "react-smooshpack/es/components";
import CodeMirrorPanel from "./CodeMirrorPanel";
import ReplLoader from "./ReplLoader";
import { colors, media } from "./styles";
import { getCodeSize } from "./Utils";

import type { SandpackConsumerProps, SandpackTranspilerContext } from "./types";

type Props = SandpackConsumerProps & {
  renderEditor: () => React$Node,
  renderLoader: (status: SandpackStatus, errors?: Array<string>) => React$Node,
};

type TranspilerContext = {
  availablePlugins: Array<{ label: string, isPreLoaded: boolean }>,
  availablePresets: Array<{ label: string, isPreLoaded: boolean }>,
  babelVersion: string,
};

type State = {
  initialDepsLoaded: boolean,
  transpilerContext: ?TranspilerContext,
};

const mapItemsToStateMap = items =>
  items.map(i => ({
    label: i,
    isPreLoaded: true,
  }));

export default class ReplEditor extends React.Component<Props, State> {
  state = {
    initialDepsLoaded: false,
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
        message = "Installing dependencies";
      } else {
        message = "Initializing bundler";
      }
    } else {
      message = "Finishing up";
    }

    return <ReplLoader isLoading={loading} message={message} />;
  }

  render() {
    const state = this.state;
    const { code, errors, lineWrap, managerStatus, onCodeChange, renderSidebar, showFileSize } = this.props;

    if (!this.state.initialDepsLoaded || this.state.transpilerContext === null) {
      return this.renderLoader(managerStatus, errors);
    }

    const options = {
      fileSize: showFileSize,
      lineWrapping: lineWrap,
    };

    const compiledCode = managerStatus !== "transpiling" ? this.getCompiledCode() : null;

    return (
      <React.Fragment>
        {renderSidebar(this.state.transpilerContext)}

        <div className={styles.editorContainer}>
          <div className={styles.panels}>
            <CodeMirrorPanel
              className={styles.codeMirrorPanel}
              code={code}
              errorMessage={errors.length ? errors[0].message : undefined}
              fileSize={getCodeSize(this.state.code)}
              onChange={onCodeChange}
              options={options}
              placeholder="Write code here"
            />
            <CodeMirrorPanel
              className={styles.codeMirrorPanel}
              code={compiledCode}
              errorMessage={state.evalErrorMessage}
              fileSize={compiledCode ? getCodeSize(compiledCode) : null}
              info={
                state.debugEnvPreset ? state.envPresetDebugInfo : null
              }
              options={options}
              placeholder="Compiled output will be shown here"
            />
          </div>
          <div className={styles.metaBar}>
            <OpenInCodeSandbox />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const styles = {
  editorContainer: css({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  }),
  codeMirrorPanel: css({
    flex: "0 0 50%",
  }),
  panels: css({
    display: "flex",
    flex: "1",
    flexDirection: "row",
    justifyContent: "stretch",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  }),
  metaBar: css({
    background: "#141618",
    flex: "0 0 32px",
    height: "32px",
  }),
};
