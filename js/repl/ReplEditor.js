// @flow
import React from "react";
import { css } from "emotion";
import { OpenInCodeSandbox } from "react-smooshpack/es/components";
import CodeMirrorPanel from "./CodeMirrorPanel";
import CodeSandboxLogo from "./CodeSandboxLogo";
import ReplLoader from "./ReplLoader";
import { colors } from "./styles";
import { getCodeSize } from "./Utils";

import type { SandpackConsumerProps } from "./types";

type Props = SandpackConsumerProps & {
  renderEditor: () => React$Node,
  renderLoader: (status: SandpackStatus, errors?: Array<string>) => React$Node,
};

type TranspilerContext = {
  babelVersion: string,
};

type State = {
  initialDepsLoaded: boolean,
  transpilerContext: ?TranspilerContext,
};

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
        const { babelVersion } = context.babel;

        const transpilerContext = {
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
    const {
      code,
      errors,
      lineWrap,
      managerStatus,
      onCodeChange,
      renderSidebar,
      showFileSize,
    } = this.props;

    const transpilerContext = this.state.transpilerContext;

    if (!this.state.initialDepsLoaded || transpilerContext === null) {
      return this.renderLoader(managerStatus, errors);
    }

    const options = {
      fileSize: showFileSize,
      lineWrapping: lineWrap,
    };

    const compiledCode =
      managerStatus !== "transpiling" ? this.getCompiledCode() : null;

    return (
      <React.Fragment>
        {renderSidebar(transpilerContext)}

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
              info={state.debugEnvPreset ? state.envPresetDebugInfo : null}
              options={options}
              placeholder="Compiled output will be shown here"
            />
          </div>
          <div className={styles.metaBar}>
            <div className={styles.metaVersion}>
              Babel Version: {transpilerContext.babelVersion}
            </div>
            <OpenInCodeSandbox
              render={() => (
                <button className={styles.codeSandbox} type="submit">
                  <div>
                    <CodeSandboxLogo
                      className={styles.codeSandboxLogo}
                      color={colors.inverseForegroundLight}
                      size={18}
                    />
                    Open in CodeSandbox
                  </div>
                </button>
              )}
            />
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
  metaBar: css`
    align-items: center;
    background: #141618;
    color: ${colors.inverseForegroundLight};
    display: flex;
    flex: 0 0 32px;
    font-size: 0.688rem;
    height: 32px;
    padding: 0 1rem;
  `,
  metaVersion: css`
    flex: 1;
    margin-right: 1rem;
  `,
  codeSandbox: css`
    align-items: center;
    background: transparent;
    border: 0;
    color: currentColor;
    cursor: pointer;
    display: flex;
    font-size: 0.688rem;
    height: 32px;
    outline: 0;
    padding: 0 0.5rem;

    &:hover {
      background: ${colors.inverseBackgroundLight};
    }

    > div {
      align-items: center;
      display: flex;
    }
  `,
  codeSandboxLogo: css`
    margin-left: auto;
    margin-right: 0.5rem;
  `,
};
