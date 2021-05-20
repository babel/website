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
    let value = Math.max(sponsor.monthly, sponsor.yearly / 12);
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
              <img src={sponsor.image} alt={`Sponsored by ${sponsor.name}`} />
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
          <a href="https://github.com/babel/babel/blob/master/CONTRIBUTING.md">
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
          <strong>Babel 7.14 is released!</strong> Please read our{" "}
          <a href="blog/2021/04/29/7.14.0">blog post</a> for highlights and{" "}
          <a href="https://github.com/babel/babel/releases/tag/v7.14.0">
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
