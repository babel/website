const React = require("react");
const translate = require("../../server/translate.js").translate;
const siteConfig = require(process.cwd() + "/siteConfig.js");

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: "_self",
};

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

const DummyMiniRepl = () => {
  return <div className="dummy-hero-repl" />;
};
const MiniRepl = () => {
  return (
    <div className="hero-repl" hidden={true}>
      <div className="hero-repl__editor">
        <div className="hero-repl__pane hero-repl__pane--left">
          <h3>
            <translate>Put in next-gen JavaScript</translate>
          </h3>
          <div id="hero-repl-in" className="hero-repl__code" />
        </div>
        <div className="hero-repl__pane hero-repl__pane--right">
          <h3>
            <translate>Get browser-compatible JavaScript out</translate>
          </h3>
          <div id="hero-repl-out" className="hero-repl__code" />
          <div className="hero-repl__error" />
        </div>
      </div>

      <script
        src="https://unpkg.com/@babel/standalone@^7.0.0/babel.min.js"
        defer={true}
      />
      <script
        src="https://unpkg.com/ace-builds@1.3.3/src-min-noconflict/ace.js"
        defer={true}
      />
      <script src={`${siteConfig.baseUrl}js/build/minirepl.js`} defer={true} />
    </div>
  );
};

const GetStarted = ({ language }) => {
  return (
    <div
      className="blockElement"
      style={{
        fontSize: "18px",
        maxWidth: "800px",
        padding: "45px 0 7px",
        margin: "0 auto",
      }}
    >
      <p>
        Learn more about Babel with our{" "}
        <a href={siteConfig.getDocUrl("index.html", language)}>
          getting started guide
        </a>{" "}
        or check out some{" "}
        <a href={siteConfig.getPageUrl("videos.html", language)}>videos</a> on
        the people and concepts behind it.
      </p>
    </div>
  );
};

const SponsorTier = props => {
  let { min, max } = props;
  const tierSponsors = siteConfig.sponsors.filter(sponsor => {
    let value = Math.max(sponsor.monthly, (sponsor.yearly || 0) / 12);
    return +value >= min && (!max || (max && +value < max));
  });
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        are currently pledging or have donated an average of{" "}
        {max ? `$${min}-$${max}` : `>$${min}`}
        /month in the last year{" "}
      </div>
      <br />
      <ul className={`sponsors-tier tier-${props.tier}`}>
        {tierSponsors.map((sponsor, i) => (
          <li key={i}>
            <a
              href={sponsor.url}
              title={sponsor.name}
              target="_blank"
              rel="noopener sponsored"
            >
              {sponsor.name === "The Zebra" ? (
                <svg
                  height="43"
                  fill="#0a0c0e"
                  viewBox="0 0 139.71 43"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M100.3 36.94V14.37c0-.11-.11-.34-.22-.34h-.11L88.18 17.4c-.11 0-.23.23-.23.34s0 .11.12.22A5.94 5.94 0 0 1 90.42 22v14.7a5.41 5.41 0 0 1-2.92 4.83c-.11 0-.22.23-.22.34s.22.22.34.22h16c.23 0 .34-.22.23-.45s0-.11-.12-.11c-1.29-.78-3.43-2.46-3.43-4.59zM108.27 14.26a5 5 0 0 0-6 4.15 5 5 0 0 0 0 1.8 5.19 5.19 0 0 0 10.22.11 5.25 5.25 0 0 0-4.22-6.06zM120.51 34.36c0-2.14 3.37-5.28 3.93-5.73.11-.11.11-.23.11-.45a.4.4 0 0 0-.33-.11c-3 .67-7 1.35-8.54 2.24s-2.8 2.47-2.8 5.62a6.72 6.72 0 0 0 6.85 6.85c2.92 0 5-2.59 6.06-3.93.11-.12 0-.23-.11-.34h-.9a4 4 0 0 1-4.16-3.93c-.11 0-.11-.11-.11-.22zM115.24 22.79a3.54 3.54 0 1 0 3.7-3.37h-.22a3.4 3.4 0 0 0-3.48 3.37z" />
                  <path d="M139.71 38.62c0 .11-.45.79-.45.9a7.42 7.42 0 0 1-6.51 3.48c-4.15 0-6.29-2.36-6.29-7V23.35c0-4.15-2.58-4.94-7.63-5.05a.25.25 0 0 1-.23-.22.12.12 0 0 1 .12-.12c1.68-1 4.37-3.59 8.3-3.59 6.74 0 9 3.26 9 8.42v13.47c0 1.8.78 2.36 2.13 2.36a4.71 4.71 0 0 0 1.23-.34c.12-.11.23-.11.23 0a.43.43 0 0 1 .1.34zM52.59 23.58a1 1 0 0 1-.79.9H39.12a.25.25 0 0 1-.23-.23.24.24 0 0 1 .23-.22l4.92-1.24c1.46-.34.22-5.39-1.8-8.19-.11-.12 0-.23.11-.23 6.69.45 9.9 4.49 10.24 9.21z" />
                  <path d="M53.94 32.9a12.6 12.6 0 0 1-12.47 10c-8.3 0-13.24-6.63-13.24-13.7 0-8 5.05-13.58 12.12-14.82.11-.11.23.11.23.23a20 20 0 0 0-2.81 10.66c0 7.3 3.48 10.67 8.64 10.67 3.71 0 5.84-1.35 7.19-3.26.11-.11.22-.22.34-.11zM86.38 27.62c0 7.52-4.83 14-15.15 15h-.19c-.11-.22-.11-.33 0-.45h.11c3.26-.67 5.28-5.38 5.28-13s-3.59-11.11-7-11.11a5.82 5.82 0 0 0-1.91.33h-.22c-.12 0-.12-.11 0-.22l.11-.23c1.68-1.46 4.71-3.36 8-3.36 7.04-.1 10.97 4.51 10.97 13.04zM68.76 42.44c0 .22-.12.22-.34.22-4.94-.33-6.85-1.34-8.09-2.13a.52.52 0 0 0-.56 0l-3.93 2.13c-.45.23-.45-.22-.45-.22.57-1.35 1-5.73 1-8.08v-26a3.61 3.61 0 0 0-1.58-3.48l-1.12-.68s-.11 0-.11-.22 0-.11.11-.11L65.04.45c.11 0 .34.11.34.22v.12l.11 34c0 1.35.45 5.73 3 7.3.04.12.27.12.27.35zM.05 0v2.25h2.24v6.84h2.36V2.25h2.24V0H.05zM16.55 0H14.3v3.48h-2.91V0H9.14v9.09h2.25V5.73h2.91v3.36h2.25V0zM25.64 2.25V0h-6.17v9.09h6.17V6.85h-3.93V5.73h3.37V3.48h-3.37V2.25h3.93zM.04 25.71c0 .22.22.22.33.11 2.48-5.05 7.67-9.54 12.14-10.89.22-.11.11-.22 0-.22H.72c-.34 0-.67.22-.67.45zM.16 42.1h10a.62.62 0 0 0 .56-.33l14.92-26.39a.41.41 0 0 0-.22-.56h-9.66a.9.9 0 0 0-.45.22L.04 41.88c-.11 0 0 .22.12.22zM25.64 31.1c0-.23-.22-.23-.33-.11-2.59 5.01-7.64 9.54-12.27 10.89a.11.11 0 0 0 0 .22h11.9c.22 0 .56-.22.56-.45V31.1z" />
                </svg>
              ) : (
                <img src={sponsor.image} alt={`Sponsored by ${sponsor.name}`} />
              )}
            </a>
          </li>
        ))}
      </ul>
      {props.button ? (
        <PromoSection>
          <Button href={props.button.link} target="_blank">
            {props.button.title}
          </Button>
        </PromoSection>
      ) : null}
    </div>
  );
};

