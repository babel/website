import { graphql } from "react-apollo";
import gql from "graphql-tag";

import AccordionTab from "./AccordionTab";
import PresetLoadingAnimation from "./PresetLoadingAnimation";

type Props = {
  loadingExternalPlugins: boolean,
  isPluginsExpanded: boolean,
  _togglePluginsTab: () => void,
  _pluginNameChanged: (any) => void,
  _onshowOfficialExternalPluginsChanged: (any) => void,
  _pluginChanged: () => void,
  pluginValue: string,
  showOfficialExternalPlugins: boolean,
  pluginsLoading: boolean,
  plugins: Array<Object>,
  styles: Object,
};

function ExternalPlugins({
  loadingExternalPlugins,
  isPluginsExpanded,
  _togglePluginsTab,
  _pluginNameChanged,
  _onshowOfficialExternalPluginsChanged,
  _pluginChanged,
  pluginValue,
  showOfficialExternalPlugins,
  pluginsLoading,
  plugins,
  styles,
}: Props) {
  return (
    <AccordionTab
      className={`${styles.section} ${styles.sectionEnv}`}
      isExpanded={isPluginsExpanded}
      label={
        <span className={styles.pluginsHeader}>
          Plugins
          {loadingExternalPlugins ? <PresetLoadingAnimation /> : ""}
        </span>
      }
      toggleIsExpanded={_togglePluginsTab}
    >
      <label className={styles.pluginContainer}>
        <div className={styles.pluginsSearch}>
          <input
            placeholder="Type the plugin name"
            value={pluginValue}
            onChange={e => _pluginNameChanged(e.target.value)}
            className={`${styles.pluginName} ${styles.envPresetInput}`}
            type="text"
          />
          <label className={styles.settingsLabel}>
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
        </div>
        {pluginsLoading ? (
          <PresetLoadingAnimation />
        ) : (
          <div>
            {plugins.map(plugin => (
              <label key={plugin.package.name} className={styles.pluginRow}>
                <input
                  className={styles.inputCheckboxLeft}
                  onChange={e => _pluginChanged(e, plugin)}
                  type="checkbox"
                />
                {plugin.package.name
                  .split("babel-preset-")
                  .join("")
                  .split("babel-plugin-")
                  .join("")
                  .split("@babel/plugin-")
                  .join("")}
              </label>
            ))}
            {!plugins.length
              ? "There are no plugins that match your query"
              : null}
          </div>
        )}
      </label>
    </AccordionTab>
  );
}

export default graphql(
  gql`
    query getPlugins(
      $name: String!
      $babelWebsite: Boolean
      $official: Boolean
    ) {
      plugins(name: $name, babelWebsite: $babelWebsite, official: $official) {
        package {
          name
          description
          version
          links {
            repository
          }
        }
        bundled
      }
    }
  `,
  {
    options: ({ pluginValue, showOfficialExternalPlugins }) => ({
      variables: {
        name: pluginValue,
        babelWebsite: true,
        official: showOfficialExternalPlugins || false,
      },
    }),
    props: ({ data: { loading, plugins } }) => ({
      pluginsLoading: loading,
      plugins: plugins,
    }),
  }
)(ExternalPlugins);
