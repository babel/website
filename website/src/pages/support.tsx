import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import LinkButton from "../components/LinkButton";

const PromoSection = (props) => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

const SponsorTier = (props) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const tierSponsors = (customFields.sponsors as any[]).filter(
    (sponsor) => sponsor.type == props.type && sponsor.tier === props.tier
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
          <LinkButton href={props.button.link} target="_blank">
            {props.button.title}
          </LinkButton>
        </PromoSection>
      ) : null}
    </div>
  );
};

const OpenCollectiveSponsors = () => {
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
            <Link href="/users">hundreds more</Link>. Your donations will
            directly help fund more of the core team to work on Babel.
          </p>
          <PromoSection>
            <LinkButton href="https://opencollective.com/babel" target="_blank">
              Become a sponsor
            </LinkButton>
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
    <Layout>
      <div className="container">
        <div className="mainContainer paddingTop" style={{ padding: 0 }}>
          <OpenCollectiveSponsors />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
