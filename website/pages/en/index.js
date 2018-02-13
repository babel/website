const React = require("react");

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

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const ProjectTitle = () => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

const MiniRepl = props => {
  const language = props.language || "en";
  return (
    <div className="hero-repl" hidden={true}>
      <div className="hero-repl__editor">
        <div className="hero-repl__pane hero-repl__pane--left">
          <h3>Put in next-gen JavaScript</h3>
          <div id="hero-repl-in" className="hero-repl__code" />
        </div>
        <div className="hero-repl__pane hero-repl__pane--right">
          <h3>Get browser-compatible JavaScript out</h3>
          <div id="hero-repl-out" className="hero-repl__code" />
          <div className="hero-repl__error" />
        </div>
      </div>
      <div className="hero-repl__footer">
        <a href={pageUrl("repl.html", language)}>
          Check out our REPL to experiment more with Babel!
        </a>
      </div>

      <script
        src="https://unpkg.com/babel-standalone@6/babel.min.js"
        defer={true}
      />
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js"
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

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || "en";
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <MiniRepl language={language} />
        </div>
      </SplashContainer>
    );
  }
}

const GetStarted = props => {
  const language = props.language || "en";
  return (
    <div
      className="blockElement twoByGridBlock get-started"
      style={{ flexBasis: "60%" }}
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
      style={{ flexBasis: "40%" }}
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
                    <img src={sponsor.image} title={sponsor.name} />
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
    sponsor => sponsor.type == "opencollective" && sponsor.tier === props.tier
  );
  return (
    <div>
      <h3>{props.title}</h3>
      <ul className={`sponsors-opencollective-tier tier-${props.tier}`}>
        {tierSponsors.map((sponsor, i) => (
          <li key={i}>
            <a href={sponsor.url} title={sponsor.name}>
              <img src={sponsor.image} />
            </a>
          </li>
        ))}
      </ul>
      {props.button ? (
        <PromoSection>
          <Button href="https://opencollective.com/babel" target="_blank">
            Become a sponsor
          </Button>
        </PromoSection>
      ) : null}
    </div>
  );
};

const OpenCollectiveSponsors = props => {
  const language = props.language || "en";
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
        <div className="sponsors-opencollective">
          <h2>Open Collective Sponsors</h2>
          <SponsorTier title="Gold" tier="gold-sponsors" button={true} />
          <SponsorTier title="Silver" tier="silver-sponsors" button={true} />
          <SponsorTier title="Bronze" tier="bronze-sponsors" button={true} />
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

class Index extends React.Component {
  render() {
    const language = this.props.language || "en";

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <HomeContainer>
            <GetStarted language={language} />
            <WorkSponsors language={language} />
          </HomeContainer>
          <OpenCollectiveSponsors />
        </div>
      </div>
    );
  }
}

module.exports = Index;
