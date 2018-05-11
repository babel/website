import { css } from "emotion";
import * as React from "react";
import AccordionTab from "./AccordionTab";
import ExternalPluginsModal from "./ExternalPluginsModal";
import PresetLoadingAnimation from "./PresetLoadingAnimation";

type Props = {
  loadingExternalPlugins: boolean,
  isPluginsExpanded: boolean,
  plugins: Array<string>,
  styles: Object,
};

type State = {
  modalOpen: boolean,
};

export default class ExternalPlugins extends React.Component<Props, State> {
  static defaultProps = {
    plugins: [],
  };

  state = {
    modalOpen: false,
  };

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  renderPlugins() {
    const plugins = this.props.plugins;

    if (plugins.length === 0) {
      return null;
    }

    return (
      <ul className={currentStyles.pluginList}>
        {plugins.map(p => <li key={p}>{p}</li>)}
      </ul>
    );
  }

  render() {
    const { isExpanded, onToggleExpanded, styles, plugins } = this.props;
    console.log(plugins);
    return (
      <AccordionTab
        className={`${styles.section} ${styles.sectionEnv}`}
        isExpanded={this.props.isPluginsExpanded}
        label={
          <span className={styles.pluginsHeader}>
            Plugins
            {false && <PresetLoadingAnimation />}
          </span>
        }
        toggleIsExpanded={this.props._togglePluginsTab}
        tabKey="plugins"
      >
        {this.renderPlugins()}

        <button
          className={currentStyles.modalButton}
          onClick={this.handleOpenModal}
        >
          Add Plugin
        </button>

        {this.state.modalOpen && (
          <ExternalPluginsModal
            onClose={this.handleCloseModal}
            onPluginSelect={this.props._pluginChanged}
          />
        )}
      </AccordionTab>
    );
  }
}

const currentStyles = {
  modalButton: css`
    background: #f1da6b;
    border: 0;
    border-radius: 4px;
    margin: 0 0.5rem;
    padding: 0.5rem 0;
  `,
  pluginList: css`
    font-size: 0.75rem;
    margin: 0 -0.5rem 1rem;

    > li {
      align-items: center;
      border-left: 4px solid transparent;
      display: flex;
      line-height: 1.1;
      padding: 0 0.625rem;
      transition: all 0.25s ease-out;

      &:hover {
        border-left-color: #eeda7b;
      }

      &:not(:first-child) {
        margin-top: 0.5rem;
      }
    }
  `,
};
