const React = require("react");
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

const SponsorTier = props => {
  const tierSponsors = siteConfig.sponsors.filter(
    sponsor => sponsor.type == props.type && sponsor.tier === props.tier
  );
  return (
    <div>
      <h3>{props.title}</h3>
      <ul className={`sponsors-tier tier-${props.tier}`}>
        {tierSponsors.map((sponsor, i) => (
          <li key={i}>
            <a href={sponsor.url} title={sponsor.name}>
              <img src={sponsor.image} alt={`Sponsored by ${sponsor.name}`} />
            </a>
            <div>{sponsor.name}</div>
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

const OpenCollectiveSponsors = ({ language }) => {
  const ocButton = {
      title: "Become a sponsor",
      link: "https://opencollective.com/babel",
    },
    patreonButton = {
      title: "Become a patron",
      link: "https://www.patreon.com/bePatron?u=905738",
    };

  return (
    <div className="container paddingTop paddingBottom">
      <div className="wrapper productShowcaseSection">
        <div className="support-the-team">
          <h2>Support the Team</h2>
          <p>
            Babel is helping shape the future of the JavaScript language itself,
            being used at companies like Facebook, Google, Netflix, and{" "}
            <a href={siteConfig.getPageUrl("users.html", language)}>
              hundreds more
            </a>
            . Your donations will directly help fund more of the core team to
            work on Babel.
          </p>
          <PromoSection>
            <Button href="https://opencollective.com/babel" target="_blank">
              Become a sponsor
            </Button>
          </PromoSection>
        </div>
        <div className="sponsor-tiers" id="sponsors">
          <SponsorTier
            type="opencollective"
            title="Base Support Sponsors"
            tier="base-support-sponsor"
          />
          <SponsorTier
            type="opencollective"
            title="Gold Sponsors (Open Collective)"
            tier="gold-sponsors"
            button={ocButton}
          />
          <SponsorTier
            type="patreon"
            title="Gold Sponsors (Patreon)"
            tier="gold-sponsors"
            button={patreonButton}
          />
          <SponsorTier
            type="other"
            title="Misc Sponsors"
            tier="other-sponsors"
          />
          <SponsorTier
            type="opencollective"
            title="Silver Sponsors (Open Collective)"
            tier="silver-sponsors"
            button={ocButton}
          />
          <SponsorTier
            type="patreon"
            title="Silver Sponsors (Patreon)"
            tier="silver-sponsors"
            button={patreonButton}
          />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="mainContainer" style={{ padding: 0 }}>
      <OpenCollectiveSponsors />
    </div>
  );
};

module.exports = Index;
