// @flow
import { css } from "emotion";
import React from 'react';
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  PoweredBy,
} from "react-instantsearch/es/dom";
import SearchBox from './ExternalPluginsSearchBox';
import Modal from './Modal';
import { colors } from './styles';

const config = {
  apiKey: "1f0cc4b7da241f62651b85531d788fbd",
  appId: "OFCNCOG2CU",
  indexName: "npm-search",
};

type Props = {};

type State = {
  officialOnly: boolean,
};

export default class ExternalPluginsModal extends React.Component<Props, State> {
  state = {
    officialOnly: false,
  };

  _input: ?HTMLInputElement;

  componentDidMount() {
    if (this._input) {
      this._input.focus();
    }
  }

  handleSelectPlugin = (hit) => {
    this.props.onPluginSelect(hit);
    this.props.onClose();
  };

  handleOfficialOnlyToggle = () => {
    this.setState(({ officialOnly }) => ({
      officialOnly: !officialOnly,
    }));
  };

  renderHit = ({ hit }) => {
    return (
      <div className={styles.item} key={hit.name} onClick={this.handleHitClick}>
        <div className={styles.itemName}>
          <strong>
            {hit.name}
            <span className={styles.itemMeta}>
              v{hit.version}
            </span>
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
    const { onClose, onPluginSelect } = this.props;
    const { officialOnly } = this.state;

    const filters = "keywords:babel-plugin" +
      (officialOnly ? " AND owner.name:babel" : "");

    return (
      <Modal onClose={onClose}>
        <InstantSearch
          apiKey={config.apiKey}
          appId={config.appId}
          indexName={config.indexName}
        >
          <Configure
            hitsPerPage={5}
            attributesToRetrieve={["name", "version", "description", "owner"]}
            attributesToHighlight={["name"]}
            filters={filters}
          />

          <div className={styles.modalContent}>
            <div className={styles.modalSearch}>
              <SearchBox inputRef={x => this._input = x} />
              <label>
                <input
                  checked={officialOnly}
                  onChange={this.handleOfficialOnlyToggle}
                  type="checkbox"
                />
                Only official plugins
              </label>
            </div>
            <Pagination />
            <Hits hitComponent={({ hit }) => (
              <div
                className={styles.item}
                key={hit.name}
                onClick={() => this.handleSelectPlugin(hit)}
              >
                <div className={styles.itemName}>
                  <strong>
                    {hit.name}
                    <span className={styles.itemMeta}>
                      v{hit.version}
                    </span>
                  </strong>

                  <p>{hit.description}</p>

                  <div className={styles.itemOwner}>
                    <img src={hit.owner.avatar} />
                    {hit.owner.name}
                  </div>
                </div>
              </div>
            )} />
            <div className={styles.modalFooter}>
              <PoweredBy />
            </div>
          </div>
        </InstantSearch>
      </Modal>
    );
  }
}

const styles = {
  modalContent: css`
    background: #22252B;
    color: #9EA5B3;
    margin: 40px auto;
    width: 650px;

    .ais-Pagination {
      background: #2a2d35;
      color: #9EA5B3;
      display: flex;
      padding: 0.5rem 0;
      text-align: center;
    }

    .ais-Pagination-list {
      display: flex;
      margin: 0 auto;
    }

    .ais-Pagination-item--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  `,
  modalFooter: css`
    background: #191A1F;
    display: flex;
    font-size: 0.75rem;
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
  modalSearch: css`
    align-items: center;
    display: flex;

    label {
      align-items: center;
      display: flex;
      flex: 0 0 165px;
      font-size: 0.875rem;
      padding-left: 1rem;
      user-select: none;

      input {
        margin: 0 0.5rem 0 0;
      }
    }
  `,
  item: css`
    align-items: center;
    border-bottom: 1px solid rgb(24, 26, 31);
    cursor: pointer;
    display: flex;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;

    &:hover {
      background: ${colors.inverseBackgroundLight},
    }
  `,

  itemName: css`
    flex: 1;

    strong {
      color: #FFF;
    }

    p {
      font-size: 0.75rem;
      line-height: 1.5;
      margin-top: 0.5rem;
      padding-right: 2rem;
    }
  `,

  itemMeta: css`
    align-items: center;
    background: #2B2D34;
    border-radius: 0.5rem;
    color: #9EA5B3;
    display: inline-flex;
    flex: 0 0 65px;
    font-size: 0.65rem;
    justify-content: center;
    margin-left: 0.5rem;
    padding: 0.25rem 0.5rem;
    text-align: center;
  `,

  itemOwner: css`
    align-items: center;
    display: flex;
    font-size: 0.7rem;
    margin-top: 0.5rem;

    img {
      height: 30px;
      margin-right: 0.5rem;
    }
  `,
};
