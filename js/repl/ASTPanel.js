// @flow

import { css } from "emotion";
import { colors } from "./styles";
import React from "react";
import ReactJson from "react-json-view";
import {
  flatten,
  unflatten,
  filterFlatten,
  deleteFlatten,
  mergeFlatten,
} from "./ASTUtils";

type Props = {
  className?: string,
  src: Object,
};

type State = {
  src: Object,
  flattenEmpty: Object,
  flattenSrc: Object,
  flattenType: Object,
  flattenLocation: Object,
  astOption: {
    autofocus: boolean,
    location: boolean,
    empty: boolean,
    type: boolean,
  },
};

const OPTION_ORDER = ["autofocus", "location", "empty", "type"];

export default class ASTPanel extends React.Component<Props, State> {
  state = {
    src: {},
    flattenEmpty: {},
    flattenSrc: {},
    flattenType: {},
    flattenLocation: {},
    astOption: {
      autofocus: true,
      location: true,
      empty: true,
      type: true,
    },
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.src && nextProps.src !== prevState.src) {
      const flattenSrc = flatten(nextProps.src);
      return {
        src: nextProps.src,
        flattenSrc: flattenSrc,
        flattenType: filterFlatten(flattenSrc, "type"),
        flattenLocation: {
          ...filterFlatten(flattenSrc, "start"),
          ...filterFlatten(flattenSrc, "end"),
        },
        flattenEmpty: filterFlatten(flattenSrc, null, "null"),
      };
    }
  }

  _onOptionSettingCheck(option: string) {
    this.setState(prevState => ({
      astOption: {
        ...prevState.astOption,
        [option]: !prevState.astOption[option],
      },
    }));
    this._onChangeJson(option);
  }

  _onChangeJson(option: string) {
    const {
      astOption,
      flattenEmpty,
      flattenSrc,
      flattenType,
      flattenLocation,
    } = this.state;

    function triggerAstOutput(type) {
      const isShow = astOption[type];
      let newSrc = {};
      const types = {
        autofocus: () => {},
        empty: () => {
          newSrc = isShow
            ? deleteFlatten(flattenSrc, flattenEmpty)
            : mergeFlatten(flattenSrc, flattenEmpty);
          return newSrc;
        },
        type: () => {
          newSrc = isShow
            ? deleteFlatten(flattenSrc, flattenType)
            : mergeFlatten(flattenSrc, flattenType);
          return newSrc;
        },
        location: () => {
          newSrc = isShow
            ? deleteFlatten(flattenSrc, flattenLocation)
            : mergeFlatten(flattenSrc, flattenLocation);
          return newSrc;
        },
        default: () => {},
      };
      return (types[type] || types["default"])();
    }

    const result = triggerAstOutput(option);
    this.setState({ flattenSrc: result, src: unflatten(result) });
  }

  render() {
    const { src, astOption } = this.state;
    const { className = "" } = this.props;

    return (
      <div className={`${styles.panel} ${className}`}>
        <div className={styles.optionWrapper}>
          {OPTION_ORDER.map(option => (
            <label className={styles.settingsLabel}>
              <input
                checked={astOption[option]}
                type="checkbox"
                className={styles.inputCheckboxLeft}
                onChange={() => this._onOptionSettingCheck(option)}
              />
              {option}
            </label>
          ))}
        </div>
        {src && (
          <ReactJson
            src={src}
            style={{
              overflowY: "scroll",
              width: "100%",
            }}
            sortKeys={true}
            enableClipboard={false}
            displayObjectSize={true}
            displayDataTypes={false}
          />
        )}
      </div>
    );
  }
}

const styles = {
  optionWrapper: css({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "stretch",
    backgroundColor: colors.inverseBackgroundLight,
  }),
  settingsLabel: css({
    alignItems: "center",
    display: "flex",
    flex: "0 0 1.5rem",
    flexDirection: "colum",
    fontSize: "0.875rem",
    fontWeight: "normal",
    margin: "0 -0.5rem",
    padding: "0 1rem",
    transition: "background-color 250ms ease-in-out, color 250ms ease-in-out",

    "&:hover": {
      backgroundColor: colors.inverseBackgroundDark,
      color: colors.inverseForeground,
    },
  }),
  inputCheckboxLeft: css({
    margin: "0 0.75rem 0 0 !important", // TODO (bvaughn) Override input[type="checkbox"] style in main.css

    "&:disabled": {
      opacity: 0.5,
    },
  }),
  panel: css({
    height: "100%",
    display: "grid",
    flexDirection: "column",
    justifyContent: "stretch",
    overflow: "auto",
  }),
};
