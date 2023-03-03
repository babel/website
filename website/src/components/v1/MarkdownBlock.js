/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import Translate, {translate} from '@docusaurus/Translate';
import rehypeRaw from "rehype-raw";

const components = {
  a: ({node: _node, ...props}) => <Link {...props} />,
  pre: ({node: _node, ...props}) => {
    const firstChild = props.children[0];
    if (firstChild.type === "code") {
      return <CodeBlock {...firstChild.props} />;
    } else {
      return <pre {...props} />;
    }
  }
};

/*
Handle this case:
<MarkdownBlock>
  <Translate>Markdown **content** with [links](https://facebook.com) can be translated</Translate>
</MarkdownBlock>
 */
function getMarkdown(children) {
  if (children?.type === Translate) {
    return translate({
      id: children.props.id,
      message: children?.props?.children,
    });
  } else {
    return children;
  }
}

export default function MarkdownBlock({children}) {
  const markdown = getMarkdown(children);
  return (
    <div>
      <span>
        <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
      </span>
    </div>
  );
}
