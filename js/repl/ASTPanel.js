// @flow

import { css } from "emotion";
import { colors } from "./styles";
import React from "react";
import ReactJson from "react-json-view";
import {
  flatten,
  filterFlatten,
  unflatten,
  deleteFlatten,
  mergeFlatten,
  reject,
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
    location: boolean,
    empty: boolean,
    type: boolean,
  },
};

const OPTION_ORDER = ["location", "empty", "type"];

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
      let flattenSrc = flatten(nextProps.src);
      const deleteKeys = Object.keys({
        ...filterFlatten(flattenSrc, "_fromTemplate"),
        ...filterFlatten(flattenSrc, "_letDone"),
      });

      flattenSrc = reject(flattenSrc, deleteKeys);
      const src = unflatten(flattenSrc);

      return {
        src: src,
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
        default: () => flattenSrc,
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
      <div className={`${styles.astWrapper} ${className}`}>
        {src && (
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
        )}
        <ReactJson
          src={src}
          style={styles.reactJson}
          sortKeys={true}
          name={false}
          enableClipboard={false}
          displayObjectSize={true}
          displayDataTypes={false}
        />
      </div>
    );
  }
}

const styles = {
  astWrapper: css({
    height: "100%",
  }),
  optionWrapper: css({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "stretch",
    color: colors.inverseForegroundLight,
    backgroundColor: colors.inverseBackgroundLight,
  }),
  settingsLabel: css({
    alignItems: "center",
    display: "flex",
    flex: "0 0 1.5rem",
    flexDirection: "colum",
    fontSize: "0.875rem",
    fontWeight: "normal",
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
  reactJson: {
    overflowY: "scroll",
    overflow: "show",
    width: "100%",
    height: "100%",
  },
};
