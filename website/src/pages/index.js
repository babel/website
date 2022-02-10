import React, { useEffect } from "react";
import "../../static/css/index.css";
import "../../static/css/minirepl.css";
import "../../../js/minirepl.js";
import Link from "@docusaurus/Link";
import BABEL_MINI_REPL from "../../../js/minirepl.js";
import Translate from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <Link
          className="button"
          to={this.props.href}
          target={this.props.target}
        >
          {this.props.children}
        </Link>
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
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;
  useEffect(() => {
    BABEL_MINI_REPL.start();
  });
  return (
    <div className="hero-repl" hidden={true}>
      <div className="hero-repl__editor">
        <div className="hero-repl__pane hero-repl__pane--left">
          <h3>
            <Translate>Put in next-gen JavaScript</Translate>
          </h3>
          <div id="hero-repl-in" className="hero-repl__code" />
        </div>
        <div className="hero-repl__pane hero-repl__pane--right">
          <h3>
            <Translate>Get browser-compatible JavaScript out</Translate>
          </h3>
          <div id="hero-repl-out" className="hero-repl__code" />
          <div className="hero-repl__error" />
        </div>
      </div>
    </div>
  );
};

const GetStarted = ({ language }) => {
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;

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
        <Link to="/docs">getting started guide</Link> or check out some{" "}
        <Link href="/videos">videos</Link> on the people and concepts behind it.
      </p>
    </div>
  );
};

const SponsorTier = props => {
  let { min, max } = props;
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;

  const tierSponsors = customFields.sponsors.filter(sponsor => {
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
            <Link
              to={sponsor.url}
              title={sponsor.name}
              target="_blank"
              rel="noopener sponsored"
            >
              <img src={sponsor.image} alt={`Sponsored by ${sponsor.name}`} />
            </Link>
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
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;

  return (
    <div className="container paddingBottom">
      <div className="wrapper productShowcaseSection">
        <h3>Current Sponsors</h3>
        <p>
          We&apos;re a small group of <Link to="/team">volunteers</Link> that
          spend their free time maintaining this project, funded by the
          community. If Babel has benefited you in your work, becoming a{" "}
          <Link to="https://github.com/babel/babel/blob/main/CONTRIBUTING.md">
            contributor
          </Link>{" "}
          or <Link to="https://opencollective.com/babel">sponsoring</Link> might
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
  <div style={{ backgroundColor: "#f6f6f6", paddingBottom: 20 }}>
    <div className="wrapper">
      <div className="gridBlock">{props.children}</div>
    </div>
  </div>
);

const Hero = ({ language }) => (
  <div className="hero">
    <Link to="https://teespring.com/babel-christmas?pr=FLAVORTOWN">
      <div className="homepage-banner">Get Babel Holiday Apparel 👕</div>
    </Link>
    <div className="hero__container">
      <h1>
        <Translate>Babel is a JavaScript compiler.</Translate>
      </h1>
      <p>
        <Translate>Use next generation JavaScript, today.</Translate>
      </p>

      <div className="hero__announcement">
        <span>
          <strong>Babel 7.17 is released!</strong> Please read our{" "}
          <Link to="blog/2022/02/02/7.17.0">blog post</Link> for highlights and{" "}
          <Link to="https://github.com/babel/babel/releases/tag/v7.17.0">
            changelog
          </Link>{" "}
          for more details!
        </span>
      </div>

      <DummyMiniRepl />
      <MiniRepl language={language} />
    </div>
  </div>
);

const Index = ({ language }) => {
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;
  return (
    <Layout title={siteConfig?.title} description={siteConfig?.tagline}>
      <div>
        <Hero language={language} />

        <div className="mainContainer" style={{ padding: 0 }}>
          <HomeContainer>
            <GetStarted language={language} />
          </HomeContainer>
          <OpenCollectiveSponsors language={language} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
