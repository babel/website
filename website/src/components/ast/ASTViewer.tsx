import React, { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

import type { OnHoverNodeFn } from "./types";

import CopyButton from "./CopyButton";
import { scrollIntoViewIfNeeded } from "./scroll-into";
import styles from "./ASTViewer.module.css";
import DataRender from "./DataRenderer";
import { findSelectionPath } from "./selectedRange";

export interface ASTViewerProps {
  readonly cursorPosition?: number;
  readonly enableScrolling?: boolean;
  readonly hideCopyButton?: boolean;
  readonly onHoverNode?: OnHoverNodeFn;
  readonly showTokens?: boolean;
  readonly value: unknown;
}

function ASTViewer({
  cursorPosition,
  enableScrolling,
  hideCopyButton,
  onHoverNode,
  showTokens,
  value,
}: ASTViewerProps): React.JSX.Element {
  const model = value;

  const selectedPath = useMemo(() => {
    if (cursorPosition == null || !model || typeof model !== "object") {
      return "ast";
    }
    return findSelectionPath(model, cursorPosition).path.join(".");
  }, [cursorPosition, model]);

  useEffect(() => {
    if (enableScrolling) {
      const delayed = debounce(() => {
        const htmlElement = document.querySelector(
          `div[data-level="${selectedPath}"] > a`
        );
        if (htmlElement) {
          scrollIntoViewIfNeeded(htmlElement);
        }
      }, 100);
      delayed();
    }
  }, [selectedPath, enableScrolling]);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <DataRender
          lastElement={true}
          level="ast"
          onHover={onHoverNode}
          selectedPath={selectedPath}
          showTokens={showTokens}
          value={model}
        />
        {!hideCopyButton && <CopyButton value={model} />}
      </div>
      <div className={styles.footer}>
        Powered by typescript-eslint's AST Viewer
      </div>
    </div>
  );
}

export default ASTViewer;
