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
        <div className={styles.modalContent}>
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
          </InstantSearch>
        </div>
      </Modal>
    );
  }
}

const styles = {
  modalContent: css`
    background: #22252B;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 50px;
    color: #9EA5B3;
    margin: 40px auto;
    width: 650px;

    .ais-Pagination {
      background: ${colors.inverseBackgroundLight};
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

    .ais-Pagination-item {
      display: inline-block;
      border-radius: 4px;
      font-size: 0.875rem;
      padding: 3px;
      text-align: center;
      transition: all .3s ease;
      width: 28px;

      a {
        color: ${colors.inverseForegroundLight};
      }
    }

    .ais-Pagination-item--selected {
      background: #F1DA6B;
      font-weight: 400;

      a {
        color: ${colors.inverseBackgroundDark};
      }
    }
  `,
  modalFooter: css`
    background: ${colors.inverseBackgroundDark};
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
      height: 20px;
      width: 74px;

      path:last-child {
        fill: #FFF !important;
      }
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
  item: css({
    alignItems: "center",
    borderBottom: `1px solid ${colors.inverseBackgroundDark}`,
    cursor: "pointer",
    display: "flex",
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
    transition: "all 0.25s ease-out",

    "&:hover": {
      backgroundColor: "#455569",
    },
  }),
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
