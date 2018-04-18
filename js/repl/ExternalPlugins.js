import { css } from "emotion";
import React, { Component } from "react";
import { connectSearchBox } from "react-instantsearch/es/connectors";
import { PoweredBy,  Hits, Configure, InstantSearch } from "react-instantsearch/es/dom";
import AccordionTab from "./AccordionTab";
import ExternalPluginsModal from './ExternalPluginsModal';
import PresetLoadingAnimation from "./PresetLoadingAnimation";

import AlgoliaLogo from '../assets/search-by-algolia-white';

type Props = {
  loadingExternalPlugins: boolean,
  isPluginsExpanded: boolean,
  styles: Object,
};

export default class ExternalPlugins extends React.Component {
  state = {
    modalOpen: false,
  };

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  handlePluginSelect = (hit) => {
    this.props.onSelect({
      ...this.props.userPlugins,
      [hit.name]: hit.version,
    });
  };

  renderPlugins() {
    const plugins = Object.keys(this.props.userPlugins);

    if (plugins.length === 0) {
      return null;
    }

    return (
      <ul>
        {plugins.map(p => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    );
  }

  render() {
    const {
      isExpanded,
      onToggleExpanded,
      styles,
      userPlugins,
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

        <button className={currentStyles.modalButton} onClick={this.handleOpenModal}>Add Plugin</button>

        {this.state.modalOpen && (
          <ExternalPluginsModal
            onClose={this.handleCloseModal}
            onPluginSelect={this.handlePluginSelect}
          />
        )}
      </AccordionTab>
    );
  }
}

const currentStyles = {
  modalButton: css`
    background: #F1DA6B;
    border: 0;
    border-radius: 4px;
    padding: 0.5rem 0;
  `,
  modalContent: css`
    background: #22252B;
    margin: 0 auto;
    width: 500px;
  `,
  modalFooter: css`
    background: #191A1F;
    color: #FFF;
    display: flex;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;

    .ais-PoweredBy {
      display: flex;
      align-items: center;
      margin-left: auto;
    }

    .ais-PoweredBy-link {
      margin-left: 0.5rem;
    }

    .ais-PoweredBy-logo {
      fill: #FFF;
    }
  `,
};

  // return (
  //   <AccordionTab
  //     className={`${styles.section} ${styles.sectionEnv}`}
  //     isExpanded={isExpanded}
  //     label={
  //       <span className={styles.pluginsHeader}>
  //         Plugins
  //         {loadingExternalPlugins ?
  //           <PresetLoadingAnimation /> :
  //           <AlgoliaLogo alt="Search Powered by Algolia" />
  //         }

  //       </span>
  //     }
  //     onToggleExpanded={onToggleExpanded}
  //     tabKey="plugins"
  //   >
  //     <InstantSearch
  //       apiKey={config.apiKey}
  //       appId={config.appId}
  //       indexName={config.indexName}
  //     >
  //       <Configure
  //         hitsPerPage={10}
  //         attributesToRetrieve={["name", "version"]}
  //         attributesToHighlight={["name"]}
  //         filters={
  //           "keywords:babel-plugin" +
  //           (showOfficialExternalPlugins ? " AND owner.name:babel" : "")
  //         }
  //       />

  //       <label className={styles.pluginContainer}>
  //         <div className={styles.pluginsSearch}>
  //           <label className={`${styles.settingsLabel} ${styles.checkboxOfficial}`}>
  //             <input
  //               checked={showOfficialExternalPlugins}
  //               onChange={e => {
  //                 _onshowOfficialExternalPluginsChanged(e.target.value);
  //               }}
  //               className={styles.inputCheckboxLeft}
  //               type="checkbox"
  //             />
  //             Only official Plugins
  //           </label>

  //           <SearchBox styles={styles} />
  //           <Hits hitComponent={hitComponent} />
  //         </div>
  //         {pluginsLoading ? (
  //           <PresetLoadingAnimation />
  //         ) : (
  //           <div>
  //             {hasPlugins && !plugins.length
  //               ? "There are no plugins that match your query"
  //               : null}
  //           </div>
  //         )}
  //       </label>
  //     </InstantSearch>
  //   </AccordionTab>
  // );
