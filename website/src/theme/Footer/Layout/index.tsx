import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Props} from '@theme/Footer/Layout';

export default function FooterLayout({
  style,
  links,
  logo,
}: Props): ReactNode {
  const isHomepage = useLocation().pathname === useBaseUrl('/');
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
        {isHomepage && (
          <div className="row">
            <div className="col footer__bottom text--center">
              This website is hosted by <Link to="https://www.netlify.com/">Netlify</Link>.
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
