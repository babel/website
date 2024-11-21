import { css } from "@emotion/css";
import React from "react";
import { useSearchBox } from "react-instantsearch";

type Props = {
  query: string | undefined | null;
  inputRef: () => void;
  refine: (value: string) => void;
};

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

function SearchBox({ query, refine, inputRef }: Props) {
  return (
    <input
      className={style}
      onChange={(event) => refine(event.currentTarget.value)}
      placeholder="Type in a package name (ex. babel-plugin-lodash)"
      ref={inputRef}
      type="text"
      value={query}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  );
}

function ConnectedSearchBox(props) {
  return <SearchBox {...useSearchBox(props)} />;
}

export default ConnectedSearchBox;
