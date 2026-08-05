import style from "./ExternalPluginsSearchBox.module.css";
import React from "react";
import { useSearchBox } from "react-instantsearch";

type Props = {
  query: string | undefined | null;
  refine: (value: string) => void;
};

function SearchBox({ query, refine }: Props) {
  return (
    <input
      className={style.searchBox}
      onChange={(event) => refine(event.currentTarget.value)}
      placeholder="Type in a package name (ex. babel-plugin-lodash)"
      type="text"
      value={query}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      autoFocus
      spellCheck="false"
    />
  );
}

function ConnectedSearchBox(props) {
  return <SearchBox {...useSearchBox(props)} />;
}

export default ConnectedSearchBox;
