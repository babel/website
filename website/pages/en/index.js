const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

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

const GoldSponsors = () => {
  if ((siteConfig.sponsors || []).length === 0) {
    return null;
  }

  return (
    <div className="productShowcaseSection sponsors-gold">
      <p>Proudly sponsored by:</p>
      <div className="sponsors-gold-logos">
        {siteConfig.sponsors
          .filter(sponsor => {
            return sponsor.type == "gold" || sponsor.type == "silver";
          })
          .map((sponsor, i) => {
            return (
              <a href={sponsor.infoLink} target="_blank" key={i}>
                <img src={sponsor.image} title={sponsor.caption} />
              </a>
            );
          })}
      </div>
    </div>
  );
};

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || "en";
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <MiniRepl language={language} />
          <PromoSection>
            <GoldSponsors />
          </PromoSection>
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
      <h2>Welcome</h2>

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
                <a
                  className="card"
                  href={sponsor.infoLink}
                  target="_blank"
                  key={i}
                >
                  <div className="card-image">
                    <img src={sponsor.image} title={sponsor.caption} />
                  </div>
                  <div className="card-text">
                    <p>{sponsor.description}</p>
                  </div>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const Donate = props => {
  const language = props.language || "en";
  return (
    <div
      className="wrapper productShowcaseSection paddingBottom"
      style={{ textAlign: "center" }}
    >
      <h2>Support the team</h2>
      <p>
        Babel is helping shape the future of the JavaScript language itself,
        being used at companies like Facebook, Google, Netflix, and{" "}
        <a href={pageUrl("users.html", language)}>hundreds more</a>. Your
        donation will help cover expenses like attending TC39 ( the committee
        that specifies JavaScript) meettings and will directly support the core
        team developers to continue working on improving Babel.
      </p>
      <PromoSection>
        <Button href="https://opencollective.com/babel" target="_blank">
          Become a sponsor
        </Button>
      </PromoSection>
    </div>
  );
};

const HomeContainer = props => (
  <Container padding={props.padding}>
    <div className="gridBlock">{props.children}</div>
  </Container>
);

class Index extends React.Component {
  render() {
    const language = this.props.language || "en";

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <HomeContainer padding={["bottom"]}>
            <GetStarted language={language} />
            <WorkSponsors language={language} />
          </HomeContainer>
          <Donate />
        </div>
      </div>
    );
  }
}

module.exports = Index;
