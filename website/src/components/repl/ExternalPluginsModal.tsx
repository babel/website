import { liteClient } from "algoliasearch/lite";
import React, { type ChangeEvent } from "react";
import styles from "./ExternalPluginsModal.module.css";
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  PoweredBy,
} from "react-instantsearch";
import SearchBox from "./ExternalPluginsSearchBox";
import Modal from "./Modal";
import type { BabelPlugin } from "./lib/types";

const searchClient = liteClient(
  "OFCNCOG2CU",
  "1f0cc4b7da241f62651b85531d788fbd"
);

type SearchHit = {
  description: string;
  name: string;
  objectID: string;
  owner: {
    avatar: string;
    link: string;
    name: string;
  };
  version: string;
};

type RenderHitProps = {
  hit: SearchHit;
};

type Props = {
  onClose: () => void;
  onPluginSelect: any; // TODO
  plugins: Array<BabelPlugin>;
  officialOnly: boolean;
  handleOfficialOnlyToggle: (a: ChangeEvent) => void;
};

export default class ExternalPluginsModal extends React.Component<Props> {
  handleSelectPlugin = (hit: SearchHit) => {
    this.props.onPluginSelect(hit);
    this.props.onClose();
  };

  renderHit = ({ hit }: RenderHitProps) => {
    return (
      <div
        className={styles.item}
        key={hit.name}
        onClick={() => this.handleSelectPlugin(hit)}
      >
        <div className={styles.itemName}>
          <strong>
            {hit.name}
            <span className={styles.itemMeta}>v{hit.version}</span>
          </strong>

          <p>{hit.description}</p>

          <div className={styles.itemOwner}>
            <img src={hit.owner.avatar} />
            {hit.owner.name}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { onClose, plugins, officialOnly } = this.props;

    let filters = "computedKeywords:babel-plugin";

    if (officialOnly) {
      filters += " AND owner.name:babel";
    }

    if (plugins.length) {
      plugins.forEach((p) => (filters += ` AND NOT objectID:${p.name}`));
    }

    return (
      <Modal onClose={onClose}>
        <div className={styles.modalContent}>
          <InstantSearch indexName="npm-search" searchClient={searchClient}>
            <Configure
              hitsPerPage={5}
              attributesToRetrieve={["name", "version", "description", "owner"]}
              attributesToHighlight={["name"]}
              filters={filters}
            />
            <div className={styles.modalSearch}>
              <SearchBox />
              <label>
                <input
                  checked={officialOnly}
                  onChange={this.props.handleOfficialOnlyToggle}
                  type="checkbox"
                />
                Only official plugins
              </label>
            </div>
            <Pagination showFirst={false} showLast={false} />
            <Hits hitComponent={this.renderHit} />
            <div className={styles.modalFooter}>
              <PoweredBy />
            </div>
          </InstantSearch>
        </div>
      </Modal>
    );
  }
}
