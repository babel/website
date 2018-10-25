const React = require("react");

class Footer extends React.Component {
  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a
              href={this.props.config.getDocUrl(
                "learn.html",
                this.props.language
              )}
            >
              Learn ES2015
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href={this.props.config.getVideoUrl(
                "videos.html",
                this.props.language
              )}
            >
              Videos
            </a>
            <a
              href={this.props.config.getPageUrl(
                "users.html",
                this.props.language
              )}
            >
              User Showcase
            </a>
            <a
              href="http://stackoverflow.com/questions/tagged/babeljs"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stack Overflow
            </a>
            <a href="https://babeljs.slack.com/">Slack Channel</a>
            <a
              href="https://twitter.com/babeljs"
              rel="noopener noreferrer"
              target="_blank"
            >
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.baseUrl + "blog"}>Blog</a>
            <a href="https://github.com/babel">GitHub Org</a>
            <a href="https://github.com/babel/babel">GitHub Repo</a>
            <a href="https://github.com/babel/website">Website Repo</a>
            <a href="https://old.babeljs.io">Old 6.x Site</a>
            <a href="http://henryzoo.com/babel.github.io">Old 5.x Site</a>
          </div>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
