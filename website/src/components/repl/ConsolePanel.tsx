import React, { useEffect, useRef } from "react";

import styles from "./ConsolePanel.module.css";

import type { ConsoleEntry, ConsoleLevel } from "./lib/types";

type Props = {
  entries: ReadonlyArray<ConsoleEntry>;
  isEvaluateEnabled: boolean;
};

const levelClassNames: Partial<Record<ConsoleLevel, string>> = {
  warn: styles.warn,
  error: styles.error,
};

export default function ConsolePanel({ entries, isEvaluateEnabled }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keep the latest messages visible.
    container.current.scrollTop = container.current.scrollHeight;
  }, [entries]);

  let placeholder: string | null = null;
  if (!isEvaluateEnabled) {
    placeholder =
      'Enable "Evaluate" in the settings to run the compiled code and see its console output here';
  } else if (entries.length === 0) {
    placeholder = "Console output will be shown here";
  }

  return (
    <div
      ref={container}
      className={styles.console}
      role="log"
      aria-label="Console output"
    >
      {placeholder ? (
        <div className={styles.placeholder}>{placeholder}</div>
      ) : (
        entries.map((entry, index) => (
          <pre
            key={index}
            className={`${styles.entry} ${levelClassNames[entry.level] ?? ""}`}
          >
            {entry.message}
          </pre>
        ))
      )}
    </div>
  );
}
