import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Footer/Layout';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): ReactNode {
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', {
        'footer--dark': style === 'dark',
      })}>
      {/* Modification: wrap logo and links within a flex container */}
      <div className="container container-fluid">
        <div className="row footer__links">
          {logo && <div className="margin-bottom--sm">{logo}</div>}
          {links}
        </div>
        {copyright && (
          <div className="row">
            <div className="col footer__bottom text--center">{copyright}</div>
          </div>
        )}
      </div>
    </footer>
  );
}
