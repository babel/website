import * as React from "react";
import currentStyles from "./ExternalPlugins.module.css";
import AccordionTab from "./AccordionTab";
import ExternalPluginsModal from "./ExternalPluginsModal";
import PresetLoadingAnimation from "./PresetLoadingAnimation";
import type { SidebarTabSection, BabelPlugin } from "./lib/types";

type Props = {
  isExpanded: boolean;
  isLoading: boolean;
  onRemove: (pluginName: string) => void;
  onToggleExpanded: (key: SidebarTabSection) => unknown;
  plugins: Array<BabelPlugin>;
  styles: any;
  _pluginNameChanged: any;
  _pluginChanged: any;
  _onshowOfficialExternalPluginsChanged: any;
  pluginValue: string;
  pluginsLoading: boolean;
  showOfficialExternalPlugins: boolean;
};

type State = {
  modalOpen: boolean;
  officialOnly: boolean;
};

export default class ExternalPlugins extends React.Component<Props, State> {
  static defaultProps = {
    isLoading: false,
    plugins: [],
  };

  state = {
    modalOpen: false,
    officialOnly: false,
  };

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  handleOfficialOnlyToggle = () => {
    this.setState(({ officialOnly }) => ({
      officialOnly: !officialOnly,
    }));
  };

  renderButton() {
    const { isLoading } = this.props;

    return (
      <button
        className={currentStyles.modalButton}
        disabled={isLoading}
        onClick={this.handleOpenModal}
      >
        {isLoading ? "Loading Plugin..." : "Add Plugin"}
      </button>
    );
  }

  renderPlugins() {
    const { onRemove, plugins } = this.props;

    if (plugins.length === 0) {
      return <span className={currentStyles.empty}>None added</span>;
    }

    return (
      <ul className={currentStyles.pluginList}>
        {plugins.map((p) => (
          <li key={p.name}>
            <span className={currentStyles.pluginName}>
              {p.name}
              {p.version ? " " : ""}
              {p.version ? (
                <span className={currentStyles.pluginVersion}>
                  v{p.version}
                </span>
              ) : (
                ""
              )}
            </span>
            <button
              className={currentStyles.pluginActions}
              onClick={() => onRemove(p.name)}
              type="button"
            >
              ✕
            </button>
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
      isLoading,
    } = this.props;
    const { officialOnly } = this.state;

    return (
      <AccordionTab
        className={`${styles.section} ${styles.sectionEnv}`}
        isExpanded={isExpanded}
        label={
          <span className={styles.pluginsHeader}>
            Plugins
            {isLoading && <PresetLoadingAnimation size={1} />}
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
            officialOnly={officialOnly}
            handleOfficialOnlyToggle={this.handleOfficialOnlyToggle}
          />
        )}
      </AccordionTab>
    );
  }
}
