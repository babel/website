const React = require("react");
const translate = require("../../server/translate.js").translate;
const siteConfig = require(process.cwd() + "/siteConfig.js");

function docUrl(doc, language) {
  return siteConfig.baseUrl + "docs/" + (language ? language + "/" : "") + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + "/" : "") + page;
}

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

const DEFAULT_LANGUAGE = "en";

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

const MiniRepl = ({ language }) => {
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
      <div className="hero-repl__footer">
        <a href={pageUrl("repl.html", language)}>
          <translate>
            Check out our REPL to experiment more with Babel!
          </translate>
        </a>
      </div>

      <script
        src="https://unpkg.com/babel-standalone@6/babel.min.js"
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

// const SpecialSponsors = () => {
//   return (
//     <div className="productShowcaseSection sponsors-special">
//       <p>Special Sponsors</p>
//       <div className="sponsors-special-logos">
//         {siteConfig.sponsors
//           .filter(sponsor => sponsor.type == "special")
//           .map((sponsor, i) => {
//             return (
//               <a href={sponsor.url} target="_blank" key={i}>
//                 <img src={sponsor.image} title={sponsor.name} />
//               </a>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

const GetStarted = props => {
  const language = props.language || "en";
  return (
    <div
      className="blockElement twoByGridBlock get-started"
      style={{ flexBasis: "60%", margin: 0 }}
    >
      <h2>Welcome!</h2>

      <p>
        We&apos;re currently just a small group of{" "}
        <a href={pageUrl("team.html", language)}>volunteers</a> that spend their
        free time maintaining this project. If Babel has benefited you in your
        work, becoming a contributor might be a great way to give back.
      </p>
      <p>
        Learn more about Babel by reading the get started guide or watching
        talks about the concepts behind it.
      </p>
      <PromoSection>
        <Button href={docUrl("index.html", language)}>Get Started</Button>
        <Button href={pageUrl("videos.html", language)}>Videos</Button>
      </PromoSection>
    </div>
  );
};

const WorkSponsors = () => {
  return (
    <div
      className="blockElement alignCenter twoByGridBlock sponsors-work"
      style={{ flexBasis: "40%", margin: 0 }}
    >
      <h2>Friends of Open Source</h2>
      <p style={{ fontSize: 16 }}>
        These companies are being awesome and paying their engineers to work on
        Babel
      </p>
      <div className="productShowcaseSection">
        <div className="cards">
          {siteConfig.sponsors
            .filter(sponsor => {
              return sponsor.type == "work";
            })
            .map((sponsor, i) => {
              return (
                <div className="card" key={i}>
                  <a href={sponsor.url} target="_blank" className="card-image">
                    <img
                      src={sponsor.image}
                      title={sponsor.name}
                      alt={`Sponsored by ${sponsor.name}`}
                    />
                  </a>
                  <div className="card-text">
                    <p>{sponsor.description}</p>
                  </div>
                  <div className="card-text">
                    <p>
                      sponsoring{" "}
                      <a href={`https://github.com/${sponsor.member}`}>
                        @{sponsor.member}
                      </a>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

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

const OpenCollectiveSponsors = props => {
  const language = props.language || "en";
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
            <a href={pageUrl("users.html", language)}>hundreds more</a>. Your
            donation will help cover expenses like attending TC39 (the committee
            that specifies JavaScript) meetings and will directly support the
            core team developers to continue working on improving Babel.
          </p>
          <PromoSection>
            <Button href="https://opencollective.com/babel" target="_blank">
              Become a sponsor
            </Button>
          </PromoSection>
        </div>
        <div className="sponsor-tiers">
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
            type="opencollective"
            title="Silver Sponsors (Open Collective)"
            tier="silver-sponsors"
            button={ocButton}
          />
        </div>
      </div>
    </div>
  );
};

const HomeContainer = props => (
  <div
    className="container paddingTop paddingBottom"
    style={{ backgroundColor: "#f6f6f6" }}
  >
    <div className="wrapper">
      <div className="gridBlock">{props.children}</div>
    </div>
  </div>
);

const Hero = ({ language }) => (
  <div className="hero">
    <a href="https://tidelift.com/subscription/npm/babel">
      <div className="tidelift-banner">Get Professionally Supported Babel</div>
    </a>
    <div className="hero__container">
      <h1>
        <translate>Babel is a JavaScript compiler.</translate>
      </h1>
      <p>
        <translate>Use next generation JavaScript, today.</translate>
      </p>
      <MiniRepl language={language} />
    </div>
  </div>
);

const Index = ({ language = DEFAULT_LANGUAGE }) => (
  <div>
    <Hero language={language} />

    <div className="mainContainer" style={{ padding: 0 }}>
      <HomeContainer>
        <GetStarted language={language} />
        <WorkSponsors language={language} />
      </HomeContainer>
      <OpenCollectiveSponsors />
    </div>
  </div>
);

module.exports = Index;
