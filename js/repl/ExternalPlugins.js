import React, { Component } from "react";
import {
  PoweredBy,
  Hits,
  Configure,
  InstantSearch,
} from "react-instantsearch/es/dom";

import { connectSearchBox } from "react-instantsearch/es/connectors";

import AccordionTab from "./AccordionTab";
import PresetLoadingAnimation from "./PresetLoadingAnimation";

import AlgoliaLogo from "../assets/search-by-algolia-white";

const config = {
  apiKey: "1f0cc4b7da241f62651b85531d788fbd",
  appId: "OFCNCOG2CU",
  indexName: "npm-search",
};

type Props = {
  loadingExternalPlugins: boolean,
  isPluginsExpanded: boolean,
  _togglePluginsTab: () => void,
  _onshowOfficialExternalPluginsChanged: any => void,
  _pluginChanged: () => void,
  showOfficialExternalPlugins: boolean,
  pluginsLoading: boolean,
  plugins: Array<Object>,
  styles: Object,
};

class RawSearchBox extends Component {
  props: {
    refine: string => void,
    styles: Object,
  };

  state = { value: "" };

  _onChange(value) {
    this.props.refine(value);
    this.setState({ value });
  }

  render() {
    return (
      <input
        placeholder="Type the plugin name"
        value={this.state.value}
        onChange={e => this._onChange(e.target.value)}
        className={`${this.props.styles.pluginName} ${this.props.styles
          .envPresetInput}`}
        type="text"
      />
    );
  }
}

export default function ExternalPlugins({
  loadingExternalPlugins,
  isPluginsExpanded,
  _togglePluginsTab,
  _onshowOfficialExternalPluginsChanged,
  _pluginChanged,
  showOfficialExternalPlugins,
  pluginsLoading,
  plugins,
  styles,
}: Props) {
  const hasPlugins = plugins !== undefined;
  const SearchBox = connectSearchBox(RawSearchBox);

  function hitComponent({ hit }: { hit: Object }) {
    return (
      <label key={hit.name} className={styles.pluginRow}>
        <input
          className={styles.inputCheckboxLeft}
          onChange={e => _pluginChanged(e, hit)}
          type="checkbox"
        />
        {hit.name
          .split("babel-plugin-")
          .join("")
          .split("@babel/plugin-")
          .join("")}
      </label>
    );
  }

  return (
    <AccordionTab
      className={`${styles.section} ${styles.sectionEnv}`}
      isExpanded={isPluginsExpanded}
      label={
        <span className={styles.pluginsHeader}>
          Plugins
          {loadingExternalPlugins ? (
            <PresetLoadingAnimation />
          ) : (
            <AlgoliaLogo alt="Search Powered by Algolia" />
          )}
        </span>
      }
      toggleIsExpanded={_togglePluginsTab}
    >
      <InstantSearch
        apiKey={config.apiKey}
        appId={config.appId}
        indexName={config.indexName}
      >
        <Configure
          hitsPerPage={10}
          attributesToRetrieve={["name", "version"]}
          attributesToHighlight={["name"]}
          filters={
            "keywords:babel-plugin" +
            (showOfficialExternalPlugins ? " AND owner.name:babel" : "")
          }
        />

        <div className={styles.pluginContainer}>
          <div className={styles.pluginsSearch}>
            <label
              className={`${styles.settingsLabel} ${styles.checkboxOfficial}`}
            >
              <input
                checked={showOfficialExternalPlugins}
                onChange={e => {
                  _onshowOfficialExternalPluginsChanged(e.target.value);
                }}
                className={styles.inputCheckboxLeft}
                type="checkbox"
              />
              Only official Plugins
            </label>

            <SearchBox styles={styles} />
            <Hits hitComponent={hitComponent} />
          </div>
          {pluginsLoading ? (
            <PresetLoadingAnimation />
          ) : (
            <div>
              {hasPlugins && !plugins.length
                ? "There are no plugins that match your query"
                : null}
            </div>
          )}
        </div>
      </InstantSearch>
    </AccordionTab>
  );
}