const ocButton = {
  title: "Become a sponsor",
  link: "https://opencollective.com/babel",
};

const OpenCollectiveSponsors = ({ language }) => {
  return (
    <div className="container paddingBottom">
      <div className="wrapper productShowcaseSection">
        <h3>Current Sponsors</h3>
        <p>
          We&apos;re a small group of{" "}
          <a href={siteConfig.getPageUrl("team.html", language)}>volunteers</a>{" "}
          that spend their free time maintaining this project, funded by the
          community. If Babel has benefited you in your work, becoming a{" "}
          <a href="https://github.com/babel/babel/blob/main/CONTRIBUTING.md">
            contributor
          </a>{" "}
          or <a href="https://opencollective.com/babel">sponsoring</a> might
          just be a great way to give back!
        </p>
        <div className="sponsor-tiers" id="sponsors">
          <SponsorTier
            type="opencollective"
            title="Base Support"
            tier="base-support-sponsors"
            min={2000}
          />
          <SponsorTier
            type="opencollective"
            title="Gold"
            tier="gold-sponsors"
            min={1000}
            max={2000}
          />
          <SponsorTier
            type="opencollective"
            title="Silver"
            tier="silver-sponsors"
            min={500}
            max={1000}
          />
        </div>
      </div>
    </div>
  );
};

const HomeContainer = props => (
  <div
    className="container"
    style={{ backgroundColor: "#f6f6f6", paddingBottom: 20 }}
  >
    <div className="wrapper">
      <div className="gridBlock">{props.children}</div>
    </div>
  </div>
);

const Hero = ({ language }) => (
  <div className="hero">
    <a href="https://teespring.com/babel-christmas?pr=FLAVORTOWN">
      <div className="homepage-banner">Get Babel Holiday Apparel 👕</div>
    </a>
    <div className="hero__container">
      <h1>
        <translate>Babel is a JavaScript compiler.</translate>
      </h1>
      <p>
        <translate>Use next generation JavaScript, today.</translate>
      </p>

      <div className="hero__announcement">
        <span>
          <strong>Babel 7.18 is released!</strong> Please read our{" "}
          <a href="blog/2022/05/19/7.18.0">blog post</a> for highlights and{" "}
          <a href="https://github.com/babel/babel/releases/tag/v7.18.0">
            changelog
          </a>{" "}
          for more details!
        </span>
      </div>

      <DummyMiniRepl />
      <MiniRepl language={language} />
    </div>
  </div>
);

const Index = ({ language }) => {
  return (
    <div>
      <Hero language={language} />

      <div className="mainContainer" style={{ padding: 0 }}>
        <HomeContainer>
          <GetStarted language={language} />
        </HomeContainer>
        <OpenCollectiveSponsors language={language} />
      </div>
    </div>
  );
};

module.exports = Index;
