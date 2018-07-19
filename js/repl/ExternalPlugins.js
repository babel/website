// @flow

import { css } from "emotion";
import * as React from "react";
import AccordionTab from "./AccordionTab";
import ExternalPluginsModal from "./ExternalPluginsModal";
import PresetLoadingAnimation from "./PresetLoadingAnimation";
import type { SidebarTabSection } from "./types";

type Props = {
  _pluginChanged: any,
  isExpanded: boolean,
  isLoading: boolean,
  onRemove: (pluginName: string) => void,
  onToggleExpanded: (key: SidebarTabSection) => mixed,
  plugins: Array<string>,
  styles: Object,
};

type State = {
  modalOpen: boolean,
};

export default class ExternalPlugins extends React.Component<Props, State> {
  static defaultProps = {
    isLoading: false,
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

  renderButton() {
    const { isLoading } = this.props;

    return (
      <button
        className={currentStyles.modalButton}
        disbled={isLoading}
        onClick={this.handleOpenModal}
      >
        {isLoading ? "Loading Plugin..." : "Add Plugin"}
      </button>
    );
  }

  renderPlugins() {
    const { onRemove, plugins } = this.props;

    if (plugins.length === 0) {
      return <span class={currentStyles.empty}>None added</span>;
    }

    return (
      <ul className={currentStyles.pluginList}>
        {plugins.map(p => (
          <li key={p}>
            {p}
            <div className={currentStyles.pluginActions}>
              <a onClick={() => onRemove(p)}>✕</a>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const {
      _pluginChanged,
      isExpanded,
      onToggleExpanded,
      plugins,
      styles,
    } = this.props;

    return (
      <AccordionTab
        className={`${styles.section} ${styles.sectionEnv}`}
        isExpanded={isExpanded}
        label={
          <span className={styles.pluginsHeader}>
            Plugins
            {false && <PresetLoadingAnimation />}
          </span>
        }
        onToggleExpanded={onToggleExpanded}
        tabKey="plugins"
      >
        {this.renderPlugins()}
        {this.renderButton()}

        {this.state.modalOpen && (
          <ExternalPluginsModal
            onClose={this.handleCloseModal}
            onPluginSelect={_pluginChanged}
            plugins={plugins}
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
    cursor: pointer;
    margin: 0 0.5rem;
    padding: 0.5rem 0;
  `,
  pluginList: css`
    font-size: 0.75rem;
    margin: 0.5rem -0.5rem 1rem;

    > li {
      align-items: center;
      border-left: 2px solid transparent;
      display: flex;
      line-height: 1.1;
      padding: 0.25rem 0.75rem;
      position: relative;
      transition: all 0.25s ease-out;

      &:hover {
        border-left-color: #eeda7b;
      }

      &:not(:first-child) {
        margin-top: 0.5rem;
      }
    }
  `,
  empty: css`
    color: #61656e;
    font-size: 0.875rem;
    margin: 0.5rem 0.5rem 1rem;
  `,
  pluginActions: css`
    align-items: center;
    background: #23252b;
    bottom: 0;
    display: flex;
    padding-left: 1rem;
    position: absolute;
    right: 1rem;
    top: 0;

    a,
    a:visited {
      color: #fff;
      cursor: poitner;
    }
  `,
};
