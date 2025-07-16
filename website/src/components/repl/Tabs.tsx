import { css } from "@emotion/css";
import React from "react";

export type TabsOptions = {
  current: string;
  labels: string[];
  onClick: (current: string) => void;
};

export default function Tabs({ current, labels, onClick }: TabsOptions) {
  return (
    <ul className={`pills padding--xs ${css({ "--ifm-list-margin": 0 })}`}>
      {labels.map((label, index) => (
        <li
          key={index}
          className={`pills__item${
            current === labels[index] ? " pills__item--active" : ""
          }`}
          onClick={() => onClick(labels[index])}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
