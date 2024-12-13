import React from "react";
import Link from "@docusaurus/Link";
import "./footer.css";

function Footer() {
  return (
    <footer className="nav-footer" id="footer">
      <section className="sitemap">
        <Link to="/" className="nav-home">
          <img
            src="https://d33wubrfki0l68.cloudfront.net/7a197cfe44548cc1a3f581152af70a3051e11671/78df8/img/babel.svg"
            alt="Babel"
            width="66"
            height="58"
          />
        </Link>
        <div>
          <h5>Docs</h5>
          <Link to="/docs/learn">Learn ES2015</Link>
        </div>
        <div>
          <h5>Community</h5>
          <Link to="/videos">Videos</Link>
          <Link to="/users">User Showcase</Link>
          <Link
            to="http://stackoverflow.com/questions/tagged/babeljs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Stack Overflow
          </Link>
          <Link to="https://babeljs.slack.com/">Slack Channel</Link>
          <Link
            to="https://x.com/babeljs"
            rel="noopener noreferrer"
            target="_blank"
          >
            X (Twitter)
          </Link>
          <Link
            to="https://bsky.app/profile/babel.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            Bluesky
          </Link>
        </div>
        <div>
          <h5>More</h5>
          <Link to="/blog">Blog</Link>
          <Link to="https://github.com/babel">GitHub Org</Link>
          <Link to="https://github.com/babel/babel">GitHub Repo</Link>
          <Link to="https://github.com/babel/website">Website Repo</Link>
          <Link to="https://old.babeljs.io">Old 6.x Site</Link>
          <Link to="http://henryzoo.com/babel.github.io">Old 5.x Site</Link>
        </div>
      </section>
    </footer>
  );
}

export default React.memo(Footer);
