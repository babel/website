// @flow

import { css } from 'glamor';
import CodeMirror from './CodeMirror';
import React from 'react';

type Props = {
  className?: string,
  code: ?string,
  error: ?Error,
  onChange?: (value: string) => void,
  options: Object
};

export default function CodeMirrorPanel(props: Props) {
  const { className = '', code, error, onChange, options } = props;

  return (
    <div className={`${styles.panel} ${className}`}>
      <div className={styles.codeMirror}>
        <CodeMirror
          onChange={onChange}
          options={{
            ...options,
            readOnly: onChange == null
          }}
          preserveScrollPosition={onChange == null}
          value={code}
        />
      </div>
      {error &&
        <pre className={styles.error}>
          {error.message}
        </pre>}
    </div>
  );
}

const styles = {
  codeMirror: css({
    display: 'block',
    height: '100%',
    width: '100%',
    overflow: 'auto',
  }),
  error: css({
    order: 1,
    flex: '0 0 auto',
    maxHeight: '50%',
    overflow: 'auto',
    backgroundColor: '#fff0f0',
    borderTop: '1px solid #ffd6d6',
    color: 'red',
    margin: 0,
    padding: '0.25rem 0.5rem',
    whiteSpace: 'pre-wrap'
  }),
  panel: css({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    overflow: 'auto'
  })
};
