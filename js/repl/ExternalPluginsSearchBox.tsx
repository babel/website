import { css } from "emotion";
import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";

import type { ChangeEvent } from "react";

type Props = {
  currentRefinement: string | undefined | null;
  inputRef: () => void;
  refine: (value: string) => void;
};

export class SearchBox extends React.PureComponent<Props> {
  handleChange = (event: ChangeEvent<any>) => {
    this.props.refine(event.target.value);
  };

  render() {
    return (
      <input
        className={style}
        onChange={this.handleChange}
        placeholder="Type in a package name (ex. babel-plugin-lodash)"
        ref={this.props.inputRef}
        type="text"
        value={this.props.currentRefinement}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    );
  }
}

const style = css`
  background: #191a1f;
  border: 0;
  color: #fff;
  font-size: 1rem;
  outline: none;
  padding: 1rem;
  width: 100%;

  &::placeholder {
    color: #9ea5b3;
    opacity: 0.5;
  }
`;

const ConnectedSearchBox = connectSearchBox(SearchBox);

export default ConnectedSearchBox;
