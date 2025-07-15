import { css } from "@emotion/css";
import React from "react";

export type TabsOptions = {
  current: string;
  labels: string[];
  onClick: (current: string) => void;
};

export default function Tabs({ current, labels, onClick }: TabsOptions) {
  return (
    <div className={`padding--xs ${styles.container}`}>
      {labels.map((label, index) => (
        <button
          key={index}
          className={`button ${styles.button}`}
          disabled={current === labels[index]}
          onClick={void onClick(labels[index])}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: css({
    borderBottom: "1px solid var(--ifm-scrollbar-track-background-color)",
  }),
  button: css({
    "--ifm-button-padding-horizontal": "1rem",
    "--ifm-button-background-color": "var(--ifm-background-surface-color)",
    "--ifm-button-color": "var(--ifm-color-emphasis-700)",
    "--ifm-button-border-color": "var(--ifm-color-emphasis-200)",
    "&:hover": {
      "--ifm-button-background-color": "var(--ifm-color-emphasis-100)",
    },
    "&:disabled": {
      "--ifm-button-background-color": "var(--ifm-color-emphasis-100)",
      "--ifm-button-color": "var(--ifm-color-emphasis-900)",
      opacity: 1,
    },
  }),
};
